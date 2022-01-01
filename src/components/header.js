import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import jwtDecode from "jwt-decode";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../assets/pc_logo.jpg";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchPage from "./SearchBar";
import FriendsView from "./FriendRequests";
import FriendRequestTile from "./FriendRequestTile";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Header() {
  const query = useQuery();
  const [modal, setModal] = useState(false);
  const [fVModal, setFVModal] = useState(false);
  const [isOpen, setIsOpen] = useState();
  const [searchedArr, setSearchedArr] = useState();
  const [currUser, setCurrUser] = useState();
  const [requestCount, setRequestCount] = useState(0);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("userid");
    history.push("/login");
  };

  const countFriendReuqests = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/friendships/count/${localStorage.getItem(
          "userid"
        )}`
      );
      setRequestCount(res?.data.count);
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("userid")) countFriendReuqests();
    if (localStorage.getItem("userid"))
      setCurrUser(jwtDecode(localStorage.getItem("userid")));
    console.log(searchedArr);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-between">
      <Navbar light expand="md" className="container m-0 col">
        <NavbarBrand
          onClick={() =>
            localStorage.getItem("userid")
              ? history.push("/posts")
              : history.push("/login")
          }
          className="col-1"
          style={{ cursor: "pointer" }}
        >
          <Avatar src={logo} sx={{ width: 50, height: 50 }} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <div className="col-7">
          <SearchPage setSearchedArr={setSearchedArr} />
        </div>
        {localStorage.getItem("userid") && (
          <Collapse className="col-4" isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem style={{ cursor: "pointer" }}>
                <NavLink>
                  <Link onClick={() => setModal(!modal)}>
                    Friend Requests
                    {requestCount ? (
                      <sup>
                        <span class="badge badge-pill badge-danger p-2 m-1">
                          {requestCount}
                        </span>
                      </sup>
                    ) : (
                      ""
                    )}
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: "pointer" }}>
                <NavLink>
                  <Link to="/editprofile">Edit Profile</Link>
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: "pointer" }}>
                <NavLink>
                  <Link onClick={() => setFVModal(!fVModal)}>View Friends</Link>
                </NavLink>
              </NavItem>

              <NavItem style={{ cursor: "pointer" }}>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        )}
      </Navbar>
      <FriendsView setModal={setModal} modal={modal} />
      <FriendsView isFriend={true} setModal={setFVModal} modal={fVModal} />

      <div className="d-flex flex-row flex-wrap">
        {searchedArr &&
          searchedArr?.map((user) => {
            {
              return (
                currUser.email !== user.email && (
                  <FriendRequestTile search={true} reciever={user} />
                )
              );
            }
          })}
      </div>
    </div>
  );
}
