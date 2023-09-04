import React from "react";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
  return (
    <div className='flex justify-between items-center w-full my-2 sm:w-[85vw] sm:mx-auto'>
      <h1 className='text-red-800 font-semibold text-3xl'>QEstate</h1>
      <div>
        {page === "home" ? (
          <Link
            to='/listings'
            className='rounded-full bg-[#231092] text-white font-semibold text-xl py-1 px-5'>
            Explore
          </Link>
        ) : (
          <Link
            to='/'
            className='rounded-full bg-[#231092] text-white font-semibold text-xl px-5 py-1'>
            Featured Listings
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
