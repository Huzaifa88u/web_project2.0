import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ls from "local-storage";
import AdCard from "./AdCard";
import Pagination from "./Pagination";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const RightContentArea = () => {
  const [posts, setPosts] = useState([]);
  const query = useQuery();
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [postCount, setPostCount] = useState(1);
  const getPost = async () => {
    await axios
      .get(`http://localhost:3000/Posts/getPosts/${2}/${page}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        setEmpty(true);
        setPosts(res?.data);
      });
  };

  const fetchMyPosts = async () => {
    console.log({ message: ls.get("userid") });

    await axios
      .get(`http://localhost:3000/posts/myposts/${ls.get("userid")}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        setEmpty(true);
        setPosts(res?.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/postcount")
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setPostCount(res?.data.count);
      });
    console.log("getdata");
    !query.get("myposts") ? getPost() : fetchMyPosts();
    console.log(page);
  }, [page]);

  return posts ? (
    <div class="h-100 p-4 border border-black mt-5 d-inline-block col-sm-12 col-md-9 bg-light">
      <br />
      {posts?.map((b, i) => (
        <AdCard
          title={b["Title"]}
          content={b["content"].slice(0, 30)}
          time={b["time"]}
          id={b["_id"]}
          editable={query.get("myposts") ? true : false}
          key={i}
        />
      ))}
      <hr />
      <Pagination postCount={postCount} page={page} setPage={setPage} />
    </div>
  ) : (
    <h2>{!empty ? "Loading..." : "There are no posts yet..."}</h2>
  );
};

export default RightContentArea;
