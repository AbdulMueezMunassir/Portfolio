import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Layers, AlertCircle } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillEditorModalProps {
  isOpen: boolean;
  category: SkillCategory | null;
  onClose: () => void;
  onSave: (cat: SkillCategory, originalName?: string) => Promise<void>;
  onDelete?: (name: string) => Promise<void>;
}

export const SkillEditorModal: React.FC<SkillEditorModalProps> = ({
  isOpen,
  category,
  onClose,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('Code2');
  const [skills, setSkills] = useState<{ name: string; level?: string; highlight?: boolean }[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Advanced');
  const [newSkillHighlight, setNewSkillHighlight] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setIconName(category.iconName || 'Code2');
      setSkills(category.skills || []);
    } else {
      setName('');
      setIconName('Code2');
      setSkills([]);
    }
    setError('');
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setSkills((prev) => [
      ...prev,
      {
        name: newSkillName.trim(),
        level: newSkillLevel,
        highlight: newSkillHighlight,
      },
    ]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a category name.');
      return;
    }
    if (skills.length === 0) {
      setError('Please add at least one skill item.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const updatedCategory: SkillCategory = {
        name: name.trim(),
        iconName,
        skills,
      };
      await onSave(updatedCategory, category?.name);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save skill category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!category || !onDelete) return;
    if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      setSaving(true);
      try {
        await onDelete(category.name);
        onClose();
      } catch (err: any) {
        setError(err.message || 'Failed to delete category');
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {category ? 'Edit Skill Category' : 'Add New Skill Category'}
            </h3>
            <p className="text-xs text-slate-400">
              Manage technical proficiencies and display badges
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
              <label className="block text-slate-300 font-medium mb-1">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cloud & DevOps"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Category Icon</label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Layout">Layout (Frontend)</option>
                <option value="Server">Server (Backend)</option>
                <option value="Database">Database</option>
                <option value="Brain">Brain (AI / ML)</option>
                <option value="Code2">Code2 (Languages / Core)</option>
                <option value="Cpu">Cpu (DevOps & Tools)</option>
              </select>
            </div>
          </div>

          {/* Current Skills in Category */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Skills in this category ({skills.length})
            </label>
            <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-900/60 border border-white/5 min-h-[60px]">
              {skills.length === 0 ? (
                <span className="text-slate-500 italic">No skills added yet. Use the form below.</span>
              ) : (
                skills.map((skill, idx) => (
                  <div
                    key={`${skill.name}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-slate-200 text-xs group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="font-semibold">{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-slate-400 font-mono">({skill.level})</span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(idx)}
                      className="ml-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove skill"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add a Skill sub-form */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
            <span className="font-semibold text-cyan-300 block">Add Skill to Category</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Docker)"
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Familiar">Familiar</option>
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Badge</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {category && onDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Category</span>
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
                id="save-skill-btn"
                className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Category'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
