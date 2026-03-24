'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="preloader-modern"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ 
        clipPath: 'inset(0 0 100% 0)',
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#050505',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      {/* Helmet Loader Video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <video
          src="/helmet loader.webm"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* Minimal Progress Line */}
      <div style={{ 
        width: '200px', 
        height: '1px', 
        background: 'rgba(255,255,255,0.1)', 
        position: 'relative',
        marginTop: '2rem',
      }}>
        <motion.div 
          style={{ 
            height: '100%', 
            width: `${percent}%`, 
            background: '#fff',
            boxShadow: '0 0 20px #fff'
          }} 
        />
      </div>

      {/* Status Text */}
      <div style={{ marginTop: '1rem', fontSize: '0.65rem', opacity: 0.3, letterSpacing: '0.2em' }}>
        {percent}%
      </div>
    </motion.div>
  );
}
