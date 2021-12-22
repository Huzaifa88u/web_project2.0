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

import { Link, useHistory,useLocation } from "react-router-dom";
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
  const [user,setUser]=useState();
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
const handleUserSearch=async(e)=>{
  console.log(e.target.value);
  if (localStorage.getItem("userid")) {
    await axios
      .get(`http://localhost:3000/auth/getuser/${e.target.value}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res.data[0]?.email);
        setUser(res.data[0]?.email);
        
      });
  } else {
    
  }
  
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


        <div class="input-group">
          <div class="form-outline pl-5 w-50">
            <input type="search" id="form1" class="form-control" onChange={handleUserSearch}/>
            <label class="form-label" placeholder="Search" for="form1"></label>
          </div>
          <button type="button" class="btn btn-primary ml-5 w-10 h-2">
            <i class="fas fa-search" onClick={handleUserSearch}></i>
          </button>
          <div>
            <h2>
              {user}
            </h2>
          </div>
        </div>


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
