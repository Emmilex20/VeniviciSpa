// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedButton from '../components/AnimatedButton';
import ServiceCard from '../components/ServiceCard';
// import TestimonialCard from '../components/TestimonialCard'; // TestimonialCard is used inside Testimonials component
import CountUpAnimation from '../components/CountUpAnimation';
import Testimonials from '../components/Testimonials'; // This is the component, not the data array

// Make sure you have these images or replace with actual paths
import heroBg from '../assets/images/hero-bg.jpg';
import aboutSpaImg from '../assets/images/about-spa.jpeg';
import facilitiesImg1 from '../assets/images/facilities-1.jpeg';
import facilitiesImg2 from '../assets/images/facilities-2.jpg';
import philosophyImg from '../assets/images/philosophyImg.jpeg';
import expertPlaceholder from '../assets/images/expertPlaceholder.jpg';

// Import the specific images for the service/offer cards
import idea1Img from '../assets/images/idea1.jpg'; // Uploaded image
import idae2Img from '../assets/images/idae 2.jpg'; // Uploaded image
import idae3Img from '../assets/images/idae 3.jpg'; // Uploaded image
import idea4Img from '../assets/images/idea4.jpg'; // Uploaded image
import idea5Img from '../assets/images/idea5.jpg'; // Uploaded image
import bodyScrub from '../assets/images/full-body-scrub.jpg'; // Uploaded image
import sport from '../assets/images/sport.webp'; // Uploaded image

// --- Local Image Mapping for Services on Homepage ---
// IMPORTANT: The keys here MUST EXACTLY MATCH the 'name' field of your services from the API.
const serviceImageMap = {
  "Post Surgery Rehabilitation": idae2Img, // Added placeholder image for this service
  "Relaxation Massage": expertPlaceholder,
  "Deep Tissue Massage": idae3Img,
  "Aromatherapy Facial": idea5Img,
  "Hot Stone Therapy": idea4Img,
  "Manicure & Pedicure": idea1Img,
  "Body Scrub & Wrap": bodyScrub,
  "Sports Massage": sport, // Added placeholder image for this service
  "Couple's Retreat": idae2Img, // Example for an 'offer' type (if you had this in your data)
  "Detox Package": idea4Img,    // Example for another 'offer' type (if you had this in your data)
  // Add more mappings as needed for your specific service names
};


// Framer Motion Variants for sections
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

// Framer Motion Variants for children elements (e.g., items in a grid or text blocks within a section)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Modal Variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Placeholder data for new sections (experts are still static for this update)
const experts = [
  { id: 1, name: 'Dr. Amina Yusuf', title: 'Lead Physiotherapist', bio: 'Specializing in sports injuries and post-operative rehabilitation.', img: expertPlaceholder },
  { id: 2, name: 'Grace Adekunle', title: 'Senior Massage Therapist', bio: 'Expert in deep tissue and aromatherapy, focusing on holistic relaxation.', img: expertPlaceholder },
  { id: 3, name: 'Chike Obi', title: 'Wellness Consultant', bio: 'Guiding clients through personalized wellness plans and nutritional advice.', img: expertPlaceholder },
];


