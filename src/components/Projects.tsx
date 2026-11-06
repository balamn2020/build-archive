import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Cpu,
  X,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/projects';
import { FileAllocationSimulator } from './FileAllocationSimulator';
import { playBeep } from '../lib/sound';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Systems', 'Frontend & AI', 'Security'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    playBeep(700, 0.03);
    setActiveCategory(cat);
  };

  const handleOpenProjectModal = (project: Project) => {
    playBeep(850, 0.04);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    playBeep(500, 0.03);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
              <span>MODULE 03 // PROJECT EXHIBITION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              FEATURED ENGINEERING BUILDS
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
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

        {/* Highlighted Signature Interactive Feature: File Allocation Simulator */}
        <FileAllocationSimulator />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-space-900/60 p-7 backdrop-blur-xl transition-all duration-300 hover:border-electric-cyan/50 hover:bg-space-900/90 hover:shadow-2xl hover:shadow-electric-cyan/5"
            >
              <div>
                {/* Header Tag & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono rounded-full border border-electric-cyan/30 bg-electric-cyan/10 px-3 py-1 text-electric-cyan">
                    {project.category} // {project.year}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400">
                      <Sparkles className="h-3 w-3" /> FEATURED
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-electric-cyan transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {project.tagline}
                </p>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {project.shortDescription}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-6">
                  {project.keyFeatures.slice(0, 3).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-electric-cyan mt-0.5">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/5 bg-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleOpenProjectModal(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-electric-cyan hover:underline"
                >
                  <span>INSPECT BLUEPRINT</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-all"
                    title="View Source on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-electric-cyan/30 bg-electric-cyan/10 text-electric-cyan hover:bg-electric-cyan/20 transition-all"
                      title="Launch Demonstration"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Blueprint Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-electric-cyan/40 bg-space-950 p-6 sm:p-8 shadow-2xl text-slate-100"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Modal Header */}
                <div className="mb-6 pr-10">
                  <span className="text-xs font-mono text-electric-cyan uppercase">
                    ARCHITECTURAL BLUEPRINT // {selectedProject.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                {/* Problem & Solution Breakdown */}
                <div className="space-y-5 mb-8">
                  <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                    <span className="text-[10px] font-mono text-rose-300 font-bold uppercase block mb-1">
                      THE PROBLEM STATEMENT
                    </span>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed">
                      {selectedProject.problemStatement}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-electric-cyan/20 bg-electric-cyan/5">
                    <span className="text-[10px] font-mono text-electric-cyan font-bold uppercase block mb-1">
                      THE ARCHITECTURAL SOLUTION
                    </span>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <span className="text-xs font-mono font-bold text-white uppercase block mb-3">
                    CORE SYSTEM SPECIFICATIONS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.keyFeatures.map((kf, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-slate-300 font-sans"
                      >
                        <CheckCircle2 className="h-4 w-4 text-electric-cyan shrink-0 mt-0.5" />
                        <span>{kf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer CTAs */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-mono font-bold text-white hover:border-white/20 transition-all"
                  >
                    <Github className="h-4 w-4" />
                    <span>INSPECT SOURCE CODE</span>
                  </a>

                  {selectedProject.hasInteractiveSimulator && (
                    <button
                      onClick={() => {
                        handleCloseModal();
                        const el = document.getElementById('simulator');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-electric-blue to-electric-cyan px-5 py-2.5 text-xs font-mono font-bold text-space-950 shadow-glow-cyan"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>TRY SIMULATOR IN PAGE</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

