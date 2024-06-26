import React, { useState } from 'react';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearchByName = async () => {
    try {
      const response = await fetch(`http://localhost:1000/api/v1/search-books?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResults(data.data);
      setError('');
      // Clear price search inputs
      setMinPrice('');
      setMaxPrice('');
    } catch (error) {
      setError('An error occurred while fetching data.');
      setSearchResults([]);
    }
  };

  const handleSearchByPriceRange = async () => {
    try {
      if (!minPrice || !maxPrice) {
        setError('Please provide both minPrice and maxPrice');
        setSearchResults([]);
        return;
      }

      const response = await fetch(`http://localhost:1000/api/v1/books-in-price-range?minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setSearchResults(data.data);
      setError('');
      // Clear name search input
      setSearchTerm('');
    } catch (error) {
      setError('An error occurred while fetching data.');
      setSearchResults([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book Search</h2>

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
          <button onClick={handleSearchByName} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none">
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
          <button onClick={handleSearchByPriceRange} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600 focus:outline-none">
            Search
          </button>
        </div>
      </div>

      {/* Error and Results Display */}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((book) => (
              <li key={book._id} className="my-4 border-b pb-4">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p><strong className="font-bold">Author:</strong> {book.author}</p>
                <p><strong className="font-bold">Price:</strong> ${book.price}</p>
                <p><strong className="font-bold">Description:</strong> {book.desc}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
