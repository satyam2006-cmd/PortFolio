'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardData {
  id: string | number;
  title: string;
  description: string;
  url?: string;
  tech?: string;
  image?: string;
}

interface ProjectStickyCardsProps {
  cards: CardData[];
  scrollContainer?: HTMLElement | null;
}

/**
 * ProjectStickyCards — GSAP ScrollTrigger stacked card carousel designed for projects.
 * Features a static text details block on top with fade-in transition and action buttons,
 * and a stacked visual image container on the bottom that updates on scroll.
 */
export default function ProjectStickyCards({ cards, scrollContainer }: ProjectStickyCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Wait for scrollContainer to be available
  useEffect(() => {
    if (scrollContainer) {
      setReady(true);
    }
  }, [scrollContainer]);

  useGSAP(() => {
    if (!ready || !scrollContainer || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const totalCards = cards.length;
    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (cardElements.length === 0) return;

    // Set initial positions — first card visible, rest stacked below
    gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0 });
    for (let i = 1; i < totalCards; i++) {
      gsap.set(cardElements[i], { y: '100%', scale: 1, rotation: 0 });
    }

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${(scrollContainer as HTMLElement).clientHeight * (totalCards - 1)}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
        scroller: scrollContainer,
        onUpdate: (self) => {
          const index = Math.min(
            totalCards - 1,
            Math.max(0, Math.round(self.progress * (totalCards - 1)))
          );
          if (activeIndexRef.current !== index) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }
        }
      },
    });

    for (let i = 0; i < totalCards - 1; i++) {
      const currentCard = cardElements[i];
      const nextCard = cardElements[i + 1];
      if (!currentCard || !nextCard) continue;

      // Current card shrinks and rotates away slightly
      scrollTimeline.to(
        currentCard,
        { scale: 0.75, rotation: 4, duration: 1, ease: 'none' },
        i,
      );

      // Next card slides up from below
      scrollTimeline.to(
        nextCard,
        { y: '0%', duration: 1, ease: 'none' },
        i,
      );
    }

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, { scope: containerRef, dependencies: [ready, scrollContainer, cards.length] });

  if (!cards || cards.length === 0) return null;

  const activeCard = cards[activeIndex] || cards[0];

  // Dark red gradient theme for fallback cards
  const cardColors = [
    'linear-gradient(135deg, #1e0505 0%, #0d0101 100%)',
    'linear-gradient(135deg, #2b0808 0%, #110202 100%)',
    'linear-gradient(135deg, #1f0b0b 0%, #0e0303 100%)',
    'linear-gradient(135deg, #260505 0%, #0a0000 100%)',
    'linear-gradient(135deg, #320909 0%, #150303 100%)',
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{
        position: 'relative',
        width: '90%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* 1. Static Details Block (On Top) */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '8px 4px',
        }}>
          <div>
            {/* Header: Project Label & Tech Stack */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.65rem',
                letterSpacing: '2.5px',
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>
                Project {String(activeIndex + 1).padStart(2, '0')}
              </span>
              {activeCard.tech && (
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.5px',
                  color: '#ff3d00',
                  background: 'rgba(255, 61, 0, 0.08)',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 61, 0, 0.15)',
                  fontWeight: 600,
                }}>
                  {activeCard.tech}
                </span>
              )}
            </div>

            {/* Title & Description with Fade-in entrance animation */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(1.4rem, 5.5vw, 1.8rem)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {activeCard.title}
              </h3>

              <p style={{
                fontSize: '0.8rem',
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.55)',
                margin: 0,
              }}>
                {activeCard.description}
              </p>
            </motion.div>
          </div>

          {/* Static Buttons Group */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', marginBottom: '8px' }}>
            {activeCard.url ? (
              <a
                href={activeCard.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  background: '#ff3d00',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                {activeCard.url.includes('github.com') ? <Github size={12} /> : <ExternalLink size={12} />}
                {activeCard.url.includes('github.com') ? 'Source' : 'Visit'}
              </a>
            ) : <div />}

            <span style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.2)',
              fontWeight: 500
            }}>
              Satyam2006-cmd
            </span>
          </div>
        </div>

        {/* 2. Visual Stacking Images container (On Bottom) - Landscape sleeping rectangle */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          borderRadius: '20px',
        }}>
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: cardColors[i % cardColors.length],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
              }}
            >
              {/* Fallback details centered behind the image */}
              <div style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.15)',
                pointerEvents: 'none',
                textAlign: 'center',
                padding: '0 20px',
              }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '1px' }}>
                  {card.title.slice(0, 3).toUpperCase()}
                </span>
                <span style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: 600, marginTop: '4px' }}>
                  PREVIEW NOT AVAILABLE
                </span>
              </div>

              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  onError={(e) => {
                    // Hide the image so the centered fallback text shows up
                    e.currentTarget.style.display = 'none';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
