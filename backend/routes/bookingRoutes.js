// routes/bookingRoutes.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// @desc    SINGLE DYNAMIC TEST ROUTE
// @route   POST /api/bookings/:id/final-test
// @access  Public
router.post('/:id/final-test', asyncHandler(async (req, res) => {
    console.log('--- Backend: HIT /api/bookings/:id/final-test route (Isolated Test) ---');
    console.log('Backend: Final Test ID:', req.params.id);
    console.log('Backend: Request body:', req.body);
    res.status(200).json({
        message: `Final isolated test route hit for ID: ${req.params.id}`,
        receivedId: req.params.id
    });
}));

module.exports = router;