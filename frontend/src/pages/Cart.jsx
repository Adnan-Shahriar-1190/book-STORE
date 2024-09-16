import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [cart, setCart] = useState(null); // Corrected state variable name
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
      const response =await axios.put(
        `https://book-store-server-seven.vercel.app/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
  };
  useEffect(()=>{
    if(Cart&&Cart.length>0){
      let total=0;
      Cart.map((items)=>{
        total+=items.price;
      });
      setTotal(total);
      total=0;
    }
  },[Cart]);
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4">
      {!cart && <Loader />} {/* Show loader when cart data is not available */}
      
      {cart && cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img
              src="/empty-cart.png"
              alt="empty cart"
              className='lg:h-[50vh]'
            />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              key={i}
            >
              <img
                src={item.url}
                alt={item.title}
                className='h-[20vh] md:h-[10vh] object-cover'
              />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:block'>
                  {item.desc.slice(0, 65)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ${item.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(item.id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
