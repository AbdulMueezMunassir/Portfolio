import React, { useState, useMemo } from 'react';
import {
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ArrowUpRight,
  Info,
  Radio,
  Cpu,
  CheckCircle2,
  Smartphone,
  Palette,
  Globe,
  Search,
  X,
  Filter,
  Atom,
  FileCode,
  Wind,
  Server,
  Database,
  Brain,
  ShieldCheck,
  Network,
  BarChart3,
  Terminal,
  Plus,
  Edit3,
  Trash2,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Project, ProjectCategory } from '../types';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useAuth } from '../context/AuthContext';

const ProjectModal = React.lazy(() =>
  import('./ProjectModal').then((module) => ({ default: module.ProjectModal }))
);
const ProjectEditorModal = React.lazy(() =>
  import('./ProjectEditorModal').then((module) => ({ default: module.ProjectEditorModal }))
);

export interface TechBadgeConfig {
  icon: React.FC<{ className?: string }>;
  badgeClass: string;
  iconClass: string;
}

export const getTechBadgeConfig = (tech: string): TechBadgeConfig => {
  const t = tech.toLowerCase();

  if (t.includes('react')) {
    return {
      icon: Atom,
      badgeClass: 'bg-cyan-950/70 border-cyan-500/35 text-cyan-200 hover:border-cyan-400',
      iconClass: 'text-cyan-400',
    };
  }
  if (t.includes('next')) {
    return {
      icon: Globe,
      badgeClass: 'bg-slate-900/90 border-slate-600 text-slate-200 hover:border-slate-400',
      iconClass: 'text-white',
    };
  }
  if (t.includes('angular')) {
    return {
      icon: Layers,
      badgeClass: 'bg-rose-950/70 border-rose-500/35 text-rose-200 hover:border-rose-400',
      iconClass: 'text-rose-400',
    };
  }
  if (t.includes('typescript') || t === 'ts') {
    return {
      icon: FileCode,
      badgeClass: 'bg-blue-950/70 border-blue-500/35 text-blue-200 hover:border-blue-400',
      iconClass: 'text-blue-400',
    };
  }
  if (t.includes('javascript') || t === 'js') {
    return {
      icon: Code2,
      badgeClass: 'bg-amber-950/70 border-amber-500/35 text-amber-200 hover:border-amber-400',
      iconClass: 'text-amber-400',
    };
  }
  if (t.includes('tailwind')) {
    return {
      icon: Wind,
      badgeClass: 'bg-teal-950/70 border-teal-500/35 text-teal-200 hover:border-teal-400',
      iconClass: 'text-teal-400',
    };
  }
  if (t.includes('node')) {
    return {
      icon: Server,
      badgeClass: 'bg-emerald-950/70 border-emerald-500/35 text-emerald-200 hover:border-emerald-400',
      iconClass: 'text-emerald-400',
    };
  }
  if (t.includes('express')) {
    return {
      icon: Terminal,
      badgeClass: 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500',
      iconClass: 'text-slate-400',
    };
  }
  if (t.includes('mongo') || t.includes('mysql') || t.includes('postgres') || t.includes('sql') || t.includes('database')) {
    return {
      icon: Database,
      badgeClass: 'bg-emerald-950/60 border-emerald-500/35 text-emerald-200 hover:border-emerald-400',
      iconClass: 'text-emerald-400',
    };
  }
  if (t.includes('socket') || t.includes('realtime')) {
    return {
      icon: Radio,
      badgeClass: 'bg-amber-950/60 border-amber-500/35 text-amber-200 hover:border-amber-400',
      iconClass: 'text-amber-400',
    };
  }
  if (t.includes('jwt') || t.includes('auth')) {
    return {
      icon: ShieldCheck,
      badgeClass: 'bg-indigo-950/70 border-indigo-500/35 text-indigo-200 hover:border-indigo-400',
      iconClass: 'text-indigo-400',
    };
  }
  if (t.includes('python')) {
    return {
      icon: Code2,
      badgeClass: 'bg-sky-950/70 border-sky-500/35 text-sky-200 hover:border-sky-400',
      iconClass: 'text-sky-400',
    };
  }
  if (t.includes('scikit') || t.includes('machine learning') || t.includes('ml')) {
    return {
      icon: Brain,
      badgeClass: 'bg-purple-950/70 border-purple-500/35 text-purple-200 hover:border-purple-400',
      iconClass: 'text-purple-400',
    };
  }
  if (t.includes('streamlit') || t.includes('pandas') || t.includes('numpy')) {
    return {
      icon: BarChart3,
      badgeClass: 'bg-rose-950/60 border-rose-500/35 text-rose-200 hover:border-rose-400',
      iconClass: 'text-rose-400',
    };
  }
  if (t.includes('django')) {
    return {
      icon: Server,
      badgeClass: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200 hover:border-emerald-400',
      iconClass: 'text-emerald-400',
    };
  }
  if (t.includes('tkinter')) {
    return {
      icon: Terminal,
      badgeClass: 'bg-sky-950/70 border-sky-500/35 text-sky-200 hover:border-sky-400',
      iconClass: 'text-sky-400',
    };
  }
  if (t.includes('reportlab') || t.includes('pdf')) {
    return {
      icon: FileCode,
      badgeClass: 'bg-red-950/70 border-red-500/35 text-red-200 hover:border-red-400',
      iconClass: 'text-red-400',
    };
  }
  if (t.includes('openpyxl') || t.includes('excel')) {
    return {
      icon: BarChart3,
      badgeClass: 'bg-green-950/70 border-green-500/35 text-green-200 hover:border-green-400',
      iconClass: 'text-green-400',
    };
  }
  if (t.includes('stripe') || t.includes('payhere') || t.includes('payment')) {
    return {
      icon: ShieldCheck,
      badgeClass: 'bg-violet-950/70 border-violet-500/35 text-violet-200 hover:border-violet-400',
      iconClass: 'text-violet-400',
    };
  }
  if (t.includes('rest') || t.includes('api')) {
    return {
      icon: Network,
      badgeClass: 'bg-cyan-950/60 border-cyan-500/35 text-cyan-200 hover:border-cyan-400',
      iconClass: 'text-cyan-400',
    };
  }

  return {
    icon: Code2,
    badgeClass: 'bg-slate-900/80 border-white/10 text-slate-300 hover:border-cyan-500/30',
    iconClass: 'text-slate-400',
  };
};

