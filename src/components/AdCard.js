import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import qs from "query-string";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const AdCard = (props) => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const [picture, setPicture] = useState(null);
  const date = new Date(props.data.time);
  const [likes, setLikes] = useState(
    parseInt(props.data.likes ? props.data.likes : 0)
  );
  useEffect(async () => {
    await getImage();
  });

  const getImage = async () => {
    try {
      const file = await axios.get(
        `http://localhost:3000/file/${props.data.imageId}`
      );
      if (!file) {
        console.log("No Files");
      } else {
        setPicture(file.data.imgurl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    history.push({
      pathname: "/post",
      search: `?postid=${props.data._id}`,
    });
  };

  const handleEdit = () => {
    const queryParam = qs.parse(location.search);
    const newQueryParam = {
      ...queryParam,
      postid: props.data._id,
      edit: true,
    };
    history.push({
      pathname: "/editpost",
      search: qs.stringify(newQueryParam),
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/posts/deletepost/${props.data._id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        // history.push({
        //   pathname: "/posts ",
        //   search: `?userid=${query.get("userid")}`,
        // });
      });
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const postie = {
      userId: props.data.userId,
      username: props.data.username,
      content: props.data.content,
      time: props.data.time,
      likes: likes + 1,
      imageId: props.data.imageId,
    };
    axios
      .put(`http://localhost:3000/posts/likes/${props.data._id}`, postie)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        setLikes(likes + 1);
      });
  };

  return (
    <div
      class="shadow p-3 mb-5 bg-white rounded col-12 bg-light"
      style={{ width: "fit-content" }}
    >
      <div className="d-flex flex-column">
        <div className="d-flex flex-column p-0 m-0" onClick={handleClick}>
          <strong>{props.data.username}</strong>
          <p className="Content">{props.data.content}</p>
          <h6 className="Time">{moment(date.toString()).fromNow()}</h6>
          {picture && (
            <img
              src={picture}
              width="35%"
              height="auto"
              style={{ borderRadius: "5px" }}
            />
          )}
        </div>

        {props.data.editable ? (
          <div className="d-flex flex-row justify-content-between">
            <Button color="warning" onClick={handleEdit}>
              Edit
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        ) : (
          <div className="col-3 d-flex flex-row justify-content-end align-items-center p-3 pl-5">
            <Button
              style={{ height: "fit-content" }}
              onClick={handleLike}
              color="danger"
            >
              <div>
                <ThumbUpAltOutlinedIcon fontSize="medium" />
                <p style={{ fontWeight: "bolder", fontSize: "60%" }}>
                  {likes ? likes : 0}
                </p>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCard;
