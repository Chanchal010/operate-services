'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Award,
  Globe2,
  HeartHandshake,
  Shield,
  Users,
  X,
} from 'lucide-react';
import {
  CAREER_IMAGES,
  LEADERSHIP_DATA,
  NEWS_DATA,
} from '@/data/careerPortalData';
import { NewsItem } from '@/types/career';
import { CareerResourceModals, ActiveModalState } from './CareerResourceModals';

export const AboutUsView: React.FC = () => {
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [teamImgFailed, setTeamImgFailed] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModalState | null>(null);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero Section: Our People Are Everything */}
      <section id="overview" className="bg-[#081C31] text-white">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-bold tracking-wider uppercase text-[#00A3E0] mb-3">
              About OperateServices
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight text-balance mb-6">
              Our People Are Everything
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              OperateServices brings specialized industrial recruiting and workforce solutions to communities across North America and Europe. We listen closely, match capabilities with precision, and stand beside every contractor and client from day one.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/jobs"
                className="px-6 py-3 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase transition-colors shadow-sm"
              >
                Explore Open Jobs
              </Link>
              <Link
                href="/locations"
                className="px-6 py-3 rounded-lg border border-white/25 hover:bg-white/10 text-white text-sm font-bold tracking-wide uppercase transition-colors"
              >
                Explore 200+ Locations
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] rounded-2xl overflow-hidden bg-[#0F2942] border border-white/10 shadow-2xl">
              {!teamImgFailed ? (
                <img
                  src={CAREER_IMAGES.aboutTeam}
                  alt="OperateServices recruiting and workforce leadership collaborating in a bright office"
                  referrerPolicy="no-referrer"
                  onError={() => setTeamImgFailed(true)}
                  className="w-full h-full object-cover min-h-[320px]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center min-h-[320px]">
                  <Users className="w-14 h-14 text-[#00A3E0] mb-3" aria-hidden="true" />
                  <p className="font-display font-bold text-xl">People-First Recruiting</p>
                  <p className="text-sm text-slate-300 mt-1">Specialized Industrial &amp; Technical Workforce</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="border-t border-white/10 bg-[#04111F]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">40+ Years</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Industry experience</div>
            </div>
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">200+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Global offices &amp; local hubs</div>
            </div>
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">14,000+</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Active client facilities served</div>
            </div>
            <div>
              <div className="font-mono tabular-nums text-3xl font-bold text-white">98.4%</div>
              <div className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Safety onboarding compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2 block">Our Team</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#081C31] tracking-tight">
            Leadership Built From Within
          </h2>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            Our executive leadership team grew up inside local recruiting branches, bringing firsthand knowledge of shop-floor trades, safety stewardship, and long-term career development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LEADERSHIP_DATA.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#081C31] text-white font-display font-bold text-lg flex items-center justify-center mb-5">
                  {leader.initials}
                </div>
                <h3 className="font-display font-bold text-xl text-[#081C31]">
                  {leader.name}
                </h3>
                <p className="text-xs font-bold text-[#00558C] mt-1 uppercase tracking-wider">
                  {leader.role}
                </p>
                <p className="text-sm text-slate-600 mt-3.5 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                {leader.tenure}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diversity, Equity & Inclusion + Corporate Social Responsibility */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div id="dei" className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#00558C]/10 text-[#00558C] flex items-center justify-center mb-6">
              <HeartHandshake className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#081C31]">
              Diversity, Equity &amp; Inclusion
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed">
              Skilled work thrives when every qualified candidate has equitable access to apprenticeships, certifications, and leadership growth. Our regional Employee Resource Groups and bias-free skills evaluations widen talent pipelines across manufacturing and skilled trades.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-[#081C31] font-medium">
              <li>· Skills-first technical assessments across welding, CNC, and aviation</li>
              <li>· Partnerships with regional technical colleges and community trade centers</li>
              <li>· Transparent pay-band benchmarking for all contract roles</li>
            </ul>
          </div>

          <div id="csr" className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#081C31]/10 text-[#081C31] flex items-center justify-center mb-6">
              <Globe2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#081C31]">
              Corporate Social Responsibility
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed">
              OperateServices invests in local communities through workforce readiness grants, tool scholarships for trade students, and paid volunteer hours for our field teams in more than 200 markets.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-[#081C31] font-medium">
              <li>· Annual skilled trades scholarship fund for technical school graduates</li>
              <li>· Zero-incident workplace safety mentorship with client EHS leaders</li>
              <li>· Local food security and habitat construction volunteer days</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Military Affairs */}
      <section id="military-affairs" className="bg-[#081C31] text-white py-20">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-[#00A3E0] mb-3">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Military Affairs Program</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-balance">
              Translating Military Discipline &amp; Technical MOS Experience Into Civilian Careers
            </h2>
            <p className="text-slate-300 mt-4 leading-relaxed max-w-2xl text-base">
              Transitioning service members, National Guard and Reserve personnel, and military spouses bring unmatched readiness in aircraft maintenance, power generation, logistics, and electronics. Our dedicated military recruiters help map military occupational specialties directly to high-paying civilian trades.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/jobs"
                className="px-6 py-3 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase transition-colors shadow-sm"
              >
                Explore Veteran-Ready Roles
              </Link>
              <button
                type="button"
                onClick={() => setActiveModal({ topic: 'contact' })}
                className="text-sm font-semibold text-white hover:text-[#00A3E0] transition-colors cursor-pointer"
              >
                Connect with a Military Recruiter →
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-[#0F2942] border border-white/10">
              <Award className="w-6 h-6 text-[#00A3E0] mb-2" aria-hidden="true" />
              <div className="font-mono tabular-nums text-3xl font-bold">11,400+</div>
              <p className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">Annual veteran &amp; military spouse placements</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0F2942] border border-white/10">
              <Shield className="w-6 h-6 text-[#00A3E0] mb-2" aria-hidden="true" />
              <div className="font-mono tabular-nums text-3xl font-bold">MOS Match</div>
              <p className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">A&amp;P, avionics, diesel, logistics &amp; electrical alignment</p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section id="news" className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-2 block">Press Room</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#081C31] tracking-tight">
              News &amp; Events
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Recent announcements, industry insights, and OperateServices in the media.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mb-2 font-medium">
                  <span className="font-bold text-[#00558C]">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#081C31] leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-3.5 leading-relaxed">
                  {item.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(item)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00558C] hover:underline self-start cursor-pointer"
              >
                <span>Read release</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* News Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-2 mb-1">
                  <span className="font-bold text-[#00558C]">
                    {selectedArticle.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <h3
                  id="news-modal-title"
                  className="font-display font-bold text-2xl text-[#081C31]"
                >
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close news article"
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="py-6 space-y-4 text-sm text-slate-700 leading-relaxed">
              {selectedArticle.body.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-lg bg-[#081C31] text-white text-sm font-semibold hover:bg-[#002D5A] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <CareerResourceModals
        modal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};
