// src/pages/Gallery.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// Import local images if you prefer, or keep external URLs if they are reliable
// Example:
// import gallery1 from '../assets/images/gallery/gallery1.jpg';
// import gallery2 from '../assets/images/gallery/gallery2.jpg';
// etc. (Remember to create these files in src/assets/images/gallery/)

const galleryImages = [
  // Using placeholder images for demonstration. Replace with your actual, high-quality images.
  // IMPORTANT: For best performance and reliability, consider hosting these images locally
  // within your project (e.g., in src/assets/images/gallery/) or using a dedicated CDN.
  // These Googleusercontent URLs are not guaranteed to be stable for production use.
  { src: 'https://static.vecteezy.com/system/resources/previews/046/123/408/non_2x/relaxing-spa-setting-with-soft-lighting-and-massage-tables-cozy-interior-in-japanese-style-concept-of-spa-treatments-massage-room-relaxation-and-interior-design-photo.jpeg', category: 'Interiors', alt: 'Luxury spa interior' },
  { src: 'https://media.istockphoto.com/id/637136284/photo/massage-bed-at-spa-centre.jpg?s=612x612&w=0&k=20&c=0nk80kYzxLN5GPBxdk1BNn3WXPYis5DtAVag6UYffD4=', category: 'Treatment Rooms', alt: 'Serene treatment room' },
  { src: 'https://media.istockphoto.com/id/1396686399/photo/reception-area-of-modern-spa-with-reception-desk-potted-plants-decorative-objects-and-marble.jpg?s=612x612&w=0&k=20&c=AY7pitkD1y8W0vc9Rm5dLnsfFH4q36e-E9AMnJLnghk=', category: 'Reception', alt: 'Modern spa reception' },
  { src: 'https://img.freepik.com/free-photo/indoor-swimming-pool_23-2147687650.jpg?semt=ais_hybrid&w=740', category: 'Facilities', alt: 'Indoor swimming pool' },
  { src: 'https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=', category: 'Interiors', alt: 'Spa lounge area' },
  { src: 'https://www.massagewarehouse.co.uk/cdn/shop/articles/massage_treatment_room_inspiration_design_ideas_2500x.jpg?v=1557495359', category: 'Treatment Rooms', alt: 'Massage room setup' },
  { src: 'https://img.freepik.com/free-photo/minimalist-office-interior-design_23-2151826280.jpg?semt=ais_hybrid&w=740', category: 'Reception', alt: 'Welcoming reception desk' },
  { src: 'https://img.freepik.com/free-photo/fashion-portrait-caucasian-woman-bikini-blue-swimming-pool-vacation-coudy-day-natural-light_343596-2316.jpg?semt=ais_hybrid&w=740', category: 'Facilities', alt: 'Poolside relaxation' },
  { src: 'https://media.istockphoto.com/id/1357705422/photo/luxury-spa-massage-room-interior-with-massage-tables-hot-tub-and-marble-floor.jpg?s=612x612&w=0&k=20&c=spSLgcy-iTCM5yDvI-3pxMnXyL91wjCm-7oBcGwZO6Q=', category: 'Interiors', alt: 'Elegant spa corridor' },
  { src: 'https://images.all-free-download.com/images/graphiclarge/spa_room_513324.jpg', category: 'Treatment Rooms', alt: 'Private treatment room' },
  { src: 'https://static.vecteezy.com/system/resources/thumbnails/056/496/194/small/luxurious-spa-reception-area-with-warm-lighting-photo.jpg', category: 'Reception', alt: 'Spa entrance' },
  { src: 'https://www.oxpasturehallhotel.com/uploads/images/PanelImages/General/SWIMING_POOL_1.jpeg', category: 'Facilities', alt: 'Indoor pool view' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  // Dynamically get categories from images and ensure 'All' is first
  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Explore Venivici Health Club & Urban Spa</title>
        <meta name="description" content="View stunning images of Venivici Health Club & Urban Spa facilities, including luxurious interiors, serene treatment rooms, and relaxing amenities in Lekki, Lagos." />
        <meta property="og:title" content="Venivici Spa - Gallery" />
        <meta property="og:description" content="A visual tour of our luxurious health club and urban spa." />
        <meta property="og:image" content="https://venivici.com/images/gallery-social.jpg" /> {/* Replace with an actual image URL */}
        <meta property="og:url" content="https://venivici.com/gallery" /> {/* Replace with your actual website URL */}
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants} // Apply container variants here
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 px-4 sm:px-6 lg:px-8 bg-veniviciLightGray min-h-screen"
      >
        <div className="container mx-auto">
          {/* Hero Section for Gallery */}
          <motion.div variants={itemVariants} className="text-center mb-16 pt-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-veniviciGreen mb-4 font-bold">
              Our Visual Journey
            </h1>
            <p className="text-lg sm:text-xl text-veniviciDark max-w-3xl mx-auto leading-relaxed">
              Step inside and immerse yourself in the luxurious ambiance and serene spaces of Venivici Health Club & Urban Spa. Every image tells a story of tranquility and wellness.
            </p>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out
                  ${filter === cat
                    ? 'bg-veniviciGreen text-white shadow-lg transform scale-105'
                    : 'bg-white text-veniviciDark hover:bg-veniviciGreen/10 border border-gray-300 hover:border-veniviciGreen'
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Image Grid with enhanced styling and hover effects */}
          <motion.div
            variants={containerVariants} // Stagger children animation for images
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <motion.div
                  key={image.src} // Use image.src as key, assuming unique URLs
                  variants={itemVariants} // Apply item variants to each image card
                  className="relative overflow-hidden rounded-xl shadow-xl group cursor-pointer bg-white border border-gray-100
                             transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 sm:h-72 object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay for alt text on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold mb-1">{image.alt}</p>
                    <p className="text-gray-300 text-sm">{image.category}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="col-span-full text-center text-xl text-veniviciDark py-10"
              >
                No images found for this category.
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Gallery;