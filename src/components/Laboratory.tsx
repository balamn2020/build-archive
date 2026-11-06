import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Cpu,
  Wrench,
  Terminal,
  Zap,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { SKILLS_DATA, SkillItem, SkillCategory } from '../data/skills';
import { playBeep } from '../lib/sound';

export const Laboratory: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SKILLS_DATA[0].id);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0].skills[0]);

  const activeCategory = SKILLS_DATA.find((c) => c.id === activeCategoryId) || SKILLS_DATA[0];

  const handleCategorySelect = (id: string) => {
    playBeep(750, 0.03);
    setActiveCategoryId(id);
    const cat = SKILLS_DATA.find((c) => c.id === id);
    if (cat && cat.skills.length > 0) {
      setSelectedSkill(cat.skills[0]);
    }
  };

  const handleSkillSelect = (skill: SkillItem) => {
    playBeep(850, 0.02);
    setSelectedSkill(skill);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'programming':
        return <Code2 className="h-4 w-4" />;
      case 'frontend':
        return <Layout className="h-4 w-4" />;
      case 'systems':
        return <Cpu className="h-4 w-4" />;
      case 'tools':
      default:
        return <Wrench className="h-4 w-4" />;
    }
  };

  return (
    <section id="laboratory" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
              <span>MODULE 02 // TECHNICAL LABORATORY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              SKILLS & SYSTEMS CAPABILITIES
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-xs max-w-sm">
            NO ARBITRARY PERCENTAGES. GROUNDED IN GENUINE IMPLEMENTATION.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2">
          {SKILLS_DATA.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-electric-cyan/15 border border-electric-cyan text-white shadow-glow-cyan font-bold'
                    : 'border border-white/10 bg-space-900/60 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span className={isActive ? 'text-electric-cyan' : 'text-slate-500'}>
                  {getCategoryIcon(category.id)}
                </span>
                <span>{category.title.toUpperCase()}</span>
                <span className="text-[10px] opacity-60">({category.skills.length})</span>
              </button>
            );
          })}
        </div>

        {/* Laboratory Main Content: Grid + Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Skill Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {activeCategory.skills.map((skill, index) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleSkillSelect(skill)}
                    className={`cursor-pointer group relative p-5 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'border-electric-cyan bg-electric-cyan/[0.07] shadow-lg shadow-electric-cyan/10'
                        : 'border-white/10 bg-space-900/60 hover:border-white/20 hover:bg-space-900/90'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            skill.level === 'Core'
                              ? 'bg-electric-cyan shadow-glow-cyan'
                              : skill.level === 'Advanced'
                              ? 'bg-electric-blue'
                              : 'bg-slate-400'
                          }`}
                        />
                        <h4 className="font-bold text-white text-base group-hover:text-electric-cyan transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono rounded px-2 py-0.5 border border-white/10 bg-white/5 text-slate-300">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {skill.context}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Skill Inspector Telemetry Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-2xl border border-electric-cyan/30 bg-space-900/90 p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-electric-cyan">
                  <Terminal className="h-4 w-4" />
                  <span>TELEMETRY_INSPECTOR</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">REAL-TIME CONTEXT</span>
              </div>

              {selectedSkill && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      SELECTED TECHNOLOGY
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">
                      {selectedSkill.name}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-electric-cyan animate-pulse" />
                      <span className="text-xs font-mono text-electric-cyan">
                        CLASSIFICATION: {selectedSkill.level.toUpperCase()} COMPETENCE
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      REAL-WORLD APPLICATION & USAGE
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      {selectedSkill.context}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      ARCHITECTURAL DOMAINS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1.5 rounded-lg border border-electric-cyan/20 bg-electric-cyan/5 px-3 py-1.5 text-xs font-mono text-electric-cyan"
                        >
                          <Zap className="h-3 w-3" />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Info className="h-3.5 w-3.5 text-slate-500" />
                      AUTHENTICATED SKILLPOD
                    </span>
                    <span className="text-electric-cyan">MODULE VERIFIED</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

