import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SearchPage = () => {

    
  const [username, setUsername] = useState();
  const [useremail, setUseremail] = useState();
  const history = useHistory();
  const handleuserProfile = () => {

    history.push("/userprofile");
  }

    const handleUserSearch = async (e) => {
        console.log(e.target.value);
        if (localStorage.getItem("userid")) {
            await axios
                .get(`http://localhost:3000/auth/getuser/${e.target.value}`)
                .catch((err) => {
                    console.log(err);
                })
                .then((res) => {
                    console.log(res.data[0]?.email);
                    setUseremail(res.data[0]?.email);
                    setUsername(res.data[0]?.name);
                });
        } else {

        }

    };
    return (
        <div class="input-group d-flex flex-row justify-content-center">
            <div class="form-outline pl-5 w-50">
                <input type="search" id="form1" class="form-control" onChange={handleUserSearch} />
                <label class="form-label" placeholder="Search" for="form1"></label>
            </div>
            <br />
            <div className="justify-content-between " onClick={handleuserProfile}>
                <h2>
                    {useremail}
                    <br />
                    {username}
                </h2>
            </div>
        </div>
    );
}

export default SearchPage;