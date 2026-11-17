'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2, MapPin, Search, UserCheck } from 'lucide-react';
import { getDetailContent } from '@/data/solutionsData';

interface SubPageViewsProps {
  pageId: string;
  onBackToSolutions: () => void;
  onGoToContact: () => void;
  onNavigate: (pageId: string) => void;
}

const SAMPLE_JOBS = [
  {
    id: 'j1',
    title: 'Industrial Maintenance Technician — 2nd Shift',
    location: 'Columbus, OH',
    category: 'Skilled Trades',
    pay: '$31–$36/hr',
  },
  {
    id: 'j2',
    title: 'CNC Machinist (Setup & Operate)',
    location: 'Charlotte, NC',
    category: 'Manufacturing',
    pay: '$28–$34/hr',
  },
  {
    id: 'j3',
    title: 'Commercial Construction Site Coordinator',
    location: 'Dallas, TX',
    category: 'Construction',
    pay: '$29–$35/hr',
  },
  {
    id: 'j4',
    title: 'Distribution Reach-Truck Forklift Operator',
    location: 'Indianapolis, IN',
    category: 'Distribution & Logistics',
    pay: '$22–$25/hr',
  },
  {
    id: 'j5',
    title: 'A&P Aviation Maintenance Mechanic',
    location: 'Savannah, GA',
    category: 'Aviation',
    pay: '$36–$44/hr',
  },
];

const OFFICE_LOCATIONS = [
  { city: 'Hanover, MD (Corporate HQ)', region: 'Northeast', phone: '(410) 579-4000' },
  { city: 'Chicago, IL', region: 'Midwest', phone: '(312) 555-0148' },
  { city: 'Dallas, TX', region: 'South', phone: '(214) 555-0193' },
  { city: 'Charlotte, NC', region: 'Southeast', phone: '(704) 555-0162' },
  { city: 'Phoenix, AZ', region: 'West', phone: '(602) 555-0184' },
  { city: 'Toronto, ON', region: 'Canada', phone: '(416) 555-0129' },
];

