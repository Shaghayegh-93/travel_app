import React from "react";

const Titles = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <h2 className="text-black/80 font-bold text-4xl tracking-widest mb-3 font-Gilda text-center">
        {title}
      </h2>
      <span className="flex items-center justify-center h-1 w-16 md:w-28  bg-gray-500"></span>
    </div>
  );
};

export default Titles;
