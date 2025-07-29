import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

// Re-using a generic hero image for static pages, or create a new one if preferred
import genericHeroImg from '../assets/images/contact-hero.jpg';

// Import the new images for the sections
import featureImg1 from '../assets/images/featureImg1.jpg'; // Example usage
import featureImg2 from '../assets/images/featureImg2.jpg'; // Example usage
import testimonialBg from '../assets/images/testimonialBg.jpeg'; // Example usage for testimonial background

// --- Data for Services (example, adapt as needed) ---
const services = [
  {
    id: 'post_surgery_rehab',
    name: 'Post Surgery Rehabilitation',
    description: 'Necessary for a variety of surgical procedures including orthopaedic, cardiac, thoracic, neurological and abdominal surgery.',
    duration: '30 min',
    iconClass: 'fas fa-hospital-user', // Font Awesome icon class
  },
  {
    id: 'paediatric_physiotherapy',
    name: 'Paediatric Physiotherapy',
    description: 'Our paediatric physiotherapists help children to achieve their optimal physical development.',
    duration: '30 min',
    iconClass: 'fas fa-child',
  },
  {
    id: 'acupuncture',
    name: 'Acupuncture',
    description: 'A type of traditional Chinese medicine in which thin needles are inserted into the body.',
    duration: '30 min',
    iconClass: 'fas fa-syringe',
  },
  {
    id: 'lower_back_pain',
    name: 'Lower Back Pain',
    description: 'Lower back pain can result from a strain (injury) to muscles or tendons in the back.',
    duration: '30 min',
    iconClass: 'fas fa-dumbbell',
  },
  {
    id: 'neck_pain',
    name: 'Neck Pain',
    description: 'Pain in the neck and shoulder that varies in intensity, and may feel achy or like an electric shock from the neck to the arm.',
    duration: '30 min',
    iconClass: 'fas fa-head-side-mask',
  },
  {
    id: 'something_else',
    name: 'Something Else',
    description: 'Please specify your needs in the additional notes section of the form.',
    duration: '30 min',
    iconClass: 'fas fa-hands-helping',
  },
];

