// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-6 py-20"
    >
      <h1 className="text-8xl font-bold text-veniviciGreen mb-4">404</h1>
      <h2 className="text-4xl font-serif text-veniviciDark mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-veniviciGreen text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
      >
        Go to Homepage
      </Link>
    </motion.div>
  );
};

export default NotFound;