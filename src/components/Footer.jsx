import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-6">
      <div className="space-x-6">
        <Link to="/" className="hover:underline">About Us</Link>
        <Link to="/" className="hover:underline">Terms of Service</Link>
        <Link to="/" className="hover:underline">Privacy Policy</Link>
        <Link to="/" className="hover:underline">Contact Us</Link>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} CodeMingle. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

