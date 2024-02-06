import React from "react";
import myGif from "../assets/images/loading-arrow.gif";

const Loading = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mx-auto">
        <img src={myGif} alt="loading..." />
        <p>Your Data Is Loading</p>
      </div>
    </div>
  );
};

export default Loading;
