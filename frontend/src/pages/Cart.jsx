import React, { useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchResults, setSearchResults] = useState(null); // Change to null initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchByName = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://book-store-server-seven.vercel.app/api/v1/search-books?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSearchResults(data.data);
      setError("");
      // Clear price search inputs
      setMinPrice("");
      setMaxPrice("");
    } catch (error) {
      setError("An error occurred while fetching data.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByPriceRange = async () => {
    try {
      if (!minPrice || !maxPrice) {
        setError("Please provide both minPrice and maxPrice");
        setSearchResults([]);
        return;
      }
      setLoading(true);
      const response = await fetch(
        `https://book-store-server-seven.vercel.app/api/v1/books-in-price-range?minPrice=${encodeURIComponent(
          minPrice
        )}&maxPrice=${encodeURIComponent(maxPrice)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setSearchResults(data.data);
      setError("");
      setSearchTerm("");
    } catch (error) {
      setError("An error occurred while fetching data.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-5xl font-extrabold mb-6 text-gray-800">Search Books</h2>

      {/* Search by Book Name */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Search Books by Name:</label>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book name..."
          />
          <button
            onClick={handleSearchByName}
            className="bg-blue-600 text-white px-4 py-2 rounded-r shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search by Price Range */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700">Search Books by Price Range:</label>
        <div className="flex">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l shadow-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Min price..."
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-r shadow-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Max price..."
          />
          <button
            onClick={handleSearchByPriceRange}
            className="bg-blue-600 text-white px-4 py-2 ml-2 rounded shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </div>
      </div>

      {/* Error and Results Display */}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {loading ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <div className="mt-8 px-4">
            <h4 className="text-3xl text-gray-700">Search Result</h4>
            {searchResults && searchResults.length > 0 ? (
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((book, index) => (
                  <div key={index}>
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-white-600 font-semibold">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