interface CategoryOption {
  id: ProjectCategory;
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

export const Projects: React.FC = () => {
  const { projects, addOrUpdateProject, deleteProject } = usePortfolioData();
  const { isOwner } = useAuth();

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const filterOptions: CategoryOption[] = [
    {
      id: 'All',
      label: 'All Projects',
      icon: Layers,
      description: `Comprehensive showcase of ${projects.length} full-stack web platforms, mobile responsive apps, and data systems.`,
    },
    {
      id: 'Web Development',
      label: 'Web Development',
      icon: Globe,
      description: 'Full-stack platforms engineered with Next.js, React, Node.js, Express, Angular, and MongoDB.',
    },
    {
      id: 'Mobile',
      label: 'Mobile',
      icon: Smartphone,
      description: 'Mobile-first web portals, responsive rider dispatch apps, and touch-optimized agile companions.',
    },
    {
      id: 'UI/UX',
      label: 'UI/UX',
      icon: Palette,
      description: 'User-centered design systems, high-speed POS billing flows, live dispatch feeds, and fluid interactive portals.',
    },
    {
      id: 'Machine Learning',
      label: 'Machine Learning',
      icon: Cpu,
      description: 'Predictive supervised regression models, feature scaling pipelines, and interactive Streamlit web applications.',
    },
    {
      id: 'Desktop & Systems',
      label: 'Desktop & Systems',
      icon: Terminal,
      description: 'Cross-platform desktop tools, thermal ticket printing, SQLite audit databases, and bus transit solutions.',
    },
  ];

  // Helper to calculate project count per category
  const getCategoryCount = (catId: ProjectCategory) => {
    if (catId === 'All') return projects.length;
    return projects.filter((p) => p.categories && p.categories.includes(catId)).length;
  };

  // Filtered projects list based on active category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        (project.categories && project.categories.includes(activeCategory));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.stackType.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
        project.categories.some((cat) => cat.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const activeCategoryMeta = filterOptions.find((opt) => opt.id === activeCategory);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.96,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 24,
        stiffness: 150,
        mass: 0.8,
        delay: (index % 6) * 0.08,
      },
    }),
  };

  const getCategoryTagStyle = (category: string) => {
    switch (category) {
      case 'Web Development':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/30 hover:bg-cyan-900/60';
      case 'Mobile':
        return 'bg-indigo-950/70 text-indigo-300 border-indigo-500/30 hover:bg-indigo-900/60';
      case 'UI/UX':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/60';
      case 'Machine Learning':
        return 'bg-amber-950/70 text-amber-300 border-amber-500/30 hover:bg-amber-900/60';
      default:
        return 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-800';
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background project-relevant tech infrastructure imagery */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=70"
          alt="Cloud server architecture and database systems"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top opacity-[0.08] dark:opacity-[0.12] filter contrast-125 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[var(--bg-canvas)] via-transparent to-[var(--bg-canvas)]" />
      </div>

      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-100 h-100 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Independent Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-700 to-blue-700 dark:from-cyan-400 dark:to-blue-400">Projects</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              End-to-end applications demonstrating database schema modeling, resilient REST and WebSocket APIs, and polished reactive frontends.
            </p>
          </div>

          {/* Quick Search Bar & Owner Add CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {isOwner && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsEditorOpen(true);
                }}
                id="owner-add-project-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}

            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="project-search-input"
                type="text"
                placeholder="Search tech, stack, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9.5 pr-8 py-2 text-xs rounded-xl bg-slate-900/90 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  id="project-search-clear"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          {filterOptions.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeCategory === tab.id;
            const count = getCategoryCount(tab.id);

            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400 font-semibold scale-[1.02]'
                    : 'glass-panel text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 border border-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-medium ${
                    isSelected ? 'bg-white/25 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Category Context Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-900/50 border border-white/5 mb-8 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{activeCategoryMeta?.description}</span>
          </div>
          <div className="hidden sm:block shrink-0 text-slate-500 font-mono text-[11px]">
            Showing {filteredProjects.length} of {projects.length}
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                exit={{ opacity: 0, scale: 0.92, y: 15, transition: { duration: 0.18 } }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                id={`project-card-${project.id}`}
                data-project-card="true"
                className="glass-card-interactive rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top specular accent border */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                {/* Project Cover Image Banner */}
                {project.coverImage ? (
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full h-44 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl bg-slate-900 border-b border-white/10 cursor-pointer select-none"
                  >
                    <img
                      src={project.coverImage}
                      alt={`${project.title} cover`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

                    {/* Floating Badges on top of cover image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/40 shadow-sm">
                        {project.stackType}
                      </span>

                      <div className="flex items-center gap-2">
                        {isOwner && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md border border-white/20 rounded-lg p-0.5 shadow-sm"
                          >
                            <button
                              id={`owner-edit-btn-${project.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProject(project);
                                setIsEditorOpen(true);
                              }}
                              className="p-1.5 rounded-md hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer"
                              title="Edit Project (Owner Only)"
                              aria-label="Edit Project"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`owner-delete-btn-${project.id}`}
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (confirm(`Delete project "${project.title}" from portfolio?`)) {
                                  await deleteProject(project.id);
                                }
                              }}
                              className="p-1.5 rounded-md hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                              title="Delete Project (Owner Only)"
                              aria-label="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        <span className="px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] text-slate-200 font-medium flex items-center gap-1.5 shadow-sm">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              project.status === 'In Progress'
                                ? 'bg-amber-400 animate-pulse'
                                : 'bg-emerald-400'
                            }`}
                          />
                          {project.status || 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Fallback Header: Stack badge & Status & Owner Tools when no cover image */
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                      {project.stackType}
                    </span>

                    <div className="flex items-center gap-2">
                      {isOwner && (
                        <div className="flex items-center gap-1 bg-slate-900/90 border border-white/10 rounded-lg p-0.5">
                          <button
                            id={`owner-edit-btn-${project.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingProject(project);
                              setIsEditorOpen(true);
                            }}
                            className="p-1.5 rounded-md hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer"
                            title="Edit Project (Owner Only)"
                            aria-label="Edit Project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`owner-delete-btn-${project.id}`}
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (confirm(`Delete project "${project.title}" from portfolio?`)) {
                                await deleteProject(project.id);
                              }
                            }}
                            className="p-1.5 rounded-md hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                            title="Delete Project (Owner Only)"
                            aria-label="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'In Progress'
                              ? 'bg-amber-400 animate-pulse'
                              : 'bg-emerald-400'
                          }`}
                        />
                        {project.status || 'Completed'}
                      </span>
                    </div>
                  </div>
                )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>

                  {/* Categories Pills (Clickable to switch filter) */}
                  <div className="flex flex-wrap gap-1.5 my-2.5">
                    {project.categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as ProjectCategory)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all cursor-pointer ${getCategoryTagStyle(
                          cat
                        )} ${activeCategory === cat ? 'ring-1 ring-white/30 font-semibold' : ''}`}
                        title={`Filter by ${cat}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Key Bullet Highlights */}
                  <div className="mt-4 pt-3.5 border-t border-white/5 space-y-2">
                    {project.description.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-normal">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: Tech Stack & Actions */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  {/* Tech Stack Badges with Icons */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => {
                      const techConfig = getTechBadgeConfig(tech);
                      const TechIcon = techConfig.icon;
                      return (
                        <span
                          key={tech}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all duration-200 shadow-xs ${techConfig.badgeClass}`}
                          title={`Technology: ${tech}`}
                        >
                          <TechIcon className={`w-3 h-3 shrink-0 ${techConfig.iconClass}`} />
                          <span>{tech}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      id={`view-arch-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-cyan-400/40 text-xs font-semibold text-slate-200 hover:text-cyan-300 transition-all cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Architecture</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        id={`github-link-${project.id}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-colors"
                        title="GitHub Repository"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      id={`deep-dive-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 hover:text-cyan-200 transition-colors"
                      title="Deep Dive"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search / Filter State */}
        {filteredProjects.length === 0 && (
          <div className="glass-panel rounded-3xl p-10 text-center border border-white/10 max-w-md mx-auto my-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No matching projects found</h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              No projects matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeCategory}&rdquo;. Try adjusting your search term or switching categories.
            </p>
            <button
              id="reset-filter-btn"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <React.Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </React.Suspense>
      )}

      {/* Owner Project Editor Modal */}
      {isEditorOpen && (
        <React.Suspense fallback={null}>
          <ProjectEditorModal
            isOpen={isEditorOpen}
            project={editingProject}
            onClose={() => setIsEditorOpen(false)}
            onSave={addOrUpdateProject}
            onDelete={deleteProject}
          />
        </React.Suspense>
      )}
    </section>
  );
};
