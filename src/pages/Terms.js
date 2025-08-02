// src/pages/Terms.js
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import genericHeroImg from '../assets/images/contact-hero.jpg';

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
        <title>Terms of Service - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Read the comprehensive Terms of Service for Venivici Health Club & Urban Spa in Lekki, Lagos. Learn about user responsibilities, booking policies, and intellectual property rights." />
        <meta property="og:title" content="Venivici Spa - Terms of Service" />
        <meta property="og:description" content="A detailed look at the terms and conditions that govern your use of our website and services." />
        <meta property="og:url" content="https://venivici.com/terms-of-service" />
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
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              The rules and guidelines for using our website and services.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 bg-white rounded-lg shadow-xl p-8 md:p-12"
        >
          <div className="prose max-w-none text-gray-700">
            <motion.p variants={itemFadeIn} className="mb-6">
              <strong>Last Updated: July 29, 2025</strong>
            </motion.p>
            <motion.p variants={itemFadeIn} className="mb-6">
              Welcome to Venivici Health Club & Urban Spa ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, venivici.com (the "Site"), and any related services we provide, including online booking and spa services. By accessing or using the Site, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not use our Site or services.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">1. Acceptance of Terms</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              By using our Site and services, you affirm that you are of legal age to form a binding contract and are not a person barred from receiving services under the laws of Nigeria or other applicable jurisdiction. You agree that your use of the Site is at your own risk and that you have the necessary authority to enter into these Terms.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">2. Use of Our Site and Services</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-4">
              You agree to use the Site and our services for personal, non-commercial purposes only and in compliance with all applicable local, state, national, and international laws and regulations. You are strictly prohibited from:
            </motion.p>
            <motion.ul variants={itemFadeIn} className="list-disc list-inside space-y-2 mb-6">
              <li>Accessing or tampering with non-public areas of the Site.</li>
              <li>Attempting to probe, scan, or test the vulnerability of the Site or any associated system or network.</li>
              <li>Interfering with or disrupting the access of any user, host, or network, including, without limitation, sending a virus, overloading, or spamming the Site.</li>
              <li>Using any automated means (e.g., bots, scripts) to access the Site without our express written permission.</li>
              <li>Collecting or storing personal data about other users without their consent.</li>
            </motion.ul>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">3. Booking, Appointments, and Payments</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-4">
              Our online booking system allows you to schedule appointments for our spa and health services.
            </motion.p>
            <motion.ul variants={itemFadeIn} className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Accuracy of Information:</strong> You are responsible for ensuring that all information you provide during the booking process, including personal details and payment information, is accurate and complete.</li>
              <li><strong>Payment:</strong> All payments for services booked through the Site are processed securely via third-party payment gateways (e.g., Paystack). We do not store your credit card or debit card details on our servers. By submitting your payment information, you authorize us to charge the applicable fees to your selected payment method.</li>
              <li><strong>Cancellations and Rescheduling:</strong> Our cancellation policy requires a minimum of 24 hours' notice for any changes or cancellations. Failure to provide adequate notice may result in a cancellation fee equivalent to a portion of the service cost. Details of our full cancellation policy are provided at the time of booking.</li>
              <li><strong>No-Shows:</strong> If you fail to show up for a scheduled appointment without prior notice, you may be charged the full service fee.</li>
            </motion.ul>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">4. Intellectual Property Rights</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              The content, features, and functionality of the Site, including but not limited to all text, graphics, logos, images, and the design and arrangement thereof, are the exclusive property of Venivici Health Club & Urban Spa, its licensors, or other content suppliers. These materials are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any of the material on our Site without our prior written consent.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">5. Links to Third-Party Websites</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              The Site may contain links to third-party websites or services that are not owned or controlled by Venivici Health Club & Urban Spa. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. Your interactions with these websites are solely between you and the third party.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">6. Disclaimer of Warranties</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              The Site and services are provided on an "as is" and "as available" basis. We make no warranties, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, secure, or free from errors, viruses, or other harmful components.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">7. Limitation of Liability</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              To the maximum extent permitted by law, Venivici Health Club & Urban Spa, its directors, employees, partners, agents, suppliers, or affiliates, shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; (iii) any content obtained from the Site; and (iv) unauthorized access, use, or alteration of your transmissions or content.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">8. Indemnification</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              You agree to defend, indemnify, and hold harmless Venivici Health Club & Urban Spa and its employees, contractors, agents, officers, and directors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from your use of and access to the Site, or your violation of these Terms.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">9. Governing Law and Jurisdiction</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in Lagos, Nigeria, for any disputes arising out of or relating to these Terms.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">10. Changes to the Terms</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes by posting the new Terms on this page. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
            </motion.p>

            <motion.h3 variants={itemFadeIn} className="text-2xl font-serif text-veniviciDark mb-4 mt-8">11. Contact Us</motion.h3>
            <motion.p variants={itemFadeIn} className="mb-6">
              If you have any questions or concerns about these Terms, please contact us at:
            </motion.p>
            <motion.ul variants={itemFadeIn} className="list-disc list-inside space-y-2 mb-6">
              <li><strong>Email:</strong> info@venivici.com</li>
              <li><strong>Phone:</strong> +234 809 999 0036</li>
              <li><strong>Address:</strong> Plot 6 Block 1, 69A Admiralty Way, Lekki Phase 1, Lagos, Nigeria</li>
            </motion.ul>

            <motion.p variants={itemFadeIn} className="mt-8 text-sm text-gray-500 italic">
              <strong>Disclaimer:</strong> This is a comprehensive template. It is still essential to consult with a legal professional to ensure full compliance with all laws and regulations relevant to your business, especially regarding liability, data protection, and consumer rights in Nigeria.
            </motion.p>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Terms;