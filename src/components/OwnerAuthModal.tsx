import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  LogOut,
  AlertTriangle,
  Mail,
  KeyRound,
  CheckCircle2,
  Sparkles,
  Inbox,
  Trash2,
  Reply,
  Clock,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({ isOpen, onClose }) => {
  const { user, isOwner, ownerEmail, loginWithGoogle, loginWithEmail, signUpWithEmail, logout } =
    useAuth();
  const {
    seedInitialDataIfEmpty,
    messages,
    unreadCount,
    markMessageAsRead,
    deleteMessage,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<'overview' | 'messages'>('messages');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      setErrorMsg('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      await seedInitialDataIfEmpty();
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to populate database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`relative w-full ${
          isOwner ? 'max-w-2xl' : 'max-w-md'
        } rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-owner-modal-btn"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 shrink-0">
          <div
            className={`p-3 rounded-2xl border ${
              isOwner
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}
          >
            {isOwner ? <ShieldCheck className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isOwner ? 'Owner Management Portal' : 'Owner Authentication'}
            </h3>
            <p className="text-xs text-slate-400">
              {isOwner
                ? `Logged in as ${ownerEmail}`
                : 'Restricted management portal for portfolio owner'}
            </p>
          </div>
        </div>

        {/* Tab switcher for authenticated owner */}
        {isOwner && (
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4 shrink-0">
            <button
              onClick={() => setActiveTab('messages')}
              id="owner-tab-messages"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inbox / Messages</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              id="owner-tab-overview"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Settings & Sync</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4 custom-scrollbar">
          {user ? (
            isOwner ? (
              activeTab === 'messages' ? (
                /* Messages Inbox Tab */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>
                        Total: <strong>{messages.length}</strong> message(s)
                      </span>
                      {unreadCount > 0 && (
                        <span className="text-cyan-300 font-semibold">
                          ({unreadCount} unread)
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Incoming inquiries submitted via your portfolio
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="py-12 px-4 rounded-2xl border border-dashed border-white/10 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                        <Inbox className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        No messages received yet
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        When recruiters or visitors fill out your contact form, their message, email,
                        and timestamp will appear here in real-time.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            msg.read
                              ? 'bg-slate-900/50 border-white/5 text-slate-300'
                              : 'bg-cyan-950/30 border-cyan-500/30 text-white shadow-lg shadow-cyan-950/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              {!msg.read && (
                                <span
                                  className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"
                                  title="Unread message"
                                />
                              )}
                              <h5 className="text-sm font-bold text-white">{msg.name}</h5>
                              <a
                                href={`mailto:${msg.email}`}
                                className="text-xs font-mono text-cyan-300 hover:underline"
                              >
                                &lt;{msg.email}&gt;
                              </a>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>
                                {msg.createdAt
                                  ? new Date(msg.createdAt).toLocaleString(undefined, {
                                      dateStyle: 'short',
                                      timeStyle: 'short',
                                    })
                                  : 'Recent'}
                              </span>
                            </div>
                          </div>

                          {msg.subject && (
                            <div className="text-xs font-semibold text-slate-200 mb-1.5">
                              Subject: <span className="font-normal text-white">{msg.subject}</span>
                            </div>
                          )}

                          <div className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed mb-3">
                            {msg.message}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-1 text-xs">
                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${msg.email}?subject=${encodeURIComponent(
                                  `Re: ${msg.subject || 'Portfolio Inquiry'}`
                                )}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-semibold transition-colors"
                              >
                                <Reply className="w-3.5 h-3.5" />
                                <span>Reply via Email</span>
                              </a>

                              <button
                                onClick={() => markMessageAsRead(msg.id, !msg.read)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{msg.read ? 'Mark Unread' : 'Mark Read'}</span>
                              </button>
                            </div>

                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Settings & Sync Tab */
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Verified Owner:</span>
                      <span className="font-mono text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Permissions:</span>
                      <span className="font-bold uppercase tracking-wider text-emerald-300">
                        Full Write & Manage Access
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-300 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Live Portfolio Controls</span>
                    </div>
                    You can add, update, and delete projects and skills directly on this portfolio.
                    Hover or click the edit buttons on project cards or skill sections.
                  </div>

                  <button
                    onClick={handleSeed}
                    disabled={loading}
                    id="owner-seed-db-btn"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{seedSuccess ? 'Database Synced!' : 'Sync Default Resume to Database'}</span>
                  </button>

                  <button
                    onClick={async () => {
                      await logout();
                    }}
                    id="owner-logout-btn"
                    className="w-full py-2.5 px-4 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 text-xs font-semibold text-red-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Owner Mode</span>
                  </button>
                </div>
              )
            ) : (
              /* Signed in with non-owner account */
              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    This account ({user.email}) is not authorized as the portfolio owner.
                    Editing, database writes, and inbox access are restricted to{' '}
                    <strong className="text-white">{ownerEmail}</strong>.
                  </div>
                </div>
                <button
                  onClick={async () => {
                    await logout();
                  }}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 cursor-pointer"
                >
                  Switch to {ownerEmail}
                </button>
              </div>
            )
          ) : (
            /* Not logged in: Sign in form */
            <div className="space-y-5">
              <p className="text-xs text-slate-300 leading-relaxed">
                Sign in with your verified owner account (
                <span className="font-semibold text-cyan-300">{ownerEmail}</span>) to unlock project
                and skill management as well as your incoming messages inbox. Other visitors have
                view-only access.
              </p>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Google Sign-in */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                id="google-signin-btn"
                type="button"
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google ({ownerEmail})</span>
              </button>

              <div className="flex items-center gap-2 my-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-wider text-slate-400">or email</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Email/Password Sign-in */}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Owner Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="abmueez593@gmail.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  id="email-auth-submit-btn"
                  className="w-full py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : isSignUp ? 'Create Owner Credentials' : 'Sign In'}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    {isSignUp
                      ? 'Already created password? Sign in'
                      : 'First time? Create email password'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
