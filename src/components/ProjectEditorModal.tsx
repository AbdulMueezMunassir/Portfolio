import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Trash2, Plus, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectEditorModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [stackType, setStackType] = useState('MERN Stack');
  const [category, setCategory] = useState('fullstack');
  const [filterCategories, setFilterCategories] = useState('Web Development');
  const [summary, setSummary] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<'Completed' | 'In Progress'>('Completed');
  const [featured, setFeatured] = useState(true);
  const [descriptionText, setDescriptionText] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setStackType(project.stackType || 'MERN Stack');
      setCategory(project.category || 'fullstack');
      setFilterCategories(project.categories ? project.categories.join(', ') : 'Web Development');
      setSummary(project.summary || '');
      setTechnologies(project.technologies ? project.technologies.join(', ') : '');
      setArchitecture(project.architecture || '');
      setGithubUrl(project.githubUrl || '');
      setLiveUrl(project.liveUrl || '');
      setCoverImage(project.coverImage || '');
      setStatus(project.status || 'Completed');
      setFeatured(project.featured ?? true);
      setDescriptionText(project.description ? project.description.join('\n') : '');
      setFeaturesText(project.features ? project.features.join('\n') : '');
    } else {
      setTitle('');
      setStackType('Full-Stack Web App');
      setCategory('fullstack');
      setFilterCategories('Web Development');
      setSummary('');
      setTechnologies('React, Node.js, Express, MongoDB');
      setArchitecture('');
      setGithubUrl('');
      setLiveUrl('');
      setCoverImage('');
      setStatus('Completed');
      setFeatured(true);
      setDescriptionText('');
      setFeaturesText('');
    }
    setError('');
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      setError('Please provide at least a project title and summary.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const generatedId =
        project?.id ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') ||
        `proj-${Date.now()}`;

      const techList = technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const catList = filterCategories
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      const descList = descriptionText
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean);

      const featList = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const updatedProject: Project = {
        id: generatedId,
        title: title.trim(),
        stackType: stackType.trim(),
        category,
        categories: catList.length > 0 ? catList : ['Web Development'],
        summary: summary.trim(),
        technologies: techList,
        architecture: architecture.trim(),
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        coverImage: coverImage.trim() || undefined,
        status,
        featured,
        description: descList.length > 0 ? descList : [summary.trim()],
        features: featList,
      };

      await onSave(updatedProject);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !onDelete) return;
    if (confirm(`Are you sure you want to delete project "${project.title}"?`)) {
      setSaving(true);
      try {
        await onDelete(project.id);
        onClose();
      } catch (err: any) {
        setError(err.message || 'Failed to delete project');
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {project ? 'Edit Project' : 'Add New Project'}
            </h3>
            <p className="text-xs text-slate-400">
              Changes will be synchronized to Firestore and accessible globally
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI-Powered Medical Analytics"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Stack Type</label>
              <input
                type="text"
                value={stackType}
                onChange={(e) => setStackType(e.target.value)}
                placeholder="e.g. MERN Stack, Python ML, Next.js"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Filter Categories</label>
              <input
                type="text"
                value={filterCategories}
                onChange={(e) => setFilterCategories(e.target.value)}
                placeholder="Web Development, Mobile, UI/UX"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-cyan-400"
                />
                <span>Featured Project</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Short Summary *</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="High-level 1-2 sentence description of the product and business purpose"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Technologies (comma-separated badges)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, TypeScript, Node.js, Express, Tailwind CSS, MongoDB"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">GitHub Repository Link</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/AbdulMueezMunassir/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Live Demo Link (Optional)</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://your-demo.vercel.app"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Cover Image URL (Optional)</label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              {coverImage && (
                <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-slate-900">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">System Architecture</label>
            <input
              type="text"
              value={architecture}
              onChange={(e) => setArchitecture(e.target.value)}
              placeholder="e.g. Next.js SPA ➔ Express Gateway ➔ MongoDB Cluster with JWT auth"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Detailed Bullet Points (one per line)
              </label>
              <textarea
                rows={3}
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                placeholder="Engineered high throughput API...&#10;Built real-time event loops..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Key Features (one per line)
              </label>
              <textarea
                rows={3}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="Interactive dashboard&#10;Role-based permissions&#10;Secure token refresh"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {project && onDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Project</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                id="save-project-btn"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save to Portfolio'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
