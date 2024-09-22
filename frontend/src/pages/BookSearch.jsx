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
    // Basic validation
    if (!searchTerm && (!minPrice || !maxPrice)) {
      setError("Please enter a search term or specify a price range.");
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      let url = `https://book-store-server-seven.vercel.app/api/v1/search-books`;

      // Construct URL based on input
      if (searchTerm && minPrice && maxPrice) {
        url += `?name=${encodeURIComponent(searchTerm)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`;
      } else if (searchTerm) {
        url += `?name=${encodeURIComponent(searchTerm)}`;
      } else if (minPrice && maxPrice) {
        url = `https://book-store-server-seven.vercel.app/api/v1/books-in-price-range?minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setSearchResults(data.data);
      setError("");
    } catch (error) {
      setError("An error occurred while fetching data.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Search</h2>

      {/* Search by Book Name */}
      <div className="mb-4">
        <label className="block mb-2">Search Books by Name:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-r-0 border-gray-300 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter book name..."
        />
      </div>

      {/* Search by Price Range */}
      <div className="mb-4">
        <label className="block mb-2">Search Books by Price Range:</label>
        <div className="flex mb-4">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 mx-1 border border-r-0 border-gray-600 rounded-l w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter minimum price..."
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 mx-1 border border-r-0 border-gray-600 rounded-l w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter maximum price..."
          />
        </div>
      </div>

      {/* Unified Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-800 text-white px-4 py-2 mt-2 rounded hover:bg-yellow-400 focus:outline-none"
      >
        Search
      </button>

      {/* Error and Results Display */}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {loading ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <div className="mt-8 px-4">
            <h4 className="text-3xl text-black">Search Result</h4>
            {searchResults && searchResults.length > 0 ? (
              <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {searchResults.map((book, index) => (
                  <div key={index}>
                    <BookCard data={book} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-red-600 font-semibold">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
