const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler'); // For simplifying async error handling
const Booking = require('../models/Booking');
const Service = require('../models/Service'); // To get service details like price

const { initializePayment, verifyPayment } = require('../utils/paystack'); // Payment utility functions
const { sendBookingConfirmationEmail, sendPaymentReceiptEmail, sendPendingPaymentEmail } = require('../utils/emailService'); // Email utility functions

// @desc    Create a new booking and/or initiate payment
// @route   POST /api/bookings
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        serviceId,
        selectedDate,
        selectedTimeSlot,
        message,
        paymentOption // 'payNow' or 'payLater' from frontend
    } = req.body;

    // 1. Basic Validation
    if (!firstName || !lastName || !email || !phone || !serviceId || !selectedDate || !selectedTimeSlot || !paymentOption) {
        res.status(400);
        throw new Error('Please fill in all required fields, including payment option.');
    }

    // 2. Verify Service and Get Price
    let service;
    try {
        service = await Service.findById(serviceId);
        if (!service) {
            res.status(404);
            throw new Error('Selected service not found.');
        }
        // Ensure service has a price
        if (service.price === undefined || service.price === null || service.price < 0) {
            res.status(400);
            throw new Error('Selected service does not have a valid price defined.');
        }
    } catch (err) {
        console.error('Error finding service by ID:', err.message);
        res.status(err.statusCode || 500); // Use existing status if set
        throw new Error(err.message || 'Server error verifying service.');
    }

    const totalAmount = service.price; // Get the price from the fetched service

    // 3. Create the Booking entry with initial status
    const booking = new Booking({
        firstName,
        lastName,
        email,
        phone,
        service: service._id, // Store service ObjectId
        serviceName: service.name, // Store the confirmed service name
        selectedDate: new Date(selectedDate),
        selectedTimeSlot,
        message,
        totalAmount,
        paymentOption, // Save the chosen payment option
        paymentStatus: 'Pending', // All new bookings start as Pending for payment
        status: 'Pending', // Overall booking status, pending confirmation by admin
    });

    let createdBooking;
    try {
        createdBooking = await booking.save();
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).reduce((acc, key) => {
                acc[key] = err.errors[key].message;
                return acc;
            }, {});
            res.status(400);
            throw new Error(JSON.stringify(errors)); // Send validation errors back
        }
        res.status(500);
        throw new Error('Server error saving booking: ' + err.message);
    }

    // 4. Handle Payment Option
    if (paymentOption === 'payNow') {
        // Initiate Paystack Payment
        if (totalAmount <= 0) { // Paystack requires amount > 0
            res.status(400);
            throw new Error('Amount must be greater than zero for online payment.');
        }

        const paystackResponse = await initializePayment(
            email,
            totalAmount * 100, // Amount in kobo
            createdBooking._id.toString() // Pass booking ID as metadata for webhook
        );

        if (paystackResponse.status) {
            // Update booking with Paystack reference
            createdBooking.paystackRef = paystackResponse.data.reference;
            await createdBooking.save();

            // Send back Paystack authorization URL to frontend
            res.status(200).json({
                message: 'Booking created, redirect to payment gateway.',
                bookingId: createdBooking._id,
                totalAmount: createdBooking.totalAmount,
                customerEmail: createdBooking.email,
                paystackAuthUrl: paystackResponse.data.authorization_url,
                paystackAccessCode: paystackResponse.data.access_code,
                paystackReference: paystackResponse.data.reference,
                paymentRequired: true // Indicate to frontend that payment is next
            });
        } else {
            // If Paystack initiation fails, update booking status and throw error
            createdBooking.paymentStatus = 'Failed';
            await createdBooking.save(); // Save the booking with failed payment status
            res.status(400);
            throw new Error(paystackResponse.message || 'Failed to initiate payment with Paystack.');
        }
    } else if (paymentOption === 'payLater') {
        // Booking is already 'Pending' by default for payment and overall status.
        // Send a pending payment email
        await sendPendingPaymentEmail(createdBooking.email, createdBooking);

        res.status(201).json({
            message: 'Booking created successfully with payment pending (pay at location).',
            bookingId: createdBooking._id,
            totalAmount: createdBooking.totalAmount,
            customerEmail: createdBooking.email,
            paymentRequired: false // Indicate no immediate payment needed
        });
    } else {
        res.status(400);
        throw new Error('Invalid payment option provided.');
    }
}));


