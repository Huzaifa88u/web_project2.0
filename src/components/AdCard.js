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

  const [contentEdit, setContentEdit] = useState(false);
  const [picture, setPicture] = useState(null);
  const [content, setContent] = useState(props.data.content);
  const date = new Date(props.data.time);
  const [likes, setLikes] = useState(
    parseInt(props.data.likes ? props.data.likes : 0)
  );
  useEffect(async () => {
    console.log(content);
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      try {
        await axios.delete(`http://localhost:3000/file/${props.data.imageId}`);
      } catch (error) {
        console.log(error);
        return;
      }
      await axios.delete(
        `http://localhost:3000/posts/deletepost/${props.data._id}/`
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    let dataa = { ...props.data, content: content };
    try {
      console.log("handleUpdate");
      await axios.put(
        `http://localhost:3000/posts/editPost/${props.data._id}`,
        dataa
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      class="shadow p-3 m-3 mb-5 bg-white rounded bg-light"
      style={{ width: "fit-content" }}
    >
      <div className="d-flex flex-column">
        <div className="d-flex flex-column p-0 m-0">
          <strong>{props.data.username}</strong>
          {!contentEdit ? (
            <p className="Content">{content}</p>
          ) : (
            <input
              type="text"
              defaultValue={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
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

        {props.editable ? (
          <div className="d-flex flex-row justify-content-between">
            <Button
              color="warning"
              className="m-1"
              onClick={(e) => {
                e.preventDefault();
                console.log(contentEdit);
                if (contentEdit) {
                  handleUpdate(e);
                }
                setContentEdit(!contentEdit);
              }}
            >
              {contentEdit ? "Update post" : "Edit"}
            </Button>
            <Button color="danger" className="m-1" onClick={handleDelete}>
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
