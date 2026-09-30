import React, { useState } from 'react';
import { FileText, Menu, X, Github, Linkedin, Moon, Sun, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import type { ThemeMode } from '../App';

interface NavbarProps {
  onOpenCv: () => void;
  onOpenContact: () => void;
  avatarUrl?: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSelectTheme?: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCv,
  onOpenContact,
  avatarUrl,
  theme,
  onToggleTheme,
  onSelectTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills & Expertise', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 pt-0">
        <div className="pointer-events-auto w-full glass-nav rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-2xl shadow-cyan-950/20 transition-all duration-300">
          <div className="flex items-center justify-between gap-2 sm:gap-3 min-w-0">
            {/* Logo & Name */}
            <a
              href="#home"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 min-w-0"
              id="nav-logo-btn"
            >
              {/* Header Profile Image */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-400/60 p-0.5 flex items-center justify-center bg-slate-900 shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300 relative shrink-0">
                <img
                  src={avatarUrl || PERSONAL_INFO.avatarUrl}
                  alt="Abdul Mueez"
                  className="w-full h-full object-cover object-top rounded-[10px] sm:rounded-xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== 'https://github.com/AbdulMueezMunassir.png') {
                      target.src = 'https://github.com/AbdulMueezMunassir.png';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap truncate">
                    Abdul Mueez
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Available for hire" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block leading-tight mt-0.5 whitespace-nowrap">
                  Junior Software Engineer
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center justify-center gap-0.5 mx-auto min-w-0 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-2.5 py-1.5 rounded-lg text-xs xl:text-sm text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 whitespace-nowrap font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

          {/* Action CTAs */}
          <div className="hidden xl:flex items-center gap-1.5 xl:gap-2 shrink-0 min-w-0">
            {/* Theme Selector Pill: Light Theme with Sun & Golden Amber Glow */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-800/80 border border-white/10 shadow-sm gap-1">
              <button
                onClick={() => (onSelectTheme ? onSelectTheme('clean-light') : onToggleTheme())}
                id="theme-btn-clean-light"
                title="Light Theme"
                aria-label="Select Light Theme"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  theme === 'clean-light'
                    ? 'bg-amber-400/25 border border-amber-400/70 text-amber-800 dark:text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Sun
                    className={`w-3.5 h-3.5 transition-transform ${
                      theme === 'clean-light'
                        ? 'text-amber-700 dark:text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-[spin_20s_linear_infinite]'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-medium">Light</span>
              </button>

              <button
                onClick={() => (onSelectTheme ? onSelectTheme('deep-midnight') : onToggleTheme())}
                id="theme-btn-deep-midnight"
                title="Dark Theme"
                aria-label="Select Dark Theme"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  theme === 'deep-midnight'
                    ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Moon
                  className={`w-3.5 h-3.5 ${
                    theme === 'deep-midnight' ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span className="hidden xl:inline text-[11px]">Dark</span>
              </button>
            </div>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              id="nav-linkedin-button"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/60 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm group whitespace-nowrap"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={onOpenCv}
              id="nav-cv-button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-cyan-500/40 text-[11px] xl:text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-all shadow-sm group cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span>Resume / CV</span>
            </button>

            <a
              href="#contact"
              id="nav-hire-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] xl:text-xs font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Compact actions and navigation menu below wide desktop */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-sky-400 transition"
              aria-label="Toggle theme"
            >
              {theme === 'clean-light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* CV button */}
            <button
              onClick={onOpenCv}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-sky-400 transition hidden sm:inline-flex"
              aria-label="Open CV"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-sky-400 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile, tablet, and compact laptop navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-white/10 space-y-2 pb-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {/* Mobile Theme Toggle Card */}
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-lg transition-all ${
                        theme === 'clean-light'
                          ? 'bg-amber-500/20 text-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      {theme === 'clean-light' ? (
                        <Sun className="w-4 h-4 animate-[spin_20s_linear_infinite] drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <span>Theme:</span>
                        <span
                          className={
                            theme === 'clean-light'
                              ? 'text-amber-800 dark:text-amber-300 font-bold'
                              : 'text-cyan-300 font-semibold'
                          }
                        >
                          {theme === 'clean-light' ? 'Light' : 'Dark'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {theme === 'clean-light'
                          ? 'Clean, bright workspace'
                          : 'Low-glare dark workspace'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Theme Select Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() =>
                      onSelectTheme ? onSelectTheme('clean-light') : onToggleTheme()
                    }
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs transition-all cursor-pointer ${
                      theme === 'clean-light'
                        ? 'bg-amber-400/25 border border-amber-400/70 text-amber-800 dark:text-amber-300 font-bold shadow-[0_0_10px_rgba(251,191,36,0.35)]'
                        : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sun
                      className={`w-3.5 h-3.5 ${
                        theme === 'clean-light'
                          ? 'text-amber-700 dark:text-amber-300 animate-[spin_20s_linear_infinite]'
                          : ''
                      }`}
                    />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() =>
                      onSelectTheme ? onSelectTheme('deep-midnight') : onToggleTheme()
                    }
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs transition-all cursor-pointer ${
                      theme === 'deep-midnight'
                        ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-sky-800 dark:text-sky-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>Connect on LinkedIn</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800/90 border border-white/10 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Full CV & Download</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Contact Abdul Mueez</span>
              </a>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};