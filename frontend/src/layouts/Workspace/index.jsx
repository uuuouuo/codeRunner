import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ChannelList from "../../components/ChannelList";
import CreateChannelModal from "../../components/CreateChannelModal";
import DMList from "../../components/DMList";
import InviteChannelModal from "../../components/InviteChannelModal";
import Menu from "../../components/Menu";
import gravatar from "gravatar";
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from "./styles";

const Workspace = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [setShowInviteWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);
  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);
  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);
  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  // const onLogout = useCallback(() => {
  //   axios
  //     .post('/api/users/logout', null, {
  //       withCredentials: true,
  //     })
  //     .then(() => {
  //       queryClient.setQueryData('user', () => null);
  //     });
  // }, [queryClient]);
  const onCloseModal = useCallback(() => {
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);
  // const temp2 = useRecoilState(channelListSelector);
  // const temp = useCallback(() => {
  //   useRecoilState(channelListSelector);
  // }, []);

  // useEffect(() => {
  //   temp2();
  //   // channelListSelector
  // }, [showCreateChannelModal]);
  const nickname = localStorage.getItem("nickname");
  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            {" "}
            <ProfileImg
              src={gravatar.url(nickname, { s: "28px", d: "retro" })}
              alt={nickname}
            />
          </span>
          <ProfileImg />
          {showUserMenu && (
            <Menu>
              <ProfileModal>
                <img
                  src={gravatar.url(nickname, { s: "28px", d: "retro" })}
                  alt={nickname}
                />
                <div>
                  <span></span>
                  <span></span>
                </div>
              </ProfileModal>
              <LogOutButton>로그아웃</LogOutButton>
            </Menu>
          )}
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          <WorkspaceButton>S</WorkspaceButton>
          <AddButton>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>
            Smilegate
          </WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 95, left: 80 }}
            >
              <WorkspaceModal>
                <h2>Smilegate</h2>
                <button onClick={onClickInviteWorkspace}>
                  워크스페이스에 사용자 초대
                </button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Outlet />
        </Chats>
      </WorkspaceWrapper>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteChannelModal onCloseModal={onCloseModal} />
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Workspace;
