import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://book-store-server-seven.vercel.app/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "https://book-store-server-seven.vercel.app/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to add to favourites");
    }
  };

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
      {data && (
        <div className="px-4 md:px-12 py-8 bg-gradient-to-r from-blue-500 to-green-500 flex flex-col md:flex-row gap-6">
          <div className="w-full lg:w-3/6">
            <div className="flex items-center justify-around p-12 rounded bg-zinc-400 bg-opacity-50">
              <img
                src={data.url}
                alt="Book cover"
                className="h-[50vh] lg:h-[70vh] text-white rounded"
              />
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
              {data.title}
            </h1>
            <p className="text-zinc-800 mt-1 text-xl from-neutral-600">
              by {data.author}
            </p>
            <p className="text-xl text-zinc-850 mt-6">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-700">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-7 text-black text-3xl font-bold">
              Price : ৳ {data.price}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
