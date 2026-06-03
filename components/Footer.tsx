'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

const Footer: React.FC = () => {
  const [time, setTime] = useState('');
  const { isMobile, isSmall } = useIsMobile();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        // Using a generic GMT format as seen in the reference
      };
      const timeStr = now.toLocaleTimeString('en-US', options);
      const zoneStr = "GMT+5:30"; // Static for India or we could derive it
      setTime(`${timeStr} ${zoneStr}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer style={{
      backgroundColor: 'transparent',
      padding: isMobile ? '30px 5vw 50px 5vw' : '40px 8vw 80px 8vw',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      position: 'relative',
      zIndex: 10, // Lowered to prevent overlap with experience section modals
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        gap: isMobile ? '30px' : '0',
        width: '100%',
        borderTop: '1px solid #000', // Darkened to pure black
        paddingTop: isMobile ? '30px' : '60px'
      }}>
        {/* Left: Branding / Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)',
            fontWeight: 900,
            margin: 0,
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#1A1A1A'
          }}>
            © 2026<br />SATYAM BHAGAT
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div style={{ display: 'flex', gap: isMobile ? '20px' : '30px', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? '0' : '10px', flexWrap: 'wrap' }}>
          {[
            { name: 'Home', id: '#home' },
            { name: 'Projects', id: '#projects' },
            { name: 'Timeline', id: '#timeline' },
            { name: 'Contact', id: '#contact' }
          ].map(item => (
            <motion.a
              key={item.name}
              href={item.id}
              whileHover={{ opacity: 0.5 }}
              style={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                color: '#1A1A1A',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Right: Local Time */}
        <div style={{ textAlign: isMobile ? 'left' : 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', opacity: 0.4 }}>LOCAL TIME</span>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1A1A1A' }}>{time}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
