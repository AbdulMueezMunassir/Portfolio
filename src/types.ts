export type ThemeMode = 'deep-midnight' | 'clean-light';

export type ProjectCategory = 'All' | 'Web Development' | 'Mobile' | 'UI/UX' | 'Machine Learning' | 'Desktop & Systems';

export interface Project {
  id: string;
  title: string;
  stackType: string;
  category?: 'all' | 'fullstack' | 'realtime' | 'ml' | 'enterprise' | string;
  categories: string[];
  coverImage?: string;
  summary: string;
  description: string[];
  technologies: string[];
  features: string[];
  architecture: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: 'Completed' | 'In Progress';
}

export interface SkillCategory {
  name: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
  results?: { subject: string; grade: string }[];
}

export type AccentColor = 'cyan' | 'violet' | 'emerald' | 'amber';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}
