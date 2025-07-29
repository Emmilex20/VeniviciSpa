// src/pages/Contact.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

// Import a relevant image for the hero section
import contactHeroImg from '../assets/images/contact-hero.jpg'; // Ensure this image exists
import servicesOverviewImg from '../assets/images/services-overview.jpg'; // Another image for an additional section

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' }); // Added 'subject' field
  const [isSending, setIsSending] = useState(false);

  // REPLACE WITH YOUR ACTUAL EMAILJS CREDENTIALS (Already provided, good job!)
  const EMAILJS_SERVICE_ID = 'service_1kkznwc';
  const EMAILJS_TEMPLATE_ID_CONTACT = 'template_rxephjg'; // Ensure this template matches your new form fields
  const EMAILJS_PUBLIC_KEY = 'Kriqr1chygzcxq16B';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setFormSubmitted(false);
    setSubmitError(false);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject, // Include subject
      message: formData.message,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CONTACT, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear subject too
        setTimeout(() => setFormSubmitted(false), 7000); // Give user more time to read success
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 7000); // Give user more time to read error
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  // Framer Motion Variants
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

  return (
    <>
      <Helmet>
        <title>Contact Us - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Connect with Venivici Health Club & Urban Spa in Lekki, Lagos. Find our location, hours, phone number, and send us a message. Your path to wellness begins here." />
        <meta property="og:title" content="Venivici Spa - Contact Us & Book Your Wellness Journey" />
        <meta property="og:description" content="Reach out to Venivici for inquiries, appointments, or feedback. We're here to assist you." />
        <meta property="og:image" content="https://venivici.com/images/contact-social.jpg" /> {/* Ensure this image exists for social sharing */}
        <meta property="og:url" content="https://venivici.com/contact" />
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 bg-veniviciLightGray min-h-screen"
      >
        {/* Hero Section with Enhanced Text */}
        <div
          // Adjusted height: now slightly taller on mobile (h-[380px]) to ensure text visibility
          // Also adjusted flex properties to better center content vertically on smaller screens
          className="relative h-[380px] sm:h-[450px] lg:h-[550px] flex flex-col justify-center items-center text-white text-center px-4 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${contactHeroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div variants={sectionVariants} className="relative z-10 max-w-4xl mx-auto py-8"> {/* Added vertical padding */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight mb-4 animate-fadeInUp">
              Your Journey to Wellness Starts Here
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-90 animate-fadeInUp delay-1s">
              Whether you're ready to book an experience, have a question about our treatments, or simply want to learn more, <strong>we're here to listen.</strong>
            </p>
          </motion.div>
        </div>

        <div
          // Adjusted negative margin for the pull-up effect.
          // Less aggressive on 'sm' and 'md' to prevent text overlap.
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[-60px] sm:mt-[-80px] lg:mt-[-150px] relative z-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-2xl p-8 md:p-12">
            {/* Contact Info */}
            <motion.div variants={sectionVariants} className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl sm:text-4xl font-serif text-veniviciGreen mb-6 leading-tight">Reach Out to Us</h2>
                <p className="text-lg text-gray-700 mb-8">
                  We're dedicated to providing exceptional service. Find our details below or send us a direct message.
                </p>
                <div className="space-y-6 text-lg text-gray-700">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-veniviciGreen mr-4 mt-1 text-2xl"></i>
                    <p>
                      <strong className="text-veniviciDark">Our Sanctuary:</strong><br />
                      Plot 6 Block 1, 69A Admiralty Way,<br />Lekki Phase 1, Lagos, Nigeria
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-veniviciGreen mr-4 text-2xl"></i>
                    <p>
                      <strong className="text-veniviciDark">Call Us:</strong>{' '}
                      <a href="tel:+2348099990036" className="text-blue-600 hover:underline transition-colors">0809 999 0036</a>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-veniviciGreen mr-4 text-2xl"></i>
                    <p>
                      <strong className="text-veniviciDark">Email Us:</strong>{' '}
                      <a href="mailto:info@venivici.com" className="text-blue-600 hover:underline transition-colors">info@venivici.com</a>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-veniviciGreen mr-4 text-2xl"></i>
                    <p>
                      <strong className="text-veniviciDark">Operating Hours:</strong>{' '}
                      <br />Mon-Sat: 9:00 AM - 7:00 PM <br /> Sunday: 12:00 PM - 6:00 PM
                    </p>
                  </div>
                </div>

                {/* Social Media Links */}
                <h3 className="text-2xl font-serif text-veniviciDark mt-10 mb-5">Connect with Our Community</h3>
                <div className="flex space-x-6 text-3xl">
                  {/* IMPORTANT: Replace with actual Venivici social links */}
                  <a href="https://www.facebook.com/VeniviciHealthClub" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-veniviciGreen transition duration-300" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com/venivicihealthclub/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-veniviciGreen transition duration-300" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="https://twitter.com/VeniviciClub" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-veniviciGreen transition duration-300" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="https://wa.me/2348099990036" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-veniviciGreen transition duration-300" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>

              {/* Google Map Embedding */}
              <motion.div variants={itemFadeIn} className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-xl mt-10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d253733.28314282544!2d3.1867754!3d6.4476067!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5300795e6e7%3A0xd1d3aaf540997ea3!2sVenivici%20Health%20Club%20and%20Urban%20Spa!5e0!3m2!1sen!2sng!4v1753772734705!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venivici Spa Location"
                ></iframe>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={sectionVariants} className="bg-white p-6 rounded-xl">
              <h2 className="text-3xl sm:text-4xl font-serif text-veniviciDark mb-6 leading-tight">Send Us a Message</h2>
              <p className="text-lg text-gray-700 mb-8">
                Fill out the form below, and our team will get back to you promptly.
              </p>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-sm"
                  role="alert"
                >
                  <p className="font-bold">Message Sent!</p>
                  <p>Your inquiry has been successfully received. We'll get back to you within 24-48 hours. Thank you for reaching out!</p>
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-sm"
                  role="alert"
                >
                  <p className="font-bold">Error!</p>
                  <p>Failed to send your message. Please ensure all fields are correct and try again, or contact us directly at <a href="mailto:info@venivici.com" className="underline">info@venivici.com</a>.</p>
                </motion.div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-base font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-veniviciGreen focus:border-transparent transition-all duration-200 text-gray-800 text-lg"
                    required
                    aria-label="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-base font-semibold mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-veniviciGreen focus:border-transparent transition-all duration-200 text-gray-800 text-lg"
                    required
                    aria-label="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 text-base font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-veniviciGreen focus:border-transparent transition-all duration-200 text-gray-800 text-lg"
                    required
                    aria-label="Subject of your message"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-base font-semibold mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-veniviciGreen focus:border-transparent transition-all duration-200 resize-y text-gray-800 text-lg"
                    required
                    aria-label="Your Message"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className={`w-full bg-veniviciGreen text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md
                             hover:bg-opacity-90 transition-all duration-300
                             ${isSending ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:scale-105'}`}
                  whileHover={{ scale: isSending ? 1 : 1.02 }}
                  whileTap={{ scale: isSending ? 1 : 0.98 }}
                  disabled={isSending}
                  aria-label={isSending ? "Sending message..." : "Send Message"}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-3"></i> Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        ---

        {/* Explore Our Services Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="bg-gradient-to-br from-veniviciDark to-veniviciGreen text-white rounded-xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 leading-tight">
                Not Sure What You Need?
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-6">
                Explore our full range of bespoke spa treatments and health club services. Let us help you discover the perfect path to relaxation and rejuvenation.
              </p>
              <motion.a
                href="/services"
                className="inline-block bg-white text-veniviciDark px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                           hover:bg-gray-100 hover:shadow-xl transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Services <i className="fas fa-arrow-right ml-2"></i>
              </motion.a>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <motion.img
                src={servicesOverviewImg} // Use a relevant image for services
                alt="Overview of Venivici Services"
                className="rounded-lg shadow-xl w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Contact;