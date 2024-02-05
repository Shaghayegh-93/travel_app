import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Hero = ({ backgroundImage, children }) => {
  return (
    <header
      className="bg-no-repeat min-h-[calc(100vh-200px)] bg-center bg-cover flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </header>
  );
};

export default Hero;
