// src/data/treatmentsData.js

// Import your local images
import massageImg from '../assets/images/massage-service.jpg';
import steamBathImg from '../assets/images/steam-bath-service.jpg';
import fullBodyScrub from '../assets/images/full-body-scrub.jpg';
import footDetox from '../assets/images/foot-detox.jpg';
import colonicImg from '../assets/images/colonic-service.jpg';
// Assuming you have images for offers as well, use specific names or repurpose existing ones
import offerImage1 from '../assets/images/foot-detox.jpg'; // Example, ideally new images for offers
import offerImage2 from '../assets/images/full-body-scrub.jpg';
import offerImage3 from '../assets/images/detox-service.jpg'; // Placeholder - create this image
import offerImage4 from '../assets/images/massage-service.jpg';
import offerImage5 from '../assets/images/steam-bath-service.jpg';


export const treatments = [
  // --- Individual Services ---
  {
    id: 'full-body-massage',
    type: 'service', // New field to categorize
    title: 'Full Body Massage',
    shortDescription: 'Melt away tension with our soothing full body massage.',
    description: 'Our expert therapists use a blend of techniques to relieve muscle tension, improve circulation, and promote deep relaxation. Choose from Swedish, deep tissue, or hot stone massage for a truly personalized experience.',
    imageUrl: massageImg,
    price: 'From NGN 25,000',
    duration: '60-90 mins', // Specific to services
    inclusions: [ // Renamed 'benefits' to 'inclusions' for consistency
      'Reduces muscle tension and soreness',
      'Improves blood circulation',
      'Promotes deep relaxation and stress relief',
      'Enhances flexibility and range of motion',
      'Boosts mood and overall well-being',
    ],
  },
  {
    id: 'colonic-hydrotherapy',
    type: 'service',
    title: 'Colonic Hydrotherapy',
    shortDescription: 'Gentle cleansing for digestive health and detoxification.',
    description: 'Experience the benefits of colon hydrotherapy, a gentle and effective way to cleanse the colon, remove accumulated waste, and support overall digestive wellness. Performed by certified specialists in a private, comfortable setting. This process can significantly improve digestive health, boost energy levels, reduce bloating, and enhance overall well-being. Our therapists use state-of-the-art equipment and maintain the highest standards of hygiene and comfort.',
    imageUrl: colonicImg,
    price: 'From NGN 30,000',
    duration: '45-60 mins',
    inclusions: [
      'Removes toxins from the colon',
      'Improves digestion and nutrient absorption',
      'Alleviates constipation and bloating',
      'Boosts energy levels and mental clarity',
      'Supports a healthy immune system',
    ],
  },
  {
    id: 'herbal-steam-bath',
    type: 'service',
    title: 'Herbal Steam Bath',
    shortDescription: 'Detoxify and relax in our aromatic herbal steam bath.',
    description: 'Immerse yourself in our therapeutic herbal steam bath, designed to open pores, eliminate toxins, and soothe the respiratory system. Infused with natural herbs for enhanced relaxation and healing, it helps with respiratory issues and leaves your skin feeling refreshed.',
    imageUrl: steamBathImg,
    price: 'From NGN 15,000',
    duration: '30 mins',
    inclusions: [
      'Deep detoxification through sweat',
      'Opens pores and cleanses skin',
      'Relieves respiratory congestion',
      'Promotes relaxation and stress reduction',
      'Improves circulation',
    ],
  },
  {
    id: 'full-body-scrub',
    type: 'service',
    title: 'Full Body Scrub',
    shortDescription: 'Exfoliate and revitalize your skin for a healthy glow.',
    description: 'Reveal smooth, radiant skin with our invigorating full body scrub. Using natural exfoliants like sea salt or sugar, this treatment removes dead skin cells, stimulates blood flow, and deeply moisturizes, leaving your skin feeling incredibly soft and supple.',
    imageUrl: fullBodyScrub,
    price: 'From NGN 20,000',
    duration: '45 mins',
    inclusions: [
      'Removes dead skin cells for smoother skin',
      'Improves skin texture and appearance',
      'Boosts circulation and lymphatic drainage',
      'Prepares skin for better lotion absorption',
      'Promotes a healthy, radiant glow',
    ],
  },
  {
    id: 'foot-detox',
    type: 'service',
    title: 'Foot Detox',
    shortDescription: 'Rejuvenate tired feet and promote overall wellness.',
    description: 'Our foot detox service helps draw out toxins from the body through the feet using specialized baths and techniques. It promotes relaxation, reduces swelling in the feet and ankles, and can improve overall energy levels. A perfect way to relieve stress and discomfort after a long day.',
    imageUrl: footDetox,
    price: 'From NGN 10,000',
    duration: '30 mins',
    inclusions: [
      'Aids in toxin removal from the body',
      'Reduces foot and ankle swelling',
      'Relieves stress and promotes relaxation',
      'Improves circulation in the lower extremities',
      'Boosts overall energy and well-being',
    ],
  },

  // --- Special Offers / Packages ---
  {
    id: 'revitalize-package-offer', // Changed ID to avoid conflict with service if same title
    type: 'offer', // New field
    title: 'Revitalize Package',
    description: 'Indulge in a rejuvenating 2-hour full body massage, followed by a complimentary detoxifying steam bath. This package is perfectly designed to melt away stress and leave you feeling completely renewed and invigorated.',
    price: 'Starting from N35,000',
    icon: 'fas fa-leaf', // Specific to offers/packages
    inclusions: [ // Renamed 'details' to 'inclusions' for consistency
      '60-min Swedish/Deep Tissue Massage',
      '60-min Hot Stone Massage',
      '30-min Complimentary Steam Bath',
      'Complimentary Herbal Tea',
    ],
    imageUrl: offerImage1
  },
  {
    id: 'detox-glow-program',
    type: 'offer',
    title: 'Detox & Glow Program',
    description: 'Experience a comprehensive cleansing with our signature colonic hydrotherapy session, paired with a personalized skin detox facial. This program aims to cleanse your internal system while revitalizing your skin for a radiant glow.',
    price: 'Starting from N50,000',
    icon: 'fas fa-spa',
    inclusions: [
      '1x Colonic Hydrotherapy Session',
      '1x Personalized Detox Facial',
      'Nutritional Guidance Consult',
      'Post-treatment Refreshments',
    ],
    imageUrl: offerImage2
  },
  {
    id: 'weekend-wellness-escape',
    type: 'offer',
    title: 'Weekend Wellness Escape',
    description: 'Make your weekends special with our exclusive offer! Enjoy 15% off on all spa and wellness services every Saturday and Sunday. Limited slots are available, so book in advance to secure your preferred time.',
    price: '15% Off All Services',
    icon: 'fas fa-percent',
    inclusions: [
      '15% discount on all a la carte services',
      'Valid only on Saturdays and Sundays',
      'Excludes existing packages',
      'Advance booking recommended',
    ],
    imageUrl: offerImage3
  },
  {
    id: 'couples-retreat',
    type: 'offer',
    title: 'Couples Retreat',
    description: 'Share the experience of relaxation with your loved one. Our Couples Retreat includes a side-by-side aromatherapy massage, followed by a romantic jacuzzi session and champagne. A perfect way to reconnect.',
    price: 'Starting from N70,000',
    icon: 'fas fa-heart',
    inclusions: [
      '90-min Couples Aromatherapy Massage',
      '30-min Private Jacuzzi Session',
      'Complimentary Sparkling Wine & Chocolates',
      'Relaxation Lounge Access',
    ],
    imageUrl: offerImage4
  },
  {
    id: 'post-workout-recovery',
    type: 'offer',
    title: 'Post-Workout Recovery',
    description: 'Designed for athletes and fitness enthusiasts, this package focuses on muscle recovery and deep relaxation. It includes a sports massage and cryotherapy session to help your body bounce back faster.',
    price: 'Starting from N40,000',
    icon: 'fas fa-dumbbell',
    inclusions: [
      '60-min Sports Recovery Massage',
      '1x Cryotherapy Session',
      'Hydration Therapy',
      'Expert Consultation on Recovery',
    ],
    imageUrl: offerImage5
  },
];