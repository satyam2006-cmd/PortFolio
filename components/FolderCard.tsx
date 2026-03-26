'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FolderCardProps {
  src: string;
  alt: string;
  tabPosition?: 'left' | 'right';
  className?: string;
  label?: string;
  onClick?: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ 
  src, 
  alt, 
  tabPosition = 'left', 
  className, 
  label,
  onClick 
}) => {
  const isLeft = tabPosition === 'left';
  
  // Custom folder shape with a tab at the top
  // Left tab: Tab is on the left, then dips down to the main body on the right
  const clipPath = isLeft 
    ? 'polygon(0% 0%, 40% 0%, 45% 8%, 100% 8%, 100% 100%, 0% 100%)'
    : 'polygon(0% 8%, 55% 8%, 60% 0%, 100% 0%, 100% 100%, 0% 100%)';

  return (
    <motion.div 
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        clipPath: clipPath,
        backgroundColor: '#f5f5f5',
        zIndex: 1
      }}>
        <motion.img 
          src={src}
          alt={alt}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Subtle holographic/cinematic overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        
        {/* Scanning line effect on hover */}
        <motion.div 
          initial={{ top: '-100%' }}
          whileHover={{ top: '200%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(255,255,255,0.4)',
            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      </div>

      {label && (
        <div style={{
          position: 'absolute',
          top: isLeft ? '2%' : '10%',
          left: isLeft ? '4%' : 'auto',
          right: isLeft ? 'auto' : '4%',
          zIndex: 10,
          color: '#000',
          mixBlendMode: 'difference',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>■</span> {label}
        </div>
      )}
    </motion.div>
  );
};

export default FolderCard;
