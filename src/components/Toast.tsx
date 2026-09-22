import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, Send } from 'lucide-react';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  senderName?: string;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  title = 'Message Sent Successfully!',
  message,
  senderName,
  duration = 5500,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPct);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Notifications"
      aria-live="polite"
      className="fixed top-6 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 pointer-events-auto"
    >
      <div
        id="contact-success-toast"
        className="relative overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 p-4 shadow-2xl shadow-emerald-950/50 text-white animate-in fade-in slide-in-from-top-4 duration-300 transition-all"
      >
        {/* Subtle glowing ambient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3.5 relative z-10">
          {/* Animated check circle icon with glow */}
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-5 h-5 animate-pulse" />
          </div>

          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white tracking-tight">
                {title}
              </h4>
            </div>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {message}
            </p>

            {senderName && (
              <p className="text-[11px] text-emerald-300 font-medium mt-1 flex items-center gap-1">
                <Send className="w-3 h-3 text-emerald-400" />
                <span>Submitted by: {senderName}</span>
              </p>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={onClose}
            id="dismiss-toast-btn"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Countdown progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
