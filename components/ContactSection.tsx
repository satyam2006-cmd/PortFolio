'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FolderCard from './FolderCard';
import useIsMobile from '@/hooks/useIsMobile';

const ContactSection: React.FC = () => {
  const { isMobile, isSmall } = useIsMobile();

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'transparent', // Unified white background from parent
        color: '#000000',
        padding: isMobile ? '60px 0 40px 0' : '120px 0 40px 0',
        position: 'relative',
        zIndex: 10,
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        borderTop: 'none',
        scrollMarginTop: '100px'
      }}
    >
      {/* Background Graphic - Subtle Circle */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Row 1: The Massive "GET IN TOUCH" Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: isMobile ? '50px' : '100px',
        position: 'relative',
        zIndex: 10,
        padding: '0 4vw',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: isSmall ? '0.8rem' : '1rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '20px', opacity: 0.8 }}>
          Got a project? Need a creative partner?
        </span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2rem, 12vw, 12rem)',
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
            letterSpacing: '-0.06em',
            textTransform: 'uppercase',
            color: '#1A1A1A',
            whiteSpace: isMobile ? 'normal' : 'nowrap'
          }}
        >
          GET IN TOUCH
        </motion.h2>
      </div>

      {/* Row 2: Navigation Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '30px' : '4vw',
        position: 'relative',
        zIndex: 10,
        padding: isMobile ? '0 6vw' : '0 8vw',
        marginBottom: '40px'
      }}>
        {/* Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '20px' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', opacity: 0.4 }}>NAVIGATION</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: isMobile ? '16px' : '10px' }}>
            {[
              { name: 'Home', id: '#home' },
              { name: 'Projects', id: '#projects' },
              { name: 'Timeline', id: '#timeline' },
              { name: 'Contact', id: '#contact' }
            ].map(item => (
              <li key={item.name} style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}>
                <motion.a
                  href={item.id}
                  whileHover={{ opacity: 0.5 }}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '20px' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', opacity: 0.4 }}>SOCIALS</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: isMobile ? '16px' : '10px' }}>
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/satyam_bhagat___/' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/satyam-bhagat2006/' },
              { name: 'GitHub', url: 'https://github.com/satyam2006-cmd/' }
            ].map(item => (
              <li key={item.name} style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 600, cursor: 'pointer' }}>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ opacity: 0.5 }}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {item.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources / Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '20px' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', opacity: 0.4 }}>CONTACT</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <motion.a
              href="mailto:satyambhagat20061023@gmail.com"
              whileHover={{ opacity: 0.5 }}
              style={{ fontSize: isSmall ? '0.85rem' : '1.1rem', fontWeight: 600, margin: 0, color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}
            >
              satyambhagat20061023@gmail.com
            </motion.a>
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, opacity: 0.5 }}>Based in India</p>
          <motion.a
            href="tel:+917620548131"
            whileHover={{ scale: 1.02 }}
            style={{
              background: '#000', color: '#FFF', border: 'none', padding: isMobile ? '12px 20px' : '15px 30px', borderRadius: '100px',
              fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', marginTop: isMobile ? '10px' : '20px', width: 'fit-content',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            CALL (+91) 7620548131
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
