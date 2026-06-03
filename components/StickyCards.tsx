'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';

interface CardData {
  id: string | number;
  title: string;
  description: string;
  url?: string;
  tech?: string;
  image?: string;
}

interface StickyCardsProps {
  cards: CardData[];
  scrollContainer?: HTMLElement | null;
}

/**
 * StickyCards — GSAP ScrollTrigger stacked card carousel.
 * Adapted from Skiper17's StickyCard002.
 * Each card stacks on top of the previous one as you scroll.
 * Works inside a scrollable modal container.
 */
export default function StickyCards({ cards, scrollContainer }: StickyCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);

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
      },
    });

    for (let i = 0; i < totalCards - 1; i++) {
      const currentCard = cardElements[i];
      const nextCard = cardElements[i + 1];
      if (!currentCard || !nextCard) continue;

      // Current card shrinks and rotates away
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

  }, { scope: containerRef, dependencies: [ready, scrollContainer, cards.length] });

  if (!cards || cards.length === 0) return null;

  // Color palette for cards
  const cardColors = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #462255 100%)',
    'linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)',
    'linear-gradient(135deg, #1b2838 0%, #171a21 50%, #1e3a5f 100%)',
    'linear-gradient(135deg, #2c2c3e 0%, #1a1a2e 50%, #3a2a4f 100%)',
  ];

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{
        position: 'relative',
        width: '90%',
        maxWidth: '420px',
        height: '75%',
        maxHeight: '550px',
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
              background: cardColors[i % cardColors.length],
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px 28px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              overflow: 'hidden',
              willChange: 'transform',
            }}
          >
            {/* Card number badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '0.7rem',
                letterSpacing: '3px',
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>
                Project {String(i + 1).padStart(2, '0')}
              </span>
              {card.tech && (
                <span style={{
                  fontSize: '0.65rem',
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {card.tech}
                </span>
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.4rem, 5vw, 2rem)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                textTransform: 'capitalize',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '320px',
              }}>
                {card.description.length > 120 ? card.description.slice(0, 120) + '...' : card.description}
              </p>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {card.url && (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                  }}
                >
                  {card.url.includes('github') ? <Github size={14} /> : <ExternalLink size={14} />}
                  {card.url.includes('github') ? 'Source' : 'Visit'}
                </a>
              )}
            </div>

            {/* Decorative large number */}
            <span style={{
              position: 'absolute',
              bottom: '-20px',
              right: '20px',
              fontSize: '8rem',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.03)',
              lineHeight: 1,
              pointerEvents: 'none',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
