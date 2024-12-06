import React from 'react';
import heroImg from "../assets/hero.jpg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Feed from './Feed';

const Body = () => {
  const user = useSelector((store)=> store.user)
  if(user)
  return <Feed/>
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
      <img
        src={heroImg}
        alt="Developers Collaborating"
        className="w-full max-w-md mb-6 mt-6 rounded-md shadow-md"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Connect, Collaborate, and Code Together
      </h1>
      <p className="text-gray-600 mb-6">
        CodeMingle is the place for developers to meet and collaborate based on shared skills and interests.
      </p>
      <div className="space-x-4">
        <Link to='/login'><button className="px-6 py-3 border border-gray-800 rounded text-gray-800 hover:bg-gray-200">Log In</button></Link>
        <Link to='/signup'><button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button></Link>
      </div>
    </main>
  );
};

export default Body;
