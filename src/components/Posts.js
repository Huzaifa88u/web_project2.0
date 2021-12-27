import Header from "./header";
import React from "react";
import RightContentArea from "./RightContentArea";

const Posts = () => {
  return (
    <div style={{ flex: "1" }} className="d-flex flex-column">
      <hr class="p-0 m-0" />
      <div class="container m-0 p-0" style={{ maxWidth: "100%" }}>
        <div class="m-0 d-flex flex-row justify-content-center flex-nowrap mx-md-5">
          <RightContentArea />
        </div>
      </div>
    </div>
  );
};
export default Posts;
