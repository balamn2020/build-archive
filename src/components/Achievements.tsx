import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookmarkCheck,
  Medal,
  Terminal
} from 'lucide-react';
import { ACHIEVEMENTS_DATA, Achievement } from '../data/achievements';
import { playBeep } from '../lib/sound';

export const Achievements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Competition', 'Academic', 'Certification'];

  const filtered =
    activeCategory === 'All'
      ? ACHIEVEMENTS_DATA
      : ACHIEVEMENTS_DATA.filter((a) => a.category === activeCategory);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'Competition':
        return 'border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan';
      case 'Certification':
        return 'border-electric-blue/40 bg-electric-blue/10 text-electric-blue';
      case 'Academic':
      default:
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
    }
  };

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
              <span>MODULE 05 // CREDENTIALS & ACHIEVEMENTS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              VERIFIED MILESTONES & HONORS
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playBeep(700, 0.02);
                    setActiveCategory(cat);
                  }}
                  className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 ${
                    isActive
                      ? 'border border-electric-cyan bg-electric-cyan/15 text-white shadow-glow-cyan font-bold'
                      : 'border border-white/10 bg-space-900/60 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-electric-cyan/40 hover:bg-space-900/90 hover:shadow-2xl hover:shadow-electric-cyan/5"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-mono rounded-full border px-2.5 py-0.5 font-bold ${getBadgeStyle(
                      item.category
                    )}`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                </div>

                {/* Title & Issuer */}
                <h3 className="font-display text-lg font-bold text-white group-hover:text-electric-cyan transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-electric-cyan" />
                  <span>{item.issuer}</span>
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential Status Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{item.credentialId ? `ID: ${item.credentialId}` : 'VERIFIED PARTICIPATION'}</span>
                <span className="text-electric-cyan font-bold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> CONFIRMED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