// --- Helper for Calendar (Simplified) ---
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
};

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Service, 1: Date/Time, 2: Details, 3: Summary
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceId: '', // Stores the ID of the selected service
    serviceName: '', // Stores the name of the selected service
    selectedDate: null, // Date object
    selectedTimeSlot: '',
    message: ''
  });

  // For Date & Time Picker
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  // Removed setAvailableTimeSlots from useState to resolve the ESLint warning,
  // as it's not being used to dynamically update this array in this simplified example.
  const availableTimeSlots = [
    '11:30 am - 12:00 pm', '12:00 pm - 12:30 pm', '1:00 pm - 1:30 pm', '1:30 pm - 2:00 pm',
    '2:00 pm - 2:30 pm', '2:30 pm - 3:00 pm', '3:00 pm - 3:30 pm', '3:30 pm - 4:00 pm'
  ];

  // REPLACE WITH YOUR ACTUAL EMAILJS CREDENTIALS
  const EMAILJS_SERVICE_ID = 'service_1kkznwc';
  const EMAILJS_TEMPLATE_ID_BOOKING = 'template_w2pnnea';
  const EMAILJS_PUBLIC_KEY = 'Kriqr1chygzcxq16B';

  // --- Handlers for Form Data ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, serviceId: service.id, serviceName: service.name });
    goToNextStep();
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    setFormData({ ...formData, selectedDate: selected });
    // You might want to filter availableTimeSlots based on the selected date here in a real app
  };

  const handleTimeSlotSelect = (slot) => {
    setFormData({ ...formData, selectedTimeSlot: slot });
  };

  // --- Navigation ---
  const goToNextStep = () => {
    // Basic validation before moving to next step
    if (currentStep === 0 && !formData.serviceId) {
      alert('Please select a service before proceeding.');
      return;
    }
    if (currentStep === 1 && (!formData.selectedDate || !formData.selectedTimeSlot)) {
      alert('Please select both a date and a time slot before proceeding.');
      return;
    }
    if (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)) {
      alert('Please fill in all your details before proceeding.');
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // --- Calendar Navigation ---
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    // Prevent going to past months if the current month is already in the past
    const canGoBack = currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth());
    if (canGoBack) {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => prev - 1);
        }
    }
  };

  const isPastDate = (year, month, day) => {
    const dateToCheck = new Date(year, month, day);
    dateToCheck.setHours(0, 0, 0, 0); // Normalize to start of day
    const todayNormalized = new Date();
    todayNormalized.setHours(0, 0, 0, 0); // Normalize today to start of day
    return dateToCheck < todayNormalized;
  };

  // --- Final Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(false);
    setSubmitError(false);

    // Prepare data for EmailJS
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      from_phone: formData.phone,
      desired_service: formData.serviceName,
      preferred_date: formData.selectedDate ? formData.selectedDate.toDateString() : 'N/A',
      preferred_time: formData.selectedTimeSlot,
      additional_notes: formData.message,
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_BOOKING, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormSubmitted(true);
        // Reset form after successful submission
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          serviceId: '', serviceName: '', selectedDate: null, selectedTimeSlot: '', message: ''
        });
        setCurrentStep(0); // Go back to the first step
        setTimeout(() => setFormSubmitted(false), 7000);
      }, (err) => {
        console.log('FAILED...', err);
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 7000);
      });
  };

  // Framer Motion Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const stepContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const alertVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, y: -50, scale: 0.8, transition: { duration: 0.5 } },
  };

  const sectionVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const faqVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 }
  };


  const stepIndicators = [
    { label: 'Service', icon: 'fas fa-clipboard-list' },
    { label: 'Date & Time', icon: 'fas fa-calendar-alt' },
    { label: 'Your Details', icon: 'fas fa-user' },
    { label: 'Summary', icon: 'fas fa-check-circle' },
  ];

  // For FAQ section
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    {
      q: "How do I book an appointment?",
      a: "Simply follow our easy 4-step booking process on this page: 1. Select your desired service. 2. Choose a convenient date and time. 3. Provide your contact details. 4. Review and submit your request. Our team will then contact you to confirm."
    },
    {
      q: "What if I need to reschedule or cancel?",
      a: "Please contact us directly via phone or email as soon as possible to reschedule or cancel your appointment. We appreciate at least 24 hours notice."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept various payment methods including credit/debit cards, bank transfers, and cash payments at our facility. Details will be provided upon confirmation."
    },
    {
      q: "Do you offer home visits?",
      a: "Yes, we offer limited home visit services depending on the client's location and specific needs. Please mention your interest in a home visit in the 'Additional Notes' section or contact us directly."
    },
    {
        q: "Where are you located?",
        a: "Venivici Health Club & Urban Spa is conveniently located in Lekki, Lagos. Our full address and directions can be found on our Contact Us page."
    }
  ];

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
          <motion.div variants={pageVariants} className="relative z-10 max-w-4xl mx-auto py-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-2">
              Book an Appointment
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Getting an accurate diagnosis can be one of the most impactful experiences that you can have.
            </p>
          </motion.div>
        </div>

        {/* Booking Form Wrapper */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">

            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 pb-4">
              {stepIndicators.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1 relative">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-xl
                      ${index <= currentStep ? 'bg-veniviciGreen' : 'bg-gray-300'}
                      ${index < currentStep ? 'border-2 border-veniviciGreen' : ''} transition-all duration-300`}
                  >
                    <i className={step.icon}></i>
                  </div>
                  <p className={`mt-2 text-sm font-semibold ${index <= currentStep ? 'text-veniviciDark' : 'text-gray-500'} hidden sm:block`}>
                    {step.label}
                  </p>
                  {index < stepIndicators.length - 1 && (
                    <div className={`absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-1 z-0
                                    ${index < currentStep ? 'bg-veniviciGreen' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Success/Error Messages */}
            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  key="success-alert"
                  variants={alertVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-xl z-50 max-w-sm w-full"
                  role="alert"
                >
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-2xl mr-3"></i>
                    <div>
                      <p className="font-bold text-lg">Booking Request Sent!</p>
                      <p className="text-sm">Thank you for your request. Our team will contact you shortly to confirm your appointment details.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  key="error-alert"
                  variants={alertVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-xl z-50 max-w-sm w-full"
                  role="alert"
                >
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-2xl mr-3"></i>
                    <div>
                      <p className="font-bold text-lg">Submission Failed!</p>
                      <p className="text-sm">There was an error sending your booking request. Please try again or contact us directly.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Content - Conditional Rendering */}
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  variants={stepContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="pt-4"
                >
                  <h2 className="text-2xl font-semibold text-veniviciDark mb-4 text-center">Select a Service</h2>
                  <p className="text-md text-gray-600 mb-8 text-center max-w-xl mx-auto">
                    Explore our range of specialized physiotherapy services. Click on a service to learn more and proceed with your booking.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`border rounded-lg p-6 cursor-pointer transition-all duration-300
                          ${formData.serviceId === service.id ? 'border-veniviciGreen shadow-md scale-105' : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'}
                          flex flex-col items-center text-center group`}
                      >
                        <i className={`${service.iconClass} text-5xl mb-4
                          ${formData.serviceId === service.id ? 'text-veniviciGreen' : 'text-gray-500 group-hover:text-veniviciDark'}
                          transition-colors duration-300`}></i>
                        <h3 className="font-bold text-lg text-veniviciDark mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 flex-grow">{service.description}</p>
                        <p className="text-xs text-gray-500 mt-auto">Duration: {service.duration}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="pt-4"
                >
                  <h2 className="text-2xl font-semibold text-veniviciDark mb-4 text-center">Select Your Preferred Date & Time</h2>
                  <p className="text-md text-gray-600 mb-8 text-center max-w-xl mx-auto">
                    Choose a convenient date from the calendar and then select an available time slot for your appointment.
                  </p>
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Calendar Section */}
                    <div className="md:w-1/2 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <button onClick={prevMonth} className="text-gray-600 hover:text-veniviciGreen text-lg p-2 rounded-full hover:bg-gray-200 transition-colors"
                            disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()}> {/* Disable if current month is today's month */}
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <h3 className="font-semibold text-xl text-veniviciDark">{monthNames[currentMonth]} {currentYear}</h3>
                        <button onClick={nextMonth} className="text-gray-600 hover:text-veniviciGreen text-lg p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                      <div className="grid grid-cols-7 text-center text-sm font-bold text-gray-700 mb-2">
                        {dayNames.map(day => <div key={day}>{day}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {[...Array(getFirstDayOfMonth(currentYear, currentMonth)).keys()].map((_, i) => (
                          <div key={`empty-${i}`} className="p-2"></div>
                        ))}
                        {[...Array(getDaysInMonth(currentYear, currentMonth)).keys()].map((dayIndex) => {
                          const day = dayIndex + 1;
                          const isSelected = formData.selectedDate && formData.selectedDate.getDate() === day && formData.selectedDate.getMonth() === currentMonth && formData.selectedDate.getFullYear() === currentYear;
                          const isDisabled = isPastDate(currentYear, currentMonth, day);
                          return (
                            <button
                              key={day}
                              onClick={() => !isDisabled && handleDateSelect(day)}
                              className={`p-2 rounded-full text-sm font-medium transition-colors duration-200
                                ${isDisabled ? 'text-gray-400 cursor-not-allowed opacity-60' : 'hover:bg-veniviciGreen hover:text-white'}
                                ${isSelected ? 'bg-veniviciGreen text-white shadow-md' : 'text-gray-800 bg-gray-100'}`}
                              disabled={isDisabled}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Section */}
                    <div className="md:w-1/2 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                      <h3 className="font-semibold text-xl text-veniviciDark mb-4 text-center">Available Time Slots</h3>
                      {/* Using flex-wrap for better responsiveness in time slots */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleTimeSlotSelect(slot)}
                            className={`px-4 py-2 rounded-md border text-sm transition-colors duration-200 flex-grow
                              ${formData.selectedTimeSlot === slot ? 'bg-veniviciGreen text-white border-veniviciGreen shadow-sm' : 'border-gray-300 text-gray-800 hover:bg-gray-100'}`}
                          >
                            {slot}
                          </button>
                        ))}
                        {availableTimeSlots.length === 0 && (
                            <p className="text-gray-500 text-center w-full">No available time slots for selected date.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="pt-4"
                >
                  <h2 className="text-2xl font-semibold text-veniviciDark mb-4 text-center">Your Contact Details</h2>
                  <p className="text-md text-gray-600 mb-8 text-center max-w-xl mx-auto">
                    Please provide your contact information so our team can reach out to confirm your appointment. All fields marked with * are required.
                  </p>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name *</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="E.g., John" required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="E.g., Doe" required />
                        </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="E.g., your.email@example.com" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="E.g., +234 801 234 5678" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Additional Notes (Optional)</label>
                      <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-veniviciGreen" placeholder="E.g., Any specific requests, conditions, or questions..."></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="pt-4 text-center"
                >
                  <h2 className="text-2xl font-semibold text-veniviciDark mb-4">Review Your Appointment Details</h2>
                  <p className="text-md text-gray-600 mb-8 text-center max-w-xl mx-auto">
                    Please review all the details below. If everything looks correct, click "Book Appointment" to send your request.
                  </p>
                  <div className="flex justify-center mb-8">
                    {/* Updated image for summary, keeping it within project scope or a generic spa icon */}
                    <img src="https://e7.pngegg.com/pngimages/65/761/png-clipart-spa-computer-icons-massage-facial-spa-miscellaneous-silhouette-thumbnail.png" alt="Summary Icon" className="w-24 h-24 object-contain" />
                  </div>

                  <div className="text-left bg-gray-50 p-6 rounded-lg shadow-inner max-w-md mx-auto space-y-3">
                    <p className="text-gray-700">
                      <span className="font-semibold text-veniviciDark">Customer:</span> {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-veniviciDark">Email:</span> {formData.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-veniviciDark">Phone:</span> {formData.phone}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-veniviciDark">Service:</span> {formData.serviceName || 'Not selected'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-veniviciDark">Date:</span>{' '}
                      {formData.selectedDate ? formData.selectedDate.toDateString() : 'Not selected'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-veniviciDark">Time:</span>{' '}
                      {formData.selectedTimeSlot || 'Not selected'}
                    </p>
                    {formData.message && (
                      <p className="text-gray-700">
                        <span className="font-semibold text-veniviciDark">Notes:</span> {formData.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className={`flex ${currentStep === 0 ? 'justify-end' : 'justify-between'} mt-8 pt-4 border-t border-gray-200`}>
              {currentStep > 0 && (
                <motion.button
                  type="button"
                  onClick={goToPrevStep}
                  className="px-6 py-3 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition duration-300 font-semibold flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-arrow-left mr-2"></i> Go Back
                </motion.button>
              )}
              {currentStep < stepIndicators.length - 1 && (
                <motion.button
                  type="button"
                  onClick={goToNextStep}
                  className="bg-veniviciGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next {stepIndicators[currentStep + 1].label} <i className="fas fa-arrow-right ml-2"></i>
                </motion.button>
              )}
              {currentStep === stepIndicators.length - 1 && (
                <motion.button
                  type="submit"
                  onClick={handleSubmit} // Trigger EmailJS submission here
                  className="bg-veniviciGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold w-full sm:w-auto flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Appointment <i className="fas fa-check ml-2"></i>
                </motion.button>
              )}
            </div>

            {currentStep === 0 && (
                <p className="text-sm text-gray-500 text-center mt-6">
                  *This is a request form. Your appointment will be confirmed by our team shortly after submission.
                </p>
            )}
          </div>
        </div>

        {/* --- New Sections Below Booking Form --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">

            {/* Why Choose Us Section */}
            <motion.section
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="bg-white shadow-lg rounded-lg p-8 md:p-10 lg:p-12 text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-veniviciDark mb-8">Why Choose Venivici Health Club & Spa?</h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
                    At Venivici, we are dedicated to providing a holistic approach to your well-being. Experience the difference with our expert care, state-of-the-art facilities, and personalized treatments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-veniviciGreen-light flex items-center justify-center mb-4 overflow-hidden">
                            <img src={featureImg1} alt="Expert Team" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold text-veniviciDark mb-2">Expert Team</h3>
                        <p className="text-gray-600">Our certified professionals provide top-tier, compassionate care tailored to your needs.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-veniviciGreen-light flex items-center justify-center mb-4 overflow-hidden">
                            <img src={featureImg2} alt="Modern Facilities" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold text-veniviciDark mb-2">Modern Facilities</h3>
                        <p className="text-gray-600">Equipped with the latest technology for effective and comfortable treatments.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-veniviciGreen-light flex items-center justify-center mb-4">
                            <i className="fas fa-hand-holding-heart text-5xl text-veniviciGreen"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-veniviciDark mb-2">Personalized Care</h3>
                        <p className="text-gray-600">Every treatment plan is customized to help you achieve your unique health goals.</p>
                    </div>
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="relative bg-cover bg-center py-20 px-4 rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${testimonialBg})` }}
            >
                <div className="relative z-10 text-white text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">What Our Clients Say</h2>
                    <p className="text-lg opacity-90 mb-12">Hear directly from those who have experienced the Venivici difference.</p>

                    {/* Simple Testimonial Carousel (or static grid for simplicity) */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg">
                        <p className="text-xl italic mb-6">
                            "My experience at Venivici was exceptional. The staff was incredibly professional and the treatment truly made a difference. I feel rejuvenated and pain-free!"
                        </p>
                        <p className="font-semibold text-lg">- Amina F., Lekki</p>
                        <p className="text-sm opacity-80">Physiotherapy Patient</p>
                    </div>
                    {/* Add more testimonials if desired, perhaps in a grid or simple slider */}
                </div>
            </motion.section>

            {/* FAQ Section (Accordion Style) */}
            <motion.section
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="bg-white shadow-lg rounded-lg p-8 md:p-10 lg:p-12"
            >
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-veniviciDark mb-8 text-center">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                            <button
                                className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-veniviciDark hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                {faq.q}
                                <motion.span
                                    initial={false}
                                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <i className="fas fa-chevron-down text-veniviciGreen"></i>
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={faqVariants}
                                        className="overflow-hidden"
                                    >
                                        <p className="p-4 pt-0 text-gray-700 leading-relaxed">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.section>

        </div>
        {/* --- End New Sections --- */}

      </motion.div>
    </>
  );
};

export default Booking;