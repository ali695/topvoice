'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioUrl: string;
  duration?: number;
  fileName?: string;
}

export function AudioPlayer({ audioUrl, duration, fileName = 'voicegen-audio.mp3' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration || 0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setTotalDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = parseFloat(e.target.value);
    audio.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = fileName;
    a.click();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Waveform bars animation */}
      <div className="flex items-center gap-0.5 h-8 mb-4 justify-center">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-violet-600 to-cyan-400"
            animate={isPlaying ? {
              height: [4, Math.random() * 24 + 4, 4],
            } : { height: 4 }}
            transition={{
              duration: 0.4 + Math.random() * 0.4,
              repeat: isPlaying ? Infinity : 0,
              delay: i * 0.04,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <input
          type="range"
          min={0}
          max={totalDuration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #7c3aed ${progress}%, rgba(255,255,255,0.1) ${progress}%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-white/40 font-mono">{formatTime(currentTime)}</span>
          <span className="text-xs text-white/40 font-mono">{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={restart}>
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant={isPlaying ? 'outline' : 'glow'}
            size="icon"
            onClick={togglePlay}
            className="w-10 h-10"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 flex-1 max-w-28 mx-4">
          <Volume2 className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolume}
            className="w-full h-1 cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(124,58,237,0.8) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
            }}
          />
        </div>

        <Button variant="secondary" size="sm" onClick={handleDownload} className="flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Download
        </Button>
      </div>
    </div>
  );
}
