'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '@/data/solutionsData';

interface SolutionsHeroProps {
  onFindSolution: () => void;
}

export function SolutionsHero({ onFindSolution }: SolutionsHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#001C36] text-white"
      aria-labelledby="hero-heading"
    >
      {/* Background Photography */}
      <img
        src={HERO_IMAGE}
        alt="Industrial engineers in white hard hats and safety vests reviewing operations on a tablet"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Left-weighted contrast scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#001C36]/95 via-[#001C36]/75 to-[#001C36]/30"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-24 sm:pt-14 sm:pb-32 lg:pb-36">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-12">
          <ol className="flex items-center gap-2 text-sm text-white/90 font-medium">
            <li className="text-[#F09200] font-semibold">Home</li>
            <li className="text-white/60">/</li>
            <li className="text-white">Solutions &amp; Staffing Services</li>
          </ol>
        </nav>

        <div className="max-w-[800px]">
          <h1
            id="hero-heading"
            className="font-display font-extrabold uppercase tracking-tight leading-[0.98] text-white text-[44px] sm:text-[60px] lg:text-[72px]"
          >
            OperateServices
            <br />
            <span className="text-[#F09200]">Staffing Services</span>
          </h1>

          <p className="mt-6 font-display font-bold uppercase tracking-wide text-white text-[19px] sm:text-[24px]">
            Industrial Staffing &bull; Skilled Trades Staffing &bull; Scalable Services
          </p>

          <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.7] text-white/90 max-w-[680px]">
            OperateServices meets our clients where they need us. Whether it&apos;s light industrial or
            skilled trades staffing, or a deeper level of support through our scalable offerings, we
            deliver the expertise, solutions and people to drive results in today&apos;s economy.
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={onFindSolution}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F09200] hover:bg-[#d98300] text-[#001C36] font-bold text-[16px] tracking-tight transition-all duration-200 shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap"
            >
              <span>Find Your Workforce Solution</span>
              <ArrowRight className="w-5 h-5 stroke-[2.4]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