// @desc    Initiate Paystack payment (called by frontend if user chooses 'Pay Now'
//          after a 'Pay Later' booking, or if the first POST /api/bookings
//          doesn't return a direct Paystack URL)
// @route   POST /api/bookings/:id/pay
// @access  Public (or Private if you want to restrict who can initiate payment)
router.post('/:id/pay', asyncHandler(async (req, res) => {
    // Add a log to confirm this route is hit
    console.log('--- Backend: HIT /api/bookings/:id/pay route ---');
    console.log('Backend: Request params ID (for payment):', req.params.id);
    console.log('Backend: Request body email (for payment):', req.body.email);

    const bookingId = req.params.id;
    const { email: customerEmailForPaystack } = req.body; // Use a distinct name to avoid conflict with booking's email

    const booking = await Booking.findById(bookingId).populate('service');

    if (!booking) {
        console.error('Backend: Booking not found for ID (for payment initiation):', bookingId);
        res.status(404);
        throw new Error('Booking not found');
    }

    if (booking.paymentStatus === 'Paid') {
        console.warn('Backend: Payment already completed for booking ID:', bookingId);
        return res.status(200).json({ message: 'Payment already completed for this booking.' });
    }

    if (!customerEmailForPaystack) {
        console.error('Backend: Missing email for Paystack initialization for booking:', bookingId);
        res.status(400);
        throw new Error('Customer email is required to initiate payment.');
    }

    console.log('Backend: Attempting to initialize Paystack for Booking ID:', bookingId, 'Email:', customerEmailForPaystack, 'Amount:', booking.totalAmount * 100);

    const paystackResponse = await initializePayment(
        customerEmailForPaystack,
        booking.totalAmount * 100, // Amount in kobo
        booking._id.toString() // Passed as metadata booking_id
    );

    if (paystackResponse.status) {
        console.log('Backend: Paystack initialization successful for Booking ID:', bookingId);
        // Update the booking's Paystack reference if it wasn't set or needs updating
        booking.paystackRef = paystackResponse.data.reference;
        await booking.save();

        res.json({
            message: 'Payment initiated',
            authorization_url: paystackResponse.data.authorization_url,
            access_code: paystackResponse.data.access_code,
            reference: paystackResponse.data.reference, // Paystack's unique reference
        });
    } else {
        console.error('Backend: Paystack initialization failed for Booking ID:', bookingId, 'Message:', paystackResponse.message);
        res.status(paystackResponse.statusCode || 400); // Use Paystack's status code if available, otherwise 400
        throw new Error(paystackResponse.message || 'Error initiating payment with Paystack.');
    }
}));

// Add this new route to your backend/routes/bookings.js file

