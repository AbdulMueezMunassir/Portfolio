import { motion } from 'motion/react';
import {
  ChevronDown,
  Download,
  Send,
  Linkedin,
  Github,
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { PERSONAL_INFO } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface HeroProps {
  onOpenCv: () => void;
  avatarUrl?: string;
  onUpdateAvatar?: (url: string) => void;
}

export default function Hero({ onOpenCv, avatarUrl }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);
  const portraitSrc = portraitFailed ? '/avatar.png' : (avatarUrl || PERSONAL_INFO.avatarUrl || '/avatar.png');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full order-2 lg:order-1"
          >
            {/* Availability Badge — FULL WIDTH on mobile */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-5 sm:mb-6 w-full sm:w-auto justify-center sm:justify-start">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">Available in Beruwala &amp; Remote</span>
            </div>

            {/* Name — responsive font */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4">
              <span className="text-slate-900 dark:text-white">Abdul </span>
              <span className="bg-linear-to-r from-sky-700 to-cyan-700 dark:from-sky-400 dark:to-cyan-300 bg-clip-text text-transparent">
                Mueez
              </span>
            </h1>

            {/* Subtitle — stack on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-5">
              <span>Junior Software Engineer</span>
              <span className="hidden sm:inline text-sky-500">/</span>
              <span className="text-sky-700 dark:text-sky-300 sm:text-slate-700 sm:dark:text-slate-200">
                Full-Stack Developer
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-xl">
              Computer Science student at{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                Sabaragamuwa University of Sri Lanka
              </span>{' '}
              with hands-on full-stack development experience from an internship at{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                Hameedia
              </span>{' '}
              and{' '}
              <span className="font-semibold text-sky-700 dark:text-sky-300">independent projects</span>{' '}
              spanning MERN/MEAN stacks, Next.js, Django, and applied machine learning.
            </p>

            {/* Contact Badges — full width stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 mb-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-900/70 border border-slate-200/70 dark:border-white/10 text-sm text-slate-700 dark:text-slate-200 w-full sm:w-auto">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Beruwala, Sri Lanka</span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-900/70 border border-slate-200/70 dark:border-white/10 text-sm text-slate-700 dark:text-slate-200 hover:border-sky-400 transition w-full sm:w-auto"
              >
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
                <span className="ml-auto sm:ml-1 text-[10px] px-1.5 py-0.5 rounded-md bg-sky-500/10 text-sky-500 font-medium shrink-0">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </span>
              </button>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-900/70 border border-slate-200/70 dark:border-white/10 text-sm text-slate-700 dark:text-slate-200 hover:border-sky-400 transition w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <span>+94 76 172 2165</span>
              </a>
            </div>

            {/* CTA Buttons — STACKED FULL WIDTH on mobile */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-7">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 text-white font-semibold text-sm sm:text-base shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition w-full sm:w-auto whitespace-nowrap"
              >
                <span>Explore Projects</span>
                <ChevronDown className="w-4 h-4 shrink-0" />
              </a>

              <button
                onClick={onOpenCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base hover:border-sky-400 transition w-full sm:w-auto whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download / Print CV</span>
              </button>

              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base hover:border-sky-400 transition flex-1 sm:flex-none"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm sm:text-base hover:opacity-90 transition shrink-0"
                  aria-label="Contact"
                >
                  <Send className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>

            {/* Social Icons — bigger touch targets */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {[
                  { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
                  { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub' },
                  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
                  { icon: WhatsAppIcon, href: PERSONAL_INFO.whatsapp, label: 'WhatsApp' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 hover:border-sky-400 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Portrait — mobile la center, proper size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-56 sm:w-72 md:w-80 lg:w-full max-w-md">
              <div className="absolute inset-0 bg-linear-to-tr from-sky-500/30 to-cyan-400/30 rounded-4xl blur-3xl -z-10" />
              <div className="relative rounded-4xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl bg-linear-to-br from-slate-900 to-slate-800">
                <img
                  src={portraitSrc}
                  alt="Abdul Mueez"
                  className="w-full h-auto object-cover aspect-4/5 opacity-100 contrast-100 saturate-100"
                  loading="eager"
                  onError={() => setPortraitFailed(true)}
                />
              </div>

              {/* Floating status card */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}