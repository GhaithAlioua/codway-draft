import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Footer from './components/layout/Footer';
import './App.scss';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    // Force scroll to top immediately on load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Initialize ScrollSmoother for smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true
    });
    
    // Global GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Global animations can be added here
    }, appRef);

    return () => {
      ctx.revert(); // Cleanup on unmount
      smoother.kill(); // Kill ScrollSmoother on unmount
    };
  }, []);

  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="app" ref={appRef}>
            <main className="main-content">
              <Hero />
              <About />
              <Services />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;