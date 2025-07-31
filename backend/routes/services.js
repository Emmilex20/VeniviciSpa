// backend/routes/services.js

const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Import the Service model

// GET all services
// GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new service (Admin functionality, for initial seeding or later UI)
// POST /api/services
router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    price: req.body.price,
    iconClass: req.body.iconClass
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;