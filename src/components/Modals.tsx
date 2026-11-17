'use client';

import { useState, type FormEvent } from 'react';
import { X, CheckCircle2, MapPin, Phone, Play, Pause } from 'lucide-react';
import {
  INSIGHTS_DATA,
  OFFICE_LOCATIONS,
  SOLUTIONS_TRACKS,
  VIDEO_POSTER_IMAGE,
  type InsightArticle,
} from '../data/operateServicesData';
import {
  formatHourlyRange,
  validateApplicationForm,
  validateSolutionsInquiry,
  type JobPosting,
} from '../utils/jobs';

interface JobApplicationModalProps {
  job: JobPosting | null;
  onClose: () => void;
  onSubmitted: (jobId: string) => void;
}

export function JobApplicationModal({
  job,
  onClose,
  onSubmitted,
}: JobApplicationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateApplicationForm({
      fullName,
      email,
      phone,
      experienceYears,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    onSubmitted(job.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-5 bg-[#001C36] text-white flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F09200]">
              {job.category} · {formatHourlyRange(job.hourlyMin, job.hourlyMax)}
            </p>
            <h2 id="apply-modal-title" className="mt-1 text-xl font-bold leading-snug">
              {job.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {job.location} · {job.shift}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close application dialog"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="mt-4 text-xl font-bold text-[#001C36]">
                Application Received
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Thank you, <span className="font-semibold text-[#001C36]">{fullName}</span>. An OperateServices recruiter in{' '}
                <span className="font-semibold text-[#001C36]">{job.location}</span> will reach out regarding{' '}
                <span className="font-semibold">{job.title}</span> within 1 business day.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#001C36] text-white text-sm font-semibold hover:bg-[#00558C] cursor-pointer"
              >
                Return to Job Search
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Role Requirements
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {job.requirements.map((req) => (
                    <li key={req}>· {req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <label htmlFor="app-full-name" className="block text-sm font-semibold text-[#001C36] mb-1">
                  Full Name
                </label>
                <input
                  id="app-full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jordan Vance"
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="app-email" className="block text-sm font-semibold text-[#001C36] mb-1">
                  Email Address
                </label>
                <input
                  id="app-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan.vance@example.com"
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="app-phone" className="block text-sm font-semibold text-[#001C36] mb-1">
                  Phone Number
                </label>
                <input
                  id="app-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(614) 555-0192"
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="app-exp" className="block text-sm font-semibold text-[#001C36] mb-1">
                  Relevant Experience
                </label>
                <select
                  id="app-exp"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00558C]"
                >
                  <option value="">Select years of experience</option>
                  <option value="1-2 years">1–2 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
                {errors.experienceYears && (
                  <p className="mt-1 text-xs text-red-600">{errors.experienceYears}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#F09200] hover:bg-[#D98200] text-[#001C36] text-sm font-bold cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface SolutionsInquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export function SolutionsInquiryModal({ open, onClose }: SolutionsInquiryModalProps) {
  const [selectedTrack, setSelectedTrack] = useState(SOLUTIONS_TRACKS[0].title);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [headcount, setHeadcount] = useState('10–25');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateSolutionsInquiry({
      companyName,
      contactName,
      workEmail,
      phone,
      serviceTrack: selectedTrack,
      headcount,
      notes,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="solutions-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-5 bg-[#001C36] text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F09200]">
              OperateServices Business Solutions
            </p>
            <h2 id="solutions-modal-title" className="text-xl font-bold mt-0.5">
              Request a Workforce Consultation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close solutions dialog"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="mt-4 text-2xl font-bold text-[#001C36]">
                Consultation Scheduled
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Our <span className="font-semibold text-[#001C36]">{selectedTrack}</span> account lead has received your inquiry for{' '}
                <span className="font-semibold text-[#001C36]">{companyName}</span> and will follow up at{' '}
                <span className="font-semibold">{workEmail}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#001C36] text-white text-sm font-semibold hover:bg-[#00558C] cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00558C]">
                  Select Service Track
                </p>
                {SOLUTIONS_TRACKS.map((track) => {
                  const active = selectedTrack === track.title;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setSelectedTrack(track.title)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        active
                          ? 'border-[#001C36] bg-[#001C36] text-white'
                          : 'border-slate-200 bg-white hover:border-[#00558C] text-[#081C31]'
                      }`}
                    >
                      <p className={`text-xs font-bold ${active ? 'text-[#F09200]' : 'text-[#00558C]'}`}>
                        {track.number}. {track.title}
                      </p>
                      <p className={`mt-1 text-xs leading-relaxed ${active ? 'text-slate-200' : 'text-slate-600'}`}>
                        {track.metrics}
                      </p>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="md:col-span-7 space-y-3.5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="sol-company" className="block text-xs font-semibold text-[#001C36] mb-1">
                      Company Name
                    </label>
                    <input
                      id="sol-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Midwest Manufacturing Co."
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="sol-contact" className="block text-xs font-semibold text-[#001C36] mb-1">
                      Your Name
                    </label>
                    <input
                      id="sol-contact"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Elena Rostova"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-xs text-red-600">{errors.contactName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="sol-email" className="block text-xs font-semibold text-[#001C36] mb-1">
                      Work Email
                    </label>
                    <input
                      id="sol-email"
                      type="email"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                    />
                    {errors.workEmail && (
                      <p className="mt-1 text-xs text-red-600">{errors.workEmail}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="sol-phone" className="block text-xs font-semibold text-[#001C36] mb-1">
                      Business Phone
                    </label>
                    <input
                      id="sol-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(312) 555-0148"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="sol-headcount" className="block text-xs font-semibold text-[#001C36] mb-1">
                    Estimated Workforce Need
                  </label>
                  <select
                    id="sol-headcount"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#00558C]"
                  >
                    <option value="1–9">1–9 specialists</option>
                    <option value="10–25">10–25 specialists</option>
                    <option value="25–50">25–50 specialists</option>
                    <option value="50+">50+ managed team</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sol-notes" className="block text-xs font-semibold text-[#001C36] mb-1">
                    Operational Scope &amp; Timeline
                  </label>
                  <textarea
                    id="sol-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share shift requirements, trade certifications, or target start date..."
                    className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#00558C]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#F09200] hover:bg-[#D98200] text-[#001C36] text-sm font-bold cursor-pointer"
                  >
                    Request Consultation
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface InsightReaderModalProps {
  article: InsightArticle | null;
  onSelectArticle: (article: InsightArticle) => void;
  onClose: () => void;
}

export function InsightReaderModal({
  article,
  onSelectArticle,
  onClose,
}: InsightReaderModalProps) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="insight-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00558C]">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h2 id="insight-modal-title" className="mt-1.5 text-2xl font-bold text-[#001C36] leading-snug">
              {article.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close insight reader"
            className="p-2 rounded-lg text-slate-500 hover:text-[#001C36] hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-[#F4F5F7] rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2.5">
              Key Findings
            </p>
            <ul className="space-y-2 text-sm text-[#081C31]">
              {article.takeaways.map((point) => (
                <li key={point}>· {point}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-base text-slate-700 leading-relaxed">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              More OperateServices Insights
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {INSIGHTS_DATA.filter((item) => item.id !== article.id).map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => onSelectArticle(other)}
                  className="text-left p-3 rounded-lg border border-slate-200 hover:border-[#00558C] transition-colors cursor-pointer"
                >
                  <span className="text-[11px] font-semibold text-[#00558C]">{other.date}</span>
                  <p className="text-xs font-bold text-[#001C36] mt-0.5 line-clamp-2">
                    {other.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export function VideoShowcaseModal({ open, onClose }: VideoModalProps) {
  const [playing, setPlaying] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="bg-[#001C36] rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden text-white">
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <h2 id="video-modal-title" className="text-base font-bold">
            RISE: OperateServices — Staffing &amp; Services Story
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={VIDEO_POSTER_IMAGE}
            alt="OperateServices RISE industrial workforce documentary"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
              playing ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#F09200]">
                40 Years of Workforce Leadership
              </p>
              <p className="mt-1 text-xl font-bold text-white">
                18,000+ Clients · 170,000+ Contractors Placed Annually
              </p>
              <p className="mt-1 text-sm text-slate-200 max-w-xl">
                Our recruiters work side-by-side with plant supervisors, operations leaders, and skilled tradespeople across 250+ North American markets.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F09200] text-[#001C36] text-xs font-bold shrink-0 cursor-pointer"
            >
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{playing ? 'Pause Reel' : 'Resume Reel'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoModalProps {
  mode: 'locations' | 'about' | string | null;
  onClose: () => void;
  onExploreSolutions: () => void;
}

export function InfoDrawerModal({ mode, onClose, onExploreSolutions }: InfoModalProps) {
  const [regionFilter, setRegionFilter] = useState('All');

  if (!mode) return null;

  if (mode === 'locations') {
    const filteredLocations =
      regionFilter === 'All'
        ? OFFICE_LOCATIONS
        : OFFICE_LOCATIONS.filter((l) => l.region === regionFilter);

    return (
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="locations-modal-title"
      >
        <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="px-6 py-5 bg-[#001C36] text-white flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#F09200]">
                North America Network
              </p>
              <h2 id="locations-modal-title" className="text-xl font-bold mt-0.5">
                OperateServices Regional Offices
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close locations dialog"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-5">
            <div className="flex flex-wrap gap-2">
              {['All', 'Mid-Atlantic', 'Midwest', 'South Central', 'Southeast', 'Southwest', 'Pacific Northwest'].map(
                (region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setRegionFilter(region)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      regionFilter === region
                        ? 'bg-[#001C36] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {region}
                  </button>
                )
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="rounded-xl border border-slate-200 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#001C36]">
                      {loc.city}, {loc.state}
                    </h3>
                    <span className="text-xs font-medium text-[#00558C]">{loc.region}</span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{loc.address}</span>
                  </p>
                  <p className="text-xs font-semibold text-[#001C36] flex items-center gap-1.5 tabular-nums">
                    <Phone className="w-3.5 h-3.5 text-[#F09200] shrink-0" />
                    <span>{loc.phone}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1">
                    {loc.specialties.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl sm:max-w-3xl w-full shadow-2xl overflow-hidden">
        <div className="px-6 py-5 bg-[#001C36] text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#F09200]">
              OperateServices Information
            </p>
            <h2 id="info-modal-title" className="text-xl font-bold mt-0.5">
              {mode === 'about' ? 'About OperateServices Staffing & Services' : mode}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close information dialog"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-slate-600 leading-relaxed">
          {mode === 'about' ? (
            <>
              <p>
                Founded more than 40 years ago, OperateServices is a leading North American recruiting, staffing, and services partner specializing in manufacturing, skilled trades, distribution, logistics, and industrial engineering.
              </p>
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#001C36] tabular-nums">18,000+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Clients Served</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#001C36] tabular-nums">170,000+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Contractors Annually</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#001C36] tabular-nums">250+</p>
                  <p className="text-xs text-slate-500 mt-0.5">Regional Offices</p>
                </div>
              </div>
              <p>
                Our people-first recruiting model pairs dedicated local market specialists with rigorous hands-on skill verification to keep vital operations moving safely and on schedule.
              </p>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreSolutions();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#F09200] text-[#001C36] text-sm font-bold hover:bg-[#D98200] cursor-pointer"
                >
                  Partner With OperateServices
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                OperateServices maintains strict workplace safety, equal opportunity employment, data privacy, and statutory labor compliance across all U.S. and Canadian operations.
              </p>
              <p>
                For contractor payroll, benefits verification, or compliance inquiries related to <span className="font-semibold text-[#001C36]">{mode}</span>, contact our national support desk at <span className="font-semibold text-[#001C36] tabular-nums">(888) 237-6835</span> or reach your local OperateServices recruiting office.
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#001C36] text-white text-sm font-semibold hover:bg-[#00558C] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
