import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

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
  }, []);

  return (
    <>
      {data && (
        <div className=" px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 ">
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center">
            <img
              src={data.url}
              alt="Book cover"
              className=" h-[50vh] lg:h-[70vh] text-white rounded"
            />
          </div>
          <div className="p-4 w-3/6">
            <h1 className="text-4xl text-zinc-300 font-bold mt-5">
              {" "}
              {data.title}
            </h1>
            <p className="text-zinc-400 mt-1 text-xl from-neutral-600">
              by {data.author}
            </p>
            <p className="text-xl text-zinc-400  mt-6 ">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400 ">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-7 text-zinc-100 text-3xl font-bold">
              Price : ৳ {data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!data && <div className="h-screen bg-zinc-900 flex items-center justify-center"> <Loader/>{" "} </div>}
    </>
  );
};

export default ViewBookDetails;
