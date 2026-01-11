import React, { useRef, useEffect } from 'react';
import { ARRAY_SIZE, THEME } from '../constants';

interface GameCanvasProps {
  data: number[];
  activeIndices: number[];
  pivotIndex?: number;
  label: string;
  colorTheme: 'player' | 'cpu';
  finished: boolean;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  data, 
  activeIndices, 
  pivotIndex,
  label, 
  colorTheme,
  finished
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = THEME[colorTheme];

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays & Resizing
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    } else {
        ctx.clearRect(0, 0, rect.width, rect.height);
    }
    
    ctx.clearRect(0, 0, rect.width, rect.height);

    const barWidth = rect.width / ARRAY_SIZE;
    const maxVal = Math.max(ARRAY_SIZE, ...data);

    data.forEach((value, index) => {
      const barHeight = (value / maxVal) * (rect.height * 0.9);
      const x = index * barWidth;
      const y = rect.height - barHeight;

      let fillStyle = theme.primary;
      let shadowBlur = 0;
      let shadowColor = 'transparent';

      if (finished) {
         fillStyle = '#10b981'; // Success Green
         shadowBlur = 15;
         shadowColor = '#10b981';
      } else if (pivotIndex === index) {
        fillStyle = '#facc15'; // Yellow
        shadowBlur = 20;
        shadowColor = '#facc15';
      } else if (activeIndices.includes(index)) {
        fillStyle = '#ffffff'; // White flash
        shadowBlur = 15;
        shadowColor = '#ffffff';
      } else {
         // Default glow for normal bars to look "neon"
         shadowBlur = 5;
         shadowColor = theme.glow;
      }

      ctx.fillStyle = fillStyle;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowColor = shadowColor;
      
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x + 1, y, Math.max(1, barWidth - 2), barHeight, [2, 2, 0, 0]);
      } else {
        ctx.rect(x + 1, y, Math.max(1, barWidth - 2), barHeight);
      }
      ctx.fill();
    });
  };

  useEffect(() => {
    draw();
  }, [data, activeIndices, pivotIndex, label, theme, finished]);

  useEffect(() => {
    const handleResize = () => {
        window.requestAnimationFrame(draw);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return (
    <div className="relative w-full h-48 md:h-64 bg-slate-900/80 rounded border border-slate-800 overflow-hidden shadow-inner backdrop-blur-sm group">
      {/* Label Badge */}
      <div 
        className="absolute top-2 left-3 z-10 px-2 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase border border-white/10 backdrop-blur-md" 
        style={{ color: theme.accent, backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        {label}
      </div>
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-90 group-hover:opacity-100 transition-opacity"
        aria-label={`Visualization of sorting algorithm for ${label}`}
        role="img"
      />
    </div>
  );
};

export default GameCanvas;