import React from 'react'
import { Link } from 'react-router-dom';
const BookCard = ({data}) => {
    console.log(data);
  return (
    <> 
    <Link>
    <div className='bg-zinc-100 bg-opacity-50 rounded p-2 flex flex-col'>
        <div className='bg-zinc-100 bg-opacity-50 rounded flex items-center justify-center'>
          <img src={data.url} alt="/" className='h-[25vh]'/>
        </div>
        <h2 className='mt-2 tex-xl zinc-900 font-semibold'>{data.title}</h2>
        <p className='mt-1 text-zinc-500 font-semibold'>by {data.author}</p>
        <p className='mt-1 zinc-900 font-semibold text-x'>TK. {data.price}</p>
      </div>
    </Link>
    </>
  );
};

export default BookCard
