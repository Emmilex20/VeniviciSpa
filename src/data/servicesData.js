// src/data/servicesData.js
import massageImg from '../assets/images/massage-service.jpg';
import steamBathImg from '../assets/images/steam-bath-service.jpg';
import fullBodyScrub from '../assets/images/full-body-scrub.jpg';
import footDetox from '../assets/images/foot-detox.jpg';
import colonicImg from '../assets/images/colonic-service.jpg'; // Assuming you have this image

export const services = [
  {
    id: 'full-body-massage',
    title: 'Full Body Massage', // Changed 'name' to 'title' for consistency with modal
    shortDescription: 'Melt away tension with our soothing full body massage.',
    description: 'Our expert therapists use a blend of techniques to relieve muscle tension, improve circulation, and promote deep relaxation. Choose from Swedish, deep tissue, or hot stone massage for a truly personalized experience.', // Changed 'longDescription' to 'description'
    imageUrl: massageImg, // Changed 'image' to 'imageUrl'
    price: 'From NGN 25,000',
    duration: '60-90 mins',
    benefits: [ // Added a benefits array
      'Reduces muscle tension and soreness',
      'Improves blood circulation',
      'Promotes deep relaxation and stress relief',
      'Enhances flexibility and range of motion',
      'Boosts mood and overall well-being',
    ],
  },
  {
    id: 'colonic-hydrotherapy',
    title: 'Colonic Hydrotherapy',
    shortDescription: 'Gentle cleansing for digestive health and detoxification.',
    description: 'Experience the benefits of colon hydrotherapy, a gentle and effective way to cleanse the colon, remove accumulated waste, and support overall digestive wellness. Performed by certified specialists in a private, comfortable setting. This process can significantly improve digestive health, boost energy levels, reduce bloating, and enhance overall well-being. Our therapists use state-of-the-art equipment and maintain the highest standards of hygiene and comfort.',
    imageUrl: colonicImg,
    price: 'From NGN 30,000',
    duration: '45-60 mins',
    benefits: [
      'Removes toxins from the colon',
      'Improves digestion and nutrient absorption',
      'Alleviates constipation and bloating',
      'Boosts energy levels and mental clarity',
      'Supports a healthy immune system',
    ],
  },
  {
    id: 'herbal-steam-bath',
    title: 'Herbal Steam Bath',
    shortDescription: 'Detoxify and relax in our aromatic herbal steam bath.',
    description: 'Immerse yourself in our therapeutic herbal steam bath, designed to open pores, eliminate toxins, and soothe the respiratory system. Infused with natural herbs for enhanced relaxation and healing, it helps with respiratory issues and leaves your skin feeling refreshed.',
    imageUrl: steamBathImg,
    price: 'From NGN 15,000',
    duration: '30 mins',
    benefits: [
      'Deep detoxification through sweat',
      'Opens pores and cleanses skin',
      'Relieves respiratory congestion',
      'Promotes relaxation and stress reduction',
      'Improves circulation',
    ],
  },
  {
    id: 'full-body-scrub',
    title: 'Full Body Scrub',
    shortDescription: 'Exfoliate and revitalize your skin for a healthy glow.',
    description: 'Reveal smooth, radiant skin with our invigorating full body scrub. Using natural exfoliants like sea salt or sugar, this treatment removes dead skin cells, stimulates blood flow, and deeply moisturizes, leaving your skin feeling incredibly soft and supple.',
    imageUrl: fullBodyScrub,
    price: 'From NGN 20,000',
    duration: '45 mins',
    benefits: [
      'Removes dead skin cells for smoother skin',
      'Improves skin texture and appearance',
      'Boosts circulation and lymphatic drainage',
      'Prepares skin for better lotion absorption',
      'Promotes a healthy, radiant glow',
    ],
  },
  {
    id: 'foot-detox',
    title: 'Foot Detox',
    shortDescription: 'Rejuvenate tired feet and promote overall wellness.',
    description: 'Our foot detox service helps draw out toxins from the body through the feet using specialized baths and techniques. It promotes relaxation, reduces swelling in the feet and ankles, and can improve overall energy levels. A perfect way to relieve stress and discomfort after a long day.',
    imageUrl: footDetox,
    price: 'From NGN 10,000',
    duration: '30 mins',
    benefits: [
      'Aids in toxin removal from the body',
      'Reduces foot and ankle swelling',
      'Relieves stress and promotes relaxation',
      'Improves circulation in the lower extremities',
      'Boosts overall energy and well-being',
    ],
  },
  // Add more services as needed, following this structure
];