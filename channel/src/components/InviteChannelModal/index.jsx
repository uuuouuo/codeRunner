import React, { useCallback } from "react";
import { Button, Input, Label } from "../CreateChannelModal/styles";
import Modal from "../Modal";
import PropTypes from "prop-types";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const InviteChannelModal = ({
  show,
  onCloseModal,
  setShowInviteChannelModal,
}) => {
  const { id } = useParams();
  const [newMember, onChangeNewMember, setNewMember] = useInput("");
  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`http://localhost:8082/channel/${id}/user/post`, {
          user_id: newMember,
        })
        .then(() => {
          setShowInviteChannelModal(false);
          setNewMember("");
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: "bottom-center" });
        });
    },
    [newMember]
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>채널 멤버 초대</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

InviteChannelModal.propTypes = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.any,
  setShowInviteChannelModal: PropTypes.any,
};

export default InviteChannelModal;
