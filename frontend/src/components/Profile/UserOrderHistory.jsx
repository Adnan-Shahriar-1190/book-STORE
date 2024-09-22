import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState(null); // Initialize as null

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://book-store-server-seven.vercel.app/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {/* Show loader while data is being fetched */}
      {!OrderHistory && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}

      {/* Show message when there is no order history */}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-black mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}

      {/* Display order history if available */}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-black">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-8">
            Your Order History
          </h1>
          {OrderHistory.map((items, i) => (
            // Adding a key prop for each mapped element
            <div
              key={i}
              className="bg-zinc-400 bg-opacity-50 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900"
            >
              <div className="w-[3%] text-white">
                <h1 className="text-center hover:text-white">{i + 1}</h1>
              </div>
              <div className="w-[22%] text-white ">
                {/* Ensure items.book exists before accessing its properties */}
                {items.book ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="text-white hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span>Unknown Book</span>
                )}
              </div>
              <div className="w-[45%]">
                {/* Safe access to book description */}
                {items.book && items.book.desc ? (
                  <h1 className="text-white hover:text-blue-400">
                    {items.book.desc.slice(0, 50)}...
                  </h1>
                ) : (
                  <span>No description available</span>
                )}
              </div>
              <div className="w-[9%]">
                {/* Safe access to book price */}
                {items.book && items.book.price ? (
                  <h1 className="text-white hover:text-blue-400">
                    ${items.book.price}
                  </h1>
                ) : (
                  <span>Price unavailable</span>
                )}
              </div>
              <div className="w-[16%]">
                {/* Safe access to order status */}
                <h1 className="font-semibold text-white hover:text-green-500">
                  {items.status === "Order placed" ? (
                    <div className="text-white hover:text-yellow-500">
                      {items.status}
                    </div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-white hover:text-red-500">
                      {items.status}
                    </div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-white">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
