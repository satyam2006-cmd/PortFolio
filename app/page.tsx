'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollRevealParallax from '@/components/ScrollRevealParallax'
import Navbar from '@/components/Navbar'
import { AnimatedText } from '@/components/AnimatedText'
import Preloader from '@/components/Preloader'
import ExperienceSection from '@/components/ExperienceSection'

const menuItems = ['Home', 'Projects', 'Timeline', 'Contact']

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="main-viewport">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Background for when content shrinks */}
      <div className="app-background" />

      {/* FIXED GLOBAL GRID SYSTEM (Does not shrink) */}
      <div className="grid-overlay">
        <div className="grid-frame" />
        <div className="grid-line-v" style={{ gridColumn: 4 }} />
        <div className="grid-line-v" style={{ gridColumn: 7 }} />
        <div className="grid-line-v" style={{ gridColumn: 10 }} />
        <div className="grid-line-h" style={{ gridRow: 4 }} />
        <div className="grid-line-h" style={{ gridRow: 7 }} />
        <div className="grid-line-h" style={{ gridRow: 10 }} />
      </div>

      {/* MENU ITEMS (Integrated at the top) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="menu-list">
              {menuItems.map((item, i) => (
                <motion.li 
                  key={item} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="menu-item"
                >
                  <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON */}
      <motion.div
        animate={{ y: isOpen ? 80 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 3000 }}
      >
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.div>

      {/* THE SHRINKING CONTENT CONTAINER */}
      <motion.div 
        id="scroll-container"
        className="page-wrapper"
        animate={{
          scale: isOpen ? 0.92 : 1,
          borderRadius: isOpen ? '40px' : '0px',
          y: isOpen ? 100 : 0,
          opacity: isOpen ? 0.8 : 1
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        style={{
          transformOrigin: 'top center',
          boxShadow: isOpen ? '0 100px 200px rgba(0,0,0,0.15)' : 'none',
          overflow: isOpen ? 'hidden' : 'auto',
          background: '#000000',
          zIndex: 10
        }}
      >
        <main className="content-layer">
          <div id="parallax-target" style={{ height: '600vh', position: 'relative' }}>
            <section className="hero-section">
              <div className="hero-enclosure" />

              <div className="hero-composition">
                <AnimatedText text="HI THERE !" el="h2" className="hi-there" delay={0.2} type="chars" />

                <div className="text-layer-solid">
                  <AnimatedText text="I'M SATYAM" el="h1" className="top-text" delay={0.8} type="chars" />
                  <AnimatedText text="BHAGAT" el="h1" className="bottom-text" delay={1.4} type="chars" />
                </div>

                <div className="astronaut-img-wrapper">
                  <motion.img 
                    src="/astronaut.png" 
                    alt="Astronaut" 
                    className="astronaut-img"
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
                  />
                </div>

                <div className="text-layer-outline">
                  <AnimatedText text="I'M SATYAM" el="h1" className="top-text" delay={0.8} type="chars" />
                  <AnimatedText text="BHAGAT" el="h1" className="bottom-text" delay={1.4} type="chars" />
                </div>
              </div>

              <ScrollRevealParallax />
            </section>
          </div>
          <ExperienceSection />
        </main>
      </motion.div>
      </motion.div>
    </div>
  )
}
