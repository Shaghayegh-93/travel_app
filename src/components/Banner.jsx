import React from "react";

const Banner = ({ children, title, subtitle }) => {
 
  return (
    <div className="flex gap-4 flex-col items-center justify-center backdrop-opacity-10 backdrop-invert bg-black/30 md:w-[40%] w-full h-auto p-10 mx-4 md:mx-0">
      <h1 className="font-Gilda text-white font-bold text-lg md:text-4xl md:tracking-tight">
        {title?.toLocaleUpperCase()}
      </h1>
      <span className="flex items-center justify-center h-1 w-16 md:w-40  bg-white"></span>
      <p className="text-sm md:text-lg font-medium">{subtitle}</p>
      {children}
    </div>
  );
};

export default Banner;
