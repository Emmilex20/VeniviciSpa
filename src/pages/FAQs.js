// src/pages/FAQs.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'; // <--- ADD THIS LINE

import genericHeroImg from '../assets/images/contact-hero.jpg'; // Re-using image

const faqData = [
  {
    id: 1,
    question: 'What types of services does Venivici Health Club & Urban Spa offer?',
    answer: 'We offer a comprehensive range of services including various massage therapies (deep tissue, Swedish, hot stone), facials, body treatments, manicures & pedicures, hydrotherapy, and a state-of-the-art health club with fitness classes, personal training, and a swimming pool.',
  },
  {
    id: 2,
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment directly through our website via the "Booking" page, by calling us at 0809 999 0036, or by visiting our reception desk in Lekki Phase 1.',
  },
  {
    id: 3,
    question: 'What are your operating hours?',
    answer: 'Our spa and health club are open Monday to Saturday from 9:00 AM to 7:00 PM, and on Sundays from 12:00 PM to 6:00 PM.',
  },
  {
    id: 4,
    question: 'Do you offer gift vouchers?',
    answer: 'Yes, we offer beautifully presented gift vouchers for all our services and monetary values. They make the perfect gift for loved ones to experience wellness.',
  },
  {
    id: 5,
    question: 'What should I do if I need to cancel or reschedule?',
    answer: 'We kindly request at least 24 hours notice for cancellations or rescheduling. Cancellations made less than 24 hours in advance may incur a charge. Please refer to our Terms & Conditions for full details.',
  },
  {
    id: 6,
    question: 'Are there membership options for the health club?',
    answer: 'Yes, we offer various membership packages for our health club, including individual, couple, and corporate options, with different durations. Please inquire at our reception or check the "Services" section for more details.',
  },
  {
    id: 7,
    question: 'Do you cater to specific health conditions or allergies?',
    answer: 'Absolutely. Please inform our staff about any health conditions, allergies, or special requirements when booking or upon arrival. Our therapists are trained to adapt treatments where possible or advise on suitable alternatives.',
  },
  {
    id: 8,
    question: 'Is parking available at your location?',
    answer: 'Yes, we have ample and secure parking available for our clients at our Lekki Phase 1 facility.',
  },
];

const FAQs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
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

  // itemFadeIn is now used in the map
  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <>
      <Helmet>
        <title>FAQs - Frequently Asked Questions | Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Find answers to frequently asked questions about Venivici Health Club & Urban Spa's services, booking, and facilities in Lekki, Lagos." />
        <meta property="og:title" content="Venivici Spa - FAQs" />
        <meta property="og:description" content="Quick answers to common questions about Venivici's offerings." />
        <meta property="og:url" content="https://venivici.com/faqs" />
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 bg-veniviciLightGray min-h-screen"
      >
        {/* Hero Section */}
        <div
          className="relative h-[250px] sm:h-[300px] lg:h-[350px] flex flex-col justify-center items-center text-white text-center px-4 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${genericHeroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div variants={sectionVariants} className="relative z-10 max-w-4xl mx-auto py-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Your questions, answered.
            </p>
          </motion.div>
        </div>

        {/* Content Section - FAQ Accordion */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 bg-white rounded-lg shadow-xl p-8 md:p-12"
        >
          <motion.h2 variants={itemFadeIn} className="text-3xl sm:text-4xl font-serif text-veniviciDark text-center mb-10">
            Common Questions
          </motion.h2>
          <div className="space-y-4">
            {faqData.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemFadeIn} // <--- itemFadeIn applied here
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  className="w-full text-left p-5 flex justify-between items-center text-lg font-semibold text-veniviciDark bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => toggleQuestion(faq.id)}
                  aria-expanded={openQuestion === faq.id ? 'true' : 'false'}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  {faq.question}
                  <motion.i
                    className={`fas fa-chevron-${openQuestion === faq.id ? 'up' : 'down'} text-veniviciGreen`}
                    animate={{ rotate: openQuestion === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
                <AnimatePresence>
                  {openQuestion === faq.id && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-5 pt-0 text-gray-700 leading-relaxed"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.p variants={itemFadeIn} className="text-center text-lg text-gray-700 mt-12">
            Can't find your answer here? <Link to="/contact" className="text-veniviciGreen font-semibold hover:underline">Contact us</Link> directly, we're happy to help!
          </motion.p>
        </motion.section>
      </motion.div>
    </>
  );
};

export default FAQs;