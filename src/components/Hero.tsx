import { useState } from 'react';
import { Download, Mail, ArrowDown, Github, Linkedin, Check, Copy, Sparkles, MapPin } from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import ProfileAvatar from './ProfileAvatar';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
  onOpenPhotoModal?: () => void;
  onFilterByTag?: (tag: 'Data & Tech' | 'Development' | 'Leadership') => void;
  profileImage?: string;
}

export default function Hero({ onOpenCvModal, onOpenPhotoModal, onFilterByTag, profileImage }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjectsWithTag = (tag: 'Data & Tech' | 'Development' | 'Leadership') => {
    if (onFilterByTag) {
      onFilterByTag(tag);
    }
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Brand Motif Decorative Floral SVGs */}
      <div className="absolute top-12 left-[-60px] sm:left-[-40px] lg:left-4 -z-10 opacity-70 dark:opacity-30 pointer-events-none">
        <FlowerMotif
          size={360}
          petalColor="#F1A7C1"
          centerColor="#7A1B2E"
          opacity={0.85}
          className="animate-spin-slow"
        />
      </div>

      <div className="absolute -bottom-20 -right-20 lg:right-4 -z-10 opacity-40 dark:opacity-20 pointer-events-none">
        <FlowerMotif
          size={300}
          petalColor="#F1A7C1"
          centerColor="#7A1B2E"
          opacity={0.7}
        />
      </div>

      {/* Subtle warm glow backdrops */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F1A7C1]/20 dark:bg-[#7A1B2E]/15 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Availability / Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF4EC] dark:bg-[#1E171B] border border-[#E5DACF] dark:border-[#382229] text-[#7A1B2E] dark:text-[#F1A7C1] shadow-xs mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7A1B2E] dark:bg-[#F1A7C1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7A1B2E] dark:bg-[#F1A7C1]"></span>
          </span>
          <span>CAPACITI Demand Academy Trainee</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="inline-flex items-center gap-1 text-[#5C5055] dark:text-[#BDB0B6]">
            <MapPin className="w-3 h-3" /> Cape Town, ZA
          </span>
        </div>

        {/* Viewable Circular Profile Picture */}
        <div className="flex flex-col items-center justify-center mb-6 group">
          <div className="relative">
            <ProfileAvatar
              size="xl"
              showStatusDot={true}
              showFlowerAccent={true}
              showViewHint={true}
              interactive={true}
              imageSrc={profileImage}
              onClick={onOpenPhotoModal}
              className="cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={onOpenPhotoModal}
            className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF4EC] dark:bg-[#1E171B] hover:bg-[#F1A7C1]/20 dark:hover:bg-[#3D222B] text-[#7A1B2E] dark:text-[#F1A7C1] border border-[#E5DACF] dark:border-[#382229] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            title={profileImage ? "Click to view full graduation portrait" : "Click to upload profile picture"}
          >
            {profileImage ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A1B2E] dark:bg-[#F1A7C1]"></span>
                <span>IIE Rosebank Grad • Distinction</span>
                <span className="text-[10px] uppercase font-bold opacity-75 ml-0.5 underline">View Photo</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A1B2E] dark:bg-[#F1A7C1]"></span>
                <span>Upload: Profile Picture</span>
                <span className="text-[10px] uppercase font-bold opacity-75 ml-0.5 underline">Upload</span>
              </>
            )}
          </button>
        </div>

        {/* Display Name with Brand Reference Styling */}
        <div className="relative inline-block mb-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1] leading-none">
            {PERSONAL_INFO.name}
          </h1>
          {/* Subtle burgundy underline accent from reference banner */}
          <div className="h-1 sm:h-1.5 w-full bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mt-3 mx-auto shadow-xs" />
        </div>

        {/* Subtitle / Role */}
        <p className="text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase text-[#7A1B2E] dark:text-[#F1A7C1]/90 mt-3 mb-6">
          {PERSONAL_INFO.title}
        </p>

        {/* Three Core Focus Tags as Pill Badges (Direct from brand reference) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
          {PERSONAL_INFO.tags.map((tag) => (
            <button
              key={tag}
              id={`hero-tag-${tag.toLowerCase().replace(/\s+&?\s*/g, '-')}`}
              onClick={() => scrollToProjectsWithTag(tag)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#7A1B2E] hover:bg-[#631424] text-white transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
              title={`View ${tag} projects and experience`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F1A7C1]" />
              <span>{tag}</span>
            </button>
          ))}
        </div>

        {/* Direct Email Pill Button (Direct from brand reference banner) */}
        <div className="mb-7">
          <button
            id="hero-email-pill"
            onClick={copyEmail}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#7A1B2E] hover:bg-[#631424] text-white transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
            title="Click to copy email address"
          >
            <Mail className="w-3.5 h-3.5 text-[#F1A7C1]" />
            <span className="font-mono tracking-tight">{PERSONAL_INFO.email}</span>
            <span className="text-[#F1A7C1]/70 group-hover:text-[#F1A7C1] pl-1">
              {copied ? (
                <span className="inline-flex items-center text-[#F1A7C1] text-xs font-sans">
                  <Check className="w-3.5 h-3.5 mr-0.5" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </span>
          </button>
        </div>

        {/* Narrative One-Line Pitch */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5C5055] dark:text-[#E2D8DE] font-normal leading-relaxed mb-9">
          IT Business Systems graduate with Distinction & Golden Key honours. Bridging practical software delivery, SQL, and prompt engineering with proven executive student governance.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-10">
          <button
            id="hero-download-cv-btn"
            onClick={onOpenCvModal}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-sm font-bold bg-[#7A1B2E] hover:bg-[#631424] text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#F1A7C1]" />
            <span>Download Curriculum Vitae</span>
          </button>

          <button
            id="hero-get-in-touch-btn"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full text-sm font-bold bg-[#FAF4EC] dark:bg-[#1E171B] hover:bg-[#F0E6D8] dark:hover:bg-[#2D2228] text-[#7A1B2E] dark:text-[#F1A7C1] border border-[#7A1B2E]/30 dark:border-[#F1A7C1]/30 shadow-xs hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1]" />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Social & Professional Links */}
        <div className="flex items-center justify-center gap-3">
          <a
            id="hero-github-link"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC] dark:bg-[#1E171B] flex items-center justify-center text-[#1F191B] dark:text-[#F1A7C1] hover:text-[#7A1B2E] hover:border-[#7A1B2E] transition-all hover:scale-105"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="hero-linkedin-link"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC] dark:bg-[#1E171B] flex items-center justify-center text-[#1F191B] dark:text-[#F1A7C1] hover:text-[#7A1B2E] hover:border-[#7A1B2E] transition-all hover:scale-105"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            id="hero-email-link"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="w-10 h-10 rounded-full border border-[#E5DACF] dark:border-[#382229] bg-[#FAF4EC] dark:bg-[#1E171B] flex items-center justify-center text-[#1F191B] dark:text-[#F1A7C1] hover:text-[#7A1B2E] hover:border-[#7A1B2E] transition-all hover:scale-105"
            aria-label="Send direct email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Down arrow scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-[#5C5055] dark:text-[#BDB0B6] opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[11px] font-semibold tracking-wider uppercase">Explore</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
