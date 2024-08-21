import React from 'react'
import Barb from '../components/Home/Barb'
import RecentlyAdded from '../components/Home/RecentlyAdded'
const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-8">
      <Barb/>
      <RecentlyAdded/>
    </div>
  );
};

export default Home