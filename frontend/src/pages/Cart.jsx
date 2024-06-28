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
        `http://localhost:1000/api/v1/search-books?name=${encodeURIComponent(
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
        `http://localhost:1000/api/v1/books-in-price-range?minPrice=${encodeURIComponent(
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
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4">Search</h2>

      {/* Search by Book Name */}
      <div className="mb-4">
        <label className="block mb-2">Search Books by Name:</label>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-l w-full focus:outline-none"
            placeholder="Enter book name..."
          />
          <button
            onClick={handleSearchByName}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search by Price Range */}
      <div className="mb-4">
        <label className="block mb-2">Search Books by Price Range:</label>
        <div className="flex">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 border rounded-l w-1/2 focus:outline-none"
            placeholder="Enter minimum price..."
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 border rounded-r w-1/2 focus:outline-none"
            placeholder="Enter maximum price..."
          />
          <button
            onClick={handleSearchByPriceRange}
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600 focus:outline-none"
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
