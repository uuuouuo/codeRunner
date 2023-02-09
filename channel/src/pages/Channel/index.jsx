import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import InviteChannelModal from "../../components/InviteChannelModal";
import { Container, Header } from "./styles";
// import makeSection from "../../utils/makeSection";
import ChatBox from "../../components/ChatBox";
import { useRecoilValue } from "recoil";
import useInput from "../../hooks/useInput";
import { channelMemberSelector } from "../../store/channelAtom";
//import { channelListSelector } from "../../store/channelAtom";
// const PAGE_SIZE = 20;
const Channel = () => {
  const { channel } = useParams();
  console.log(channel);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);
  const channelMembersData = useRecoilValue(channelMemberSelector(channel));
  //const channelsData = useRecoilSelector(channelListSelector);
  //const channelData = channelsData?.find((v) => v.name === channel);
  //const scrollbarRef = useRef(null);
  const [chat, onChangeChat] = useInput("");
  // const isEmpty = chatData?.[0]?.length === 0;
  // const isReachingEnd =
  //   isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);
  // const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  return (
    <Container>
      <Header>
        <span>#{channel.id}</span>
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
      <ChatBox
        // onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message #${channel}`}
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
