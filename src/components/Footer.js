import React from "react";

const Footer = () => {
  return (
    <div className='mt-20 bg-[#3d3d3d] flex flex-row items-start text-white justify-evenly w-full gap-20 py-14'>
      <div className='flex flex-col basis-1/2 text-base font-medium gap-2 ml-[4%]'>
        <h1 className='font-bold text-2xl'>QEstate Homes</h1>
        <p className='font-normal text-base'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          velit molestias ea dolor fugiat dignissimos at nam veritatis aliquid,
          accusamus cupiditate ab facere corporis fugit officia neque voluptates
          provident a.
        </p>
      </div>
      <div className='flex flex-col text-base font-medium gap-2 basis-1/2'>
        <h1 className='font-bold text-2xl'>Contacts</h1>
        <p className='font-normal text-base'>Bengaluru, India</p>
        <p className='font-normal text-base'>qestate@gmail.com</p>
        <p className='font-normal text-base'>+91900000112</p>
        <p className='font-normal text-base'>+021 93489223</p>
      </div>
    </div>
  );
};

export default Footer;
