// src/components/AnimatedButton.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedButton = ({ to, children, className = '' }) => {
  const buttonVariants = {
    rest: { scale: 1, backgroundColor: '#4CAF50', color: '#ffffff' }, // veniviciGreen
    hover: { scale: 1.05, backgroundColor: '#388E3C', transition: { duration: 0.2 } }, // slightly darker green
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <Link
        to={to}
        className="block px-8 py-4 rounded-full text-center font-semibold text-lg"
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default AnimatedButton;