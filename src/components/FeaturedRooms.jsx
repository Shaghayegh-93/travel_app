import React from "react";
import SingleRoom from "./Room";
import Titles from "./Titles";
import { useRoomList } from "../context/RoomListProvider";
import Loading from "./Loading";
import Room from "./Room";
const FeaturedRooms = () => {
  const { roomList, featuredRoomList, isLoading } = useRoomList();

const rooms= featuredRoomList?.map((item) => {
            return <Room item={item} key={item.id} />;
          })
  return (
    <div className="flex flex-col">
      <Titles title="Featured Rooms" />
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1400px] py-16 px-4 m-auto gap-10 gap-y-20">
        {!isLoading ? <Loading /> : rooms}
      </div>
    </div>
  );
};

export default FeaturedRooms;
