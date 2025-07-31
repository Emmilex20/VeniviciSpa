// backend/models/Service.js

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Service names should ideally be unique
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: { // e.g., "30 min", "60 min", "2 hours"
    type: String,
    required: true,
    trim: true
  },
  price: { // Optional: You might want to add a price
    type: Number,
    min: 0
  },
  iconClass: { // For Font Awesome icons on the frontend
    type: String,
    default: 'fas fa-spa' // Default icon if none provided
  },
   category: {
     type: String,
    enum: ['Massage', 'Physiotherapy', 'Hydrotherapy'],
   required: false
   }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;