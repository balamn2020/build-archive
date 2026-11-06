import React from 'react';
import { Terminal, ArrowUp, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { playBeep } from '../lib/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playBeep(900, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-space-950 py-16 px-4 sm:px-6 lg:px-8 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <span className="font-display font-bold text-white tracking-wider text-sm">
              THE BUILD ARCHIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-sm">
            An interactive digital universe by M B Vishal. Crafted for the One Who Codes 2026 Portfolio Challenge by Acadable.
          </p>
        </div>

        {/* Center: Competition Badge */}
        <div className="flex items-center gap-2 rounded-full border border-electric-cyan/20 bg-space-900/80 px-4 py-1.5 text-[11px] text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-electric-cyan" />
          <span>ONE WHO CODES 2026 OFFICIAL ENTRY</span>
        </div>

        {/* Right: Back to top + Year */}
        <div className="flex items-center gap-6">
          <span className="text-[11px] text-slate-500">
            © 2026 M B VISHAL. ALL RIGHTS RESERVED.
          </span>
          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-electric-cyan transition-all"
            title="Return to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

