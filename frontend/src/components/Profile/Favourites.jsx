import React, { useEffect, useState } from 'react';
import Loader from "../Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Favourites = () => {
  const [favourites, setFavourites] = useState(); // State for favorite books
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch user's favourite books on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://book-store-server-seven.vercel.app/api/v1/get-user-favourites", // API to get user's favourites
          { headers }
        );
        setFavourites(res.data.data); // Set the favourite books data
      } catch (error) {
        console.error("Error fetching favourite books:", error);
        alert("Error fetching favourite books");
      }
    };
    fetchData();
  }, []); // Ensure this only runs once when the component mounts

  // Remove book from favourites
  const removeFavourite = async (bookid) => {
    try {
      await axios.put(
        `https://book-store-server-seven.vercel.app/api/v1/remove-from-favourites/${bookid}`, // API to remove book from favourites
        {},
        { headers }
      );

      // After successful removal, update state to remove the book from the list
      setFavourites((prevFavourites) => 
        prevFavourites.filter((book) => book._id !== bookid)
      );
    } catch (error) {
      console.error("Error removing book from favourites:", error);
    }
  };

  return (
    <div className="px-4">
      {/* Show loader when data is not available */}
      {!favourites && (
        <div className='w-full h-[100%] items-center justify-center'>
          <Loader />
        </div>
      )}

      {/* Show message when no books are in favourites */}
      {favourites && favourites.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-900'>
              No Favourite Books
            </h1>
          </div>
        </div>
      )}

      {/* Display list of favourite books */}
      {favourites && favourites.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-900 mb-8'>
            Your Favourite Books
          </h1>
          {favourites.map((item, i) => (
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
                <Link
                  to={`/view-book-details/${item._id}`} // Link to book details
                  className="text-blue-700 underline text-xl"
                >
                  View Details
                </Link>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => removeFavourite(item._id)}
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

export default Favourites;
