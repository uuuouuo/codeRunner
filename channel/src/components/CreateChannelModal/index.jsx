import React, { useCallback } from "react";
import Modal from "../Modal";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Input, Label } from "./styles";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";

const CreateChannelModal = ({
  show,
  onCloseModal,
  setShowCreateChannelModal,
}) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");
  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) {
        return;
      }
      axios
        .post(`http://localhost:8083/channel/post`, {
          name: newChannel,
        })
        .then(() => {
          setShowCreateChannelModal(false);
          setNewChannel("");
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: "bottom-center" });
        });
    },
    [newChannel]
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널 이름</span>
          <Input
            id="channel"
            value={newChannel}
            onChange={onChangeNewChannel}
          />
        </Label>
        <Button>생성하기</Button>
      </form>
    </Modal>
  );
};

CreateChannelModal.propTypes = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.any,
  setShowCreateChannelModal: PropTypes.any,
};

export default CreateChannelModal;
