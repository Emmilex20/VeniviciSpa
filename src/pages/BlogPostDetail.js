// src/pages/BlogPostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Assuming react-router-dom
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPostsData';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-[72px] sm:pt-[80px] md:pt-[96px] flex items-center justify-center min-h-[calc(100vh-200px)] text-veniviciDark">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-[72px] sm:pt-[80px] md:pt-[96px] text-center min-h-[calc(100vh-200px)] py-20 px-4">
        <h1 className="text-3xl font-serif text-veniviciDark mb-4">Post Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">The blog post you are looking for does not exist.</p>
        <Link
          to="/blog"
          className="inline-block bg-veniviciGreen text-white px-6 py-3 rounded-full text-md font-semibold hover:bg-opacity-90 transition"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Framer Motion Variants for smooth entry
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Venivici Spa Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:url" content={`https://venivici.com/blog/${post.slug}`} />
      </Helmet>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={contentVariants}
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 px-4 sm:px-6 lg:px-8 bg-veniviciLightGray"
      >
        <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 lg:p-12 mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center text-veniviciGreen hover:underline mb-8 text-lg"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to All Posts
          </Link>

          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg mb-8 shadow-md"
          />

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-veniviciDark mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-md sm:text-lg mb-8">
            {post.date} &bull; {post.readTime}
          </p>

          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} // Simple markdown to HTML
          ></div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-block bg-veniviciGreen text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                         hover:bg-opacity-90 hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              Book a Service
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogPostDetail;