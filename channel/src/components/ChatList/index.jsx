import React, { useCallback } from "react";
import Chat from "../Chat";
import { ChatZone, Section, StickyHeader } from "./styles";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";
const ChatList = ({
  scrollbarRef,
  isReachingEnd,
  isEmpty,
  chatSections,
  setSize,
}) => {
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        setSize((size) => size + 1).then(() => {
          scrollbarRef.current?.scrollTop(
            scrollbarRef.current?.getScrollHeight() - values.scrollHeight
          );
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty]
  );
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat} data={chat} />
              ))}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

ChatList.propTypes = {
  scrollbarRef: PropTypes.any,
  chatSections: PropTypes.any,
  isReachingEnd: PropTypes.bool,
  isEmpty: PropTypes.bool,
  setSize: PropTypes.any,
};

export default ChatList;
