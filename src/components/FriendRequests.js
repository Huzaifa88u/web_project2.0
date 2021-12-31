import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
import FriendRequestTile from "./FriendRequestTile";
import axios from "axios";
const FriendsView = ({ modal, setModal }) => {
  const [requestArr, setRequestArr] = useState([]);

  const getFriendRequsts = async () => {
    console.log("hit api");
    try {
      const res = await axios.get(
        `http://localhost:3000/friendships/getUserRequests/${localStorage.getItem(
          "userid"
        )}`
      );
      console.log(res.data?.requests);
      setRequestArr(res.data?.requests);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("fetch: ", modal);
    if (modal) getFriendRequsts();
  }, [modal]);

  return (
    <div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Friend Requests
        </ModalHeader>
        <ModalBody>
          {requestArr &&
            requestArr.map((ra) => <FriendRequestTile sender={ra} />)}
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
