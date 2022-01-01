import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ls from "local-storage";
import AdCard from "./AdCard";
import Pagination from "./Pagination";
import CreatePost from "./CreatePost";
import jwtDecode from "jwt-decode";
import RightContentArea from "./RightContentArea";

const ViewProfile = ({ viewuserId }) => {
  return (
    <div className="d-flex flex-row justify-content-center">
      <RightContentArea
        myprofile={true}
        userProfile={true}
        viewuserId={viewuserId}
      />
    </div>
  );
};

export default ViewProfile;
