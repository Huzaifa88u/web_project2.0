import { Avatar } from "@material-ui/core";
import "./Post.css";
import InputOptions from "./inputOptions";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const Post = (props) => {
  return (
    <div className="post container">
      <div className="col-lg-12 bg-grey">
        <div className="post_header">
          <Avatar />
          <div className="post_info">
            {console.log(props.name)}
            <h2>{props.name}</h2>
            <p>{props.description}</p>
          </div>
        </div>
        <div className="post_body">
          <p> {props.message} </p>
        </div>
        <div className="post_buttons">
          <InputOptions
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color="gray"
          />
          <InputOptions Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOptions Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOptions Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
      </div>
    </div>
  );
};

export default Post;
