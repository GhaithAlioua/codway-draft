import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Phone, MapPin, Linkedin, ExternalLink, Building, Code, Settings } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: footerRef });

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: Linkedin },
    { name: 'Email', url: 'mailto:contact@codway-it.com', icon: Mail }
  ];

  const footerLinks = [
    { label: 'Services', href: '#services' },
    { label: 'À propos', href: '#about' },
    { label: 'Accueil', href: '#hero' }
  ];

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        {/* Main Content */}
        <div className="footer__main">
          {/* Content Grid */}
          <div ref={contentRef} className="footer__content">
            {/* Left: Company Info */}
            <div className="footer__left">
              <div className="footer__brand">
                <Building className="footer__brand-icon" />
                <div className="footer__brand-text">
                  <h3>Codway IT</h3>
                  <p>Innovation & Excellence</p>
                </div>
              </div>
              
              <div className="footer__description">
                Société d'ingénierie et de services informatiques spécialisée dans le Business Process Outsourcing, 
                le développement informatique et l'infogérance pour entreprises de tous secteurs.
              </div>
            </div>

            {/* Center: Services */}
            <div className="footer__center">
              <h3>Nos Services</h3>
              <div className="footer__services">
                <div className="footer__service">
                  <div className="footer__service-header">
                    <Settings className="footer__service-icon" />
                    <h4>Business Process Outsourcing</h4>
                  </div>
                  <p>Gestion des opérations back-office</p>
                </div>
                
                <div className="footer__service">
                  <div className="footer__service-header">
                    <Code className="footer__service-icon" />
                    <h4>Développement informatique</h4>
                  </div>
                  <p>Solutions logicielles sur mesure</p>
                </div>
                
                <div className="footer__service">
                  <div className="footer__service-header">
                    <Settings className="footer__service-icon" />
                    <h4>Infogérance</h4>
                  </div>
                  <p>Gestion complète de vos systèmes</p>
                </div>
              </div>
            </div>

            {/* Right: Contact & Social */}
            <div className="footer__right">
              <h3>Contact</h3>
              
              <div className="footer__contact-info">
                <div className="footer__contact-item">
                  <Mail className="footer__contact-icon" />
                  <div className="footer__contact-details">
                    <span className="footer__contact-label">Email</span>
                    <a href="mailto:contact@codway-it.com" className="footer__contact-link">
                      contact@codway-it.com
                    </a>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <Phone className="footer__contact-icon" />
                  <div className="footer__contact-details">
                    <span className="footer__contact-label">Téléphone</span>
                    <a href="tel:36060000" className="footer__contact-link">
                      36 060 000
                    </a>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <MapPin className="footer__contact-icon" />
                  <div className="footer__contact-details">
                    <span className="footer__contact-label">Adresse</span>
                    <span className="footer__contact-text">
                      Rue du Lac Taganyika<br/>
                      Les Berges du Lac<br/>
                      1053 Tunis, Tunisie
                    </span>
                  </div>
                </div>
              </div>

              <div className="footer__social">
                <h4>Suivez-nous</h4>
                <div className="footer__social-links">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="footer__social-link"
                        aria-label={social.name}
                        target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                        rel={social.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                      >
                        <IconComponent className="footer__social-icon" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;