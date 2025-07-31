// src/components/ServiceDetailModal.js
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetailModal = ({ service, onClose }) => {
  const modalRef = useRef(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Close modal when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!service) return null; // Don't render if no service is provided

  console.log("Service data received by ServiceDetailModal:", service);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleClickOutside} // Click outside to close
      >
        {/* Modal Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

        {/* Modal Content */}
        <motion.div
          ref={modalRef} // Assign ref here
          className="relative bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl transition-colors duration-200"
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* Service Image */}
          {service.imageUrl && (
            <div className="mb-6">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Service Title */}
          <h2 className="text-3xl sm:text-4xl font-serif text-veniviciGreen mb-4 leading-tight">
            {service.title}
          </h2>

          {/* Service Short Description (if different from full) */}
          {service.shortDescription && (
            <p className="text-lg text-gray-700 mb-4 font-light">
              {service.shortDescription}
            </p>
          )}

          {/* Service Full Description */}
          <p className="text-base sm:text-lg text-gray-800 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Service Benefits (Optional, if you want to add them to your service data) */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-veniviciDark mb-3">Benefits:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Service Duration & Price (Example structure - adjust as per your data) */}
          <div className="flex flex-wrap gap-4 justify-between items-center bg-veniviciGray p-4 rounded-md">
            {service.duration && (
              <p className="text-md text-veniviciDark font-semibold">
                Duration: <span className="text-veniviciGreen">{service.duration}</span>
              </p>
            )}
            {service.price && (
              <p className="text-md text-veniviciDark font-semibold">
                Price: <span className="text-veniviciGreen">{service.price}</span>
              </p>
            )}
          </div>

          {/* Call to Action Button inside modal */}
          <div className="mt-8 text-center">
            <a
              href="/booking"
              className="inline-block bg-veniviciGreen text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                         hover:bg-opacity-90 hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              Book This Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;