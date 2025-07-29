// src/pages/PrivacyPolicy.js
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Re-using a generic hero image for static pages, or create a new one if preferred
import genericHeroImg from '../assets/images/contact-hero.jpg'; // You can use a more generic image here

const PrivacyPolicy = () => {
  // Framer Motion Variants (consistent with other pages)
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
        <title>Privacy Policy - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Read the Privacy Policy of Venivici Health Club & Urban Spa. Learn how we collect, use, and protect your personal data." />
        <meta property="og:title" content="Venivici Spa - Privacy Policy" />
        <meta property="og:description" content="Your privacy is important to us. Understand our data handling practices." />
        <meta property="og:url" content="https://venivici.com/privacy-policy" />
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
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Your trust is our priority.
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
              Venivici Health Club & Urban Spa ("we," "our," or "us") is committed to protecting the privacy of our clients and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website venivici.com (the "Site") or use our services. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site or use our services.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">1. Information We Collect</motion.h3> {/* <--- itemFadeIn applied here */}
            <motion.p variants={itemFadeIn} className="mb-4">
              We may collect personal information from you in a variety of ways, including, but not limited to, when you visit our Site, register on the Site, place an order, fill out a form, use our services, and in connection with other activities, services, features or resources we make available.
            </motion.p>
            <motion.ul variants={itemFadeIn} className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Personal Identifiable Information:</strong> Name, email address, phone number, physical address, payment information (processed securely via third-party providers), health information (for spa/health services, collected with explicit consent).</li>
              <li><strong>Non-Personal Identifiable Information:</strong> Browser name, type of computer, technical information about Users means of connection to our Site (e.g., operating system and the Internet service providers utilized), and other similar information.</li>
              <li><strong>Usage Data:</strong> Information on how the Site is accessed and used, such as IP address, unique device identifiers, pages visited, time spent on pages, and referring URLs.</li>
            </motion.ul>

            {/* Apply itemFadeIn to other headings and paragraphs as desired for animation */}
            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">2. How We Use Your Information</h3>
            <p className="mb-6">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Provide, operate, and maintain our services.</li>
              <li>Improve, personalize, and expand our services.</li>
              <li>Understand and analyze how you use our services.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Site, and for marketing and promotional purposes.</li>
              <li>Process your transactions and manage your appointments.</li>
              <li>Send you emails.</li>
              <li>Find and prevent fraud.</li>
            </ul>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">3. Disclosure of Your Information</h3>
            <p className="mb-6">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, or safety of others.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
              <li><strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.</li>
            </ul>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">4. Security of Your Information</h3>
            <p className="mb-6">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">5. Your Privacy Rights</h3>
            <p className="mb-6">
              Depending on your location, you may have the following rights regarding your personal information: the right to access, correct, update, or request deletion of your personal information. You can exercise these rights by contacting us using the details below.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">6. Children's Privacy</h3>
            <p className="mb-6">
              Our Site is not intended for children under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you become aware that we have collected Personal Information from a child without verification of parental consent, we take steps to remove that information from our servers.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">7. Changes to This Privacy Policy</h3>
            <p className="mb-6">
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h3 className="text-2xl font-serif text-veniviciDark mb-4 mt-8">8. Contact Us</h3>
            <p className="mb-6">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Email:</strong> info@venivici.com</li>
              <li><strong>Phone:</strong> +234 809 999 0036</li>
              <li><strong>Address:</strong> Plot 6 Block 1, 69A Admiralty Way, Lekki Phase 1, Lagos, Nigeria</li>
            </ul>

            <p className="mt-8 text-sm text-gray-500 italic">
              <strong>Disclaimer:</strong> This is a general template. It is crucial to consult with a legal professional to draft a Privacy Policy that is compliant with all applicable laws and regulations relevant to your business operations and location (e.g., NDPR in Nigeria, GDPR if serving EU citizens, CCPA if serving California residents).
            </p>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;