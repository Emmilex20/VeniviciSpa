// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Effect to manage body overflow when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset overflow when component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]); // Re-run effect when isOpen changes

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
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const menuItemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 },
  };

  // Variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <>
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
            <Link to="/about" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">About Us</Link>
            <Link to="/services" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Services</Link>
            <Link to="/offers" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Offers</Link>
            <Link to="/gallery" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Gallery</Link>
            <Link to="/blog" className="text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 text-lg">Blog</Link>
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
      </motion.nav>

      <AnimatePresence> {/* Wrap conditional rendering with AnimatePresence */}
        {isOpen && (
          // Backdrop for closing when clicking outside
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" // z-40 is lower than menu (z-50)
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)} // Close menu on backdrop click
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed" // Use exit prop for AnimatePresence
            variants={mobileMenuVariants}
            className="md:hidden bg-white shadow-xl fixed top-[72px] sm:top-[80px] md:top-[96px] right-0 w-3/4 max-w-sm h-[calc(100vh-72px)] sm:h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] p-6 overflow-y-auto z-50 transform translate-x-full"
          >
            <div className="flex flex-col space-y-4">
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Home</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/about" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">About Us</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/services" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Services</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/offers" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Offers</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/gallery" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Gallery</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/blog" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Blog</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/contact" className="block text-veniviciDark hover:text-veniviciGreen font-medium transition duration-300 py-3 text-lg border-b border-gray-100">Contact</Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link onClick={() => setIsOpen(false)} to="/booking" className="bg-veniviciGreen text-white px-4 py-3 rounded-full text-center hover:bg-opacity-90 transition duration-300 font-semibold mt-4 shadow-md">Book Now</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;