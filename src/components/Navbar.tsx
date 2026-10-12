import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import ProfileAvatar from './ProfileAvatar';
import { profilePhoto } from '../assets';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCvModal: () => void;
  onOpenPhotoModal?: () => void;
  profileImage?: string;
}

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  onOpenCvModal,
  onOpenPhotoModal,
  profileImage = profilePhoto,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'timeline', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ['hero', ...navLinks.map((l) => l.id)];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 border-b border-[#E5DACF]/70 dark:border-[#382229]/70 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Circular Profile Avatar */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              if (onOpenPhotoModal) {
                e.stopPropagation();
                onOpenPhotoModal();
              } else {
                scrollToSection('hero');
              }
            }}
            title="View Cherish's graduation portrait"
            className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ProfileAvatar
              size="sm"
              showStatusDot={true}
              interactive={true}
              imageSrc={profileImage}
              onClick={onOpenPhotoModal}
              className="pointer-events-auto"
            />
          </button>

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex flex-col group focus:outline-none"
            aria-label="Cherish Nwachukwu home"
          >
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#1F191B] dark:text-[#F1A7C1] group-hover:text-[#7A1B2E] dark:group-hover:text-white transition-colors leading-tight">
              Cherish Nwachukwu
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#7A1B2E] dark:text-[#F1A7C1]/80 tracking-wide uppercase">
              Digital Associate
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FAF4EC]/80 dark:bg-[#1A1417]/80 p-1.5 rounded-full border border-[#E5DACF]/80 dark:border-[#33232A] backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#7A1B2E] text-white shadow-xs'
                    : 'text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (CV + Dark Mode + Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Download CV CTA */}
          <button
            id="nav-cv-button"
            onClick={onOpenCvModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#7A1B2E] hover:bg-[#631424] text-white transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
            title="View & Download Curriculum Vitae"
          >
            <FileText className="w-3.5 h-3.5 text-[#F1A7C1]" />
            <span>Curriculum Vitae</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full border border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC] dark:bg-[#1A1417] flex items-center justify-center text-[#7A1B2E] dark:text-[#F1A7C1] hover:bg-[#7A1B2E]/10 dark:hover:bg-[#F1A7C1]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1B2E] cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-9 h-9 rounded-full border border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC] dark:bg-[#1A1417] flex items-center justify-center text-[#1F191B] dark:text-[#F5EFE6]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-[#E5DACF] dark:border-[#382229] px-5 py-4 animate-in slide-in-from-top duration-200 shadow-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#7A1B2E] text-white font-semibold'
                    : 'text-[#1F191B] dark:text-[#F5EFE6] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 mt-2 border-t border-[#E5DACF] dark:border-[#382229] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold bg-[#7A1B2E] text-white"
              >
                <FileText className="w-4 h-4 text-[#F1A7C1]" />
                <span>View & Download CV</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
