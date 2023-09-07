import React from "react";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
  return (
    <div className='flex justify-between items-center w-full px-2 my-4 sm:w-[85vw] sm:mx-auto'>
      <Link to='/' className='text-red-800 font-semibold text-3xl'>
        QEstate
      </Link>
      <div>
        {page === "home" ? (
          <Link
            to='/listings'
            className='rounded-full bg-[#231092] text-white font-semibold text-xl py-1 px-5'>
            Explore
          </Link>
        ) : page === "explore" ? (
          <Link
            to='/'
            className='rounded-full bg-[#231092] text-white font-semibold text-xl px-5 py-1'>
            Featured Listings
          </Link>
        ) : (
          <div className='flex gap-1'>
            <Link
              to='/listings'
              className='rounded-full bg-[#231092] text-white font-semibold text-xl py-1 px-5'>
              Explore
            </Link>
            <Link
              to='/'
              className='rounded-full bg-[#231092] text-white font-semibold text-xl px-5 py-1'>
              Featured
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
