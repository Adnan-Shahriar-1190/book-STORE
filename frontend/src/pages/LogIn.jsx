import React from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          LogIn
        </h2>

        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your name"
              name="username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              LogIn
            </button>
          </div>

          <p className="flex mt-4 items-center justify-center font-semibold text-gray-600">
            or
          </p>

          <p className="text-gray-600 ">
            Don't have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
