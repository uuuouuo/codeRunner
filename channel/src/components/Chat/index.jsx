import React from "react";
import { ChatWrapper } from "./styles";

const Chat = () => {
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b></b>
          <span></span>
        </div>
        <p></p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
