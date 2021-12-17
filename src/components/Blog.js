import axios from "axios";
import Field from "../components/Field";
import "./Blog.css";
import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import {
  Form,
  Card,
  CardFooter,
  CardBody,
  Button,
  CardHeader,
} from "reactstrap";


export default function Blog() {
  const [userId, setuserId] = useState("");
  const [value_title, setTitle] = useState("");
  const [value_body, setBody] = useState("");

  const addBlog = async (e) => {
    e.preventdefault();
    const blog = { userId: 1, title: value_title, content: value_body,time:Date.now()};
       const token = await axios
     .post("http://localhost:3001/auth/createblog", blog)
     .catch((err) => {
       console.log(err);
     })
     .then(() => {});
  }
  return (
    <div className="blog-page ">
      <Form type="submit" onSubmit={addBlog} className="form-horizontal w-100">
        <Card>
          <CardHeader>
            <label><i>Title</i></label>
            <br />
            <Field
              key={1}
              type={"text"}
              name={"blog"}
              id={"blog"}
              placeholder={"Blog"}

            />

          </CardHeader>

          <CardBody>
            <label><i>content</i></label><br />
            <Field
              key={1}
              type={"text"}
              name={"blog"}
              id={"blog"}
              placeholder={"Blog"}

            />
          </CardBody>
          <CardFooter>
            <Button type="submit">Post Blog</Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}