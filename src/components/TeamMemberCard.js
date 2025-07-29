// src/components/TeamMemberCard.js
import React from 'react';
import { motion } from 'framer-motion';

const TeamMemberCard = ({ member, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col justify-between"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div>
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-veniviciGreen/50 shadow-md"
        />
        <h3 className="text-xl font-semibold text-veniviciDark mb-1">{member.name}</h3>
        <p className="text-veniviciGreen text-md font-medium mb-3">{member.title}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
      </div>
      {member.social && (
        <div className="mt-4 flex justify-center space-x-4 text-veniviciDark">
          {member.social.facebook && <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Facebook`}><i className="fab fa-facebook-f text-xl hover:text-veniviciGreen transition-colors duration-200"></i></a>}
          {member.social.instagram && <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Instagram`}><i className="fab fa-instagram text-xl hover:text-veniviciGreen transition-colors duration-200"></i></a>}
          {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}><i className="fab fa-linkedin-in text-xl hover:text-veniviciGreen transition-colors duration-200"></i></a>}
        </div>
      )}
    </motion.div>
  );
};

export default TeamMemberCard;