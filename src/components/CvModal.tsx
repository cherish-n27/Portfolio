import { useState } from 'react';
import { X, Printer, Download, Copy, Check, ExternalLink, MapPin, Mail, Phone, Globe, GraduationCap, Award, Briefcase, Upload } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage?: string;
}

export default function CvModal({ isOpen, onClose, profileImage }: CvModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const cvText = `
CHERISH NWACHUKWU
Cape Town, South Africa | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

SUMMARY:
Detail-oriented and adaptable IT graduate currently training as a Digital Associate (Software Development Trainee) on CAPACITI's Demand Academy programme, building on a Bachelor of Information Technology in Business Systems (NQF Level 7, Distinction) and Google AI Essentials certification. Combines growing technical skills in software development, SQL, and applied AI/prompt engineering with strong leadership and customer service experience gained as a Tutor, Team Leader, and Brand Ambassador. Proven ability to manage teams, oversee operations, and resolve issues efficiently.

WORK EXPERIENCE:
1. Digital Associate: Software Development Trainee
CAPACITI Demand Academy | Cape Town (08/2026 – Present)
- Selected for CAPACITI's Demand Academy programme; enrolled in Software Development stream.
- Developing practical experience in software development fundamentals, prompt engineering, and Agile/Scrum delivery.

2. Academic Tutor: Quantitative Thinking & Business Analysis
IIE Rosebank International | Cape Town (09/2025 – 05/2026)
- Provided academic tutoring to students in Quantitative Thinking and Techniques and Business Analysis.
- Delivered clear, structured guidance adapting communication style to meet individual learning needs.

3. Brand Ambassador & Team Leader
IIE Rosebank College | Cape Town (01/2026 – 03/2026)
- Spearheaded campus operations during student registration cycle, directing an onboarding team.

4. Team Leader / Supervisor (Festive Period)
Cape Crafts | Cape Town (11/2025 – 12/2025)
- Supervised cashiers, handled customer escalations, and directed cash-ups with accuracy.

EDUCATION:
IIE Rosebank College | Cape Town (2023 – 2025)
Bachelor of Information Technology, Business Systems (NQF Level 7) — Graduated with Distinction
- Golden Key International Honour Society Member
- Deputy President of the Student Representative Council (2025)
- General Secretary of the Student Representative Council (2024)

CERTIFICATIONS:
- Google AI Essentials (Coursera, July 2026)
- Certificate in Full Stack Development (FNB App Academy – ITVarsity, 2025)
- Introduction to Microsoft 365 Core Services and Admin Controls (Microsoft Learn Badge, June 2026)
- AI for Everyone (Coursera, August 2026)
- Generative AI with Large Language Models (Coursera, August 2026)
- Python for Data Science, AI & Development (Coursera, August 2026)
- Supervised Machine Learning: Regression and Classification (Coursera, August 2026)
- Introduction to Artificial Intelligence (Coursera, August 2026)

CORE SKILLS:
SQL, Python, HTML/CSS, JavaScript, Prompt Engineering, Applied AI, Quantitative Analysis, Business Analysis, Agile/Scrum, Git/GitHub, Microsoft 365.
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white text-zinc-900 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-[#7A1B2E] text-white border-b border-[#631424]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-wide">Cherish Nwachukwu — Official Curriculum Vitae</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F1A7C1] text-[#7A1B2E]">
              PDF Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#7A1B2E] hover:bg-[#F1A7C1] transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white hover:bg-white/25 transition-colors cursor-pointer"
              title="Copy ATS Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#F1A7C1]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close CV modal"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document View */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-white font-sans text-[#211C1E] selection:bg-[#F1A7C1] selection:text-[#7A1B2E]">
          {/* Resume Header */}
          <div className="border-b-2 border-[#7A1B2E] pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#7A1B2E] uppercase mb-1">
                CHERISH NWACHUKWU
              </h1>
              <p className="text-sm font-bold text-zinc-700 uppercase tracking-wide mb-3">
                Digital Associate — Software Development Trainee
              </p>

              <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-zinc-600">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#7A1B2E]" /> Cape Town, South Africa
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#7A1B2E]" /> {PERSONAL_INFO.phone}
                </span>
                <span className="flex items-center gap-1 font-medium font-mono">
                  <Mail className="w-3.5 h-3.5 text-[#7A1B2E]" /> {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Globe className="w-3.5 h-3.5 text-[#7A1B2E]" /> linkedin.com/in/cherishnwachukwu-ab16a6290
                </span>
              </div>
            </div>

            <div className="shrink-0 self-start sm:self-center">
              {profileImage && profileImage.trim() !== '' ? (
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-[#7A1B2E] shadow-sm">
                  <img
                    src={profileImage}
                    alt="Cherish Nwachukwu"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ) : (
                <div
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center p-2 border-2 border-dashed border-[#7A1B2E]/50 bg-[#FAF4EC] text-center"
                  title="Upload: Profile Picture"
                >
                  <Upload className="w-4 h-4 text-[#7A1B2E] mb-0.5" />
                  <span className="text-[9px] font-bold text-[#7A1B2E] leading-tight">
                    Upload: Profile
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] border-b border-zinc-200 pb-1 mb-2.5">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
              Detail-oriented and adaptable IT graduate currently training as a Digital Associate (Software Development Trainee) on CAPACITI's Demand Academy programme, building on a Bachelor of Information Technology in Business Systems (NQF Level 7, Distinction) and Google AI Essentials certification. Combines growing technical skills in software development, SQL, and applied AI/prompt engineering with strong leadership and customer service experience gained as a Tutor, Team Leader, and Brand Ambassador. Proven ability to manage teams, oversee operations, and resolve issues efficiently, with a clear focus on bridging technical and business skills.
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] border-b border-zinc-200 pb-1 mb-3">
              Work Experience
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-zinc-900">
                    Digital Associate: Software Development Trainee
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 font-medium">08/2026 – Present</span>
                </div>
                <div className="flex justify-between text-xs text-[#7A1B2E] font-semibold mb-1.5">
                  <span>CAPACITI Demand Academy</span>
                  <span>Cape Town</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700 leading-snug">
                  <li>Selected for CAPACITI's Demand Academy programme; enrolled in the Software Development stream to build professional, industry-ready coding and technical delivery skills.</li>
                  <li>Developing practical experience in software development fundamentals, AI prompt engineering, and Agile/Scrum delivery.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-zinc-900">
                    Tutor — Quantitative Thinking & Business Analysis
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 font-medium">09/2025 – 05/2026</span>
                </div>
                <div className="flex justify-between text-xs text-[#7A1B2E] font-semibold mb-1.5">
                  <span>IIE Rosebank International</span>
                  <span>Cape Town</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700 leading-snug">
                  <li>Provided academic tutoring to students in Quantitative Thinking and Techniques, supporting comprehension of core mathematical and analytical concepts.</li>
                  <li>Tutored Business Analysis, assisting with the application of analytical frameworks and problem-solving methodologies.</li>
                  <li>Delivered clear, structured guidance to students of varying ability levels, adapting communication style to meet individual learning needs.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-zinc-900">
                    Brand Ambassador & Team Leader
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 font-medium">01/2026 – 03/2026</span>
                </div>
                <div className="flex justify-between text-xs text-[#7A1B2E] font-semibold mb-1.5">
                  <span>IIE Rosebank College</span>
                  <span>Cape Town</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700 leading-snug">
                  <li>Spearheaded campus operations during student registration cycles, directing a team to ensure efficient student onboarding.</li>
                  <li>Facilitated marketing activations and distributed promotional materials to prospective students.</li>
                  <li>Contributed to the coordination of orientation events, enhancing the new student experience.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-zinc-900">
                    Team Leader / Supervisor (Festive Period)
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 font-medium">11/2025 – 12/2025</span>
                </div>
                <div className="flex justify-between text-xs text-[#7A1B2E] font-semibold mb-1.5">
                  <span>Cape Crafts</span>
                  <span>Cape Town</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700 leading-snug">
                  <li>Supervised cashiers and managed daily store operations during a high-volume retail period.</li>
                  <li>Oversaw point-of-sale transactions, professionally resolving customer inquiries and escalations.</li>
                  <li>Directed opening and closing procedures, batched tills, and completed daily cash-ups with accuracy.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Governance */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] border-b border-zinc-200 pb-1 mb-3">
              Education & Institutional Leadership
            </h2>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-zinc-900">
                  Bachelor of Information Technology, Business Systems (NQF Level 7)
                </h3>
                <span className="text-xs font-mono text-zinc-500 font-medium">2023 – 2025</span>
              </div>
              <div className="flex justify-between text-xs text-[#7A1B2E] font-semibold mb-1.5">
                <span>IIE Rosebank College • Graduated with Distinction</span>
                <span>Cape Town</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-700 leading-snug">
                <li><strong>Core focus areas:</strong> IT Project Management, Business Analysis, Databases, Enterprise Resource Planning (ERP), Information Systems Strategy, IT Risk Management, Business Decision Modelling, Human-Computer Interaction (HCI), Work Integrated Learning.</li>
                <li><strong>Golden Key International Honour Society:</strong> Inducted member (top 15% academic standing).</li>
                <li><strong>Deputy President</strong> of the Student Representative Council (SRC) of 2025.</li>
                <li><strong>General Secretary</strong> of the Student Representative Council (SRC) of 2024.</li>
              </ul>
            </div>
          </div>

          {/* Certifications Grid in CV */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] border-b border-zinc-200 pb-1 mb-3">
              Certificates & Verified Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
              <div>• <strong>Certificate in Full Stack Development:</strong> FNB App Academy – ITVarsity (2025)</div>
              <div>• <strong>Microsoft 365 Core Services & Admin Controls:</strong> Microsoft Learn Badge (June 2026)</div>
              <div>• <strong>Google AI Essentials:</strong> Coursera (July 2026)</div>
              <div>• <strong>AI for Everyone:</strong> DeepLearning.AI Coursera (August 2026)</div>
              <div>• <strong>Generative AI with Large Language Models:</strong> AWS / Coursera (August 2026)</div>
              <div>• <strong>Python for Data Science, AI & Development:</strong> IBM Coursera (August 2026)</div>
              <div>• <strong>Supervised Machine Learning: Regression & Classification:</strong> Stanford / Coursera (August 2026)</div>
              <div>• <strong>Introduction to Artificial Intelligence:</strong> IBM Coursera (August 2026)</div>
            </div>
          </div>

          {/* Technical Skills List */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7A1B2E] border-b border-zinc-200 pb-1 mb-2.5">
              Technical & Core Competencies
            </h2>
            <p className="text-xs text-zinc-700 leading-relaxed">
              <strong>Technical:</strong> SQL, HTML5, CSS3, JavaScript, Python, Prompt Engineering, Applied AI, REST APIs, VADER & Transformer NLP pipelines, Microsoft 365 Suite & Tenant Administration, Database Architecture.
              <br />
              <strong>Methodologies & Governance:</strong> Scrum/Agile, IT Project Management, Business Process Modelling, Quantitative Reasoning, Conflict Resolution, Team Leadership, Academic Mentoring.
            </p>
          </div>
        </div>

        {/* Modal Bottom Print CTA */}
        <div className="no-print p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Click 'Print / Save PDF' to generate an official PDF file directly.
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-[#7A1B2E] text-white hover:bg-[#631424] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#F1A7C1]" />
              <span>Download / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-zinc-600 hover:text-zinc-900 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
