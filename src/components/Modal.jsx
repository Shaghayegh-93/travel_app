import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="z-10 relative w-full ">
      <div
        className="w-screen h-screen fixed inset-0 bg-slate-900 text-white  bg-opacity-70 border-none"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="h-auto w-[380px]  md:w-[500px]  min-h-[250px] absolute -top-32 left-[210px] md:-left-96 md:top-0 -translate-x-full -translate-y-44 md:translate-y-1/2 bg-slate-800 p-4 rounded-2xl shadow-modalShadow">
        <div className="flex items-center  justify-between mb-4 pb-2 border-b-[1px] border-slate-600">
          <h2 className="text-slate-200">Your Booking</h2>
          <button className="border-none" onClick={() => setIsOpen(false)}>
            <FaRegTimesCircle className="w-5 h-5 text-red-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
