// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        when: "beforeChildren", // Animate parent first
        staggerChildren: 0.1, // Stagger children animations
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        when: "afterChildren", // Animate parent after children
        staggerChildren: 0.05, // Stagger children animations
        staggerDirection: -1, // Animate in reverse
      },
    },
  };

  const menuItemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 },
  };

  return (
    <motion.nav
      className="bg-white shadow-lg py-4 px-6 md:px-12 lg:px-16 fixed w-full z-50 top-0"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif text-veniviciDark font-extrabold tracking-tight">
          Venivici <span className="text-veniviciGreen">Spa</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          <Link to="/" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Home</Link>
          <Link to="/about" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">About Us</Link> {/* New Link */}
          <Link to="/services" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Services</Link>
          <Link to="/gallery" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Gallery</Link>
          <Link to="/blog" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Blog</Link> {/* New Link */}
          <Link to="/contact" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Contact</Link>
          <Link to="/booking" className="bg-veniviciGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold shadow-md">Book Now</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-veniviciDark focus:outline-none p-2 rounded-md hover:bg-gray-100 transition duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full p-4 overflow-hidden"
      >
        <div className="flex flex-col space-y-4">
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Home</Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/about" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">About Us</Link> {/* New Link */}
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/services" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Services</Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/gallery" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Gallery</Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/blog" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Blog</Link> {/* New Link */}
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Contact</Link>
          </motion.div>
          <motion.div variants={menuItemVariants}>
            <Link onClick={() => setIsOpen(false)} to="/booking" className="bg-veniviciGreen text-white px-4 py-3 rounded-full text-center hover:bg-opacity-90 transition duration-300 font-semibold mt-4 shadow-md">Book Now</Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;