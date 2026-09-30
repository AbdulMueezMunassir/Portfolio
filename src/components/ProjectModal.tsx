import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Terminal } from 'lucide-react';
import { Project } from '../types';
import { getTechBadgeConfig } from './Projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with strong blur */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 backdrop-blur-md border border-white/20 text-slate-200 hover:text-white transition-colors shadow-lg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image Banner */}
        {project.coverImage && (
          <div className="relative w-full h-52 sm:h-64 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl bg-slate-900 border-b border-white/10 select-none">
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              {project.stackType}
            </span>
            {project.categories?.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-900/90 text-slate-300 border border-white/10"
              >
                {cat}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-white/10">
              {project.status || 'Completed'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            {project.summary}
          </p>
        </div>

        {/* Architecture & Engineering Flow */}
        <div className="mt-6 rounded-2xl bg-slate-950/80 p-4 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>System Architecture</span>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Core Capabilities / Features */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Engineering Highlights</span>
          </h4>
          <ul className="space-y-2.5">
            {project.description.map((desc, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300/90 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Implemented Features */}
        {project.features && project.features.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Module Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300">
                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technology Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => {
              const techConfig = getTechBadgeConfig(tech);
              const TechIcon = techConfig.icon;
              return (
                <span
                  key={tech}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shadow-xs ${techConfig.badgeClass}`}
                >
                  <TechIcon className={`w-3.5 h-3.5 shrink-0 ${techConfig.iconClass}`} />
                  <span>{tech}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-cyan-400/40 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
