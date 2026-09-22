import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  Code2,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Workflow,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export interface AiToolItem {
  id: string;
  name: string;
  provider: string;
  version: string;
  tagline: string;
  description: string;
  useCases: string[];
  keyStrengths: string[];
  badgeColor: string;
  glowColor: string;
  borderHoverColor: string;
  accentBg: string;
  logo: React.ReactNode;
}

// Brand Logo SVGs for AI Tools
export const ClaudeLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-label="Anthropic Claude logo"
  >
    <path
      fill="#D97706"
      d="M13.82 2.5a.75.75 0 0 0-1.14-.65L4.5 6.64a.75.75 0 0 0-.38.65v9.42a.75.75 0 0 0 .38.65l8.18 4.79a.75.75 0 0 0 1.14-.65V2.5z"
      opacity="0.85"
    />
    <path
      fill="#F59E0B"
      d="M10.18 21.5a.75.75 0 0 0 1.14.65l8.18-4.79a.75.75 0 0 0 .38-.65V7.29a.75.75 0 0 0-.38-.65l-8.18-4.79a.75.75 0 0 0-1.14.65v18.99z"
    />
    <path
      fill="#B45309"
      d="M12 7.5L8.5 13.5h7L12 7.5z"
      opacity="0.9"
    />
  </svg>
);

export const DeepSeekLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-label="DeepSeek logo"
  >
    {/* Stylized DeepSeek Whale & Oceanic Spark Crest */}
    <path
      fill="#0284C7"
      d="M12 2C6.48 2 2 6.48 2 12c0 2.22.72 4.27 1.95 5.93L3 21l3.35-.93C8.03 21.32 9.94 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
      opacity="0.15"
    />
    <path
      fill="#0EA5E9"
      d="M19.5 12c0-4.14-3.36-7.5-7.5-7.5S4.5 7.86 4.5 12c0 1.7.57 3.26 1.52 4.52l-.84 2.53 2.62-.77C8.97 19.04 10.43 19.5 12 19.5c4.14 0 7.5-3.36 7.5-7.5z"
    />
    <path
      fill="#38BDF8"
      d="M14.5 9c-.83 0-1.5.67-1.5 1.5 0 .35.12.67.32.93L11 13.5l1.5 1.5 2.57-2.32c.26.2.58.32.93.32.83 0 1.5-.67 1.5-1.5S15.33 9 14.5 9z"
    />
    <circle cx="8.5" cy="11.5" r="1.5" fill="#E0F2FE" />
  </svg>
);

export const ChatGptLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-label="OpenAI ChatGPT logo"
  >
    <path
      fill="#10A37F"
      d="M20.5 10.4c-.2-.8-.7-1.5-1.4-1.9-.3-.2-.7-.3-1.1-.3v-1c0-1-.5-2-1.4-2.5-.8-.5-1.8-.6-2.7-.2-.3-.6-.8-1.1-1.4-1.5-.8-.5-1.8-.5-2.7-.1-.4-.6-1-1-1.7-1.2-1-.2-2 .1-2.7.9-.6.7-.8 1.6-.7 2.5-.5.2-1 .6-1.4 1.1-.6.7-.8 1.7-.5 2.6-.5.3-.9.8-1.1 1.4-.4.9-.2 2 .3 2.8-.2.8-.1 1.7.4 2.4.5.7 1.3 1.2 2.1 1.3v1c0 1 .5 2 1.4 2.5.8.5 1.8.6 2.7.2.3.6.8 1.1 1.4 1.5.8.5 1.8.5 2.7.1.4.6 1 1 1.7 1.2 1 .2 2-.1 2.7-.9.6-.7.8-1.6.7-2.5.5-.2 1-.6 1.4-1.1.6-.7.8-1.7.5-2.6.5-.3.9-.8 1.1-1.4.4-.9.2-2-.3-2.8.2-.8.1-1.7-.4-2.4-.5-.7-1.3-1.2-2.1-1.3v-.1zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"
    />
  </svg>
);

export const GeminiLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-label="Google Gemini logo"
  >
    <defs>
      <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    {/* Official Google Gemini Four-Point Curved Sparkle Star */}
    <path
      fill="url(#geminiGrad)"
      d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
    />
  </svg>
);

