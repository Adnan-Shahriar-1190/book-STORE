import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [Value, setValue] = useState({
    avatar: "",
    username: "",
    email: "",
    phone: "",
  });
  const [ProfileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://book-store-server-seven.vercel.app/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({
          avatar: response.data.avatar,
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const submitProfile = async () => {
    try {
      const response = await axios.put(
        "https://book-store-server-seven.vercel.app/api/v1/update-profile",
        Value,
        { headers }
      );
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-transparent h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-bold text-black mb-8 px-12 py-3">
        Settings
      </h1>

      <div className="flex flex-col px-12">
        <div className="flex flex-col text-black font-semibold">
          <label htmlFor="avatar">Avatar (PNG/JPG Format)</label>
          <input
            className="p-2 rounded bg-gray-200 text-black mt-2 font-semibold mb-4"
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={Value.avatar}
            onChange={change}
          />
        </div>
        <div className="flex flex-col py-2 text-black font-semibold">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded bg-gray-200 text-black mt-2 font-semibold"
            type="email"
            name="email"
            value={Value.email}
            onChange={change}
          />
        </div>
        <div className="flex flex-col py-2 text-black font-semibold">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 rounded bg-gray-200 text-black mt-2 font-semibold"
            type="text"
            name="username"
            value={Value.username}
            onChange={change}
          />
        </div>
        <div className="flex flex-col py-2 text-black font-semibold">
          <label htmlFor="">Phone Number</label>
          <input
            className="p-2 rounded bg-gray-200 text-black mt-2 font-semibold"
            placeholder="Phone Number"
            name="phone"
            value={Value.phone}
            onChange={change}
          />
        </div>
      </div>
      <div className="flex justify-center items-center py-4 px-6">
        <button
          className="bg-blue-950 text-white font-semibold px-8 py-2 rounded hover:bg-red-500 hover:text-black transition-all duration-100"
          onClick={submitProfile}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Settings;
