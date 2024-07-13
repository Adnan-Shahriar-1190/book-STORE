import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        {
          headers: {
            id: localStorage.getItem('id'),
            authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log('Access token expired, trying to refresh...');
        await refreshAccessToken();
      } else {
        console.error('Error fetching profile data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    if (refreshToken) {
      try {
        const refreshResponse = await axios.post(
          "http://localhost:1000/api/v1/token",
          { token: refreshToken }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('token', newAccessToken);

        console.log('New JWT Token:', newAccessToken);

        // Retry fetching the profile data with the new token
        await fetchProfile(newAccessToken);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        if (refreshError.response) {
          console.error('Response data:', refreshError.response.data);
          console.error('Response status:', refreshError.response.status);
          console.error('Response headers:', refreshError.response.headers);
        }
        setLoading(false);
      }
    } else {
      console.log('No refresh token available');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(token);
  }, [token]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen bg-cover bg-center text-white px-10 py-8">
      {loading && (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4 w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && profile && (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
