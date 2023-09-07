import React, { useState } from "react";

const EditModel = ({ handleEditSave, handleEditCancel, editingItem }) => {
  const [currEditedItem, setCurrEditedItem] = useState(editingItem);

  const handleCurrEdit = (event) => {
    const { name, value } = event.target;
    setCurrEditedItem({ ...currEditedItem, [name]: value });
  };
  console.log(currEditedItem);
  const labels = ["property_name", "address", "price"];
  return (
    <div className='h-min md:w-[36vw] w-[50vw] shadow-2xl bg-white p-4 fixed right-1/4 left-1/4 md:left-1/3 md:right-1/3 top-1/4 bottom-1/4 rounded-lg'>
      <h1 className='font-bold text-xl mb-3'>Edit Property</h1>
      {labels.map((label, index) => {
        return (
          <div key={index} className='mb-2 sm:mb-5'>
            <label for={label} className='font-medium text-base text-slate-800'>
              {label[0].toUpperCase() + label.slice(1, label.length)}
            </label>
            <br></br>

            <input
              type='text'
              id={label}
              name={label}
              value={currEditedItem[label]}
              className='border-[1px] border-slate-800 w-3/4 h-8 rounded-sm p-2'
              onChange={handleCurrEdit}
            />
            <br></br>
          </div>
        );
      })}
      <div className='flex justify-end gap-3 text-base font-medium text-white'>
        <button
          className='bg-blue-700 px-3 py-1 rounded-lg'
          onClick={() => {
            handleEditSave(currEditedItem);
          }}>
          Save
        </button>
        <button
          className='bg-blue-700 px-3 py-1 rounded-lg'
          onClick={() => {
            handleEditCancel();
          }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModel;
