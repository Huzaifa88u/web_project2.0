import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import jwtDecode from "jwt-decode";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { useState, useEffect } from "react";
import localStorage from "local-storage";
import { useHistory } from "react-router-dom";
import { IconButton } from "@mui/material";
import ViewProfile from "./viewProfile";

const FriendRequestTile = ({ sender, reciever, check }) => {
  const [sent, setSent] = useState(2);
  const [showBtn, setShowBtn] = useState(sender?.isFriend ? 0 : 1);
  const us = jwtDecode(localStorage("userid"));

  const checkFriend = async () => {
    console.log("cehck");
    try {
      const res = await axios.get(
        `http://localhost:3000/friendships/checkfriend/${localStorage(
          "userid"
        )}/${reciever ? reciever.email : sender.senderEmail}/sender`
      );
      console.log("20: ", res.data[0]);
      setSent(res.data[0] ? res.data[0].isFriend : 2);
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      const friendObj = {
        sender: us._id,
        senderEmail: us.email,
        senderName: us.name,
        reciever: reciever._id,
        recieverEmail: reciever.email,
        recieverName: reciever.name,
        isFriend: 0,
      };
      const res = await axios.post(
        `http://localhost:3000/friendships/sendrequest/${localStorage(
          "userid"
        )}`,
        friendObj
      );
      console.log("20: ", res);
      setSent(0);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFriend = async (e) => {
    e.preventDefault();
    alert("Are you sure you want to delete this friend?");
    try {
      const res = await axios.delete(
        `http://localhost:3000/friendships/deletefriend/${localStorage(
          "userid"
        )}/${sender.senderEmail}`
      );
      console.log("20: ", res);
      setSent(res.data === "deleted" ? 2 : sent);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      const accepted = {
        sender: sender.sender,
        senderEmail: sender.senderEmail,
        senderName: sender.senderName,
        reciever: us.id,
        recieverEmail: us.email,
        recieverName: us.name,
        isFriend: 1,
      };
      const res = await axios.put(
        `http://localhost:3000/friendships/acceptrequest/${localStorage(
          "userid"
        )}/${sender.senderEmail}`,
        accepted
      );
      console.log("20: ", res);
      setSent(1);
      setShowBtn(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (e) => {
    e.preventDefault();
    alert("Are you sure you want to delete this friend?");
    try {
      const res = await axios.delete(
        `http://localhost:3000/friendships/declinerequest/${localStorage(
          "userid"
        )}/${sender.senderEmail}`
      );
      console.log("20: ", res);
      setSent(res.data === "deleted" ? 2 : sent);
      setShowBtn(0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    console.log(sender);
    console.log(showBtn);
    await checkFriend();
  }, []);

  return (
    <Card style={{ width: "20rem", height: "6rem" }} className="m-3">
      <Card.Body>
        <div className="row">
          <div className="col-3 ">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              size={50}
              round="50px"
            />
          </div>
          {!check ? (
            <div className="col-7">
              <Card.Title>
                <a onClick={<ViewProfile viewuserId={sender} />}>
                  {sender ? sender.senderName : reciever.name}
                </a>
              </Card.Title>
              <Card.Subtitle className="text-muted">
                {sender ? sender.senderEmail : reciever.email}
              </Card.Subtitle>
            </div>
          ) : (
            <div className="col-7">
              <Card.Title>
                <a onClick={() => <ViewProfile viewuserId={sender} />}>
                  {sender.sender !== us._id
                    ? sender.senderName
                    : sender.recieverName}
                </a>
              </Card.Title>
              <Card.Subtitle className="text-muted">
                {sender.sender !== us._id
                  ? sender.senderEmail
                  : sender.recieverEmail}
              </Card.Subtitle>
            </div>
          )}
          <div className="col-2 p-0 cursor-pointer">
            <a>
              {!sender ? (
                sent === 2 ? (
                  <IconButton onClick={sendRequest}>
                    <PersonAddIcon />
                  </IconButton>
                ) : sent === 0 ? (
                  <IconButton onClick={deleteFriend}>
                    <HowToRegIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={deleteFriend}>
                    <DoneAllIcon />
                  </IconButton>
                )
              ) : showBtn ? (
                <div style={{ margin: "-10px" }}>
                  <IconButton onClick={handleAccept}>
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton onClick={handleDecline}>
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <IconButton onClick={deleteFriend}>
                  <DoneAllIcon />
                </IconButton>
              )}
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FriendRequestTile;
