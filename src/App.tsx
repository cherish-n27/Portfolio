import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GallerySection from './components/GallerySection';
import Certifications from './components/Certifications';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CvModal from './components/CvModal';
import PhotoLightboxModal from './components/PhotoLightboxModal';
import CustomCursor from './components/CustomCursor';
import { ProjectTag } from './types';
import { profilePhoto } from './assets';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cherish_portfolio_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [selectedTagFilter, setSelectedTagFilter] = useState<ProjectTag | 'All'>('All');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('cherish_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('cherish_portfolio_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleHeroTagClick = (tag: ProjectTag) => {
    setSelectedTagFilter(tag);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] transition-colors duration-300 relative selection:bg-[#F1A7C1] selection:text-[#7A1B2E]">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenCvModal={() => setIsCvOpen(true)}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        profileImage={profilePhoto}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenCvModal={() => setIsCvOpen(true)}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
          onFilterByTag={handleHeroTagClick}
          profileImage={profilePhoto}
        />

        <About
          onOpenCvModal={() => setIsCvOpen(true)}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
          profileImage={profilePhoto}
        />

        <Skills
          selectedTagFilter={selectedTagFilter}
          onSelectTagFilter={(tag) => setSelectedTagFilter(tag)}
        />

        <Projects
          initialTagFilter={selectedTagFilter}
        />

        <GallerySection />

        <Certifications />

        <Timeline />

        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenCvModal={() => setIsCvOpen(true)}
      />

      {/* Interactive Printable Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        profileImage={profilePhoto}
      />

      {/* Interactive Profile Photo Lightbox Modal */}
      <PhotoLightboxModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        imageSrc={profilePhoto}
      />
    </div>
  );
}
