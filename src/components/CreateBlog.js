import axios from "axios";
import Header from "./header";
import Field from "./Field";
import "./Blog.css";
import React, { useEffect, useState } from "react";
import {
  Form
} from "reactstrap";
import { Col, FormGroup, Label, Input, Button } from 'reactstrap';
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";


function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function createBlog() {
  const [value_title, setTitle] = useState("");
  const [value_body, setBody] = useState("");
  const query = useQuery();

  useEffect(() => {
    console.log(query.get("userid"));
  });

  const addBlog = async (e) => {
    e.preventDefault();
    console.log(e);
    const blog = { userId: query.get("userid"), Title: value_title, content: value_body, time: Date.now() };
    const token = await axios
      .post("http://localhost:3000/auth/createblog", blog)
      .catch((err) => {
        console.log(err);
      })
      .then(() => { });
  }
  return (
    <Form onSubmit={addBlog}>
      <FormGroup col>
        <Label for="title" sm={2} size="lg">Title</Label>
        <Col sm={10}>
          <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" placeholder="Blog''s Title" bsSize="lg" />
        </Col>
        <Label for="body" sm={2} size="lg">Content</Label>
        <Col sm={10}>
          <Input onChange={(e) => setBody(e.target.value)} type="text" name="body" id="body" placeholder="Write here..." bsSize="lg" />
        </Col>
        <Button type="submit">Submit</Button>
      </FormGroup>
    </Form>
  );
}