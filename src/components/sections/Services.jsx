import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const Services = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const [expandedService, setExpandedService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const remainingTimeRef = useRef(10000); // Track remaining time
  const startTimeRef = useRef(Date.now());

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Services data - moved to top to avoid reference errors
  const services = [
    {
      id: 1,
      title: 'Business Process Outsourcing',
      description: 'Gestion des opérations back-office des entreprises de tous secteurs (industriel, financier, distribution, énergie, télécom, transport...) en intervenant sur l\'ensemble de la chaîne de valeur depuis la gestion des flux jusqu\'au traitement des opérations.',
      image: '/tech-bg.jpeg', // Using existing image
      color: '#B38FFF'
    },
    {
      id: 2,
      title: 'Développement Informatique',
      description: 'Développement informatique et édition de solutions pour divers domaines d\'activités dont le développement de logiciels assurantiels.',
      image: '/hero-main.jpeg', // Using existing image
      color: '#45008F'
    },
    {
      id: 3,
      title: 'Infogérance',
      description: 'Gamme complète d\'offres de services allant de l\'assistance technique sur les outils informatiques et applications logicielles jusqu\'à la gestion des systèmes, réseaux et parcs informatiques.',
      image: '/team-work.png', // Using existing image
      color: '#7A0000'
    }
  ];

  // GSAP animations
  const { contextSafe } = useGSAP({ scope: servicesRef });

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991); // Include tablets
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial setup for carousel cards
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const cards = carouselRef.current.querySelectorAll('.service__card--carousel');
    if (cards.length === 0) return;

    // Ensure all cards have proper dimensions
    cards.forEach((card, index) => {
      gsap.set(card, { 
        width: '100%', 
        height: '100%',
        x: index === currentSlide ? 0 : (index < currentSlide ? '-100%' : '100%'),
        opacity: index === currentSlide ? 1 : 0
      });
    });
  }, [isMobile, currentSlide]);

  // Auto-rotate carousel on mobile - PAUSE when expanded, RESUME with remaining time
  useEffect(() => {
    if (!isMobile) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // If service is expanded, pause auto-rotation
    if (expandedService !== null) {
      // Calculate remaining time when pausing
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      return;
    }

    // Resume with remaining time or start fresh
    const delay = remainingTimeRef.current > 0 ? remainingTimeRef.current : 10000;
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
      // Reset timer for next cycle
      remainingTimeRef.current = 10000;
      startTimeRef.current = Date.now();
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile, services.length, expandedService]);

  // Animate carousel slide change
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const cards = carouselRef.current.querySelectorAll('.service__card--carousel');
    if (cards.length === 0) return;

    // First, ensure all cards have proper dimensions and are positioned correctly
    cards.forEach((card, index) => {
      // Reset all cards to proper size and position
      gsap.set(card, { 
        width: '100%', 
        height: '100%',
        x: 0,
        opacity: index === currentSlide ? 1 : 0
      });
    });

    // Determine slide direction
    const isNext = currentSlide > previousSlide || (previousSlide === services.length - 1 && currentSlide === 0);
    const isPrev = currentSlide < previousSlide || (previousSlide === 0 && currentSlide === services.length - 1);

    // Animate slide transition
    if (isNext) {
      // Sliding left (next card comes from right)
      gsap.fromTo(cards[currentSlide], 
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.to(cards[previousSlide], 
        { x: '-100%', opacity: 0, duration: 0.6, ease: "power2.out" }
      );
    } else if (isPrev) {
      // Sliding right (previous card comes from left)
      gsap.fromTo(cards[currentSlide], 
        { x: '-100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      gsap.to(cards[previousSlide], 
        { x: '100%', opacity: 0, duration: 0.6, ease: "power2.out" }
      );
    } else {
      // Initial load - just position current card
      gsap.set(cards[currentSlide], { x: 0, opacity: 1 });
    }

    // Position other cards
    cards.forEach((card, index) => {
      if (index !== currentSlide && index !== previousSlide) {
        if (index < currentSlide) {
          gsap.set(card, { x: '-100%', opacity: 0 });
        } else {
          gsap.set(card, { x: '100%', opacity: 0 });
        }
      }
    });

    // Update previous slide
    setPreviousSlide(currentSlide);
  }, [currentSlide, isMobile, services.length]);

  // Handle service click for mobile - BULLETPROOF TWO STATE LOGIC
  const handleServiceClick = (serviceId, event) => {
    if (!isMobile) return;
    
    event.stopPropagation();
    event.preventDefault();
    
    // BULLETPROOF: Toggle between null (collapsed) and serviceId (expanded)
    const newState = expandedService === serviceId ? null : serviceId;
    setExpandedService(newState);
    
    console.log('Service clicked:', serviceId, 'New state:', newState);
  };

  // Handle manual slide change
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
    setExpandedService(null); // Close any expanded service
  };

  // Pause auto-rotation on hover
  const handleCarouselHover = (isHovering) => {
    if (!isMobile) return;
    
    if (isHovering) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, 10000);
    }
  };

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe left - next slide (card slides left, new card comes from right)
        goToSlide((currentSlide + 1) % services.length);
      } else {
        // Swipe right - previous slide (card slides right, previous card comes from left)
        goToSlide((currentSlide - 1 + services.length) % services.length);
      }
    }
  };

  useEffect(() => {
    // Scroll-triggered animations
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  // Pure CSS animations - no JavaScript needed (like Lugano L*3)

  return (
    <section id="services" className="section section--services" ref={servicesRef}>
      <div className="container">
        <div className="services__header">
          <h2 className="services__title" ref={titleRef}>
            Nos Services
          </h2>
        </div>
      </div>
      
      {isMobile ? (
        // Mobile - Carousel with one card at a time
        <div 
          className="services__carousel" 
          ref={carouselRef}
          onMouseEnter={() => handleCarouselHover(true)}
          onMouseLeave={() => handleCarouselHover(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`service__card service__card--carousel ${expandedService === service.id ? 'service__card--expanded' : ''} ${index === currentSlide ? 'service__card--active' : ''}`}
              style={{ '--service-color': service.color }}
              onClick={(event) => handleServiceClick(service.id, event)}
            >
              <div className="service__content">
                <div className="service__details">
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__description">{service.description}</p>
                  <div className="service__hint">(tap to expand)</div>
                </div>
              </div>
              <div className="service__background">
                <img 
                  src={service.image} 
                  loading="lazy" 
                  alt={service.title}
                  className="service__image"
                />
              </div>
            </div>
          ))}
          
          
          {/* Slide counter */}
          <div className="services__counter">
            {currentSlide + 1} / {services.length}
          </div>
        </div>
      ) : (
        // Desktop Grid
        <div className="services__grid">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="service__card"
              style={{ '--service-color': service.color }}
            >
              <div className="service__content">
                <div className="service__details">
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__description">{service.description}</p>
                </div>
              </div>
              <div className="service__background">
                <img 
                  src={service.image} 
                  loading="lazy" 
                  alt={service.title}
                  className="service__image"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Services;