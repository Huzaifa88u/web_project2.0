import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  
  NavLink,
} from "reactstrap";

import { Link,useHistory } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const history = useHistory();

  const handleMyBlogs = () => {
    history.push({
      pathname: "/myblogs",
      search: `?myblogs=${true}`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userid");
    history.push("/login");
  };

  const handleCreateBlogs = () => {
    history.push({
      pathname: "/createblog",
      search: `?user=${localStorage.getItem("userid")}`,
    });
  };

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand
          onClick={() =>
            localStorage.getItem("userid")
              ? history.push("/blogs")
              : history.push("/login")
          }
          style={{ cursor: "pointer" }}
        >
          Blog Center
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />

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
           
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={handleCreateBlogs}>Create Blogs</NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={handleMyBlogs}>My Blogs</NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
