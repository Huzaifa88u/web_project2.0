import './App.css';
import PakWheels from './PakWheels';
import "./App.css";
import Card from "./components/Card";
import Pakwheels from "./PakWheels";
import { Route } from "react-router";
import { BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import Blog from './components/Blog';


function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/" exact>
          <Card title="login" />
        </Route>
        <Route path="/signup">
          <Card title="Signup" />
        </Route>
        <Route path="/Pakwheels">
          <div className="row">
        <div className="col-lg-2 bg-white">
             
         </div>
         <div className="col-lg-8 bg-grey">
          <Pakwheels />
          </div>
          <div className="col-lg-2 bg-white">
             
         </div>
         </div>
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
      </Switch>
      </Router>
  );
}

export default App;

