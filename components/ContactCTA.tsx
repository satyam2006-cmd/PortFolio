'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ContactCTA: React.FC = () => {
  return (
    <section style={{ 
      padding: '80px 4vw', 
      backgroundColor: '#f9f9f9', // Light background for the section wrapper
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '60px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#FF7A00', // Vibrant Orange
        borderRadius: '3.5rem',
        padding: '100px 80px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '480px',
        boxShadow: '0 40px 100px rgba(255, 122, 0, 0.25)',
        zIndex: 100 // Ensure it covers grid lines completely
      }}>
        {/* Concentric Circles Background - Refined */}
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.05, 0.15, 0.05], 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 4 + i, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
              style={{
                position: 'absolute',
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                border: '1.2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
              }}
            />
          ))}
          {/* Main glowing white center */}
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 75%)',
              borderRadius: '50%',
              filter: 'blur(10px)'
            }} 
          />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ 
              color: '#fff', 
              fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', 
              fontWeight: 900, 
              margin: 0, 
              lineHeight: 0.95,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-2px'
            }}
          >
            Let's Get In<br />Touch.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '1.2rem', 
              marginTop: '30px', 
              maxWidth: '480px',
              lineHeight: 1.5,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Your projects should serve you, not the other way around. We're happy to help you.
          </motion.p>

          <div style={{ display: 'flex', gap: '25px', marginTop: '60px', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '22px 38px',
                borderRadius: '100px',
                fontSize: '1.05rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                cursor: 'pointer',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Book a discovery call
              <div style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: '#D1D1D1', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(255,255,255,0.3)',
                background: 'linear-gradient(145deg, #f0f0f0, #cacaca)'
              }}>
                <div style={{ 
                  width: '14px', 
                  height: '14px', 
                  backgroundColor: '#999', 
                  borderRadius: '50%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }} />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '22px 38px',
                borderRadius: '100px',
                fontSize: '1.05rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                cursor: 'pointer',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Test Your Samples
              <div style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: '#D1D1D1', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(255,255,255,0.3)',
                background: 'linear-gradient(145deg, #f0f0f0, #cacaca)'
              }}>
                <div style={{ 
                  width: '14px', 
                  height: '14px', 
                  backgroundColor: '#999', 
                  borderRadius: '50%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }} />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
