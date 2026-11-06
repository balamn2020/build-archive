import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Compass
} from 'lucide-react';
import { JOURNEY_DATA, JourneyEvent } from '../data/journey';
import { playBeep } from '../lib/sound';

export const Journey: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Education', 'Competition', 'Milestone'];

  const filteredEvents =
    activeFilter === 'All'
      ? JOURNEY_DATA
      : JOURNEY_DATA.filter((e) => e.category === activeFilter);

  const getEventIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return <GraduationCap className="h-4 w-4" />;
      case 'Competition':
        return <Sparkles className="h-4 w-4" />;
      case 'Milestone':
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
              <span>MODULE 04 // DEVELOPER JOURNEY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              TIMELINE OF LEARNING & CODE
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    playBeep(700, 0.02);
                    setActiveFilter(cat);
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

        {/* Chronological Timeline Track */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 space-y-12">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-electric-cyan bg-space-950 text-electric-cyan shadow-glow-cyan transition-transform duration-300 group-hover:scale-125">
                {getEventIcon(event.category)}
              </div>

              {/* Event Content Card */}
              <div className="rounded-2xl border border-white/10 bg-space-900/60 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 group-hover:border-electric-cyan/40 group-hover:bg-space-900/90">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-bold text-white group-hover:text-electric-cyan transition-colors">
                      {event.year}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-mono text-slate-400">{event.period}</span>
                  </div>
                  <span className="text-[10px] font-mono rounded px-2.5 py-1 border border-white/10 bg-white/5 text-electric-cyan font-semibold">
                    {event.category.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Event Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  {event.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="h-1 w-1 rounded-full bg-electric-cyan" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

