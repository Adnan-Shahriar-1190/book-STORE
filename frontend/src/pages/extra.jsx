// profile
/*
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get(
        "https://book-store-server-seven.vercel.app/api/v1/get-user-information",
        {
          headers: {
            id: localStorage.getItem('id'),
            authorization: Bearer ${token},
          },
        }
      );
      setProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log('Access token expired, trying to refresh...');
        await refreshAccessToken();
      } else {
        console.error('Error fetching profile data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    if (refreshToken) {
      try {
        const refreshResponse = await axios.post(
          "https://book-store-server-seven.vercel.app/api/v1/token",
          { token: refreshToken }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('token', newAccessToken);

        console.log('New JWT Token:', newAccessToken);

        // Retry fetching the profile data with the new token
        await fetchProfile(newAccessToken);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        if (refreshError.response) {
          console.error('Response data:', refreshError.response.data);
          console.error('Response status:', refreshError.response.status);
          console.error('Response headers:', refreshError.response.headers);
        }
        setLoading(false);
      }
    } else {
      console.log('No refresh token available');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(token);
  }, [token]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen   text-white px-10 py-8">
      {loading && (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4 w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && profile && (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4 flex flex-row items-start justify-start min-h-screen">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

*/





//book-search

/*

import React, { useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      let url = "https://book-store-server-seven.vercel.app/api/v1/search-books?";
      if (searchTerm) {
        url += `name=${encodeURIComponent(searchTerm)}`;
      }
      if (minPrice && maxPrice) {
        url += `${searchTerm ? '&' : ''}minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setSearchResults(data.data);
      setError("");

      setSearchTerm("");
      setMinPrice("");
      setMaxPrice("");
    } catch (error) {
      setError("An error occurred while fetching data.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 min-h-screen flex flex-col items-start">
      <h2 className="text-5xl font-extrabold mb-6 text-gray-800">
        Search Books
      </h2>

      <div className="mb-6 w-full max-w-md">
        <h1 className="block mb-1 text-gray-800 text-xl font-semibold">
          Search Books:
        </h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-r-0 border-gray-300 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book name..."
          />
        </div>
        <div className="flex mb-4">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 mx-1 border border-r-0 border-gray-600 rounded-l w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Min price..."
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-r w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Max price..."
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white px-4 py-2 mx-2 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div>

      
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <div className="mt-2 px-2 w-full">
            <h4 className="text-3xl text-gray-900">Search Result :</h4>
            {searchResults && searchResults.length > 0 ? (
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((book, index) => (
                  <div key={index}>
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            ) : searchResults !== null ? (
              <p className="mt-4 text-3xl text-white-600 font-semibold">
                No results found.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;




*/