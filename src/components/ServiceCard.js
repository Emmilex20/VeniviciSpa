// src/components/ServiceCard.js
import React from 'react';
import { motion } from 'framer-motion';

// ServiceCard now accepts an `onLearnMore` prop
const ServiceCard = ({ service, index, variants, onLearnMore }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer group"
      variants={variants}
      // You can remove the direct href link as it will be handled by the modal
      // onClick={() => onLearnMore(service)} // Optional: click anywhere on card to open modal
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between"> {/* Added flex-col and justify-between */}
        <div> {/* Group title and description */}
          <h3 className="text-xl sm:text-2xl font-semibold text-veniviciDark mb-3 group-hover:text-veniviciGreen transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 flex-grow">
            {/* Display full description in modal, short one here */}
            {service.shortDescription || (service.description.length > 100 ? service.description.substring(0, 100) + '...' : service.description)}
          </p>
        </div>
        <div className="text-right mt-auto"> {/* Use mt-auto to push button to bottom */}
          <button
            onClick={() => onLearnMore(service)} // <--- This triggers the modal
            className="text-veniviciGreen font-semibold hover:underline flex items-center justify-end group-hover:translate-x-1 transition-transform duration-200"
          >
            Learn More <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;