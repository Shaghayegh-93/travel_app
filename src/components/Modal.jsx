import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50  mb-20  ">
      <div
        className="w-screen h-screen fixed inset-0 bg-slate-900  bg-opacity-70 "
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="  md:w-[500px] w-[380px]  absolute top-20 left-10 md:top-10 md:left-[500px]  bg-slate-800 p-4 rounded-2xl ">
        <div className="flex items-center  justify-between mb-4 pb-2 border-b-[1px] border-slate-600">
          <h2 className="text-slate-200">Bookin Room</h2>
          <button className="border-none" onClick={() => setIsOpen(false)}>
            <FaRegTimesCircle className="w-5 h-5 border-none text-red-500" />
          </button>
        </div>
        <div className="w-full  max-h-[80vh] overflow-y-scroll  ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
// import React from "react";
// import { FaRegTimesCircle } from "react-icons/fa";

// const Modal = ({ isOpen, setIsOpen, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden mb-20  ">
//       <div
//         className="w-screen h-screen fixed inset-0 bg-slate-900 text-white  bg-opacity-70 border-none"
//         onClick={() => setIsOpen(false)}
//       ></div>
//       <div className=" w-[380px]  md:w-[500px]  absolute  left-[210px]  top-0  md:top-1/2 md:left-80 -translate-x-full -translate-y-44 md:translate-y-1/2 bg-slate-800 p-4 rounded-2xl shadow-modalShadow">
//         <div className="flex items-center  justify-between  pb-2 border-b-[1px] border-slate-600 ">
//           <h2 className="text-slate-200 text-lg">Your Booking</h2>
//           <button className="border-none" onClick={() => setIsOpen(false)}>
//             <FaRegTimesCircle className="w-5 h-5 text-red-500" />
//           </button>
//         </div>
//         <div className="w-full max-h-[80vh] overflow-y-scroll  ">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
// import { FaRegTimesCircle } from "react-icons/fa";
// const Modal = ({ isOpen, setIsOpen, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden mb-20 ">
//       <div
//         className="fixed inset-0 bg-slate-900 bg-opacity-70"
//         onClick={() => setIsOpen(false)}
//       ></div>
//       <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-4 rounded-2xl shadow-modalShadow">
//         <div className="flex items-center justify-between mb-4 pb-2 border-b-[1px] border-slate-600">
//           <h2 className="text-slate-200">Your Booking</h2>
//           <button className="border-none" onClick={() => setIsOpen(false)}>
//             <FaRegTimesCircle className="w-5 h-5 text-red-500" />
//           </button>
//         </div>
//         <div className="w-[380px] md:w-[500px] max-h-[80vh] overflow-y-scroll">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
