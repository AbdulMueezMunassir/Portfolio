import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import { EXPERIENCES, EDUCATION } from '../data';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work Experience Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Industry Experience</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-8">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="glass-card-interactive rounded-3xl p-6 sm:p-7 relative overflow-hidden group"
                >
                  {/* Timeline Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        {exp.type}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-slate-300">
                        {exp.company}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{exp.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mt-5 space-y-3">
                    {exp.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2 items-center">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mr-1">
                      Stack:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-900/90 border border-white/10 text-xs text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column (5 cols) */}
          <div id="education" className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-8">
              Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Degrees</span>
            </h2>

            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-card-interactive rounded-3xl p-6 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-blue-950/80 text-blue-300 border border-blue-500/30">
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-slate-300 mt-1">
                    {edu.institution}
                  </p>

                  {edu.details && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {edu.details}
                    </p>
                  )}

                  {/* Results for A/L if applicable */}
                  {edu.results && edu.results.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Exam Grades:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {edu.results.map((r, i) => (
                          <div key={i} className="p-2 rounded-xl bg-slate-900/60 border border-white/5 text-center">
                            <span className="text-[10px] text-slate-400 block truncate">{r.subject}</span>
                            <span className="text-sm font-bold text-cyan-300 font-mono">{r.grade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
