import React from "react";

const FeaturedCard = ({ property_name, city, price, image }) => {
  return (
    <div className='flex flex-col rounded-xl shadow-xl'>
      <img
        className='rounded-t-lg basis-9/12'
        src={image}
        alt='propertyImage'></img>
      <h2 className='p-2 text-2xl font-normal text-slate-800'>
        {property_name.slice(0, 5)}
      </h2>
      <div className='text-base font-medium flex flex-row justify-between p-2 items-center pb-3'>
        <p className='font-bold'>Rs {price}</p>
        <p className='bg-red-900 text-white rounded-full p-1 px-4'>
          {city.slice(0, 5)}
        </p>
      </div>
    </div>
  );
};

export default FeaturedCard;
