import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from './Carousel';
import ProjectGallery from './ProjectGallery';

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
            ? (side === 'left'
              ? '25px 25px 40px rgba(0,0,0,0.15)'
              : '-25px 25px 40px rgba(0,0,0,0.15)')
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
                borderLeft: (side === 'left') ? '4px solid rgba(255,255,255,0.9)' : '20px solid rgba(0,0,0,0.3)',
                borderTop: '4px solid rgba(255,255,255,0.9)',
                borderRight: (side === 'right') ? '4px solid rgba(255,255,255,0.9)' : '20px solid rgba(0,0,0,0.3)',
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
  const carouselItems = repos.map(repo => ({
    id: repo.name,
    title: repo.name.replace(/-/g, ' '),
    description: repo.description || 'No description provided.',
    url: repo.homepage || repo.html_url,
    tech: repo.language || undefined
  }));

  const bgStyle = side === 'right'
    ? 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 0, 0, 0.2) 0%, transparent 50%), linear-gradient(135deg, #FFB800 0%, #CC9900 40%, #5C4500 100%)'
    : bgColor;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: '2vw',
        borderRadius: '32px',
        background: bgStyle,
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        .expanded-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {side === 'right' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          zIndex: 1,
        }} />
      )}

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          color: '#fff',
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
        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
      >
        ✕
      </motion.button>

      {/* LEFT HALF: 25% */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '3%',
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 300, fontStyle: 'italic', color: '#fff', lineHeight: 0.9, textAlign: 'left', letterSpacing: '-2px' }}>
            Devlogs
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem, 3vw, 3rem)', fontWeight: 300, fontStyle: 'italic', color: '#fff', letterSpacing: '6px', textTransform: 'uppercase', marginTop: '10px' }}>
            & Story
          </span>
        </motion.div>

        <div style={{ height: '75%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            style={{
              position: 'absolute',
              width: '105%',
              height: '105%',
              backgroundColor: '#fff',
              WebkitMaskImage: `url(${imageSrc})`,
              maskImage: `url(${imageSrc})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '12px 12px',
              zIndex: 4,
              pointerEvents: 'none',
              filter: 'blur(0.5px)',
            }}
          />
          <motion.img
            src={imageSrc}
            alt="Astronaut"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3)) drop-shadow(20px 0 60px rgba(0,0,0,0.2))', zIndex: 5, position: 'relative' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', bottom: '30px', left: '30px', display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none', zIndex: 10 }}
        >
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00ff00', boxShadow: '0 0 8px #00ff00' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>STATUS: EXPLORING</span>
        </motion.div>
      </div>

      {/* VERTICAL DIVIDER */}
      <div style={{ width: '1px', backgroundColor: '#000', height: '100%', zIndex: 10, opacity: 0.8 }} />

      {/* RIGHT HALF: 75% */}
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column', zIndex: 10, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {side === 'left' && (carouselItems.length > 0) && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Carousel items={carouselItems} baseWidth={650} baseHeight={550} loop={true} />
          </div>
        )}

        {side === 'right' && (
          <div className="expanded-scroll" style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '80px 80px', background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(10px)', color: '#000', zIndex: 2 }}>
            <header style={{ marginBottom: '60px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 800, letterSpacing: '-2px', margin: 0, lineHeight: 1, color: '#000' }}>
                DEV LOGS
              </h2>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', letterSpacing: '0.5px', marginTop: '15px', maxWidth: '500px', lineHeight: 1.6, color: '#222', fontStyle: 'italic' }}>
                Journey through my growth, learning, and exploration
              </p>
            </header>

            <div style={{ position: 'relative', paddingLeft: '35px', marginBottom: '100px' }}>
              <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'rgba(0,0,0,0.1)' }} />
              {[
                { year: "2024", title: "Entered Engineering", points: ["Began Computer Science (Data Science)", "Built strong foundations in programming & problem-solving", "Explored system logic and core concepts"] },
                { year: "2024", title: "Development Phase", points: ["Started building web applications", "Learned Flask, frontend design, and system thinking", "Developed initial real-world applications"] },
                { year: "2025", title: "Data Science Journey Begins", points: ["Machine Learning, EDA, and model building", "Focused on data-driven problem solving", "Improved analytical thinking and model accuracy"] },
                { year: "2026", title: "Hackathons & Exploration", points: ["Participated in competitive hackathons", "Built real-world AI-based systems", "Focused on deployment and usability"] },
                { year: "2026", title: "Growth & Expansion", points: ["Advancing into intelligent systems and deep learning", "Improving performance, scalability, and design", "Exploring immersive web + AI integration"] }
              ].map((item, index) => (
                <div key={index} style={{ marginBottom: '45px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-34px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFB800', border: '2px solid rgba(255,255,255,0.4)', zIndex: 2 }} />
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 800, letterSpacing: '2px', marginBottom: '10px', color: '#000' }}>
                    {item.year} — {item.title.toUpperCase()}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.points.map((p, i) => (
                      <li key={i} style={{ fontSize: '1.15rem', color: '#333', fontWeight: 500, marginBottom: '12px', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: '#FFB800', fontWeight: 900 }}>■</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <section style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '60px', marginBottom: '80px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', marginBottom: '35px', fontWeight: 800, color: '#000' }}>THE STORY</h2>
              <div style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#111' }}>
                <p style={{ marginBottom: '25px', fontWeight: 700, color: '#000', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', lineHeight: 1.4 }}>
                  Bridging the gap between complex algorithms and human-centric design.
                </p>
                <p style={{ marginBottom: '30px', fontWeight: 500 }}>
                  I'm an aspiring Data Scientist and Developer based in India, dedicated to uncovering the stories hidden within data. My journey began with a curiosity for how systems work, which quickly evolved into a passion for the mathematical elegance of machine learning.
                </p>
                <p style={{ marginBottom: '30px', fontWeight: 500 }}>
                  Today, I focus on building intelligent applications that don't just process information, but provide clarity. Whether it's predicting market trends or optimizing user experiences, I believe that data is most powerful when it's accessible and actionable.
                </p>

                <div style={{ marginTop: '50px', marginBottom: '60px' }}>
                  <h3 style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '2.5px', opacity: 0.45, marginBottom: '20px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                    The Approach
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                    <div>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px', color: '#000' }}>Curiosity Driven</h4>
                      <p style={{ fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 500, color: '#333' }}>
                        Every project starts with a question. I dive deep into problem statements to understand the underlying mechanics before writing a single line of code.
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, marginBottom: '15px', color: '#000' }}>Design Minded</h4>
                      <p style={{ fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 500, color: '#333' }}>
                        Code is only half the battle. I ensure that every solution is accompanied by an intuitive interface, making complex data easy to digest.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '80px' }}>
                  <h3 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '3px', opacity: 0.5, marginBottom: '25px', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                    The Philosophy
                  </h3>
                  <div style={{ display: 'flex', gap: '25px', alignItems: 'stretch' }}>
                    <div style={{ width: '3px', backgroundColor: '#FFB800', borderRadius: '2px' }} />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.3, fontWeight: 500, margin: 0, color: '#000', letterSpacing: '-0.5px' }}>
                      "Data is the new oil, but intelligence is the refinement that makes it fuel for progress."
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '50px' }}>
                  <button
                    onClick={() => onClose()}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', color: '#000', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 800 }}
                  >
                    View Selected Projects <span style={{ fontSize: '1.3rem', opacity: 1 }}>→</span>
                  </button>
                </div>
              </div>
            </section>
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
    right: { src: "/rest2.jpg", expandedSrc: "/rest2-removebg-preview.png", title: "DEVLOGS\n& MY STORY", color: "#CC9900" }
  };

  useEffect(() => {
    fetch('https://api.github.com/users/satyam2006-cmd/repos?sort=updated&per_page=30')
      .then(res => res.json())
      .then((data: GitHubRepo[]) => {
        const filtered = data.filter(
          (r: GitHubRepo) => r.name !== 'satyam2006-cmd' && r.name !== 'PortFolio' && r.name !== 'Portfolio'
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
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontFamily: 'serif', textTransform: 'uppercase', letterSpacing: '1.2vw', fontWeight: 400, margin: 0 }}>
          E X P E R I E N C E
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '65%', maxWidth: '1200px', height: '72vh', maxHeight: '450px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', marginBottom: '5vh', position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: '4px', cursor: 'pointer' }}
      >
        <div onClick={() => setSelectedCard('left')}>
          <ExperienceCard {...cardData.left} side="left" />
        </div>
        <div onClick={() => setSelectedCard('right')}>
          <ExperienceCard {...cardData.right} side="right" />
        </div>
      </motion.div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedCard === 'left' && (
          <ProjectGallery key="left-gallery" onClose={() => setSelectedCard(null)} />
        )}
        {selectedCard === 'right' && (
          <ExpandedSectionView
            key="expanded-right"
            side="right"
            imageSrc={cardData.right.expandedSrc || cardData.right.src}
            bgColor={cardData.right.color}
            repos={repos}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceSection;
