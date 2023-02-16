import React from "react";
import hero from "../assets/images/hero.jpeg";

const Hero = () => {
  return (
    <div className="w-full h-screen ">
      <img
        alt="heroImage"
        src={hero}
        className="w-full h-screen object-cover top-0  left-0 "
      />
      <div className="bg-black/30 w-full h-screen absolute top-0 left-0" />
      <div className="w-full h-full absolute text-white flex flex-col justify-center top-0">
        <div className="md:left-[10%] max-w-[1100px]  m-auto p-4">
          <p className="font-bold text-5xl md:text-7xl drop-shadow-2xl">
            All Inclusive
          </p>
          <h1 className="max-w-[600px] drop-shadow-2xl py-2 text-xl">
            Private Beaches & Getaways
          </h1>
          <p className="mb-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            provident aperiam minus facere saepe quod, dolorem dolores natus
            incidunt dolore!
          </p>
          <button className="bg-white text-black">Reserve Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
