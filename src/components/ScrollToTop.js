// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming React Router v6+

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to the top of the window
    window.scrollTo(0, 0);

    // If you have a specific element (like a main content div) that scrolls,
    // you might need to get a ref to it and scroll that element:
    // const mainContent = document.getElementById('main-content-area');
    // if (mainContent) {
    //   mainContent.scrollTo(0, 0);
    // }

  }, [pathname]); // Re-run effect whenever the pathname changes (i.e., new page visit)

  return null; // This component doesn't render anything itself
}

export default ScrollToTop;