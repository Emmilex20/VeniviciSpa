// src/pages/Booking.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async'; // Import Helmet

const Booking = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  // REPLACE WITH YOUR ACTUAL EMAILJS CREDENTIALS
  const EMAILJS_SERVICE_ID = 'service_1kkznwc';
  const EMAILJS_TEMPLATE_ID_BOOKING = 'template_w2pnnea';
  const EMAILJS_PUBLIC_KEY = 'Kriqr1chygzcxq16B';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(false);
    setSubmitError(false);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      desired_service: formData.service,
      preferred_date: formData.date,
      preferred_time: formData.time,
      additional_notes: formData.message,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_BOOKING, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: ''
        });
        setTimeout(() => setFormSubmitted(false), 7000);
      }, (err) => {
        console.log('FAILED...', err);
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 7000);
      });
  };

  return (
    <>
      <Helmet>
        <title>Book Appointment - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Request an appointment at Venivici Health Club & Urban Spa in Lekki, Lagos. Easily book your preferred massage, hydrotherapy, or detox session online." />
        <meta property="og:title" content="Venivici Spa - Book Appointment" />
        <meta property="og:description" content="Request your next luxury spa or health treatment at Venivici." />
        <meta property="og:image" content="https://venivici.com/images/booking-social.jpg" /> {/* Replace with an actual image URL */}
        <meta property="og:url" content="https://venivici.com/booking" /> {/* Replace with your actual website URL */}
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 min-h-[calc(100vh-200px)] container mx-auto"
      >
        <h1 className="text-4xl font-serif text-veniviciGreen text-center mb-10">Book Your Appointment</h1>
        <p className="text-lg text-center text-veniviciDark max-w-2xl mx-auto mb-10">
          Ready to indulge? Use our form below to request an appointment. Our team will contact you shortly to confirm your booking and ensure a perfect experience.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          {formSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Booking Request Sent!</p>
              <p>Thank you for your request. Our team will contact you soon to confirm your appointment details.</p>
            </motion.div>
          )}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Error!</p>
              <p>Failed to send your booking request. Please try again later or contact us directly.</p>
            </motion.div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="john.doe@example.com" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="e.g., +234 801 234 5678" required />
            </div>
            <div>
              <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Desired Service</label>
              <select id="service" name="service" value={formData.service} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" required>
                <option value="">Select a service</option>
                <option value="Full Body Massage">Full Body Massage</option>
                <option value="Colonic Hydrotherapy">Colonic Hydrotherapy</option>
                <option value="Herbal Steam Bath">Herbal Steam Bath</option>
                <option value="Full Body Scrub">Full Body Scrub</option>
                <option value="Foot Detox">Foot Detox</option>
                <option value="Other">Other (please specify in message)</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Preferred Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" required />
            </div>
            <div>
              <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Preferred Time</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Additional Notes (Optional)</label>
              <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="Any specific requests or conditions..."></textarea>
            </div>
            <motion.button
              type="submit"
              className="bg-veniviciGreen text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Appointment
            </motion.button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-6">
            *This is a request form. Your appointment will be confirmed by our team shortly after submission.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Booking;