import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
const ProfilePicture = ({ image }) => {
  const [pic, setPic] = useState("");
  const uploadFile = async (event) => {
    event.preventDefault();
    var userData = {};
    let data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(event.target.files[0]);
    axios
      .post("http://localhost:3000/file/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.error(err);
      })
      .then(async (res) => {
        console.log("response: ", res?.data);
        // userData = {
        //   ...jwtDecode(localStorage.getItem("userid")),
        //   profilePicId: res?.data,
        // };
        console.log("userData:", userData);
        // await axios
        //   .put(
        //     `http://localhost:3000/auth/edituser/${localStorage.getItem(
        //       "userid"
        //     )}`,
        //     userData
        //   )
        //   .catch((err) => {
        //     console.error(err);
        //   })
        //   .then((r) => {
        //     console.log(r.data.token);
        //     localStorage.setItem("userid", r.data.token);
        //   });
      });
  };

  useEffect(async () => {
    console.log(image);
  }, []);

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="add-profile-picture"
        type="file"
        onChange={(e) => uploadFile(e)}
      />
      <label htmlFor="add-profile-picture">
        <Avatar src={image} sx={{ width: 150, height: 150 }} />
      </label>
    </div>
  );
};

export default ProfilePicture;
