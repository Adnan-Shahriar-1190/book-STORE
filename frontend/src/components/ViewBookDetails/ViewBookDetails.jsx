import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams(); // get book ID from route params
  const [data, setData] = useState(null); // store book details
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // get login status
  const role = useSelector((state) => state.auth.role); // get user role

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://book-store-server-seven.vercel.app/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data); // set book data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id, // send book ID in headers
  };

  // Add to favourite function
  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "https://book-store-server-seven.vercel.app/api/v1/add-to-favourites", // Corrected API endpoint
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to add to favourites");
    }
  };

  // Add to cart function
  const handleCart = async () => {
    try {
      const response = await axios.put(
        "https://book-store-server-seven.vercel.app/api/v1/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <>
      {/* Render book details when data is available */}
      {data ? (
        <div className="px-4 md:px-12 py-8 bg-gradient-to-r from-blue-500 to-green-500 flex flex-col md:flex-row gap-6">
          <div className="w-full lg:w-3/6">
            <div className="flex items-center justify-around p-12 rounded bg-zinc-400 bg-opacity-50">
              <img
                src={data.url}
                alt="Book cover"
                className="h-[50vh] lg:h-[70vh] text-white rounded"
              />
              {/* User-specific buttons */}
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col">
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-800"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-2 mt-10 text-blue-950"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {/* Admin-specific buttons */}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col">
                  <button className="bg-white rounded-full text-3xl p-3 text-black">
                    <BiSolidEditAlt />
                  </button>
                  <button className="bg-white rounded-full text-3xl p-2 mt-10 text-blue-950">
                    <MdDeleteSweep />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-3/6">
            <h1 className="text-4xl text-zinc-900 font-bold mt-5">
              {data.title || "No Title Available"}
            </h1>
            <p className="text-zinc-800 mt-1 text-xl from-neutral-600">
              by {data.author || "Unknown Author"}
            </p>
            <p className="text-xl text-zinc-850 mt-6">
              {data.desc || "No description available"}
            </p>
            <p className="flex mt-4 items-center justify-start text-zinc-700">
              <GrLanguage className="me-3" /> {data.language || "Unknown"}
            </p>
            <p className="mt-7 text-black text-3xl font-bold">
              Price : ৳ {data.price || "Not available"}
            </p>
          </div>
        </div>
      ) : (
        // Show loader while data is being fetched
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
