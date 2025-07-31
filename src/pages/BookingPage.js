// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom';

// Import images
import genericHeroImg from '../assets/images/contact-hero.jpg';
import featureImg1 from '../assets/images/featureImg1.jpg';
import featureImg2 from '../assets/images/featureImg2.jpg';
import testimonialBg from '../assets/images/testimonialBg.jpeg';

// Define your backend API base URL from .env.local
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

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


// --- Framer Motion Variants ---
const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const sectionVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onScreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const alertVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.3 } },
};

const stepContentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
};

const faqVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};


const BookingPage = () => {
    const navigate = useNavigate(); // Initialize navigate hook

    // Multi-step form state
    const [currentStep, setCurrentStep] = useState(0); // 0: Service, 1: Date/Time, 2: Details, 3: Summary

    // Form data state
    const [formData, setFormData] = useState({
        serviceId: '',
        serviceName: '',
        servicePrice: 0,
        selectedDate: null,
        selectedTimeSlot: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        paymentOption: 'payNow', // Added paymentOption
    });

    // UI states
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [serviceFetchError, setServiceFetchError] = useState(null);
    const [fetchedServices, setFetchedServices] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [openFaq, setOpenFaq] = useState(null);

    // Calendar states
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    // State to hold the dynamic Paystack configuration
    const [paystackPaymentConfig, setPaystackPaymentConfig] = useState(null);

    // State to hold the dynamic Paystack configuration when ready
    // THIS WILL BE SET JUST BEFORE initiating payment
    const [paystackConfigForInitiation, setPaystackConfigForInitiation] = useState(null);

    // Hardcoded time slots (ideally from backend based on date/service)
    const availableTimeSlots = [
        '09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM',
        '11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM', '01:00 PM - 01:30 PM', '01:30 AM - 02:00 PM',
        '02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM'
    ];

    // Dummy FAQ data
    const faqs = [
        {
            q: "What services does Venivici Health Club & Urban Spa offer?",
            a: "We offer a comprehensive range of services including various massage therapies, hydrotherapy, detox programs, personalized physiotherapy, fitness consultations, and aesthetic treatments designed for holistic well-being."
        },
        {
            q: "How can I book an appointment?",
            a: "You can easily book an appointment through this online form! Simply select your desired service, choose a date and time, fill in your contact details, and submit. Our team will contact you shortly to confirm."
        },
        {
            q: "What should I bring to my first appointment?",
            a: "For your first appointment, we recommend arriving 15 minutes early to complete any necessary paperwork. Please bring any relevant medical records or information related to your condition or goals."
        },
        {
            q: "Do you offer gift vouchers?",
            a: "Yes, Venivici Health Club & Urban Spa offers beautifully presented gift vouchers, perfect for any occasion. They can be purchased for specific services or a custom monetary value. Please contact us for details."
        }
    ];

    // Step indicators for the multi-step form
    const stepIndicators = [
        { label: 'Select Service', icon: 'fas fa-clipboard-list' },
        { label: 'Date & Time', icon: 'fas fa-calendar-alt' },
        { label: 'Your Details', icon: 'fas fa-user-circle' },
        { label: 'Review & Book', icon: 'fas fa-check-circle' },
    ];

    // --- Fetch Services from Backend on Component Mount ---
    useEffect(() => {
        const fetchServices = async () => {
            setIsLoadingServices(true);
            setServiceFetchError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/services`);
                setFetchedServices(response.data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
                setServiceFetchError("Failed to load services. Please ensure the backend is running or try again later.");
            } finally {
                setIsLoadingServices(false);
            }
        };
        fetchServices();
    }, []);

    // Get the selected service object for calculations/display
    const getSelectedServiceDetails = () => {
        return fetchedServices.find(s => s._id === formData.serviceId);
    };

    const totalAmount = getSelectedServiceDetails()?.price || 0;

    // --- Paystack Hook Initialization ---
    // Initialize usePaystackPayment with an empty config initially.
    // The actual config will be set dynamically via paystackConfigForInitiation.
    const initializePayment = usePaystackPayment(paystackConfigForInitiation || {});

    // --- Paystack Configuration ---
    // This function will be called by usePaystackPayment, which initializes the payment modal.
    const paystackConfig = {
        reference: new Date().getTime().toString(), // Placeholder, backend will generate actual reference
        email: formData.email,
        amount: totalAmount * 100, // Amount in kobo
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: `${formData.firstName} ${formData.lastName}`
                },
                {
                    display_name: "Service Booked",
                    variable_name: "service_name",
                    value: formData.serviceName || 'N/A'
                }
            ]
        }
    };

    // Paystack success callback
    const onPaystackSuccess = (response) => {
        console.log('STEP 1: Paystack Success Callback Fired!');
        console.log('STEP 2: Paystack raw response object:', response);
        console.log('STEP 3: Frontend received Paystack reference for backend verification:', response.reference);

        // Make sure your API_BASE_URL is correct and the endpoint path matches your backend.
        // Assuming backend endpoint is /api/bookings/verify-payment
        axios.post(`${API_BASE_URL}/bookings/verify-payment`, { reference: response.reference })
            .then(res => {
                console.log('STEP 4: Backend verification call successful!');
                console.log('STEP 5: Backend verification result:', res.data);

                // Check the status returned by your backend verification
                if (res.data.status === 'success') {
                    // Ensure res.data.bookingId exists from your backend response
                    const bookingIdFromBackend = res.data.bookingId;

                    if (bookingIdFromBackend) {
                        setFormSubmitted(true);
                        navigate(`/booking-confirmation?status=success&bookingId=${bookingIdFromBackend}&reference=${response.reference}`);
                    } else {
                        console.error('Backend verification success but no bookingId returned.');
                        navigate(`/booking-confirmation?status=failed&message=Booking ID missing from verification.`);
                    }
                } else {
                    console.warn('Backend verification returned non-success status:', res.data.message);
                    navigate(`/booking-confirmation?status=failed&message=${res.data.message || 'Payment not successfully verified.'}`);
                }
            })
            .catch(err => {
                console.error('Payment verification failed on backend:', err.response ? err.response.data : err.message);
                // Navigate to a failed status page, passing the error message if available
                const errorMessage = err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : 'Payment verification failed due to network or server error.';
                navigate(`/booking-confirmation?status=failed&message=${errorMessage}`);
            })
            .finally(() => {
                setIsSubmitting(false); // Make sure loading state is cleared
            });
    };

    const onPaystackClose = () => {
        console.log('Paystack popup closed.');
        // User closed the popup, handle accordingly
        navigate('/booking-confirmation?status=cancelled'); // This should work fine for cancellations
    };


    // --- Handlers for Form Data ---
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentOptionChange = (e) => {
        setFormData(prev => ({ ...prev, paymentOption: e.target.value }));
    };

    const handleServiceSelect = (service) => {
        setFormData({ ...formData, serviceId: service._id, serviceName: service.name });
        goToNextStep();
    };

    const handleDateSelect = (day) => {
        const selected = new Date(currentYear, currentMonth, day);
        // Format date to YYYY-MM-DD for backend
        const formattedDate = selected.toISOString().split('T')[0];
        setFormData({ ...formData, selectedDate: selected, selectedDateString: formattedDate });
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

    // --- Final Form Submission to Backend ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormSubmitted(false);
        setSubmitError(false);

        const appointmentData = {
            serviceId: formData.serviceId,
            serviceName: formData.serviceName,
            selectedDate: formData.selectedDate.toISOString().split('T')[0], // YYYY-MM-DD
            selectedTimeSlot: formData.selectedTimeSlot,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            totalAmount: totalAmount,
            paymentOption: formData.paymentOption, // This will be 'payNow' or 'payLater'
        };

        try {
            const response = await fetch(`${API_BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit booking request.');
            }

            const result = await response.json();
            console.log('Backend booking creation response:', result); // This will now show the structure you provided!

            // Access bookingId directly from the result object
            const bookingId = result.bookingId;
            if (!bookingId) {
                // This should ideally not happen if your backend always returns bookingId
                throw new Error("Booking ID not returned from backend.");
            }

            // Check the paymentRequired flag from the backend response
            if (result.paymentRequired) {
                // This block executes if the backend says payment is needed (i.e., for 'payNow')
                const backendReference = result.paystackReference; // Assuming 'reference' will be present when paymentRequired is true
                // const authorizationUrl = result.paystackAuthUrl; // Access the auth URL - currently not used for react-paystack modal

                if (!backendReference) {
                    throw new Error("Payment reference not returned from backend for online payment.");
                }

                const config = {
                    reference: backendReference, // Use the reference from your backend
                    email: formData.email,
                    amount: totalAmount * 100, // Amount in kobo
                    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
                    metadata: {
                        booking_id: bookingId, // Pass the actual booking ID
                        custom_fields: [
                            {
                                display_name: "Customer Name",
                                variable_name: "customer_name",
                                value: `${formData.firstName} ${formData.lastName}`
                            },
                            {
                                display_name: "Service Booked",
                                variable_name: "service_name",
                                value: formData.serviceName || 'N/A'
                            }
                        ]
                    },
                    // The callback URL should be configured on your Paystack dashboard
                    callback_url: "https://venivici-spa.vercel.app/booking-confirmation" // Still useful for clarity
                };

                // Set the config state, which will trigger the useEffect to open Paystack modal
                setPaystackConfigForInitiation(config);

            } else {
                // This block executes if the backend says payment is NOT needed (i.e., for 'payLater')
                setFormSubmitted(true);
                setFormData({ // Reset form data
                    serviceId: '',
                    serviceName: '',
                    servicePrice: 0,
                    selectedDate: null,
                    selectedTimeSlot: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    paymentOption: 'payNow', // Reset to default for next booking
                });
                setCurrentStep(0); // Go back to the first step
                setTimeout(() => setFormSubmitted(false), 5000); // Hide success message after 5 seconds
                // Navigate to a simple confirmation page for "Pay at Clinic"
                navigate(`/booking-confirmation?status=pending&bookingId=${bookingId}`);
            }

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError(error.message);
            setTimeout(() => setSubmitError(false), 5000); // Hide error message after 5 seconds
        } finally {
            setIsSubmitting(false);
        }
    };

    // This useEffect will now only trigger `initializePayment` when `paystackConfigForInitiation` is set
    useEffect(() => {
        if (paystackConfigForInitiation) {
            console.log("--- Frontend Paystack Config for usePaystackPayment ---");
            console.log("Reference:", paystackConfigForInitiation.reference);
            console.log("Email:", paystackConfigForInitiation.email);
            console.log("Amount (kobo):", paystackConfigForInitiation.amount);
            console.log("Public Key:", paystackConfigForInitiation.publicKey);
            console.log("-----------------------------------------------------");

            // Call initializePayment (returned by usePaystackPayment) with the success/close callbacks
            initializePayment(onPaystackSuccess, onPaystackClose);

            // Clear the config so it doesn't try to re-open on subsequent renders
            setPaystackConfigForInitiation(null);
        }
    }, [paystackConfigForInitiation, initializePayment, onPaystackSuccess, onPaystackClose]);



    return (
        <>
            <Helmet>
                <title>Book Appointment - Venivici Health Club & Urban Spa</title>
                <meta name="description" content="Request an appointment at Venivici Health Club & Urban Spa in Lekki, Lagos. Easily book your preferred massage, hydrotherapy, or detox session online." />
                <meta property="og:title" content="Venivici Spa - Book Appointment" />
                <meta property="og:description" content="Request your next luxury spa or health treatment at Venivici." />
                <meta property="og:image" content={`https://venivici-spa.vercel.app/${genericHeroImg}`} /> {/* Using local image for development */}
                <meta property="og:url" content="https://venivici-spa.vercel.app/" /> {/* Update with your actual deployment URL */}
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

                            {isLoadingServices ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-spinner fa-spin text-4xl text-veniviciGreen"></i>
                                    <p className="mt-4 text-gray-600">Loading services...</p>
                                </div>
                            ) : serviceFetchError ? (
                                <div className="text-center py-8 text-red-600">
                                    <i className="fas fa-exclamation-circle text-4xl mb-2"></i>
                                    <p className="font-semibold">{serviceFetchError}</p>
                                    <p className="text-sm">Please ensure the backend server is running and accessible.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {fetchedServices.length > 0 ? (
                                        fetchedServices.map((service) => (
                                            <div
                                                key={service._id}
                                                onClick={() => handleServiceSelect(service)}
                                                className={`border rounded-lg p-6 cursor-pointer transition-all duration-300
                                                    ${formData.serviceId === service._id ? 'border-veniviciGreen shadow-md scale-105' : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'}
                                                    flex flex-col items-center text-center group`}
                                            >
                                                <i className={`${service.iconClass || 'fas fa-spa'} text-5xl mb-4
                                                    ${formData.serviceId === service._id ? 'text-veniviciGreen' : 'text-gray-500 group-hover:text-veniviciDark'}
                                                    transition-colors duration-300`}></i>
                                                <h3 className="font-bold text-lg text-veniviciDark mb-2">{service.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2 flex-grow">{service.description}</p>
                                                <p className="text-xs text-gray-500 mt-auto">Duration: {service.duration}</p>
                                                {service.price && <p className="text-sm font-semibold text-veniviciDark mt-2">Price: ₦{service.price.toLocaleString()}</p>}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-8 text-gray-500">
                                            <i className="fas fa-info-circle text-4xl mb-2"></i>
                                            <p className="font-semibold">No services found.</p>
                                            <p className="text-sm">Please add services to your backend database.</p>
                                        </div>
                                    )}
                                </div>
                            )}
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
                                            disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()}>
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
                                <img src={testimonialBg} alt="Summary Icon" className="w-24 h-24 object-contain rounded-full shadow-lg" /> {/* Added rounded-full & shadow for better presentation */}
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
                                <p className="text-xl font-bold text-veniviciDark mt-4">
                                    Total: <span className="text-veniviciGreen">₦{totalAmount.toLocaleString()}</span>
                                </p>

                                {/* Payment Options */}
                                <div className="mt-6">
                                    <h3 className="font-semibold text-lg text-veniviciDark mb-3">Payment Option</h3>
                                    <div className="flex flex-col space-y-3">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio h-5 w-5 text-veniviciGreen"
                                                name="paymentOption"
                                                value="payNow"
                                                checked={formData.paymentOption === 'payNow'}
                                                onChange={handlePaymentOptionChange}
                                            />
                                            <span className="ml-2 text-gray-700">Pay Now (Online Payment)</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio h-5 w-5 text-veniviciGreen"
                                                name="paymentOption"
                                                value="payLater"
                                                checked={formData.paymentOption === 'payLater'}
                                                onChange={handlePaymentOptionChange}
                                            />
                                            <span className="ml-2 text-gray-700">Pay at Clinic</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons (Outside AnimatePresence to remain persistent) */}
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
                            onClick={handleSubmit}
                            className="bg-veniviciGreen text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300 font-semibold w-full sm:w-auto flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                                </>
                            ) : (
                                <>
                                    Book Appointment <i className="fas fa-check ml-2"></i>
                                </>
                            )}
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
                        whileInView="onScreen"
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
                        whileInView="onScreen"
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
                        </div>
                    </motion.section>

                    {/* FAQ Section (Accordion Style) */}
                    <motion.section
                        initial="offscreen"
                        whileInView="onScreen"
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
            </motion.div>
        </>
    );
};

export default BookingPage;