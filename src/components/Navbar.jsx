import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const navClickHandler = () => {
    setNav(!nav);
    if (!nav) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  };
  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-50">
      <div className="flex  items-center justify-between w-full">
        <div className="text-gray-500 font-bold text-2xl z-20 flex items-center justify-center border-2 md:px-12 py-1 md:mr-8">
          <Link to="/">
            <span className="pr-2">BEST</span>
            <span className="text-black">HOTEL</span>
          </Link>
        </div>
        {/* <div> */}
          <HiMenuAlt3
            onClick={navClickHandler}
            size={25}
            className="z-20 text-gray-500 cursor-pointer md:hidden -mr-36
            
            "
          />
        {/* </div> */}

        <nav className="z-20 ">
          <ul className="hidden md:flex items-center gap-6 ">
            <li className="text-lg font-medium cursor-pointer relative ">
              <Link
                className="transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[2px]  after:bg-white after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 "
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="text-lg font-medium cursor-pointer">
              <NavLink to="/rooms">Rooms</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={
          nav
            ? "fixed top-0 left-0 w-full h-screen items-center bg-black/90 text-gray-300 py-7 px-4  z-10 ease-in duration-500"
            : "absolute h-screen top-0 left-[-100%] z-10 ease-in duration-50000"
        }
      >
        <ul className="flex flex-col items-center justify-center w-full h-full">
          <li className="text-3xl font-bold p-8">Home</li>
          <li className="text-3xl font-bold p-8">Rooms</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
