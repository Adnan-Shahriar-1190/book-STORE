import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    /**{ title: "Profile", link: "/profile" },*/
  ];
  
  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative bg-gradient-to-r from-blue-900 to-green-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center">
          <img
            className="h-12 m-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="Logo"
          />
          <h1 className="text-3xl font-bold">BookStore</h1>
        </Link>

        <div className="nav-links-bookheaven block md:flex gap-6 items-center">
          <div className="hidden md:flex gap-6">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className="hover:text-yellow-300 transition-all duration-300"
                key={i}
              >
                {items.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex gap-6">
            <Link
              to="/SignUp"
              className="px-4 py-2 bg-yellow-300 text-purple-800 rounded hover:bg-white hover:text-purple-800 transition-all duration-300"
            >
              SignUp
            </Link>
            <Link
              to="/LogIn"
              className="px-4 py-2 border border-yellow-300 rounded hover:bg-yellow-300 hover:text-purple-800 transition-all duration-300"
            >
              LogIn
            </Link>
          </div>
          <button
            className="block md:hidden text-white text-3xl"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={`${MobileNav} bg-gradient-to-r from-purple-500 to-blue-500 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className={`${MobileNav} text-white text-4xl font-semibold mb-8 hover:text-yellow-300 transition-all duration-300`}
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}
          </Link>
        ))}

        <Link
          to="/SignUp"
          className={`${MobileNav} px-4 py-2 mb-4 text-2xl bg-yellow-300 text-purple-800 rounded hover:bg-white hover:text-purple-800 transition-all duration-300`}
        >
          SignUp
        </Link>
        <Link
          to="/LogIn"
          className={`${MobileNav} px-4 py-2 mb-4 text-2xl border border-yellow-300 rounded hover:bg-yellow-300 hover:text-purple-800 transition-all duration-300`}
        >
          LogIn
        </Link>
      </div>
    </>
  );
};

export default Navbar;
