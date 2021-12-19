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
  const [blogs, setBlogs] = useState([]);
  const query = useQuery();
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [blogCount, setBlogCount] = useState(1);
  const getblog = async () => {
    await axios
      .get(`http://localhost:3000/blogs/getblogs/${2}/${page}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setBlogs(res?.data);
      });
  };

  const fetchMyBlogs = async () => {
    console.log({ message: ls.get("userid") });

    await axios
      .get(`http://localhost:3000/blogs/myblogs/${ls.get("userid")}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        setEmpty(true);
        setBlogs(res?.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs/blogcount")
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setBlogCount(res.data.count);
      });
    !query.get("myblogs") ? getblog() : fetchMyBlogs();
    console.log(page);
  }, [page]);

  return blogs ? (
    <div class="h-100 p-4 border border-black mt-5 d-inline-block col-sm-12 col-md-9 bg-light">
      <br />
      {blogs?.map((b, i) => (
        <AdCard
          title={b["Title"]}
          content={b["content"].slice(0, 30)}
          time={b["time"]}
          id={b["_id"]}
          editable={query.get("myblogs") ? true : false}
          key={i}
        />
      ))}
      <hr />
      <Pagination blogCount={blogCount} page={page} setPage={setPage} />
    </div>
  ) : (
    <h2>{!empty ? "Loading..." : "There are no blogs yet..."}</h2>
  );
};

export default RightContentArea;
