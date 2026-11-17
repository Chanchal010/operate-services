'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  HardHat,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import {
  CAREER_IMAGES,
  FAQS_DATA,
  SPECIALIZATIONS_DATA,
} from '@/data/careerPortalData';
import { SpecializationCategory } from '@/types/career';
import { CareerResourceModals, ActiveModalState } from './CareerResourceModals';

interface CareerOpportunitiesViewProps {
  onSearchJobs?: (params?: {
    keyword?: string;
    location?: string;
    specialization?: SpecializationCategory | 'All';
  }) => void;
}

const INTERNAL_PATHS = [
  {
    number: '01',
    title: 'Recruiting Careers',
    summary:
      'Source, interview, and advocate for skilled tradespeople and manufacturing talent across your local industrial corridor.',
    track: 'Recruiter · Senior Recruiter · Recruiting Lead',
  },
  {
    number: '02',
    title: 'Sales Careers',
    summary:
      'Partner directly with plant managers, operations directors, and facility leaders to design workforce programs.',
    track: 'Account Manager · Strategic Account Executive',
  },
  {
    number: '03',
    title: 'Field Support Careers',
    summary:
      'Coordinate contractor onboarding, payroll accuracy, I-9 compliance, and local office operations.',
    track: 'Field Support Associate · Operations Specialist',
  },
  {
    number: '04',
    title: 'Corporate Careers',
    summary:
      'Drive enterprise finance, HR, legal, safety compliance, and workforce analytics across our operations hubs.',
    track: 'Safety · Finance · Information Systems · HR',
  },
  {
    number: '05',
    title: 'Internship Opportunities',
    summary:
      'Hands-on 10-week summer recruiting and sales immersion with mentorship, paid weekly hours, and full-time conversion paths.',
    track: 'Recruiter Intern · Corporate Analyst Intern',
  },
];

export const CareerOpportunitiesView: React.FC<CareerOpportunitiesViewProps> = ({
  onSearchJobs,
}) => {
  const router = useRouter();
  const [heroKeyword, setHeroKeyword] = useState('');
  const [heroLocation, setHeroLocation] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModalState | null>(null);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchJobs) {
      onSearchJobs({
        keyword: heroKeyword,
        location: heroLocation,
      });
      return;
    }
    const params = new URLSearchParams();
    if (heroKeyword.trim()) params.set('keyword', heroKeyword.trim());
    if (heroLocation.trim()) params.set('location', heroLocation.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  const navigateToJobs = (params?: { specialization?: SpecializationCategory | 'All'; keyword?: string; location?: string }) => {
    if (onSearchJobs) {
      onSearchJobs(params);
      return;
    }
    const query = new URLSearchParams();
    if (params?.specialization && params.specialization !== 'All') {
      query.set('specialization', params.specialization);
    }
    if (params?.keyword) query.set('keyword', params.keyword);
    if (params?.location) query.set('location', params.location);
    const qs = query.toString();
    router.push(`/jobs${qs ? `?${qs}` : ''}`);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="bg-[#081C31] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-bold tracking-wider uppercase text-[#00A3E0] mb-3">
              Career Opportunities at OperateServices
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight text-balance mb-6">
              Find Industrial &amp; Skilled Trades Jobs That Build Your Future
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              Whether you are looking for hands-on contract work in manufacturing, aviation, construction, and logistics—or building a long-term corporate career inside OperateServices—our recruiters connect your skills directly with leading employers.
            </p>

            {/* Integrated Job Search Strip */}
            <form
              onSubmit={handleQuickSearch}
              aria-label="Quick job search"
              className="bg-white rounded-xl p-2.5 flex flex-col sm:flex-row items-stretch gap-2.5 shadow-xl max-w-2xl"
            >
              <label className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus-within:border-[#00558C]">
                <Search className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                <span className="sr-only">Job title or skill</span>
                <input
                  type="text"
                  value={heroKeyword}
                  onChange={(e) => setHeroKeyword(e.target.value)}
                  placeholder="Job title, skill, or keyword"
                  className="w-full bg-transparent text-sm text-[#081C31] placeholder:text-slate-500 focus:outline-none"
                />
              </label>
              <label className="sm:w-52 flex items-center px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus-within:border-[#00558C]">
                <span className="sr-only">City, state, or ZIP</span>
                <input
                  type="text"
                  value={heroLocation}
                  onChange={(e) => setHeroLocation(e.target.value)}
                  placeholder="City, State, or ZIP"
                  className="w-full bg-transparent text-sm text-[#081C31] placeholder:text-slate-500 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase whitespace-nowrap shrink-0 transition-colors shadow-sm"
              >
                Search Jobs
              </button>
            </form>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-300">
              <button
                type="button"
                onClick={() => navigateToJobs()}
                className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#00A3E0] transition-colors self-start sm:self-auto cursor-pointer"
              >
                <span>Browse all 3,400+ open positions</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <span aria-hidden="true" className="hidden sm:inline text-slate-600">|</span>
              <Link
                href="/locations"
                className="hover:text-white transition-colors self-start sm:self-auto"
              >
                Find a local recruiting office
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[300px] rounded-2xl overflow-hidden bg-[#0F2942] border border-white/10 shadow-2xl">
              {!heroImgFailed ? (
                <img
                  src={CAREER_IMAGES.heroCareer}
                  alt="Skilled industrial engineers and technicians inspecting precision aerospace hardware"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="w-full h-full object-cover min-h-[320px]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center min-h-[320px]">
                  <HardHat className="w-14 h-14 text-[#00A3E0] mb-3" aria-hidden="true" />
                  <p className="font-display font-bold text-xl">Industrial &amp; Skilled Trades</p>
                  <p className="text-sm text-slate-300 mt-1">Aviation · Manufacturing · Logistics · Facilities</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width Quantitative Trust Strip */}
        <div className="border-t border-white/10 bg-[#04111F]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">300,000+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Annual contractor placements</div>
            </div>
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">200+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Local recruiting offices</div>
            </div>
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">Weekly Pay</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Direct deposit &amp; W-2 benefits</div>
            </div>
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">40+ Years</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Connecting people &amp; industry</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Pathways: Contractors vs Internal Employees */}
      <section id="contractors" className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2 block">Choose Your Path</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#081C31] tracking-tight">
            Two Ways to Grow Your Career With OperateServices
          </h2>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            Choose the pathway that fits your goals—hands-on contract assignments at top industrial employers or internal sales, recruiting, and corporate roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#00558C]/10 text-[#00558C] flex items-center justify-center mb-6">
                <HardHat className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#081C31]">
                Contractors &amp; Skilled Trades
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Gain immediate access to contract, contract-to-hire, and direct placement opportunities across manufacturing plants, MRO hangars, distribution hubs, and commercial construction sites.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#081C31]">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Weekly W-2 direct deposit with overtime eligibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Dedicated recruiter coaching through skills tests and onboarding</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Clear 60-to-90 day permanent conversion pathways</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateToJobs()}
                className="px-5 py-2.5 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Search Open Jobs
              </button>
              <button
                type="button"
                onClick={() => setActiveModal({ topic: 'contractor-login' })}
                className="text-sm font-semibold text-[#00558C] hover:underline cursor-pointer"
              >
                Contractor Resources &amp; Login
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#081C31]/10 text-[#081C31] flex items-center justify-center mb-6">
                <Users className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#081C31]">
                Internal Employees at OperateServices
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Build a merit-based career in recruiting, account management, field operations, or corporate strategy. Nearly 90% of our branch and regional leaders started in entry-level recruiting roles.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#081C31]">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Structured mentorship and hands-on sales/recruiting bootcamps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Competitive base salary plus uncapped performance commission</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Promote-from-within culture across 200+ North American offices</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigateToJobs({ specialization: 'Internal Corporate' })}
                className="px-5 py-2.5 rounded-lg bg-[#081C31] hover:bg-[#002D5A] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Explore Internal Roles
              </button>
              <Link
                href="/about-us"
                className="text-sm font-semibold text-[#00558C] hover:underline"
              >
                Meet Our Culture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Skilled Trades & Industrial Jobs */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2 block">Specializations</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#081C31] tracking-tight">
                Explore Our Skilled Trades &amp; Industrial Jobs
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl text-base">
                Five specialized industrial divisions supported by local recruiters who understand your certifications, safety standards, and shift preferences.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateToJobs()}
              className="text-sm font-semibold text-[#00558C] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>View all specializations</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPECIALIZATIONS_DATA.map((spec) => (
              <div
                key={spec.slug}
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] overflow-hidden flex flex-col justify-between hover:border-[#00558C]/50 hover:shadow-md transition-all"
              >
                <div>
                  {spec.image && (
                    <div className="aspect-[16/10] bg-slate-200 overflow-hidden">
                      <img
                        src={spec.image}
                        alt={spec.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-7">
                    <div className="text-xs font-mono tabular-nums text-[#00558C] font-semibold mb-1.5">
                      {spec.openCount} active roles
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#081C31]">
                      {spec.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {spec.shortTagline}
                    </p>
                    <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                      {spec.roles.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => navigateToJobs({ specialization: spec.title })}
                    className="text-sm font-semibold text-[#081C31] hover:text-[#E85D04] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Search jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal({ topic: 'specialization', slug: spec.slug })}
                    className="text-xs font-semibold text-[#00558C] hover:underline cursor-pointer"
                  >
                    Role guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OperateServices Contractor Benefits */}
      <section id="benefits" className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2 block">Comprehensive Coverage</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#081C31] tracking-tight">
              OperateServices Contractor Benefits
            </h2>
            <p className="text-slate-600 mt-3 leading-relaxed text-base">
              Every OperateServices contractor is hired as a W-2 employee with dependable weekly pay and access to benefits designed to protect you and your family on and off the job site.
            </p>
            <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-6 h-6 text-[#00558C]" aria-hidden="true" />
                <h3 className="font-display font-semibold text-lg text-[#081C31]">
                  Safety First on Every Site
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before day one, our safety coordinators verify facility PPE standards, hazard communication, and OSHA/FAA compliance.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#081C31]">
                Health, Dental &amp; Vision
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Access medical coverage options, preventive care, dental, and vision insurance packages tailored for active contract employees.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#081C31]">
                Weekly Direct Deposit
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Reliable weekly paychecks every Friday via direct deposit or pay card, with transparent electronic timecard tracking.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#081C31]">
                401(k) Retirement Savings
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Invest in your long-term financial security with traditional and Roth 401(k) retirement savings plan eligibility.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#081C31]">
                Employee Discount &amp; EAP
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                24/7 Employee Assistance Program counseling, safety footwear discounts, and ongoing career placement when an assignment wraps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thrive at OperateServices: Internal Career Opportunities */}
      <section
        id="internal-careers"
        className="bg-[#081C31] text-white py-20 border-t border-slate-800"
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-bold tracking-wider uppercase text-[#00A3E0] mb-2">
                Thrive at OperateServices
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
                Internal Career Opportunities
              </h2>
              <p className="text-slate-300 mt-2 max-w-2xl text-base">
                Join an organization where accountability, collaboration, and promote-from-within mentorship turn ambition into leadership.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateToJobs({ specialization: 'Internal Corporate' })}
              className="px-6 py-3 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              View Internal Openings
            </button>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {INTERNAL_PATHS.map((item) => (
              <div
                key={item.number}
                className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[#00A3E0] font-semibold tabular-nums">
                    {item.number}.
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="md:col-span-5 text-sm text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
                <div className="md:col-span-3 md:text-right text-xs text-slate-400 font-medium">
                  {item.track}
                </div>
              </div>
            ))}
          </div>

          <div id="internal-benefits" className="mt-12 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#0F2942] border border-white/10">
              <h3 className="font-display font-bold text-lg text-white">
                Internal Employee Benefits
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Comprehensive medical, dental, vision, HSA/FSA accounts, paid parental leave, and 401(k) company matching.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#0F2942] border border-white/10">
              <h3 className="font-display font-bold text-lg text-white">
                Performance Recognition
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Uncapped commission structures, annual milestone trips, and merit-based promotion tracks with transparent quotas.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-[#0F2942] border border-white/10">
              <h3 className="font-display font-bold text-lg text-white">
                Community &amp; Volunteering
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Paid volunteer days and matching charitable contributions supporting local workforce readiness nonprofits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs & Quick Action */}
      <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2 block">Help Center</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#081C31] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mt-3 leading-relaxed text-base">
              Answers about contract timelines, W-2 benefits, and applying through OperateServices.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 items-start">
              <button
                type="button"
                onClick={() => setActiveModal({ topic: 'insights', slug: 'how-to-get-a-job' })}
                className="text-sm font-semibold text-[#00558C] hover:underline cursor-pointer"
              >
                Read: How to Prepare for Weld &amp; Skills Tests →
              </button>
              <button
                type="button"
                onClick={() => setActiveModal({ topic: 'contact' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm font-semibold text-[#081C31] transition-colors cursor-pointer shadow-xs"
              >
                <Building2 className="w-4 h-4 text-[#00558C]" aria-hidden="true" />
                <span>Contact a Local Recruiter</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3.5">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#00558C] block mb-0.5">
                        {faq.category}
                      </span>
                      <span className="font-display font-semibold text-base text-[#081C31]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Modals */}
      <CareerResourceModals
        modal={activeModal}
        onClose={() => setActiveModal(null)}
        onSearchSpecialization={(spec) => navigateToJobs({ specialization: spec })}
      />
    </div>
  );
};
