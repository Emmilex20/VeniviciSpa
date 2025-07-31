// src/pages/BookingConfirmation.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Keep useLocation
import { motion } from 'framer-motion';

const BookingConfirmation = () => {
    const location = useLocation();
    const [bookingStatus, setBookingStatus] = useState(null);
    const [bookingId, setBookingId] = useState(null);
    const [paystackRef, setPaystackRef] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // For failed messages

    useEffect(() => {
        // Use URLSearchParams to parse query parameters from the URL
        const params = new URLSearchParams(location.search);

        setBookingStatus(params.get('status')); // 'success', 'pending', 'failed', 'cancelled'
        setBookingId(params.get('bookingId')); // This will be present for success/pending
        setPaystackRef(params.get('reference')); // This will be present for success

        // For failed status, get the message
        if (params.get('status') === 'failed') {
            setErrorMessage(params.get('message'));
        }

    }, [location.search]); // Depend on location.search so it re-runs if query params change

    const getMessage = () => {
        if (!bookingStatus) { // Initial state, or if status isn't provided
            return {
                title: "Processing Booking...",
                text: "Your booking is being processed. Please wait or check your email shortly.",
                icon: "fas fa-spinner fa-spin",
                color: "text-blue-500",
                bgColor: "bg-blue-100",
                textColor: "text-blue-700"
            };
        } else if (bookingStatus === 'success') { // Changed from 'paid' to 'success' to match query param
            return {
                title: "Booking Confirmed & Paid!",
                text: "Your service has been successfully booked and payment confirmed. A detailed receipt has been sent to your email.",
                icon: "fas fa-check-circle",
                color: "text-green-500",
                bgColor: "bg-green-100",
                textColor: "text-green-700"
            };
        } else if (bookingStatus === 'pending') {
            return {
                title: "Booking Created (Payment Pending)",
                text: "Your booking has been created, but payment is pending. Please complete your payment before your appointment. A confirmation email with details has been sent.",
                icon: "fas fa-clock",
                color: "text-yellow-500",
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-700"
            };
        } else if (bookingStatus === 'failed') {
            return {
                title: "Booking Failed",
                text: errorMessage || "There was an issue processing your booking or payment. Please try again or contact us for assistance.", // Display specific message if available
                icon: "fas fa-times-circle",
                color: "text-red-500",
                bgColor: "bg-red-100",
                textColor: "text-red-700"
            };
        } else if (bookingStatus === 'cancelled') { // For popup close
            return {
                title: "Payment Cancelled",
                text: "You closed the payment window. Your booking might still be pending, or you can try again.",
                icon: "fas fa-exclamation-triangle",
                color: "text-gray-500",
                bgColor: "bg-gray-100",
                textColor: "text-gray-700"
            };
        }
        return {
            title: "Booking Status",
            text: "Could not retrieve booking status. Please check your email or contact us.",
            icon: "fas fa-exclamation-circle",
            color: "text-gray-500",
            bgColor: "bg-gray-100",
            textColor: "text-gray-700"
        };
    };

    const { title, text, icon, color, bgColor, textColor } = getMessage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center min-h-[calc(100vh-150px)] pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 bg-veniviciLightGray px-4"
        >
            <div className={`p-8 sm:p-10 rounded-lg shadow-xl text-center max-w-lg w-full ${bgColor} border border-opacity-50 ${color.replace('text-', 'border-')}`}>
                <div className={`text-6xl mb-6 ${color}`}>
                    <i className={icon}></i>
                </div>
                <h1 className={`text-3xl sm:text-4xl font-bold font-serif mb-4 ${color}`}>{title}</h1>
                <p className={`text-lg mb-8 ${textColor}`}>{text}</p>

                {bookingId && (
                    <p className={`text-md mb-2 ${textColor}`}>
                        <strong>Booking ID:</strong> <span className="font-semibold">{bookingId}</span>
                    </p>
                )}
                {paystackRef && (
                    <p className={`text-md mb-6 ${textColor}`}>
                        <strong>Paystack Reference:</strong> <span className="font-semibold">{paystackRef}</span>
                    </p>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-block bg-veniviciGreen text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md
                                     hover:bg-opacity-90 transition duration-300 transform hover:scale-105"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-block border border-veniviciDark text-veniviciDark px-6 py-3 rounded-full text-lg font-semibold shadow-md
                                     hover:bg-veniviciDark hover:text-white transition duration-300 transform hover:scale-105"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default BookingConfirmation;