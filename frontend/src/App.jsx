import React, { useEffect } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import LogIn from "./pages/LogIn";
import BookSearch from "./pages/BookSearch";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import TrafficChart from "./pages/TrafficChart";
import AddBook from "./pages/AddBook";
import About from "./components/Footer/about";
import Contact from "./components/Footer/contact";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("refreshToken") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book-search" element={<BookSearch />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<TrafficChart />} />
          )}
          {role === "admin" && (
            <>
              <Route path="add-book" element={<AddBook />} />
              <Route path="all-orders" element={<AllOrders />} />
            </>
          )}
          <Route path="order-history" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
