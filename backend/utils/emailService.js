const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure dotenv is configured here as well

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'Outlook365', 'SendGrid', or direct SMTP
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
    // Optional: add secure: true if using a custom SMTP server over SSL/TLS
    // tls: {
    //     rejectUnauthorized: false // Use this ONLY if you're encountering issues with self-signed certs (not recommended for production)
    // }
});

const sendBookingConfirmationEmail = async (toEmail, booking) => {
    // This email is specifically for confirmed (paid) bookings
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Venivici Health Club & Urban Spa: Your Booking is Confirmed!',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #1a4f32;">Your Booking is Confirmed!</h1>
                <p>Dear ${booking.firstName || 'Customer'},</p>
                <p>We are delighted to confirm your booking at Venivici Health Club & Urban Spa.</p>
                <p><b>Service:</b> <span style="color: #007bff; font-weight: bold;">${booking.serviceName}</span></p>
                <p><b>Date:</b> <span style="font-weight: bold;">${new Date(booking.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                <p><b>Time:</b> <span style="font-weight: bold;">${booking.selectedTimeSlot}</span></p>
                <p><b>Total Amount:</b> <span style="font-weight: bold; color: #1a4f32;">₦${booking.totalAmount.toLocaleString()}</span></p>
                <p><b>Booking ID:</b> <span style="font-weight: bold;">${booking._id}</span></p>
                <p><b>Payment Status:</b> <span style="font-weight: bold; color: #28a745;">Paid</span></p>
                <p style="color: #28a745; font-weight: bold;">Thank you for your successful payment!</p>
                ${booking.message ? `<p><b>Your Message:</b> ${booking.message}</p>` : ''}
                <p>We look forward to providing you with an exceptional experience!</p>
                <p style="margin-top: 20px;">Best regards,<br/>The Venivici Team</p>
                <img src="https://venivici.com/images/logo.png" alt="Venivici Logo" style="width: 100px; margin-top: 20px;">
                <p style="font-size: 0.8em; color: #777;">Venivici Health Club & Urban Spa<br/>Lekki, Lagos, Nigeria</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Booking confirmation (Paid) email sent to ${toEmail} for booking ${booking._id}`);
    } catch (error) {
        console.error(`Error sending booking confirmation (Paid) email to ${toEmail} for booking ${booking._id}:`, error);
    }
};

const sendPaymentReceiptEmail = async (toEmail, booking, transactionData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Venivici Health Club & Urban Spa: Your Payment Receipt',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #1a4f32;">Payment Receipt</h1>
                <p>Dear ${booking.firstName || 'Customer'},</p>
                <p>Thank you for your payment for booking ID <b>${booking._id}</b>.</p>
                <p><b>Service:</b> <span style="color: #007bff; font-weight: bold;">${booking.serviceName}</span></p>
                <p><b>Date:</b> <span style="font-weight: bold;">${new Date(booking.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                <p><b>Time:</b> <span style="font-weight: bold;">${booking.selectedTimeSlot}</span></p>
                <p><b>Amount Paid:</b> <span style="font-weight: bold; color: #1a4f32;">₦${(transactionData.amount / 100).toLocaleString()}</span></p>
                <p><b>Paystack Reference:</b> <span style="font-weight: bold;">${transactionData.reference}</span></p>
                <p><b>Transaction Date:</b> <span style="font-weight: bold;">${new Date(transactionData.paid_at).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span></p>
                <p style="color: #28a745; font-weight: bold; margin-top: 20px;">Your payment has been successfully processed, and your booking is fully confirmed!</p>
                <p>We look forward to welcoming you.</p>
                <p style="margin-top: 20px;">Best regards,<br/>The Venivici Team</p>
                <img src="https://venivici.com/images/logo.png" alt="Venivici Logo" style="width: 100px; margin-top: 20px;">
                <p style="font-size: 0.8em; color: #777;">Venivici Health Club & Urban Spa<br/>Lekki, Lagos, Nigeria</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Payment receipt email sent to ${toEmail} for booking ${booking._id}`);
    } catch (error) {
        console.error(`Error sending payment receipt email to ${toEmail} for booking ${booking._id}:`, error);
    }
};

const sendPendingPaymentEmail = async (toEmail, booking) => {
    // This email is specifically for bookings where payment is pending (Pay Later)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Venivici Health Club & Urban Spa: Your Booking Request (Payment Pending)',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h1 style="color: #ffc107;">Your Booking is Confirmed, Payment Pending!</h1>
                <p>Dear ${booking.firstName || 'Customer'},</p>
                <p>Thank you for booking <b>${booking.serviceName}</b> on <b>${new Date(booking.selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> at <b>${booking.selectedTimeSlot}</b>.</p>
                <p><b>Booking ID:</b> <span style="font-weight: bold;">${booking._id}</span></p>
                <p><b>Total Amount Due:</b> <span style="font-weight: bold; color: #1a4f32;">₦${booking.totalAmount.toLocaleString()}</span></p>
                <p style="color: #ffc107; font-weight: bold;">Your payment for this booking is currently PENDING.</p>
                <p>Please ensure payment is completed before your appointment date to avoid cancellation. You will be able to pay in person at the spa, or follow up on your booking details.</p>
                ${booking.message ? `<p><b>Your Message:</b> ${booking.message}</p>` : ''}
                <p>If you have any questions, please contact us directly.</p>
                <p style="margin-top: 20px;">We look forward to seeing you!</p>
                <p>Best regards,<br/>The Venivici Team</p>
                <img src="https://venivici.com/images/logo.png" alt="Venivici Logo" style="width: 100px; margin-top: 20px;">
                <p style="font-size: 0.8em; color: #777;">Venivici Health Club & Urban Spa<br/>Lekki, Lagos, Nigeria</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Pending payment email sent to ${toEmail} for booking ${booking._id}`);
    } catch (error) {
        console.error(`Error sending pending payment email to ${toEmail} for booking ${booking._id}:`, error);
    }
};

module.exports = { sendBookingConfirmationEmail, sendPaymentReceiptEmail, sendPendingPaymentEmail };