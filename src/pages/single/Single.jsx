import React from "react";
import Sidebar from "../../components /sidebar/sidebar";
import Singlepost from "../../components /singlepost/Singlepost";

function Single() {
  return (
    <div className=" flex">
        <Singlepost />
        <Sidebar />
    </div>

  );
}

export default Single;
