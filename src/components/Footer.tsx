import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  FileText,
  Check,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface FooterProps {
  onOpenCv: () => void;
  avatarUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCv,
  avatarUrl,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abmueez593@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/40 backdrop-blur-2xl py-14 overflow-hidden">
      {/* Ambient background glows for realistic glassmorphism refraction */}
      <div className="absolute top-0 left-1/4 w-[420px] h-[160px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[380px] h-[140px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Iridescent top hairline glow reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Floating Glassmorphic Container Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden group">
          {/* Subtle diagonal glass light streak */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left: Avatar & Identity with Availability Indicator */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cyan-400/50 bg-slate-900 shadow-lg shadow-cyan-500/15 shrink-0 relative group">
                <img
                  src={avatarUrl || PERSONAL_INFO.avatarUrl || '/avatar.png'}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://github.com/AbdulMueezMunassir.png') {
                      target.src = 'https://github.com/AbdulMueezMunassir.png';
                    }
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1">
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    {PERSONAL_INFO.name}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 backdrop-blur-md">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    Available for hire
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {PERSONAL_INFO.title} • {PERSONAL_INFO.location}
                </p>
              </div>
            </div>

            {/* Middle: Navigation Glass Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              <a
                href="#about"
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/30 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                About
              </a>
              <a
                href="#projects"
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/30 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/30 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                Skills & Expertise
              </a>
              <a
                href="#experience"
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/30 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                Experience
              </a>
              <a
                href="#education"
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-400/30 text-slate-300 hover:text-white transition-all backdrop-blur-md"
              >
                Education
              </a>
              <button
                onClick={onOpenCv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-all backdrop-blur-md cursor-pointer font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Right: Glassmorphic Social Buttons & Direct Email Copy */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Email One-Click Copy Pill */}
              <button
                onClick={handleCopyEmail}
                id="footer-copy-email-btn"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-xs text-slate-300 hover:text-cyan-300 transition-all backdrop-blur-md cursor-pointer group"
                title="Click to copy abmueez593@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-[11px]">abmueez593@gmail.com</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                )}
              </button>

              {/* Social Glass Badges */}
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 transition-all backdrop-blur-md"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 transition-all backdrop-blur-md"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 text-slate-400 hover:text-emerald-300 transition-all backdrop-blur-md"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                {/* Back to Top */}
                <button
                  onClick={scrollToTop}
                  id="footer-back-to-top-btn"
                  className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-200 transition-all backdrop-blur-md cursor-pointer ml-1"
                  title="Scroll to Top"
                  aria-label="Scroll back to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center text-center text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
