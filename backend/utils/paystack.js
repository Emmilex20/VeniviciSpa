// utils/paystack.js
const https = require('https');
require('dotenv').config(); // Load environment variables

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
// Add your callback URL here or load from .env
const PAYSTACK_CALLBACK_URL = process.env.PAYSTACK_CALLBACK_URL || 'YOUR_FRONTEND_BOOKING_CONFIRMATION_URL';

const initializePayment = (email, amount, booking_id) => {
    return new Promise((resolve, reject) => {
        // Generate a unique reference. It's good practice to make this more robust.
        // Using booking_id + timestamp is a common pattern.
        const reference = `booking_${booking_id}_${Date.now()}`;

        const params = JSON.stringify({
            "email": email,
            "amount": amount, // Amount in kobo (e.g., 1000000 for NGN 10,000)
            "reference": reference, // ADDED: Unique transaction reference
            "metadata": {
                "booking_id": booking_id // Pass your booking ID for webhook
            },
            "channels": ["card", "bank_transfer", "ussd"], // Specify payment channels
            "callback_url": PAYSTACK_CALLBACK_URL, // ADDED: URL for redirection after payment
            "currency": "NGN" // ADDED (Good practice for clarity, although often default)
        });

        console.log("Paystack Init Params:", params); // Log parameters for debugging

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': params.length // Crucial for Node's https module POST requests
            }
        };

        const req = https.request(options, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log("Paystack Init Response Status:", res.statusCode);
                console.log("Paystack Init Response Data:", data);
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (e) {
                    console.error("Failed to parse Paystack response:", data, e);
                    reject(new Error("Failed to parse Paystack response."));
                }
            });
        }).on('error', error => {
            console.error("Paystack Init Request Error:", error);
            reject(error);
        });

        req.write(params);
        req.end();
    });
};

const verifyPayment = (reference) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: `/transaction/verify/${encodeURIComponent(reference)}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        };

        const req = https.request(options, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log("Paystack Verify Response Status:", res.statusCode);
                console.log("Paystack Verify Response Data:", data);
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (e) {
                    console.error("Failed to parse Paystack verification response:", data, e);
                    reject(new Error("Failed to parse Paystack verification response."));
                }
            });
        }).on('error', error => {
            console.error("Paystack Verify Request Error:", error);
            reject(error);
        });
        req.end();
    });
};

module.exports = { initializePayment, verifyPayment };