import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { FaHotel, FaTrashAlt } from "react-icons/fa";
import { useRoomList } from "../context/RoomListProvider";
import Modal from "./Modal";
import toast from "react-hot-toast";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const { slug } = useParams();
  const { room, bookedRoom } = useRoomList();

  const navClickHandler = () => {
    setNav(!nav);
    if (!nav) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  };

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-gray-50">
      <div className="flex  items-center justify-between w-full">
        <div className="text-gray-500 font-bold text-2xl z-20 flex items-center justify-center border-2 px-4 md:px-12 py-1 md:mr-8">
          <NavLink to="/">
            <span className="pr-2">BEST</span>
            <span className=" md:text-black">HOTEL</span>
          </NavLink>
        </div>

        <HiMenuAlt3
          onClick={navClickHandler}
          size={25}
          className="z-20 text-gray-500 cursor-pointer md:hidden -mr-28  "
        />

        <nav className="z-20 ">
          <ul className="hidden md:flex items-center gap-6 ">
            <li
              className={`text-lg font-medium cursor-pointer relative ${
                isNavLinkActive("/") ? "text-blue-400" : ""
              }`}
            >
              <NavLink
                className=" transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[3px]  after:bg-gray-500 after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100  "
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li
              className={`text-lg font-medium cursor-pointer relative ${
                isNavLinkActive("/rooms") ? "text-blue-400" : ""
              }`}
            >
              <NavLink
                className="transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[3px]  after:bg-gray-500 after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 "
                to="/rooms"
              >
                Rooms
              </NavLink>
            </li>
            <li
              className={`text-lg font-medium cursor-pointer relative ${
                isNavLinkActive("/gallery") ? "text-blue-400" : ""
              }`}
            >
              <NavLink
                className="transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[3px]  after:bg-gray-500 after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 "
                to="/gallery"
              >
                Gallery
              </NavLink>
            </li>

            <li>
              <BookedRoomList />
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={
          nav
            ? "fixed top-0 left-0 w-full h-screen items-center bg-black/90 text-gray-300 py-7 px-4  z-10 ease-in duration-500"
            : "absolute h-screen top-0 left-[-100%] z-10 ease-in duration-50000"
        }
      >
        <ul className="flex flex-col items-center justify-center w-full h-full gap-y-10 mt-20">
          <li
            className={`text-lg font-medium cursor-pointer relative ${
              isNavLinkActive("/") ? "text-blue-400" : ""
            }`}
          >
            <NavLink
              className=" transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[3px]  after:bg-gray-500 after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 text-3xl p-8 font-bold  "
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li
            className={`text-lg font-medium cursor-pointer relative ${
              isNavLinkActive("/rooms") ? "text-blue-400" : ""
            }`}
          >
            <NavLink
              className="transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[3px]  after:bg-gray-500 after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 text-3xl p-8 font-bold "
              to="/rooms"
            >
              Rooms
            </NavLink>
          </li>
          <li
            className={`text-lg font-medium cursor-pointer relative ${
              isNavLinkActive("/gallery") ? "text-blue-400" : ""
            }`}
          >
            <NavLink
              className="transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[3px]  after:bg-gray-500 after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 text-3xl p-8 font-bold "
              to="/gallery"
            >
              Gallery
            </NavLink>
          </li>

          <li className="text-3xl p-8 font-bold ">
            <BookedRoomList />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

export function BookedRoomList() {
  const { room, bookedRoom, dispatch } = useRoomList();

  const [isOpen, setIsOpen] = useState(false);
  const removeBookedRoomHandler = (room) => {
    dispatch({ type: "removeBookedRoomListHandler", payload: room });
    toast.error("Room Removed");
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {bookedRoom &&
          bookedRoom?.map((room) => (
            <div
              className="flex items-center justify-between mb-4 text-white border"
              room={room}
              key={room.id}
            >
              <div className="flex w-full justify-between p-4">
                <div className="md:w-1/2">
                  <div className="flex flex-col md:flex-row ">
                    <div className="md:w-1/4  flex flex-col text-sm ">
                      <h3 className="md:font-bold ">Details</h3>
                      <ul className="flex flex-col">
                        <li>
                          <span className="font-medium text-gray-300 text-sm">
                            Price:
                          </span>
                          ${room.price}
                        </li>
                        <li>
                          <span className="font-medium text-gray-300 text-sm ">
                            Size:
                          </span>
                          {room.size}
                        </li>
                        <li>
                          <span className="font-medium text-gray-300 text-sm ">
                            Capacity:
                          </span>
                          {room.capacity > 1
                            ? `${room?.capacity} People`
                            : `${room?.capacity} Person`}
                        </li>
                        <li>
                          {room?.pets ? (
                            <span className="font-medium text-gray-300 text-sm ">
                              Pets Allowed
                            </span>
                          ) : (
                            <span>Pets Not Allowed</span>
                          )}
                        </li>
                        <li>
                          {room?.breakfast && (
                            <span>Free Breakfast Included</span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:w-3/4 w-full items-center flex">
                  <img
                    src={room?.images?.[0] || defaultImage}
                    alt=""
                    className="w-full rounded-md  object-cover"
                  />
                </div>
              </div>
              <button
                className="border-none"
                onClick={() => removeBookedRoomHandler(room)}
              >
                <FaTrashAlt className="w-5 h-5 text-rose-500" />
              </button>
            </div>
          ))}
      </Modal>
      <button
        onClick={() => setIsOpen((is) => !is)}
        className="relative border-none cursor-pointer"
      >
        <FaHotel className="w-6 h-6 text-gray-700" />
        <span className="absolute text-xs top-0 right-1 h-4 leading-4 text-center bg-blue-400 text-black rounded-full   py-2 px-[5px]  flex items-center justify-center">
          {bookedRoom && bookedRoom.length >= 0 ? (
            <span className="text-white">{bookedRoom.length}</span>
          ) : (
            ""
          )}
        </span>
      </button>
    </>
  );
}
