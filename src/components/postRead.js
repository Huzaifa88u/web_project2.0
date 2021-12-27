import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ReadPost = () => {
  const history = useHistory();
  const query = useQuery();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const fetchPost = async () => {
    if (localStorage.getItem("userid")) {
      await axios
        .get(`http://localhost:3000/posts/post/${query.get("postid")}`)
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          console.log(res);
          setTitle(res.data[0].Title);
          setContent(res.data[0].content);
        });
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPost();
  });

  return (
    <div className="container w-100">
      <center>
        <h1>{title}</h1>
      </center>
      <center>
        <p>{content}</p>
      </center>
    </div>
  );
};

export default ReadPost;
