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
  <div className="absolute top-10 -right-6 w-48 bg-gray-700 text-white shadow-md rounded-l-lg border border-gray-200">
    {/* Cross Button Row */}
    <div className="flex justify-end px-3">
      <button
        className="text-white text-2xl hover:text-red-400 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &times;
      </button>
    </div>
    {/* Menu Items */}
    <ul className="py-1" onClick={()=> setIsMenuOpen(!isMenuOpen)}>
      <li className="px-4 hover:bg-gray-800">
        <Link to="/profile">Profile</Link>
      </li>
      <li className="px-4  hover:bg-gray-800">
        <Link to="/connections">Connections</Link>
      </li>
      <li className="px-4  hover:bg-gray-800">
        <Link to="/requests">Requests</Link>
      </li>
      <li className="px-4  hover:bg-gray-800 flex items-center gap-2">
        <Link to="/password">Change Password</Link>
        <span className="material-icons text-gray-600 ml-1">⚙️</span>
      </li>
      <li
        className="px-4  hover:bg-gray-800 text-red-600 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
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
