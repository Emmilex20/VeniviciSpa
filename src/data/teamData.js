// src/data/teamData.js
import teamMember1 from '../assets/images/team/team-member1.jpg'; // Ensure paths are correct
import teamMember2 from '../assets/images/team/team-member2.jpg';
import teamMember3 from '../assets/images/team/team-member3.jpg';

export const teamMembers = [
  {
    id: 1,
    name: 'Dr. Aisha Bello',
    title: 'Lead Wellness Director',
    image: teamMember1,
    bio: 'Dr. Aisha brings over 15 years of experience in holistic wellness and detox therapies. Her passion lies in guiding clients towards optimal health and a balanced lifestyle.',
    social: {
      linkedin: 'https://linkedin.com/in/aishabello',
    },
  },
  {
    id: 2,
    name: 'Mr. Femi Oladele',
    title: 'Senior Massage Therapist',
    image: teamMember2,
    bio: 'Femi specializes in deep tissue and therapeutic massages, helping clients alleviate chronic pain, improve mobility, and achieve deep relaxation.',
    social: {
      instagram: 'https://instagram.com/femitouch',
    },
  },
  {
    id: 3,
    name: 'Ms. Nkechi Eze',
    title: 'Hydrotherapy Specialist',
    image: teamMember3,
    bio: 'Nkechi is a certified hydrotherapy specialist with a gentle approach, ensuring a comfortable and effective experience for all her clients.',
    social: {
      facebook: 'https://facebook.com/nkechi.hydro',
    },
  },
  // Add more team members as needed
];