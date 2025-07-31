// src/pages/Offers.js
import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedButton from '../components/AnimatedButton';
// Removed: import { treatments } from '../data/treatmentsData'; // No longer using local data

// Framer Motion Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.15,
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Offers = () => {
  // State for fetched offers
  const [allOffers, setAllOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offersError, setOffersError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // Fetch from your backend's offers endpoint
        const response = await fetch('http://localhost:5000/api/offers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched offers data for Offers page:", data);
        setAllOffers(data); // Set the fetched data to state
      } catch (err) {
        setOffersError(err.message);
        console.error("Failed to fetch offers for Offers page:", err);
      } finally {
        setLoadingOffers(false);
      }
    };

    fetchOffers();
  }, []); // Empty dependency array means this runs once on mount

  // allOffers will now contain only "offer" type items if your /api/offers endpoint
  // is dedicated to offers. If your /api/services endpoint returns all types
  // and you filter here, you would use that endpoint and filter data accordingly.
  const offersToShow = allOffers; // Assuming /api/offers returns only offers


  return (
    <>
      <Helmet>
        <title>Venivici Spa - Special Offers & Packages</title>
        <meta name="description" content="Explore exclusive spa packages and special offers at Venivici Health Club & Urban Spa in Lekki, Lagos. Indulge in luxury for less." />
        <meta property="og:title" content="Venivici Spa - Special Offers & Packages" />
        <meta property="og:description" content="Discover rejuvenating packages and limited-time offers for holistic wellness at Venivici Spa." />
        <meta property="og:image" content="https://venivici.com/images/offers-social.jpg" /> {/* Update with a relevant image */}
        <meta property="og:url" content="https://venivici.com/offers" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="pt-[72px] sm:pt-[80px] md:pt-[96px]">
        {/* Hero Section for Offers */}
        <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1540381667083-d92e59781682?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <motion.div
            className="relative z-10 text-white p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold mb-3">
              Special <span className="text-veniviciGold">Offers & Packages</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Unlock exclusive deals for unparalleled wellness and luxury treatments.
            </p>
          </motion.div>
        </section>

        {/* All Offers Section */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciLightGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {loadingOffers ? (
            <p className="text-center text-veniviciDark text-lg">Loading special offers...</p>
          ) : offersError ? (
            <p className="text-center text-red-600 text-lg">Error loading offers: {offersError}. Please try again later.</p>
          ) : offersToShow.length === 0 ? (
            <p className="text-center text-gray-700 text-lg">No special offers available at the moment. Please check back later!</p>
          ) : (
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offersToShow.map((offer) => (
                <motion.div
                  key={offer._id}
                  className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
                  variants={itemVariants}
                >
                  {/* Assumes imageUrl is provided directly by the API for offers */}
                  {offer.imageUrl && (
                    <img src={offer.imageUrl} alt={offer.name || offer.title || 'Offer Image'} className="w-full h-48 object-cover object-center" />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Only show icon if it exists, using 'iconClass' from API if available, fallback to 'icon' */}
                    {(offer.iconClass || offer.icon) && (
                      <div className="text-veniviciGreen text-4xl mb-3 text-center">
                        <i className={offer.iconClass || offer.icon}></i>
                      </div>
                    )}
                    <h3 className="text-2xl font-semibold text-veniviciDark mb-2 text-center">{offer.name || offer.title}</h3> {/* Use 'name' first, fallback to 'title' */}
                    <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow">{offer.description}</p>

                    {/* Display inclusions if available */}
                    {offer.inclusions && offer.inclusions.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-veniviciDark mb-2">Package Includes:</h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          {offer.inclusions.map((inclusion, idx) => (
                            <li key={idx} className="flex items-center">
                              <i className="fas fa-check-circle text-veniviciGreen text-xs mr-2"></i>{inclusion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-veniviciGold text-3xl font-bold mb-4 mt-auto text-center">
                      {offer.price ? `₦${offer.price.toLocaleString()}` : 'Price not available'} {/* Format price with Naira symbol */}
                    </div>
                    <div className="text-center">
                      <AnimatedButton to="/booking" className="inline-block bg-veniviciGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold">
                        Book Now
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-lg text-gray-700 mb-4">
              Can't find what you're looking for? Contact us for a custom package!
            </p>
            <AnimatedButton to="/contact" className="bg-transparent border-2 border-veniviciGreen text-veniviciGreen hover:bg-veniviciGreen hover:text-white">
              Contact Us
            </AnimatedButton>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default Offers;