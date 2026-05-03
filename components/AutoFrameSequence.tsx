import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * AutoFrameSequence renders an autoplaying image sequence using a canvas.
 * It preloads images from `public/frame%201/` and plays them at ~30fps.
 * The container reveals itself with a growing semicircle animation on mount.
 */
const AutoFrameSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  // Preload images once
  const images = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    const loadImages = async () => {
      const promises = [];
      for (let i = 1; i <= 101; i++) {
        const img = new Image();
        img.src = `/frame%201/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        promises.push(
          new Promise<void>((resolve) => {
            img.onload = () => resolve();
          })
        );
        images.current.push(img);
      }
      await Promise.all(promises);
    };
    loadImages();
  }, []);

  // Autoplay frames at ~30fps
  useEffect(() => {
    const total = images.current.length;
    if (total === 0) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % total);
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, []);

  // Draw current frame on canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const img = images.current[frameIndex];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      const ratio = img.width / img.height;
      const canvasRatio = canvasRef.current!.width / canvasRef.current!.height;
      let drawWidth = canvasRef.current!.width;
      let drawHeight = canvasRef.current!.height;
      if (ratio > canvasRatio) {
        drawHeight = drawWidth / ratio;
      } else {
        drawWidth = drawHeight * ratio;
      }
      const dx = (canvasRef.current!.width - drawWidth) / 2;
      const dy = (canvasRef.current!.height - drawHeight) / 2;
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    }
  }, [frameIndex]);

  // Resize canvas to fill container
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
      initial={{ clipPath: 'ellipse(0% 0% at 50% 100%)' }}
      animate={{ clipPath: 'ellipse(150% 150% at 50% 100%)' }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </motion.div>
  );
};

export default AutoFrameSequence;
