// src/pages/Services.js
import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailSection from '../components/ServiceDetailSection';
import ServiceDetailModal from '../components/ServiceDetailModal'; // Import the new modal component
import { services } from '../data/servicesData';
import { Helmet } from 'react-helmet-async';

// Import an image for the benefits section (add this to your assets/images folder)
import benefitsSpaImg from '../assets/images/benefits-spa.jpg'; // You'll need to add this image

// --- Framer Motion Variants ---
// (Keep all your existing Framer Motion variants here as before)
// Main page wrapper animation
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren", // Animate parent first
      staggerChildren: 0.1, // Stagger children within the page wrapper
    }
  },
};

// Variants for main section headings and introductory text
const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2, // Slight delay for headings
    }
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3, // Slight delay for text paragraphs
    }
  },
};

// Variants for the grid of ServiceCards
const cardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each ServiceCard's animation
      delayChildren: 0.4, // Delay before cards start animating
    }
  },
};

// Variants for individual ServiceCards (passed to ServiceCard component)
export const serviceCardItemVariants = { // Export this if ServiceCard needs it directly
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    }
  },
};

// Variants for new sections (like Benefits or personalized CTA)
const newSectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  },
};

const newSectionItemVariants = {
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


const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Explore the comprehensive range of luxury spa treatments and health services offered at Venivici, including massages, hydrotherapy, and detox programs." />
        <meta property="og:title" content="Venivici Spa - Our Services" />
        <meta property="og:description" content="Discover our full range of holistic wellness and beauty treatments." />
        <meta property="og:image" content="https://venivici.com/images/services-social.jpg" />
        <meta property="og:url" content="https://venivici.com/services" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 px-4 sm:px-6 lg:px-8 bg-veniviciLightGray"
      >
        <div className="container mx-auto">
          <motion.h1
            variants={headingVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-veniviciGreen text-center mb-6 pt-10"
          >
            Our Comprehensive Services
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-lg sm:text-xl text-center text-veniviciDark max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            At Venivici, we offer a diverse range of health and beauty treatments designed to provide ultimate relaxation, rejuvenation, and holistic well-being. Explore our offerings below:
          </motion.p>

          {/* Service Cards Grid */}
          <motion.div
            variants={cardGridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                variants={serviceCardItemVariants}
                onLearnMore={handleOpenModal} // <--- Pass the modal open handler
              />
            ))}
          </motion.div>

          
          {/* --- New Section: Benefits of Spa Treatments --- */}
          <motion.section
            className="py-16 sm:py-20 bg-white rounded-xl shadow-2xl mb-20"
            variants={newSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                variants={newSectionItemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12"
              >
                Experience the <span className="text-veniviciGreen">Benefits of Wellness</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  variants={newSectionItemVariants}
                  className="rounded-lg overflow-hidden shadow-xl"
                >
                  <img
                    src={benefitsSpaImg}
                    alt="Woman relaxing during a spa treatment"
                    className="w-full h-80 object-cover"
                  />
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  {/* Benefit 1 */}
                  <motion.div variants={newSectionItemVariants} className="flex items-start">
                    <div className="text-veniviciGreen text-4xl mr-4 flex-shrink-0">
                      <i className="fas fa-leaf"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-veniviciDark mb-2">Deep Detoxification</h3>
                      <p className="text-gray-700 text-base">
                        Cleanse your body of toxins and impurities, promoting internal balance and vitality.
                      </p>
                    </div>
                  </motion.div>
                  {/* Benefit 2 */}
                  <motion.div variants={newSectionItemVariants} className="flex items-start">
                    <div className="text-veniviciGreen text-4xl mr-4 flex-shrink-0">
                      <i className="fas fa-moon"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-veniviciDark mb-2">Stress & Anxiety Relief</h3>
                      <p className="text-gray-700 text-base">
                        Melt away tension with therapeutic massages and calming environments, fostering peace of mind.
                      </p>
                    </div>
                  </motion.div>
                  {/* Benefit 3 */}
                  <motion.div variants={newSectionItemVariants} className="flex items-start">
                    <div className="text-veniviciGreen text-4xl mr-4 flex-shrink-0">
                      <i className="fas fa-heartbeat"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-veniviciDark mb-2">Improved Circulation</h3>
                      <p className="text-gray-700 text-base">
                        Enhance blood flow and nutrient delivery, benefiting overall health and skin radiance.
                      </p>
                    </div>
                  </motion.div>
                  {/* Benefit 4 */}
                  <motion.div variants={newSectionItemVariants} className="flex items-start">
                    <div className="text-veniviciGreen text-4xl mr-4 flex-shrink-0">
                      <i className="fas fa-palette"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-veniviciDark mb-2">Skin Rejuvenation</h3>
                      <p className="text-gray-700 text-base">
                        Nourish and revitalize your skin with specialized facials and body treatments.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section for Detailed Service Information (Optional to keep if modal is preferred) */}
          {/* If you want to replace the scrolling detailed sections with only the modal, you can remove this map */}
          <motion.h2
            variants={headingVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mt-16 mb-12"
          >
            Explore Treatments in <span className="text-veniviciGreen">Detail</span>
          </motion.h2>

          {services.map((service, index) => (
            <ServiceDetailSection key={`detail-${service.id}`} service={service} index={index} />
          ))}

          {/* --- Personalized Consultation Call to Action --- */}
          <motion.section
            className="py-16 sm:py-20 bg-veniviciGreen text-white rounded-xl shadow-2xl mt-20 text-center"
            variants={newSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={newSectionItemVariants}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
                Not Sure Where to Start?
              </h2>
            </motion.div>
            <motion.div variants={newSectionItemVariants}>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Let our expert team guide you. We offer personalized consultations to help you discover the perfect treatment plan tailored to your unique needs and wellness goals.
              </p>
            </motion.div>
            <motion.div variants={newSectionItemVariants}>
              <a
                href="/contact"
                className="inline-block bg-veniviciGold text-veniviciDark px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                           hover:bg-white hover:text-veniviciDark hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                Book a Free Consultation
              </a>
            </motion.div>
          </motion.section>

          {/* Original Call to Action for General Assistance (kept if needed, can be removed if new CTA covers it) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-20 p-8 bg-veniviciGray rounded-xl shadow-xl border border-gray-200"
          >
            <h3 className="text-2xl sm:text-3xl font-serif text-veniviciDark mb-4">Have specific questions?</h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              Our specialists are happy to assist you in choosing the perfect treatment or answering any questions.
            </p>
            <a
              href="/contact"
              className="inline-block bg-veniviciGreen text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                         hover:bg-opacity-90 hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              Contact Us Directly
            </a>
          </motion.div>

        </div>
      </motion.div>

      {/* Render the ServiceDetailModal when isModalOpen is true */}
      {isModalOpen && (
        <ServiceDetailModal service={selectedService} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Services;