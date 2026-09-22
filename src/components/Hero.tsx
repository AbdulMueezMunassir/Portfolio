import React, { useState } from 'react';
import {
  FileText,
  Send,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  ChevronDown,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface HeroProps {
  onOpenCv: () => void;
  avatarUrl?: string;
  onUpdateAvatar?: (url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCv, avatarUrl }) => {
  const { projects } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const currentAvatar = avatarUrl || PERSONAL_INFO.avatarUrl || '/avatar.png';

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background project-relevant circuit & tech infrastructure imagery */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
          alt="Computing hardware architecture and digital circuit grid"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-[0.06] dark:opacity-[0.10] filter contrast-125 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-canvas)] via-transparent to-[var(--bg-canvas)]" />
      </div>

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Intro text, badges, CTAs */}
          <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
            
            {/* Availability Badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-subtle border border-cyan-400/20 text-xs font-medium text-cyan-300 shadow-lg shadow-cyan-950/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>Available in Colombo & Remote</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Abdul <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Mueez</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 flex items-center gap-2">
              <span>Junior Software Engineer</span>
              <span className="text-cyan-400">/</span>
              <span className="text-slate-400 font-normal">Full-Stack Developer</span>
            </p>

            {/* Profile Summary */}
            <p className="mt-4 text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal max-w-2xl">
              Computer Science student at <span className="text-white font-medium">Sabaragamuwa University of Sri Lanka</span> with hands-on full-stack development experience from an internship at <span className="text-white font-medium">Hameedia</span> and <span className="text-cyan-300 font-medium">7 independent projects</span> spanning MERN/MENN stacks, Next.js, Django, and applied machine learning.
            </p>

            {/* Quick Contact & Location Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer group"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
                <span className="text-[10px] text-cyan-400/80 font-mono ml-1 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20 group-hover:bg-cyan-900/60">
                  {copiedEmail ? 'Copied! ✓' : 'Copy'}
                </span>
              </button>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Call to Actions with Glass & Hover Effects */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                id="hero-explore-projects-btn"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Projects</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </a>

              <button
                onClick={onOpenCv}
                id="hero-download-cv-btn"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-panel hover:bg-slate-800/80 border border-white/10 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-300 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Download / Print CV</span>
              </button>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                id="hero-linkedin-btn"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 border border-[#0A66C2]/40 hover:border-[#0A66C2] text-slate-200 hover:text-white text-sm font-semibold transition-all duration-200 group hover:-translate-y-0.5 shadow-sm"
                title="View LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center justify-center p-3 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all duration-200 hover:-translate-y-0.5"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Connect:</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Hi Abdul Mueez, I saw your portfolio and would like to connect with you.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-slate-300 hover:text-[#25D366] transition-all"
                aria-label="Direct message on WhatsApp"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Profile Image Card */}
          <div className="relative shrink-0 flex flex-col items-center mt-6 lg:mt-0">
            {/* Ambient glowing backlight behind the portrait */}
            <div className="absolute inset-0 -m-6 bg-gradient-to-tr from-cyan-500/25 via-sky-500/20 to-blue-600/25 rounded-full blur-3xl opacity-70 pointer-events-none" />

            {/* Main Glassmorphic Photo Frame */}
            <div className="relative rounded-3xl p-3 sm:p-4 bg-slate-900/50 backdrop-blur-2xl border border-white/15 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
              {/* Photo Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-cyan-400/30 group shadow-inner">
                <img
                  src={currentAvatar}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://github.com/AbdulMueezMunassir.png') {
                      target.src = 'https://github.com/AbdulMueezMunassir.png';
                    }
                  }}
                />

                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Identity Ribbon under photo */}
              <div className="mt-3 px-2 py-1 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="font-semibold text-white tracking-tight">Abdul Mueez</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  SWE / Full-Stack
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Stats Ribbon */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-cyan-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              {projects.length}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Core CV Projects
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              MERN, Next.js, Django & Systems
            </div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-cyan-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
              1
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Industry Internship
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Hameedia (Private) Limited
            </div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-cyan-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              5+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              Technology Stacks
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              MERN, Next.js, Django, PENN & Python
            </div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl hover:border-cyan-400/30 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
              End-to-End Ownership
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              DB schemas, APIs, & frontend UIs
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
