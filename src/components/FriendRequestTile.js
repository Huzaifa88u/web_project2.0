import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
const FriendRequestTile = () => {
  return (
    <Card style={{ width: "30rem" }}>
      <Card.Body>
        <div className="row">
          <div className="col-3 mr-5">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24 }}
            />
          </div>
          <div className="col-6 ml-5 pl-4">
            <Card.Title>Huzaifa Shahzad</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              huzaifa88u@gmail.com
            </Card.Subtitle>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FriendRequestTile;
