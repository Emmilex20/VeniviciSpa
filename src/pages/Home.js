// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedButton from '../components/AnimatedButton';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard'; // Import the TestimonialCard component
import { services } from '../data/servicesData';
import { testimonials } from '../data/testimonialsData'; // Correct import for testimonials data

// Import images
import heroBg from '../assets/images/hero-bg.jpg';
import aboutSpaImg from '../assets/images/about-spa.jpeg';
import facilitiesImg1 from '../assets/images/facilities-1.jpeg';
import facilitiesImg2 from '../assets/images/facilities-2.jpg';

// Framer Motion Variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // Slightly reduced duration for snappier appearance
      ease: "easeOut", // Standard easing
      staggerChildren: 0.15, // STAGGER CHILDREN HERE
    }
  },
};

// Framer Motion Variants for children elements (e.g., items in a grid or text blocks within a section)
const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Slightly more pronounced initial y
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  // Get the first 3 services to feature on the homepage
  const featuredServices = services.slice(0, 3);
  // Get the first 3 testimonials (or adjust as needed)
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Venivici Spa - Luxury Health Club & Urban Spa in Lekki, Lagos</title>
        <meta name="description" content="Experience unparalleled wellness and luxurious treatments at Venivici Health Club & Urban Spa. Rejuvenate your mind, body, and soul in Lekki, Lagos." />
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Venivici Spa - Luxury Health & Urban Spa" />
        <meta property="og:description" content="Escape. Rejuvenate. Rediscover You. Experience unparalleled wellness and luxurious treatments in Lekki, Lagos." />
        {/* IMPORTANT: Replace with an actual high-quality image URL for social sharing */}
        <meta property="og:image" content="https://venivici.com/images/hero-social.jpg" />
        {/* IMPORTANT: Replace with your actual website URL */}
        <meta property="og:url" content="https://venivici.com/" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Padding top to account for fixed Navbar.
            These values should align with your Navbar's actual height.
            Current values (72px, 80px, 96px) seem appropriate based on a typical Navbar height with a logo.
      */}
      <div className="pt-[72px] sm:pt-[80px] md:pt-[96px]">

        {/* --- Hero Section --- */}
        <section
          className="relative h-screen min-h-[500px] flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div> {/* Enhanced Overlay */}
          <motion.div
            className="relative z-10 text-white p-6 sm:p-8 md:p-10 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            {/* Adjusted H1 font size for smaller screens for better fit */}
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
            <motion.div className="text-center md:text-left"> {/* This div is a direct child for staggerChildren */}
              {/* Adjusted H2 font size for smaller screens */}
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
              {/* Subtle decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-veniviciGreen opacity-20 rounded-full mix-blend-multiply filter blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-veniviciGold opacity-20 rounded-full mix-blend-multiply filter blur-xl"></div>
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
          {/* Adjusted H2 font size for smaller screens */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Why Choose <span className="text-veniviciGreen">Venivici Spa?</span>
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Removed individual transition/delay, relying on sectionVariants stagger */}
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
              // viewport and transition are now handled by parent sectionVariants and itemVariants
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-hand-holding-heart"></i> {/* Icon: Holistic Approach */}
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Holistic Well-being</h3>
              <p className="text-gray-700 text-base leading-relaxed"> {/* Adjusted font size for smaller screens */}
                We focus on integrating physical, mental, and spiritual health to offer a truly complete wellness journey.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-star"></i> {/* Icon: Expert Therapists */}
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Expert Therapists</h3>
              <p className="text-gray-700 text-base leading-relaxed"> {/* Adjusted font size for smaller screens */}
                Our team comprises highly trained and experienced professionals dedicated to providing exceptional care.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-spa"></i> {/* Icon: Serene Environment */}
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Serene Environment</h3>
              <p className="text-gray-700 text-base leading-relaxed"> {/* Adjusted font size for smaller screens */}
                Step into a tranquil oasis designed to melt away stress and inspire deep relaxation.
              </p>
            </motion.div>
            {/* Feature 4 (Optional, if you want more points) */}
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-tags"></i> {/* Icon: Tailored Experiences */}
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Tailored Experiences</h3>
              <p className="text-gray-700 text-base leading-relaxed"> {/* Adjusted font size for smaller screens */}
                We offer personalized treatments to meet your unique needs and preferences for optimal results.
              </p>
            </motion.div>
            {/* Feature 5 (Optional) */}
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center"
              variants={itemVariants}
            >
              <div className="text-veniviciGreen text-5xl mb-4">
                <i className="fas fa-award"></i> {/* Icon: Proven Results */}
              </div>
              <h3 className="text-2xl font-semibold text-veniviciDark mb-3">Proven Results</h3>
              <p className="text-gray-700 text-base leading-relaxed"> {/* Adjusted font size for smaller screens */}
                Clients consistently praise our effective treatments and the profound sense of well-being they achieve.
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
          {/* Adjusted H2 font size for smaller screens */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Our State-of-the-Art <span className="text-veniviciGreen">Facilities</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed"> {/* Adjusted font size */}
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
            {/* **ADJUSTED BLOCK FOR MOBILE-FRIENDLY ANIMATION** */}
            <motion.div
              className="text-center md:text-left"
              variants={{
                // Base state for hidden
                hidden: { opacity: 0, y: 50 },
                // Default 'visible' state (for mobile, and initial state for larger screens)
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                },
                // Specific 'md' breakpoint visible state (adds x-axis animation)
                mdVisible: {
                  opacity: 1,
                  x: 0, // Slide from right
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
              initial="hidden"
              // For small screens, it will animate to 'visible' (fade-up).
              // For md and larger, it will also consider 'mdVisible'
              whileInView={["visible", "mdVisible"]}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-veniviciDark mb-4">Designed for Your Ultimate Comfort</h3> {/* Adjusted H3 size */}
              <ul className="text-base text-gray-700 space-y-3 list-none pl-0"> {/* Adjusted font size */}
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

        {/* --- Featured Services Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 bg-veniviciGray"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Adjusted H2 font size for smaller screens */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            Our Signature <span className="text-veniviciGreen">Treatments & Services</span>
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ServiceCard itself now uses itemVariants due to sectionVariants' staggerChildren */}
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
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

        {/* --- Testimonials Section --- */}
        <motion.section
          className="py-16 px-6 sm:px-8 md:px-12 lg:px-16 container mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Adjusted H2 font size for smaller screens */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark text-center mb-12">
            What Our Clients <span className="text-veniviciGreen">Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard // Use the dedicated TestimonialCard component
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
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
            <AnimatedButton to="/testimonials" className="bg-transparent border-2 border-veniviciGreen text-veniviciGreen hover:bg-veniviciGreen hover:text-white">Read All Testimonials</AnimatedButton>
          </motion.div>
        </motion.section>

        {/* --- Final Call to Action Section --- */}
        <motion.section
          className="py-20 px-6 sm:px-8 md:px-12 lg:px-16 bg-gradient-to-r from-veniviciGreen to-[#5cb85c] text-white text-center shadow-inner"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Adjusted H2 font size for smaller screens */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6">
            Ready to <span className="text-veniviciGold">Rejuvenate?</span>
          </h2>
          <p className="text-lg sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"> {/* Adjusted font size */}
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
    </>
  );
};

export default Home;