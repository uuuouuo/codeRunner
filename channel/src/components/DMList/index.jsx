import React, { useCallback, useState } from "react";
import { CollapseButton } from "./styles";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { channelMemberSelector } from "../../store/channelAtom";

const DMList = () => {
  const [channelCollapse, setChannelCollapse] = useState(false);
  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  const [countList, setCountList] = useState({});
  const [onlineList] = useState([]);
  const memberData = useRecoilValue(channelMemberSelector(1));
  //const userData = fetch("http://localhost:8081/user/list");
  const resetCount = useCallback(
    (id) => () => {
      setCountList((list) => {
        return {
          ...list,
          [id]: 0,
        };
      });
    },
    []
  );
  return (
    <>
      <h2>
        <CollapseButton
          collapse={channelCollapse}
          onClick={toggleChannelCollapse}
        >
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.nickname);
            const count = countList[member.nickname] || 0;
            return (
              <NavLink
                key={member.nickname}
                activeClassName="selected"
                to={`/dm/${member.nickname}`}
                onClick={resetCount(member.nickname)}
              >
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    isOnline
                      ? "c-presence--active c-icon--presence-online"
                      : "c-icon--presence-offline"
                  }`}
                  aria-hidden="true"
                  data-qa="presence_indicator"
                  data-qa-presence-self="false"
                  data-qa-presence-active="false"
                  data-qa-presence-dnd="false"
                />
                <span className={count > 0 ? "bold" : undefined}>
                  {member.nickname}
                </span>
                {/* {member.nickname === userData?.nickname && <span> (나)</span>} */}
                {count > 0 && <span className="count">{count}</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
