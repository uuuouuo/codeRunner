import React from "react";
import { ChatWrapper } from "./styles";

// eslint-disable-next-line react/prop-types
const Chat = ({ data }) => {
  data;
  return (
    <ChatWrapper>
      <div className="chat-img">
        <img />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>안녕</b>
          <span>하이루</span>
        </div>
        <p></p>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
