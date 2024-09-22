import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from "react-redux";

const EditBookModal = ({ isOpen, onClose, bookData, onUpdate }) => {
  const [formData, setFormData] = useState({
    url: bookData.url,
    title: bookData.title,
    author: bookData.author,
    price: bookData.price,
    desc: bookData.desc,
    language: bookData.language,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
      bookid: bookData._id,
    };

    try {
      const response = await axios.put(
        "https://book-store-server-seven.vercel.app/api/v1/update-book",
        formData,
        { headers }
      );
      alert(response.data.message);
      onUpdate();
      onClose();
    } catch (error) {
      console.log("Error updating book:", error);
      alert("Error while updating.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-transparent text-white p-4 rounded-md shadow-lg w-11/12 max-w-xl max-h-[90vh] outline-double relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-500"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          Edit Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-white text-sm font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white text-sm font-semibold">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white text-sm font-semibold">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white text-sm font-semibold">
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white text-sm font-semibold">
              Language
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white text-black text-lg font-semibold px-4 py-2 rounded hover:bg-blue-600 hover:text-black"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        "https://book-store-server-seven.vercel.app/api/v1/delete-book",
        { headers }
      );
      alert(response.data.message);
      navigate("/all-books"); // Use navigate to redirect
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <>
      {data ? (
        <div className="px-4 md:px-12 py-8 bg-gradient-to-r from-blue-500 to-green-500 flex flex-col md:flex-row gap-6">
          <div className="w-full lg:w-1/2">
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
                    className="bg-white rounded-full text-3xl p-3 text-red-800 hover:bg-red-500 hover:text-white"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-2 mt-10 text-blue-950 hover:bg-blue-500 hover:text-white"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}

              {/* Admin-specific buttons */}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col">
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-black hover:bg-gray-700 hover:text-white"
                    onClick={openEditModal}
                  >
                    <BiSolidEditAlt />
                  </button>
                  <button
                    className="bg-white rounded-full text-3xl p-2 mt-10 text-blue-950 hover:bg-red-500 hover:text-white"
                    onClick={deleteBook}
                  >
                    <MdDeleteSweep />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-1/2">
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

            <p className="mt-7 text-lg text-zinc-800">Price: ${data.price}</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {isEditModalOpen && (
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          bookData={data}
          onUpdate={() => window.location.reload()}
        />
      )}
    </>
  );
};

export default ViewBookDetails;
