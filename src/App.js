import "./App.css";
// import PakWheels from "./components/Blogs";
import "./App.css";
import Card from "./components/Card";
import Posts from "./components/Posts";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Header from "./components/header";
import ReadPost from "./components/postRead";
import RightContentArea from "./components/RightContentArea";
import ls from "localStorage";
import FriendRequests from "./components/FriendRequests";
import FriendsView from "./components/FriendsView";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";
import ForgetPassword from "./components/Forget";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          {console.log("userid:", ls.getItem("userid"))}
          {ls.getItem("userid") ? (
            <Redirect to="posts" />
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
        <Route path="/posts">
          <div className="row">
            <Posts />
          </div>
        </Route>
        <Route path="/post">
          <ReadPost />
        </Route>
        <Route path="/createpost">
          <CreatePost />
        </Route>
        <Route path="/editpost">
          <CreatePost />
        </Route>
        <Route path="/myposts">
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
          <UserProfile />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
