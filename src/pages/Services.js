// src/pages/Services.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailSection from '../components/ServiceDetailSection';
import ServiceDetailModal from '../components/ServiceDetailModal';
import { Helmet } from 'react-helmet-async';

// IMPORTANT: Ensure these images exist in your src/assets/images folder
import benefitsSpaImg from '../assets/images/benefits-spa.jpg';
import servicePageHero from '../assets/images/services-overview.jpg';

// Import images for service cards (same as Home.js for consistency)
import idea1Img from '../assets/images/idea1.jpg';
import idae2Img from '../assets/images/idae 2.jpg';
import idae3Img from '../assets/images/idae 3.jpg';
import idea4Img from '../assets/images/idea4.jpg';
import idea5Img from '../assets/images/idea5.jpg'; // Corrected path: Assumed it was a typo, ensure 'assets/images/idea5.jpg'
import bodyScrub from '../assets/images/full-body-scrub.jpg';
import sport from '../assets/images/sport.webp';
import expertPlaceholder from '../assets/images/expertPlaceholder.jpg'; // For services not yet mapped

// --- Local Image Mapping for Services ---
// IMPORTANT: The keys here MUST EXACTLY MATCH the 'name' field of your services from the API.
// Add any other service names from your API and map them to their respective images.
const serviceImageMap = {
    "Post Surgery Rehabilitation": idae2Img,
    "Relaxation Massage": expertPlaceholder,
    "Deep Tissue Massage": idae3Img,
    "Aromatherapy Facial": idea5Img,
    "Hot Stone Therapy": idea4Img,
    "Manicure & Pedicure": idea1Img,
    "Body Scrub & Wrap": bodyScrub,
    "Sports Massage": sport,
    "Couple's Retreat": idae2Img, // Example for an 'offer' type (if you had this in your data)
    "Detox Package": idea4Img,    // Example for another 'offer' type (if you had this in your data)
    // Add more mappings as needed for your specific service names from the backend API
    // If a service name from the API is missing here, its image will be an empty string.
};


// --- Framer Motion Variants ---
// Main page wrapper animation
const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
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
            delay: 0.2,
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
            delay: 0.3,
        }
    },
};

// Variants for the grid of ServiceCards
const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.4,
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
    // State for fetched services
    const [allServices, setAllServices] = useState([]); // Stores all fetched services
    const [loadingServices, setLoadingServices] = useState(true);
    const [servicesError, setServicesError] = useState(null);

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Fetch services when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/services'); // Fetch from your backend
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched services data for Services page:", data); // Log fetched data
                setAllServices(data); // Set the fetched data to state
            } catch (err) {
                setServicesError(err.message);
                console.error("Failed to fetch services for Services page:", err);
            } finally {
                setLoadingServices(false);
            }
        };

        fetchServices();
    }, []); // Empty dependency array means this runs once on mount

    // servicesToShow simply uses all the fetched services
    const servicesToShow = allServices;

    // Handler to open the ServiceDetailModal
    const handleOpenModal = (service) => {
        // Prepare the service object for the modal to ensure all necessary props are available
        setSelectedService({
            id: service._id, // Use _id from MongoDB
            title: service.name,
            description: service.description,
            price: service.price ? `₦${service.price.toLocaleString()}` : 'N/A', // Format price, handle if missing
            duration: service.duration,
            icon: service.iconClass,
            imageUrl: serviceImageMap[service.name] || '', // Get image from map, or empty string if not found
            inclusions: service.inclusions || [], // Ensure inclusions is an array, or empty if not present
            type: service.type, // This will be undefined based on current API data, but harmless for modal display
            benefits: service.benefits || [], // Ensure benefits is an array
        });
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    };

    // Handler to close the ServiceDetailModal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    // Handler for the "Book" button within ServiceDetailSection
    // This will open the ServiceDetailModal with the specific service's data
    const handleBookNowFromDetailSection = (serviceToOpenInModal) => {
        handleOpenModal(serviceToOpenInModal);
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
                {/* Hero Section for Services */}
                <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center text-center bg-cover bg-center mb-16 rounded-lg overflow-hidden shadow-xl"
                    style={{ backgroundImage: `url(${servicePageHero || 'https://images.unsplash.com/photo-1596753069176-597282b99527?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})` }} // Fallback image
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <motion.div
                        className="relative z-10 text-white p-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold mb-3">
                            Our Signature <span className="text-veniviciGold">Treatments</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                            Indulge in a wide array of specialized services designed for your ultimate well-being.
                        </p>
                    </motion.div>
                </section>

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
                    {loadingServices ? (
                        <p className="text-center text-veniviciDark text-lg">Loading services...</p>
                    ) : servicesError ? (
                        <p className="text-center text-red-600 text-lg">Error loading services: {servicesError}</p>
                    ) : servicesToShow.length === 0 ? (
                        <p className="text-center text-gray-700 text-lg">No services available at the moment.</p>
                    ) : (
                        <motion.div
                            variants={cardGridVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
                        >
                            {servicesToShow.map((service, index) => (
                                <ServiceCard
                                    key={service._id}
                                    service={{
                                        id: service._id,
                                        title: service.name,
                                        description: service.description,
                                        price: service.price ? `₦${service.price.toLocaleString()}` : 'N/A', // Formatted for display
                                        duration: service.duration,
                                        icon: service.iconClass,
                                        imageUrl: serviceImageMap[service.name] || '',
                                        inclusions: service.inclusions || [],
                                        type: service.type,
                                    }}
                                    index={index}
                                    onLearnMore={handleOpenModal} // Pass the modal open handler
                                />
                            ))}
                        </motion.div>
                    )}


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
                                        src={benefitsSpaImg || 'https://images.unsplash.com/photo-1544161511-b06227b4097f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} // Fallback image
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
                    <motion.h2
                        variants={headingVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mt-16 mb-12"
                    >
                        Explore Treatments in <span className="text-veniviciGreen">Detail</span>
                    </motion.h2>

                    {loadingServices ? (
                        <p className="text-center text-veniviciDark text-lg">Loading detailed sections...</p>
                    ) : servicesError ? (
                        <p className="text-center text-red-600 text-lg">Error loading detailed sections: {servicesError}</p>
                    ) : servicesToShow.length === 0 ? (
                        <p className="text-center text-gray-700 text-lg">No detailed service information available.</p>
                    ) : (
                        <>
                            {servicesToShow.map((service, index) => (
                                <ServiceDetailSection
                                    key={`detail-${service._id}`}
                                    service={{
                                        id: service._id,
                                        title: service.name,
                                        description: service.description,
                                        price: service.price ? `₦${service.price.toLocaleString()}` : 'N/A', // Formatted for display
                                        duration: service.duration,
                                        icon: service.iconClass,
                                        imageUrl: serviceImageMap[service.name] || '',
                                        inclusions: service.inclusions || [],
                                        type: service.type,
                                        benefits: service.benefits || [], // Pass benefits for the detail section
                                    }}
                                    index={index}
                                    onBookNow={handleBookNowFromDetailSection} // Pass the handler for the button inside ServiceDetailSection
                                />
                            ))}
                        </>
                    )}

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