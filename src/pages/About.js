// src/pages/About.js
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { teamMembers } from '../data/teamData'; // Import team data
import TeamMemberCard from '../components/TeamMemberCard'; // Import team member card
import AnimatedButton from '../components/AnimatedButton'; // Import AnimatedButton

// Import images
import aboutHeroImg from '../assets/images/about-us-hero.jpg';
import spaPhilosophyImg from '../assets/images/spa-philosophy.jpg';
import uniqueApproachImg from '../assets/images/unique-approach.jpg'; // New image for Unique Approach section
import communityImpactImg from '../assets/images/community-impact.webp'; // New image for Community & Impact section


// Framer Motion Variants
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

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Venivici Health Club & Urban Spa</title>
        <meta name="description" content="Learn about Venivici Health Club & Urban Spa's mission, philosophy, and our dedicated team committed to your well-being in Lekki, Lagos." />
        <meta property="og:title" content="Venivici Spa - About Us" />
        <meta property="og:description" content="Discover our story, values, and the expert team behind your wellness journey." />
        <meta property="og:image" content="https://venivici.com/images/about-social.jpg" /> {/* Ensure this image exists */}
        <meta property="og:url" content="https://venivici.com/about" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="pt-[72px] sm:pt-[80px] md:pt-[96px] pb-20 px-4 sm:px-6 lg:px-8 bg-veniviciLightGray"
      >
        <div className="container mx-auto">
          {/* Hero/Introduction Section */}
          <motion.section
            variants={sectionVariants}
            className="text-center mb-16 pt-10"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-veniviciGreen mb-4 font-bold"
            >
              Our Story & Philosophy
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-veniviciDark max-w-3xl mx-auto leading-relaxed"
            >
              At Venivici, we believe in a holistic approach to wellness, blending ancient healing traditions with modern therapeutic techniques to rejuvenate your mind, body, and spirit. Every journey begins with a story, and ours is rooted in a deep passion for healing and well-being.
            </motion.p>
          </motion.section>

          {/* About Content Section: The Beginning */}
          <motion.section
            variants={sectionVariants}
            className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="md:order-1">
              <img
                src={aboutHeroImg}
                alt="Venivici Spa interior - welcoming and serene"
                className="w-full h-72 sm:h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:order-2">
              <h2 className="text-3xl sm:text-4xl font-serif text-veniviciDark mb-6 leading-tight">
                A Haven of <span className="text-veniviciGreen">Tranquility</span> in Lekki
              </h2>
              <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
                Founded in Lekki, Lagos, Venivici Health Club & Urban Spa was born from a vision to create a sanctuary where individuals could escape the demands of city life and embark on a personalized path to holistic well-being. We envisioned a space where traditional therapies met contemporary wellness practices, all delivered with unparalleled care and expertise.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                From its inception, Venivici has been committed to fostering an environment of peace, luxury, and healing. Our dedication to sourcing the finest natural ingredients, employing cutting-edge techniques, and, most importantly, listening to our clients' needs, has allowed us to become a trusted name in wellness.
              </p>
            </motion.div>
          </motion.section>

          {/* Our Values / Philosophy Section: Deeper Dive */}
          <motion.section
            variants={sectionVariants}
            className="bg-veniviciGreen text-white rounded-xl shadow-2xl p-8 sm:p-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="md:order-2">
              <img
                src={spaPhilosophyImg}
                alt="Spa philosophy concept - hands holding a plant symbolizing growth and care"
                className="w-full h-72 sm:h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:order-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 leading-tight">
                Our Guiding <span className="text-veniviciGold">Principles</span>
              </h2>
              <ul className="list-none text-lg space-y-4"> {/* Changed to list-none for custom bullet styling */}
                <li className="flex items-start">
                  <i className="fas fa-leaf text-veniviciGold mr-3 mt-1"></i> {/* Icon for Holistic Wellness */}
                  <div>
                    <strong className="font-semibold">Holistic Wellness:</strong> We embrace the interconnectedness of mind, body, and spirit. Our treatments are designed not just to address symptoms but to promote overall harmony and balance.
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-hands-helping text-veniviciGold mr-3 mt-1"></i> {/* Icon for Client-Centric Care */}
                  <div>
                    <strong className="font-semibold">Client-Centric Care:</strong> Your unique needs and comfort are at the heart of everything we do. We tailor every experience to ensure it aligns perfectly with your wellness goals.
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-gem text-veniviciGold mr-3 mt-1"></i> {/* Icon for Excellence & Expertise */}
                  <div>
                    <strong className="font-semibold">Excellence & Expertise:</strong> Our team of highly trained therapists and professionals are committed to delivering services of the highest standard, continually enhancing their skills and knowledge.
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-peace text-veniviciGold mr-3 mt-1"></i> {/* Icon for Serenity & Sanctuary */}
                  <div>
                    <strong className="font-semibold">Serenity & Sanctuary:</strong> We have meticulously crafted an environment that fosters deep relaxation and profound peace, allowing you to truly disconnect and recharge.
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-shield-alt text-veniviciGold mr-3 mt-1"></i> {/* Icon for Integrity & Trust */}
                  <div>
                    <strong className="font-semibold">Integrity & Trust:</strong> We operate with transparency and uphold the highest ethical standards, building lasting relationships based on mutual respect and confidence.
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.section>

          {/* --- New Section: Our Unique Approach --- */}
          <motion.section
            variants={sectionVariants}
            className="bg-white rounded-xl shadow-2xl p-8 sm:p-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <img
                src={uniqueApproachImg}
                alt="Unique spa treatment setup"
                className="w-full h-72 sm:h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-serif text-veniviciDark mb-6 leading-tight">
                What Makes Us <span className="text-veniviciGreen">Unique?</span>
              </h2>
              <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
                At Venivici, we differentiate ourselves through our unwavering dedication to personalized care and innovative wellness solutions. We don't just offer services; we craft experiences designed to meet your specific needs. Our therapists undergo continuous training in the latest techniques, ensuring you benefit from the most effective and advanced treatments available.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Our facility boasts state-of-the-art equipment for therapies like colonic hydrotherapy and advanced facial treatments, coupled with a serene ambiance that transports you away from the everyday. We also emphasize education, empowering our clients with knowledge for sustained well-being beyond our spa doors.
              </p>
              <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 space-y-2 mt-6">
                <li>Personalized treatment plans</li>
                <li>Integration of modern science and ancient wisdom</li>
                <li>Commitment to natural and high-quality products</li>
                <li>Continuous innovation in wellness therapies</li>
              </ul>
            </motion.div>
          </motion.section>

          {/* --- New Section: Community & Impact --- */}
          <motion.section
            variants={sectionVariants}
            className="bg-veniviciDark text-white rounded-xl shadow-2xl p-8 sm:p-12 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="md:order-2">
              <img
                src={communityImpactImg}
                alt="Community involvement or sustainable practices"
                className="w-full h-72 sm:h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="md:order-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 leading-tight">
                Beyond the Spa: Our <span className="text-veniviciGold">Commitment to Community</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-4 leading-relaxed">
                Venivici Health Club & Urban Spa is not just about individual well-being; it's also about contributing positively to our community in Lekki and beyond. We believe in sustainable practices, supporting local initiatives, and fostering a healthier, more conscious society.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                We regularly participate in wellness outreach programs, offering educational workshops and accessible health advice to promote general well-being. Our aim is to inspire a lifestyle of health and mindfulness, creating a ripple effect of positive change.
              </p>
              <div className="flex items-center text-gray-300 mt-6 space-x-4">
                <i className="fas fa-heart text-veniviciGreen text-2xl"></i>
                <p className="font-semibold">Caring for you, caring for our community.</p>
              </div>
            </motion.div>
          </motion.section>


          {/* --- Meet Our Experts Section --- */}
          <motion.section
            variants={sectionVariants}
            className="py-16 sm:py-20 bg-veniviciLightGray rounded-xl shadow-inner" // Added shadow-inner for depth
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-serif text-veniviciDark text-center mb-12"
              >
                Meet Our <span className="text-veniviciGreen">Expert Team</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 text-center leading-relaxed"
              >
                Behind every exceptional experience at Venivici is a team of passionate and highly skilled professionals. Our therapists, practitioners, and support staff are dedicated to ensuring your comfort, privacy, and ultimate satisfaction.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="text-center mt-12"
              >
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                  Ready to experience the expertise of our team? We invite you to explore our services or reach out for a personalized consultation.
                </p>
                <AnimatedButton to="/contact" className="bg-veniviciGold text-veniviciDark hover:bg-veniviciGold/90 shadow-md">
                  Contact Our Team
                </AnimatedButton>
              </motion.div>
            </div>
          </motion.section>

        </div>
      </motion.div>
    </>
  );
};

export default About;