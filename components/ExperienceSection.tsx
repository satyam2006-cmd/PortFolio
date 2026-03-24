import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
}

// ─── Experience Card (for the grid) ────────────────────────────────
const ExperienceCard = ({
  src,
  title,
  side
}: {
  src: string,
  title: string,
  side: 'left' | 'right'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTranslateX = side === 'left' ? -15 : 15;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '1000px',
        zIndex: isHovered ? 20 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          x: isHovered ? hoverTranslateX : 0,
          y: isHovered ? -15 : 0,
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered
            ? side === 'left'
              ? '25px 25px 40px rgba(0,0,0,0.15)'
              : '-25px 25px 40px rgba(0,0,0,0.15)'
            : '0px 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#f8f8f8',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <motion.img
          src={src}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? 'brightness(0.5)' : 'brightness(1)',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="hover-content-overlay"
              initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: side === 'left' ? -10 : 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                padding: '40px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: side === 'left' ? 'flex-start' : 'flex-end',
                textAlign: side === 'left' ? 'left' : 'right',
                zIndex: 40,
                pointerEvents: 'none',
              }}
            >
              <h3 style={{ 
                fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', 
                fontFamily: 'serif', 
                margin: '0', 
                fontWeight: 400,
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                textShadow: '0px 0px 25px rgba(0,0,0,0.9)'
              }}>
                {title.split(/\n|\\n/).map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isHovered && (
             <motion.div 
               key="hover-frame"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               style={{
                 position: 'absolute',
                 inset: 0,
                 borderLeft: side === 'left' ? '4px solid rgba(255,255,255,0.9)' : '20px solid rgba(0,0,0,0.3)',
                 borderTop: '4px solid rgba(255,255,255,0.9)',
                 borderRight: side === 'right' ? '4px solid rgba(255,255,255,0.9)' : '20px solid rgba(0,0,0,0.3)',
                 borderBottom: '20px solid rgba(0,0,0,0.4)',
                 pointerEvents: 'none',
                 zIndex: 35,
               }}
             />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

import Carousel from './Carousel';
import ProjectGallery from './ProjectGallery';

// ─── Expanded Section View (Split Layout) ───────────────────────────
const ExpandedSectionView = ({
  imageSrc,
  bgColor,
  repos,
  side,
  onClose,
}: {
  imageSrc: string;
  bgColor: string;
  repos: GitHubRepo[];
  side: 'left' | 'right';
  onClose: () => void;
}) => {
  // Map GitHub repos to Carousel format
  const carouselItems = repos.map(repo => ({
    id: repo.name,
    title: repo.name.replace(/-/g, ' '),
    description: repo.description || 'No description provided.',
    url: repo.homepage || repo.html_url,
    tech: repo.language || undefined
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: '2vw', // Give it a floating container look
        borderRadius: '32px',
        backgroundColor: bgColor,
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Background styling / Gradient for the right panel bleed */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 75% 50%, rgba(255,255,255,0.08) 0%, transparent 60%),
          linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 100%)
        `,
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          background: 'rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '50%',
          color: '#111', // dark for white background
          cursor: 'pointer',
          fontSize: '1.5rem',
          fontWeight: 300,
          zIndex: 1010,
          lineHeight: 1,
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        whileHover={{ scale: 1.1, background: 'rgba(0,0,0,0.1)' }}
      >
        ✕
      </motion.button>

      {/* LEFT HALF: White Container + Astronaut */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#f5f5f7', // pristine white-ish container
        zIndex: 10,
        pointerEvents: 'none', // let clicks pass through to background if needed
      }}>
        {/* subtle title on left side */}
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          fontFamily: 'serif',
          fontSize: '3rem',
          color: 'rgba(0,0,0,0.05)',
          fontWeight: 'bold',
          letterSpacing: '-2px',
          textAlign: 'right',
          lineHeight: 1,
        }}>
          EXPLORE<br/>PROJECTS
        </div>

        <motion.img
          src={imageSrc}
          alt="Astronaut"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '85%',
            objectFit: 'contain',
            filter: 'drop-shadow(20px 0 60px rgba(0,0,0,0.15))',
            transformOrigin: 'bottom center',
          }}
        />
      </div>

      {/* RIGHT HALF: Content (Carousel or Timeline) */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)', // slightly darker than the main card background
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden', // clips the coverflow carousel smoothly
      }}>
        {side === 'left' && carouselItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Carousel 
              items={carouselItems} 
              baseWidth={650} 
              baseHeight={550} 
              loop={true} 
            />
          </motion.div>
        )}

        {side === 'right' && (
          <div style={{
            textAlign: 'center',
            color: 'white',
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              COMING SOON
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '1rem', letterSpacing: '0.15em' }}
            >
              TIMELINE & BLOG
            </motion.p>
          </div>
        )}
      </div>

    </motion.div>
  );
};

// ─── Main Experience Section ────────────────────────────────────────
const ExperienceSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<'left' | 'right' | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const cardData = {
    left: { src: "/rest.jpg", expandedSrc: "/rest-removebg-preview.png", title: "SIDE\nPROJECTS", color: "#800000" },
    right: { src: "/rest2.jpg", expandedSrc: "/rest2-removebg-preview.png", title: "TIMELINE\nAND BLOG", color: "#CC9900" }
  };

  // Fetch GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/satyam2006-cmd/repos?sort=updated&per_page=30')
      .then(res => res.json())
      .then((data: GitHubRepo[]) => {
        const filtered = data.filter(
          (r) => r.name !== 'satyam2006-cmd' && r.name !== 'PortFolio' && r.name !== 'Portfolio'
        );
        setRepos(filtered);
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="experience"
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        color: '#111111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '10vh',
        position: 'relative',
        zIndex: 50,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', textAlign: 'center', marginBottom: '4vh', flexShrink: 0, zIndex: 1 }}
      >
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontFamily: 'serif',
          textTransform: 'uppercase',
          letterSpacing: '1.2vw',
          fontWeight: 400,
          margin: 0,
        }}>
          E X P E R I E N C E
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '65%',
          maxWidth: '1200px',
          height: '72vh',
          maxHeight: '450px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          marginBottom: '5vh',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <div onClick={() => setSelectedCard('left')}>
          <ExperienceCard {...cardData.left} side="left" />
        </div>
        <div onClick={() => setSelectedCard('right')}>
          <ExperienceCard {...cardData.right} side="right" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexShrink: 0,
          zIndex: 1,
        }}
      >
        {['LINKEDIN', 'GITHUB', 'INSTAGRAM', 'SPOTIFY', 'RESUME'].map((link) => (
          <a
            key={link}
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.15rem',
              textDecoration: 'none',
              color: '#111111',
              fontWeight: 600,
              opacity: 0.4,
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.4')}
          >
            {link}
          </a>
        ))}
      </motion.div>

      {/* Fullscreen Expanded View */}
      <AnimatePresence>
        {selectedCard === 'left' && (
          <ProjectGallery key="left-gallery" onClose={() => setSelectedCard(null)} />
        )}
        {selectedCard === 'right' && (
          <ExpandedSectionView
            key={selectedCard}
            side={selectedCard}
            imageSrc={cardData[selectedCard].expandedSrc || cardData[selectedCard].src}
            bgColor={cardData[selectedCard].color}
            repos={repos}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
