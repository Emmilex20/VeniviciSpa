// src/components/CookieConsent.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const consentGiven = localStorage.getItem('venivici_cookie_consent');
    if (!consentGiven) {
      // If not, show the consent pop-up after a small delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Set a flag in localStorage to remember user's choice
    localStorage.setItem('venivici_cookie_consent', 'accepted');
    setShowConsent(false); // Hide the pop-up
    // You might also trigger a Google Analytics consent update here if needed
  };

  const handleDecline = () => {
    // Optionally, handle decline (e.g., disable non-essential cookies)
    localStorage.setItem('venivici_cookie_consent', 'declined'); // Store decline
    setShowConsent(false); // Hide the pop-up
    // If you have analytics or other non-essential scripts, ensure they are not loaded
    // or are unloaded if consent is declined. This often requires more advanced cookie management libraries.
    // For this basic setup, we just hide the banner.
  };

  // Framer Motion variants for the pop-up animation
  const slideUp = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 bg-veniviciDark bg-opacity-95 text-white p-6 shadow-lg sm:flex sm:items-center sm:justify-between flex-wrap"
        >
          <div className="flex-grow mb-4 sm:mb-0 text-center sm:text-left">
            <p className="text-sm sm:text-base leading-relaxed">
              We use cookies to improve your experience on our site. By continuing to use our website, you agree to our <Link to="/privacy-policy" className="text-veniviciGold hover:underline font-semibold">Privacy Policy</Link> and <Link to="/terms" className="text-veniviciGold hover:underline font-semibold">Terms & Conditions</Link>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-6 py-2 bg-veniviciGreen text-white rounded-md hover:bg-opacity-90 transition duration-300 font-semibold text-sm sm:text-base"
            >
              Accept Cookies
            </button>
            <button
              onClick={handleDecline}
              className="w-full sm:w-auto px-6 py-2 border border-white text-white rounded-md hover:bg-gray-700 transition duration-300 font-semibold text-sm sm:text-base"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;