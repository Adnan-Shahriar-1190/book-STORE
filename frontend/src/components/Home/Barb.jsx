import React from 'react';
import { Link } from 'react-router-dom';

const Barb = () => {
  return (
    <div className='h-[80vh] flex flex-col lg:flex-row'>
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
            50% {
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
            }
          }
          .animate-glow {
            animation: glow 2s infinite;
          }
        `}
      </style>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center p-1 lg:p-12 bg-gradient-to-r from-purple-500 to-blue-500'>
        <h1 className='text-5xl lg:text-7xl font-bold text-white text-center lg:text-left'>
          Dive Into Your Next Adventure
        </h1>
        <p className='mt-6 text-lg lg:text-2xl text-gray-200 text-center lg:text-left'>
          Explore a world of captivating stories, profound insights, and boundless inspiration in our carefully curated book collection.
        </p>
        <div className='mt-10'>
          <Link to="/all-books" className='text-white text-lg lg:text-xl font-bold border border-white px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-blue-500 animate-glow'>
            Explore Books
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Barb;
