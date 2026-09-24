import React, { useState } from 'react';
import {
  Layout,
  Server,
  Database,
  Brain,
  Code2,
  Cpu,
  Search,
  CheckCircle,
  Sparkles,
  Layers,
  Plus,
  Edit3,
  Trash2,
  Terminal,
  Monitor,
  GitBranch,
  ShieldCheck,
  TrendingUp,
  Printer,
  Bot,
} from 'lucide-react';
import { SkillCategory } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useAuth } from '../context/AuthContext';
import { SkillEditorModal } from './SkillEditorModal';
import { AiToolsShowcase } from './AiToolsShowcase';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5 text-cyan-400" />,
  Server: <Server className="w-5 h-5 text-blue-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  Brain: <Brain className="w-5 h-5 text-purple-400" />,
  Code2: <Code2 className="w-5 h-5 text-amber-400" />,
  Cpu: <Cpu className="w-5 h-5 text-sky-400" />,
  Bot: <Bot className="w-5 h-5 text-purple-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
};

interface ExpertisePillar {
  title: string;
  role: string;
  badge: string;
  badgeColor: string;
  description: string;
  keyTechs: string[];
  icon: React.ReactNode;
}

const EXPERTISE_PILLARS: ExpertisePillar[] = [
  {
    title: 'AI-Assisted Coding & LLM Workflows',
    role: 'Modern Accelerated Engineering',
    badge: 'Claude • DeepSeek • ChatGPT • Gemini',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
    description:
      'Leveraging premier AI coding models (Claude, DeepSeek, ChatGPT, and Gemini) for high-speed architecture design, full-stack scaffolding, unit test drafting, query optimization, and rapid code refactoring.',
    keyTechs: ['Claude', 'DeepSeek', 'ChatGPT', 'Google Gemini', 'Prompt Engineering', 'AI Architecture'],
    icon: <Bot className="w-5 h-5 text-purple-400" />,
  },
  {
    title: 'Full-Stack Web Engineering',
    role: 'MERN, Next.js & PENN Architectures',
    badge: 'Production Ready',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description:
      'Designing end-to-end responsive web applications with TypeScript, Next.js App Router (SSR/CSR), Express.js REST APIs, JWT authentication, and WebSocket real-time feeds.',
    keyTechs: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'Express.js', 'Socket.io'],
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
  },
  {
    title: 'Enterprise Python & Django',
    role: 'Relational ORM & Transaction Systems',
    badge: 'ACID Relational',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description:
      'Architecting enterprise POS and stock management systems with Django MVT and REST, leveraging PostgreSQL atomic transactions, schema constraints, and administrative dashboards.',
    keyTechs: ['Django', 'Python', 'PostgreSQL', 'REST APIs', 'Atomic Transactions', 'JWT'],
    icon: <Server className="w-5 h-5 text-emerald-400" />,
  },
  {
    title: 'Desktop Systems & Thermal Printing',
    role: 'Event-Driven GUI & Hardware Pipelines',
    badge: 'Hardware Sync',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    description:
      'Developing standalone cross-platform ticketing software with Tkinter, SQLite3 fault-tolerant transactional logging, ReportLab A6 PDF thermal printing, and OpenPyXL Excel synchronization.',
    keyTechs: ['Python 3.8+', 'Tkinter GUI', 'ReportLab 4.0', 'SQLite3', 'OpenPyXL', 'Thermal A6'],
    icon: <Printer className="w-5 h-5 text-amber-400" />,
  },
  {
    title: 'Machine Learning & Applied Analytics',
    role: 'Data Pipelines & Predictive Modeling',
    badge: 'Scikit-learn',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description:
      'Training regression models on housing and tabular datasets using Scikit-learn, cleaning and transforming features with Pandas and NumPy, and publishing live interactive apps via Streamlit.',
    keyTechs: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Regression', 'Streamlit Cloud'],
    icon: <Brain className="w-5 h-5 text-purple-400" />,
  },
];

export const Skills: React.FC = () => {
  const { skills, addOrUpdateSkillCategory, deleteSkillCategory } = usePortfolioData();
  const { isOwner } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Available filter options
  const filterOptions = ['All', ...skills.map((c) => c.name)];

  const filteredCategories = skills
    .filter((category) => {
      if (selectedCategoryFilter === 'All') return true;
      return category.name === selectedCategoryFilter;
    })
    .map((category) => {
      if (!searchQuery.trim()) return category;
      const matchingSkills = category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      return {
        ...category,
        skills: matchingSkills,
      };
    })
    .filter((category) => category.skills.length > 0);

  const totalSkillsCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Glow ambient background lights */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Competencies ({totalSkillsCount} total skills)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Skills &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Expertise
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Demonstrated capabilities across frontend frameworks, backend engines, relational &
              NoSQL databases, desktop hardware integrations, and applied machine learning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            {isOwner && (
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsEditorOpen(true);
                }}
                id="owner-add-skill-category-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            )}

            {/* Interactive Skill Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skill (e.g. React, Django, SQLite)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Core Engineering Pillars Showcase */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Core Engineering Pillars & Architectures
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPERTISE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-white/10 group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium">{pillar.role}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${pillar.badgeColor} shrink-0`}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {pillar.keyTechs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/60 border border-white/5 text-[11px] font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated AI Tools & LLMs Showcase Section */}
        <AiToolsShowcase />

        {/* Domain Filter Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedCategoryFilter(opt)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategoryFilter === opt
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="glass-card-interactive rounded-3xl p-6 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Top ambient color edge */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-cyan-400/50 transition-all duration-300" />

              <div>
                {/* Category Header & Owner Controls */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-white/10 group-hover:scale-110 transition-transform">
                      {iconMap[category.iconName] || <Code2 className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">{category.name}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {isOwner && (
                      <div className="flex items-center gap-1 bg-slate-900/90 border border-white/10 rounded-lg p-0.5">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setIsEditorOpen(true);
                          }}
                          id={`edit-skill-cat-${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          className="p-1 rounded hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer"
                          title="Edit Category & Badges (Owner Only)"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete skill category "${category.name}"?`)) {
                              await deleteSkillCategory(category.name);
                            }
                          }}
                          id={`delete-skill-cat-${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          className="p-1 rounded hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                          title="Delete Category (Owner Only)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/5">
                      {category.skills.length} skills
                    </span>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 ${
                        skill.highlight
                          ? 'bg-slate-900/90 text-slate-100 border border-white/15 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-950/30 shadow-sm'
                          : 'bg-slate-900/50 text-slate-300 border border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          skill.highlight ? 'bg-cyan-400' : 'bg-slate-500'
                        }`}
                      />
                      <span className="font-medium">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] text-cyan-400/80 font-mono ml-0.5">
                          {skill.level === 'Advanced' ? '★' : ''}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag indicator */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  <span>Verified Competency</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {category.skills.filter((s) => s.highlight).length} Core Focus
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-3xl p-8">
            <p className="text-sm text-slate-400">
              No matching skills found for &quot;{searchQuery}&quot; in {selectedCategoryFilter}.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryFilter('All');
              }}
              className="mt-3 text-xs text-cyan-400 underline cursor-pointer"
            >
              Reset search & filter
            </button>
          </div>
        )}
      </div>

      {/* Owner Skill Category Editor Modal */}
      <SkillEditorModal
        isOpen={isEditorOpen}
        category={editingCategory}
        onClose={() => setIsEditorOpen(false)}
        onSave={addOrUpdateSkillCategory}
        onDelete={deleteSkillCategory}
      />
    </section>
  );
};
