import React, { useState } from "react";
import items from "../../data";
import SingleRoom from "./singleRoom";
import Titles from "./Titles";
const FeaturedRooms = () => {
//   const [featuredRoomList, setFeaturedRoomList] = useState([]);
  const updated = items.filter((item) => item.fields.featured);
  console.log(updated)
  console.log(items);
  return (
    <div className="flex flex-col">
      <Titles title="Featured Rooms" />
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1400px] py-16 px-4 m-auto gap-10 gap-y-20">
        {updated?.map((item) => {
          return <SingleRoom item={item} key={item.sys.id} />;
        })}
      </div>
      
    </div>
  );
};

export default FeaturedRooms;
