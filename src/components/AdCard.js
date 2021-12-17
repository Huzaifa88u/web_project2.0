import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const AdCard = (props) => {

  const history = useHistory();

  useEffect(() => {
  });

  const handleClick = () => {
    history.push({
      pathname:"/blog",
      search: `?blogid=${props.id}`
    })
  }

  return (
    <div class="shadow p-3 mb-5 bg-white rounded col-12 bg-light" onClick={handleClick}>
      <div class="d-flex flex-sm-column col-12 w-100 p-0 m-0 ">
        <h1 className='Title'>{props.title}</h1>
        <p className='Content'>{props.content}</p>
        <h6 className='Time'>{props.time}</h6>
      </div>
    </div>
  )
}

export default AdCard;