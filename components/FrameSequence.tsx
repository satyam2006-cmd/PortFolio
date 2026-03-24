import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * FrameSequence renders a smooth parallax image sequence using a canvas.
 * It preloads all images from `public/frame 1/` and draws the appropriate
 * frame based on scroll progress. The container is wrapped in a motion.div
 * with a clip‑path that animates from a bottom semicircle to a full rectangle.
 */
const FrameSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress (0‑1) for the whole page
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  // Map scroll progress to frame index (1‑101)
  const frame = useTransform(scrollYProgress, [0, 1], [1, 101]);

  // Clip‑path animation – start as a small semicircle at the bottom
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [
      'ellipse(0% 0% at 50% 100%)',
      'ellipse(50% 30% at 50% 100%)',
      'ellipse(150% 150% at 50% 100%)',
    ]
  );

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

  // Draw current frame on canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const render = () => {
      const idx = Math.min(
        Math.max(Math.round(frame.get()) - 1, 0),
        images.current.length - 1
      );
      const img = images.current[idx];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        // Preserve aspect ratio
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
    };
    const unsubscribe = frame.onChange(render);
    render(); // initial render
    return () => unsubscribe();
  }, [frame]);

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
        clipPath,
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </motion.div>
  );
};

export default FrameSequence;
