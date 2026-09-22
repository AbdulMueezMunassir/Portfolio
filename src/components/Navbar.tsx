import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Github, Linkedin, Sparkles, Moon, Sun, Send, Mail } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills & Expertise', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3 px-5 shadow-2xl shadow-cyan-950/20'
            : 'bg-slate-900/40 backdrop-blur-md border border-white/5 py-3.5 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-logo-btn"
          >
            {/* Header Profile Image - Resized & Clearly Visible */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl overflow-hidden border-2 border-cyan-400/60 p-0.5 flex items-center justify-center bg-slate-900 shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300 relative shrink-0">
              <img
                src={avatarUrl || PERSONAL_INFO.avatarUrl}
                alt="Abdul Mueez"
                className="w-full h-full object-cover object-top rounded-[14px]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== 'https://github.com/AbdulMueezMunassir.png') {
                    target.src = 'https://github.com/AbdulMueezMunassir.png';
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors leading-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Available for hire" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block leading-tight mt-0.5">
                Junior Software Engineer
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Selector Pill: Light Theme with Sun & Golden Amber Glow */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-800/80 border border-white/10 shadow-sm gap-1">
              <button
                onClick={() => (onSelectTheme ? onSelectTheme('clean-light') : onToggleTheme())}
                id="theme-btn-clean-light"
                title="Light Theme — Sun with golden amber glow indicator"
                aria-label="Select Light Theme"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  theme === 'clean-light'
                    ? 'bg-amber-400/25 border border-amber-400/70 text-amber-500 dark:text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Sun
                    className={`w-3.5 h-3.5 transition-transform ${
                      theme === 'clean-light'
                        ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-[spin_20s_linear_infinite]'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
                <span className="text-[11px] font-medium">Light</span>
                <span className="relative flex h-2 w-2 ml-0.5">
                  {theme === 'clean-light' && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 transition-colors ${
                      theme === 'clean-light'
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]'
                        : 'bg-slate-600'
                    }`}
                  />
                </span>
              </button>

              <button
                onClick={() => (onSelectTheme ? onSelectTheme('deep-midnight') : onToggleTheme())}
                id="theme-btn-deep-midnight"
                title="Deep Midnight Theme"
                aria-label="Select Deep Midnight Theme"
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
                <span className="hidden xl:inline text-[11px]">Midnight</span>
              </button>

              <button
                onClick={() => (onSelectTheme ? onSelectTheme('slate-blue') : onToggleTheme())}
                id="theme-btn-slate-blue"
                title="Slate Blue Theme"
                aria-label="Select Slate Blue Theme"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  theme === 'slate-blue'
                    ? 'bg-blue-500/20 border border-blue-400/50 text-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Sparkles
                  className={`w-3.5 h-3.5 ${
                    theme === 'slate-blue' ? 'text-blue-400' : 'text-slate-400'
                  }`}
                />
                <span className="hidden xl:inline text-[11px]">Slate</span>
              </button>
            </div>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              id="nav-linkedin-button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-[#0A66C2]/20 border border-white/10 hover:border-[#0A66C2]/60 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm group"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline">LinkedIn</span>
            </a>

            <button
              onClick={onOpenCv}
              id="nav-cv-button"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-all shadow-sm group cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span>Resume / CV</span>
            </button>

            <a
              href="#contact"
              id="nav-hire-btn"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              id="mobile-header-theme-toggle-btn"
              className="p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-300 hover:text-cyan-300 text-xs flex items-center justify-center cursor-pointer"
              title={`Theme: ${theme === 'deep-midnight' ? 'Deep Midnight' : 'Slate Blue'}`}
              aria-label="Toggle theme"
            >
              {theme === 'deep-midnight' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sparkles className="w-4 h-4 text-blue-400" />}
            </button>
            <button
              onClick={onOpenCv}
              className="p-2 rounded-lg bg-slate-800/60 border border-white/10 text-cyan-400 text-xs flex items-center gap-1 font-medium"
              title="View CV"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/60 border border-white/10 text-slate-200 hover:text-cyan-300"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-2 pb-2">
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
                          : theme === 'deep-midnight'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {theme === 'clean-light' ? (
                        <Sun className="w-4 h-4 animate-[spin_20s_linear_infinite] drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                      ) : theme === 'deep-midnight' ? (
                        <Moon className="w-4 h-4" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <span>Theme:</span>
                        <span
                          className={
                            theme === 'clean-light'
                              ? 'text-amber-400 font-bold'
                              : 'text-cyan-300 font-semibold'
                          }
                        >
                          {theme === 'clean-light'
                            ? 'Light Theme'
                            : theme === 'deep-midnight'
                            ? 'Deep Midnight'
                            : 'Slate Blue'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {theme === 'clean-light'
                          ? 'Sun icon with golden/amber glow indicator'
                          : 'CSS variables dark palette'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Theme Select Buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() =>
                      onSelectTheme ? onSelectTheme('clean-light') : onToggleTheme()
                    }
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs transition-all cursor-pointer ${
                      theme === 'clean-light'
                        ? 'bg-amber-400/25 border border-amber-400/70 text-amber-400 font-bold shadow-[0_0_10px_rgba(251,191,36,0.35)]'
                        : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sun
                      className={`w-3.5 h-3.5 ${
                        theme === 'clean-light'
                          ? 'text-amber-400 animate-[spin_20s_linear_infinite]'
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
                    <span>Midnight</span>
                  </button>
                  <button
                    onClick={() =>
                      onSelectTheme ? onSelectTheme('slate-blue') : onToggleTheme()
                    }
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs transition-all cursor-pointer ${
                      theme === 'slate-blue'
                        ? 'bg-blue-500/20 border border-blue-400/50 text-blue-300 font-bold shadow-[0_0_8px_rgba(96,165,250,0.3)]'
                        : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Slate</span>
                  </button>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-sky-200 text-xs font-semibold flex items-center justify-center gap-2"
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
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Contact Abdul Mueez</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
