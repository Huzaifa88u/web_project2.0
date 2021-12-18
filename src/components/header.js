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

import { useHistory } from "react-router-dom";

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
      <Navbar color="light" light expand="md">
        <NavbarBrand
          onClick={() =>
            localStorage.getItem("userid")
              ? history.push("/")
              : history.push("/login")
          }
          style={{ cursor: "pointer" }}
        >
          Blog Center
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={handleCreateBlogs}>Create Blogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleMyBlogs}>My Blogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
