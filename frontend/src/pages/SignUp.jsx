import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
const Signup = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://book-store-server-seven.vercel.app/api/v1/sign-up",
          Values
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
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
              value={Values.username}
              onChange={change}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              name="email"
              required
              value={Values.email}
              onChange={change}
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
              value={Values.password}
              onChange={change}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 mb-2">
              Address
            </label>
            <textarea
              id="address"
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="3"
              placeholder="Address"
              name="address"
              required
              value={Values.address}
              onChange={change}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={submit}
              
            >
              Sign Up
            </button>
          </div>
          
          <p className="flex mt-4 items-center justify-center font-semibold text-gray-600">
            or
          </p>

          <p className="text-gray-600">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>Log In</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
