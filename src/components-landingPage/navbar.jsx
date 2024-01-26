import React from 'react';
import LogoSvg from '../assets/logo.svg';

const Navbar = () => {
  return (
    <div className='flex  justify-between items-center h-24 max-w-[1920px] mx-auto px-12 bg-white :'>
      <img  className=""src={LogoSvg} alt="Company Logo" />
      <ul className='flex justify-evenly flex-1 text-2xl'>
        <li className='p-4'>Contact Us</li>
        </ul>
        <div className='flex justify-end text-2xl'>
        <button className='p-4'>Get Started</button>
      </div>
      
    </div>
  );
};

export default Navbar;