export function SubPageViews({
  pageId,
  onBackToSolutions,
  onGoToContact,
  onNavigate,
}: SubPageViewsProps) {
  const [jobQuery, setJobQuery] = useState('');
  const [jobCategory, setJobCategory] = useState('All');
  const [appliedJobId, setAppliedJobId] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState('All');
  const [contractorEmail, setContractorEmail] = useState('');
  const [contractorNotice, setContractorNotice] = useState<string | null>(null);

  if (pageId === 'search-jobs' || pageId === 'job-seeker') {
    const filteredJobs = SAMPLE_JOBS.filter((job) => {
      const matchesCat = jobCategory === 'All' || job.category === jobCategory;
      const matchesText =
        !jobQuery.trim() ||
        job.title.toLowerCase().includes(jobQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(jobQuery.toLowerCase());
      return matchesCat && matchesText;
    });

    return (
      <section className="bg-[#F7F8FA] min-h-[75vh] py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <button
            type="button"
            onClick={onBackToSolutions}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00558C] hover:text-[#001C36] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back to Solutions Portal</span>
          </button>

          <div className="mt-8 bg-[#001C36] text-white rounded-2xl p-8 sm:p-12 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7CC0F2]">
              {pageId === 'job-seeker' ? 'CAREER OPPORTUNITIES' : 'OPERATESERVICES JOB BOARD'}
            </p>
            <h1 className="mt-3 font-display text-[38px] sm:text-[50px] font-bold uppercase leading-tight">
              {pageId === 'job-seeker' ? "I'm a Job Seeker" : 'Search Open Industrial & Trades Jobs'}
            </h1>
            <p className="mt-3 text-slate-200 max-w-2xl text-[16px] leading-relaxed">
              Explore active contract, contract-to-hire, and direct placement openings across North
              America with OperateServices.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="Search by job title or city (e.g. CNC, Dallas)..."
                  aria-label="Search jobs by title or city"
                  className="w-full rounded-full bg-white text-[#081C31] pl-12 pr-5 py-3.5 text-sm font-medium focus:outline-2 focus:outline-[#F09200]"
                />
              </div>
              <select
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                aria-label="Filter jobs by trade category"
                className="rounded-full bg-white text-[#081C31] px-5 py-3.5 text-sm font-semibold focus:outline-2 focus:outline-[#F09200] cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Skilled Trades">Skilled Trades</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Construction">Construction</option>
                <option value="Distribution & Logistics">Distribution &amp; Logistics</option>
                <option value="Aviation">Aviation</option>
              </select>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-600 font-medium shadow-sm">
                No matching roles found. Try clearing your search query or selecting another trade category.
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="text-xs font-bold text-[#00558C] uppercase tracking-wider">
                      {job.category} &middot; <span className="text-emerald-700">{job.pay}</span>
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-[#081C31]">{job.title}</h2>
                    <p className="mt-2 text-sm text-slate-600 inline-flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{job.location}</span>
                    </p>
                  </div>
                  <div className="shrink-0">
                    {appliedJobId === job.id ? (
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        Interest Recorded
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAppliedJobId(job.id)}
                        className="px-6 py-3 rounded-full bg-[#F09200] hover:bg-[#d98300] text-[#001C36] text-sm font-bold transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                      >
                        Express Interest
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    );
  }

  if (pageId === 'locations') {
    const regions = ['All', 'Northeast', 'Midwest', 'South', 'Southeast', 'West', 'Canada'];
    const offices = OFFICE_LOCATIONS.filter(
      (o) => regionFilter === 'All' || o.region === regionFilter
    );

    return (
      <section className="bg-[#F7F8FA] min-h-[75vh] py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <button
            type="button"
            onClick={onBackToSolutions}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00558C] hover:text-[#001C36] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back to Solutions Portal</span>
          </button>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#00558C]">
              250+ NORTH AMERICAN OFFICES
            </p>
            <h1 className="mt-2 font-display text-[40px] sm:text-[52px] font-bold uppercase text-[#081C31]">
              OperateServices Locations
            </h1>
            <p className="mt-3 text-slate-600 max-w-2xl text-[16px] leading-relaxed">
              Connect with a local OperateServices recruiting and workforce services office near your plant,
              distribution hub, or jobsite.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {regions.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setRegionFilter(reg)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    regionFilter === reg
                      ? 'bg-[#001C36] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-[#081C31] hover:bg-slate-100'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[#00558C]">
                    {office.region}
                  </p>
                  <h2 className="text-xl font-bold text-[#081C31]">{office.city}</h2>
                  <p className="text-sm text-slate-600 font-medium tabular-nums">{office.phone}</p>
                  <button
                    type="button"
                    onClick={onGoToContact}
                    className="pt-2 inline-flex items-center gap-2 text-xs font-bold text-[#00558C] hover:text-[#001C36] cursor-pointer"
                  >
                    <span>Request Local Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (pageId === 'contractor-login') {
    return (
      <section className="bg-[#F7F8FA] min-h-[75vh] py-16 sm:py-24">
        <div className="max-w-[640px] mx-auto px-6">
          <button
            type="button"
            onClick={onBackToSolutions}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00558C] hover:text-[#001C36] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back to Solutions Portal</span>
          </button>

          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xl">
            <div className="flex items-center gap-3 text-[#081C31]">
              <div className="p-3 bg-sky-50 rounded-xl text-[#00558C]">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-display text-[28px] sm:text-[32px] font-bold uppercase">
                  Contractor Portal
                </h1>
                <p className="text-xs font-semibold text-[#00558C] uppercase tracking-wider">
                  OperateServices Workforce
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Access timesheets, benefits, W-2 tax documents, direct deposit preferences, and assignment details.
            </p>
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (!contractorEmail.includes('@')) {
                  setContractorNotice('Please enter a valid contractor email address.');
                  return;
                }
                setContractorNotice(
                  `Verification link prepared for ${contractorEmail}. Check your inbox to complete sign-in.`
                );
              }}
            >
              <div>
                <label htmlFor="contractor-email" className="block text-xs font-bold uppercase tracking-wider text-[#081C31] mb-2">
                  Contractor Email Address
                </label>
                <input
                  id="contractor-email"
                  type="email"
                  value={contractorEmail}
                  onChange={(e) => setContractorEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium focus:outline-2 focus:outline-[#F09200]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#F09200] hover:bg-[#d98300] text-[#001C36] font-bold text-sm transition-colors cursor-pointer shadow-md"
              >
                Continue to Contractor Login
              </button>
              {contractorNotice && (
                <p className="text-sm text-[#00558C] font-semibold pt-2 text-center bg-sky-50 p-3 rounded-lg border border-sky-100">
                  {contractorNotice}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Standard Solution / Industry / Insight / About Us detail view
  const detail = getDetailContent(pageId);

  return (
    <section className="bg-white">
      <div className="bg-[#001C36] text-white py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-300">
            <button
              type="button"
              onClick={onBackToSolutions}
              className="hover:text-[#F09200] underline underline-offset-4 cursor-pointer font-medium"
            >
              Solutions
            </button>
            <span aria-hidden="true">/</span>
            <span>{detail.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-white font-bold">{detail.title}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7CC0F2]">
            {detail.category}
          </p>
          <h1 className="mt-3 font-display text-[42px] sm:text-[56px] font-extrabold uppercase leading-none">
            {detail.title}
          </h1>
          <p className="mt-4 text-xl font-medium text-white/90 max-w-3xl">{detail.subtitle}</p>
          <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.75] text-slate-200 max-w-3xl">
            {detail.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onGoToContact}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#F09200] hover:bg-[#d98300] text-[#001C36] font-bold text-sm transition-colors cursor-pointer shadow-lg"
            >
              <span>Find Your Workforce Solution</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={onBackToSolutions}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Workforce Solutions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="bg-[#06294D] text-white py-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {detail.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-[40px] sm:text-[48px] font-bold text-[#F09200] tabular-nums">
                {m.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1 uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights & Capabilities */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#00558C]">
              OPERATIONAL EXECUTION
            </p>
            <h2 className="mt-2 font-display text-[32px] sm:text-[38px] font-bold text-[#081C31]">
              How OperateServices Delivers
            </h2>
          </div>
          <div className="space-y-5">
            {detail.highlights.map((h) => (
              <div key={h.title} className="border border-slate-200 rounded-xl p-6 sm:p-8 bg-[#F8FAFC] shadow-xs">
                <h3 className="text-[19px] font-bold text-[#081C31]">{h.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{h.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm sticky top-28">
            <div className="flex items-center gap-2.5 text-[#00558C] text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-5 h-5" />
              <span>Core Roles &amp; Capabilities</span>
            </div>
            <ul className="mt-6 divide-y divide-slate-100">
              {detail.rolesOrCapabilities.map((item) => (
                <li key={item} className="py-3.5 text-[15px] font-semibold text-[#081C31] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F09200]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('search-jobs')}
              className="mt-8 w-full py-3 rounded-full border-2 border-[#001C36] text-[#001C36] hover:bg-[#001C36] hover:text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Browse Related Openings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
