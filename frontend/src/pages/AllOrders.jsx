import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [orderHistory, setOrderHistory] = useState(null); // Initialize as null

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://book-store-server-seven.vercel.app/api/v1/get-all-orders",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      {/* Show loader while data is being fetched */}
      {!orderHistory && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}

      {/* Show message when there is no order history */}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-black mb-8">
              No Order History Found
            </h1>
          </div>
        </div>
      )}

      {/* Display order history if available */}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-black">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-8">
            All Orders
          </h1>
          {orderHistory.map((order, i) => (
            // Adding a key prop for each mapped element
            <div
              key={i}
              className="bg-zinc-400 bg-opacity-50 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900"
            >
              <div className="w-[3%] text-white">
                <h1 className="text-center hover:text-white">{i + 1}</h1>
              </div>
              <div className="w-[20%] text-white">
                {/* Ensure order.user exists before accessing its properties */}
                {order.user ? (
                  <h1 className="text-white hover:text-blue-300">
                    {order.user.name}
                  </h1>
                ) : (
                  <span>Unknown User</span>
                )}
              </div>
              <div className="w-[20%] text-white">
                {/* Ensure order.book exists before accessing its properties */}
                {order.book ? (
                  <Link
                    to={`/view-book-details/${order.book._id}`}
                    className="text-white hover:text-blue-300"
                  >
                    {order.book.title}
                  </Link>
                ) : (
                  <span>Unknown Book</span>
                )}
              </div>
              <div className="w-[35%]">
                {/* Safe access to book description */}
                {order.book && order.book.desc ? (
                  <h1 className="text-white hover:text-blue-400">
                    {order.book.desc.slice(0, 50)}...
                  </h1>
                ) : (
                  <span>No description available</span>
                )}
              </div>
              <div className="w-[10%]">
                {/* Safe access to book price */}
                {order.book && order.book.price ? (
                  <h1 className="text-white hover:text-blue-400">
                    ${order.book.price}
                  </h1>
                ) : (
                  <span>Price unavailable</span>
                )}
              </div>
              <div className="w-[12%]">
                {/* Safe access to order status */}
                <h1 className="font-semibold text-white hover:text-green-500">
                  {order.status === "Order placed" ? (
                    <div className="text-white hover:text-yellow-500">
                      {order.status}
                    </div>
                  ) : order.status === "Canceled" ? (
                    <div className="text-white hover:text-red-500">
                      {order.status}
                    </div>
                  ) : (
                    order.status
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

export default AllOrders;
