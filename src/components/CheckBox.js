import React from "react";

const CheckBox = ({
  handleLocationFilterChange,
  handlePriceFilterChange,
  locationFilter,
  priceRangeFilter,
}) => {
  const Locations = ["Sintra", "Amper", "Swinna", "Hanji"];
  const PriceRanges = ["0-300000", "300001-600000", "600001-1000000"];

  return (
    <div className='flex flex-row md:flex-col gap-10'>
      <div>
        <h1 className='font-bold text-2xl p-2'>Location</h1>
        {Locations.map((location, index) => {
          return (
            <div key={index}>
              <input
                type='checkbox'
                className='cursor-pointer'
                id={location}
                name={location}
                value={location}
                checked={locationFilter.includes(location)}
                onChange={handleLocationFilterChange}
              />
              <label className='text-lg font-normal p-2' htmlFor={location}>
                {location}
              </label>
              <br />
            </div>
          );
        })}
      </div>
      <div>
        <h2 className='font-bold text-2xl p-2'>Price Range</h2>
        {PriceRanges.map((price, index) => {
          return (
            <div key={index}>
              <input
                className='cursor-pointer'
                type='checkbox'
                id={price}
                name={price}
                value={price}
                onChange={handlePriceFilterChange}
                checked={priceRangeFilter.includes(price)}
              />
              <label className='text-lg font-normal p-2' htmlFor={price}>
                {price}
              </label>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckBox;
