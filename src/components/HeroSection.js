import React from "react";
import hero from "../assets/hero-image.jpg";
const HeroSection = () => {
  return (
    <div
      className='w-full h-[70vh] flex justify-center items-center bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.548), rgba(0, 0, 0, 0.5)), url(${hero})`,
      }}>
      <h1 className='w-6/12 font-normal text-[3vw] text-center text-slate-200'>
        Where Quality Homes and Exceptional Service Create Your Perfect Real
        Estate Experience
      </h1>
    </div>
  );
};

export default HeroSection;
