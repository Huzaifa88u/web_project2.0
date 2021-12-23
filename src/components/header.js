import React, { useState } from "react";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,

  NavLink,
} from "reactstrap";

import { Link, useHistory, useLocation } from "react-router-dom";
import SearchPage from "./SearchBar";


function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Header() {
  const query = useQuery();
  const [isOpen, setIsOpen] = useState();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("userid");
    history.push("/login");
  };

  
  return (
    <div className="justify-content-between">
      <Navbar light expand="md">
        <NavbarBrand
          onClick={() =>
            localStorage.getItem("userid")
              ? history.push("/blogs")
              : history.push("/login")
          }
          style={{ cursor: "pointer" }}
        >
          Social Circle
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />


        <SearchPage/>


        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink ><Link to="/friendrequests">Friend Requests</Link></NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink ><Link to="/editprofile">Edit Profile</Link></NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink ><Link to="/friendsview">View Friends</Link></NavLink>
            </NavItem>

            {/* {/* <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={handleCreateBlogs}>Create Blogs</NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={handleMyBlogs}>My Blogs</NavLink>
            </NavItem> */}
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
