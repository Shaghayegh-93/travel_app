import React from "react";
import Layout from "../components/Layout";
import Titles from "../components/Titles";
import rooms1 from "../assets/images/rooms1.avif";
import rooms2 from "../assets/images/rooms2.avif";
import rooms3 from "../assets/images/rooms3.avif";

const GallerPage = () => {
  return (
    <div>
      <Layout>
        <Titles title="Gallery" />
        <div className="grid lg:grid-cols-3 gap-4 lg:mb-[20%] pb-6 md:pb-0 md:mb-[35%] mx-auto my-20 pt-16 px-4 h-[500px] max-w-[1400px] bg-blue-100">
          <div className=" lg:col-span-1 lg:top-20 col-span-2 relative  ">
            <h3 className="text-2xl font-bold">Fine Interior Rooms</h3>
            <p className="pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate ipsam tenetur esse error repudiandae possimus?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 col-span-2  ">
            <img
              className="w-full h-full  object-cover "
              src={rooms1}
              alt="roomImage"
            />
            <img
              className="w-full h-full  object-cover row-span-2 "
              src={rooms2}
              alt="roomImage"
            />
            <img
              className="w-full h-full  object-cover "
              src={rooms3}
              alt="roomimage"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default GallerPage;
