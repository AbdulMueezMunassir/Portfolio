import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project, SkillCategory, ContactMessage } from '../types';
import { PROJECTS as DEFAULT_PROJECTS, SKILL_CATEGORIES as DEFAULT_SKILLS } from '../data';
import { useAuth } from './AuthContext';
import { scheduleWhenIdle } from '../lib/scheduleWhenIdle';

const loadFirestoreClient = async () => {
  const [firestore, firebaseClient] = await Promise.all([
    import('firebase/firestore'),
    import('../lib/firebase'),
  ]);
  return { firestore, db: firebaseClient.db };
};

interface PortfolioDataContextType {
  projects: Project[];
  skills: SkillCategory[];
  messages: ContactMessage[];
  unreadCount: number;
  loading: boolean;
  addOrUpdateProject: (project: Project) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  addOrUpdateSkillCategory: (category: SkillCategory, originalName?: string) => Promise<void>;
  deleteSkillCategory: (categoryName: string) => Promise<void>;
  seedInitialDataIfEmpty: () => Promise<void>;
  sendMessage: (msg: { name: string; email: string; subject?: string; message: string }) => Promise<void>;
  markMessageAsRead: (id: string, read?: boolean) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

const REMOVED_PROJECT_IDS = new Set([
  'food-delivery-menn',
  'pearl-fashions-tracking',
  'meeting-progress-manager',
  'aquarium-web-app',
  'aquarium-portal',
  'mhk-travels-portal',
]);

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOwner } = useAuth();
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [skills, setSkills] = useState<SkillCategory[]>(DEFAULT_SKILLS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to Projects collection
  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const cancelScheduledLoad = scheduleWhenIdle(() => {
      void loadFirestoreClient()
        .then(({ firestore, db }) => {
        if (!active) return;
        unsubscribe = firestore.onSnapshot(
          firestore.collection(db, 'projects'),
          (snapshot) => {
            if (!snapshot.empty) {
              const loadedProjects: Project[] = [];
              snapshot.forEach((d) => {
                if (REMOVED_PROJECT_IDS.has(d.id)) {
                  if (isOwner) {
                    firestore.deleteDoc(firestore.doc(db, 'projects', d.id)).catch(() => {});
                  }
                  return;
                }

                const data = d.data() as Partial<Project>;
                const fallback = DEFAULT_PROJECTS.find((p) => p.id === d.id);
                const resolvedGithubUrl = fallback?.githubUrl || data.githubUrl;
                const resolvedCoverImage =
                  d.id === 'aqua-market-nextjs' && fallback?.coverImage
                    ? fallback.coverImage
                    : data.coverImage || fallback?.coverImage;

                if (isOwner && fallback?.githubUrl && data.githubUrl !== fallback.githubUrl) {
                  firestore.setDoc(firestore.doc(db, 'projects', d.id), { githubUrl: fallback.githubUrl }, { merge: true }).catch(() => {});
                }
                if (isOwner && fallback?.coverImage && data.coverImage !== fallback.coverImage && d.id === 'aqua-market-nextjs') {
                  firestore.setDoc(firestore.doc(db, 'projects', d.id), { coverImage: fallback.coverImage }, { merge: true }).catch(() => {});
                }

                loadedProjects.push({
                  id: d.id,
                  ...(fallback || {}),
                  ...data,
                  githubUrl: resolvedGithubUrl,
                  coverImage: resolvedCoverImage,
                } as Project);
              });

              DEFAULT_PROJECTS.forEach((defaultProj) => {
                if (!loadedProjects.some((p) => p.id === defaultProj.id)) {
                  loadedProjects.push(defaultProj);
                }
              });

              loadedProjects.sort((a, b) => {
                const indexA = DEFAULT_PROJECTS.findIndex((p) => p.id === a.id);
                const indexB = DEFAULT_PROJECTS.findIndex((p) => p.id === b.id);
                if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                return 0;
              });

              setProjects(loadedProjects);
            } else {
              setProjects(DEFAULT_PROJECTS);
            }
            setLoading(false);
          },
          (err) => {
            console.warn('Firestore projects listener fallback to local data:', err.message);
            setProjects(DEFAULT_PROJECTS);
            setLoading(false);
          }
        );
        })
        .catch((error: unknown) => {
          console.warn('Firestore projects listener fallback to local data:', error);
          setProjects(DEFAULT_PROJECTS);
          setLoading(false);
        });
    });

    return () => {
      active = false;
      cancelScheduledLoad();
      unsubscribe?.();
    };
  }, [isOwner]);

  // Subscribe to Skills collection
  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const cancelScheduledLoad = scheduleWhenIdle(() => {
      void loadFirestoreClient()
        .then(({ firestore, db }) => {
        if (!active) return;
        unsubscribe = firestore.onSnapshot(
          firestore.collection(db, 'skills'),
          (snapshot) => {
            if (!snapshot.empty) {
              const loadedSkills: SkillCategory[] = [];
              snapshot.forEach((d) => loadedSkills.push({ ...d.data() } as SkillCategory));
              DEFAULT_SKILLS.forEach((defCat) => {
                if (!loadedSkills.some((s) => s.name === defCat.name)) loadedSkills.push(defCat);
              });
              loadedSkills.sort((a, b) => {
                const idxA = DEFAULT_SKILLS.findIndex((s) => s.name === a.name);
                const idxB = DEFAULT_SKILLS.findIndex((s) => s.name === b.name);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                return 0;
              });
              setSkills(loadedSkills);
            } else {
              setSkills(DEFAULT_SKILLS);
            }
          },
          (err) => {
            console.warn('Firestore skills listener fallback to local data:', err.message);
            setSkills(DEFAULT_SKILLS);
          }
        );
        })
        .catch((error: unknown) => {
          console.warn('Firestore skills listener fallback to local data:', error);
          setSkills(DEFAULT_SKILLS);
        });
    });

    return () => {
      active = false;
      cancelScheduledLoad();
      unsubscribe?.();
    };
  }, []);

  // Subscribe to Messages collection (Owner only)
  useEffect(() => {
    if (!isOwner) {
      setMessages([]);
      return;
    }
    let active = true;
    let unsubscribe: (() => void) | undefined;

    const cancelScheduledLoad = scheduleWhenIdle(() => {
      void loadFirestoreClient()
        .then(({ firestore, db }) => {
        if (!active) return;
        unsubscribe = firestore.onSnapshot(
          firestore.collection(db, 'messages'),
          (snapshot) => {
            const loadedMsgs: ContactMessage[] = [];
            snapshot.forEach((d) => loadedMsgs.push({ id: d.id, ...d.data() } as ContactMessage));
            loadedMsgs.sort((a, b) => {
              const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return tB - tA;
            });
            setMessages(loadedMsgs);
          },
          (err) => console.warn('Messages listener warning:', err.message)
        );
        })
        .catch((error: unknown) => console.warn('Messages listener warning:', error));
    });

    return () => {
      active = false;
      cancelScheduledLoad();
      unsubscribe?.();
    };
  }, [isOwner]);

  const unreadCount = messages.filter((m) => !m.read).length;

  // Send message from contact form
  const sendMessage = async (msg: { name: string; email: string; subject?: string; message: string }) => {
    const { firestore, db } = await loadFirestoreClient();
    await firestore.addDoc(firestore.collection(db, 'messages'), {
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: (msg.subject || '').trim(),
      message: msg.message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    });
  };

  const markMessageAsRead = async (id: string, read: boolean = true) => {
    if (!isOwner) return;
    const { firestore, db } = await loadFirestoreClient();
    await firestore.updateDoc(firestore.doc(db, 'messages', id), { read });
  };

  const deleteMessage = async (id: string) => {
    if (!isOwner) return;
    const { firestore, db } = await loadFirestoreClient();
    await firestore.deleteDoc(firestore.doc(db, 'messages', id));
  };

  // Seed default data if owner wishes to populate Firestore with current resume items
  const seedInitialDataIfEmpty = async () => {
    if (!isOwner) throw new Error('Unauthorized: only owner can seed database');
    const { firestore, db } = await loadFirestoreClient();
    // Remove obsolete projects
    for (const oldId of REMOVED_PROJECT_IDS) {
      await firestore.deleteDoc(firestore.doc(db, 'projects', oldId)).catch(() => {});
    }
    // Set current CV projects
    for (const p of DEFAULT_PROJECTS) {
      await firestore.setDoc(firestore.doc(db, 'projects', p.id), p);
    }
    for (const s of DEFAULT_SKILLS) {
      const docId = s.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await firestore.setDoc(firestore.doc(db, 'skills', docId), s);
    }
  };

  const addOrUpdateProject = async (project: Project) => {
    if (!isOwner) {
      throw new Error('Unauthorized: Only the portfolio owner can edit or add projects.');
    }
    const cleanId = project.id || project.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const { firestore, db } = await loadFirestoreClient();
    await firestore.setDoc(firestore.doc(db, 'projects', cleanId), {
      ...project,
      id: cleanId,
    });
  };

  const deleteProject = async (projectId: string) => {
    if (!isOwner) {
      throw new Error('Unauthorized: Only the portfolio owner can delete projects.');
    }
    const { firestore, db } = await loadFirestoreClient();
    await firestore.deleteDoc(firestore.doc(db, 'projects', projectId));
  };

  const addOrUpdateSkillCategory = async (category: SkillCategory, originalName?: string) => {
    if (!isOwner) {
      throw new Error('Unauthorized: Only the portfolio owner can edit or add skills.');
    }
    const docId = category.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const { firestore, db } = await loadFirestoreClient();
    if (originalName && originalName !== category.name) {
      const oldDocId = originalName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await firestore.deleteDoc(firestore.doc(db, 'skills', oldDocId)).catch(() => {});
    }
    await firestore.setDoc(firestore.doc(db, 'skills', docId), category);
  };

  const deleteSkillCategory = async (categoryName: string) => {
    if (!isOwner) {
      throw new Error('Unauthorized: Only the portfolio owner can delete skill categories.');
    }
    const docId = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const { firestore, db } = await loadFirestoreClient();
    await firestore.deleteDoc(firestore.doc(db, 'skills', docId));
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        projects,
        skills,
        messages,
        unreadCount,
        loading,
        addOrUpdateProject,
        deleteProject,
        addOrUpdateSkillCategory,
        deleteSkillCategory,
        seedInitialDataIfEmpty,
        sendMessage,
        markMessageAsRead,
        deleteMessage,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = (): PortfolioDataContextType => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
