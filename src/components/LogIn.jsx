import React from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  return (
    <div className="flex flex-col bg-gray-100">
      

      {/* Login Form */}
      <div className="flex-grow flex flex-col items-center justify-start px-6 mt-4">
        <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Log In</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
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
