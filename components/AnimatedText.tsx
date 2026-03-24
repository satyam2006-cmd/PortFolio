'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  el?: any;
  className?: string;
  once?: boolean;
  delay?: number;
  type?: 'chars' | 'words';
};

export const AnimatedText = ({
  text,
  el: Wrapper = 'p',
  className = '',
  once = true,
  delay = 0,
  type = 'chars' // 'chars' gives that detailed reveal, 'words' is better for long paragraphs
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  const defaultAnimations = {
    hidden: {
      y: '120%',
      // We don't use opacity 0 here because the overflow:hiden mask does the hiding visually. 
      // But adding a slight opacity fade alongside the y-transform looks premium.
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0], // Extremely smooth "exponential out" curve
      },
    },
  };

  const textArray = type === 'chars' ? text.split('') : text.split(' ');

  return (
    <Wrapper className={className} ref={ref} style={{ margin: 0, padding: 0 }}>
      {/* Screen readers will read this entire string normally */}
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        {text}
      </span>
      
      {/* The animated characters/words */}
      <motion.span
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        transition={{
          staggerChildren: type === 'chars' ? 0.05 : 0.08,
          delayChildren: delay,
        }}
        aria-hidden
        style={{ 
          display: 'inline', // Use inline to let parent letter-spacing work perfectly
          whiteSpace: 'pre',
          letterSpacing: 'inherit'
        }}
      >
        {textArray.map((element, i) => (
          <span
            key={i}
            style={{ 
              display: 'inline-block', // Only use inline-block for the animatable unit
              verticalAlign: 'bottom',
              position: 'relative',
              letterSpacing: 'inherit',
              // We use a small amount of padding to prevent stroke clipping
              padding: '0 2px' 
            }}
          >
            <motion.span
              style={{ 
                display: 'inline-block', 
                whiteSpace: 'pre',
                transformOrigin: 'left bottom',
                letterSpacing: 'inherit'
              }}
              variants={{
                hidden: {
                  y: '100%',
                  opacity: 0,
                  clipPath: 'inset(0 0 100% 0)'
                },
                visible: {
                  y: '0%',
                  opacity: 1,
                  clipPath: 'inset(0 0 0% 0)',
                  transition: {
                    duration: 1.2,
                    ease: [0.19, 1.0, 0.22, 1.0],
                  },
                },
              }}
            >
              {element === ' ' ? '\u00A0' : element}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
