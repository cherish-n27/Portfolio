import { useState } from 'react';
import { Award, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS, ROADMAP_ITEMS } from '../data/portfolioData';
import { grad2, leadership1, profilePhoto } from '../assets';

export default function Certifications() {
  const [filter, setFilter] = useState<'All' | 'AI & ML' | 'Development' | 'Cloud & Systems'>('All');
  const [selectedHonourImg, setSelectedHonourImg] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const getFilteredCerts = () => {
    if (filter === 'AI & ML') {
      return CERTIFICATIONS.filter((c) =>
        c.skills.some((s) => s.includes('AI') || s.includes('Machine Learning') || s.includes('Regression') || s.includes('Prompt'))
      );
    }
    if (filter === 'Development') {
      return CERTIFICATIONS.filter((c) =>
        c.skills.some((s) => s.includes('Full Stack') || s.includes('Python') || s.includes('JavaScript') || s.includes('Software'))
      );
    }
    if (filter === 'Cloud & Systems') {
      return CERTIFICATIONS.filter((c) =>
        c.skills.some((s) => s.includes('M365') || s.includes('Security') || s.includes('Cloud') || s.includes('Admin'))
      );
    }
    return CERTIFICATIONS;
  };

  const honours = [
    {
      id: 'golden-key',
      image: grad2,
      title: 'Golden Key International Honour Society',
      issuer: 'The Independent Institute of Education',
      date: '2025 Induction',
      badge: 'Top 15% Academic Standing',
      description: 'Official invitation and induction into the premier collegiate honor society recognizing academic excellence.',
    },
    {
      id: 'wellness-appreciation',
      image: leadership1,
      title: 'Certificate of Appreciation — Student Wellness',
      issuer: 'IIE Rosebank College, Cape Town',
      date: 'November 2025',
      badge: 'Executive Leadership',
      description: 'Presented in recognition of unwavering dedication to the student experience and student council service.',
    },
    {
      id: 'bit-degree',
      image: profilePhoto,
      title: 'Bachelor of IT in Business Systems',
      issuer: 'IIE Rosebank College (NQF Level 7)',
      date: 'Class of 2025',
      badge: 'Graduated with Distinction',
      description: 'Conferred with Distinction in systems analysis, relational database design, ERP strategy, and quantitative methods.',
    },
  ];

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF4EC]/60 dark:bg-[#150F13]/60 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>Continuous Learning & Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Certifications & Academic Honours
          </h2>
          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-3">
            Industry credentials in Artificial Intelligence, Full-Stack Development, and Microsoft 365, alongside formal institutional awards.
          </p>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        {/* Featured Honours & Official Certificates Grid */}
        <div className="mb-14">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] dark:text-[#F1A7C1] mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1]" />
            <span>Verified Diplomas & Academic Awards</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {honours.map((honour) => (
              <div
                key={honour.id}
                onClick={() => setSelectedHonourImg({ src: honour.image, title: honour.title, subtitle: honour.issuer })}
                className="group bg-[#FAF4EC] dark:bg-[#1A1417] rounded-3xl overflow-hidden border border-[#E5DACF] dark:border-[#382229] hover:border-[#7A1B2E]/60 dark:hover:border-[#F1A7C1]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-48 w-full bg-zinc-900 overflow-hidden border-b border-[#E5DACF] dark:border-[#382229]">
                  <img
                    src={honour.image}
                    alt={honour.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7A1B2E] text-white shadow-sm">
                    {honour.badge}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#1F191B] dark:text-white group-hover:text-[#7A1B2E] dark:group-hover:text-[#F1A7C1] transition-colors mb-1">
                      {honour.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#7A1B2E] dark:text-[#F1A7C1] mb-2">
                      {honour.issuer}
                    </p>
                    <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6] leading-relaxed mb-3">
                      {honour.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E5DACF] dark:border-[#33232A] flex items-center justify-between text-[11px] font-mono text-[#5C5055] dark:text-[#BDB0B6]">
                    <span>{honour.date}</span>
                    <span className="text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold group-hover:underline">View Certificate ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Momentum / Target Pipeline Banner */}
        <div className="mb-12 bg-gradient-to-r from-[#7A1B2E] via-[#8E2238] to-[#7A1B2E] text-white p-5 sm:p-6 rounded-3xl shadow-sm border border-[#F1A7C1]/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F1A7C1] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F1A7C1]"></span>
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#F1A7C1] block">
                  Active Momentum
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Currently Learning & 2026 Target Pipeline
                </h3>
              </div>
            </div>

            <span className="text-xs text-[#F1A7C1]/90 bg-white/10 px-3 py-1.5 rounded-full font-mono border border-white/10 self-start md:self-auto">
              2026 Target Pipeline
            </span>
          </div>

          {/* Roadmap Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ROADMAP_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 p-3.5 rounded-2xl border border-white/10 shadow-xs"
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#F1A7C1]">
                    {item.code}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/20 text-white/90">
                    {item.status}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-white leading-tight mb-1 line-clamp-1">
                  {item.title}
                </h4>

                {item.issuer && (
                  <p className="text-[10px] text-white/70 mb-2 truncate">
                    {item.issuer}
                  </p>
                )}

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F1A7C1] rounded-full transition-all duration-700"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>
                <div className="text-[10px] text-white/70 mt-1">
                  <span>{item.progressPercent}% completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(['All', 'AI & ML', 'Development', 'Cloud & Systems'] as const).map((cat) => (
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

        {/* Completed Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {getFilteredCerts().map((cert) => (
            <div
              key={cert.id}
              className="bg-[#FAF4EC] dark:bg-[#1A1417] p-5 rounded-2xl border border-[#E5DACF] dark:border-[#33232A] hover:border-[#7A1B2E]/50 dark:hover:border-[#F1A7C1]/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 flex items-center justify-center text-[#7A1B2E] dark:text-[#F1A7C1]">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/15 text-[#7A1B2E] dark:text-[#F1A7C1]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#1F191B] dark:text-white mb-1 leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs font-medium text-[#7A1B2E] dark:text-[#F1A7C1] mb-2">
                  {cert.issuer}
                </p>
                <p className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] leading-relaxed mb-4 line-clamp-3">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5DACF] dark:border-[#33232A] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#5C5055] dark:text-[#BDB0B6]">
                  {cert.date}
                </span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {cert.skills.slice(0, 2).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded-md text-[9px] bg-[#FAF5EE] dark:bg-[#231B1F] text-[#5C5055] dark:text-[#BDB0B6]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox for Honour Certificate */}
      {selectedHonourImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedHonourImg(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-[#FAF4EC] dark:bg-[#1A1417] rounded-3xl overflow-hidden p-4 sm:p-6 shadow-2xl border border-[#E5DACF] dark:border-[#382229]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DACF] dark:border-[#382229]">
              <div>
                <h4 className="text-base font-bold text-[#1F191B] dark:text-[#F1A7C1]">
                  {selectedHonourImg.title}
                </h4>
                <p className="text-xs text-[#5C5055] dark:text-[#BDB0B6]">
                  {selectedHonourImg.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedHonourImg(null)}
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[#1F191B] dark:text-white hover:bg-[#7A1B2E] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-2xl flex items-center justify-center bg-black/5 dark:bg-black/40">
              <img
                src={selectedHonourImg.src}
                alt={selectedHonourImg.title}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
