import React, { useRef, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ChatBox from "../../components/ChatBox";
import ChatList from "../../components/ChatList";
import { Container, Header } from "./styles";
import { RoomIdAtom } from "../../store/channelAtom";
import useInput from "../../hooks/useInput";
import makeSection from "../../utils/makeSection";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { DMListAtom } from "../../store/channelAtom";
import gravatar from "gravatar";

const DirectMessage = () => {
  const { id } = useParams();
  const [Chatroom, setChatRoom] = useRecoilState(DMListAtom);
  const [, setRoomId] = useRecoilState(RoomIdAtom);
  // eslint-disable-next-line no-unused-vars
  const [prevChatData, setPrevChatData] = useState([]);
  const sock = new SockJS("http://localhost:8083/ws-stomp");
  const StompClient = Stomp.over(() => {
    return sock;
  });

  StompClient.reconnect_delay = 5000;
  useEffect(() => {
    setRoomId(id);
    chatRoomData();
  }, []);
  useEffect(() => {
    connectSocket();
    return () => {
      StompClient.unsubscribe;
      sock.close;
    };
  }, [Chatroom, StompClient]);

  const nickname = localStorage.getItem("nickname");
  const chatRoomData = async () => {
    await axios
      .post("http://localhost:8083/chat/room", {
        name: id,
        nicknames: [nickname, id],
      })
      .then((response) => {
        setChatRoom(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const connectSocket = () => {
    StompClient.connect(
      { "client-id": "my-client-id" },
      "",
      () => {
        StompClient.subscribe(
          `sub/chat/room/${roomId}`,
          (message) => {
            if (message.body) {
              alert("got message with body " + message.body);
            } else {
              alert("got empty message");
            }
          },
          { id: roomId }
        );
      },
      function (frame) {
        console.log(frame + "Web socket disconnected");
      }
    );
  };
  const [chat, onChangeChat, setChat] = useInput("");
  const [chatData, setChatData] = useState([]);
  const scrollbarRef = useRef(null);
  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  const roomId = Chatroom.roomId;
  const chatReceive = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8083/chat/room/${roomId}`
      );
      const prev = data.map((e, i) => {
        return data[i].content;
      });
      setChatData(prev);
      return prev;
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      chatReceive();
      //  if (chat?.trim() && chatData) {
      StompClient.send(
        "/pub/chat/message",
        {},
        JSON.stringify({
          roomId: roomId,
          nickname: nickname,
          content: chat,
        })
      );
      setChatData([...chatData, chat]);
      setChat("");
    },
    // },
    [chat, roomId, nickname, chatData, setChat]
  );
  useEffect(() => {
    if (chatData?.length === 1) {
      console.log(
        "toBottomWhenLoaded",
        chatData,
        scrollbarRef.current?.getValues()
      );
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);
  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(nickname, { s: "36px", d: "retro" })}
          alt={nickname}
        />
        <span>{id}</span>
      </Header>
      <ChatList scrollbarRef={scrollbarRef} chatSections={chatSections} />
      <ChatBox
        onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message ${id}`}
        data={[]}
      />
    </Container>
  );
};

export default DirectMessage;
