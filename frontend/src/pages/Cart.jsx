import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate =useNavigate();
  const [Cart, setCart] = useState(); // Corrected state variable name
  const [total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://book-store-server-seven.vercel.app/api/v1/get-user-cart",
          { headers }
        );
        setCart(res.data.data); // Set the cart data here
      } catch (error) {
        alert("Error fetching cart data", error);
      }
    };
    fetchData();
  }, [Cart]);

  const deleteItem = async (bookid) => {
      try{
        const response =await axios.put(
          `https://book-store-server-seven.vercel.app/api/v1/remove-from-Cart/${bookid}`,
          {},
          { headers }
        );
      }catch(error){
        console.log(error);
      }
  };
  useEffect(()=>{
    if(Cart&&Cart.length>0){
      let ttl=0;
      Cart.map((items)=>{
        ttl+=items.price;
      });
      setTotal(ttl);
      ttl=0;
    }
  },[Cart]);
  const PlaceOrder = async()=>{
      try{
        const response =await axios.post(
          `https://book-store-server-seven.vercel.app/api/v1/place-order`,
          {order: Cart},
          {headers}
        );
        alert(response.data.message);
        navigate("/profile/orderHistory");
      }catch(error){
        console.log(error);
      }
  };
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4">
      {!Cart &&(<div className='w-full h-[100%] items-center justify-center'><Loader /></div>)} {/* Show loader when Cart data is not available */}
      
      {Cart && Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-900'>
              Empty Cart
            </h1>
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-900 mb-8'>
            Your Cart
          </h1>
          {Cart.map((item, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-400 bg-opacity-50 justify-between items-center'
              key={i}
            >
              <img
                src={item.url}
                alt={item.title}
                className='h-[20vh] md:h-[20vh] object-cover'
              />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-900 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-800 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-800 mt-2 hidden md:block lg:block'>
                  {item.desc.slice(0, 65)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-800 text-3xl font-semibold flex'>
                  ${item.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
       {Cart&&Cart.length>0&&(
        <div className="mt-4 w-full flex items-center justify-end">
          <div className='p-4 bg-zinc-400 bg-opacity-50 rounded'>
          <h1 className='text-3xl font-semibold'>
            Total Amount
          </h1>
          <div className='mt-3 flex items-center justify-between text-xl text-zinc-800'>
            <h2>{Cart.length} books</h2><h2>${total}</h2>
          </div>
          <div className='w-[100%] mt-3'>
            <button className='bg-blue-500 hover:bg-yellow-500 rounded px-4 flex justify-between text-xl text-zinc-800'
            onClick={PlaceOrder}>
              Place your Order
            </button>
          </div>
        </div>
        </div>
       )}
    </div>
  );
};

export default Cart;
