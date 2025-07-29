// src/components/BlogPostCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const BlogPostCard = ({ post, index }) => {
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
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-56 object-cover object-center"
      />
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-2">
            {post.date} &bull; {post.readTime}
          </p>
          <h3 className="text-xl font-semibold text-veniviciDark mb-3">
            <Link
              to={`/blog/${post.slug}`}
              className="hover:text-veniviciGreen transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h3>
          <p className="text-gray-700 text-base mb-4 flex-grow leading-relaxed">
            {post.excerpt}
          </p>
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="text-veniviciGreen font-semibold hover:underline mt-auto self-start flex items-center"
        >
          Read More <i className="fas fa-arrow-right ml-2 text-sm"></i>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;