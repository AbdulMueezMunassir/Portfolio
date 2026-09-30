import React, { useState } from 'react';
import {
  User,
  Terminal,
  CheckCircle2,
  Database,
  Radio,
  Brain,
  Code2,
  Sparkles,
  Layers,
  ArrowRight,
  Linkedin,
  Cpu,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'code' | 'philosophy'>('profile');

  const engineeringPillars = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'System & DB Architecture',
      description: 'Designing normalized relational and NoSQL schemas, indexed queries, RESTful API contracts, and robust state management pipelines.',
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'End-to-End Ownership',
      description: 'Comfortable handling full lifecycles from database modeling and normalized schemas to scalable REST APIs and reactive web interfaces.',
    },
    {
      icon: <Radio className="w-5 h-5 text-sky-400" />,
      title: 'Real-Time Systems',
      description: 'Experience building real-time event broadcasting channels and state synchronization using Socket.io and WebSockets for active workflows.',
    },
    {
      icon: <Brain className="w-5 h-5 text-indigo-400" />,
      title: 'Data-Driven & ML',
      description: 'Proficiency in data manipulation with Pandas & NumPy, building supervised regression models with Scikit-learn, and interactive apps in Streamlit.',
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      title: 'Production Workflows',
      description: 'Practical industry experience from Hameedia, building production-grade web applications in cross-functional teams with Git & agile routines.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: 'Systems & Hardware Sync',
      description: 'Engineering standalone desktop utilities with Tkinter, SQLite3 transactional audit logs, ReportLab PDF tickets, and thermal printer pipelines.',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Engineering Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-700 to-blue-700 dark:from-cyan-400 dark:to-blue-400">Abdul Mueez</span>
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Narrative Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex-1 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>Full-Stack Engineer with a Drive for Scalability</span>
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  I am a Computer Science student at <strong className="text-white">Sabaragamuwa University of Sri Lanka</strong> (BSc Hons in Computer Science and Technology, 2022–2026).
                </p>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  My journey bridges theoretical computer science fundamentals with tangible production engineering. Having completed an internship at <strong className="text-white">Hameedia (Private) Limited</strong>, I delivered a full PHP/MySQL order-tracking web system utilized in a live retail setting.
                </p>

                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  I have built independent full-stack and systems projects across <strong className="text-cyan-700 dark:text-cyan-300">Django & PostgreSQL</strong>, <strong className="text-cyan-700 dark:text-cyan-300">MERN</strong> (React, Node, Express, MongoDB), <strong className="text-cyan-700 dark:text-cyan-300">Next.js & TypeScript</strong>, <strong className="text-cyan-700 dark:text-cyan-300">PENN</strong> (PostgreSQL, Express, Next.js, PayHere), and <strong className="text-cyan-700 dark:text-cyan-300">Python Desktop & Machine Learning</strong>.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Colombo, Sri Lanka (UTC+5:30)</span>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-200 transition-colors group/link"
                  >
                    <span>Discuss an opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pillars Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engineeringPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-card-interactive rounded-3xl p-5 sm:p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-cyan-400/40 transition-all">
                    {pillar.icon}
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/80">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Verified Experience</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
