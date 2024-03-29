import React from "react";

import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useRoomList } from "../context/RoomListProvider";
import heroImage from "../assets/images/room-1.jpeg";
import Filters from "../components/Filters";
import Room from "../components/Room";

const RoomListPage = () => {
  const { roomList, sortedRoomList } = useRoomList();
  if (roomList?.length === 0)
    return <p>unfortunately no rooms matched your search parametrs.</p>;
  return (
    <div className="">
      <Layout>
        <Hero backgroundImage={heroImage}>
          <Banner title="OUR ROOMS">
            <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in ">
              <Link to="/"> HOME</Link>
            </button>
          </Banner>
        </Hero>
        <Filters />
        {sortedRoomList?.length === 0 ? (
          <p className="flex items-center justify-center mb-10">
            Unfortunately, no rooms matched your search parameters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-auto-fill-270 max-w-[1400px]  px-4 m-auto gap-10 gap-y-10">
            {sortedRoomList?.map((item) => {
              return <Room item={item} key={item.id} />;
            })}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default RoomListPage;
