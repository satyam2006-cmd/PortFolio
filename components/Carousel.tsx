'use client';

import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Github, ChevronUp, ChevronDown } from 'lucide-react';

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
}: {
  items: CarouselItemData[];
  baseWidth?: number;
  baseHeight?: number;
  loop?: boolean;
}) {
  const [active, setActive] = useState(2);

  if (!items || items.length === 0) return null;
  const TOTAL = items.length;

  const SPREAD = 18; // Steeper fan for a "proper semicircle"
  const RADIUS = 350; // Tighter arc for a rounder shape

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

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative' }}>
      
      {/* Scene */}
      <div 
        style={{ 
          position: 'relative', 
          width: baseWidth, 
          height: baseHeight, 
          zIndex: 10,
          // Removed tilt as requested for "proper upright semicircle"
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
          const bgColor = isRed ? '#FF3D00' : isWhite ? '#F2EFEA' : '#111';
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
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (!isVisible) return;
                if (!isActive) goTo(i);
                else if (item.url) window.open(item.url, '_blank', 'noreferrer noopener');
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
                width: baseWidth,
                height: baseHeight,
                borderRadius: '24px', // Extra roundness as requested
                backgroundColor: bgColor,
                color: textColor,
                cursor: isActive ? 'pointer' : 'grab',
                pointerEvents: pointerEvents as any,
                transformOrigin: `calc(0% - ${RADIUS}px) 50%`,
                padding: '32px',
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
                fontSize: '180px', 
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
                <div style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '3px', fontWeight: 600, textTransform: 'uppercase' }}>
                  {String(i + 1).padStart(2, '0')} — PROJECT
                </div>
                <Github size={18} color={textColor} style={{ opacity: 0.8 }} />
              </div>

              {/* Title */}
              <div style={{ textAlign: 'left', zIndex: 2 }}>
                <h3 style={{ 
                  fontSize: 'clamp(2rem, 4vw, 56px)', 
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

              {/* Footer Details */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                borderTop: `1px solid ${isWhite ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                paddingTop: '12px',
                zIndex: 2
              }}>
                <div style={{ fontSize: '10px', opacity: 0.6, maxWidth: '180px', lineHeight: 1.65 }}>
                  {item.description}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#FF3D00', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Satyam2006-cmd
                  </div>
                  <div style={{ fontSize: '8px', fontWeight: 700, opacity: 0.3, letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {item.tech || '2026'}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls (Fixed on Right) */}
      <div style={{ 
        position: 'absolute', 
        right: '40px', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        alignItems: 'center', 
        zIndex: 100 
      }}>
        <button 
          onClick={() => goTo(active - 1)}
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.25s' }}
          aria-label="Previous"
        >
          <ChevronUp size={16} />
        </button>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((_, i) => (
            <div 
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? '12px' : '8px',
                height: i === active ? '12px' : '8px',
                margin: '10px 0',
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
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.25s' }}
          aria-label="Next"
        >
          <ChevronDown size={16} />
        </button>
      </div>

    </div>
  );
}
