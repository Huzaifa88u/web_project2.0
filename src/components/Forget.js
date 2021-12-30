import axios from "axios";
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../App.css";
import "./Card.css";
import Field from "./Field";
import logo from "../assets/pc_logo.jpg";
import jwtDecode from "jwt-decode";

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [showPwFields, setShowPwFields] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState(null);
  const [checkOTP, setCheckOTP] = useState("");
  const history = useHistory();

  const forgetPwArray = [
    ["text", "email", "Email", setEmail],
    ["text", "OTP", "OTP", setCheckOTP],
  ];

  const changePasswordArr = [
    ["password", "newpassword", "New Password", setPassword],
  ];

  const sendEmail = async () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/auth/forgetpassword/${email}`)
      .catch((err) => {
        console.log("err");
        return;
      })
      .then((res) => {
        console.log(res?.data);
        setOTP(res.data);
        setLoading(false);
      });
  };

  const varifyOTP = () => {
    if (OTP === checkOTP) {
      setShowPwFields(true);
    } else {
      setShowPwFields(false);
    }
  };

  const changePassword = async () => {
    await axios
      .put(`http://localhost:3000/auth/changepassword/${email}`, password)
      .catch((err) => {
        console.log("err");
        return;
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      });
    history.push("/");
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
          <Field
            type={forgetPwArray[0][0]}
            id={forgetPwArray[0][1]}
            label={forgetPwArray[0][2]}
            onChange={(event) => forgetPwArray[0][3](event.target.value)}
          />

          {OTP && (
            <Field
              type={forgetPwArray[1][0]}
              id={forgetPwArray[1][1]}
              label={forgetPwArray[1][2]}
              onChange={(event) => forgetPwArray[1][3](event.target.value)}
            />
          )}

          {showPwFields && (
            <Field
              type={changePasswordArr[0][0]}
              id={changePasswordArr[0][1]}
              label={changePasswordArr[0][2]}
              onChange={(event) =>
                changePasswordArr[0][3]({ password: event.target.value })
              }
            />
          )}
          <button
            className={`btn mt-3 ${loading && "disabled"}`}
            onClick={(e) => {
              e.preventDefault();
              showPwFields ? changePassword() : OTP ? varifyOTP() : sendEmail();
            }}
          >
            {showPwFields
              ? "Change Password"
              : checkOTP
              ? "Confirm OTP"
              : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
