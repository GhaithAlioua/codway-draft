import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin } from 'lucide-react';

export const MobileMenu = ({
  items = [],
  isOpen = false,
  onClose = () => {},
  onItemClick = () => {},
  accentColor = '#5227FF'
}) => {
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const itemEntranceTweenRef = useRef(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      
      if (!panel || !preContainer) return;

      let preLayers = Array.from(preContainer.querySelectorAll('.mobile-menu-prelayer'));
      preLayerElsRef.current = preLayers;

      // Set initial positions - offscreen to the right
      gsap.set([panel, ...preLayers], { xPercent: 100 });
    });
    return () => ctx.revert();
  }, [isOpen]); // Add isOpen dependency

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll('.mobile-menu-itemLabel'));

    // Set initial states exactly like StaggeredMenu
    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }

    const tl = gsap.timeline({ paused: true });

    // Animate prelayers
    layers.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    // Animate panel
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

      // Animate items
      if (itemEls.length) {
        const itemsStartRatio = 0.15;
        const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
        tl.to(itemEls, {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        }, itemsStart);
      }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    // Set busy state immediately to prevent multiple close calls
    if (busyRef.current) return;
    busyRef.current = true;

    // Kill all existing animations
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    closeTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) {
      busyRef.current = false;
      return;
    }

    const all = [...layers, panel];
    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        // Reset all elements exactly like StaggeredMenu
        const itemEls = Array.from(panel.querySelectorAll('.mobile-menu-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        busyRef.current = false;
        closeTweenRef.current = null;
      }
    });
  }, []);

  // Handle open/close animations
  React.useEffect(() => {
    // Clean up any existing timers
    const cleanup = () => {
      // Kill all animations to prevent hanging states
      openTlRef.current?.kill();
      openTlRef.current = null;
      closeTweenRef.current?.kill();
      closeTweenRef.current = null;
      itemEntranceTweenRef.current?.kill();
      itemEntranceTweenRef.current = null;
      busyRef.current = false;
    };

    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        playOpen();
      }, 10);
      return () => {
        clearTimeout(timer);
        cleanup();
      };
    } else {
      playClose();
      return cleanup;
    }
  }, [isOpen, playOpen, playClose]);

  // Cleanup on unmount to prevent hanging states
  React.useEffect(() => {
    return () => {
      // Kill all animations and reset state
      openTlRef.current?.kill();
      openTlRef.current = null;
      closeTweenRef.current?.kill();
      closeTweenRef.current = null;
      itemEntranceTweenRef.current?.kill();
      itemEntranceTweenRef.current = null;
      busyRef.current = false;
    };
  }, []);

  const handleItemClick = (e, item) => {
    e.preventDefault();
    onItemClick(e, item.link);
    onClose();
  };

  const handleTouchStart = (e) => {
    e.currentTarget.classList.add('mobile-menu-item--touching');
  };

  const handleTouchEnd = (e) => {
    e.currentTarget.classList.remove('mobile-menu-item--touching');
  };

  const handleTouchCancel = (e) => {
    e.currentTarget.classList.remove('mobile-menu-item--touching');
  };


  return (
    <div className="mobile-menu-wrapper" data-open={isOpen || undefined}>
      <div ref={preLayersRef} className="mobile-menu-prelayers" aria-hidden="true">
        <div className="mobile-menu-prelayer mobile-menu-prelayer--blue-1" />
        <div className="mobile-menu-prelayer mobile-menu-prelayer--blue-2" />
        <div className="mobile-menu-prelayer mobile-menu-prelayer--blue-3" />
        <div className="mobile-menu-prelayer mobile-menu-prelayer--blue-4" />
      </div>

      <aside 
        ref={panelRef} 
        className="mobile-menu-panel" 
        aria-hidden={!isOpen}
        style={{ '--mobile-accent': accentColor }}
      >
        <div className="mobile-menu-panel-inner">
          {/* Navigation Section */}
          <div className="mobile-menu-section">
            <ul className="mobile-menu-list" role="list">
              {items && items.length ? (
                items.map((item, idx) => (
                  <li className="mobile-menu-itemWrap" key={item.label + idx}>
                    <a 
                      className="mobile-menu-item" 
                      href={item.link} 
                      aria-label={item.ariaLabel} 
                      data-index={idx + 1}
                      onClick={(e) => handleItemClick(e, item)}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      onTouchCancel={handleTouchCancel}
                    >
                      <span className="mobile-menu-itemLabel">{item.label}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="mobile-menu-itemWrap" aria-hidden="true">
                  <span className="mobile-menu-item">
                    <span className="mobile-menu-itemLabel">No items</span>
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mobile-menu-contact">
            <div className="mobile-menu-contact-links">
              <a href="mailto:contact@codway-it.com" className="mobile-menu-contact-link">
                <Mail className="mobile-menu-contact-icon" />
                <span>contact@codway-it.com</span>
              </a>
              <a href="tel:36060000" className="mobile-menu-contact-link">
                <Phone className="mobile-menu-contact-icon" />
                <span>36 060 000</span>
              </a>
              <div className="mobile-menu-contact-link">
                <MapPin className="mobile-menu-contact-icon" />
                <span>Rue du Lac Taganyika<br/>Les Berges du Lac<br/>1053 Tunis, Tunisie</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
