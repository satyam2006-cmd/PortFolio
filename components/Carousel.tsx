'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Github, ChevronUp, ChevronDown } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';

interface CarouselItemData {
  title: string;
  description: string;
  id: string | number;
  icon?: React.ReactNode;
  url?: string;
  tech?: string;
  image?: string;
}

export default function Carousel({
  items,
  baseWidth = 360,
  baseHeight = 220,
  loop = false,
  disableInteraction = false,
  themeColor = 'mixed',
  onActiveChange
}: {
  items: CarouselItemData[];
  baseWidth?: number;
  baseHeight?: number;
  loop?: boolean;
  disableInteraction?: boolean;
  themeColor?: 'red' | 'yellow' | 'mixed';
  onActiveChange?: (index: number) => void;
}) {
  const [active, setActive] = useState(2);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (onActiveChange) {
      onActiveChange(active);
    }
  }, [active, onActiveChange]);

  if (!items || items.length === 0) return null;
  const TOTAL = items.length;

  const SPREAD = 18; // Steeper fan for a "proper semicircle"
  const RADIUS = isMobile ? 250 : 350; // Tighter arc on mobile

  const goTo = (i: number) => {
    setActive(((i % TOTAL) + TOTAL) % TOTAL);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const dy = info.offset.y;
    if (Math.abs(dy) > 40) {
      if (dy < 0) goTo(active + 1);
      else goTo(active - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') goTo(active + 1);
      if (e.key === 'ArrowUp') goTo(active - 1);
      if (e.key === 'ArrowRight') goTo(active + 1);
      if (e.key === 'ArrowLeft') goTo(active - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  // Responsive card dimensions
  const cardWidth = isMobile ? Math.min(baseWidth, window?.innerWidth * 0.7 || baseWidth) : baseWidth;
  const cardHeight = isMobile ? Math.min(baseHeight, window?.innerHeight * 0.35 || baseHeight) : baseHeight;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
      
      {/* Scene */}
      <div 
        style={{ 
          position: 'relative', 
          width: cardWidth, 
          height: cardHeight, 
          zIndex: 10,
        }}
      >
        {items.map((item, i) => {
          let offset = i - active;
          if (offset > TOTAL / 2) offset -= TOTAL;
          else if (offset < -TOTAL / 2) offset += TOTAL;

          const angle = offset * SPREAD;
          const isActive = offset === 0;

          const zIndex = TOTAL - Math.abs(offset);
          
          const isRed = i % 3 === 0;
          const isWhite = i % 3 === 2;
          
          let bgColor = '#111';
          if (themeColor === 'red') {
            bgColor = isRed ? '#FF0000' : isWhite ? '#FF3D00' : '#111';
          } else if (themeColor === 'yellow') {
            bgColor = isRed ? '#FFD700' : isWhite ? '#FFA500' : '#111';
          } else {
            bgColor = isRed ? '#FF3D00' : isWhite ? '#F2EFEA' : '#111';
          }
          
          const textColor = '#fff';

          const boxShadow = isActive 
            ? '0 40px 100px rgba(0,0,0,0.45)' 
            : '0 20px 50px rgba(0,0,0,0.25)';
            
          const dim = Math.max(0.6, 1 - Math.abs(offset) * 0.15);
          
          // Show up to 5 cards at a time (-2 to 2) to match density
          const isVisible = offset >= -2 && offset <= 2;
          const opacity = isVisible ? 1 : 0;
          const pointerEvents = isVisible ? 'auto' : 'none';
          const filter = isActive ? 'brightness(1)' : `brightness(${dim})`;
          const scale = isVisible ? 1 : 0.8;

          return (
            <motion.div
              key={`${item.id}-${i}`}
              drag={!disableInteraction ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onTap={() => {
                if (disableInteraction) return;
                if (!isVisible) return;
                if (!isActive) goTo(i);
              }}
              animate={{
                rotateZ: angle,
                zIndex: zIndex,
                boxShadow: boxShadow,
                filter: filter,
                opacity: opacity,
                scale: scale
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] 
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                y: '-50%',
                width: cardWidth,
                height: cardHeight,
                maxWidth: '85vw',
                maxHeight: '60vh',
                borderRadius: isMobile ? '16px' : '24px',
                backgroundColor: bgColor,
                color: textColor,
                cursor: isActive ? 'pointer' : 'grab',
                pointerEvents: pointerEvents as any,
                transformOrigin: `calc(0% - ${RADIUS}px) 50%`,
                padding: isMobile ? '20px' : '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                willChange: 'transform, filter, box-shadow, opacity',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85))${item.image ? `, url(${item.image})` : ''}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Ghost Number Context */}
              <div style={{ 
                fontFamily: '"Bebas Neue", sans-serif', 
                fontSize: isMobile ? '100px' : '180px', 
                color: isWhite ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', 
                position: 'absolute', 
                right: '-12px', 
                top: '-24px', 
                lineHeight: 1, 
                pointerEvents: 'none' 
              }}>
                {i + 1}
              </div>

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', zIndex: 2 }}>
                <Github size={isMobile ? 14 : 18} color={textColor} style={{ opacity: 0.8 }} />
              </div>

              {/* Title */}
              <div style={{ textAlign: 'left', zIndex: 2, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <h3 style={{ 
                  fontSize: isMobile ? 'clamp(1.2rem, 5vw, 2rem)' : 'clamp(2rem, 4vw, 56px)', 
                  fontWeight: 800, 
                  margin: 0, 
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  letterSpacing: '-1px',
                  fontFamily: '"Bebas Neue", sans-serif'
                }}>
                  {item.title}
                </h3>
              </div>

              {/* Action Button */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                zIndex: 2
              }}>
                {isActive && item.url && (
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#FF3D00', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: isMobile ? '6px 12px' : '8px 18px',
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '100px',
                      color: '#fff',
                      fontSize: isMobile ? '8px' : '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                  >
                    View Project
                  </motion.a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls (Fixed on Right) */}
      <div style={{ 
        position: 'absolute', 
        right: isMobile ? '10px' : '40px', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: isMobile ? '6px' : '10px', 
        alignItems: 'center', 
        zIndex: 100 
      }}>
        <button 
          onClick={() => goTo(active - 1)}
          style={{ width: isMobile ? '28px' : '36px', height: isMobile ? '28px' : '36px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.25s' }}
          aria-label="Previous"
        >
          <ChevronUp size={isMobile ? 12 : 16} />
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((_, i) => (
            <div 
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? (isMobile ? '8px' : '12px') : (isMobile ? '5px' : '8px'),
                height: i === active ? (isMobile ? '8px' : '12px') : (isMobile ? '5px' : '8px'),
                margin: isMobile ? '5px 0' : '10px 0',
                borderRadius: '50%',
                backgroundColor: i === active ? '#fff' : '#999',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                alignSelf: 'center'
              }}
            />
          ))}
        </div>

        <button 
          onClick={() => goTo(active + 1)}
          style={{ width: isMobile ? '28px' : '36px', height: isMobile ? '28px' : '36px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.25s' }}
          aria-label="Next"
        >
          <ChevronDown size={isMobile ? 12 : 16} />
        </button>
      </div>

    </div>
  );
}
