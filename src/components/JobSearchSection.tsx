'use client';

import { type FormEvent, type RefObject } from 'react';
import { MapPin, Search, Clock, Briefcase, CheckCircle2, X } from 'lucide-react';
import { QUICK_SEARCH_ROLES } from '../data/operateServicesData';
import { formatHourlyRange, type JobPosting } from '../utils/jobs';

interface JobSearchSectionProps {
  keywords: string;
  location: string;
  selectedCategory: string;
  showResults: boolean;
  filteredJobs: JobPosting[];
  appliedJobIds: string[];
  searchInputRef: RefObject<HTMLInputElement | null>;
  onKeywordsChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onSearchSubmit: () => void;
  onQuickRoleClick: (role: string) => void;
  onBrowseAll: () => void;
  onClearFilters: () => void;
  onApplyJob: (job: JobPosting) => void;
}

const CATEGORIES = ['All', 'Manufacturing', 'Skilled Trades', 'Logistics', 'Engineering'];

export function JobSearchSection({
  keywords,
  location,
  selectedCategory,
  showResults,
  filteredJobs,
  appliedJobIds,
  searchInputRef,
  onKeywordsChange,
  onLocationChange,
  onCategoryChange,
  onSearchSubmit,
  onQuickRoleClick,
  onBrowseAll,
  onClearFilters,
  onApplyJob,
}: JobSearchSectionProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section id="job-search" className="relative z-20 px-4 sm:px-8 lg:px-12 -mt-20 sm:-mt-28 lg:-mt-32 pb-24 lg:pb-36">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,28,54,0.14)] border border-slate-100 p-8 sm:p-12 lg:p-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001C36] text-center tracking-tight">
            Find your next job
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-9 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5 items-end"
          >
            <div>
              <label
                htmlFor="job-keywords-input"
                className="block text-base sm:text-lg font-bold text-[#001C36] mb-2"
              >
                I&apos;m Looking For:
              </label>
              <input
                ref={searchInputRef}
                id="job-keywords-input"
                type="text"
                value={keywords}
                onChange={(e) => onKeywordsChange(e.target.value)}
                placeholder="Job Title, Industry, Keywords"
                className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl border border-slate-300 bg-white text-base sm:text-lg text-[#081C31] placeholder:text-slate-400 focus:outline-none focus:border-[#00558C] focus:ring-2 focus:ring-[#00558C]/20"
              />
            </div>

            <div>
              <label
                htmlFor="job-location-input"
                className="block text-base sm:text-lg font-bold text-[#001C36] mb-2"
              >
                Somewhere Near:
              </label>
              <input
                id="job-location-input"
                type="text"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="City, State Or Zip"
                className="w-full h-14 sm:h-16 px-5 sm:px-6 rounded-xl border border-slate-300 bg-white text-base sm:text-lg text-[#081C31] placeholder:text-slate-400 focus:outline-none focus:border-[#00558C] focus:ring-2 focus:ring-[#00558C]/20"
              />
            </div>

            <button
              type="submit"
              className="h-14 sm:h-16 px-10 rounded-full bg-[#001C36] hover:bg-[#00558C] text-white text-base sm:text-lg font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md"
            >
              Search Jobs
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {QUICK_SEARCH_ROLES.map((role) => {
              const isActive = keywords.toLowerCase() === role.toLowerCase();
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => onQuickRoleClick(role)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#001C36] text-white shadow-sm'
                      : 'bg-[#FDF4E7] hover:bg-[#FCE8CC] text-[#081C31]'
                  }`}
                >
                  <span>{role}</span>
                  <Search className="w-4 h-4 opacity-75" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBrowseAll}
              className="text-base font-bold text-[#00558C] hover:text-[#001C36] underline underline-offset-4 cursor-pointer"
            >
              Browse All Jobs
            </button>
          </div>
        </div>

        {showResults && (
          <div
            data-testid="job-results-panel"
            className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001C36]">
                  Open Positions{' '}
                  <span className="text-base font-semibold text-slate-500 tabular-nums ml-1">
                    ({filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'} found)
                  </span>
                </h3>
                {(keywords || location) && (
                  <p className="text-sm text-slate-500 mt-1">
                    Showing results
                    {keywords ? ` for "${keywords}"` : ''}
                    {location ? ` near "${location}"` : ''}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl overflow-x-auto">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => onCategoryChange(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedCategory === category
                          ? 'bg-white text-[#001C36] shadow-sm'
                          : 'text-slate-600 hover:text-[#001C36]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onClearFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 hover:text-[#001C36] cursor-pointer"
                  aria-label="Reset job filters"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-bold text-[#001C36]">
                  No open positions match your current filters.
                </p>
                <p className="text-base text-slate-600 mt-2 max-w-md mx-auto">
                  Try clearing your location filter or browsing all available industrial and skilled trades roles.
                </p>
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="mt-6 px-7 py-3 rounded-full bg-[#001C36] text-white text-base font-semibold hover:bg-[#00558C] transition-colors cursor-pointer"
                >
                  Show All Positions
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredJobs.map((job) => {
                  const isApplied = appliedJobIds.includes(job.id);
                  return (
                    <article
                      key={job.id}
                      className="rounded-2xl border border-slate-200 p-6 sm:p-7 hover:border-[#00558C] hover:shadow-lg transition-all flex flex-col justify-between bg-white"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00558C]">
                          <span>{job.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.employmentType}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">Posted {job.postedDaysAgo}d ago</span>
                        </div>

                        <h4 className="mt-3 text-xl font-bold text-[#001C36] leading-snug">
                          {job.title}
                        </h4>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" />
                            <span>{job.location}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" />
                            <span>{job.shift}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-bold text-[#001C36] tabular-nums">
                            <Briefcase className="w-4 h-4 text-[#F09200]" aria-hidden="true" />
                            <span>{formatHourlyRange(job.hourlyMin, job.hourlyMax)}</span>
                          </span>
                        </div>

                        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
                          {job.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="text-xs sm:text-sm text-slate-500 truncate max-w-[55%]">
                          {job.requirements[0]}
                        </span>

                        {isApplied ? (
                          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 whitespace-nowrap shrink-0">
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            <span>Application Submitted</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onApplyJob(job)}
                            className="px-5 py-2.5 rounded-full bg-[#001C36] hover:bg-[#F09200] hover:text-[#001C36] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
