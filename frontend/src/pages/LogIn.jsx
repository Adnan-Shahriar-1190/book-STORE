import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const LogIn = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        setIsLoading(true);
        const response = await axios.post(
          "https://book-store-server-seven.vercel.app/api/v1/sign-in",
          values
        );
        console.log("Login response:", response.data);

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken); // Store refresh token
        localStorage.setItem("role", response.data.role);

        console.log("Access Token:", localStorage.getItem("token"));
        console.log("Refresh Token:", localStorage.getItem("refreshToken"));

        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        
        <div className="min-h-screen flex items-center justify-center">
            <Loader />
            <p className="text-gray-600 mt-2">Please wait...</p>
          </div>
      
      ) : (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
          <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Log In
            </h2>
            <div className="mt-4">
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Username"
                  name="username"
                  required
                  value={values.username}
                  onChange={change}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Password"
                  name="password"
                  required
                  value={values.password}
                  onChange={change}
                />
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onClick={submit}
                >
                  Log In
                </button>
              </div>
              <p className="flex mt-4 items-center text-gray-600">
                Don't have an account?
                <a href="/SignUp" className="text-blue-600 ml-2">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
