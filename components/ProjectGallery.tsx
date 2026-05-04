'use client'

import React, { useEffect, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import Carousel from './Carousel';
import { ArrowRight } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  created_at: string;
}

interface ProjectGalleryProps {
  onClose: () => void;
}

const ProjectGallery = forwardRef<HTMLDivElement, ProjectGalleryProps>(({ onClose }, ref) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    // Give Framer Motion time to release pointer capture before unmounting
    setTimeout(() => {
      onClose();
    }, 150);
  };

  // Fetch GitHub repos
  useEffect(() => {
    // Fetch by created date
    fetch('https://api.github.com/users/satyam2006-cmd/repos?sort=created&direction=desc&per_page=12')
      .then(res => res.json())
      .then((data: GitHubRepo[]) => {
        const filtered = data.filter(
          (r) => r.name !== 'satyam2006-cmd' && r.name !== 'PortFolio' && r.name !== 'Portfolio'
        );
        // Prioritize live projects, then sort by creation date (newest first)
        const sorted = filtered.sort((a, b) => {
          const aHasLive = !!a.homepage;
          const bHasLive = !!b.homepage;

          if (aHasLive !== bHasLive) {
            return aHasLive ? -1 : 1;
          }

          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setRepos(sorted);
      })
      .catch(console.error);
  }, []);

  const carouselItems = repos.map(repo => ({
    id: repo.name,
    title: repo.name.replace(/-/g, ' '),
    description: repo.description || '',
    url: repo.homepage || repo.html_url,
    tech: repo.language || undefined,
    // Start with the user's custom 'webpreview.png', then fallback to social preview service
    image: `https://raw.githubusercontent.com/satyam2006-cmd/${repo.name}/main/webpreview.png`
  }));

  // Fallback items if GitHub fetch fails or is pending
  const displayItems = carouselItems.length > 0 ? carouselItems : [
    { id: 1, title: 'Loading...', description: 'Fetching projects from GitHub', url: '' }
  ];

  return (
    <div
      style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: 'radial-gradient(135deg, #cb3434d3 0%, #800000 100%)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background Text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '15vw',
        fontWeight: 900,
        color: 'rgba(246, 6, 6, 0.15)',
        whiteSpace: 'nowrap',
        zIndex: 0,
        pointerEvents: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.01em'
      }}>
        EXPLORE   PROJECTS
      </div>

      {/* Astro Image (Static) */}
      <img
        src="/rest-removebg-preview.png"
        alt="Astronaut"
        style={{
          position: 'absolute',
          left: '5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '40vw',
          height: 'auto',
          maxHeight: '85vh',
          objectFit: 'contain',
          zIndex: 5,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 100px rgba(139, 0, 0, 0.3))' // Keep the soft glow
        }}
      />


      {/* Main Content Area */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 5vw',
        overflow: 'hidden'
      }}>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '30px',
            right: '40px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.5rem',
            fontWeight: 300,
            zIndex: 1010,
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
        >
          ✕
        </motion.button>

        {/* Right Side - Curved Carousel */}
        <div style={{
          flex: '0 0 50%',
          marginLeft: 'auto', // Push to right
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
          zIndex: 20
        }}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{ width: '100%', height: '80vh' }}
          >
            <Carousel
              items={displayItems}
              baseWidth={520}
              baseHeight={340}
              disableInteraction={isClosing}
              themeColor="red"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
});

export default ProjectGallery;

