import React, { useState } from "react";
import Layout from "../components/Layout";
import Titles from "../components/Titles";
import { useUserList } from "../context/UserListProvider";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useRoomList } from "../context/RoomListProvider";
import defaultImage from "../assets/images/room-1.jpeg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ReservationPage = () => {
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    guest: 1,
    roomNumber: 1,
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    checkIn: date[0].startDate,
    checkOut: date[0].endDate,
  });

  const [isDateOpen, setIsDateOpen] = useState(false);

  const { dispatch } = useUserList();
  const { capacity, room } = useRoomList();

  const formChangeHandler = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [e.target.name]: e.target.value,
    }));
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !userInfo.name ||
      !userInfo.lastName ||
      !userInfo.phoneNumber ||
      !userInfo.email ||
      !userInfo.checkIn ||
      !userInfo.checkOut ||
      !userInfo.guest ||
      !userInfo.ccv ||
      !userInfo.cardNumber ||
      !userInfo.expiryDate ||
      !userInfo.roomNumber
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (userInfo.guest > capacity) {
      toast.error("Yout guest is more than selected romm capacity");
      return;
    }
    if (userInfo.roomNumber > 10) {
      toast.error("sorry ,we dont have this roo in this amount");
      return;
    }

    dispatch({ type: "formSubmitHandler", payload: userInfo });
    setUserInfo({
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      date: "",
      checkIn: "",
      checkOut: "",
      guest,
      roomNumber,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    toast.success("Your Room Successfully Booked.");
  };

  const { slug } = useRoomList();
  return (
    <div className="bg-gray-100 md:bg-white">
      <Layout>
        <div className="max-w-[1400px] py-4 px-4 m-auto flex flex-col">
          <Titles title="Reservation" />
          <div className="flex items-center justify-center mx-auto mt-10 relative">
            <div className="w-full h-screen hidden sm:block">
              <img
                src={room?.images?.[0] || defaultImage}
                alt=""
                className="w-[60%] h-full rounded-md inset-0 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 rounded-md  w-[60%]"></div>
            </div>

            <form
              className="flex flex-col bg-white border-2 md:border-none  rounded-md border-black/30 p-4 md:py-2 md:px-4  gap-y-4  md:absolute  md:right-40"
              onSubmit={formSubmitHandler}
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    onChange={formChangeHandler}
                    className="border py-2 px-4"
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="lastName"
                  >
                    Last Name:
                  </label>
                  <input
                    onChange={formChangeHandler}
                    className="border py-2 px-4"
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                  />
                </div>
              </div>

              <div className="flex  flex-col md:flex-row gap-2">
                <div className="flex flex-col relative w-full">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="checkIn"
                  >
                    Check In/Out:
                  </label>
                  <div
                    className="py-2 px-2  border"
                    onClick={() => setIsDateOpen(!isDateOpen)}
                  >
                    {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                      date[0].endDate,
                      "dd/MM/yyyy"
                    )} `}
                  </div>
                  {isDateOpen && (
                    <DateRange
                      ranges={date}
                      onChange={(item) => setDate([item.selection])}
                      minDate={new Date()}
                      moveRangeOnFirstSelection={true}
                      className="absolute top-12 -left-1 z-20"
                    />
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    onChange={formChangeHandler}
                    className="border py-2 px-4"
                    type="text"
                    placeholder="Enter  Phone Number"
                    name="phoneNumber"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    onChange={formChangeHandler}
                    className="border py-2 px-4"
                    type="email"
                    id=""
                    placeholder="Enter Email"
                    name="email"
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="email"
                  >
                    Guest:
                  </label>
                  <input
                    onChange={formChangeHandler}
                    className="border py-2 px-4"
                    type="number"
                    placeholder="1"
                    min={1}
                    id=""
                    name="guest"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="cardNumber"
                >
                  Credit Card Number:
                </label>
                <input
                  onChange={formChangeHandler}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="Enter Card Number"
                  name="cardNumber"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="expiryDate"
                >
                  Expiry Date:
                </label>
                <input
                  onChange={formChangeHandler}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="MM/YY"
                  name="expiryDate"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="cvv"
                >
                  CVV:
                </label>
                <input
                  onChange={formChangeHandler}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="123"
                  name="cvv"
                />
              </div>
              <div className="flex  flex-row gap-2 w-full cursor-pointer ">
                <button
                  className="py-2 px-4 w-1/2 bg-black/80 text-white"
                  type="submit"
                >
                  Submit
                </button>
                <button className="py-2 px-4 w-1/2">
                  {/* <Link to={`/rooms/${slug}`}> CANCEL</Link> */}
                  <Link to="/rooms"> CANCEL</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ReservationPage;
