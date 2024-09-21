import React, {useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () =>{
      const response = await axios.get(
        "https://book-store-server-seven.vercel.app/api/v1/get-order-history",
        { headers}
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  },[]);
  return (
    <>
    {!OrderHistory&&(<div className="flex items-center justify-center h-[100%]"><Loader/></div>)}
    {OrderHistory&&OrderHistory.length===0&&(
      <div className="h-[80vh] p-4 text-zinc-100">
        <div className="h-[100%] flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-black mb-8">
            No Order History
           </h1>
        </div>
      </div>
    )}
    {OrderHistory&& OrderHistory.length>0&&(
      <div className="h-[100%] p-0 md:p-4 text-black">
        <h1 className="text-3xl md:text-5xl font-semibold text-white mb-8">
          Your Order History
        </h1>
        <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2">
          <div className="w-[3%]">
            <h1 className="text-center">Sr.</h1>
          </div>
        </div>
        <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2">
          <div className="w-[22%]">
            <h1 className="text-center">Books</h1>
          </div>
        </div>
        <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2">
          <div className="w-[56%]">
            <h1 className="text-center">Description</h1>
          </div>
        </div>
        <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2">
          <div className="w-[9%]">
            <h1 className="text-center">Price</h1>
          </div>
        </div>
        <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2">
          <div className="w-[16%]">
            <h1 className="text-center">Status</h1>
          </div>
        </div>
        <div className="w-none md:w-[5%] hidden md:block">
          <h1 className="">Mode</h1>
        </div>
      </div>
    )}
    </>
  )
};

export default UserOrderHistory;