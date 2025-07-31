// backend/server.js

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const serviceRoutes = require('./routes/services');
const bookingRoutes = require('./routes/bookings'); // This will contain all booking and webhook logic

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS Configuration ---
const allowedOrigins = [
    'http://localhost:3000',           // For local frontend development
    'https://venivici-spa.vercel.app',  // For your Vercel-hosted frontend
    'https://venivici-mbi081qu0-emmanuel-raphaels-projects.vercel.app'
    // Add your final production frontend URLs here when deployed, e.g.:
    // 'https://www.venivici.com',
    // 'https://venivici.com'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        // or requests from the same origin (e.g., if backend and frontend are on the same domain)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin: ' + origin;
            callback(new Error(msg), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow cookies to be sent
}));

// Body parser for JSON requests (important for API calls)
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing server status
app.get('/', (req, res) => {
    res.send('Venivici Spa Backend API is running!');
});

// Use API routes
app.use('/api/services', serviceRoutes); // Services API endpoints
app.use('/api/bookings', bookingRoutes); // Bookings API endpoints (includes initial booking and payment initiation)

// Error Handling Middleware (MUST be placed after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console for debugging
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If a response status was already set (e.g., 400, 404), use it; otherwise, default to 500 (Internal Server Error)
    res.status(statusCode).json({
        message: err.message,
        // In development, send the stack trace for easier debugging
        // In production, you might want to remove 'stack' for security reasons
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Current Time: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })}`);
    console.log(`Location: Lekki, Lagos, Nigeria`);
});