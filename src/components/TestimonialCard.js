// src/components/TestimonialCard.js
import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div>
        <div className="flex justify-center sm:justify-start text-veniviciGold mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <i key={i} className="fas fa-star text-xl sm:text-lg"></i>
          ))}
          {[...Array(5 - testimonial.rating)].map((_, i) => (
            <i key={i} className="far fa-star text-gray-300 text-xl sm:text-lg"></i>
          ))}
        </div>
        <p className="text-gray-700 text-lg sm:text-base italic mb-4 text-center sm:text-left">"{testimonial.quote}"</p>
      </div>
      <div className="flex items-center mt-4 pt-4 border-t border-gray-100 justify-center sm:justify-start">
        {testimonial.image && (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-veniviciGreen/50 shadow-md"
          />
        )}
        <div className="text-center sm:text-left">
          <p className="font-semibold text-veniviciDark text-lg">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;