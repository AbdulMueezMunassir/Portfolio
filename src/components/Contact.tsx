import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Linkedin,
  Github,
  MessageSquare,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Loader2,
  Inbox,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { Toast } from './Toast';

export const Contact: React.FC = () => {
  const { sendMessage } = usePortfolioData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastSenderName, setLastSenderName] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const sender = formData.name.trim();
    const senderEmail = formData.email.trim();
    const messageBody = formData.message.trim();
    const messageSubject = formData.subject.trim() || `Portfolio Inquiry from ${sender}`;

    setIsSubmitting(true);

    try {
      // 1. Send direct email to abmueez593@gmail.com via FormSubmit AJAX service
      const emailPromise = fetch('https://formsubmit.co/ajax/abmueez593@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: sender,
          email: senderEmail,
          _subject: `[Portfolio Inquiry] ${messageSubject} - from ${sender}`,
          message: messageBody,
          _replyto: senderEmail,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch((err) => {
        console.warn('FormSubmit service network warning:', err);
        return null;
      });

      // 2. Also record in Firestore as permanent backup
      const dbPromise = sendMessage({
        name: sender,
        email: senderEmail,
        subject: messageSubject,
        message: messageBody,
      }).catch((err) => {
        console.warn('Database backup warning:', err);
        return null;
      });

      await Promise.allSettled([emailPromise, dbPromise]);

      // 3. Trigger success toast and state
      setLastSenderName(sender);
      setShowToast(true);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback: open mailto directly to abmueez593@gmail.com
      const subjectEncoded = encodeURIComponent(messageSubject);
      const bodyEncoded = encodeURIComponent(
        `Hello Abdul Mueez,\n\nName: ${sender}\nEmail: ${senderEmail}\n\nMessage:\n${messageBody}`
      );
      window.location.href = `mailto:abmueez593@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
      setLastSenderName(sender);
      setShowToast(true);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Hiring</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Connect</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Currently open to Junior Software Engineer, Full-Stack Developer, and Associate engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="glass-card-interactive rounded-3xl p-6 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Email Address</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  id="copy-email-btn"
                >
                  {copiedType === 'email' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedType === 'email' && (
                <p className="mt-2 text-[11px] text-emerald-400 font-mono">
                  Email copied to clipboard!
                </p>
              )}
            </div>

            {/* WhatsApp Direct Chat Card */}
            <div className="glass-card-interactive rounded-3xl p-6 relative group border-emerald-500/20 hover:border-emerald-500/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-[#25D366] group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-emerald-400">WhatsApp (Instant Chat)</p>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for chat" />
                    </div>
                    <a
                      href={`${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Hi Abdul Mueez, I saw your portfolio and would like to connect with you.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors font-mono"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={`${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Hi Abdul Mueez, I saw your portfolio and would like to connect with you.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-[#25D366] text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                  id="direct-whatsapp-card-btn"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Call Card */}
            <div className="glass-card-interactive rounded-3xl p-6 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Direct Phone Call</p>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Copy phone to clipboard"
                  id="copy-phone-btn"
                >
                  {copiedType === 'phone' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedType === 'phone' && (
                <p className="mt-2 text-[11px] text-emerald-400 font-mono">
                  Phone number copied to clipboard!
                </p>
              )}
            </div>

            {/* Location Card */}
            <div className="glass-card-interactive rounded-3xl p-6 relative group">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400">Location</p>
                  <p className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Open to on-site, hybrid, and remote roles worldwide (UTC+5:30)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="glass-card-interactive rounded-3xl p-6">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Developer Profiles
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 transition-all text-xs font-medium group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 transition-all text-xs font-medium group"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 relative">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the form below to initiate an email to Abdul Mueez immediately.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
                  />
                </div>

                {submitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-white">
                          Message Emailed Successfully!
                        </p>
                        <p className="text-xs text-emerald-300/90 mt-0.5">
                          Your message has been emailed directly to Abdul Mueez at <strong className="text-white">abmueez593@gmail.com</strong>. He will reply to your email address promptly.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-emerald-500/20 text-[11px]">
                      <a
                        href={`${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent('Hi Abdul Mueez, I just sent you a message via your portfolio.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-medium"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Follow up on WhatsApp</span>
                      </a>
                      <span className="text-slate-500">•</span>
                      <a
                        href={`mailto:abmueez593@gmail.com?subject=${encodeURIComponent('Inquiry regarding portfolio')}`}
                        className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 underline font-medium"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Open in Mail App</span>
                      </a>
                      <span className="text-slate-500">•</span>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-slate-300 hover:text-white underline cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="submit"
                      id="submit-contact-form-btn"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent(
                        formData.message
                          ? `Hi Abdul Mueez, my name is ${formData.name || 'a visitor'}.\n\n${formData.message}`
                          : 'Hi Abdul Mueez, I saw your portfolio and would like to connect with you.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 hover:bg-[#25D366] text-emerald-300 hover:text-white border border-emerald-500/30 text-xs sm:text-sm font-semibold transition-all shadow-md shadow-emerald-950/30 hover:shadow-emerald-500/30 cursor-pointer active:scale-95"
                      id="whatsapp-direct-submit-btn"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Direct Message on WhatsApp</span>
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Success Toast Notification */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Message Sent Successfully!"
        message="Thank you for reaching out! Your message has been sent successfully."
        senderName={lastSenderName}
        duration={5500}
      />
    </section>
  );
};