const Home = () => {
  // State for fetched services and offers
  const [allServices, setAllServices] = useState([]); // Stores all fetched services/offers
  const [loadingServices, setLoadingServices] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  // --- REVISED FILTERING LOGIC ---
  // Since there's no 'type' field in the fetched data, we'll
  // display the first few services as 'featured' and the next few as 'offers'.
  // For a more robust solution, add a 'type' field (e.g., 'service', 'offer')
  // to your backend service data.
  const featuredServices = allServices.slice(0, 3); // Take the first 3 services
  const homepageOffers = allServices.slice(3, 6); // Take the next 3 services as "offers" (e.g., index 3, 4, 5)

  // REMOVED THIS LINE: const featuredTestimonials = Testimonials.slice(0, 3);
  // Testimonials component handles its own data, no need to slice it here.

  // State for the modal
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all services and offers when the component mounts
  useEffect(() => {
    console.log("Component mounted, starting fetch...");
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services'); // Fetch from your backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched raw service data:", data); // THIS IS IMPORTANT! Check this output.
        setAllServices(data); // Store all fetched data
      } catch (err) {
        setServicesError(err.message);
        console.error("Failed to fetch services:", err);
      } finally {
        setLoadingServices(false);
        console.log("Loading state set to false.");
      }
    };

    fetchServices();
  }, []); // Empty dependency array means this runs once on mount

  // These will re-run on every render, showing current filtered arrays
  console.log("Current allServices state (after fetch):", allServices);
  console.log("Featured services (after slice):", featuredServices);
  console.log("Homepage offers (after slice):", homepageOffers);

  // handleLearnMore function now receives the full service object as fetched
  const handleLearnMore = (service) => {
    console.log("Service selected for modal:", service); // Check this when clicking "Learn More"
    setSelectedService({
      id: service._id,
      title: service.name,
      description: service.description,
      price: service.price.toLocaleString(), // Format price for display
      duration: service.duration, // Assuming duration exists in your fetched service data
      inclusions: service.inclusions || [], // Assuming inclusions is an array or undefined
      imageUrl: serviceImageMap[service.name] || '', // Get image from map
      type: service.type, // This will be undefined, but harmless for modal display
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <Helmet>
        <title>Venivici Spa - Luxury Health Club & Urban Spa in Lekki, Lagos</title>
        <meta name="description" content="Experience unparalleled wellness and luxurious treatments at Venivici Health Club & Urban Spa. Rejuvenate your mind, body, and soul in Lekki, Lagos." />
        <meta property="og:title" content="Venivici Spa - Luxury Health & Urban Spa" />
        <meta property="og:description" content="Escape. Rejuvenate. Rediscover You. Experience unparalleled wellness and luxurious treatments in Lekki, Lagos." />
        <meta property="og:image" content="https://venivici.com/images/hero-social.jpg" />
        <meta property="og:url" content="https://venivici.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="pt-[72px] sm:pt-[80px] md:pt-[96px]">

        {/* --- Hero Section --- */}
        <section
          className="relative h-screen min-h-[500px] flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
          <motion.div
            className="relative z-10 text-white p-6 sm:p-8 md:p-10 max-w-5xl mx-auto pt-[72px] sm:pt-[80px] md:pt-[96px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif font-extrabold leading-tight mb-4 drop-shadow-lg">
              Escape. Rejuvenate. <span className="text-veniviciGreen">Rediscover You.</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl mb-10 font-light max-w-3xl mx-auto drop-shadow-md">
              Experience unparalleled wellness and luxurious treatments at <strong>Venivici Health Club & Urban Spa</strong> in Lekki, Lagos. Your journey to holistic well-being begins here.
            </p>
            <AnimatedButton to="/booking" className="inline-block px-8 py-4 text-xl">Book Your Session</AnimatedButton>
          </motion.div>
        </section>

        {/* --- About Us Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 container mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div className="text-center md:text-left">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark mb-6 leading-tight"
                variants={itemVariants}
              >
                Your Sanctuary for <span className="text-veniviciGreen">Wellness & Serenity</span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 lg:text-xl"
                variants={itemVariants}
              >
                Nestled in the heart of Lekki Phase 1, Venivici Health Club & Urban Spa is dedicated to providing an oasis of calm and rejuvenation. We blend traditional therapies with modern wellness techniques to offer a holistic experience for <strong>mind, body, and soul</strong>.
              </motion.p>
              <motion.p
                className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 lg:text-xl"
                variants={itemVariants}
              >
                From revitalizing colonic hydrotherapy to luxurious full body massages and detoxifying steam baths, our skilled therapists are committed to your well-being. Discover your path to ultimate relaxation and health with us.
              </motion.p>
              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <AnimatedButton to="/about">Learn More About Us</AnimatedButton>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={aboutSpaImg}
                alt="Venivici Spa serene interior"
                className="w-full h-80 md:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-veniviciGreen opacity-20 rounded-full mix-blend-multiply filter blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-veniviciGold opacity-20 rounded-full mix-blend-multiply filter blur-xl"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Our Philosophy Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciLightGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={philosophyImg}
                alt="Venivici Spa holistic approach"
                className="w-full h-80 md:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-veniviciGreen/10 backdrop-brightness-75"></div>
            </motion.div>
            <motion.div className="text-center md:text-left">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark mb-6 leading-tight"
                variants={itemVariants}
              >
                Our Guiding <span className="text-veniviciGreen">Philosophy</span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 lg:text-xl"
                variants={itemVariants}
              >
                At Venivici, our philosophy is rooted in the belief that true wellness is a harmonious balance of the <strong>mind, body, and spirit</strong>. We advocate for a holistic approach, integrating ancient healing practices with modern therapeutic advancements.
              </motion.p>
              <motion.p
                className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 lg:text-xl"
                variants={itemVariants}
              >
                We are committed to empowering our clients to achieve optimal health and inner peace, providing a personalized journey towards enduring vitality and a profound sense of well-being.
              </motion.p>
              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <AnimatedButton to="/about">Our Mission & Values</AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Why Choose Us Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Why Choose <span className="text-veniviciGreen">Venivici Spa?</span>
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Holistic Well-being</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                We focus on integrating physical, mental, and spiritual health to offer a truly complete wellness journey.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Expert Therapists</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Our team comprises highly trained and experienced professionals dedicated to providing exceptional care.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-spa"></i>
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Serene Environment</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Step into a tranquil oasis designed to melt away stress and inspire deep relaxation.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-tags"></i>
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Tailored Experiences</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                We offer personalized treatments to meet your unique needs and preferences for optimal results.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-award"></i>
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Proven Results</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Clients consistently praise our effective treatments and the profound sense of well-being they achieve.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-certificate"></i>
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Certified & Safe</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Adhering to the highest standards of safety and hygiene for your peace of mind.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Spa Facilities Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 container mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Our State-of-the-Art <span className="text-veniviciGreen">Facilities</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Step into our meticulously designed space, where every detail is crafted to enhance your relaxation and wellness journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
            >
              <img src={facilitiesImg1} alt="Spa Treatment Room" className="w-full h-64 object-cover rounded-lg shadow-md" />
              <img src={facilitiesImg2} alt="Relaxation Lounge" className="w-full h-64 object-cover rounded-lg shadow-md sm:mt-8 lg:mt-16" />
            </motion.div>
            <motion.div
              className="text-center md:text-left"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                },
                mdVisible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
              initial="hidden"
              whileInView={["visible", "mdVisible"]}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-veniviciDark mb-4">Designed for Your Ultimate Comfort</h3>
              <ul className="text-base text-gray-700 space-y-3 list-none pl-0">
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-check-circle text-veniviciGreen mr-3"></i>
                  <span>Luxurious Private Treatment Rooms</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-check-circle text-veniviciGreen mr-3"></i>
                  <span>Invigorating Steam & Sauna Facilities</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-check-circle text-veniviciGreen mr-3"></i>
                  <span>Serene Relaxation Lounges</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-check-circle text-veniviciGreen mr-3"></i>
                  <span>Modern Hydrotherapy Suites</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-check-circle text-veniviciGreen mr-3"></i>
                  <span>Dedicated Consultation Areas</span>
                </li>
              </ul>
              <div className="mt-8 text-center md:text-left">
                <AnimatedButton to="/gallery">Explore Our Gallery</AnimatedButton>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Meet Our Experts Section (New) --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciLightGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Meet Our <span className="text-veniviciGreen">Wellness Experts</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Our team of highly skilled and compassionate professionals is dedicated to guiding you on your wellness journey.
          </p>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <motion.div
                key={expert.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden p-6 text-center"
                variants={itemVariants}
                initial="hidden" // Ensure initial state is applied
                whileInView="visible" // Ensure it tries to become visible
                viewport={{ once: true, amount: 0.1 }} 
              >
                <img
                  src={expertPlaceholder} // Using placeholder for now
                  alt={expert.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-veniviciGreen shadow-md"
                />
                <h3 className="text-xl font-semibold text-veniviciDark mb-2">{expert.name}</h3>
                <p className="text-veniviciGreen text-md font-medium mb-3">{expert.title}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{expert.bio}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <AnimatedButton to="/about">View All Team Members</AnimatedButton>
          </motion.div>
        </motion.section>

        {/* --- Featured Services Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Our Signature <span className="text-veniviciGreen">Treatments & Services</span>
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              // Pass the handleLearnMore function as onLearnMore prop
              <ServiceCard key={service.id} service={service} index={index} onLearnMore={handleLearnMore} variants={itemVariants} 
              initial="hidden" // Pass initial and whileInView to ServiceCard
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              />
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <AnimatedButton to="/services">View All Services</AnimatedButton>
          </motion.div>
        </motion.section>

        {/* --- Special Offers & Packages Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciLightGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Exclusive <span className="text-veniviciGreen">Offers & Packages</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover our specially curated packages designed to give you the ultimate wellness experience at exceptional value.
          </p>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homepageOffers.map((offer) => (
              <motion.div
                key={offer.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden p-6 text-center border-t-4 border-veniviciGold hover:shadow-2xl transition-shadow duration-300"
                variants={itemVariants}
                initial="hidden" // Ensure initial state is applied
                whileInView="visible" // Ensure it tries to become visible
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Display image for offers on homepage as well */}
                {offer.imageUrl && (
                  <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover rounded-md mb-4" />
                )}
                <div className="text-veniviciGreen text-5xl mb-4">
                  <i className={offer.icon}></i>
                </div>
                <h3 className="text-2xl font-semibold text-veniviciDark mb-2">{offer.title}</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow">{offer.description}</p>
                <div className="text-veniviciGold text-2xl font-bold mb-4">{offer.price}</div>
                <Link to="/booking" className="inline-block bg-veniviciGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Consider linking to a dedicated offers page, or filter on booking page */}
            <AnimatedButton to="/services" className="bg-transparent border-2 border-veniviciGreen text-veniviciGreen hover:bg-veniviciGreen hover:text-white">See All Offers</AnimatedButton>
          </motion.div>
        </motion.section>

        {/* --- Meet Our Experts Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciLightGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Meet Our <span className="text-veniviciGreen">Wellness Experts</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                initial="hidden" // Ensure initial state is applied
                whileInView="visible" // Ensure it tries to become visible
                viewport={{ once: true, amount: 0.1 }}
              />
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <AnimatedButton to="/about">View All Team Members</AnimatedButton>
          </motion.div>
        </motion.section>

        {/* --- Quick Facts / Achievements Section (Now with Count-Up Animation!) --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-gradient-to-r from-veniviciGreen to-[#5cb85c] text-white text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-12">
            Venivici by the <span className="text-veniviciGold">Numbers</span>
          </h2>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div className="flex flex-col items-center" variants={itemVariants}
            initial="hidden" // Ensure initial state is applied
            whileInView="visible" // Ensure it tries to become visible
            viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-veniviciGold text-6xl font-bold mb-2">
                <CountUpAnimation value={5} suffix="+" />
              </div>
              <p className="text-xl font-semibold">Years of Experience</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}
            initial="hidden" // Ensure initial state is applied
            whileInView="visible" // Ensure it tries to become visible
            viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-veniviciGold text-6xl font-bold mb-2">
                <CountUpAnimation value={1000} suffix="+" />
              </div>
              <p className="text-xl font-semibold">Happy Clients</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}
            initial="hidden" // Ensure initial state is applied
            whileInView="visible" // Ensure it tries to become visible
            viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-veniviciGold text-6xl font-bold mb-2">
                <CountUpAnimation value={15} suffix="+" />
              </div>
              <p className="text-xl font-semibold">Specialized Services</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}
            initial="hidden" // Ensure initial state is applied
            whileInView="visible" // Ensure it tries to become visible
            viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-veniviciGold text-6xl font-bold mb-2">
                <CountUpAnimation value={98} suffix="%" />
              </div>
              <p className="text-xl font-semibold">Client Satisfaction</p>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Integrated Contact & Location Snippet --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciLightGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div className="text-center md:text-left" variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark mb-6 leading-tight">
                Visit Us in <span className="text-veniviciGreen">Lekki, Lagos</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 lg:text-xl">
                We're conveniently located to serve you. Step into our serene environment and begin your journey to ultimate well-being.
              </p>
              <div className="space-y-4 text-left inline-block">
                <p className="flex items-center text-gray-800 text-lg">
                  <i className="fas fa-map-marker-alt text-veniviciGreen mr-3"></i>
                  <span>10 Freedom Way, Lekki Phase 1, Lagos, Nigeria</span>
                </p>
                <p className="flex items-center text-gray-800 text-lg">
                  <i className="fas fa-phone-alt text-veniviciGreen mr-3"></i>
                  <span>+234 809 123 4567</span>
                </p>
                <p className="flex items-center text-gray-800 text-lg">
                  <i className="fas fa-envelope text-veniviciGreen mr-3"></i>
                  <span>info@venivici.com</span>
                </p>
                <p className="flex items-center text-gray-800 text-lg">
                  <i className="fas fa-clock text-veniviciGreen mr-3"></i>
                  <span>Mon - Fri: 9:00 AM - 7:00 PM | Sat: 10:00 AM - 6:00 PM</span>
                </p>
              </div>
              <motion.div className="mt-8 text-center md:text-left" variants={itemVariants}>
                <AnimatedButton to="/contact">Get Directions & Contact</AnimatedButton>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-2xl h-80 md:h-[450px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d253733.28314282544!2d3.1867754!3d6.4476067!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5300795e6e7%3A0xd1d3aaf540997ea3!2sVenivici%20Health%20Club%20and%20Urban%20Spa!5e0!3m2!1sen!2sng!4v1753809835619!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venivici Spa Location"
                className="rounded-lg"
              ></iframe>
            </motion.div>
          </div>
        </motion.section>

         {/* Testimonials Section - ADDED BACK */}
        <Testimonials />


        {/* --- Final Call to Action Section --- */}
        <motion.section
          className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 bg-gradient-to-r from-veniviciGreen to-[#5cb85c] text-white text-center shadow-inner"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Ready to <span className="text-veniviciGold">Rejuvenate?</span>
          </h2>
          <p className="text-lg sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards ultimate relaxation and holistic well-being. Book your personalized session today and experience the Venivici difference.
          </p>
          <AnimatedButton
            to="/booking"
            className="bg-veniviciGold text-veniviciDark px-10 py-4 text-xl hover:bg-white hover:text-veniviciDark shadow-lg"
          >
            Book Your Appointment Now
          </AnimatedButton>
        </motion.section>

      </div>

      {/* Service/Treatment Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative p-6 sm:p-8"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl leading-none"
                aria-label="Close modal"
              >
                ×
              </button>
              <h3 className="text-3xl font-serif text-veniviciDark mb-4 border-b pb-2">
                {selectedService.title}
              </h3>
              {selectedService.imageUrl && (
                <img
                  src={selectedService.imageUrl}
                  alt={selectedService.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {selectedService.description}
              </p>

              {/* Display inclusions if available (formerly details/benefits) */}
              {selectedService.inclusions && selectedService.inclusions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-veniviciDark mb-2">
                    {/* Since 'type' is undefined, this will default to 'Package Includes:' */}
                    {selectedService.type === 'service' ? 'Benefits:' : 'Package Includes:'}
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedService.inclusions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.duration && (
                <p className="text-lg text-gray-600 mb-2">
                  <span className="font-semibold">Duration:</span> {selectedService.duration}
                </p>
              )}

              {selectedService.price && (
                <p className="text-lg font-bold text-veniviciGreen mb-4">
                  Price: N{selectedService.price}
                </p>
              )}
              <div className="mt-6 text-center">
                <AnimatedButton to="/booking" className="inline-block px-6 py-3 text-lg">
                  Book This Treatment
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;