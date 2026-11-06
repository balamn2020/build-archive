import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Code2, ArrowUpRight } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { playBeep } from '../lib/sound';

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    playBeep(700, 0.04);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-electric-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top telemetry tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-electric-cyan/30 bg-space-900/80 backdrop-blur-md mb-8 text-xs font-mono tracking-wide text-slate-300 shadow-lg shadow-electric-cyan/5"
        >
          <span className="flex h-2 w-2 rounded-full bg-electric-cyan animate-ping" />
          <span className="text-electric-cyan font-bold">ONE WHO CODES 2026</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">PERSONAL PORTFOLIO CHALLENGE</span>
        </motion.div>

        {/* Oversized Brand Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
        >
          <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-slate-400 block mb-2">
            THE DIGITAL UNIVERSE OF
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
            M B <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-blue">VISHAL</span>
          </h1>
        </motion.div>

        {/* Big Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-3xl mb-8"
        >
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-200 mb-4">
            {PROFILE_DATA.tagline}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
            I'm a developer who enjoys turning complex problems into interactive digital experiences. Exploring Operating Systems simulation, machine learning entropy, and creative frontend engineering.
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => handleScrollTo('projects')}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-electric-blue to-electric-cyan font-semibold text-space-950 font-sans text-sm tracking-wide shadow-glow-cyan transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>EXPLORE THE ARCHIVE</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => handleScrollTo('simulator')}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-slate-200 text-sm font-mono tracking-wide transition-all duration-300 hover:border-electric-cyan/50 hover:bg-white/10 hover:text-white"
          >
            <Terminal className="h-4 w-4 text-electric-cyan" />
            <span>LAUNCH OS SIMULATOR</span>
          </button>
        </motion.div>

        {/* Quick Micro Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl pt-6 border-t border-white/10"
        >
          {PROFILE_DATA.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold text-electric-cyan">
                {metric.value}
              </span>
              <span className="text-xs font-mono font-medium text-slate-300 mt-1">
                {metric.label}
              </span>
              <span className="text-[10px] text-slate-500 text-center mt-0.5">
                {metric.helper}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => handleScrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-electric-cyan transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">DISCOVER IDENTITY</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
};

