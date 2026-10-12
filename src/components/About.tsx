import { GraduationCap, Briefcase, BookOpen, Users, Code, ArrowRight } from 'lucide-react';
import FlowerMotif from './FlowerMotif';
import ProfileAvatar from './ProfileAvatar';
import { PERSONAL_INFO } from '../data/portfolioData';
import { profilePhoto, work1, leadership1 } from '../assets';

interface AboutProps {
  onOpenCvModal: () => void;
  onOpenPhotoModal?: () => void;
  profileImage?: string;
}

export default function About({ onOpenCvModal, onOpenPhotoModal, profileImage = "profile-photo.jpeg" }: AboutProps) {
  const pillars = [
    {
      icon: Code,
      title: 'Software Development & AI',
      description: 'Currently advancing in the CAPACITI Demand Academy, engineering responsive web interfaces, prompt-driven AI workflows (Claude, Lovable), and full-stack software practices.',
    },
    {
      icon: BookOpen,
      title: 'Business Systems & Analytics',
      description: 'Bachelor of IT with Distinction in Business Systems. Experienced in relational SQL databases, quantitative analysis, business decision modelling, and ERP systems strategy.',
    },
    {
      icon: Users,
      title: 'Human-Centered Leadership',
      description: 'Former SRC Deputy President and General Secretary. Seasoned in campus-wide governance, conflict mediation, public speaking, and peer academic mentorship.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute -top-16 -right-16 opacity-30 dark:opacity-10 pointer-events-none">
        <FlowerMotif size={240} petalColor="#F1A7C1" centerColor="#7A1B2E" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>About Cherish</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Where Technology Meets Systems Strategy & Leadership
          </h2>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        {/* Narrative & Stats Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Main Narrative */}
          <div className="lg:col-span-7 bg-[#FAF4EC] dark:bg-[#1A1417] p-7 sm:p-9 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 pb-5 border-b border-[#E5DACF] dark:border-[#33232A]">
              <ProfileAvatar
                size="md"
                showStatusDot={true}
                interactive={true}
                imageSrc={"profile-photo.jpeg"}
                onClick={onOpenPhotoModal}
                className="shrink-0 cursor-pointer"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F191B] dark:text-white leading-tight">
                  Building the Future of Digital & Business Systems
                </h3>
                <span className="text-xs font-semibold text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center gap-1.5 mt-0.5">
                  <span>Cherish Nwachukwu</span>
                  <span>•</span>
                  <span>Cape Town, South Africa</span>
                </span>
              </div>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base text-[#5C5055] dark:text-[#E2D8DE] leading-relaxed">
              <p>
                Hello! I am <strong className="text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">Cherish Nwachukwu</strong>, an IT graduate and Digital Associate based in Cape Town. I graduated with <strong className="text-[#1F191B] dark:text-white font-semibold">Distinction</strong> in Bachelor of Information Technology in Business Systems (NQF Level 7) from IIE Rosebank College and was inducted into the <strong className="text-[#1F191B] dark:text-white font-semibold">Golden Key International Honour Society</strong>.
              </p>
              
              <p>
                Currently, I am expanding my technical craft as a <strong className="text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">Software Development Trainee</strong> in the highly competitive <strong className="text-[#1F191B] dark:text-white font-semibold">CAPACITI Demand Academy</strong>. Here, I build real-world software prototypes, engineer prompt pipelines using tools like Claude and Lovable, and collaborate across Agile/Scrum sprints.
              </p>

              <p>
                Alongside my development work, I serve as an <strong className="text-[#1F191B] dark:text-white font-semibold">Academic Tutor at IIE Rosebank International</strong>, mentoring undergraduate students in <em>Quantitative Thinking & Techniques</em> and <em>Business Analysis</em>. Breaking down complex analytical algorithms and business frameworks into intuitive lessons has sharpened my technical communication and empathy.
              </p>

              <p>
                Prior to entering software engineering, I served two terms in executive student leadership as <strong className="text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">General Secretary (2024)</strong> and <strong className="text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold">Deputy President (2025)</strong> of the Student Representative Council (SRC). This high-stakes governance background forged my ability to manage stakeholder expectations, lead under pressure, and unite diverse teams around shared goals.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E5DACF] dark:border-[#33232A] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A1B2E] dark:text-[#F1A7C1]">
                <GraduationCap className="w-4 h-4" />
                <span>IIE Rosebank College • Class of 2025</span>
              </div>
              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1B2E] dark:text-[#F1A7C1] hover:underline cursor-pointer"
              >
                <span>Read Full Academic Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Key Metric Badges */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF4EC] dark:bg-[#1A1417] p-5 rounded-2xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs hover:border-[#7A1B2E]/40 dark:hover:border-[#F1A7C1]/40 transition-colors"
                >
                  <span className="text-[11px] font-bold text-[#7A1B2E] dark:text-[#F1A7C1] uppercase tracking-wider block mb-1">
                    {stat.label}
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-[#1F191B] dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <span className="text-xs text-[#5C5055] dark:text-[#BDB0B6]">
                    {stat.highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Trainee Spotlight Card with Statically Imported Real Badge Image */}
            <div className="bg-[#7A1B2E] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-[#F1A7C1] shadow-md">
                <img
                  src={work1}
                  alt="Cherish Nwachukwu at CAPACITI Demand Academy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#F1A7C1] mb-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Current Training Stream</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  CAPACITI Demand Academy
                </h4>
                <p className="text-xs text-white/90 leading-relaxed mb-3">
                  Software development associate stream: responsive interfaces, prompt pipelines, and Agile/Scrum engineering.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#F1A7C1]">
                    Prompt Engineering
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#F1A7C1]">
                    Full-Stack
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#F1A7C1]">
                    Agile Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Core Competency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF4EC] dark:bg-[#1A1417] p-6 rounded-2xl border border-[#E5DACF] dark:border-[#33232A] hover:border-[#7A1B2E]/50 dark:hover:border-[#F1A7C1]/50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 flex items-center justify-center text-[#7A1B2E] dark:text-[#F1A7C1] mb-4 group-hover:bg-[#7A1B2E] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#1F191B] dark:text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5055] dark:text-[#BDB0B6] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
