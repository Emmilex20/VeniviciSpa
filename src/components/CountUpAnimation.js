// src/components/CountUpAnimation.js
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CountUpAnimation = ({ value, suffix = '', duration = 2, formatter = (num) => num.toLocaleString() }) => {
  // Create a motion value that starts at 0
  const count = useMotionValue(0);
  // Transform the motion value to round it to the nearest integer
  const rounded = useTransform(count, Math.round);

  // Use react-intersection-observer to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once when it comes into view
    threshold: 0.5,     // Trigger when 50% of the component is visible
  });

  // Animate the 'count' motion value when the component comes into view
  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, {
        duration: duration, // Animation duration
        ease: "easeOut",    // Easing function for a smooth count
      });
      // Return a cleanup function to stop the animation if the component unmounts
      return animation.stop;
    }
  }, [inView, count, value, duration]); // Dependencies: re-run effect if these change

  return (
    <motion.span ref={ref}>
      {/* Render the transformed value, applying the formatter and suffix */}
      {useTransform(rounded, (latest) => formatter(latest) + suffix)}
    </motion.span>
  );
};

export default CountUpAnimation;