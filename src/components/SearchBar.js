import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Field from "./Field";

const SearchPage = ({ setSearchedArr }) => {
  const [username, setUsername] = useState();
  const [useremail, setUseremail] = useState();
  const history = useHistory();
  const handleuserProfile = () => {
    history.push("/userprofile");
  };

  const handleUserSearch = async (e) => {
    setSearchedArr(null);
    console.log(e.target.value);
    if (localStorage.getItem("userid")) {
      try {
        const res = await axios.get(
          `http://localhost:3000/auth/searchuser/${e.target.value}`
        );
        console.log(res?.data[0]?.email);
        setSearchedArr(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div class="input-group d-flex flex-row justify-content-center">
      <div className="w-100">
        {localStorage.getItem("userid") && (
          <Field
            onChange={handleUserSearch}
            type="text"
            id="search"
            label="Search"
          />
        )}
      </div>
      <br />
    </div>
  );
};

export default SearchPage;
