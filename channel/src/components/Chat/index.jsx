import React from "react";
import { ChatWrapper } from "./styles";
import gravatar from "gravatar";
// eslint-disable-next-line react/prop-types
const Chat = ({ data }) => {
  const nickname = localStorage.getItem("nickname");
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img
          src={gravatar.url(nickname, { s: "36px", d: "retro" })}
          alt={nickname}
        />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b></b>
          <span>{data}</span>
        </div>
        <p></p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
