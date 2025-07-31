const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/, lowercase: true },
    phone: { type: String, required: true },

    service: { // Changed from serviceId to service, referencing the Service model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    serviceName: { // Storing name for easier display/lookup without populate
        type: String,
        required: true
    },
    selectedDate: {
        type: Date,
        required: true,
    },
    selectedTimeSlot: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        maxlength: 500,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded', 'Amount Mismatch - Manual Review'],
        default: 'Pending',
    },
    // --- NEW FIELD ---
    paymentOption: { // To store 'payNow' or 'payLater'
        type: String,
        enum: ['payNow', 'payLater'],
        required: [true, 'Payment option is required.'],
    },
    // --- NEW FIELD ---
    status: { // Overall booking status (e.g., for admin to confirm/cancel)
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending',
    },
    paystackRef: { // Paystack transaction reference
        type: String,
        unique: true,
        sparse: true, // Allows null values for pending/non-paid bookings
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Booking', bookingSchema);