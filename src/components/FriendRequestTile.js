import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
const FriendRequestTile = ({ name, email }) => {
  return (
    <Card style={{ width: "20rem", height: "6rem" }} className="m-3">
      <Card.Body>
        <div className="row">
          <div className="col-3 ">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              size={50}
              round="50px"
            />
          </div>
          <div className="col-7">
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="text-muted">{email}</Card.Subtitle>
          </div>
          <div className="col-2 p-0 cursor-pointer">
            <a>
              <PersonAddIcon />
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FriendRequestTile;
