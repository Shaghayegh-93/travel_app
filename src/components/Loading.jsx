import React from "react";
import myGif from "../assets/images/loading-arrow.gif";


const Loading = () => {
//   const { isLoading } = useRoomList();
  return (
    <div>
      <div>
        <img src={myGif} alt="loading..." />

      </div>
    </div>
  );
};

export default Loading;
