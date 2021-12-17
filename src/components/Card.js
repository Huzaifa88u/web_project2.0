import axios from "axios";
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../App.css";
import "./Card.css";
import Field from "./Field";

const Card = (props) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const login_array = [
    ["text", "username", "Username", setName],
    ["password", "password", "Password", setPassword],
  ];
  const Signup_array = [
    ["text", "name", "name", setName],
    ["text", "username", "Username", setUserName],
    ["password", "password", "Password", setPassword],
    ["password", "password", "Password", setConfirmPassword],
  ];

  const addUser = async (e) => {
    e.preventDefault();
    const user = { email: username, password: password, name: name };
    const token = await axios
      .post("http://localhost:3000/auth/createuser", user)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  const fetchUser = async (e) => {
    e.preventDefault();
    const res = await axios
      .get(`http://localhost:3000/auth/${name}/${password}`)
      .catch((err) => {
        console.error(err);
      })
      .then((r) => {
        history.push("/blog");
        console.log(r);
      });
  };

  useEffect(() => {
    console.log(name);
    console.log(password);
  });

  return (
    <div className="parent">
      <div className="wrapper mt-5">
        <div className="logo">
          {" "}
          <img
            src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
            alt=""
          />{" "}
        </div>
        <div className="text-center mt-4 name"></div>
        <form className="p-3 mt-3">
          {props.title === "login"
            ? login_array.map((login_arr, i) => (
                <Field
                  key={i}
                  type={login_arr[0]}
                  name={login_arr[1]}
                  id={login_arr[1]}
                  placeholder={login_arr[2]}
                  onChange={(event) => login_arr[3](event.target.value)}
                />
              ))
            : Signup_array.map((Signup_arr, i) => (
                <Field
                  key={i}
                  type={Signup_arr[0]}
                  name={Signup_arr[1]}
                  id={Signup_arr[1]}
                  placeholder={Signup_arr[2]}
                  onChange={(event) => Signup_arr[3](event.target.value)}
                />
              ))}
          <Link to="/Post">
            <button
              className="btn mt-3"
              onClick={props.title === "login" ? fetchUser : addUser}
            >
              {props.title === "signup" ? "Sign Up" : "Login"}
            </button>
          </Link>
        </form>
        <div className="text-center fs-6">
          <a>Forget password?</a> or{" "}
          {props.title !== "signup" ? (
            <Link to="/signup">
              <a>Sign up</a>
            </Link>
          ) : (
            <Link to="/login">
              <a>Login</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
