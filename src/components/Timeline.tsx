import { useState } from 'react';
import { Briefcase, Users, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/portfolioData';

export default function Timeline() {
  const [filter, setFilter] = useState<'All' | 'Experience' | 'Leadership' | 'Education'>('All');

  const filteredMilestones = filter === 'All'
    ? TIMELINE_MILESTONES
    : TIMELINE_MILESTONES.filter((m) => m.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Experience':
        return <Briefcase className="w-4 h-4" />;
      case 'Leadership':
        return <Users className="w-4 h-4" />;
      case 'Education':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>Career Journey & Leadership Evolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Experience & Governance Timeline
          </h2>
          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-3">
            The progression from executive student governance and academic mentoring to hands-on software development and applied AI.
          </p>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'Experience', 'Leadership', 'Education'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-[#7A1B2E] text-white shadow-xs'
                  : 'bg-[#FAF4EC] dark:bg-[#1A1417] text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#1F191B] dark:hover:text-white border border-[#E5DACF] dark:border-[#33232A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#7A1B2E]/20 dark:border-[#F1A7C1]/20 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-10">
          {filteredMilestones.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Point */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-[#FAF4EC] dark:bg-[#120E10] border-2 border-[#7A1B2E] dark:border-[#F1A7C1] flex items-center justify-center text-[#7A1B2E] dark:text-[#F1A7C1] shadow-xs group-hover:scale-110 group-hover:bg-[#7A1B2E] group-hover:text-white dark:group-hover:bg-[#F1A7C1] dark:group-hover:text-[#1F191B] transition-all">
                <div className="w-2 h-2 rounded-full bg-current" />
              </div>

              {/* Time Period Tag (on desktop floats left) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
                <span className="font-mono text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1] block leading-tight">
                  {item.period}
                </span>
                <span className="text-[10px] text-[#5C5055] dark:text-[#BDB0B6] block">
                  {item.category}
                </span>
              </div>

              {/* Milestone Card */}
              <div className="bg-[#FAF4EC] dark:bg-[#1A1417] p-6 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] group-hover:border-[#7A1B2E]/50 dark:group-hover:border-[#F1A7C1]/50 shadow-xs hover:shadow-md transition-all duration-200">
                {/* Mobile Period Badge */}
                <div className="sm:hidden flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1] inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1]">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-lg font-bold text-[#1F191B] dark:text-white">
                    {item.title}
                  </h3>
                  {item.highlightBadge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7A1B2E] text-white">
                      {item.highlightBadge}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
                  <span>{item.organization}</span>
                  <span className="flex items-center gap-1 text-[#5C5055] dark:text-[#BDB0B6]">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5C5055] dark:text-[#E2D8DE] mb-4 leading-relaxed font-normal">
                  {item.summary}
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-[#1F191B] dark:text-[#F5EFE6]">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1] shrink-0 mt-0.5" />
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
