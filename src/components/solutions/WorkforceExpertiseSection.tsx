'use client';

import React, { useState } from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { INDUSTRY_CARDS } from '@/data/solutionsData';

interface WorkforceExpertiseSectionProps {
  onNavigate: (pageId: string) => void;
}

export function WorkforceExpertiseSection({ onNavigate }: WorkforceExpertiseSectionProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section
      className="relative bg-[#F7F8FA] text-[#081C31] py-24 sm:py-32 lg:py-36 overflow-hidden"
      aria-labelledby="workforce-expertise-heading"
    >
      {/* Subtle geometric background lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 42%, rgba(2,26,50,0.03) 42.3%, transparent 42.6%), linear-gradient(25deg, transparent 60%, rgba(2,26,50,0.03) 60.3%, transparent 60.6%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Intro Block */}
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#00558C]">
            WORKFORCE EXPERTISE
          </p>
          <h2
            id="workforce-expertise-heading"
            className="mt-4 font-display text-[38px] sm:text-[48px] lg:text-[54px] font-bold leading-[1.08] text-[#081C31]"
          >
            Hard-Working Support for the Hardest-Working Industries in North America
          </h2>
          <div className="mt-6 space-y-4 text-[16px] sm:text-[18px] leading-[1.75] text-[#334155]">
            <p>
              Whether you operate a warehouse, manufacturing facility, construction organization or
              health system, we have the expertise and people to handle your skilled trades or
              industrial staffing requirements.
            </p>
            <p>
              We can also help you meet project milestones or manage{' '}
              <button
                type="button"
                onClick={() => onNavigate('comprehensive-maintenance-services')}
                className="text-[#00558C] underline underline-offset-4 hover:text-[#081C31] font-semibold cursor-pointer"
              >
                maintenance
              </button>{' '}
              and manufacturing assets more efficiently through our flexible workforce solutions.
            </p>
          </div>
        </div>

        {/* 8-Industry 4x2 Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INDUSTRY_CARDS.map((card) => {
            const isRevealed = activeCardId === card.id;
            const cropClassMap: Record<string, string> = {
              'consumer-industrial-products': 'object-[15%_center] scale-125 group-hover:scale-[1.32]',
              'distribution-supply-chain': 'object-[85%_center] scale-125 group-hover:scale-[1.32]',
              'government-services': 'object-[70%_35%] scale-110 group-hover:scale-[1.16]',
              'life-sciences': 'object-bottom origin-bottom scale-[2.05] group-hover:scale-[2.12]',
              'construction-energy': 'object-[25%_center] scale-125 group-hover:scale-[1.32]',
              'aviation': 'object-[22%_center] scale-135 group-hover:scale-[1.42]',
              'automotive': 'object-[82%_60%] scale-135 group-hover:scale-[1.42]',
              'healthcare': 'object-top origin-top scale-[2.05] group-hover:scale-[2.12]',
            };
            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveCardId(card.id)}
                onMouseLeave={() => setActiveCardId(null)}
                className="group relative h-[320px] rounded-2xl overflow-hidden bg-[#1E293B] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover ${
                    cropClassMap[card.id] || 'object-center'
                  } transition-transform duration-500`}
                />

                {/* Default bottom scrim */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isRevealed
                      ? 'bg-[#001C36]/92'
                      : 'bg-gradient-to-t from-[#001C36]/95 via-[#001C36]/40 to-transparent'
                  }`}
                  aria-hidden="true"
                />

                {/* Resting State Title */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 flex items-end justify-center text-center transition-opacity duration-200 ${
                    isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveCardId(card.id)}
                    onFocus={() => setActiveCardId(card.id)}
                    className="text-[20px] font-bold leading-snug text-white text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F09200] rounded"
                  >
                    {card.title}
                  </button>
                </div>

                {/* Hover / Focus / Active Overlay */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between text-left transition-opacity duration-300 ${
                    isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
                  }`}
                >
                  <div>
                    <h3 className="text-[20px] font-bold text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.6] text-slate-200 line-clamp-5">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => onNavigate(card.id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F09200] text-white hover:bg-[#F09200] hover:text-[#001C36] text-[13px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {card.inlineLink && (
                      <button
                        type="button"
                        onClick={() => onNavigate(card.inlineLink!.targetId)}
                        className="text-[12px] font-medium text-[#7CC0F2] underline underline-offset-2 hover:text-white cursor-pointer"
                      >
                        {card.inlineLink.text}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Work With The Best — Award Spotlight */}
        <div className="mt-24 sm:mt-32 pt-8 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] rounded-2xl bg-white border border-slate-200 shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#001C36] text-[#F09200] mb-4">
                <Award className="w-7 h-7" aria-hidden="true" />
              </div>
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#00558C]">
                CLEARLYRATED&reg;
              </p>
              <p className="mt-2 font-display text-[28px] font-extrabold uppercase tracking-tight text-[#081C31] leading-none">
                Best of Staffing<sup className="text-xs">®</sup>
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-wider text-[#081C31]">
                <span>Client</span>
                <span aria-hidden="true" className="text-[#F09200]">
                  &bull;
                </span>
                <span>Talent</span>
              </div>
              <p className="mt-3 text-[13px] text-slate-600 font-medium">
                10+ Consecutive Years of Excellence
              </p>
            </div>
          </div>

          <div className="md:col-span-7 text-left">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#00558C]">
              INDUSTRY-LEADING PARTNERSHIP
            </p>
            <h2 className="mt-2 font-display text-[36px] sm:text-[44px] font-bold text-[#081C31] leading-tight">
              Work With The Best
            </h2>
            <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.8] text-[#334155]">
              Our mission is as simple today as it was over 40 years ago: connecting great people
              and great organizations. We&apos;re dedicated to evolving with the needs of our
              customers, which is recognized year after year with ClearlyRated&apos;s Best of
              Staffing® Client and Talent awards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
