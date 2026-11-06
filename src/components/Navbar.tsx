import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { toggleAudio, isAudioEnabled, playBeep } from '../lib/sound';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ARCHIVE', href: '#hero', id: 'hero' },
    { label: 'IDENTITY', href: '#about', id: 'about' },
    { label: 'LABORATORY', href: '#laboratory', id: 'laboratory' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'JOURNEY', href: '#journey', id: 'journey' },
    { label: 'CREDENTIALS', href: '#achievements', id: 'achievements' },
    { label: 'CONNECT', href: '#contact', id: 'contact' },
  ];

  const handleAudioToggle = () => {
    const nextState = toggleAudio();
    setSoundOn(nextState);
    if (nextState) playBeep(880, 0.08, 'sine');
  };

  const handleNavClick = (id: string) => {
    playBeep(650, 0.03, 'sine');
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between rounded-full border transition-all duration-300 px-5 py-2.5 ${
              scrolled
                ? 'border-white/10 bg-space-900/85 backdrop-blur-md shadow-2xl shadow-black/40'
                : 'border-white/5 bg-space-950/40 backdrop-blur-sm'
            }`}
          >
            {/* Logo / Monogram */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-electric-cyan/40 bg-electric-cyan/10 transition-transform duration-300 group-hover:scale-105 group-hover:border-electric-cyan">
                <Terminal className="h-4 w-4 text-electric-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-wider text-white">
                  BUILD ARCHIVE
                </span>
                <span className="text-[9px] font-mono tracking-widest text-electric-cyan uppercase">
                  M B VISHAL
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 font-mono text-xs">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full border border-electric-cyan/40 bg-electric-cyan/10"
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions: Sound Toggle + Status + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Sound Toggle */}
              <button
                onClick={handleAudioToggle}
                title={soundOn ? 'Mute audio cues' : 'Enable tactical sound effects'}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-electric-cyan/40 hover:text-electric-cyan"
                aria-label="Toggle audio feedback"
              >
                {soundOn ? (
                  <Volume2 className="h-3.5 w-3.5 text-electric-cyan" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 text-slate-400" />
                )}
              </button>

              {/* Status Pill - Desktop */}
              <div className="hidden md:flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVAILABLE 2026</span>
              </div>

              {/* CTA button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric-blue to-electric-cyan px-4 py-1.5 text-xs font-semibold text-space-950 transition-all duration-300 hover:shadow-glow-cyan hover:scale-[1.02]"
              >
                <span>INITIATE</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 mx-4 rounded-2xl border border-white/10 bg-space-900/95 p-6 backdrop-blur-2xl shadow-2xl lg:hidden"
          >
            <div className="flex flex-col space-y-3 font-mono text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
                    activeSection === item.id
                      ? 'border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan font-bold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-500 font-sans">0{navItems.indexOf(item) + 1}</span>
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">STATUS</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE 2026
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

