import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const whatsappUrl = `${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent(
    'Hi Abdul Mueez, I saw your portfolio and would like to connect with you.'
  )}`;

  const handleClick = () => {
    setIsPopping(true);
    setTimeout(() => {
      setIsPopping(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 flex items-center gap-3">
      {/* WhatsApp Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        aria-label="Direct message Abdul Mueez on WhatsApp"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isPopping
            ? {
                scale: [1, 0.86, 1.22, 0.96, 1],
                rotate: [0, -6, 6, -2, 0],
                transition: { duration: 0.45, ease: 'easeOut' },
              }
            : { scale: 1, opacity: 1, rotate: 0 }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-emerald-950/40 hover:shadow-emerald-500/40 border-2 border-white/20 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {/* Click Pop Shockwave Wave Ring */}
        <AnimatePresence>
          {isPopping && (
            <motion.span
              key="pop-ripple"
              initial={{ scale: 0.8, opacity: 0.85 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#25D366] pointer-events-none -z-10"
            />
          )}
        </AnimatePresence>

        {/* Ambient Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none -z-10 opacity-75" />

        {/* WhatsApp Icon */}
        <motion.div
          animate={isPopping ? { scale: [1, 0.85, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </motion.div>

        {/* Online Status Indicator */}
        <span
          className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900"
          title="Online / Available"
        />
      </motion.a>

      {/* Floating Tooltip / Quick Action Pill */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white border border-emerald-500/30 shadow-xl backdrop-blur-md text-xs font-medium pointer-events-none whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Chat directly on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
