import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://book-store-server-seven.vercel.app/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[100%] bg-zinc-400 bg-opacity-25 p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-black mb-8">
        Add Book
      </h1>
<<<<<<< HEAD
      <div className="p-4 bg-transparent rounded">
=======
      <div className="p-4 bg-zinc-800 bg-opacity-50 rounded">
>>>>>>> shihab3
        <div>
          <label htmlFor="" className="text-black text-lg font-semibold">
            Book Image
          </label>
          <input
            type="text"
<<<<<<< HEAD
            className="w-full mt-2 bg-gray-200 text-black p-2 rounded-md"
=======
            className="w-full mt-2 bg-gray-200 bg-opacity-10 p-2 outline-none"
>>>>>>> shihab3
            placeholder="Enter Image Url (JPG Format)"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-black text-lg font-semibold rounded-md">
            Book Title
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-gray-200 bg-opacity-10 p-2 outline-none"
            placeholder="Title"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-full">
            <label htmlFor="" className="text-black rounded-md text-lg font-semibold">
              Author
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-200 bg-opacity-10 p-2 outline-none"
              placeholder="Author"
              name="author"
              required
              value={Data.author}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-black rounded-md text-lg font-semibold">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-200 bg-opacity-10 p-2 outline-none"
              placeholder="Language"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-black rounded-md text-lg font-semibold">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-gray-200 bg-opacity-10 p-2 outline-none"
              placeholder="Enter Price"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-black rounded-md text-lg font-semibold">
            Description
          </label>
          <textarea
            className="w-full mt-2 bg-gray-200 bg-opacity-10 p-2 outline-none"
            rows="5"
            placeholder="Description"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <button
            onClick={submit}
            className="w-1/2 mx-auto block bg-blue-900 text-white font-bold rounded-md py-2 hover:bg-red-500 hover:text-black transition-colors duration-100"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
