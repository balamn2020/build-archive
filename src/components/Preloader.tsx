import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';
import { playBeep } from '../lib/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "MOUNTING REPOSITORIES & TELEMETRY",
    "INITIALIZING OPERATING SYSTEMS LAB",
    "CALIBRATING ZERO-G GRAPHICS PIPELINE",
    "THE BUILD ARCHIVE ONLINE"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 25 && next < 50) setCurrentStep(1);
        else if (next >= 50 && next < 85) setCurrentStep(2);
        else if (next >= 85) setCurrentStep(3);
        
        if (next % 20 < 8) {
          playBeep(400 + next * 4, 0.02, 'sine');
        }
        return Math.min(next, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-950 px-6 font-mono text-slate-200 select-none"
      >
        <div className="relative w-full max-w-md rounded-2xl border border-electric-cyan/20 bg-space-900/90 p-8 shadow-2xl shadow-electric-cyan/5 backdrop-blur-xl">
          {/* Header indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs tracking-wider text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-cyan opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-electric-cyan"></span>
              </span>
              <span>CORE ARCHIVE INITIALIZER</span>
            </div>
            <span className="text-electric-cyan">v2026.01</span>
          </div>

          {/* Central Logo & Monogram */}
          <div className="my-8 flex flex-col items-center text-center">
            <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-electric-cyan/30 bg-electric-cyan/5 shadow-glow-cyan">
              <Terminal className="h-10 w-10 text-electric-cyan animate-pulse" />
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-electric-blue text-[10px] text-white">
                <Zap className="h-3 w-3" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-black tracking-tight text-white">
              THE BUILD ARCHIVE
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              M B VISHAL // CREATIVE DEVELOPER
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{steps[currentStep]}</span>
              <span className="font-bold text-electric-cyan">{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-blue via-electric-cyan to-white"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Bottom telemetry footer */}
          <div className="mt-6 flex items-center justify-between pt-2 text-[10px] text-slate-500 border-t border-white/5">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-electric-cyan/70" />
              <span>ACADABLE PORTFOLIO CHALLENGE</span>
            </div>
            <span>60 FPS READY</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

