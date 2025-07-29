// src/components/ServiceDetailSection.js
import React from 'react';
import { motion } from 'framer-motion';

// Variants for individual ServiceDetailSection
const detailSectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2, // Stagger children within this section
    }
  },
};

// Variants for elements inside ServiceDetailSection
const detailItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    }
  },
};

const ServiceDetailSection = ({ service, index }) => {
  // Determine if the image should be on the left or right for alternating layout
  const isImageLeft = index % 2 === 0;

  return (
    <motion.section
      className="py-12 sm:py-16 bg-white rounded-xl shadow-lg mb-10 overflow-hidden"
      variants={detailSectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${isImageLeft ? 'md:grid-flow-col' : 'md:grid-flow-col-dense'}`}>
          {/* Service Image (Conditionally rendered and ordered) */}
          <motion.div
            variants={detailItemVariants}
            className={`rounded-lg overflow-hidden shadow-xl ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </motion.div>

          {/* Service Details */}
          <motion.div
            variants={detailItemVariants}
            className={`text-center md:text-left ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}
          >
            <h3 className="text-3xl sm:text-4xl font-serif text-veniviciDark mb-4 leading-tight">
              <span className="text-veniviciGreen">{service.title}</span>
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Benefits List */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-veniviciDark mb-3">Key Benefits:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
                  {service.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price and Duration */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start items-center text-lg font-semibold text-veniviciDark">
              {service.duration && (
                <span>Duration: <span className="text-veniviciGreen">{service.duration}</span></span>
              )}
              {service.price && (
                <span>Price: <span className="text-veniviciGreen">{service.price}</span></span>
              )}
            </div>

            {/* Call to Action for this specific service (Opens Modal) */}
            <div className="mt-8 text-center md:text-left">
              <button
                // Assuming you'll pass an onOpenModal prop from Services.js if you want a direct button here
                // For now, it will simply re-open the existing modal with its details
                onClick={() => {
                  // This is a placeholder. In a real scenario, you'd want to pass the handleOpenModal
                  // function from Services.js down to ServiceDetailSection.
                  // For simplicity, we'll assume the main "Learn More" on the cards is the primary modal trigger.
                  // If you want to trigger the modal from here, you'd need to lift state.
                  // For this example, we'll keep the modal opening from cards only,
                  // or you can add a prop `onOpenModal` to this component and call it here.
                  alert(`You clicked to learn more about ${service.title}! (Modal functionality not directly wired here in this component without prop passing)`);
                }}
                className="inline-block bg-veniviciGreen text-white px-6 py-3 rounded-full text-md font-semibold shadow-md
                           hover:bg-opacity-90 transition duration-300 transform hover:scale-105"
              >
                Book {service.title}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceDetailSection;