import React from 'react';

const Contact = () => {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-green-500'>
      <div className=' max-w-4xl mx-auto p-6'>
      <h1 className='text-4xl font-bold text-zinc-900 mb-4'>Contact Us</h1>
      <p className='mb-8'>Feel free to reach out to us with any questions or inquiries.</p>

      <div className='space-y-8'>
        <div>
          <h2 className='text-2xl font-semibold text-zinc-800'>Name:</h2>
          <p className='text-black'>Zubaer Mahmud Shihab</p>
          <h2 className='text-2xl font-semibold text-zinc-800 mt-2'>Email:</h2>
          <a href="mailto:zubaer.cse.20220104030@aust.edu" className='text-blue-900 underline'>
            zubaer.cse.20220104030@aust.edu
          </a>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-zinc-800'>Name:</h2>
          <p className='text-black'>Adnan Shahriar Bhuiyan</p>
          <h2 className='text-2xl font-semibold text-zinc-800 mt-2'>Email:</h2>
          <a href="mailto:adnan.cse.20220104030@aust.edu" className='text-blue-900 underline'>
            adnan.cse.20220104030@aust.edu
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
