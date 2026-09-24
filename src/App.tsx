import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PERSONAL_INFO } from './data';
import { AuthProvider } from './context/AuthContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { BackToTop } from './components/BackToTop';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThemeMode } from './types';
export type { ThemeMode };

// Lazy load heavy PDF/Canvas CV Modal to reduce initial bundle size and load time
const CvModal = React.lazy(() =>
  import('./components/CvModal').then((mod) => ({ default: mod.CvModal }))
);

function PortfolioApp() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('am_theme_pref');
    if (saved === 'deep-midnight' || saved === 'slate-blue' || saved === 'clean-light') {
      return saved;
    }
    return 'clean-light';
  });
  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem('am_custom_avatar') || PERSONAL_INFO.avatarUrl || '/avatar.png';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('am_theme_pref', theme);
    localStorage.setItem('am_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'deep-midnight') return 'clean-light';
      if (prev === 'clean-light') return 'slate-blue';
      return 'deep-midnight';
    });
  };

  const handleUpdateAvatar = (newUrl: string) => {
    setAvatarUrl(newUrl);
    localStorage.setItem('am_custom_avatar', newUrl);
  };

  const handleOpenContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] relative selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-500">
      {/* Dynamic animated ambient background */}
      <AnimatedBackground theme={theme} />

      {/* Navigation Header */}
      <Navbar
        onOpenCv={() => setIsCvOpen(true)}
        onOpenContact={handleOpenContact}
        avatarUrl={avatarUrl}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectTheme={setTheme}
      />

      {/* Main Content */}
      <main>
        <Hero
          onOpenCv={() => setIsCvOpen(true)}
          avatarUrl={avatarUrl}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Glassmorphic Footer */}
      <Footer
        onOpenCv={() => setIsCvOpen(true)}
        avatarUrl={avatarUrl}
      />

      {/* Interactive CV Modal (Printable & Copyable, loaded on-demand) */}
      <React.Suspense fallback={null}>
        {isCvOpen && (
          <CvModal
            isOpen={isCvOpen}
            onClose={() => setIsCvOpen(false)}
            avatarUrl={avatarUrl}
          />
        )}
      </React.Suspense>

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Floating Direct WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <PortfolioApp />
      </PortfolioDataProvider>
    </AuthProvider>
  );
}
