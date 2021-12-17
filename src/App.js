import './App.css';
import PakWheels from './components/Blogs';
import "./App.css";
import Card from "./components/Card";
import Blogs from "./components/Blogs";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import CreateBlog from './components/CreateBlog';
import Header from './components/header';
import ReadBlog from './components/blogRead';
import RightContentArea from './components/RightContentArea';


function App(props) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login">
          <Redirect to="/" />
        </Route>
        <Route path="/" exact>
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
        <Route path="/myblogs">
          <RightContentArea />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

