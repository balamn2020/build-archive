import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Terminal,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';
import { playBeep } from '../lib/sound';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Terminal CLI Interactive state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "THE BUILD ARCHIVE COMM INTERFACE v2.6",
    "Type 'help' for available commands, or 'email' to compose directly."
  ]);

  const handleCopyEmail = () => {
    playBeep(900, 0.04);
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playBeep(750, 0.03);
    const newLogs = [...terminalLogs, `> ${terminalInput}`];

    switch (cmd) {
      case 'help':
        newLogs.push("Commands: 'email', 'github', 'linkedin', 'projects', 'whoami', 'clear'");
        break;
      case 'email':
        newLogs.push(`Primary Dispatch: ${PROFILE_DATA.email}`);
        window.location.href = `mailto:${PROFILE_DATA.email}`;
        break;
      case 'github':
        newLogs.push(`Navigating to ${PROFILE_DATA.github}`);
        window.open(PROFILE_DATA.github, '_blank');
        break;
      case 'linkedin':
        newLogs.push(`Navigating to ${PROFILE_DATA.linkedin}`);
        window.open(PROFILE_DATA.linkedin, '_blank');
        break;
      case 'projects':
        newLogs.push("Jumping to Projects Archive...");
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'whoami':
        newLogs.push("User: Guest Judge / Evaluator | Clearance: Level 4 | Access: Full Archive");
        break;
      case 'clear':
        setTerminalLogs(["COMM TERMINAL CLEARED."]);
        setTerminalInput('');
        return;
      default:
        newLogs.push(`Command not recognized: '${cmd}'. Type 'help' for options.`);
    }

    setTerminalLogs(newLogs.slice(-8));
    setTerminalInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playBeep(850, 0.04);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Please complete all required fields (Name, Email, Message).',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Please provide a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);

    // In accordance with PRD: clearly prepare direct mailto dispatch so no unsent false state occurs
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: 'success',
        message: `Message drafted! Opening your email client to dispatch to ${PROFILE_DATA.email}...`,
      });

      const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
        formData.subject || `Message from ${formData.name} via The Build Archive`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan" />
              <span>MODULE 06 // CONNECT & TELEMETRY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              INITIATE COLLABORATION
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-xs max-w-sm">
            DISPATCH INQUIRIES, OPPORTUNITIES & FEEDBACK DIRECTLY.
          </p>
        </div>

        {/* Main Grid: Form + Connect Cards + Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Terminal */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="rounded-3xl border border-white/10 bg-space-900/60 p-6 backdrop-blur-xl">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Direct Channels
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-sans">
                Feel free to reach out for software engineering opportunities, competition evaluation inquiries, or system architecture discussions.
              </p>

              {/* Email Pill with Copy Interaction */}
              <div className="p-4 rounded-2xl border border-electric-cyan/20 bg-electric-cyan/5 mb-4">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  OFFICIAL INBOX
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="text-sm font-mono font-bold text-electric-cyan hover:underline truncate"
                  >
                    {PROFILE_DATA.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg border border-white/10 bg-space-900 text-slate-300 hover:text-white hover:border-electric-cyan transition-all"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 block">
                    Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-electric-cyan/40 transition-all font-mono text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-electric-cyan" /> GitHub
                  </span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>

                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-electric-cyan/40 transition-all font-mono text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-electric-blue" /> LinkedIn
                  </span>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Interactive Mini Terminal */}
            <div className="rounded-3xl border border-white/10 bg-space-950 p-6 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-slate-400">
                <span className="flex items-center gap-2 text-electric-cyan">
                  <Terminal className="h-3.5 w-3.5" /> CLI_RUNNER
                </span>
                <span className="text-[10px]">BASH SIMULATOR</span>
              </div>

              <div className="space-y-1.5 min-h-[120px] max-h-[140px] overflow-y-auto pr-1 text-slate-300 text-[11px]">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={log.startsWith('>') ? 'text-electric-cyan font-bold' : ''}>
                    {log}
                  </div>
                ))}
              </div>

              <form onSubmit={handleTerminalSubmit} className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                <span className="text-electric-cyan">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help', 'email', 'clear'..."
                  className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono"
                />
              </form>
            </div>
          </div>

          {/* Right Column: Verified Message Dispatcher */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-space-900/60 p-7 sm:p-8 backdrop-blur-xl">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Dispatch Direct Communication
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-sans">
                All communications trigger genuine mail client dispatch. No simulated false acknowledgments.
              </p>

              {/* Status Alert Banner */}
              <AnimatePresence>
                {formStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-xl text-xs font-mono border flex items-center gap-2.5 ${
                      formStatus.type === 'error'
                        ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    {formStatus.type === 'error' ? (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    ) : (
                      <Sparkles className="h-4 w-4 shrink-0" />
                    )}
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-xl border border-white/10 bg-space-950 px-4 py-3 text-white focus:border-electric-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full rounded-xl border border-white/10 bg-space-950 px-4 py-3 text-white focus:border-electric-cyan focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">
                    SUBJECT / TOPIC
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. One Who Codes 2026 Evaluation / Collaboration"
                    className="w-full rounded-xl border border-white/10 bg-space-950 px-4 py-3 text-white focus:border-electric-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">
                    MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share project details, feedback, or interview scheduling..."
                    className="w-full rounded-xl border border-white/10 bg-space-950 px-4 py-3 text-white focus:border-electric-cyan focus:outline-none resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric-blue via-electric-cyan to-white px-6 py-3.5 text-space-950 font-bold font-mono text-xs shadow-glow-cyan transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'DISPATCH MESSAGE'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

