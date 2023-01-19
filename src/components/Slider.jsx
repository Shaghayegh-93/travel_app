import React, { useState } from "react";
import slide1 from "../assets/images/slide1.avif";
import slide2 from "../assets/images/slide2.avif";
import slide3 from "../assets/images/slide3.avif";
import slide4 from "../assets/images/slide4.avif";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
  const slides = [
    { src: slide1, title: "Lobster", id: Date.now() },
    { src: slide2, title: "Sushi", id: Date.now() },
    { src: slide3, title: "Pasta", id: Date.now() },
    { src: slide4, title: "Salmon", id: Date.now() },
  ];
  console.log(slides.length);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const manualSlideHandler = (id) => {
    setCurrentIndex(id);
  };
  return (
    <div className="max-w-[1400px] h-[580px] relative w-full py-16 m-auto px-4 group">
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
      ></div>
      {/* Left Arrow */}
      <div className="absolute top-[50%] text-white cursor-pointer left-5 text-2xl rounded-full p-2 translate-y-[-50%] group-hover:bg-black/20">
        <BsChevronCompactLeft size={30} onClick={prevSlide} />
      </div>
      {/* Right Arrow */}
      <div
        onClick={nextSlide}
        className="absolute top-[50%] text-white cursor-pointer right-5 text-2xl rounded-full p-2 translate-y-[-50%] group-hover:bg-black/20"
      >
        <BsChevronCompactRight />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, id) => (
          <div
            className="cursor-pointer text-2xl "
            key={id}
            onClick={() => manualSlideHandler(id)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
