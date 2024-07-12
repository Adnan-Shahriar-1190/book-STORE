import React from 'react';

const Sidebar = ({ data }) => {
  return (
      <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center justify-center space-y-4">
        <img src={data.avatar} alt="Profile_Pic" className="w-24 h-24 rounded-full" />
        <h2 className="text-xl font-bold text-white">{data.username}</h2>
        <p className="text-gray-300">{data.email}</p>
      </div>
  );
};

export default Sidebar;
