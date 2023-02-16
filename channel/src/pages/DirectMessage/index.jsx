import React, { useRef, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ChatBox from "../../components/ChatBox";
import ChatList from "../../components/ChatList";
import { Container, Header } from "./styles";
import { channelMemberSelector } from "../../store/channelAtom";
import useInput from "../../hooks/useInput";
import makeSection from "../../utils/makeSection";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";

const DirectMessage = () => {
  const { roomId } = useParams();
  const userData = useRecoilValue(channelMemberSelector(roomId));
  // 위에 부분 수정해야함
  // 아 맞다 채널 이름 받아와야되는디

  const myData = "하하";
  useEffect(() => {
    chatRoomData();
  }, []);

  const chatRoomData = async () => {
    await axios
      .post("http://localhost:8083/chat/room", {
        name: roomId,
        nicknames: [myData, "가인"],
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sock = new SockJS("http://localhost:8083/ws-stomp");
  const StompClient = Stomp.over(sock);
  const [chat, onChangeChat] = useInput("");
  let [chatData, setChatData] = useState([]);
  const scrollbarRef = useRef(null);
  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  //const [abc] = useRef(null);
  useEffect(() => {
    connectSocket();
    return () => {
      StompClient.unsubscribe;
      sock.close;
    };
  }, []);
  // const sock = new SockJS("http://localhost:8083/ws-stomp");
  // const StompClient = Stomp.over(sock);
  // StompClient.connect(
  //   { "client-id": "my-client-id" },
  //   "",
  //   () => {
  //     StompClient.subscribe(`sub/chat/room/${roomId}`, (message) => {
  //       console.log(message);
  //       setChatData(message);
  //     });
  //     StompClient.send("/pub/chat/message", chat);
  //   },
  //   function (frame) {
  //     console.log(frame + "Web socket disconnected");
  //   }
  // );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        StompClient.send(
          "/pub/chat/message",
          {},
          JSON.stringify({
            roomId: roomId,
            nickname: myData,
            content: chat,
          })
        );
      }
    },
    [chat, roomId, myData, userData, chatData]
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

  const connectSocket = () => {
    StompClient.connect(
      { "client-id": "my-client-id" },
      "",
      () => {
        StompClient.subscribe(`sub/chat/room/${roomId}`, (message) => {
          console.log(message);
          setChatData(message);
        });
      },
      function (frame) {
        console.log(frame + "Web socket disconnected");
      }
    );

    // set
  };

  // const sendMessage = () => {
  //   ref~~.
  // }

  // useEffect(() => {
  //   connectSocket();

  //   return () => {
  //     if (ref~~~) {
  //       StompClient.unsub~~
  //       sock.disn~
  //     }
  //   }
  // }, []);

  return (
    <Container>
      <Header>
        <img />
        <span>{roomId}</span>
      </Header>
      <ChatList scrollbarRef={scrollbarRef} chatSections={chatSections} />
      <ChatBox
        onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message ${roomId}`}
        data={[]}
      />
    </Container>
  );
};

export default DirectMessage;
