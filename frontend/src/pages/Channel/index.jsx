/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import InviteChannelModal from "../../components/InviteChannelModal";
import { Container, Header } from "./styles";
import makeSection from "../../utils/makeSection";
import ChatBox from "../../components/ChatBox";
import { useRecoilValue } from "recoil";
import useInput from "../../hooks/useInput";
import { channelMemberSelector } from "../../store/channelAtom";
import ChatList from "../../components/ChatList";
import axios from "axios";
import { channelListSelector } from "../../store/channelAtom";

const PAGE_SIZE = 20;
const Channel = () => {
  const { id } = useParams();
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);
  const channelMembersData = useRecoilValue(channelMemberSelector(id));
  const getChannelId = useRecoilValue(channelListSelector);
  const channel = getChannelId.find((x) => {
    if (x.name == `${id}`) {
      return true;
    }
  });
  const channel_id = channel.channel_id;
  useEffect(() => {
    loadPosts();
  }, []);
  const [chatData, setChatData] = useState([]);
  const scrollbarRef = useRef(null);
  const [chat, onChangeChat, setChat] = useInput("");
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);
  const chatSections = makeSection(chatData ? chatData.reverse() : []);

  const loadPosts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8082/channel/${channel_id}/posts/get`
      );
      const content = data.map((row, index) => row.content);
      setChatData(content);
      if (scrollbarRef.current) {
        console.log("scrollToBottom!", scrollbarRef.current?.getValues());
        scrollbarRef.current.scrollToBottom();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const writePosts = async () => {
    try {
      await axios.post("http://localhost:8082/channel/posts/write", {
        id: channel_id,
        user_id: 1,
        content: chat,
      });
      setChat("");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      setChatData([...chatData, chat]);
      writePosts();
    },
    [chat, channel, chatData]
  );
  return (
    <Container>
      <Header>
        <span>#{id}</span>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i
              className="c-icon p-ia__view_header__button_icon c-icon--add-user"
              aria-hidden="true"
            />
          </button>
        </div>
      </Header>
      <ChatList
        scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
      />
      <ChatBox
        onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message #${id}`}
        data={channelMembersData}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </Container>
  );
};

export default Channel;
