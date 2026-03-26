'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [time, setTime] = useState('');

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
      backgroundColor: '#EAE9E4', 
      padding: '40px 8vw 80px 8vw',
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      position: 'relative',
      zIndex: 40, // Lowered to prevent overlap with experience section modals
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        borderTop: '1px solid #000', // Darkened to pure black
        paddingTop: '60px'
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
        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-end', marginBottom: '10px' }}>
             {[
               { name: 'Home', id: '#home' },
               { name: 'About', id: '#about' },
               { name: 'Projects', id: '#projects' },
               { name: 'Timeline', id: '#timeline' },
               { name: 'Contact', id: '#contact' }
             ].map(item => (
                <motion.a 
                  key={item.name}
                  href={item.id}
                  whileHover={{ opacity: 0.5 }}
                  style={{ 
                    fontSize: '0.9rem', 
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
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', opacity: 0.4 }}>LOCAL TIME</span>
             <p style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#1A1A1A' }}>{time}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
