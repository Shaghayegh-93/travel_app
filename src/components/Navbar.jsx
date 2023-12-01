import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navClickHandler = () => {
    setNav(!nav);
    if (!nav) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  };
  return (
    <div className="w-full  absolute flex justify-between items-center p-4">
      <h1 className="text-white font-bold text-2xl z-20">Experiences</h1>
      {/* <HiMenuAlt3
        onClick={navClickHandler}
        size={25}
        className="z-20 text-white cursor-pointer"
      /> */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-full h-screen items-center bg-black/90 text-gray-300 py-7 px-4  z-10 ease-in duration-500"
            : "absolute h-screen top-0 left-[-100%] z-10 ease-in duration-50000"
        }
      >
        <ul className="flex flex-col items-center justify-center w-full h-full">
          <li className="text-3xl font-bold p-8">Home</li>
          <li className="text-3xl font-bold p-8">Destinations</li>
          <li className="text-3xl font-bold p-8">Reservations</li>
          <li className="text-3xl font-bold p-8">Amenities</li>
          <li className="text-3xl font-bold p-8">Rooms</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
