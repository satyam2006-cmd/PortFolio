"use client";

import React from 'react';
import { motion } from 'framer-motion';
import StackIcon from 'tech-stack-icons';
import useIsMobile from '@/hooks/useIsMobile';

const techStack = [
  { name: 'Python', category: 'Language', iconId: 'py' },
  { name: 'JavaScript', category: 'Language', iconId: 'js' },
  { name: 'TypeScript', category: 'Language', iconId: 'ts' },
  { name: 'PyTorch', category: 'AI/ML', iconId: 'pytorch' },
  { name: 'TensorFlow', category: 'AI/ML', iconId: 'tensorflow' },
  { name: 'OpenCV', category: 'AI/ML', iconId: 'opencv' },
  { name: 'React', category: 'Frontend', iconId: 'react' },
  { name: 'Next.js', category: 'Frontend', iconId: 'nextjs' },
  { name: 'Tailwind', category: 'Frontend', iconId: 'tailwind' },
  { name: 'Scikit-learn', category: 'Data Science', iconId: 'sklearn' },
  { name: 'PostgreSQL', category: 'Database', iconId: 'postgres' },
  { name: 'MongoDB', category: 'Database', iconId: 'mongodb' },
  { name: 'Docker', category: 'DevOps', iconId: 'docker' },
  { name: 'Git', category: 'Tools', iconId: 'git' },
  { name: 'Figma', category: 'Design', iconId: 'figma' },
  { name: 'GitHub', category: 'Tools', techStackIconId: 'github' },
  { name: 'Hugging Face', category: 'AI/ML', techStackIconId: 'huggingface' },
  { name: 'Streamlit', category: 'Data Science', techStackIconId: 'streamlit' },
  { name: 'Pandas', category: 'Data Science', techStackIconId: 'pandas' },
  { name: 'NumPy', category: 'Data Science', techStackIconId: 'numpy' },
  { name: 'Google Colab', category: 'Tools', techStackIconId: 'colab' },
  { name: 'Framer', category: 'Design', techStackIconId: 'framer' },
  { name: 'Flask', category: 'Backend', techStackIconId: 'flask' },
  { name: 'FastAPI', category: 'Backend', iconId: 'fastapi' },
  { name: 'Jupyter', category: 'Tools', externalIcon: 'https://img.icons8.com/fluency/48/jupyter.png' },
  { name: 'DBeaver', category: 'Database', externalIcon: 'https://img.icons8.com/?size=100&id=kjaF4LlvyR6g&format=png&color=000000' },
  { name: 'Wix', category: 'Tools', externalIcon: 'https://img.icons8.com/?size=100&id=w9gsKSM38X2h&format=png&color=000000' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const TechnologiesSection = () => {
  const { isMobile } = useIsMobile();

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: isMobile ? '0 5vw 60px 5vw' : '0 8vw 120px 8vw',
        backgroundColor: 'transparent',
        zIndex: 10,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '24px' : '40px'
      }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? '16px' : '0' }}>
          <div>
            <h2 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#FF3D00',
              marginBottom: '16px'
            }}>
              Core Stack
            </h2>
            <h3 style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 900,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111'
            }}>
              Technologies <br /> & Frameworks
            </h3>
          </div>
          <p style={{
            maxWidth: isMobile ? '100%' : '300px',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: '#666',
            margin: 0,
            textAlign: isMobile ? 'left' : 'right'
          }}>
            A curated selection of tools I use to build intelligent, scalable, and beautiful digital experiences.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '8px' : '12px'
          }}
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ scale: 1.05, borderColor: '#111' }}
              style={{
                padding: isMobile ? '8px 14px' : '10px 20px',
                borderRadius: '100px',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '6px' : '10px',
                cursor: 'default',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              {(tech as any).techStackIconId ? (
                <div style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <StackIcon name={(tech as any).techStackIconId} />
                </div>
              ) : (tech as any).externalIcon ? (
                <img
                  src={(tech as any).externalIcon}
                  alt={tech.name}
                  style={{
                    width: isMobile ? '20px' : '24px',
                    height: isMobile ? '20px' : '24px',
                    borderRadius: '4px',
                    objectFit: 'contain'
                  }}
                />
              ) : tech.iconId ? (
                <img
                  src={`https://skillicons.dev/icons?i=${tech.iconId}&theme=light`}
                  alt={tech.name}
                  style={{
                    width: isMobile ? '20px' : '24px',
                    height: isMobile ? '20px' : '24px',
                    borderRadius: '4px'
                  }}
                />
              ) : null}
              {tech.name !== 'Wix' && <span style={{ fontSize: isMobile ? '0.8rem' : '0.95rem', fontWeight: 600, color: '#111' }}>{tech.name}</span>}
              <span style={{
                fontSize: isMobile ? '0.5rem' : '0.6rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#999',
                letterSpacing: '0.05em',
                marginLeft: '4px'
              }}>
                {tech.category}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TechnologiesSection;
