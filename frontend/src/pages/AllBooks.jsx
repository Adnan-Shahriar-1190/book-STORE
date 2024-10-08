import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import BookSearch from './BookSearch';
const AllBooks = () => {

  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://book-store-server-seven.vercel.app/api/v1/get-all-books"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4">
      <BookSearch/>
      <h4 className="bg-gradient-to-r from-blue-500 to-green-500 text-3xl text-zinc-800 font-semibold pt-3">All Books</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data &&
          data.map((book, index) => (
            <div key={index}>
              <BookCard data={book} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
