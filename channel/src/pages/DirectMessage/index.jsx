import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ChatBox from "../../components/ChatBox";
import ChatList from "../../components/ChatList";
import { Container, Header } from "./styles";
import { channelMemberSelector } from "../../store/channelAtom";
import useInput from "../../hooks/useInput";

const DirectMessage = () => {
  const { id } = useParams();
  const userData = useRecoilValue(channelMemberSelector(id));
  const [chat, onChangeChat, setChat] = useInput("");
  //   const chatData =
  const scrollbarRef = useRef(null);
  return (
    <Container>
      <Header>
        <img />
        <span></span>
      </Header>
      <ChatList
        scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
        setSize={setSize}
      />
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
