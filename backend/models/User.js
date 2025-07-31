// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Example minimum length
    },
    phone: {
        type: String,
        trim: true,
        // You can add validation for phone number format if needed
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'staff'], // Example roles
        default: 'customer'
    },
    // Add any other user-related fields like address, preferences, etc.
}, { timestamps: true });

// --- Password Hashing Middleware ---
// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- Method to compare entered password with hashed password ---
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);