import axios from "axios";
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../App.css";
import "./Card.css";
import Field from "./Field";
import ls from "localStorage";
import logo from "../assets/pc_logo.jpg";

const Card = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const login_array = [
    ["email", "email", "Email", setEmail],
    ["password", "password", "Password", setPassword],
  ];
  const Signup_array = [
    ["email", "email", "Email", setEmail],
    ["text", "name", "Name", setName],
    ["password", "password", "Password", setPassword],
    ["password", "password", "Confirm Password", setConfirmPassword],
  ];

  const addUser = async (e) => {
    setError("");

    e.preventDefault();
    if (password === confirmPassword && email.includes("@")) {
      setLoading(true);
      const user = { email: email, password: password, name: name };
      await axios
        .post("http://localhost:3000/auth/createuser", user)
        .catch((err) => {
          console.log(err);
          setError("signup");
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setError("pws");
    }
  };

  const fetchUser = async (e) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    await axios
      .get(`http://localhost:3000/auth/${email}/${password}`)
      .catch((err) => {
        console.error(err);
        setError("login");
      })
      .then((r) => {
        // console.log(r);
        setLoading(false);
        if (r?.data) {
          ls.setItem("userid", r.data);
          history.push("/posts");
        }
      });
  };

  return (
    <div className="parent">
      <div className="wrapper mt-5">
        <div className="logo">
          {" "}
          <img src={logo} alt="" />{" "}
        </div>
        <div className="text-center mt-4 name"></div>
        <form className="p-3 mt-3">
          {props.title === "login"
            ? login_array.map((login_arr, i) => (
                <Field
                  type={login_arr[0]}
                  id={login_arr[1]}
                  label={login_arr[2]}
                  onChange={(event) => login_arr[3](event.target.value)}
                />
              ))
            : Signup_array.map((Signup_arr, i) => (
                <Field
                  type={Signup_arr[0]}
                  id={Signup_arr[1]}
                  label={Signup_arr[2]}
                  onChange={(event) => Signup_arr[3](event.target.value)}
                />
              ))}
          <Link to="/Post">
            <button
              className={`btn mt-3 ${loading && "disabled"}`}
              onClick={props.title === "login" ? fetchUser : addUser}
            >
              {props.title === "login" ? "Login" : "Sign Up"}
            </button>
          </Link>
        </form>
        {error === "login" && (
          <div class="alert alert-danger" role="alert">
            Wrong email or password
          </div>
        )}
        {error === "signup" && (
          <div class="alert alert-danger" role="alert">
            Email already exist
          </div>
        )}
        {error === "pws" && (
          <div class="alert alert-danger" role="alert">
            Check your fields again
          </div>
        )}
        <div className="text-center fs-6">
          <Link to="/forgetpassword">
            <a>Forget password?</a>
          </Link>{" "}
          or{" "}
          {props.title !== "login" ? (
            <Link to="/login">
              <a
                onClick={() => {
                  setError("");
                }}
              >
                Login
              </a>
            </Link>
          ) : (
            <Link to="/signup">
              <a
                onClick={() => {
                  setError("");
                }}
              >
                Sign Up
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
