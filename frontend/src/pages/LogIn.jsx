<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store/auth';
import axios from 'axios';

const LogIn = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
=======
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth, {authActions} from "../store/auth"
import {useDispatch} from "react-redux"
import axios from "axios";

const LogIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch =  useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
>>>>>>> main
  };

  const submit = async () => {
    try {
<<<<<<< HEAD
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-in", values);
        console.log("Login response:", response.data);

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };
=======
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://book-store-server-seven.vercel.app/api/v1/sign-in",
          Values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/Home");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

>>>>>>> main
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
<<<<<<< HEAD
              value={values.username}
=======
              value={Values.username}
>>>>>>> main
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
<<<<<<< HEAD
              rrequired
              value={values.password}
=======
              required
              value={Values.password}
>>>>>>> main
              onChange={change}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={submit}
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
