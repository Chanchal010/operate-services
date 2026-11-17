'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Bookmark,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { JOBS_DATA, SPECIALIZATIONS_DATA } from '@/data/careerPortalData';
import {
  ApplicationFormValues,
  EmploymentType,
  JobFilters,
  JobListing,
  ShiftType,
  SpecializationCategory,
} from '@/types/career';
import {
  filterJobs,
  formatJobPay,
  validateApplicationForm,
} from '@/utils/careerFilters';

const DEFAULT_FILTERS: JobFilters = {
  keyword: '',
  location: '',
  radiusMiles: 50,
  specialization: 'All',
  employmentType: 'All',
  shift: 'All',
  minHourlyPay: 0,
  savedOnly: false,
  sortBy: 'relevance',
};

const EMPLOYMENT_TYPES: Array<EmploymentType | 'All'> = [
  'All',
  'Contract',
  'Contract-to-Hire',
  'Direct Placement',
];

const SHIFTS: Array<ShiftType | 'All'> = [
  'All',
  '1st Shift',
  '2nd Shift',
  '3rd Shift',
];

export const JobsPortalView: React.FC = () => {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialSpec = searchParams.get('specialization') as SpecializationCategory || 'All';

  const [filters, setFilters] = useState<JobFilters>({
    ...DEFAULT_FILTERS,
    keyword: initialKeyword,
    location: initialLocation,
    specialization: initialSpec,
  });

  // Keep query params in sync if user arrives via link
  useEffect(() => {
    const kw = searchParams.get('keyword');
    const loc = searchParams.get('location');
    const sp = searchParams.get('specialization');
    if (kw !== null || loc !== null || sp !== null) {
      setFilters((prev) => ({
        ...prev,
        keyword: kw ?? prev.keyword,
        location: loc ?? prev.location,
        specialization: (sp as SpecializationCategory) ?? prev.specialization,
      }));
    }
  }, [searchParams]);

  const [savedJobIds, setSavedJobIds] = useState<string[]>(['OPS-48210']);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [formValues, setFormValues] = useState<ApplicationFormValues>({
    fullName: '',
    email: '',
    phone: '',
    postalCode: '',
    yearsExperience: '',
    workAuthorized: true,
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ApplicationFormValues, string>>
  >({});

  const filteredJobs = useMemo(
    () => filterJobs(JOBS_DATA, filters, savedJobIds),
    [filters, savedJobIds]
  );

  const activeJob = selectedJob ?? filteredJobs[0] ?? null;
  const isApplied = activeJob ? appliedJobIds.includes(activeJob.id) : false;

  const handleOpenJob = (job: JobListing) => {
    setSelectedJob(job);
    setFormErrors({});
  };

  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApplyJob = (jobId: string) => {
    setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob) return;
    const errors = validateApplicationForm(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    handleApplyJob(activeJob.id);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
      {/* Top Search Banner */}
      <section className="bg-[#081C31] text-white border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-10 lg:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-mono text-[#00A3E0] uppercase tracking-wider font-semibold">
                jobs.operateservices.com
              </p>
              <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight mt-1">
                Search OperateServices Jobs
              </h1>
            </div>
            <p className="text-sm text-slate-300 font-mono tabular-nums bg-white/10 px-3.5 py-1.5 rounded-full self-start md:self-auto">
              {filteredJobs.length} matching opportunities
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white rounded-2xl p-2.5 grid grid-cols-1 md:grid-cols-12 gap-2.5 shadow-xl"
          >
            <label className="md:col-span-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#00558C]">
              <Search className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
              <span className="sr-only">Search by job title, skill, or ID</span>
              <input
                type="text"
                value={filters.keyword}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, keyword: e.target.value }))
                }
                placeholder="Job title, keyword, or skill (e.g. CNC, Forklift, A&P)"
                className="w-full bg-transparent text-sm text-[#081C31] placeholder:text-slate-500 focus:outline-none"
              />
              {filters.keyword && (
                <button
                  type="button"
                  aria-label="Clear keyword search"
                  onClick={() => setFilters((prev) => ({ ...prev, keyword: '' }))}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </label>

            <label className="md:col-span-4 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-[#00558C]">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
              <span className="sr-only">City, State, or ZIP</span>
              <input
                type="text"
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="City, State, or ZIP (e.g. Phoenix, OH)"
                className="w-full bg-transparent text-sm text-[#081C31] placeholder:text-slate-500 focus:outline-none"
              />
              {filters.location && (
                <button
                  type="button"
                  aria-label="Clear location search"
                  onClick={() => setFilters((prev) => ({ ...prev, location: '' }))}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </label>

            <label className="md:col-span-2 flex items-center px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="sr-only">Search radius</span>
              <select
                value={filters.radiusMiles}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    radiusMiles: Number(e.target.value),
                  }))
                }
                className="w-full bg-transparent text-sm text-[#081C31] focus:outline-none cursor-pointer"
              >
                <option value={25}>Within 25 mi</option>
                <option value={50}>Within 50 mi</option>
                <option value={100}>Within 100 mi</option>
              </select>
            </label>

            <button
              type="submit"
              className="md:col-span-1 px-4 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase whitespace-nowrap transition-colors cursor-pointer shadow-sm"
            >
              Find
            </button>
          </form>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-10">
        {/* Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMobileFilters((p) => !p)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#081C31] shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>Filters</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setFilters((prev) => ({ ...prev, savedOnly: !prev.savedOnly }))
              }
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors shadow-xs cursor-pointer ${
                filters.savedOnly
                  ? 'bg-[#081C31] text-white border-[#081C31]'
                  : 'bg-white text-[#081C31] border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              <span>Saved Jobs ({savedJobIds.length})</span>
            </button>

            {(filters.keyword ||
              filters.location ||
              filters.specialization !== 'All' ||
              filters.employmentType !== 'All' ||
              filters.shift !== 'All' ||
              filters.minHourlyPay > 0 ||
              filters.savedOnly) && (
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[#00558C] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <label htmlFor="sort-jobs" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Sort by
            </label>
            <select
              id="sort-jobs"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as JobFilters['sortBy'],
                }))
              }
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#081C31] focus:outline-none focus:border-[#00558C] cursor-pointer shadow-xs"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Most Recent</option>
              <option value="highest-pay">Highest Pay Rate</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar */}
          <aside
            aria-label="Job filters"
            className={`lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div>
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#081C31] mb-3">
                Category / Specialization
              </h2>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, specialization: 'All' }))}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                    filters.specialization === 'All'
                      ? 'bg-[#081C31] text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  All Specializations
                </button>
                {SPECIALIZATIONS_DATA.map((spec) => (
                  <button
                    key={spec.slug}
                    type="button"
                    onClick={() =>
                      setFilters((p) => ({ ...p, specialization: spec.title }))
                    }
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                      filters.specialization === spec.title
                        ? 'bg-[#081C31] text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {spec.title}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({ ...p, specialization: 'Internal Corporate' }))
                  }
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                    filters.specialization === 'Internal Corporate'
                      ? 'bg-[#081C31] text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Internal Corporate
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#081C31] mb-3">
                Employment Type
              </h2>
              <div className="space-y-1">
                {EMPLOYMENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFilters((p) => ({ ...p, employmentType: type }))
                    }
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                      filters.employmentType === type
                        ? 'bg-[#00558C]/10 text-[#00558C] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {type === 'All' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#081C31] mb-3">
                Shift Schedule
              </h2>
              <div className="space-y-1">
                {SHIFTS.map((shift) => (
                  <button
                    key={shift}
                    type="button"
                    onClick={() => setFilters((p) => ({ ...p, shift }))}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
                      filters.shift === shift
                        ? 'bg-[#00558C]/10 text-[#00558C] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {shift === 'All' ? 'Any Shift' : shift}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="min-pay-range"
                  className="font-display font-bold text-sm uppercase tracking-wider text-[#081C31]"
                >
                  Minimum Pay
                </label>
                <span className="font-mono tabular-nums text-xs font-bold text-[#00558C]">
                  {filters.minHourlyPay > 0
                    ? `$${filters.minHourlyPay}+ / hr`
                    : 'Any'}
                </span>
              </div>
              <input
                id="min-pay-range"
                type="range"
                min={0}
                max={40}
                step={2}
                value={filters.minHourlyPay}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    minHourlyPay: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#00558C] cursor-pointer"
              />
            </div>
          </aside>

          {/* Job List */}
          <div className="lg:col-span-4 space-y-3.5" data-testid="job-results-list">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs">
                <Briefcase
                  className="w-12 h-12 text-slate-400 mx-auto mb-3"
                  aria-hidden="true"
                />
                <h2 className="font-display font-bold text-lg text-[#081C31]">
                  No matching jobs found
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Try widening your location, clearing keyword filters, or browsing all specializations.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const selected = activeJob?.id === job.id;
                const saved = savedJobIds.includes(job.id);
                const applied = appliedJobIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className={`rounded-2xl border p-6 transition-all bg-white shadow-xs ${
                      selected
                        ? 'border-[#00558C] ring-2 ring-[#00558C]/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenJob(job)}
                        className="text-left flex-1 focus-visible:outline-2 focus-visible:outline-[#00558C] cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-[#00558C] mb-1">
                          {job.specialization}
                        </div>
                        <h3 className="font-display font-bold text-lg text-[#081C31] leading-snug">
                          {job.title}
                        </h3>
                      </button>
                      <button
                        type="button"
                        aria-label={
                          saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`
                        }
                        onClick={() => handleToggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                          saved
                            ? 'bg-[#081C31] text-white border-[#081C31]'
                            : 'bg-white text-slate-400 border-slate-200 hover:text-[#081C31] hover:border-slate-300'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 font-medium">
                      <span>
                        {job.city}, {job.stateCode}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{job.employmentType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.shift}</span>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono tabular-nums font-bold text-base text-[#081C31]">
                        {formatJobPay(job)}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {applied
                          ? 'Applied'
                          : job.postedDaysAgo === 1
                          ? 'Posted 1 day ago'
                          : `Posted ${job.postedDaysAgo} days ago`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Job Detail & Quick Apply Panel */}
          <div className="lg:col-span-5">
            {activeJob ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto shadow-sm">
                <div className="pb-6 border-b border-slate-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-mono font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {activeJob.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#00558C] font-semibold">
                      {activeJob.specialization}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-[#081C31]">
                    {activeJob.title}
                  </h2>
                  <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#00558C]" aria-hidden="true" />
                      <span>
                        {activeJob.city}, {activeJob.state} {activeJob.zip}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#00558C]" aria-hidden="true" />
                      <span>
                        {activeJob.shift} · {activeJob.employmentType}
                      </span>
                    </span>
                  </div>
                  <div className="mt-4 font-mono tabular-nums text-xl font-bold text-[#081C31]">
                    {formatJobPay(activeJob)}
                  </div>
                </div>

                <div className="py-6 space-y-6 text-sm text-slate-700 leading-relaxed">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#081C31] mb-2">
                      Position Summary
                    </h3>
                    <p>{activeJob.summary}</p>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[#081C31] mb-2">
                      Key Responsibilities
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      {activeJob.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[#081C31] mb-2">
                      Qualifications
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5">
                      {activeJob.requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[#081C31] mb-2">
                      Benefits &amp; Pay Details
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {activeJob.benefits.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Quick Apply Form */}
                <div className="pt-6 border-t border-slate-200">
                  {isApplied ? (
                    <div
                      role="status"
                      className="rounded-2xl bg-[#00558C]/10 border border-[#00558C]/30 p-6 text-[#081C31]"
                    >
                      <div className="flex items-center gap-3 font-display font-bold text-lg">
                        <CheckCircle2
                          className="w-6 h-6 text-[#00558C]"
                          aria-hidden="true"
                        />
                        <span>Application Submitted for {activeJob.id}</span>
                      </div>
                      <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                        A local OperateServices recruiter in {activeJob.city}, {activeJob.stateCode} will review your qualifications and reach out within 1 business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitApplication} className="space-y-4" noValidate>
                      <h3 className="font-display font-bold text-lg text-[#081C31]">
                        Apply Now for This Role
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label
                            htmlFor="apply-name"
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            Full Name *
                          </label>
                          <input
                            id="apply-name"
                            type="text"
                            value={formValues.fullName}
                            onChange={(e) =>
                              setFormValues((v) => ({
                                ...v,
                                fullName: e.target.value,
                              }))
                            }
                            placeholder="Jordan Vance"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#081C31] focus:outline-none focus:border-[#00558C]"
                          />
                          {formErrors.fullName && (
                            <p className="text-xs text-red-600 mt-1">
                              {formErrors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="apply-email"
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            Email Address *
                          </label>
                          <input
                            id="apply-email"
                            type="email"
                            value={formValues.email}
                            onChange={(e) =>
                              setFormValues((v) => ({
                                ...v,
                                email: e.target.value,
                              }))
                            }
                            placeholder="jordan@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#081C31] focus:outline-none focus:border-[#00558C]"
                          />
                          {formErrors.email && (
                            <p className="text-xs text-red-600 mt-1">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label
                            htmlFor="apply-phone"
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            Phone *
                          </label>
                          <input
                            id="apply-phone"
                            type="tel"
                            value={formValues.phone}
                            onChange={(e) =>
                              setFormValues((v) => ({
                                ...v,
                                phone: e.target.value,
                              }))
                            }
                            placeholder="(410) 555-0192"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#081C31] focus:outline-none focus:border-[#00558C]"
                          />
                          {formErrors.phone && (
                            <p className="text-xs text-red-600 mt-1">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="apply-zip"
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            ZIP Code *
                          </label>
                          <input
                            id="apply-zip"
                            type="text"
                            value={formValues.postalCode}
                            onChange={(e) =>
                              setFormValues((v) => ({
                                ...v,
                                postalCode: e.target.value,
                              }))
                            }
                            placeholder={activeJob.zip}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#081C31] focus:outline-none focus:border-[#00558C]"
                          />
                          {formErrors.postalCode && (
                            <p className="text-xs text-red-600 mt-1">
                              {formErrors.postalCode}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="apply-exp"
                            className="block text-xs font-medium text-slate-700 mb-1"
                          >
                            Experience *
                          </label>
                          <select
                            id="apply-exp"
                            value={formValues.yearsExperience}
                            onChange={(e) =>
                              setFormValues((v) => ({
                                ...v,
                                yearsExperience: e.target.value,
                              }))
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#081C31] bg-white focus:outline-none focus:border-[#00558C]"
                          >
                            <option value="">Select</option>
                            <option value="0-1 years">0–1 years</option>
                            <option value="1-3 years">1–3 years</option>
                            <option value="3-5 years">3–5 years</option>
                            <option value="5+ years">5+ years</option>
                          </select>
                          {formErrors.yearsExperience && (
                            <p className="text-xs text-red-600 mt-1">
                              {formErrors.yearsExperience}
                            </p>
                          )}
                        </div>
                      </div>

                      <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={formValues.workAuthorized}
                          onChange={(e) =>
                            setFormValues((v) => ({
                              ...v,
                              workAuthorized: e.target.checked,
                            }))
                          }
                          className="mt-0.5 accent-[#00558C]"
                        />
                        <span>
                          I am legally authorized to work in the country where this position is located.
                        </span>
                      </label>
                      {formErrors.workAuthorized && (
                        <p className="text-xs text-red-600">
                          {formErrors.workAuthorized}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-xl bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase transition-colors cursor-pointer shadow-md"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-600 shadow-xs">
                Select a job listing to inspect responsibilities, pay details, and submit an application.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
