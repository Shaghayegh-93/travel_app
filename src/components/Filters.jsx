import React, { useEffect } from "react";
import { useRoomList } from "../context/RoomListProvider";
import Titles from "./Titles";

const Filters = () => {
  const {
    roomList,
    type,
    capacity,
    price,
    breakfast,
    pets,
    filterChangedHandler,

    filterdRoomList,
  } = useRoomList();
  const types = roomList?.map((room) => room.type);
  let uniqueTypes = [...new Set(types)];
  uniqueTypes = ["all", ...uniqueTypes];
  const typeOptions = uniqueTypes.map((type, index) => (
    <option key={index} value={type}>
      {type}
    </option>
  ));

  useEffect(() => {
    filterdRoomList();
  }, [type]);

  return (
    <div className="flex flex-col ">
      <Titles title="Search Rooms" />
      <form className="max-w-[1400px] py-10 px-4 m-auto gap-2 md:gap-4 flex flex-col md:flex-row">
        <div className="flex ">
          <label
            className="mr-2 font-Gilda text-lg flex items-center"
            htmlFor="type "
          >
            Filter By Room Type :
          </label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={filterChangedHandler}
            className="border"
            required
          >
            {typeOptions}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
