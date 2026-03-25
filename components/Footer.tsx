'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'LINKEDIN', url: '#' },
    { name: 'GITHUB', url: '#' },
    { name: 'INSTAGRAM', url: '#' },
    { name: 'SPOTIFY', url: '#' },
    { name: 'RESUME', url: '#' },
  ];

  return (
    <footer style={{ 
      backgroundColor: '#000', 
      padding: '40px 4vw 80px 4vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* Social Links Row */}
      <div style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
      }}>
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, color: '#FF7A00' }}
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2rem',
              textDecoration: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: 700,
              transition: 'color 0.3s ease'
            }}
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      {/* Copyright & Branding */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '30px',
          height: '1px',
          backgroundColor: '#FF7A00',
          opacity: 0.5
        }} />
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.1rem',
          color: 'rgba(255,255,255,0.2)',
          margin: 0,
          fontWeight: 500
        }}>
          © 2026 SATYAM BHAGAT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
