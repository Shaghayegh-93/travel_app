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
import { useFormik } from "formik";
import { object, string, number, date } from "yup";
import valid from "card-validator";

// import BasicDateRangePicker from "../components/DateRange";
const validationSchema = object({
  name: string().required("Name is required").min(2, "Your Name its Not Valid"),
  lastName: string().required("lastName is required"),

  phoneNumber: string()
    .required("phoneNumber is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number"),

  guest: number().required("Number of guest is required").positive().integer(),

  roomNumber: number().required().positive().integer(),
  cardNumber: string().test(
    "test-number",
    "Credit Card number is invalid",
    (value) => valid.number(value).isValid
  ),

  expiryDate: string()
    .typeError("Not a valid expiration date. Example: MM/YY")
    .max(5, "Not a valid expiration date. Example: MM/YY")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/g, "Invalid expiration date"),
  // "Not a valid expiration date. Example: MM/YY"

  email: string().email("Invalid email format").required("Email is required"),
  cvv: string()
    .min(3, "Incorrect format")
    .max(4, "Incorrect format")
    .required("Cvv is required"),
  createdOn: date().default(() => new Date()),
});
const ReservationPage = () => {
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const { dispatch } = useUserList();

  // const [userInfo, setUserInfo] = useState({
  //   name: "",
  //   lastName: "",
  //   phoneNumber: "",
  //   email: "",
  //   guest: 1,
  //   roomNumber: 1,
  //   cardNumber: "",
  //   expiryDate: "",
  //   cvv: "",
  //   checkIn: date[0].startDate,
  //   checkOut: date[0].endDate,
  // });
  const onSubmit = (values) => {
    const {
      name,
      lastName,
      phoneNumber,
      email,
      guest,
      roomNumber,
      cardNumber,
      expiryDate,
      cvv,
      checkIn,
      checkOut,
    } = values;
    const userInfo = {
      name,
      lastName,
      phoneNumber,
      email,
      guest,
      roomNumber,
      cardNumber,
      expiryDate,
      cvv,
      checkIn,
      checkOut,
    };
    dispatch({ type: "formSubmitHandler", payload: userInfo });
  };
  const formik = useFormik({
    initialValues: {
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
    },
    onSubmit,
    validationSchema,
  });
  console.log(formik);

  const [isDateOpen, setIsDateOpen] = useState(false);

  // const { dispatch } = useUserList();
  const { capacity, room } = useRoomList();

 

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
              onSubmit={formik.handleSubmit}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border py-2 px-4"
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="text-red-600 my-1">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="lastName"
                  >
                    Last Name:
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border py-2 px-4"
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                  />
                </div>
                {formik.errors.lastName && formik.touched.lastName && (
                  <div className="text-red-600 my-1">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>

              <div className="flex  flex-col md:flex-row gap-2">
                <div className="flex flex-col relative w-full">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="checkIn"
                    onClick={() => setIsDateOpen(!isDateOpen)}
                  >
                    Check In/Out:
                  </label>
                  <div className="py-2 px-2  border">
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
                      // value={formik.values.date}
                    />
                  )}
                </div>
                {/* {formik.errors.name && (
                  <div className="text-red-600 my-1">{formik.errors.name}</div>
                )} */}
                <div className="w-full flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border py-2 px-4"
                    type="text"
                    placeholder="Enter  Phone Number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                  />
                </div>
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className="text-red-600 my-1">
                    {formik.errors.phoneNumber}
                  </div>
                )}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border py-2 px-4"
                    type="email"
                    id=""
                    placeholder="Enter Email"
                    name="email"
                    value={formik.values.email}
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-600 my-1">{formik.errors.email}</div>
                )}
                <div className="w-full flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="email"
                  >
                    Guest:
                  </label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border py-2 px-4"
                    type="number"
                    placeholder="1"
                    min={1}
                    id=""
                    name="guest"
                    value={formik.values.guest}
                  />
                </div>
                {formik.errors.guest && formik.touched.guest && (
                  <div className="text-red-600 my-1">{formik.errors.guest}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="cardNumber"
                >
                  Credit Card Number:
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="Enter Card Number"
                  name="cardNumber"
                  value={formik.values.cardNumber}
                />
              </div>
              {formik.errors.cardNumber && formik.touched.cardNumber && (
                <div className="text-red-600 my-1">
                  {formik.errors.cardNumber}
                </div>
              )}
              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="expiryDate"
                >
                  Expiry Date:
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="MM/YY"
                  name="expiryDate"
                  value={formik.values.expiryDate}
                />
              </div>
              {formik.errors.expiryDate && formik.touched.expiryDate && (
                <div className="text-red-600 my-1">
                  {formik.errors.expiryDate}
                </div>
              )}
              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="cvv"
                >
                  CVV:
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border py-2 px-4"
                  type="text"
                  placeholder="123"
                  name="cvv"
                  value={formik.values.cvv}
                />
              </div>
              {formik.errors.ccv && formik.touched.cvv && (
                <div className="text-red-600 my-1">{formik.errors.ccv}</div>
              )}
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
