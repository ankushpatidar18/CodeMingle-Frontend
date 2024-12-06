import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../utils/slices/userSlice';
import { useDispatch } from "react-redux";
import { Bounce, toast } from 'react-toastify';

const LogIn = () => {
  const [formData, setFormData] = useState({ emailId: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/login', // Adjust based on your backend URL
        formData,
        { withCredentials: true } // Sends the cookie back
      );
      
      dispatch(addUser(response.data.data));
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
      navigate('/'); // Redirect to a protected route (replace '/dashboard' with your desired route)
    } catch (err) {
      // Handle errors gracefully
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Login Form */}
      <div className="flex-grow flex flex-col items-center justify-start px-6 mt-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Log In</h2>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="emailId"
                placeholder="Enter your email"
                value={formData.emailId}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center py-1 mt-4">
        <p className="text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
