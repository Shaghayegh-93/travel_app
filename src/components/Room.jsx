import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/images/room-1.jpeg";

const Room = ({ item }) => {
  return (
    <div>
      <div className="relative ">
        <div className="relative group">
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-50 transition-opacity ease-in duration-300"></div>

          <span className="absolute top-0 left-0 text-white p-1 rounded-br-md bg-black/60 opacity-100 group-hover:opacity-0 transition-opacity ease-in duration-300">
            ${item.price}&nbsp; <br />
            <span className="text-[12px]">per night</span>
          </span>

          <img
            src={item?.images[0] || defaultImage}
            alt=""
            className="w-full h-full"
          />

          <button className="border p-2 z-20 opacity-0 group-hover:opacity-100  items-center absolute top-[40%] left-[40%] bg-gray-400 transition-opacity ease-in duration-500 delay-100">
            <Link to={`/rooms/${item.slug}`}>Details</Link>
          </button>
        </div>

        <p className=" bg-gray-300 text-center p-2">
          {" "}
          {item.name.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default Room;
