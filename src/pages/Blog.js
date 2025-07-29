// src/pages/Blog.js
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import BlogPostCard from '../components/BlogPostCard';
import { blogPosts } from '../data/blogPostsData';
import AnimatedButton from '../components/AnimatedButton'; // Assuming you have this component

// Import an image for the blog page hero section (optional, but enhances visual appeal)
import blogHeroImg from '../assets/images/blog-hero.jpg'; // Make sure this image exists

// Framer Motion Variants (reusing and slightly enhancing existing ones)
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    }
  },
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for category filter

  // Dynamically get unique categories from blog posts
  const categories = useMemo(() => {
    const allCategories = blogPosts.map(post => post.category);
    return ['All', ...new Set(allCategories)].sort(); // 'All' option plus sorted unique categories
  }, []);

  // Filter blog posts based on the selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Blog - Wellness Insights from Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Explore articles and resources on health, wellness, spa treatments, and lifestyle tips from the experts at Venivici Health Club & Urban Spa in Lekki, Lagos." />
        <meta property="og:title" content="Venivici Spa - Blog & Wellness Resources" />
        <meta property="og:description" content="Stay informed with our latest articles on holistic health and beauty." />
        <meta property="og:image" content="https://venivici.com/images/blog-social.jpg" /> {/* Ensure this image exists for social sharing */}
        <meta property="og:url" content="https://venivici.com/blog" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 bg-veniviciLightGray min-h-screen"
      >
        {/* Blog Hero Section */}
        <motion.section
          variants={sectionVariants}
          className="relative text-center mb-16 pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
          style={{ backgroundImage: `url(${blogHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-veniviciDark bg-opacity-70"></div>
          <div className="relative z-10 container mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 font-bold"
            >
              Wellness Insights & Inspiration
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-veniviciLightGray max-w-3xl mx-auto leading-relaxed"
            >
              Dive into our curated collection of articles, expert tips, and guides on holistic health, rejuvenating spa treatments, and embracing a balanced lifestyle. Your journey to enhanced well-being starts here.
            </motion.p>
          </div>
        </motion.section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12 p-4 bg-white rounded-lg shadow-inner"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
                            ${selectedCategory === category
                                ? 'bg-veniviciGreen text-white shadow-md transform scale-105'
                                : 'bg-white text-veniviciDark border border-gray-300 hover:border-veniviciGreen hover:text-veniviciGreen'}
                            hover:scale-105`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <motion.p
                className="col-span-full text-center text-xl text-gray-600 py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No posts found in this category yet. Please check back later or try another filter!
              </motion.p>
            )}
          </motion.div>

          {/* --- Section: Can't Find What You're Looking For? --- */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20 p-8 sm:p-10 lg:p-12 bg-veniviciDark text-white rounded-xl shadow-2xl"
          >
            <h3 className="text-3xl sm:text-4xl font-serif text-veniviciGold mb-4">
              Didn't Find What You Were Looking For?
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our experts are always here to help. If you have specific questions or a topic you'd like us to cover, don't hesitate to reach out!
            </p>
            <AnimatedButton to="/contact" className="bg-veniviciGreen text-white hover:bg-veniviciGreen/90 shadow-md">
              Ask Our Experts
            </AnimatedButton>
          </motion.section>

          {/* --- Section: Stay Connected & Get Updates --- */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20 p-8 sm:p-10 lg:p-12 bg-white rounded-xl shadow-xl border border-gray-200"
          >
            <h3 className="text-3xl sm:text-4xl font-serif text-veniviciDark mb-4">
              Stay Informed with Our Wellness Newsletter
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to know about new blog posts, exclusive offers, and wellness tips directly in your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow p-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-veniviciGreen focus:border-transparent outline-none transition-all duration-300 text-gray-800"
                aria-label="Email for newsletter"
              />
              <AnimatedButton type="submit" className="bg-veniviciGold text-veniviciDark hover:bg-veniviciGold/90 shadow-md">
                Subscribe Now
              </AnimatedButton>
            </form>
          </motion.section>

        </div>
      </motion.div>
    </>
  );
};

export default Blog;