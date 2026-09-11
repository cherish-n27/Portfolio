import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, Check, Copy, Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const quickSubjects = [
    'Junior Software Developer Opportunity',
    'Data & Systems Trainee Role',
    'CAPACITI / Tech Collaboration',
    'Academic Tutoring / Mentorship',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate reliable transmission with client fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF4EC]/60 dark:bg-[#150F13]/60 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] mb-3">
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F191B] dark:text-[#F1A7C1]">
            Let's Connect & Collaborate
          </h2>
          <p className="text-sm sm:text-base text-[#5C5055] dark:text-[#BDB0B6] mt-3">
            Open to software development trainee opportunities, junior tech roles, data-driven projects, and academic collaboration.
          </p>
          <div className="w-12 h-1 bg-[#7A1B2E] dark:bg-[#F1A7C1] rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Email Card */}
            <div className="bg-[#FAF4EC] dark:bg-[#1A1417] p-6 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#7A1B2E] text-[#F1A7C1] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1F191B] dark:text-white">Email Address</h3>
                  <span className="text-xs text-[#5C5055] dark:text-[#BDB0B6]">Direct inbox</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229]">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-xs sm:text-sm text-[#7A1B2E] dark:text-[#F1A7C1] font-semibold hover:underline truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="shrink-0 p-1.5 rounded-lg text-[#5C5055] dark:text-[#BDB0B6] hover:text-[#7A1B2E] dark:hover:text-[#F1A7C1] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & Availability Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF4EC] dark:bg-[#1A1417] p-5 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center justify-center mb-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-1">
                  Location
                </h4>
                <p className="text-sm font-semibold text-[#1F191B] dark:text-white">
                  {PERSONAL_INFO.location}
                </p>
                <span className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6]">Open to hybrid & remote</span>
              </div>

              <div className="bg-[#FAF4EC] dark:bg-[#1A1417] p-5 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#7A1B2E]/10 dark:bg-[#F1A7C1]/10 text-[#7A1B2E] dark:text-[#F1A7C1] flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-1">
                  Availability
                </h4>
                <p className="text-sm font-semibold text-[#1F191B] dark:text-white">
                  Immediate / Open to Roles
                </p>
                <span className="text-[11px] text-[#5C5055] dark:text-[#BDB0B6] block">Full-time & Graduate Programs</span>
              </div>
            </div>

            {/* Social Profile Links Card */}
            <div className="bg-[#FAF4EC] dark:bg-[#1A1417] p-5 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-3">
                Professional Networks
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  id="contact-linkedin-link"
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                    <span className="text-xs font-semibold text-[#1F191B] dark:text-white">
                      LinkedIn Profile
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#5C5055] dark:text-[#BDB0B6]">
                    /in/cherishnwachukwu
                  </span>
                </a>

                <a
                  id="contact-github-link"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] hover:border-[#7A1B2E] dark:hover:border-[#F1A7C1] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                    <span className="text-xs font-semibold text-[#1F191B] dark:text-white">
                      GitHub Repositories
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#5C5055] dark:text-[#BDB0B6]">
                    @cherish-n27
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF4EC] dark:bg-[#1A1417] p-7 sm:p-9 rounded-3xl border border-[#E5DACF] dark:border-[#33232A] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#7A1B2E] text-[#F1A7C1] mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F191B] dark:text-white">
                  Message Prepared!
                </h3>
                <p className="text-sm text-[#5C5055] dark:text-[#BDB0B6] max-w-md mx-auto">
                  Thank you, <strong className="text-[#1F191B] dark:text-white">{formData.name}</strong>. Cherish will review your inquiry shortly. You can also send this directly via your default email client:
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#7A1B2E] text-white hover:bg-[#631424] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#F1A7C1]" />
                    <span>Open in Email App</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="text-xs text-[#7A1B2E] dark:text-[#F1A7C1] underline block mx-auto pt-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[#7A1B2E] dark:text-[#F1A7C1]" />
                  <h3 className="text-lg font-bold text-[#1F191B] dark:text-white">
                    Send a Message
                  </h3>
                </div>

                {/* Quick Subject Pill Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-2">
                    Inquiry Topic
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {quickSubjects.map((subj, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, subject: subj })}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                          formData.subject === subj
                            ? 'bg-[#7A1B2E] text-white'
                            : 'bg-[#FAF5EE] dark:bg-[#231B1F] text-[#5C5055] dark:text-[#BDB0B6] border border-[#E5DACF] dark:border-[#382229] hover:border-[#7A1B2E]'
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] text-[#1F191B] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1B2E] dark:focus:ring-[#F1A7C1]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] text-[#1F191B] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1B2E] dark:focus:ring-[#F1A7C1]"
                    />
                  </div>
                </div>

                {/* Custom Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] text-[#1F191B] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1B2E] dark:focus:ring-[#F1A7C1]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#5C5055] dark:text-[#BDB0B6] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Cherish, we would love to speak with you regarding a software development trainee role..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5EE] dark:bg-[#231B1F] border border-[#E5DACF] dark:border-[#382229] text-[#1F191B] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1B2E] dark:focus:ring-[#F1A7C1] resize-y"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#7A1B2E] hover:bg-[#631424] text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#F1A7C1]" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
