import axios from "axios";
import "./post.css";
import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import { Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function CreatePost() {
  const [value_title, setTitle] = useState("");
  const [value_body, setBody] = useState("");
  const query = useQuery();
  const history = useHistory();

  const addPost = async (e) => {
    e.preventDefault();
    console.log(e);
    const post = {
      userId: localStorage.getItem("userid"),
      Title: value_title,
      content: value_body,
      time: Date.now(),
    };
    await axios
      .post("http://localhost:3000/posts/createpost", post)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res?.data);
        if (res?.data) {
          history.push({
            pathname: "/posts",
            search: `?userid=${query.get("userid")}`,
          });
        }
      });
  };

  const fetchPost = async () => {
    axios
      .get(`http://localhost:3000/posts/post/${query.get("postid")}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data[0]);
          setTitle(res.data[0]?.Title);
          setBody(res.data[0]?.content);
          console.log(value_body);
        } else {
          alert("Error fetching post");
        }
      });
  };

  useEffect(() => {
    console.log(query.get("edit"));
    if (query.get("edit")) {
      fetchPost();
    }
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    console.log("edit");
    const post = {
      userId: query.get("userid"),
      Title: value_title,
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
      <FormGroup col>
        <Label for="title" sm={2} size="lg">
          Title
        </Label>
        <Col sm={10}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            value={value_title}
            id="title"
            placeholder="post's Title"
            bsSize="lg"
          />
        </Col>
        <Label for="body" sm={2} size="lg">
          Content
        </Label>
        <Col sm={10}>
          <Input
            onChange={(e) => setBody(e.target.value)}
            type="text"
            name="body"
            id="body"
            value={value_body}
            placeholder="Write here..."
            bsSize="lg"
          />
        </Col>
        <Button type="submit">Submit</Button>
      </FormGroup>
    </Form>
  );
}
