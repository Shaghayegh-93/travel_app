import React from "react";
import {  BiSolidBeer } from "react-icons/bi";
import { FaCocktail, FaShuttleVan, FaHiking } from "react-icons/fa";

import Titles from "./Titles";


const Services = () => {
  return (
    <div className="flex flex-col items-center ">
      <Titles title="Services" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-[1400px] py-16 px-4 m-auto gap-10 ">
        <SingleService
          serviceIcon={<FaCocktail />}
          serviceTitle="Free Cocktails"
          serviceDescription="excepteur cillum proident in occaecat ea ut in Lorem minim consectetur officia incididunt aliquip ex ea sunt sit velit mollit eiusmod "
        />
        <SingleService
          serviceIcon={<FaHiking />}
          serviceTitle="Endless Hiking"
          serviceDescription="excepteur cillum proident in occaecat ea ut in Lorem minim consectetur officia incididunt aliquip ex ea sunt sit velit mollit eiusmod "
        />
        <SingleService
          serviceIcon={<FaShuttleVan />}
          serviceTitle=" Free Shuttle"
          serviceDescription="excepteur cillum proident in occaecat ea ut in Lorem minim consectetur officia incididunt aliquip ex ea sunt sit velit mollit eiusmod "
        />
        <SingleService
          serviceIcon={<BiSolidBeer />}
          serviceTitle="Best Beer"
          serviceDescription="excepteur cillum proident in occaecat ea ut in Lorem minim consectetur officia incididunt aliquip ex ea sunt sit velit mollit eiusmod "
        />
      </div>
    </div>
  );
};

export default Services;

function SingleService({ serviceIcon, serviceTitle, serviceDescription }) {
  return (
    <div className="flex flex-col items-center gap-3 hover:bg-opacity-40 hover:bg-black/30 p-4 group transition ease-in duration-300">
      <span className="text-[40px] text-gray-500 group-hover:text-white">{serviceIcon}</span>
      <h3 className="font-bold text-lg">{serviceTitle}</h3>
      <p className="text-center">{serviceDescription}</p>
    </div>
  );
}
