import "./App.css";
// import PakWheels from "./components/Blogs";
import "./App.css";
import Card from "./components/Card";
import Blogs from "./components/Blogs";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";
import Header from "./components/header";
import ReadBlog from "./components/blogRead";
import RightContentArea from "./components/RightContentArea";
import ls from "localStorage";
import FriendRequests from "./components/FriendRequests";
import FriendsView from "./components/FriendsView";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          {console.log("userid:", ls.getItem("userid"))}
          {ls.getItem("userid") ? (
            <Redirect to="blogs" />
          ) : (
            <Card title="login" />
          )}
        </Route>
        <Route path="/login">
          <Card title="login" />
        </Route>
        <Route path="/signup">
          <Card title="Signup" />
        </Route>
        <Route path="/blogs">
          <div className="row">
            <Blogs />
          </div>
        </Route>
        <Route path="/blog">
          <ReadBlog />
        </Route>
        <Route path="/createblog">
          <CreateBlog />
        </Route>
        <Route path="/editblog">
          <CreateBlog />
        </Route>
        <Route path="/myblogs">
          <div className="d-flex flex-row justify-content-center">
            <RightContentArea />
          </div>
        </Route>
        <Route path="/friendrequests">
        <FriendRequests />
      </Route>
      <Route path="/editprofile">
        <EditProfile />
      </Route>
      <Route path="/friendsview">
        <FriendsView />
      </Route>
      <Route path="/userprofile">
        <UserProfile/>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
