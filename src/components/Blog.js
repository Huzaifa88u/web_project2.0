import axios from "axios";
import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import {
  Form,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
} from "reactstrap";


export default function Blog() {
  const [userId,setuserId]=useState("");
  const [value_title,setTitle]=useState("");
  const [value_body,setBody]=useState("");
  
  const addBlog =async(e)=>{
         e.preventdefault();
          const blog={userId:1,Title:value_title,Body:value_body};
      //     const token = await axios
      // .post("http://localhost:3001/auth/createblog", blog)
      // .catch((err) => {
      //   console.log(err);
      // })
      // .then(() => {});
  }
  return (
    <Form className="form-horizontal">
      <Card>
        <CardHeader>
        <label><i>Title</i></label><br/>
          <input className="blog-title" value_title="" type="text"/>
        </CardHeader>
        
        <CardBody>
        <label><i>Body</i></label><br/>
          <input className="blog-body" value_body="" type="text" />
        </CardBody>
        <CardFooter>
          <h2>This is footer</h2>
        </CardFooter>
      </Card>
    </Form>
  );
}