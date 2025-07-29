// src/data/offersData.js

// Import your local images
import offerImage1 from '../assets/images/foot-detox.jpg'; // Example mapping
import offerImage2 from '../assets/images/full-body-scrub.jpg';
import offerImage3 from '../assets/images/detox-service.jpg';
import offerImage4 from '../assets/images/massage-service.jpg';
import offerImage5 from '../assets/images/steam-bath-service.jpg'; // Using an existing one if available, otherwise add another

export const offers = [
  {
    id: 1,
    title: 'Revitalize Package',
    description: 'Indulge in a rejuvenating 2-hour full body massage, followed by a complimentary detoxifying steam bath. This package is perfectly designed to melt away stress and leave you feeling completely renewed and invigorated.',
    price: 'Starting from N35,000',
    icon: 'fas fa-leaf',
    details: [
      '60-min Swedish/Deep Tissue Massage',
      '60-min Hot Stone Massage',
      '30-min Complimentary Steam Bath',
      'Complimentary Herbal Tea',
    ],
    // Use the imported local image here
    imageUrl: offerImage1
  },
  {
    id: 2,
    title: 'Detox & Glow Program',
    description: 'Experience a comprehensive cleansing with our signature colonic hydrotherapy session, paired with a personalized skin detox facial. This program aims to cleanse your internal system while revitalizing your skin for a radiant glow.',
    price: 'Starting from N50,000',
    icon: 'fas fa-spa',
    details: [
      '1x Colonic Hydrotherapy Session',
      '1x Personalized Detox Facial',
      'Nutritional Guidance Consult',
      'Post-treatment Refreshments',
    ],
    // Use the imported local image here
    imageUrl: offerImage2
  },
  {
    id: 3,
    title: 'Weekend Wellness Escape',
    description: 'Make your weekends special with our exclusive offer! Enjoy 15% off on all spa and wellness services every Saturday and Sunday. Limited slots are available, so book in advance to secure your preferred time.',
    price: '15% Off All Services',
    icon: 'fas fa-percent',
    details: [
      '15% discount on all a la carte services',
      'Valid only on Saturdays and Sundays',
      'Excludes existing packages',
      'Advance booking recommended',
    ],
    // Use the imported local image here
    imageUrl: offerImage3
  },
  {
    id: 4,
    title: 'Couples Retreat',
    description: 'Share the experience of relaxation with your loved one. Our Couples Retreat includes a side-by-side aromatherapy massage, followed by a romantic jacuzzi session and champagne. A perfect way to reconnect.',
    price: 'Starting from N70,000',
    icon: 'fas fa-heart',
    details: [
      '90-min Couples Aromatherapy Massage',
      '30-min Private Jacuzzi Session',
      'Complimentary Sparkling Wine & Chocolates',
      'Relaxation Lounge Access',
    ],
    // Use the imported local image here
    imageUrl: offerImage4
  },
  {
    id: 5,
    title: 'Post-Workout Recovery',
    description: 'Designed for athletes and fitness enthusiasts, this package focuses on muscle recovery and deep relaxation. It includes a sports massage and cryotherapy session to help your body bounce back faster.',
    price: 'Starting from N40,000',
    icon: 'fas fa-dumbbell',
    details: [
      '60-min Sports Recovery Massage',
      '1x Cryotherapy Session',
      'Hydration Therapy',
      'Expert Consultation on Recovery',
    ],
    // Using another imported image. Please ensure you have 'hero-bg.jpg' or replace with another relevant image.
    imageUrl: offerImage5
  },
];