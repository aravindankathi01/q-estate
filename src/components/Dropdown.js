import React from "react";

const Dropdown = ({ handleSortChange }) => {
  return (
    <div className='flex justify-between items-center w-full'>
      <label htmlFor='sort' className='font-bold text-xl p-2'>
        SortBy :
      </label>
      <select
        name='sort'
        id='sort'
        className='border-2 border-slate-300 w-4/6 h-10 rounded-lg text-base font-medium'
        onChange={handleSortChange}>
        <option value='None'>None</option>
        <option value='Price'>Price</option>
        <option value='Date'>Date</option>
      </select>
    </div>
  );
};

export default Dropdown;
