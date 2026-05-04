'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  // SSR guard — only render portal after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔒 Scroll lock: use CSS class to avoid fighting React's inline styles
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // ⌨️ ESC to close
  const stableClose = useCallback(() => onClose(), [onClose]);
  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') stableClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, stableClose]);

  // Don't render anything when closed or before hydration
  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
      }}
    >
      {/* BACKDROP */}
      <div
        onClick={stableClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          cursor: 'pointer',
        }}
      />

      {/* CONTENT */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '5vh',
          left: '5vw',
          right: '5vw',
          bottom: '5vh',
          borderRadius: '24px',
          background: '#111',
          overflow: 'hidden',
          display: 'flex',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
