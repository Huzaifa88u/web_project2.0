import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
import FriendRequestTile from "./FriendRequestTile";
import axios from "axios";
const FriendsView = ({ isFriend, modal, setModal }) => {
  const [requestArr, setRequestArr] = useState([]);
  const [friendsArr, setFriendsArr] = useState([]);

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

  const getFriends = async () => {
    console.log("hit api");
    console.log(getFriends);
    try {
      const res = await axios.get(
        `http://localhost:3000/friendships/getUserFriends/${localStorage.getItem(
          "userid"
        )}`
      );
      console.log(res.data?.requests);
      setFriendsArr(res.data ? res.data.requests : null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("fetch: ", modal);
    if (isFriend && modal) {
      getFriends();
    } else if (modal) getFriendRequsts();
  }, [modal]);

  return (
    <div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          {isFriend ? "Friend Requests" : "My Friends"}
        </ModalHeader>
        <ModalBody>
          {requestArr &&
            requestArr.map((ra) => <FriendRequestTile sender={ra} />)}
          {friendsArr &&
            friendsArr.map((ra) =>
              ra.isFriend === 1 ? (
                <FriendRequestTile check={true} sender={ra} />
              ) : (
                ""
              )
            )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FriendsView;
