import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useScroll, useTransform, motion, useMotionValue } from 'framer-motion';

interface Props {
  children?: ReactNode;
}

const ProfileTextOverlay = ({ progress }: { progress: any }) => {
  const opacity = useTransform(progress, (v: number) => (v >= 0.025 ? 1 : 0));
  const x = useTransform(progress, (v: number) => (v >= 0.025 ? 0 : -10));

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '60px',
        left: '60px',
        bottom: '60px',
        color: '#fff',
        zIndex: 100,
        opacity,
        x,
        textAlign: 'left',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '1rem', fontWeight: 800 }}>THE PROFILE</p>
        <h2 style={{ fontSize: '3.2rem', fontFamily: 'serif', margin: '0 0 0.5rem 0', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>Satyam Bhagat</h2>
        <p style={{ fontSize: '1rem', fontFamily: 'serif', opacity: 0.5, fontStyle: 'italic', marginTop: '0.5rem' }}>Aspiring Data Scientist & Developer</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '0.5rem', fontWeight: 800 }}>LOCATION</p>
          <p style={{ fontSize: '1rem', fontWeight: 500 }}>India</p>
        </div>

        <div>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '0.5rem', fontWeight: 800 }}>EXPERTISE</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '1rem', fontWeight: 500 }}>
            <span>Machine Learning</span>
            <span>Development</span>
            <span>Data Visualization</span>
          </div>
        </div>

        <div>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '0.5rem', fontWeight: 800 }}>LEARNING</p>
          <p style={{ fontSize: '1rem', fontWeight: 500 }}>Deep Learning</p>
        </div>

        <div>
          <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '1.2rem', fontWeight: 800 }}>CONNECT</p>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="http://github.com/satyam2006-cmd/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="mailto:satyambhagat200623@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/satyam-bhagat2006/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EducationOverlay = ({ progress }: { progress: any }) => {
  const opacity = useTransform(progress, (v: number) => (v >= 0.025 ? 1 : 0));
  const x = useTransform(progress, (v: number) => (v >= 0.025 ? 0 : 10));

  return (
    <motion.div
      style={{
        position: 'absolute',
        right: '60px',
        bottom: '60px',
        color: '#fff',
        zIndex: 100,
        opacity,
        x,
        textAlign: 'right',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '1.5rem', fontWeight: 800 }}>Education</p>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.5, marginBottom: '0.4rem' }}>2024-PRESENT</p>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'serif', margin: '0 0 0.3rem 0', fontWeight: 400, lineHeight: 1.1 }}>Bachelor of Technology</h2>
          <p style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>Computer Science (Data Science)</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.4, fontStyle: 'italic', marginTop: '0.5rem', fontWeight: 400 }}>St. John College of Engineering and Management</p>
        </div>

        <div>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.5, marginBottom: '0.4rem' }}>2020-2022</p>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'serif', margin: '0 0 0.3rem 0', fontWeight: 400, lineHeight: 1.1 }}>Pre-University</h2>
          <p style={{ fontSize: '0.85rem', opacity: 0.4, fontStyle: 'italic', marginTop: '0.5rem', fontWeight: 400 }}>Sau Sitabai Ramkrishna Karandikar College</p>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollRevealParallax: React.FC<Props> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [targetContainer, setTargetContainer] = useState<HTMLElement | null>(null);
  const time = useMotionValue(0);

  useEffect(() => {
    setScrollContainer(document.getElementById('scroll-container'));
    setTargetContainer(document.getElementById('parallax-target'));

    let animationFrame: number;
    const animate = (t: number) => {
      time.set(t);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetContainer ? { current: targetContainer } : undefined,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ['start start', 'end end'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.025],
    ['circle(0% at 50% 100%)', 'circle(150% at 50% 100%)']
  );

  const frame = useTransform(scrollYProgress, [0.025, 1], [0, 193]);

  // Preload images
  const images = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    const loadImages = async () => {
      const promises = [];
      for (let i = 9; i <= 101; i++) {
        const img = new Image();
        img.src = `/frame%201/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        promises.push(new Promise<void>((resolve) => { img.onload = () => resolve(); }));
        images.current.push(img);
      }
      for (let i = 1; i <= 101; i++) {
        const img = new Image();
        img.src = `/frame%202/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        promises.push(new Promise<void>((resolve) => { img.onload = () => resolve(); }));
        images.current.push(img);
      }
      await Promise.all(promises);
    };
    loadImages();
  }, []);

  // Render canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const render = () => {
      const baseFrame = frame.get();
      let idx;

      if (baseFrame < 86) {
        // Folder 1: Breathe but NEVER cross into Folder 2 frames
        const oscillation = Math.sin(time.get() / 400) * 2.5;
        idx = Math.min(Math.round(baseFrame + oscillation), 92);
      } else {
        // Folder 2: Absolute static scroll tracking
        idx = Math.round(baseFrame);
      }

      idx = Math.min(Math.max(idx, 0), images.current.length - 1);

      const img = images.current[idx];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        const ratio = img.width / img.height;
        const canvasRatio = canvasRef.current!.width / canvasRef.current!.height;
        let drawWidth = canvasRef.current!.width;
        let drawHeight = canvasRef.current!.height;
        if (ratio > canvasRatio) {
          drawHeight = canvasRef.current!.height;
          drawWidth = drawHeight * ratio;
        } else {
          drawWidth = canvasRef.current!.width;
          drawHeight = drawWidth / ratio;
        }
        const dx = (canvasRef.current!.width - drawWidth) / 2;
        const dy = (canvasRef.current!.height - drawHeight) / 2;
        ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
      }
    };

    const unsubscribeScroll = frame.on('change', render);
    const unsubscribeTime = time.on('change', render);
    render();
    return () => {
      unsubscribeScroll();
      unsubscribeTime();
    };
  }, [frame, time]);

  // Handle resize
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.width = parent.clientWidth;
          canvasRef.current.height = parent.clientHeight;
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <div id="parallax-container" style={{ position: 'absolute', top: '30.5px', left: '30.5px', right: '30.5px', bottom: '30.5px', pointerEvents: 'none', zIndex: 40 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: '12px',
            clipPath,
            background: 'transparent',
            pointerEvents: 'auto',
          }}
        >
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />

          {/* Unified Profile HUD - Instant at 0.05 progress */}
          <ProfileTextOverlay progress={scrollYProgress} />
          
          {/* Education Overlay - Instant at 0.5 progress */}
          <EducationOverlay progress={scrollYProgress} />
        </motion.div>
      </div>
    </>
  );
};

export default ScrollRevealParallax;
