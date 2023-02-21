/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from "react";
import { CollapseButton } from "../DMList/styles";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { channelTemp, fetchChannelList } from "../../store/channelAtom";
import { GoTriangleDown } from "react-icons/go";

const ChannelList = () => {
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [channelData, setChannelData] = useRecoilState(channelTemp);
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

  const updateChannelData = async () => {
    const response = await fetchChannelList();
    setChannelData(response);
  };

  useEffect(() => {
    updateChannelData();
  }, []);
  return (
    <>
      <h2>
        <CollapseButton
          collapse={channelCollapse}
          onClick={toggleChannelCollapse}
        >
          <GoTriangleDown />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData.map((channel, index) => {
            const count = countList[`c-${channel.channel_id}`];
            return (
              <NavLink
                key={`${channel.name}-${index}`}
                activeClassName="selected"
                to={`../${channel.name}`}
                relative="path"
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
