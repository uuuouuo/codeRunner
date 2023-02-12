import React, { useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ChatBox from "../../components/ChatBox";
import ChatList from "../../components/ChatList";
import { Container, Header } from "./styles";
import { channelMemberSelector } from "../../store/channelAtom";
import useInput from "../../hooks/useInput";
import makeSection from "../../utils/makeSection";
import { client } from "../../utils/socketClient";
//import axios from "axios";
const DirectMessage = () => {
  const { roomId } = useParams();
  const userData = useRecoilValue(channelMemberSelector(roomId));
  const myData = "인간";
  // 위에 부분 수정해야함
  const [chat, onChangeChat] = useInput("");
  let chatData = "";
  client.onConnect = () => {
    client.subscribe(
      `/sub/chat/room/${roomId}`,
      (message) => (chatData = `${message.body}`)
    );
    client.publish({
      destination: "/pub/chat/message",
      body: "First Message",
      skipContentLengthHeader: true,
    });
  };
  const scrollbarRef = useRef(null);
  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // if (chat?.trim() && chatData) {
      //   const savedChat = chat;
      //   mutateChat((prevChatData) => {
      //     prevChatData?.[0].unshift({
      //       id: (chatData[0][0]?.id || 0) + 1,
      //       content: savedChat,
      //       SenderId: myData.id,
      //       Sender: myData,
      //       ReceiverId: userData.id,
      //       Receiver: userData,
      //       createdAt: new Date(),
      //     });
      //     return prevChatData;
      //   }, false).then(() => {
      //     setChat("");
      //     if (scrollbarRef.current) {
      //       console.log("scrollToBottom!", scrollbarRef.current?.getValues());
      //       scrollbarRef.current.scrollToBottom();
      //     }
      //   });
      //   axios
      //     .post(``, {
      //       content: chat,
      //     })
      //     .catch(console.error);
      // }
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
        <span></span>
      </Header>
      <ChatList scrollbarRef={scrollbarRef} chatSections={chatSections} />
      <ChatBox
        onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message ${userData.nickname}`}
        data={[]}
      />
    </Container>
  );
};

export default DirectMessage;
