import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  CheckCircle,
  ExternalLink,
  Code
} from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { playBeep } from '../lib/sound';

export const About: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleResumeClick = () => {
    playBeep(750, 0.05);
    setDownloadSuccess(true);
    // Trigger download of resume document
    const link = document.createElement('a');
    link.href = '#contact';
    link.setAttribute('download', 'Vishal_MB_Resume.pdf');
    // Open contact/resume section smoothly
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
              <span>MODULE 01 // ARCHIVE IDENTITY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              THE DEVELOPER BEHIND THE SYSTEM
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-xs max-w-sm">
            ROOT ACCESS GRANTED: /identity/vishal_mb.json
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual System & Terminal Identity */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal Card */}
            <div className="rounded-2xl border border-white/10 bg-space-900/90 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-electric-cyan/5 rounded-full blur-2xl pointer-events-none" />

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">vishal@terminal:~$</span>
              </div>

              {/* Terminal Avatar & Specs */}
              <div className="flex flex-col items-center py-4 text-center">
                <div className="relative mb-5 flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-electric-cyan/40 bg-gradient-to-br from-space-800 to-space-950 p-2 shadow-glow-cyan">
                  {/* Futuristic Monogram / Illustrated Node */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-display text-4xl font-black text-electric-cyan">V</span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider">DEV_CORE</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-full border border-electric-cyan bg-space-950 px-2 py-0.5 text-[10px] font-mono text-electric-cyan">
                    B.Tech CSE
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white">M B Vishal</h3>
                <p className="text-xs font-mono text-electric-cyan mt-1">
                  Computer Science & Engineering Student
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                    <MapPin className="h-3 w-3 text-electric-cyan" /> Chennai, India
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                    <GraduationCap className="h-3 w-3 text-electric-cyan" /> SRMIST (2025–2029)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={handleResumeClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-electric-cyan/10 border border-electric-cyan/40 px-4 py-2.5 text-xs font-mono font-semibold text-electric-cyan hover:bg-electric-cyan/20 transition-all"
                >
                  <FileText className="h-4 w-4" />
                  <span>{downloadSuccess ? 'RESUME LOCATED' : 'GET RESUME / CV'}</span>
                </a>
                <a
                  href="https://github.com/balamn2020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-slate-300 hover:text-white hover:border-white/20 transition-all"
                >
                  <Code className="h-4 w-4" />
                  <span>GITHUB</span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Quick Education Callout */}
            <div className="rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl border border-electric-cyan/20 bg-electric-cyan/10 text-electric-cyan">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-electric-cyan uppercase">Undergraduate Program</span>
                  <h4 className="font-bold text-white text-base mt-1">
                    {PROFILE_DATA.education.degree}
                  </h4>
                  <p className="text-sm text-slate-300 mt-1">
                    {PROFILE_DATA.education.institution}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="inline-flex items-center gap-1 text-slate-300">
                      <Calendar className="h-3.5 w-3.5 text-electric-cyan" /> {PROFILE_DATA.education.period}
                    </span>
                    <span className="rounded-full bg-electric-cyan/10 px-2 py-0.5 text-electric-cyan font-bold">
                      {PROFILE_DATA.education.grade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-2xl border border-white/10 bg-space-900/40 p-8 backdrop-blur-md">
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Engineering at the Intersection of Systems & Interaction
              </h3>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Software is more than functional computation—it is a medium for human understanding. My journey as a Computer Science student at SRMIST Ramapuram is grounded in understanding both the low-level mechanics of computing and how those mechanics are felt by humans through creative user interfaces.
                </p>
                <p>
                  Rather than viewing operating systems, disk scheduling, and memory allocation as dry academic abstractions, I build interactive visualizers—such as the <strong className="text-electric-cyan">Custom File Allocation System Simulator</strong>—allowing learners and engineers to physically witness blocks link, index, and fragment in real time.
                </p>
                <p>
                  My engineering philosophy focuses on clean modular architectures, strict TypeScript typing, thoughtful micro-interactions, and accessible performance. Every project is crafted from genuine experiments and codebases without inflated claims.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1.5">
                    <CheckCircle className="h-4 w-4 text-electric-cyan" />
                    <span>Systems Visualization</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Transforming low-level OS algorithms (paging, disk scheduling, file allocations) into intuitive visual sandboxes.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1.5">
                    <CheckCircle className="h-4 w-4 text-electric-cyan" />
                    <span>Creative Frontend Craft</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Implementing hardware-accelerated Framer Motion choreography, responsive editorial grids, and minimal glass aesthetics.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1.5">
                    <CheckCircle className="h-4 w-4 text-electric-cyan" />
                    <span>Security & Entropy</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Investigating password vulnerability metrics, character Shannon entropy, and cryptographic verification sandboxes.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1.5">
                    <CheckCircle className="h-4 w-4 text-electric-cyan" />
                    <span>Performance & Accessibility</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    Respecting reduced motion, semantic HTML elements, lightweight bundles, and sub-millisecond execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote / Personal Creed */}
            <div className="p-6 rounded-2xl border-l-4 border-electric-cyan bg-space-900/60 pl-6">
              <p className="text-slate-200 font-serif italic text-base sm:text-lg">
                "A truly great developer does not just build something that works; they craft an experience that reveals how beautifully it works."
              </p>
              <span className="block mt-2 text-xs font-mono text-electric-cyan">
                — M B Vishal // The Build Archive
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

