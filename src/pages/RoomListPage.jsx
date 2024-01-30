import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useRoomList } from "../context/RoomListProvider";
import heroImage from "../assets/images/room-1.jpeg";
import Filters from "../components/Filters";
import SingleRoom from "./components/SingleRoom";

const RoomListPage = () => {
  const { roomList, sortedRoomList } = useRoomList();
  console.log("sortedRoomList", sortedRoomList);
  // if (sortedRoomList.length === 0)
  //   return <p>unfortunately no rooms matched your search parametrs.</p>;
  return (
    <div>
      <Layout>
        <Hero backgroundImage={heroImage}>
          <Banner title="OUR ROOMS">
            <button className="py-2 font-medium border-2 hover:bg-black hover:text-white transition ease-in ">
              <Link to="/">RETURN HOME</Link>
            </button>
          </Banner>
        </Hero>
        <Filters />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-auto-fill-270 max-w-[1400px] py-16 px-4 m-auto gap-10 gap-y-20">
          {sortedRoomList?.map((item) => {
            return <SingleRoom item={item} key={item.id} />;
          })}
        </div>
      </Layout>
    </div>
  );
};

export default RoomListPage;
