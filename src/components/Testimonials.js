// src/components/Testimonials.js
import React from 'react'; // Removed useState, useEffect as we're using local data
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../data/testimonialsData'; // Import local testimonials data

// Framer Motion Variants for the section
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    }
  },
};

// Variants for the main heading
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
};

const Testimonials = () => {
  // Use the local testimonials data directly
  // Display only the first 3 testimonials as featured for the homepage
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <motion.section
      className="py-16 sm:py-24 bg-veniviciGray"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-veniviciGreen mb-12"
          variants={headingVariants}
        >
          What Our <span className="text-veniviciDark">Clients Say</span>
        </motion.h2>

        {featuredTestimonials.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No testimonials available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id} // Use the local data's 'id'
                testimonial={testimonial}
                index={index} // Pass index for animation staggering
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Testimonials;