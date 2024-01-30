import React, { useEffect } from "react";
import { useRoomList } from "../context/RoomListProvider";
import Titles from "./Titles";

const Filters = () => {
  const {
    roomList,
    type,
    capacity,
    price,
    minPrice,
    minSize,
    breakfast,
    pets,
    filterChangedHandler,
    maxPrice,
    maxSize,
    filterdRoomList,
  } = useRoomList();
  const types = roomList.map((room) => room.type);
  let uniqueTypes = [...new Set(types)];
  uniqueTypes = ["all", ...uniqueTypes];
  const typeOptions = uniqueTypes.map((type) => (
    <option value={type}>{type}</option>
  ));
  const peopleCapacity = roomList.map((room) => room.capacity);
  let uniqueCapacity = [...new Set(peopleCapacity)];
  const capacityOptions = uniqueCapacity.map((capacity) => (
    <option value={capacity}>{capacity}</option>
  ));

  console.log(maxPrice);

  useEffect(() => {
  
    filterdRoomList();
  }, [type, capacity,maxPrice]); 

  console.log("priceeeeeeeeeeeee",price);
  return (
    <div className="flex flex-col ">
      <Titles title="Search Rooms" />
      <form className="max-w-[1400px] py-16 px-4 m-auto gap-4 flex">
        <div className="flex flex-col">
          <label htmlFor="type"> Room Type </label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={filterChangedHandler}
            className="border"
          >
            {typeOptions}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="capacity"> Guests </label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            onChange={filterChangedHandler}
            className="border"
          >
            {capacityOptions}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="price"> Room Price ${maxPrice} </label>
          <input
            type="range"
            name="price"
            id="price"
            value={price}
            onChange={filterChangedHandler}
            className="border"
            min={minPrice}
            max={maxPrice||1000}
          />
        </div>
      </form>
    </div>
  );
};

export default Filters;
