'use client';

import { useEffect, useRef } from 'react';

interface WaveformBackgroundProps {
  animated?: boolean;
  className?: string;
}

export function WaveformBackground({ animated = true, className = '' }: WaveformBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const WAVES = [
      { freq: 0.012, amp: 28, speed: 0.008, color: 'rgba(139,92,246,0.25)', y: 0.5 },
      { freq: 0.018, amp: 18, speed: 0.012, color: 'rgba(6,182,212,0.18)', y: 0.48 },
      { freq: 0.008, amp: 38, speed: 0.005, color: 'rgba(139,92,246,0.12)', y: 0.52 },
      { freq: 0.025, amp: 12, speed: 0.02, color: 'rgba(6,182,212,0.10)', y: 0.5 },
      { freq: 0.006, amp: 50, speed: 0.003, color: 'rgba(245,158,11,0.06)', y: 0.5 },
    ];

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      WAVES.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 8;

        for (let x = 0; x <= width; x += 2) {
          const y =
            wave.y * height +
            Math.sin(x * wave.freq + t * wave.speed * 100) * wave.amp +
            Math.sin(x * wave.freq * 0.5 + t * wave.speed * 70) * (wave.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Bar waveform in center
      const barCount = 64;
      const barWidth = (width * 0.6) / barCount;
      const startX = width * 0.2;

      for (let i = 0; i < barCount; i++) {
        const barH =
          Math.abs(Math.sin(i * 0.3 + t * 0.04)) * 40 +
          Math.abs(Math.sin(i * 0.15 + t * 0.025)) * 20 + 4;

        const x = startX + i * barWidth;
        const alpha = 0.15 + Math.abs(Math.sin(i * 0.3 + t * 0.04)) * 0.3;

        const gradient = ctx.createLinearGradient(x, height / 2 - barH, x, height / 2 + barH);
        gradient.addColorStop(0, `rgba(139,92,246,${alpha})`);
        gradient.addColorStop(0.5, `rgba(6,182,212,${alpha * 1.3})`);
        gradient.addColorStop(1, `rgba(139,92,246,${alpha})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, height / 2 - barH, barWidth - 1, barH * 2, 2);
        ctx.fill();
      }

      if (animated) {
        t += 1;
        animRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