// @desc    Verify Paystack payment (called by frontend after success or by webhook retry)
// @route   POST /api/bookings/verify-payment
// @access  Public (called from client-side after payment, or by cron for retry)
router.post('/verify-payment', asyncHandler(async (req, res) => {
    const { reference } = req.body;

    if (!reference) {
        return res.status(400).json({ message: 'Payment reference is required for verification.' });
    }

    console.log(`Backend: Attempting to verify payment for reference: ${reference}`);

    const verificationResult = await verifyPayment(reference); // Your utility function

    if (verificationResult.status && verificationResult.data.status === 'success') {
        const bookingId = verificationResult.data.metadata ? verificationResult.data.metadata.booking_id : null;

        if (!bookingId) {
            console.error(`Backend Verification: Missing booking_id in metadata for reference ${reference}`);
            return res.status(400).json({ message: 'Missing booking ID in payment metadata.' });
        }

        const booking = await Booking.findById(bookingId).populate('service');

        if (!booking) {
            console.error(`Backend Verification: Booking not found for ID ${bookingId}`);
            return res.status(404).json({ message: 'Booking not found.' });
        }

        if (booking.paymentStatus === 'Paid') {
            console.log(`Backend Verification: Booking ${bookingId} already paid. Reference: ${reference}`);
            return res.status(200).json({ status: 'success', bookingId: booking._id, message: 'Payment already processed.' });
        }

        // Important: Verify amounts match to prevent fraud
        if (verificationResult.data.amount / 100 !== booking.totalAmount) {
            console.error(`Backend Verification: Amount mismatch for booking ${bookingId}. Expected ${booking.totalAmount}, Got ${verificationResult.data.amount / 100}. Paystack Ref: ${reference}`);
            booking.paymentStatus = 'Amount Mismatch - Manual Review';
            booking.paystackRef = reference;
            booking.paidAt = new Date();
            await booking.save();
            return res.status(400).json({ status: 'failure', message: 'Amount mismatch.' });
        }

        booking.paymentStatus = 'Paid';
        booking.paystackRef = reference;
        booking.paidAt = new Date();
        if (booking.status === 'Pending') {
            booking.status = 'Confirmed';
        }
        await booking.save();

        const recipientEmail = booking.email;
        if (recipientEmail) {
            await sendBookingConfirmationEmail(recipientEmail, booking);
            await sendPaymentReceiptEmail(recipientEmail, booking, verificationResult.data);
        }

        console.log(`Backend Verification: Booking ${bookingId} payment successful and updated.`);
        // Crucially, return bookingId for the frontend
        res.status(200).json({ status: 'success', bookingId: booking._id, message: 'Payment verified and booking updated.' });

    } else {
        console.error(`Backend Verification: Payment verification failed for reference ${reference}. Message: ${verificationResult.message || 'Unknown error'}`);
        res.status(400).json({ status: 'failure', message: verificationResult.message || 'Payment verification failed.' });
    }
}));


