import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
const ProfilePicture = ({ image, uploadFile }) => {
  useEffect(async () => {
    // console.log(image);
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
