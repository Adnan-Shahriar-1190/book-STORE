import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    dispatch(authActions.logout());

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

      <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="bg-zinc-900 text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-500 hover:text-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>

        <Link
          to="/profile/orderHistory"
          className="bg-zinc-900 text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-slate-500 hover:text-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="bg-zinc-900 text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-slate-500 hover:text-zinc-900 rounded transition-all duration-300"
        >
          Update Profile
        </Link>
      </div>

      <button
        className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-black hover:text-red-800"
        aria-label="Logout Button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
