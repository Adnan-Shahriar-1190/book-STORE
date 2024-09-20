import React from 'react';

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-blue-900 to-green-900 text-white px-4 py-8 md:px-12 md:py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left'>
        {/* ABOUT Section */}
        <div>
          <h2 className='text-2xl font-semibold text-yellow-300 mb-4'>About</h2>
          <ul>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-yellow-300'>Contact Us</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-yellow-300'>About Us</a></li>
          </ul>
        </div>
        {/* HELP Section */}
        <div>
          <h2 className='text-2xl font-semibold text-yellow-300 mb-4'>Help</h2>
          <ul>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-yellow-300'>Payments</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-yellow-300'>Shipping</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-yellow-300'>Cancellation & Returns</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-yellow-300'>FAQs</a></li>
          </ul>
        </div>
      </div>
      <div className='mt-12 border-t border-gray-700 pt-6'>
        <h1 className='text-lg md:text-2xl font-semibold text-center'>
          © 2024 BookStore. All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
