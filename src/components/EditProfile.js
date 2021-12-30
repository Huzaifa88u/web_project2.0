import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Field from "./Field";
import axios from "axios";
import ProfilePicture from "./ProfilePicture";
import jwtDecode from "jwt-decode";
import RightContentArea from "./RightContentArea";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const editProfile = [
    ["text", "name", "Full Name", setName, false, name],
    ["email", "email", "Email", setEmail, true, email],
    ["password", "password", "Password", setPassword, false, password],
    ["text", "phoneNumber", "PhoneNumber", setPhoneNumber, false, phoneNumber],
  ];

  const updateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      email: email,
      password: password,
      name: name,
      phonenumber: phoneNumber,
    };
    setLoading(true);

    await axios
      .put(
        `http://localhost:3000/auth/edituser/${localStorage.getItem("userid")}`,
        updatedUser
      )
      .catch((err) => {
        console.error(err);
      })
      .then((r) => {
        setLoading(false);
        // console.log(r.data.token);
        setName(r.data.testData.name);
        setEmail(r.data.testData.email);
        setPassword(r.data.testData.password);
        setPhoneNumber(r.data.testData.phoneNumber);
        setPicture(r.data.testData.profilePicId);
        localStorage.setItem("userid", r.data.token);
      });
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    var userData = {};
    let data = new FormData();
    data.append("file", event.target.files[0]);
    // console.log(event.target.files[0]);
    axios
      .post("http://localhost:3000/file/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        console.error(err);
      })
      .then(async (res) => {
        // console.log("response: ", res?.data);
        userData = {
          ...jwtDecode(localStorage.getItem("userid")),
          profilePicId: res?.data,
        };
        console.log("userData:", userData?.profilePicId);
        await axios
          .put(
            `http://localhost:3000/auth/edituser/${localStorage.getItem(
              "userid"
            )}`,
            userData
          )
          .catch((err) => {
            console.error(err);
          })
          .then((r) => {
            // console.log(r.data.token);
            localStorage.setItem("userid", r.data.token);
            getProfileImage(res?.data);
          });
      });
  };

  const getUser = async () => {
    const data = await jwtDecode(localStorage.getItem("userid"));
    console.log(data);
    setName(data?.name);
    setEmail(data?.email);
    setPassword(data?.password);
    setPicture(data?.profilePicId);
    setPhoneNumber(data?.phonenumber ? data?.phonenumber : "");
    return data?.profilePicId;
  };

  const getProfileImage = async (res) => {
    console.log("res:", res);
    await axios
      .get(`http://localhost:3000/file/${res}`)
      .catch((err) => {
        // console.log(res);
        console.log(err);
      })
      .then((file) => {
        if (!file) {
          console.log("No Files");
        } else {
          // console.log(file.data.imgurl);
          setPicture(file.data.imgurl);
        }
      });
  };

  useEffect(() => {
    console.log("In useEffect");
    getUser().then((res) => getProfileImage(res));
  }, [localStorage.getItem("userid")]);

  return email ? (
    <div className="d-flex flex-column">
      <form type="submit" onSubmit={updateUser} className="p-3 mt-3">
        <center className="pb-3">
          <ProfilePicture
            image={picture ? picture : "https://picsum.photos/200"}
            uploadFile={uploadFile}
          />
        </center>
        {editProfile.map((ep, i) => (
          <div className="container col-md-5 col-sm-10">
            <Field
              disabled={ep[4]}
              type={ep[0]}
              id={ep[1]}
              label={ep[2]}
              onChange={(event) => ep[3](event.target.value)}
              value={ep[5]}
            />
          </div>
        ))}
        <center className="container col-md-5 col-sm-10">
          <Button
            onClick={updateUser}
            className="mt-4 p-3"
            color="primary"
            type="submit"
            disabled={loading && true}
          >
            Update Profile
          </Button>
        </center>
      </form>
      <div className="d-flex flex-row justify-content-center">
        <RightContentArea myprofile={true} />
      </div>
    </div>
  ) : (
    ""
  );
}
