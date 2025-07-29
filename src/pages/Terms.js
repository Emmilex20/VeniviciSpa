// src/pages/Terms.js
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import genericHeroImg from '../assets/images/contact-hero.jpg'; // Re-using image

const Terms = () => {
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
        <title>Terms & Conditions - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Read the Terms and Conditions for using services and the website of Venivici Health Club & Urban Spa in Lekki, Lagos." />
        <meta property="og:title" content="Venivici Spa - Terms & Conditions" />
        <meta property="og:description" content="Important information regarding your use of our services and website." />
        <meta property="og:url" content="https://venivici.com/terms" />
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
              Terms & Conditions
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Understanding our mutual agreement.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 bg-white rounded-lg shadow-xl p-8 md:p-12"
        >
          <div className="prose max-w-none text-gray-700">
            <motion.p variants={itemFadeIn} className="mb-6"> {/* <--- itemFadeIn applied here */}
              <strong>Last Updated: July 29, 2025</strong>
            </motion.p>
            <motion.p variants={itemFadeIn} className="mb-6"> {/* <--- itemFadeIn applied here */}
              Welcome to Venivici Health Club & Urban Spa! These Terms and Conditions ("Terms") govern your use of the Venivici website, venivici.com (the "Site"), and the services provided by Venivici Health Club & Urban Spa (the "Services"). By accessing or using the Site and our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Site or use the Services.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">1. Acceptance of Terms</motion.h3> {/* <--- itemFadeIn applied here */}
            <motion.p variants={itemFadeIn} className="mb-6">
              By accessing and using our Site and Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
            </motion.p>

            {/* Apply itemFadeIn to other headings and paragraphs as desired for animation */}
            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">2. Services Offered</h3>
            <p className="mb-6">
              Venivici Health Club & Urban Spa offers a range of wellness and fitness services including spa treatments, health club access, personal training, and more, as detailed on our Site. All services are subject to availability and our internal policies.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">3. Bookings and Cancellations</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Booking:</strong> All bookings are subject to availability. We recommend booking in advance, especially for popular treatments or peak times.</li>
              <li><strong>Payment:</strong> Full payment or a deposit may be required at the time of booking, as specified for the particular service.</li>
              <li><strong>Cancellations & Rescheduling:</strong> We require at least 24 hours notice for any cancellation or rescheduling of appointments. Cancellations made with less than 24 hours notice may incur a 50% charge of the service fee. No-shows will be charged the full service fee.</li>
              <li><strong>Late Arrivals:</strong> Please arrive at least 15 minutes prior to your scheduled appointment. Late arrivals may result in a reduced treatment time to avoid inconveniencing other clients, with no adjustment to the service price.</li>
            </ul>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">4. Health and Wellness Information</h3>
            <p className="mb-6">
              The information provided on our Site is for general informational purposes only and does not constitute medical advice. Clients are responsible for disclosing any relevant health conditions, allergies, or concerns to our staff prior to any treatment or use of facilities. We reserve the right to refuse service if we deem it unsafe for the client or our staff.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">5. Intellectual Property</h3>
            <p className="mb-6">
              All content on the Site, including text, graphics, logos, images, and software, is the property of Venivici Health Club & Urban Spa or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">6. User Conduct</h3>
            <p className="mb-6">
              You agree to use the Site and Services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Site. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Site.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">7. Limitation of Liability</h3>
            <p className="mb-6">
              To the fullest extent permitted by applicable law, Venivici Health Club & Urban Spa shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">8. Governing Law</h3>
            <p className="mb-6">
              These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">9. Changes to Terms</h3>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">10. Contact Information</h3>
            <p className="mb-6">
              For any questions regarding these Terms, please contact us at:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Email:</strong> info@venivici.com</li>
              <li><strong>Phone:</strong> +234 809 999 0036</li>
            </ul>

            <p className="mt-8 text-sm text-gray-500 italic">
              <strong>Disclaimer:</strong> This is a general template. It is crucial to consult with a legal professional to draft comprehensive Terms & Conditions that are compliant with all applicable laws and regulations relevant to your business operations.
            </p>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Terms;