import React from "react";
import ChannelList from "../../components/ChannelList";
import Menu from "../../components/Menu";

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
} from "../Workspace/styles";

const Workspace = () => {
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg />
          </span>
          <Menu>
            <ProfileModal>
              <img />
              <div>
                <span></span>
                <span></span>
              </div>
            </ProfileModal>
            <LogOutButton>로그아웃</LogOutButton>
          </Menu>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          <WorkspaceButton></WorkspaceButton>

          <AddButton>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName></WorkspaceName>
          <MenuScroll>
            <Menu>
              <WorkspaceModal>
                <h2></h2>
                <button>워크스페이스에 사용자 초대</button>
                <button>채널 만들기</button>
                <button>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            {/* <DMList/> */}
          </MenuScroll>
        </Channels>
        <Chats></Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
