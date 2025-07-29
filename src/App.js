// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent'; 

// Lazy load components (rest remains the same)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Booking = lazy(() => import('./pages/Booking'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Terms = lazy(() => import('./pages/Terms'));
const Offers = lazy(() => import('./pages/Offers'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] pt-20 bg-veniviciLightGray">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-veniviciGreen mb-4"></div>
              <p className="text-xl text-veniviciDark font-semibold">Loading content...</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;