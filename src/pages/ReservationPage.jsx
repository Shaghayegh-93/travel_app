import React, { useState } from "react";
import Layout from "../components/Layout";
import Titles from "../components/Titles";
import { useUserList } from "../context/UserListProvider";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const ReservationPage = () => {
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    checkIn: date[0].startDate,
    checkOut: date[0].endDate,

  });

  const [isDateOpen, setIsDateOpen] = useState(false);


  const { dispatch } = useUserList(); 

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
      !userInfo.checkOut
    ) {
      alert("Please fill in all fields");
      return;
    }
    // Destructure dispatch from the context

    dispatch({ type: "formSubmitHandler", payload: userInfo });
    setUserInfo({
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      date: "",
      checkIn: "",
      checkOut: "",
    });
  };
  return (
    <div className="bg-gray-100">
      <Layout>
        <div className="max-w-[1400px] py-16 px-4 m-auto flex flex-col">
          <Titles title="Reservation" />

          <form
            className="flex flex-col border-2 rounded-md border-black/30 p-4 mt-6 gap-y-4 bg-white"
            onSubmit={formSubmitHandler}
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex flex-col">
                <label className="text-black font-bold text-base mb-2" htmlFor="name">Name:</label>
                <input
                  onChange={formChangeHandler}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-bold text-base mb-2" htmlFor="lastName">Lastname:</label>
                <input
                  onChange={formChangeHandler}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="Enter Your LastName"
                  name="lastName"
                />
              </div>
            </div>
            <div className="flex ">
              <div className="flex flex-col relative w-full">
                <label className="text-black font-bold text-base mb-2" htmlFor="checkIn">Check In:</label>
                <div
                  className="py-2 px-4  border"
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
            </div>
            <div className="w-full flex flex-col">
              <label className="text-black font-bold text-base mb-2" htmlFor="phoneNumber">phoneNumber</label>
              <input
                onChange={formChangeHandler}
                className="border py-2 px-4"
                type="number"
                placeholder="Enter Your Phone Number"
                name="phoneNumber"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-black font-bold text-base mb-2" htmlFor="email">email</label>
              <input
                onChange={formChangeHandler}
                className="border py-2 px-4"
                type="email"
                id=""
                placeholder="Enter Your Email"
                name="email"
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ReservationPage;
