import React, { useCallback } from "react";
import Modal from "../Modal";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Input, Label } from "./styles";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import { useRecoilState } from "recoil";
import { channelTemp, fetchChannelList } from "../../store/channelAtom";

const CreateChannelModal = ({
  show,
  onCloseModal,
  setShowCreateChannelModal,
}) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");
  const [, setChannelListData] = useRecoilState(channelTemp);

  const updateChannelData = async () => {
    const response = await fetchChannelList();
    console.log("updateChannelData modal", response);
    setChannelListData(response);
  };

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) {
        return;
      }
      axios
        .post(`http://localhost:8082/channel/post`, {
          name: newChannel,
        })
        .then(async () => {
          await updateChannelData();
          setShowCreateChannelModal(false);
          setNewChannel("");
        })
        .catch((error) => {
          toast.error(error.response?.data, { position: "bottom-center" });
        });
    },
    [newChannel, setShowCreateChannelModal, setNewChannel]
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
        <Button type="submit">생성하기</Button>
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