// @desc    Paystack Webhook Listener
// @route   POST /api/bookings/webhook
// @access  Public (Paystack calls this)
router.post('/webhook', asyncHandler(async (req, res) => {
    // It's crucial to verify the webhook signature for security
    const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
    const hash = req.headers['x-paystack-signature'];

    // Verify webhook signature (HIGHLY RECOMMENDED FOR PRODUCTION)
    if (secret && hash) {
        const crypto = require('crypto');
        const expectedHash = crypto.createHmac('sha512', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (hash !== expectedHash) {
            console.warn('Paystack Webhook: Invalid signature', { receivedHash: hash, expectedHash });
            return res.status(401).send('Unauthorized - Invalid Webhook Signature');
        }
    } else {
        console.warn('Paystack Webhook: Webhook secret or signature header missing. Consider adding for security.');
    }

    const event = req.body;
    console.log(`Paystack Webhook Event Received: ${event.event}`);

    // Process only successful charge events
    if (event.event === 'charge.success') {
        const reference = event.data.reference;
        const amountPaid = event.data.amount / 100; // Convert kobo to Naira
        const bookingId = event.data.metadata ? event.data.metadata.booking_id : null;
        const customerEmail = event.data.customer ? event.data.customer.email : null; // Get email from Paystack event

        if (!bookingId) {
            console.error('Paystack Webhook: Missing booking_id in metadata for successful charge.');
            return res.status(400).send('Bad Request: Missing booking ID in metadata');
        }

        // Verify the transaction directly with Paystack (secondary verification)
        const verificationResult = await verifyPayment(reference);

        if (verificationResult.status && verificationResult.data.status === 'success') {
            const booking = await Booking.findById(bookingId).populate('service'); // Populate service for email

            if (!booking) {
                console.error(`Paystack Webhook: Booking with ID ${bookingId} not found.`);
                return res.status(404).send('Booking not found');
            }

            if (booking.paymentStatus === 'Paid') {
                console.log(`Paystack Webhook: Booking ${bookingId} already marked as paid. Ignoring duplicate webhook.`);
                return res.status(200).send('OK - Already paid'); // Important to respond 200 to avoid retries
            }

            // Important: Verify amounts match to prevent fraud
            if (verificationResult.data.amount / 100 !== booking.totalAmount) {
                console.error(`Paystack Webhook: Amount mismatch for booking ${bookingId}. Expected ${booking.totalAmount}, Got ${verificationResult.data.amount / 100}. Paystack Ref: ${reference}`);
                // Update the booking status to 'Amount Mismatch'
                booking.paymentStatus = 'Amount Mismatch - Manual Review';
                booking.paystackRef = reference; // Still save reference
                booking.paidAt = new Date();
                await booking.save();
                return res.status(400).send('Amount Mismatch - Requires attention');
            }

            // Update booking status to Paid
            booking.paymentStatus = 'Paid';
            booking.paystackRef = reference;
            booking.paidAt = new Date();
            // Also update overall status if it's still 'Pending'
            if (booking.status === 'Pending') {
                booking.status = 'Confirmed'; // Or 'Awaiting Admin Confirmation'
            }
            await booking.save();

            // Send confirmation emails (to customer and potentially to admin/spa staff)
            // Use the email from the booking object for consistency, but also fallback to Paystack event email
            const recipientEmail = booking.email || customerEmail;
            if (recipientEmail) {
                await sendBookingConfirmationEmail(recipientEmail, booking); // This email now confirms payment
                await sendPaymentReceiptEmail(recipientEmail, booking, verificationResult.data);
            } else {
                console.warn(`No email found for booking ${bookingId} to send confirmation.`);
            }

            console.log(`Paystack Webhook: Payment successful and booking ${bookingId} updated.`);
            res.status(200).send('OK');

        } else {
            console.error(`Paystack Webhook: Payment verification failed for reference ${reference}. Status: ${verificationResult.data.status || 'N/A'}, Message: ${verificationResult.message || 'N/A'}`);
            // If verification fails, the booking remains 'Pending' (initial state) for payment,
            // or you could set it to 'Failed' here as well.
            // For robustness, it's often better to just log and let the initial booking state persist if no manual intervention.
            res.status(400).send('Payment verification failed');
        }
    } else if (event.event === 'charge.failed') {
        // Handle failed charges - update booking status to 'Failed'
        const reference = event.data.reference;
        const bookingId = event.data.metadata ? event.data.metadata.booking_id : null;
        console.warn(`Paystack Webhook: Charge failed for reference ${reference}. Booking ID: ${bookingId}. Reason: ${event.data.gateway_response}`);

        if (bookingId) {
            const booking = await Booking.findById(bookingId);
            if (booking && booking.paymentStatus === 'Pending') {
                booking.paymentStatus = 'Failed';
                booking.paystackRef = reference; // Store the reference even for failures
                await booking.save();
                console.log(`Booking ${bookingId} status updated to Failed due to charge.failed webhook.`);
            }
        }
        res.status(200).send('OK - Charge failed event processed'); // Always respond 200 to Paystack
    }
    else {
        // Handle other events if necessary (e.g., invoice.create, transfer.success, etc.)
        console.log(`Paystack Webhook: Unhandled event type: ${event.event}`);
        res.status(200).send('OK - Event not processed');
    }
}));


// @desc    GET all bookings (e.g., for an admin dashboard)
// @route   GET /api/bookings
// @access  Private (e.g., requires admin authentication)
router.get('/', asyncHandler(async (req, res) => {
    try {
        // You might want to add pagination, filtering, sorting here
        const bookings = await Booking.find()
            .populate('service', 'name duration price') // Populate service details
            .sort({ createdAt: -1 }); // Latest bookings first
        res.json(bookings);
    } catch (err) {
        res.status(500);
        throw new Error('Server error fetching bookings: ' + err.message);
    }
}));

// @desc    GET a single booking by ID
// @route   GET /api/bookings/:id
// @access  Private (e.g., for admin or specific user)
router.get('/:id', asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('service');

    if (booking) {
        res.json(booking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
}));

// @desc    Update booking status (e.g., for manual admin changes)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
router.put('/:id/status', asyncHandler(async (req, res) => {
    const { paymentStatus, status, notes } = req.body; // Allow updating paymentStatus, overall status, and notes

    const booking = await Booking.findById(req.params.id);

    if (booking) {
        // Only update if provided in the request
        if (paymentStatus !== undefined) {
            booking.paymentStatus = paymentStatus;
        }
        if (status !== undefined) {
            booking.status = status;
        }
        booking.message = notes !== undefined ? notes : booking.message; // Re-using message for notes, consider a separate 'notes' field

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
}));

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
router.delete('/:id', asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        await booking.deleteOne(); // Use deleteOne()
        res.json({ message: 'Booking removed' });
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
}));

module.exports = router;