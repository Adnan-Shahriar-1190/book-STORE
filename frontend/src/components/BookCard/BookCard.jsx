import React from 'react'
import { Link } from 'react-router-dom';
const BookCard = ({data}) => {
    console.log(data);
  return (
    <> 
    <Link>
    <div className='bg-zinc-400 bg-opacity-50 rounded p-2 flex flex-col shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:bg-black hover:bg-opacity-50'>
        <div className='bg-zinc-100 bg-opacity-50 rounded flex items-center justify-center'>
          <img src={data.url} alt="/" className='h-[25vh]'/>
        </div>
        <h2 className='mt-2 tex-xl z-900 font-semibold text-black'>{data.title}</h2>
        <p className='mt-1 text-zinc-800 font-semibold'>by {data.author}</p>
        <p className='mt-1 zinc-900 font-semibold text-x text-black'>TK. {data.price}</p>
      </div>
    </Link>
    </>
  );
};

export default BookCard
