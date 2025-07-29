// src/data/testimonialsData.js
import client1Img from '../assets/images/client1.jpg'; // Ensure these paths are correct
import client2Img from '../assets/images/client2.jpg';
import client3Img from '../assets/images/client3.jpg';


export const testimonials = [
  {
    id: 1,
    name: 'Chioma Okoro',
    location: 'Lekki, Lagos',
    quote: 'Venivici is my sanctuary! The full body massage relieved all my stress, and the staff are incredibly professional and attentive. Highly recommend!',
    rating: 5,
    image: client1Img,
  },
  {
    id: 2,
    name: 'Tunde Adebayo',
    location: 'Victoria Island, Lagos',
    quote: 'I came for the colonic hydrotherapy and was impressed by the discreet and hygienic environment. I feel lighter and more energetic. A truly transformative experience.',
    rating: 5,
    image: client2Img,
  },
  {
    id: 3,
    name: 'Nneka Eze',
    location: 'Ikoyi, Lagos',
    quote: 'The herbal steam bath was incredibly refreshing. I love the natural approach to wellness at Venivici. It’s a hidden gem. My skin felt amazing afterwards!',
    rating: 4,
    image: client3Img,
  },
  {
    id: 4,
    name: 'Obioma Chukwu',
    location: 'Ajah, Lagos',
    quote: 'The foot detox was exactly what I needed after a long week. The service was impeccable, and I left feeling completely revitalized. Such a peaceful place.',
    rating: 5,
    image: null, // Example: client opted not to show image
  },
  {
    id: 5,
    name: 'Amara Nduka',
    location: 'Oniru, Lagos',
    quote: 'I frequently visit for the full body scrub. It leaves my skin incredibly soft and glowing. The attention to detail here is unmatched. Best spa experience in Lagos.',
    rating: 5,
    image: client1Img, // Reusing placeholder, replace with unique image if available
  },
];