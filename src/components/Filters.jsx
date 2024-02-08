import React, { useEffect } from "react";
import { useRoomList } from "../context/RoomListProvider";
import Titles from "./Titles";

const Filters = () => {
  const {
    roomList,
    roomOption,
    filterChangeHandler,
    filterRooms,
    maxPrice,
    minPrice,
  } = useRoomList();
  const { type, capacity, price, pets, breakfast } = roomOption;

  const types = roomList?.map((room) => room.type);

  let uniqueTypes = [...new Set(types)];

  uniqueTypes = ["all", ...uniqueTypes];

  const typeOptions = uniqueTypes.map((type, index) => (
    <option key={index} value={type}>
      {type}
    </option>
  ));

  const peopleCapacity = roomList.map((room) => room.capacity);
  let uniqueCapacity = [...new Set(peopleCapacity)];
  const capacityOptions = uniqueCapacity.map((capacity, index) => (
    <option key={index} value={capacity}>
      {capacity}
    </option>
  ));

  useEffect(() => {
    filterRooms(roomOption);
  }, [roomOption]);

  return (
    <div className="flex flex-col ">
      <Titles title="Search Rooms" />
      <form className="max-w-[1400px] py-10 px-4 m-auto gap-2 md:gap-4 flex flex-col md:flex-row font-Gilda">
        <div className="flex flex-col ">
          <label
            className="mr-2 font-Gilda text-lg flex items-center"
            htmlFor="type "
          >
            Type :
          </label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={filterChangeHandler}
            className="border"
            required
          >
            {typeOptions}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            className="mr-2 font-Gilda text-lg flex items-center"
            htmlFor="capacity"
          >
            {" "}
            Guests :{" "}
          </label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            onChange={filterChangeHandler}
            className="border"
            required
          >
            {capacityOptions}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            className="mr-2 font-Gilda text-lg flex items-center"
            htmlFor="price"
          >
            {" "}
            Price ${price === 0 ? minPrice : price}
          </label>
          <input
            name="price"
            id="price"
            type="range"
            value={price}
            onChange={filterChangeHandler}
            className="border w-full"
            min={minPrice}
            max={maxPrice}
            list="values"
            // required
          />
          <datalist id="values" className="text-black flex justify-between">
            <option value={price} label={100}></option>
            <option value={price} label={maxPrice}></option>
          </datalist>
        </div>
        <div className="flex items-center justify-center md:gap-1">
          <label
            className=" font-Gilda text-lg flex items-center"
            htmlFor="pets"
          >
            {" "}
            pets:{" "}
          </label>
          <input
            name="pets"
            id="pets"
            type="checkbox"
            value={pets}
            onChange={filterChangeHandler}
            className="border w-full"
          />
        </div>
        <div className="flex items-center justify-center md:gap-1">
          <label
            className=" font-Gilda text-lg flex items-center"
            htmlFor="pets"
          >
            {" "}
            breakfas:{" "}
          </label>
          <input
            name="breakfast"
            id="breakfast"
            type="checkbox"
            value={breakfast}
            onChange={filterChangeHandler}
            className="border w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Filters;
3;
