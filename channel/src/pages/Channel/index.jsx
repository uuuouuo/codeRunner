import React, { useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import InviteChannelModal from "../../components/InviteChannelModal";
import { Container, Header } from "./styles";
import makeSection from "../../utils/makeSection";
import ChatBox from "../../components/ChatBox";
import { useRecoilValue } from "recoil";
import useInput from "../../hooks/useInput";
import { channelMemberSelector } from "../../store/channelAtom";
import ChatList from "../../components/ChatList";
//import { channelListSelector } from "../../store/channelAtom";
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
  //const channelsData = useRecoilSelector(channelListSelector);
  //const channelData = channelsData?.find((v) => v.name === channel);
  const chatData = [1, 2, [3, 4]];
  const scrollbarRef = useRef(null);
  const [chat, onChangeChat] = useInput("");
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);
  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  // const onSubmitForm = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     if (chat?.trim() && chatData && channelData && userData) {
  //       const savedChat = chat;
  //       mutateChat((prevChatData) => {
  //         prevChatData?.[0].unshift({
  //           id: (chatData[0][0]?.id || 0) + 1,
  //           content: savedChat,
  //           UserId: userData.id,
  //           User: userData,
  //           createdAt: new Date(),
  //           ChannelId: channelData.id,
  //           Channel: channelData,
  //         });
  //         return prevChatData;
  //       }, false).then(() => {
  //         setChat("");
  //         if (scrollbarRef.current) {
  //           console.log("scrollToBottom!", scrollbarRef.current?.getValues());
  //           scrollbarRef.current.scrollToBottom();
  //         }
  //       });
  //       axios
  //         .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
  //           content: savedChat,
  //         })
  //         .catch(console.error);
  //     }
  //   },
  //   [chat, workspace, channel, channelData, userData, chatData]
  // );
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
        //       onSubmitForm={onSubmitForm}
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
