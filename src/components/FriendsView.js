import React, { useState } from "react";
import {Card} from "react-bootstrap"
import FriendCard from "./FriendCard";

export default function FriendsView(){
  // const friend = [
  //   ["username", "username", "Username", setUsername],
  //   ["email", "email", "Email", setEmail],
    
  // ];
  // const [username,setUsername]=useState("");
  // const [email, setEmail] = useState("");
  return (
    <div>
      <div style={{ flex: "1" }} className="d-flex flex-column">
      <hr class="p-0 m-0" />
      <div class="container m-0 p-0" style={{ maxWidth: "100%" }}>
        <div class="m-0 d-flex flex-row justify-content-center flex-nowrap mx-md-5">
          < FriendCard/>
        </div>
      </div>
    </div>
         {/* {friend.map((fnd, i) => (
                <Card>
                <Card.Body>
                  {friend[0]}
                  {friend[1]}
                  <h2>Huzaifa Shahzad</h2>
                </Card.Body>
                </Card>
              ))
         } */}
         <h1>huzaifa</h1>
    </div>
  )
};