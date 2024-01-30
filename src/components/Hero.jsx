import React, { useState } from "react";
import hero from "../assets/images/hero.jpeg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, compareAsc, format } from "date-fns";
import { Link, NavLink, useLocation } from "react-router-dom";

const Hero = ({ backgroundImage, children }) => {
  // const location = useLocation();
  // const defaultBackground = location.pathname === "/";
  // const roomBackground = location.pathname === "/rooms";
  // const singleRoomBackground = location.pathname === "/rooms/:slug";

  return (
    <header
      className="bg-no-repeat min-h-[calc(100vh-80px)] bg-center bg-cover flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </header>
  );
};

export default Hero;
