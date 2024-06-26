import React, { useState } from 'react';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:1000/api/v1/search-books?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResults(data.data);
      setError('');
    } catch (error) {
      setError('An error occurred while fetching data.');
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2>Book Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter book name..."
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((book) => (
              <li key={book._id}>
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Description:</strong> {book.desc}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
