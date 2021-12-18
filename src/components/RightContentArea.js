import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ls from "local-storage";
import AdCard from "./AdCard";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const RightContentArea = () => {
  const [blogs, setBlogs] = useState([]);
  const query = useQuery();
  const [empty, setEmpty] = useState(false);

  const getblog = async () => {
    await axios
      .get("http://localhost:3000/blogs/getblogs")
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
    !query.get("myblogs") ? getblog() : fetchMyBlogs();
    console.log(empty);
  }, []);

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
    </div>
  ) : (
    <h2>{!empty ? "Loading..." : "There are no blogs yet..."}</h2>
  );
};

export default RightContentArea;
