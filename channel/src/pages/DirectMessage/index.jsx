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

  const myData = "하하";
  const chatRoomData = async () => {
    await axios
      .post("http://localhost:8083/chat/room", {
        name: id,
        nicknames: [myData, "가인"],
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
              setChatData(message.body);
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

  StompClient.reconnect_delay = 5000;
  const [chat, onChangeChat, setChat] = useInput("");
  let [chatData, setChatData] = useState([]);
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
      setChat("");
      return prev;
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      //  if (chat?.trim() && chatData) {
      StompClient.send(
        "/pub/chat/message",
        {},
        JSON.stringify({
          roomId: roomId,
          nickname: myData,
          content: chat,
        })
      );
      chatReceive();
    },
    // },
    [chat, roomId, myData, chatData]
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
        <img />
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
