import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCvModal: () => void;
}

export default function Footer({ onOpenCvModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="no-print bg-[#FAF4EC] dark:bg-[#0E0B0D] border-t border-[#E5DACF] dark:border-[#261A1F] pt-14 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#E5DACF] dark:border-[#261A1F]">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-8 h-8 rounded-full bg-[#7A1B2E] text-[#F1A7C1] flex items-center justify-center font-bold text-xs">
                CN
              </div>
              <span className="text-lg font-bold text-[#1F191B] dark:text-[#F1A7C1]">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6] max-w-sm">
              Digital Associate & Software Development Trainee. Bridging data, software delivery, and executive governance.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#5C5055] dark:text-[#BDB0B6]">
            <a href="#about" className="hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] transition-colors">
              Projects
            </a>
            <a href="#certifications" className="hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] transition-colors">
              Certifications
            </a>
            <a href="#timeline" className="hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] transition-colors">
              Journey
            </a>
            <button
              onClick={onOpenCvModal}
              className="text-[#7A1B2E] dark:text-[#F1A7C1] hover:underline cursor-pointer"
            >
              Curriculum Vitae
            </button>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              id="footer-github"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full bg-[#FAF5EE] dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#382229] flex items-center justify-center text-[#1F191B] dark:text-[#F1A7C1] hover:text-[#7A1B2E] hover:border-[#7A1B2E] transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="footer-linkedin"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-9 h-9 rounded-full bg-[#FAF5EE] dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#382229] flex items-center justify-center text-[#1F191B] dark:text-[#F1A7C1] hover:text-[#7A1B2E] hover:border-[#7A1B2E] transition-all hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              id="footer-email"
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send email"
              className="w-9 h-9 rounded-full bg-[#FAF5EE] dark:bg-[#1A1417] border border-[#E5DACF] dark:border-[#382229] flex items-center justify-center text-[#1F191B] dark:text-[#F1A7C1] hover:text-[#7A1B2E] hover:border-[#7A1B2E] transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full bg-[#7A1B2E] text-white hover:bg-[#631424] flex items-center justify-center transition-all hover:scale-105 ml-2 cursor-pointer"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 text-[#F1A7C1]" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Brand Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C5055] dark:text-[#BDB0B6]">
          <p>© {new Date().getFullYear()} Cherish Nwachukwu. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with</span>
            <span className="text-[#7A1B2E] dark:text-[#F1A7C1]">♥</span>
            <span>Cape Town, South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
