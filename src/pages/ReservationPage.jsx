import React, { useRef, useState } from "react";
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
import { object, string, number, date, ref } from "yup";
import valid from "card-validator";

// import BasicDateRangePicker from "../components/DateRange";

const validationSchema = object({
  name: string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .min(2, "Name should be at least 2 characters"),
  lastName: string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in last name")
    .min(2, "Last Name should be at least 2 characters"),

  phoneNumber: string()
    .required("phoneNumber is required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number"),

  guest: number().required("Number of guest is required").positive().integer(),

  roomNumber: number().required().positive().integer(),
  checkIn: date()
    .required("Check-in date is required")
    .min(new Date(), "Check-in date must be today or later"),

  checkOut: date()
    .required("Check-out date is required")
    .min(
      ref("checkIn"),
      "Check-out date must be equal to or later than check-in date"
    ),

  cardNumber: string()
    .matches(/^[0-9]{16}$/, "Invalid Credit Card Number")
    .required("Credit Card Number is required"),

  expiryDate: string()
    .typeError("Not a valid expiration date. Example: MM/YY")
    .max(5, "Not a valid expiration date. Example: MM/YY")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/g, "Invalid expiration date"),
  // "Not a valid expiration date. Example: MM/YY"

  email: string().email("Invalid email format").required("Email is required"),
  cvv: string()
    .matches(/^[0-9]{3,4}$/, "Invalid CVV")
    .required("CVV is required"),
});

const ReservationPage = () => {
  const ref = useRef();
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
    };

    dispatch({ type: "formSubmitHandler", payload: userInfo });
    toast.success("Your room has been successfully booked !");
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
      // checkInOut: date[0].startDate,
      checkIn: date[0].startDate,
      checkOut: date[0].endDate,
    },
    onSubmit,
    validationSchema,
    validateOnMount: true,
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
                    className="border py-2 px-4"
                    type="text"
                    {...formik.getFieldProps("name")}
                    placeholder="Enter Name"
                    name="name"
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
                    className="border py-2 px-4"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    placeholder="Enter Last Name"
                    name="lastName"
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <div className="text-red-600 my-1">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex  flex-col md:flex-row gap-2 w-full">
                {/* Remove DateRange component */}

                <div className="flex flex-col w-1/2 ">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="checkIn"
                  >
                    Check In:
                  </label>

                  <input
                    className="border py-2 px-4"
                    type="date"
                    {...formik.getFieldProps("checkIn")}
                    name="checkIn"
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>

                <div className="flex flex-col w-1/2  ">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="checkOut"
                  >
                    Check Out:
                  </label>

                  <input
                    className="border py-2 px-4"
                    type="date"
                    {...formik.getFieldProps("checkOut")}
                    name="checkOut"
                    min={format(new Date(), "yyyy-MM-dd")}
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
                    className="border py-2 px-4"
                    type="email"
                    {...formik.getFieldProps("email")}
                    id=""
                    placeholder="Enter Email"
                    name="email"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-600 my-1">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col">
                  <label
                    className="text-black font-bold text-base mb-2"
                    htmlFor="email"
                  >
                    Guest:
                  </label>
                  <input
                    className="border py-2 px-4"
                    type="number"
                    {...formik.getFieldProps("guest")}
                    placeholder="1"
                    min={1}
                    id=""
                    name="guest"
                  />
                </div>
                {formik.errors.guest && formik.touched.guest && (
                  <div className="text-red-600 my-1">{formik.errors.guest}</div>
                )}
              </div>
              <div className=" flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="border py-2 px-4"
                  {...formik.getFieldProps("phoneNumber")}
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className="text-red-600  ">
                    {formik.errors.phoneNumber}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  className="text-black font-bold text-base mb-2"
                  htmlFor="cardNumber"
                >
                  Card Number:
                </label>
                <input
                  className="border py-2 px-4"
                  type="text"
                  {...formik.getFieldProps("cardNumber")}
                  placeholder="Enter Card Number"
                  name="cardNumber"
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
                  className="border py-2 px-4"
                  type="text"
                  {...formik.getFieldProps("expiryDate")}
                  placeholder="MM/YY"
                  name="expiryDate"
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
                  className="border py-2 px-4"
                  type="text"
                  {...formik.getFieldProps("cvv")}
                  placeholder="123"
                  name="cvv"
                />
              </div>
              {formik.errors.cvv && formik.touched.cvv && (
                <div className="text-red-600 my-1">{formik.errors.cvv}</div>
              )}
              <div className="flex  flex-row gap-2 w-full cursor-pointer ">
                <button
                  className="py-2 px-4 w-1/2 bg-black/80 text-white"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Submit
                </button>
                <Link to="/rooms" className="w-1/2">
                  <button className="py-2 px-4 w-full">
                    Cancel
                    {/* <Link to={`/rooms/${slug}`}> CANCEL</Link> */}
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ReservationPage;
