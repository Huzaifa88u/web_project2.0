import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ls from "local-storage";
import AdCard from "./AdCard";
import Pagination from "./Pagination";
import CreatePost from "./CreatePost";
import jwtDecode from "jwt-decode";

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const RightContentArea = ({ myprofile, userProfile, viewuserId }) => {
  const [posts, setPosts] = useState([]);
  const query = useQuery();
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [postCount, setPostCount] = useState(1);
  const getPost = async () => {
    let friendsres;
    const friends = [];
    const user = jwtDecode(ls.get("userid"));

    try {
      friendsres = await axios.get(
        `http://localhost:3000/friendships/getUserFriends/${localStorage.getItem(
          "userid"
        )}`
      );
      console.log(friendsres.data.requests);
      friends.push(0);
      for (let i = 0; i < friendsres.length; i++) {
        friends.push(
          friendsres[i].sender === user._id
            ? friendsres[i].sender
            : friendsres[i].sender
        );
      }
      // friendsres.data.requests.map((f) => friends.push(1));
      const encryptedString = cryptr.encrypt(friends);

      console.log("friends:", encryptedString);
    } catch (error) {
      console.log(error);
    }
    await axios
      .get("http://localhost:3000/posts/postcount")
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setPostCount(res?.data.count);
      });
    await axios
      .get(`http://localhost:3000/posts/getPosts/${3}/${page}`)
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
    const user = jwtDecode(ls.get("userid"));
    await axios
      .get(`http://localhost:3000/posts/postcount/${user._id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setPostCount(res?.data.count);
      });
    console.log({ message: user._id });
    try {
      const res = await axios.get(
        `http://localhost:3000/posts/myposts/${user._id}/${2}/${page}`
      );
      setPosts(res?.data);
      setEmpty(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserPosts = async () => {
    await axios
      .get(`http://localhost:3000/posts/friendpostcount/${viewuserId}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setPostCount(res?.data.count);
      });
    try {
      const res = await axios.get(
        `http://localhost:3000/posts/myposts/${viewuserId}/${2}/${page}`
      );
      setPosts(res?.data);
      setEmpty(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !myprofile ? getPost() : fetchMyPosts();
    // console.log(page);
  }, [page]);

  return posts ? (
    <div class="h-100 p-4 border border-black mt-5 d-inline-block col-sm-12 col-md-9 bg-light">
      {!myprofile && <CreatePost />}
      <br />
      <div className="d-flex flex-row flex-wrap">
        {posts?.map((b, i) => (
          <AdCard data={b} editable={myprofile} key={i} />
        ))}
      </div>
      <hr />
      <Pagination postCount={postCount} page={page} setPage={setPage} />
    </div>
  ) : (
    <h2>{!empty ? "Loading..." : "There are no posts yet..."}</h2>
  );
};

export default RightContentArea;
