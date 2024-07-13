import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage items
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    // Dispatch logout action (if using Redux for authentication state)
    dispatch(authActions.logout());

    // Navigate to login page
    navigate("/Login");
  };

  if (!data) {
    return null; // Or a loading spinner/message if data is not available
  }

  return (
    <div className="bg-zinc-100 p-6 rounded-lg flex flex-col items-center justify-center space-y-4 w-full md:w-64">
      <img
        src={data.avatar}
        alt="Profile Pic"
        className="w-24 h-24 rounded-full"
        aria-label="Profile Picture"
      />
      <h2 className="text-xl font-bold text-black">{data.username}</h2>
      <p className="text-zinc-800">{data.email}</p>
      <p className="text-zinc-800">{data.phone}</p>

      <button
        className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-black  hover:text-red-800"
        aria-label="Logout Button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
