import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/slices/userSlice";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post("http://localhost:8080/logout",{},{withCredentials : true})
   
    dispatch(removeUser());
    toast.success(response.data.message, {
      position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    navigate("/")
  };

  return (
    <header className="bg-white shadow-lg py-4 px-6 flex justify-between items-center">
      <Link to="/">
        <div className="text-2xl font-bold text-gray-800">CodeMingle</div>
      </Link>

      <div className="space-x-4 flex items-center relative">
        {user?.fullName ? (
          <>
            <span className="text-gray-800 font-medium">Hey, {user?.fullName}</span>
            <div
              className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden cursor-pointer"
              title="User Menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {user?.photoUrl ? (
                <img
                  src={user?.photoUrl}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  U
                </div>
              )}
            </div>

            
            {isMenuOpen && (
  <div className="absolute top-10 -right-6 w-56 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg border border-gray-700 z-10 overflow-hidden">
    {/* Cross Button Row */}
    <div className="flex justify-end px-3 py-2 bg-gray-900 bg-opacity-50">
      <button
        className="text-gray-300 hover:text-white "
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    {/* Menu Items */}
    <ul className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <li className="px-4 py-1 hover:bg-gray-700 transition-colors duration-200">
        <Link to="/profile" className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </Link>
      </li>
      <li className="px-4 py-1 hover:bg-gray-700 transition-colors duration-200">
        <Link to="/connections" className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Connections</span>
        </Link>
      </li>
      <li className="px-4 py-1 hover:bg-gray-700 transition-colors duration-200">
        <Link to="/requests" className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Requests</span>
        </Link>
      </li>
      <li className="px-4 py-1 hover:bg-gray-700 transition-colors duration-200">
        <Link to="/password" className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <span>Change Password</span>
        </Link>
      </li>
      <li
        className="px-4 py-1 hover:bg-red-600 text-red-400 hover:text-white cursor-pointer transition-colors duration-200"
        onClick={handleLogout}
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </div>
      </li>
    </ul>
  </div>
)}


          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 border border-gray-800 rounded text-gray-800 hover:bg-gray-200">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
