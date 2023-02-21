import React, { useCallback, useEffect, useState } from "react";
import { CollapseButton } from "./styles";
import { NavLink } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import axios from "axios";
const DMList = () => {
  const [channelCollapse, setChannelCollapse] = useState(false);
  useEffect(() => {
    getMembers();
  }, []);
  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  const [countList, setCountList] = useState({});
  const [onlineList] = useState([]);
  const [memberData, setMemberData] = useState();
  const getMembers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/user/total/list");
      setMemberData(data.response);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
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
          <GoTriangleDown />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member, index) => {
            const isOnline = onlineList.includes(member);
            const count = countList[member] || 0;
            return (
              <NavLink
                key={index}
                activeClassName="selected"
                to={`../../dm/${member}`}
                relative="path"
                onClick={resetCount(member)}
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
                <span className={count > 0 ? "bold" : undefined}>{member}</span>

                {count > 0 && <span className="count">{count}</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