export const AI_TOOLS_DATA: AiToolItem[] = [
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    provider: 'Anthropic',
    version: 'Claude 3.7 & 3.5 Sonnet',
    tagline: 'System Architecture & Deep Reasoning',
    description:
      'My primary AI engineering partner for designing clean architectural schemas, reasoning through complex asynchronous state machines, performing deep multi-file refactoring, and enforcing production-grade type safety.',
    useCases: [
      'Full-Stack Architecture Scaffolding',
      'Complex Code Refactoring & Logic Cleanups',
      'Database Schema Normalization & Constraints',
      'Unit & Integration Test Drafting',
    ],
    keyStrengths: ['Deep Reasoning', 'Long Context', 'Strict Type Checking'],
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    glowColor: 'shadow-amber-500/10',
    borderHoverColor: 'group-hover:border-amber-400/50',
    accentBg: 'from-amber-500/10 via-amber-500/5 to-transparent',
    logo: <ClaudeLogo className="w-8 h-8" />,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'DeepSeek-AI',
    version: 'DeepSeek-V3 & R1 (Reasoning)',
    tagline: 'Mathematical Logic & Algorithm Optimization',
    description:
      'Leveraged for intense mathematical reasoning, algorithmic speed optimization, SQL query indexing plans, and dissecting subtle edge cases in computational pipelines like fare calculations and transaction logs.',
    useCases: [
      'Algorithm Optimization & Time-Complexity Audits',
      'Complex SQL Query & Index Analysis',
      'Mathematical Verification & Stage Pricing Logic',
      'Bug Isolation in Distributed Systems',
    ],
    keyStrengths: ['Mathematical Precision', 'Fast Inference', 'Chain-of-Thought'],
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    glowColor: 'shadow-sky-500/10',
    borderHoverColor: 'group-hover:border-sky-400/50',
    accentBg: 'from-sky-500/10 via-sky-500/5 to-transparent',
    logo: <DeepSeekLogo className="w-8 h-8" />,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    provider: 'OpenAI',
    version: 'GPT-4o & Canvas Workflows',
    tagline: 'Rapid Scaffolding & API Development',
    description:
      'Utilized for high-velocity full-stack bootstrapping, drafting REST API route contracts, generating synthetic mock data fixtures, interactive UI mockups, and writing comprehensive API technical documentation.',
    useCases: [
      'REST & CRUD API Endpoint Scaffolding',
      'API Contract Design & OpenAPI Documentation',
      'Synthetic Data & Test Payload Generation',
      'Regex & Data Transformation Pipelines',
    ],
    keyStrengths: ['Rapid Prototyping', 'Broad API Knowledge', 'Canvas Editing'],
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    glowColor: 'shadow-emerald-500/10',
    borderHoverColor: 'group-hover:border-emerald-400/50',
    accentBg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    logo: <ChatGptLogo className="w-8 h-8" />,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    provider: 'Google DeepMind',
    version: 'Gemini 2.0 Flash & Pro',
    tagline: 'Multimodal Intelligence & Large Context',
    description:
      'Deployed for multimodal visual UI reviews, processing extensive multi-file code repositories with massive context windows, staying in sync with latest SDK documentation, and integrating Google GenAI endpoints.',
    useCases: [
      'Large Repository Context Navigation',
      'Multimodal Design & Layout Inspections',
      'Google GenAI SDK Integration',
      'Real-time Streaming & Audio/Text APIs',
    ],
    keyStrengths: ['Massive Context Window', 'Multimodal Vision', 'Google Cloud Sync'],
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    glowColor: 'shadow-purple-500/10',
    borderHoverColor: 'group-hover:border-purple-400/50',
    accentBg: 'from-purple-500/10 via-pink-500/5 to-transparent',
    logo: <GeminiLogo className="w-8 h-8" />,
  },
];

export const AiToolsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTools =
    activeTab === 'all'
      ? AI_TOOLS_DATA
      : AI_TOOLS_DATA.filter((tool) => tool.id === activeTab);

  return (
    <div id="ai-tools-section" className="mb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI-Accelerated Engineering Stack</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>AI Coding Tools & LLM Expertise</span>
            <span className="hidden sm:inline-block text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10">
              Modern Velocity
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            I actively integrate premier AI coding models into my daily workflow to accelerate development speed, design resilient architectures, write clean tests, and refactor complex logic.
          </p>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All AI Tools
          </button>
          {AI_TOOLS_DATA.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {t.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of AI Tool Cards with Logos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className={`glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 ${tool.borderHoverColor} transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-xl ${tool.glowColor}`}
          >
            {/* Ambient subtle gradient wash */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${tool.accentBg} pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
            />

            <div className="relative z-10">
              {/* Header: Logo, Name, Version, Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-slate-950/90 border border-white/15 p-2.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0">
                    {tool.logo}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {tool.version} • <span className="text-slate-300">{tool.provider}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${tool.badgeColor} shrink-0`}
                >
                  {tool.keyStrengths[0]}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs font-semibold text-cyan-300 mb-2.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{tool.tagline}</span>
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {tool.description}
              </p>

              {/* Practical Use Cases List */}
              <div className="space-y-1.5 mb-5 bg-slate-950/40 border border-white/5 rounded-2xl p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <Bot className="w-3 h-3 text-purple-400" />
                  <span>How I Apply It:</span>
                </p>
                {tool.useCases.map((uc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Strengths Pills */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {tool.keyStrengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-[11px] font-medium text-slate-300"
                  >
                    {str}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-mono text-purple-300/90 font-medium">
                Daily Accelerated Workflow
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Velocity Summary Banner */}
      <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 shrink-0">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">
              AI-Augmented Engineering Philosophy
            </h5>
            <p className="text-xs text-slate-300">
              AI models multiply output velocity, while disciplined software engineering fundamentals ensure architectural integrity, type safety, and clean codebases.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-semibold text-slate-200">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>High-Velocity Delivery</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Hallucination</span>
          </span>
        </div>
      </div>
    </div>
  );
};
