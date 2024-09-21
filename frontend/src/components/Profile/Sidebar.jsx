import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Access the current URL path

  const role = useSelector((state) => state.auth.role);

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

  const activeClass =
    "bg-slate-500 text-zinc-900"; // Same as hover color
  const inactiveClass =
    "bg-zinc-900 text-zinc-100 hover:bg-slate-500 hover:text-zinc-900";

  return (
    <div className="bg-zinc-100 bg-opacity-50 p-6 rounded-lg flex flex-col items-center justify-center space-y-4 w-full md:w-64">
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

      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className={`${
              location.pathname === "/profile" ? activeClass : inactiveClass
            } font-semibold w-full py-2 text-center rounded transition-all duration-300`}
          >
            Favourites
          </Link>

          <Link
            to="/profile/orderHistory"
            className={`${
              location.pathname === "/profile/orderHistory" ? activeClass : inactiveClass
            } font-semibold w-full py-2 mt-4 text-center rounded transition-all duration-300`}
          >
            Order History
          </Link>

          <Link
            to="/profile/settings"
            className={`${
              location.pathname === "/profile/settings" ? activeClass : inactiveClass
            } font-semibold w-full py-2 mt-4 text-center rounded transition-all duration-300`}
          >
            Update Profile
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className={`${
              location.pathname === "/profile" ? activeClass : inactiveClass
            } font-semibold w-full py-2 text-center rounded transition-all duration-300`}
          >
            All Orders
          </Link>

          <Link
            to="/profile/add-book"
            className={`${
              location.pathname === "/profile/add-book" ? activeClass : inactiveClass
            } font-semibold w-full py-2 mt-4 text-center rounded transition-all duration-300`}
          >
            Add Book
          </Link>
        </div>
      )}

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
