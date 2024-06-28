import React from 'react'
import { Link } from 'react-router-dom';
const BookCard = ({data}) => {
    console.log(data);
  return (
    <> 
    <Link>
      <div className='bg-zinc-800 rounded p-2 flex flex-col'>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
          <img src={data.url} alt="/" className='h-[25vh]'/>
        </div>
        <h2 className='mt-2 tex-xl text-white font-semibold'>{data.title}</h2>
        <p className='mt-1 text-gray-300 font-semibold'>by {data.author}</p>
        <p className='mt-1 text-white font-semibold text-x'>TK. {data.price}</p>
      </div>
    </Link>
    </>
  );
};

export default BookCard
