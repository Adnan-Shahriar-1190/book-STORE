import React from 'react'
import Barb from '../components/Home/Barb'
import RecentlyAdded from '../components/Home/RecentlyAdded'
const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Barb />
      <RecentlyAdded/>
    </div>
  );
};

export default Home