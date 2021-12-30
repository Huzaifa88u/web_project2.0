import "./Field.css";
import "./post.css";
import React, { useEffect, useState } from "react";
import { Col, Form } from "reactstrap";
import { Row, Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Avatar } from "@mui/material";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function CreatePost() {
  const [value_body, setBody] = useState("");
  const [img, setImg] = useState(null);
  const [temp, setTemp] = useState(null);
  const [err, setErr] = useState(null);
  const query = useQuery();
  const history = useHistory();

  const uploadFile = async () => {
    let data = new FormData();
    let res;

    data.append("file", img);
    try {
      res = await axios.post("http://localhost:3000/file/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res?.data === "you must select a file." ? null : res?.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    setErr(false);
    // console.log(e);
    const data = await jwtDecode(localStorage.getItem("userid"));
    const imageId = await uploadFile();
    console.log(imageId);
    console.log(value_body);
    if (value_body || imageId) {
      const post = {
        userId: data._id,
        content: value_body,
        time: Date.now(),
        likes: 0,
        imageId: imageId,
        username: data.name,
      };

      console.log("Post:", post);
      try {
        await axios.post("http://localhost:3000/posts/createpost", post);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErr(true);
      console.log(err);
    }
  };

  const fetchPost = async () => {
    axios
      .get(`http://localhost:3000/posts/post/${query.get("postid")}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res.data) {
          setBody(res.data[0]?.content);
          console.log(value_body);
        } else {
          alert("Error fetching post");
        }
      });
  };

  useEffect(() => {
    if (query.get("edit")) {
      fetchPost();
    }
    console.log(temp);
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    console.log("edit");
    const post = {
      userId: query.get("userid"),
      content: value_body,
      time: Date.now(),
    };
    axios
      .put(`http://localhost:3000/posts/editpost/${query.get("postid")}`, post)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          console.log("successful update");
          history.push("/posts");
        }
      });
  };

  return (
    <Form onSubmit={!query.get("edit") ? addPost : editPost}>
      <Row>
        <Col xs={2}></Col>
        <Col xs={6}>
          <input
            onChange={(e) => setBody(e.target.value)}
            type="text"
            name="body"
            id="body"
            value={value_body}
            placeholder="Write here..."
            className="createpost"
            bsSize="md"
          />
          {temp ? <strong> {temp.name} </strong> : ""}
          {err && (
            <div class="my-2 alert alert-danger" role="alert">
              Fail to post
            </div>
          )}
        </Col>
        <Col>
          <Button type="submit" color="dark" className="mr-2">
            Post
          </Button>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="add-profile-picture"
            type="file"
            onChange={(e) => {
              e.preventDefault();
              setImg(e.target.files[0]);
              setTemp(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <label htmlFor="add-profile-picture">
            <div className="btn btn-danger">
              <AddPhotoAlternateIcon />
            </div>
          </label>
        </Col>
      </Row>
    </Form>
  );
}
