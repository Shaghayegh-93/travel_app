import React, { createContext, useContext, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import Client from "../contentful";
import toast from "react-hot-toast";

const RoomListContext = createContext();
const initialState = {
  roomList: [],
  sortedRoomList: [],
  featuredRoomList: [],
  room: null,
  isLoading: false,
  roomOption: {
    type: "all",
    capacity: 1,
    price: 0,
    breakfast: false,
    pets: false,
  },
  maxPrice: 0,
  minPrice: 0,

  bookedRoom: JSON.parse(localStorage.getItem("bookedRoom")) || [],
};

function roomListReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "roomList/loaded":
      return {
        ...state,

        roomList: action.payload.sort((roomA, roomB) => {
          if (roomA.price > roomB.price) return 1;
          if (roomA.price < roomB.price) return -1;
          return 0;
        }),
      };

    case "singleRoom/loaded":
      return {
        ...state,
        room: action.payload,
      };
    case "getFeaturedRoom/loaded":
      return {
        ...state,
        featuredRoomList: action.payload,
      };
    case "roomFilterOption":
      return {
        ...state,
        roomOption: {
          ...state.roomOption,
          ...action.payload,
        },
      };

    case "getAllFilterData":
      return {
        ...state,
        sortedRoomList: action.payload.sort((roomA, roomB) => {
          if (roomA.price > roomB.price) return 1;
          if (roomA.price < roomB.price) return -1;
          return 0;
        }),
      };

    case "maxPrice/loaded":
      return {
        ...state,
        maxPrice: action.payload,
      };
    case "minPrice/loaded":
      return {
        ...state,
        minPrice: action.payload,
      };

    case "getBookedRoom/loaded":
      return {
        ...state,

        bookedRoom: [...state.bookedRoom, action.payload],
      };

    case "removeBookedRoomListHandler":
      return {
        ...state,
        bookedRoom: state.bookedRoom.filter(
          (room) => room.id !== action.payload.id
        ),
      };
    case "countBookedRoom":
      return {
        ...state,
        bookedRoom: state.bookedRoom.map((room) => {
          if (room.id === action.payload.id) {
            if (action.payload.type === "dec") {
              return { ...room, length: room?.length - 1 };
            } else if (action.payload.type === "inc") {
              return { ...room, length: room?.length + 1 };
            }
          }
          return room;
        }),
      };
    default:
      return state;
  }
}

const RoomListProvider = ({ children }) => {
  const [
    {
      roomList,
      isLoading,
      featuredRoomList,
      sortedRoomList,
      room,
      roomOption,
      maxPrice,
      bookedRoom,
      minPrice,
    },
    dispatch,
  ] = useReducer(roomListReducer, initialState);
  const navigate = useNavigate();
  const { slug } = useParams();

  const formatData = (rooms) => {
    let tempRooms = rooms.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempRooms;
  };
  useEffect(() => {
    async function getRoomListData() {
      dispatch({ type: "loading", payload: true });
      try {
        const response = await Client.getEntries({
          content_type: "travelRoomList",
        });
        let rooms = formatData(response.items);
        const featuredRooms = rooms.filter((room) => room.featured);
        dispatch({ type: "getFeaturedRoom/loaded", payload: featuredRooms });
        dispatch({
          type: "roomList/loaded",
          payload: formatData(response.items),
        });
        let maxPrice = Math.max(...rooms.map((room) => room.price));
        dispatch({ type: "maxPrice/loaded", payload: maxPrice });
        let minPrice = Math.min(...rooms.map((room) => room.price));
        dispatch({ type: "minPrice/loaded", payload: minPrice });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    }
    getRoomListData();
  }, []);

  async function getSingleRoom(slug) {
    dispatch({ type: "loading", payload: true });
    try {
      const response = await Client.getEntries({
        content_type: "travelRoomList",
        "fields.slug[match]": `${slug}`,
      });

      dispatch({
        type: "singleRoom/loaded",

        payload: formatData(response.items),
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  const filterChangeHandler = (e) => {
    const { value, type, checked, name } = e.target;
    const payloadValue = type === "checkbox" ? checked : value;
    dispatch({
      type: "roomFilterOption",
      payload: { [name]: payloadValue },
    });
  };

  const filterRooms = (roomOption) => {
    let filteredRooms = [...roomList];

    if (roomOption?.type !== "all") {
      filteredRooms = filteredRooms.filter(
        (room) => room.type === roomOption?.type
      );
    }

    filteredRooms = filteredRooms.filter(
      (room) => room.capacity >= roomOption?.capacity
    );

    filteredRooms = filteredRooms.filter(
      (room) => room.price >= roomOption.price
    );

    if (roomOption.breakfast) {
      filteredRooms = filteredRooms.filter((room) => room.breakfast);
    }

    if (roomOption.pets) {
      filteredRooms = filteredRooms.filter((room) => room.pets);
    }

    console.log(filteredRooms);
    return dispatch({ type: "getAllFilterData", payload: filteredRooms });
  };

  const getBookedRoom = (selectedRoom, slug) => {
    if (bookedRoom?.some((room) => room.id === selectedRoom.id)) {
      toast.error("You already added this room");
    } else {
      dispatch({ type: "getBookedRoom/loaded", payload: selectedRoom });
      navigate(`/rooms/${slug}/reservation`);
      toast.success("Your room has been successfully added to your basket!");
    }
  };

  const optionHandler = (id, type) => {
    dispatch({ type: "countBookedRoom", payload: { id, type } });
  };

  useEffect(() => {
    localStorage.setItem("bookedRoom", JSON.stringify(bookedRoom));
  }, [bookedRoom]);

  return (
    <RoomListContext.Provider
      value={{
        roomList,
        isLoading,
        featuredRoomList,
        room,
        getSingleRoom,
        roomOption,
        sortedRoomList,
        bookedRoom,
        getBookedRoom,
        dispatch,
        optionHandler,
        filterChangeHandler,
        filterRooms,
        maxPrice,
        minPrice,
      }}
    >
      {children}
    </RoomListContext.Provider>
  );
};

export default RoomListProvider;

export function useRoomList() {
  return useContext(RoomListContext);
}
