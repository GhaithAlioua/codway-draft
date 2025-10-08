import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const brandBgRef = useRef(null);

  // Lugano's exact scroll effect - Updated for ScrollSmoother
  useEffect(() => {
    const handleScroll = () => {
      // Use ScrollSmoother's scroll position if available, otherwise fallback to window.scrollY
      const scrollY = window.ScrollSmoother ? 
        window.ScrollSmoother.get().scrollTop() : 
        window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    // Listen to both regular scroll and ScrollSmoother scroll
    window.addEventListener('scroll', handleScroll);
    
    // Also listen to ScrollSmoother's scroll event if available
    if (window.ScrollSmoother) {
      const smoother = window.ScrollSmoother.get();
      if (smoother) {
        smoother.addEventListener('scroll', handleScroll);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.ScrollSmoother) {
        const smoother = window.ScrollSmoother.get();
        if (smoother) {
          smoother.removeEventListener('scroll', handleScroll);
        }
      }
    };
  }, []);

  // GSAP animations for menu
  const { contextSafe } = useGSAP({ scope: headerRef });

  const toggleMenu = contextSafe(() => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Open menu animation
      gsap.fromTo(menuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      
      // Animate menu items
      gsap.fromTo('.menu-item', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      );
    } else {
      // Close menu animation
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  });

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Since navbar is outside ScrollSmoother, use native smooth scroll
      const elementPosition = targetElement.offsetTop;
      let offsetPosition;
      
      // Special handling for different sections
      if (targetId === '#about') {
        offsetPosition = elementPosition - 80 - 210;
      } else if (targetId === '#services') {
        offsetPosition = elementPosition - 80 + 30;
      } else {
        offsetPosition = elementPosition - 80; // Account for navbar height
      }
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigationItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`navbar ${isMenuOpen ? 'navbar--open' : ''} ${isScrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="container navbar__container">
        {/* Left: Brand Section */}
        <div className="navbar__brand">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="navbar__brand-link">
            <img 
              src="/codway-img.png" 
              alt="Codway IT" 
              className="navbar__brand-logo"
            />
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="navbar__nav">
          <ul className="navbar__links">
            {navigationItems.map((item, index) => (
              <li key={index} className="navbar__item">
                <a 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="navbar__link underline-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: CTA */}
        <div className="navbar__right">
          {/* Contact Button */}
          <a 
            onClick={(e) => e.preventDefault()}
            className="btn btn--nav-main"
          >
            <div className="btn__content">
              <div>Contact</div>
            </div>
            <div className="btn__bg"></div>
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navigationItems.map((item, index) => (
            <li key={index} className="navbar__mobile-item">
              <a 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="navbar__mobile-link"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="navbar__mobile-item navbar__mobile-item-btm">
            <div className="navbar__underline"></div>
            <div>Codway IT</div>
            <div className="u-text-light-200">
              Solutions technologiques innovantes<br/>
              Codway IT<br/>
              Innovation & Excellence<br/>
              CH-1000 Lausanne
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;