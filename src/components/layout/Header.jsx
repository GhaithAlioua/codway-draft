import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import MobileMenu from '../MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // GSAP animations for mobile menu
  const { contextSafe } = useGSAP({ scope: headerRef });

  // Animate hamburger icon entrance
  useEffect(() => {
    if (hamburgerRef.current && isMobile) {
      const icon = hamburgerRef.current.querySelector('svg');
      if (icon) {
        // Reset and animate in
        gsap.set(icon, { scale: 0, rotation: 0 });
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    }
  }, [isMenuOpen, isMobile]);

  const toggleMenu = contextSafe(() => {
    if (!isMobile) return;
    
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Animate hamburger icon transformation
    if (hamburgerRef.current) {
      const icon = hamburgerRef.current.querySelector('svg');
      if (icon) {
        if (newMenuState) {
          // Opening: rotate and scale out, then scale in with X
          gsap.to(icon, {
            rotation: 90,
            scale: 0,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
              // Icon will be replaced by React re-render
            }
          });
        } else {
          // Closing: rotate and scale out, then scale in with Menu
          gsap.to(icon, {
            rotation: -90,
            scale: 0,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
              // Icon will be replaced by React re-render
            }
          });
        }
      }
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
        {/* Brand Section - Always visible */}
        <div className="navbar__brand">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="navbar__brand-link">
            <img 
              src="/codway-img.png" 
              alt="Codway IT" 
              className="navbar__brand-logo"
            />
          </a>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        {!isMobile && (
          <>
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
          </>
        )}

        {/* Mobile Hamburger Menu - Only visible on mobile */}
        {isMobile && (
          <button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className="navbar__hamburger"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu - Only visible on mobile */}
      {isMobile && (
        <MobileMenu
          items={[
            ...navigationItems.map(item => ({
              label: item.label,
              ariaLabel: `Go to ${item.label}`,
              link: item.href
            })),
            {
              label: 'Contact',
              ariaLabel: 'Contact us',
              link: '#contact'
            }
          ]}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onItemClick={handleNavClick}
          accentColor="#3b82f6"
        />
      )}
    </header>
  );
};

export default Header;