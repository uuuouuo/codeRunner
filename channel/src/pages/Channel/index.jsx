import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import InviteChannelModal from "../../components/InviteChannelModal";
import { Container, Header } from "./styles";

const Channel = () => {
  const { channel } = useParams();
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);
  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span></span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i
              className="c-icon p-ia__view_header__button_icon c-icon--add-user"
              aria-hidden="true"
            />
          </button>
        </div>
      </Header>
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </Container>
  );
};

export default Channel;
