'use client'

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Initialize offscreen
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast but elastic spring configuration feels premium
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    // Hide cursor when leaving the window
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers for magnetic/expanded state
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, isVisible]);

  const variants = {
    default: {
      height: 20,
      width: 20,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      height: 80,
      width: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
      opacity: isVisible ? 1 : 0,
    },
    click: {
      height: 15,
      width: 15,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
      opacity: isVisible ? 1 : 0,
    }
  };

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={isClicked ? 'click' : isHovered ? 'hover' : 'default'}
      initial="default"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: '50%',
      }}
    />
  );
}
