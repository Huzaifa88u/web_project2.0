import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
import FriendRequestTile from "./FriendRequestTile";

const FriendsView = ({ modal, setModal }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Friend Requests
        </ModalHeader>
        <ModalBody>
          <FriendRequestTile />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal(!modal)}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FriendsView;
