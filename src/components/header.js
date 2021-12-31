import React, { useState } from "react";
import { Avatar } from "@mui/material";

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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Header() {
  const query = useQuery();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState();
  const [searchedArr, setSearchedArr] = useState();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("userid");
    history.push("/login");
  };

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
                  <Link onClick={() => setModal(!modal)}>Friend Requests</Link>
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: "pointer" }}>
                <NavLink>
                  <Link to="/editprofile">Edit Profile</Link>
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: "pointer" }}>
                <NavLink>
                  <Link to="/friendsview">View Friends</Link>
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

      <div className="d-flex flex-row flex-wrap">
        {searchedArr &&
          searchedArr.map((user) => (
            <FriendRequestTile
              search={true}
              name={user.name}
              email={user.email}
            />
          ))}
      </div>
    </div>
  );
}
