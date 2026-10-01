import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  Copy,
  CheckCircle2,
  Download,
  ExternalLink,
  Github,
} from 'lucide-react';
import {
  CV_FILE_URL,
  CV_FILE_NAME,
  CV_HEADER,
  CV_SUMMARY,
  CV_SKILLS,
  CV_EXPERIENCE,
  CV_PROJECTS,
  CV_EDUCATION,
  CV_REFERENCE,
  buildCvText,
  type CvEntry,
} from '../cvData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl?: string;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1e3a8a] border-b border-slate-300 pb-0.5 mb-1.5">
    {children}
  </h2>
);

const EntryBlock: React.FC<{ entry: CvEntry }> = ({ entry }) => (
  <div>
    <div className="flex items-baseline justify-between gap-2 font-bold text-slate-950">
      <span>{entry.title}</span>
      {entry.period ? (
        <span className="font-semibold text-slate-700 shrink-0">{entry.period}</span>
      ) : entry.githubUrl ? (
        <a
          href={entry.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors shrink-0"
          title="View Source Repository"
        >
          <Github className="w-3 h-3" />
          <span>GitHub</span>
        </a>
      ) : null}
    </div>
    <ul className="list-disc list-outside pl-4 text-slate-800 space-y-0.5 mt-0.5 font-normal">
      {entry.bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
    <p className="text-[11px] text-slate-600 italic mt-0.5">Technologies: {entry.technologies}</p>
    {entry.liveUrl && (
      <a
        href={entry.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors mt-0.5"
      >
        <ExternalLink className="w-3 h-3" />
        <span>Live Demo</span>
      </a>
    )}
  </div>
);

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('cv-modal-open');
    } else {
      document.body.classList.remove('cv-modal-open');
    }
    return () => {
      document.body.classList.remove('cv-modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      window.open(CV_FILE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(buildCvText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const h = CV_HEADER;

  return (
    <div className="cv-modal-wrapper fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity no-print"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="cv-modal-container relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 my-6 max-h-[92vh] overflow-y-auto text-slate-100 print:max-w-none print:m-0 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Toolbar (hidden in print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10 sticky -top-5 sm:-top-8 bg-slate-900/95 backdrop-blur-md pt-2 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-sm font-bold text-white tracking-wide">
              Abdul Mueez — Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CV_FILE_URL}
              download={CV_FILE_NAME}
              id="cv-modal-download-pdf-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              title="Download my CV as a PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handlePrint}
              id="cv-modal-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleCopyText}
              id="cv-modal-copy-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close CV preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable document */}
        <div
          id="cv-printable-document"
          className="cv-document bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-inner font-sans selection:bg-cyan-200 selection:text-slate-900 print:p-0 print:shadow-none"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {/* Header */}
          <div className="pb-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] tracking-tight">
              {h.name}
            </h1>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{h.headline}</p>
            <p className="text-xs text-slate-700 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{h.location}</span>
              <span className="text-slate-400">|</span>
              <a href={`tel:${h.phone}`} className="hover:underline text-slate-800">
                {h.phone}
              </a>
              <span className="text-slate-400">|</span>
              <a href={`mailto:${h.email}`} className="hover:underline text-slate-800">
                {h.email}
              </a>
              <span className="text-slate-400">|</span>
              <a href={h.linkedin} target="_blank" rel="noreferrer" className="hover:underline text-[#1e3a8a] font-medium">
                LinkedIn
              </a>
              <span className="text-slate-400">|</span>
              <a href={h.github} target="_blank" rel="noreferrer" className="hover:underline text-[#1e3a8a] font-medium">
                GitHub
              </a>
              <span className="text-slate-400">|</span>
              <a href={h.portfolio} target="_blank" rel="noreferrer" className="hover:underline text-[#1e3a8a] font-medium">
                Portfolio
              </a>
            </p>
          </div>

          {/* Professional Summary */}
          <div className="mb-4">
            <SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">{CV_SUMMARY}</p>
          </div>

          {/* Technical Skills */}
          <div className="mb-4">
            <SectionTitle>TECHNICAL SKILLS</SectionTitle>
            <div className="space-y-1 text-xs text-slate-800">
              {CV_SKILLS.map((s) => (
                <p key={s.label}>
                  <strong className="text-slate-950 font-semibold">{s.label}:</strong> {s.items}
                </p>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-4">
            <SectionTitle>WORK EXPERIENCE</SectionTitle>
            <div className="space-y-3 text-xs">
              {CV_EXPERIENCE.map((e) => (
                <EntryBlock key={e.title} entry={e} />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-4">
            <SectionTitle>PROJECTS</SectionTitle>
            <div className="space-y-3 text-xs">
              {CV_PROJECTS.map((p) => (
                <EntryBlock key={p.title} entry={p} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-4">
            <SectionTitle>EDUCATION</SectionTitle>
            <div className="space-y-1.5 text-xs text-slate-800">
              {CV_EDUCATION.map((e) => (
                <div key={e.title}>
                  <div className="flex justify-between items-baseline font-bold text-slate-950">
                    <span>{e.title}</span>
                    <span className="font-semibold text-slate-700">{e.period}</span>
                  </div>
                  <p className="text-slate-700">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* References */}
          <div className="mb-2">
            <SectionTitle>REFERENCES</SectionTitle>
            <div className="text-xs text-slate-800">
              <p className="font-bold text-slate-950">{CV_REFERENCE.name}</p>
              <p className="text-slate-700">
                {CV_REFERENCE.title}, {CV_REFERENCE.institution}
              </p>
              <p className="text-slate-600 text-[11px] leading-snug mt-0.5">
                {CV_REFERENCE.qualifications}
              </p>
              <p className="text-[11px] text-slate-700 mt-1">
                <span>Mobile: </span>
                <a href={`tel:${CV_REFERENCE.phone}`} className="hover:underline text-slate-900 font-medium">
                  {CV_REFERENCE.phone}
                </a>
                <span className="mx-1.5 text-slate-400">|</span>
                <span>Email: </span>
                {CV_REFERENCE.emails.map((email, i) => (
                  <React.Fragment key={email}>
                    {i > 0 && <span>, </span>}
                    <a href={`mailto:${email}`} className="hover:underline text-[#1e3a8a]">
                      {email}
                    </a>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={CV_FILE_URL}
            download={CV_FILE_NAME}
            id="cv-modal-download-pdf-footer-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            title="Download my CV as a PDF"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-medium text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Document</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};