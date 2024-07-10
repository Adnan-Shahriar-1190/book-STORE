import React from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import BookSearch from "./pages/BookSearch";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/all-books" element={<AllBooks />} />
          <Route  path="/SignUp" element={<SignUp />} />
          <Route  path="/LogIn" element={<LogIn />} />
          <Route  path="/BookSearch" element={<BookSearch />} />
          <Route  path="/profile" element={<Profile />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails/>}/>

        </Routes>
        <Footer />
    </div>
  );
};

export default App;
