import React from "react";

const Footer = () => {
  return (
    <div className='mt-20 bg-[#3d3d3d] h-[40vh] flex flex-row items-center text-white justify-center gap-96'>
      <div className='flex flex-col basis-1/2 ml-20 text-base font-medium gap-2'>
        <h1 className='font-bold text-2xl'>QEstate Homes</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          velit molestias ea dolor fugiat dignissimos at nam veritatis aliquid,
          accusamus cupiditate ab facere corporis fugit officia neque voluptates
          provident a.
        </p>
      </div>
      <div className='flex flex-col basis-1/2 text-base font-medium gap-2'>
        <h1 className='font-bold text-2xl'>Contacts</h1>
        <p>Bengaluru, India</p>
        <p>qestate@gmail.com</p>
        <p>+91900000112</p>
        <p>+021 93489223</p>
      </div>
    </div>
  );
};

export default Footer;
