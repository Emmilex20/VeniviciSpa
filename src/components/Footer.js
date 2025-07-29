// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-veniviciDark text-white py-12 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">

        {/* About Us / Brand Intro */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-serif text-veniviciGreen mb-4 font-semibold">Venivici Spa</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Your sanctuary for wellness and serenity in Lekki, Lagos. We offer a holistic approach to health and beauty, dedicated to revitalizing your mind, body, and spirit.
          </p>
          {/* Social Media Links */}
          <h4 className="text-lg font-semibold text-veniviciGreen mb-3">Connect With Us</h4>
          <div className="flex space-x-6 text-2xl">
            {/* Replace these href values with your actual social media profile URLs */}
            <a href="https://www.facebook.com/yourvenivicipage" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-veniviciGreen transition duration-300" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/yourveniviciinstagram" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-veniviciGreen transition duration-300" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/yourvenivicitwitter" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-veniviciGreen transition duration-300" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            {/* Add more social links here */}
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-serif text-veniviciGreen mb-4 font-semibold">Explore</h3>
          <ul>
            <li className="mb-3"><Link to="/" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Home</Link></li>
            <li className="mb-3"><Link to="/about" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">About Us</Link></li> {/* Added About link */}
            <li className="mb-3"><Link to="/services" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Services</Link></li>
            <li className="mb-3"><Link to="/gallery" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Gallery</Link></li>
            <li className="mb-3"><Link to="/testimonials" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Testimonials</Link></li> {/* Added Testimonials link */}
            <li className="mb-3"><Link to="/blog" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Blog</Link></li> {/* Added Blog link */}
            <li className="mb-3"><Link to="/booking" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Book Appointment</Link></li>
            <li className="mb-3"><Link to="/contact" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-serif text-veniviciGreen mb-4 font-semibold">Contact Info</h3>
          <p className="text-sm text-gray-300 mb-3 flex items-start md:items-center">
            <i className="fas fa-map-marker-alt mr-3 text-veniviciGold mt-1 md:mt-0"></i>
            Plot 6 Block 1, 69A Admiralty Way, Lekki Phase 1, Lagos, Nigeria
          </p>
          <p className="text-sm text-gray-300 mb-3 flex items-center">
            <i className="fas fa-phone mr-3 text-veniviciGold"></i>
            <a href="tel:+2348099990036" className="text-gray-300 hover:text-veniviciGold transition duration-300">0809 999 0036</a>
          </p>
          <p className="text-sm text-gray-300 mb-3 flex items-center">
            <i className="fas fa-envelope mr-3 text-veniviciGold"></i>
            <a href="mailto:info@venivici.com" className="text-gray-300 hover:text-veniviciGold transition duration-300">info@venivici.com</a>
          </p>
          <p className="text-sm text-gray-300 mb-3 flex items-center">
            <i className="fas fa-clock mr-3 text-veniviciGold"></i>
            Mon - Sat: 9:00 AM - 7:00 PM<br />
            Sunday: 12:00 PM - 6:00 PM {/* Added Sunday hours for clarity */}
          </p>
        </div>

        {/* Legal & Newsletter Signup */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-serif text-veniviciGreen mb-4 font-semibold">Legal & Updates</h3>
          <ul className="mb-6">
            <li className="mb-3"><Link to="/privacy-policy" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Privacy Policy</Link></li> {/* New Legal Link */}
            <li className="mb-3"><Link to="/faqs" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">FAQs</Link></li>                   {/* New Legal Link */}
            <li className="mb-3"><Link to="/terms" className="text-gray-300 hover:text-veniviciGold transition duration-300 text-base">Terms & Conditions</Link></li>     {/* New Legal Link */}
          </ul>
          <h4 className="text-lg font-semibold text-veniviciGreen mb-3">Newsletter</h4>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Stay updated with our latest offers, exclusive treatments, and wellness tips.
          </p>
          <form className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Enter your email for newsletter"
              className="px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-veniviciGold flex-grow text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-veniviciGold text-veniviciDark px-4 py-2 rounded-r-md hover:bg-opacity-90 transition duration-300 font-semibold text-sm sm:text-base"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Venivici Health Club & Urban Spa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;