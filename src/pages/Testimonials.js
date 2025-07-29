// src/pages/Testimonials.js
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// You might want a specific hero image for testimonials
import testimonialsHeroImg from '../assets/images/testimonials-hero.webp'; // Make sure this image exists
// And maybe an image for the call-to-action section
import ctaImage from '../assets/images/cta-wellness.jpg'; // Example CTA image

const testimonialsData = [
  {
    id: 1,
    name: 'Chioma Okoro',
    location: 'Lekki, Lagos',
    rating: 5,
    quote: "Venivici is my sanctuary! From the moment you step in, you're enveloped in tranquility. The deep tissue massage was heavenly, and the staff are incredibly professional and attentive. I always leave feeling completely re-energized and refreshed.",
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg', // Replace with real avatars or use a placeholder
  },
  {
    id: 2,
    name: 'Kunle Adebayo',
    location: 'Victoria Island, Lagos',
    rating: 5,
    quote: "As a busy entrepreneur, finding time for self-care is crucial. Venivici's health club facilities are top-notch, and their personal trainers are truly dedicated. It's more than just a gym; it's a holistic wellness experience that helps me stay at my peak.",
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 3,
    name: 'Fatima Bello',
    location: 'Ikoyi, Lagos',
    rating: 4,
    quote: "I've tried many spas, but Venivici stands out. Their facial treatments are exceptional – my skin has never looked better! While it's a bit pricey, the quality of service and products makes it absolutely worth it. Highly recommend for a luxurious treat.",
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    name: 'Emeka Nnamdi',
    location: 'Ajah, Lagos',
    rating: 5,
    quote: "The atmosphere at Venivici is incredibly serene. I particularly enjoy the hydrotherapy pool after a long week. The staff remember your preferences, which adds a personal touch. A truly relaxing escape right here in Lagos.",
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 5,
    name: 'Aisha Lawal',
    location: 'Surulere, Lagos',
    rating: 5,
    quote: "I hosted a bridal spa day here, and it was perfect! The team at Venivici went above and beyond to make it special for us. Every detail was catered to, and all my bridesmaids loved their treatments. Fantastic service!",
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 6,
    name: 'David Oladipo',
    location: 'Yaba, Lagos',
    rating: 4,
    quote: "Great facilities and friendly staff. The steam room and sauna are always clean. My only suggestion would be to perhaps offer more variety in the healthy cafe options, but overall, it's an excellent place for fitness and relaxation.",
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
];

// Framer Motion Variants (re-using patterns from Contact.js)
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title>Client Testimonials - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Read what our satisfied clients say about their experience at Venivici Health Club & Urban Spa in Lekki, Lagos. Discover why we're Lagos's premier wellness destination." />
        <meta property="og:title" content="Venivici Spa - Our Client Success Stories" />
        <meta property="og:description" content="Hear directly from our clients about their transformative wellness journeys." />
        <meta property="og:image" content="https://venivici.com/images/testimonials-social.jpg" /> {/* Replace with a relevant image for social sharing */}
        <meta property="og:url" content="https://venivici.com/testimonials" />
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 bg-veniviciLightGray min-h-screen"
      >
        {/* Hero Section */}
        <div
          className="relative h-[380px] sm:h-[450px] lg:h-[550px] flex flex-col justify-center items-center text-white text-center px-4 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${testimonialsHeroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div variants={sectionVariants} className="relative z-10 max-w-4xl mx-auto py-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-4">
              What Our Clients Say
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-90">
              Hear directly from those who have experienced the Venivici difference – their journeys, their relaxation, their wellness transformed.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-veniviciDark text-center mb-12">
            Authentic Experiences, Real Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemFadeIn}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-veniviciGreen"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-veniviciDark">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex text-veniviciGreen mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < testimonial.rating ? '' : 'text-gray-300'}`}></i>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed flex-grow">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action: Experience Venivici */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div
            className="bg-gradient-to-br from-veniviciGreen to-veniviciDark text-white rounded-xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-center gap-8"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${ctaImage})`, // Overlay and image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 leading-tight">
                Ready for Your Own Transformation?
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-6">
                Join our growing family of happy clients. Book your first appointment and discover a new you.
              </p>
              <motion.a
                href="/contact" // Link to your contact/booking page
                className="inline-block bg-white text-veniviciDark px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                           hover:bg-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Experience <i className="fas fa-calendar-alt ml-2"></i>
              </motion.a>
            </div>
            {/* The CTA image is now integrated into the background style property */}
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Testimonials;