import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const line5Ref = useRef(null);
  const pixel1Ref = useRef(null);
  const pixel2Ref = useRef(null);
  const pixel3Ref = useRef(null);
  const pixel4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the entire section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 120%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Title animation with glitch effect
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationX: 90,
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 1.5, 
          ease: "power3.out"
        }
      );

      // Hero-style text animations - Fast and smooth
      tl.fromTo(line1Ref.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.3"
      );

      tl.fromTo(line2Ref.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.2"
      );

      tl.fromTo(line3Ref.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.2"
      );

      tl.fromTo(line4Ref.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.2"
      );

      tl.fromTo(line5Ref.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: "power2.out" 
        },
        "-=0.2"
      );




    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about__container">
        
        <div className="about__inspiring-text" ref={line1Ref}>
          Nous sommes une entreprise spécialisée dans l'ingénierie et les services informatiques, offrant l'externalisation des processus métier, le développement de logiciels et des solutions complètes de gestion informatique pour les entreprises de tous secteurs.
        </div>

        <div className="about__content">
          <div className="about__section">
            <div className="about__line" ref={line2Ref}>Nous automatisons</div>
          </div>

          <div className="about__section">
            <div className="about__line" ref={line3Ref}>Nous développons</div>
          </div>

          <div className="about__section">
            <div className="about__line" ref={line4Ref}>Nous gérons</div>
          </div>

          <div className="about__section">
            <div className="about__line" ref={line5Ref}>Nous livrons</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;