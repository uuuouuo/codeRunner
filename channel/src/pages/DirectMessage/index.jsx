import React, { useRef, useEffect, useCallback } from "react";
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

//import axios from "axios";
const DirectMessage = () => {
  const { roomId } = useParams();
  const userData = useRecoilValue(channelMemberSelector(roomId));
  // 위에 부분 수정해야함
  const myData = "인간";
  const [chat, onChangeChat] = useInput("");

  let chatData = ["일단은", "gg", ["아모르"]];
  const scrollbarRef = useRef(null);
  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  const sock = new SockJS("http://localhost:8083/ws-stomp");
  const StompClient = Stomp.over(sock);
  StompClient.connect(
    { "client-id": "my-client-id" },
    "",
    () => {
      StompClient.subscribe(`sub/chat/room/${roomId}`, (message) => {
        console.log(message);
      });
      StompClient.send("/pub/chat/message", chat);
    },
    function (frame) {
      console.log(frame + "Web socket disconnected");
    }
  );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        ("");
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
