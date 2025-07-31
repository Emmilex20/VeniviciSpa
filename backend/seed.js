// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service'); // Adjust path if needed

const servicesToSeed = [
    {
        name: 'Post Surgery Rehabilitation',
        description: 'Necessary for a variety of surgical procedures including orthopaedic, cardiac, thoracic, neurological and abdominal surgery.',
        duration: '30 min',
        iconClass: 'fas fa-hospital-user',
        price: 50000
    },
    {
        name: 'Paediatric Physiotherapy',
        description: 'Our paediatric physiotherapists help children to achieve their optimal physical development.',
        duration: '30 min',
        iconClass: 'fas fa-child',
        price: 45000
    },
    {
        name: 'Acupuncture',
        description: 'A type of traditional Chinese medicine in which thin needles are inserted into the body.',
        duration: '30 min',
        iconClass: 'fas fa-syringe',
        price: 60000
    },
    {
        id: 'lower_back_pain',
        name: 'Lower Back Pain',
        description: 'Lower back pain can result from a strain (injury) to muscles or tendons in the back.',
        duration: '30 min',
        iconClass: 'fas fa-dumbbell',
        price: 40000
    },
    {
        id: 'neck_pain',
        name: 'Neck Pain',
        description: 'Pain in the neck and shoulder that varies in intensity, and may feel achy or like an electric shock from the neck to the arm.',
        duration: '30 min',
        iconClass: 'fas fa-head-side-mask',
        price: 40000
    },
    {
        id: 'something_else',
        name: 'Something Else',
        description: 'Please specify your needs in the additional notes section of the form.',
        duration: '30 min',
        iconClass: 'fas fa-hands-helping',
        price: 35000
    },
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected for seeding!');
        try {
            // Optional: Clear existing services before seeding to prevent duplicates
            await Service.deleteMany({});
            console.log('Existing services cleared.');

            await Service.insertMany(servicesToSeed);
            console.log('Services seeded successfully!');
        } catch (err) {
            console.error('Error seeding services:', err);
        } finally {
            mongoose.connection.close();
            console.log('MongoDB connection closed.');
        }
    })
    .catch(err => console.error('MongoDB connection error during seeding:', err));