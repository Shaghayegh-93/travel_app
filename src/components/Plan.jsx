import React from "react";
import plan1 from "../assets/images/plan1.jpg";
import plan2 from "../assets/images/plan2.jpg";
import plan3 from "../assets/images/plan3.jpg";
import plan4 from "../assets/images/plan4.jpg";
import plan5 from "../assets/images/plan5.jpg";

const Plan = () => {
  return (
    <div className="max-w-[1400px] py-16 px-4 m-auto grid lg:grid-cols-2 gap-4">
      <div className="grid grid-cols-2 grid-rows-6 h-[80vh]">
        <img
          className="object-cover w-full h-full row-span-3 p-2"
          src={plan1}
          alt="beachImage"
        />
        <img
          className="object-cover w-full h-full row-span-2 p-2 "
          src={plan2}
          alt="beachImage"
        />
        <img
          className="object-cover w-full h-full row-span-2 p-2 "
          src={plan3}
          alt="beachImage"
        />
        <img
          className="object-cover w-full h-full row-span-3 p-2 "
          src={plan4}
          alt="beachImage"
        />
        <img
          className="object-cover w-full h-full row-span-2 p-2 "
          src={plan5}
          alt="beachImage"
        />
      </div>
      <div className="flex h-full flex-col justify-center">
        <h3 className="text-5xl md:text-6xl font-bold">Plan Your Next Trip</h3>
        <p className="text-2xl py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          quae?
        </p>
        <p className="pb-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae iusto
          consequuntur eaque possimus praesentium, et ullam magni voluptates id
          iste numquam aliquam quod atque porro laudantium consequatur provident
          mollitia inventore.
        </p>
        <div>
          <button className="border-black mr-4 hover:shadow-xl">
            Learn More
          </button>
          <button className="border-black bg-black text-white hover:shadow-xl">
            Book Your Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;
