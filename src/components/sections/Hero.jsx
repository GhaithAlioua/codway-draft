import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarkVeil from '../DarkVeil';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const darkVeilRef = useRef(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // GSAP animations
  const { contextSafe } = useGSAP({ scope: heroRef });

  useEffect(() => {
    // Faster Hero Animations - Veil First, Then Text
    const tl = gsap.timeline();

    // 1. DarkVeil fades in first (0.2s delay, 1s duration)
    tl.fromTo(darkVeilRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
    );

    // 2. Title appears after veil (0.8s delay, 0.8s duration)
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

    // 3. DarkVeil subtle zoom (1s delay, 8s duration)
    tl.fromTo(darkVeilRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 8, ease: "power2.out" },
      "-=7.2"
    );
  }, []);

  // Parallax effect for DarkVeil
  useEffect(() => {
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    parallaxTl.to(darkVeilRef.current, {
      yPercent: -20,
      ease: 'none',
    });

    return () => parallaxTl.kill();
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__background">
        <div className="hero__image-container" ref={darkVeilRef}>
          <DarkVeil 
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={1.5}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
          <div className="hero__overlay"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title" ref={titleRef}>
            CODWAY IT
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;