import React, { useState, useCallback, useEffect } from "react";
import { CollapseButton } from "../DMList/styles";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { channelListSelector } from "../../store/channelAtom";
const ChannelList = () => {
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [channelData] = useRecoilState(channelListSelector);
  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  const [countList, setCountList] = useState({});
  const location = useLocation();
  const resetCount = useCallback(
    (id) => () => {
      setCountList((list) => {
        return {
          ...list,
          [id]: undefined,
        };
      });
    },
    []
  );
  useEffect(() => {
    setCountList({});
  }, [location]);

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
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            const count = countList[`c-${channel.channel_id}`];
            return (
              <NavLink
                key={channel.name}
                activeClassName="selected"
                to={`/channel/${channel.name}`}
                onClick={resetCount(`c-${channel.channel_id}`)}
              >
                <span
                  className={
                    count !== undefined && count >= 0 ? "bold" : undefined
                  }
                >
                  # {channel.name}
                </span>
                {count !== undefined && count > 0 && (
                  <span className="count">{count}</span>
                )}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
