import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import qs from "query-string";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const AdCard = (props) => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  useEffect(() => {});

  const handleClick = () => {
    history.push({
      pathname: "/blog",
      search: `?blogid=${props.id}`,
    });
  };

  const handleEdit = () => {
    const queryParam = qs.parse(location.search);
    const newQueryParam = {
      ...queryParam,
      blogid: props.id,
      edit: true,
    };
    history.push({
      pathname: "/editblog",
      search: qs.stringify(newQueryParam),
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3000/blogs/deleteblog/${props.id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        // history.push({
        //   pathname: "/blogs ",
        //   search: `?userid=${query.get("userid")}`,
        // });
      });
  };

  return (
    <div class="shadow p-3 mb-5 bg-white rounded col-12 bg-light">
      <div className="d-flex flex-row">
        <div
          className="d-flex flex-sm-column col-9 w-100 p-0 m-0 "
          onClick={handleClick}
        >
          <h1 className="Title">{props.title}</h1>
          <p className="Content">{props.content}</p>
          <h6 className="Time">{props.time}</h6>
        </div>
        {props.editable ? (
          <div className="col-3 d-flex flex-row justify-content-between">
            <Button color="warning" onClick={handleEdit}>
              Edit
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdCard;
