import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  intensity?: 'low' | 'high';
}

const Background: React.FC<BackgroundProps> = ({ intensity = 'low' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; speed: number; opacity: number }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Create falling data particles
    const particleCount = intensity === 'high' ? 100 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(5, 5, 10, 0.2)'; // Dark fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22d3ee'; // Cyan particles

      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }

        // Draw digital "bit"
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(p.x, p.y, 2, 8); // Long pixel shape
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
      {/* 3D Moving Grid (CSS Implementation in index.html) */}
      <div className="cyber-grid opacity-30"></div>
      
      {/* Canvas for Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient-vignette opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
    </div>
  );
};

export default Background;