"use client";

import React from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '@/hooks/useIsMobile';

const profiles = [
  { 
    name: 'LeetCode', 
    url: 'https://leetcode.com/u/satyambhagat/', 
    icon: 'https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=000000',
    color: '#FFA116'
  },
  { 
    name: 'HackerRank', 
    url: 'https://www.hackerrank.com/satyambhagat2001',
    icon: 'https://img.icons8.com/?size=100&id=bcdiBt8pFXfZ&format=png&color=000000',
    color: '#2EC866'
  },
  { 
    name: 'GeeksforGeeks', 
    url: 'https://www.geeksforgeeks.org/profile/satyambhagwypf?tab=activity', 
    icon: 'https://img.icons8.com/?size=100&id=AbQBhN9v62Ob&format=png&color=000000',
    color: '#2F8D46'
  },
  { 
    name: 'Kaggle', 
    url: 'https://www.kaggle.com/satyambhagat', 
    icon: 'https://img.icons8.com/?size=100&id=QrYhwpUzAcoy&format=png&color=000000',
    color: '#20BEFF'
  },
  { 
    name: 'CodeChef', 
    url: 'https://www.codechef.com/users/satyambhagat', 
    icon: 'https://img.icons8.com/color/48/codechef.png',
    color: '#5B4638'
  },
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

const CodingProfilesSection = () => {
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
              Competitive Programming
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
              Coding <br /> Profiles
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
            My journey across various platforms, solving complex algorithmic challenges and data science problems.
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
          {profiles.map((profile) => (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ scale: 1.05, borderColor: '#111', backgroundColor: '#f8f8f8' }}
              style={{
                padding: isMobile ? '10px 16px' : '12px 24px',
                borderRadius: '100px',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '8px' : '12px',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <img 
                src={profile.icon} 
                alt={profile.name}
                style={{ 
                  width: isMobile ? '20px' : '24px', 
                  height: isMobile ? '20px' : '24px',
                  objectFit: 'contain'
                }} 
              />
              <span style={{ fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 700, color: '#111' }}>{profile.name}</span>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: profile.color
              }} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;
