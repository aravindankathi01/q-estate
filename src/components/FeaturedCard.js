import React from "react";
import { Link } from "react-router-dom";

const FeaturedCard = ({ property_name, city, price, image, property_id }) => {
  return (
    <Link
      to={"/detail/" + property_id}
      className='flex flex-col rounded-xl shadow-xl'>
      <img
        className='rounded-t-lg basis-9/12'
        src={image}
        alt='propertyImage'></img>
      <h2 className='p-2 text-2xl font-normal text-slate-800'>
        {property_name.slice(0, 5)}
      </h2>
      <div className='text-base font-medium flex flex-row justify-between p-1 items-center pb-3'>
        <p className='font-bold'>₹ {price}</p>
        <p className='bg-red-900 text-white rounded-full p-1 px-4'>
          {city.slice(0, 5)}
        </p>
      </div>
    </Link>
  );
};

export default FeaturedCard;
