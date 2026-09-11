import { useState, useEffect, useRef } from 'react';
import { Database, Code2, Users2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { ProjectTag } from '../types';

interface SkillsProps {
  selectedTagFilter?: ProjectTag | 'All';
  onSelectTagFilter?: (tag: ProjectTag | 'All') => void;
}

export default function Skills({ selectedTagFilter = 'All', onSelectTagFilter }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [inView, setInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'Data & Tech', label: 'Data & Tech' },
    { id: 'Development', label: 'Development' },
    { id: 'Leadership', label: 'Leadership' },
  ];

  const filteredGroups = activeCategory === 'all'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter((g) => g.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Data & Tech':
        return <Database className="w-5 h-5 text-[#7A1B2E] dark:text-[#F1A7C1]" />;
      case 'Development':
        return <Code2 className="w-5 h-5 text-[#7A1B2E] dark:text-[#F1A7C1]" />;
      case 'Leadership':
        return <Users2 className="w-5 h-5 text-[#7A1B2E] dark:text-[#F1A7C1]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#7A1B2E] dark:text-[#F1A7C1]" />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF4EC]/50 dark:bg-[#150F13]/50 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>Capabilities & Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Skills Grounded in Practice
          </h2>
          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-3">
            A balanced synthesis of analytical data methods, software engineering fundamentals, and executive leadership.
          </p>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        {/* Category Switcher Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`skills-tab-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setActiveCategory(cat.id);
                if (onSelectTagFilter && cat.id !== 'all') {
                  onSelectTagFilter(cat.id as ProjectTag);
                }
              }}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#7A1B2E] text-white shadow-sm scale-102'
                  : 'bg-[#FAF4EC] dark:bg-[#1A1417] text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white border border-[#E5DACF] dark:border-[#33232A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-[#FAF4EC] dark:bg-[#1A1417] rounded-3xl p-6 sm:p-7 border border-[#E5DACF] dark:border-[#33232A] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 flex items-center justify-center">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1F191B] dark:text-white">
                      {group.title}
                    </h3>
                    <span className="text-xs text-[#7A1B2E] dark:text-[#F1A7C1] font-medium">
                      {group.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5C5055] dark:text-[#BDB0B6] leading-relaxed mb-6">
                  {group.description}
                </p>

                {/* Interactive Animated Skill Progress Bars */}
                <div className="space-y-4 mb-6">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="group/item">
                      <div className="flex justify-between items-baseline text-xs mb-1">
                        <span className="font-semibold text-[#1F191B] dark:text-[#F5EFE6]">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">
                          {inView ? `${skill.level}%` : '0%'}
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div className="h-2 w-full bg-[#E5DACF]/60 dark:bg-[#33232A] rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#7A1B2E] to-[#96283F] dark:from-[#F1A7C1] dark:to-[#F8BFD3] transition-all duration-1000 ease-out"
                          style={{
                            width: inView ? `${skill.level}%` : '0%',
                            transitionDelay: `${sIdx * 90}ms`,
                          }}
                        />
                      </div>

                      {skill.experienceNote && (
                        <p className="text-[11px] text-[#5C5055]/80 dark:text-[#BDB0B6]/80 mt-1 italic leading-tight">
                          {skill.experienceNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Cloud */}
              <div className="pt-4 border-t border-[#E5DACF] dark:border-[#33232A]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] block mb-2">
                  Tools & Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF5EE] dark:bg-[#231B1F] text-[#1F191B] dark:text-[#F5EFE6] border border-[#E5DACF] dark:border-[#382229] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills & Working Style Strip */}
        <div className="mt-12 bg-[#7A1B2E] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1A7C1]">
              Professional Work Ethic
            </span>
            <h4 className="text-lg sm:text-xl font-bold mt-1 text-white">
              Adaptable • Detail-Oriented • Team Focused
            </h4>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
              Trained in modern Agile sprint cadences at CAPACITI, experienced in high-volume problem-solving, and equipped with a natural aptitude for clear documentation and peer guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Daily Standups', 'Prompt Engineering', 'Code Reviews', 'Public Speaking', 'Cross-Disciplinary'].map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-[#F1A7C1] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
