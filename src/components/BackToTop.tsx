import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Visible once the user has scrolled past the hero section
        setIsVisible(rect.bottom <= 80);
      } else {
        setIsVisible(window.scrollY > 450);
      }

      // Calculate total page scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circle calculation for progress ring (radius = 18, circumference = 2 * PI * 18 ≈ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          id="back-to-top-button"
          aria-label="Back to top of page"
          title="Back to top"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 group flex items-center justify-center w-12 h-12 rounded-full glass-panel border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-200 shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/25 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer"
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
            viewBox="0 0 44 44"
          >
            {/* Subtle background track */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-white/10"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
            />
            {/* Animated progress stroke */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="text-cyan-400 transition-[stroke-dashoffset] duration-150"
            />
          </svg>

          {/* Upward Navigation Arrow with micro-animation */}
          <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-200" />

          {/* Hover Tooltip for desktop users */}
          <span className="sr-only">Back to top</span>
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-semibold tracking-wide whitespace-nowrap py-1 px-2 rounded-md bg-slate-900/90 text-slate-200 border border-white/10 shadow-lg hidden sm:block">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
