import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const Services = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // GSAP animations
  const { contextSafe } = useGSAP({ scope: servicesRef });

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

  return (
    <section id="services" className="section section--services" ref={servicesRef}>
      <div className="container">
        <div className="services__header">
          <h2 className="services__title" ref={titleRef}>
            Nos Services
          </h2>
        </div>
      </div>
      
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
    </section>
  );
};

export default Services;