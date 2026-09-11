export type ProjectTag = 'Data & Tech' | 'Development' | 'Leadership';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  tags: ProjectTag[];
  techStack: string[];
  features: string[];
  impact?: string[];
  architectureNote?: string;
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100 for visual progress indicator
  category: 'Data & Tech' | 'Development' | 'Leadership';
  experienceNote?: string;
}

export interface SkillGroup {
  id: string;
  category: 'Data & Tech' | 'Development' | 'Leadership';
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
  technologies: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeUrl?: string;
  status: 'Completed' | 'In Progress';
  description: string;
  skills: string[];
}

export interface RoadmapItem {
  id: string;
  code: string;
  title: string;
  issuer: string;
  status: 'Currently Learning' | 'Next Up' | 'Target 2026' | 'Completed' | string;
  focus?: string;
  progressPercent: number;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  category: 'Experience' | 'Leadership' | 'Education';
  summary: string;
  bullets: string[];
  highlightBadge?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  aspectRatio?: string;
  date?: string;
  featured?: boolean;
}

export interface GalleryCategoryEntry {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  badge?: string;
  images: GalleryImage[];
}
