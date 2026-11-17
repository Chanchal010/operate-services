'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/operateServicesData';

interface HeroSectionProps {
  onExploreSolutions: () => void;
  onFindJob: () => void;
}

export function HeroSection({ onExploreSolutions, onFindJob }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative bg-[#001C36] overflow-hidden min-h-[680px] lg:min-h-[820px] xl:min-h-[880px] flex items-center"
    >
      <div className="absolute inset-0">
        {!imgError ? (
          <img
            src={HERO_IMAGE}
            alt="OperateServices industrial technician smiling in front of a modern manufacturing facility team"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-[75%_20%] lg:object-[70%_25%]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#001C36] via-[#003459] to-[#00558C]" />
        )}
        <div className="absolute inset-0 bg-[#001C36]/70 md:bg-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #001C36 0%, rgba(0,28,54,0.94) 36%, rgba(0,28,54,0.72) 58%, rgba(0,28,54,0.3) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 sm:px-10 lg:px-16 pt-20 pb-36 sm:pt-28 sm:pb-44 lg:pt-36 lg:pb-52">
        <div className="max-w-2xl lg:max-w-3xl">
          <h1
            className="text-5xl sm:text-7xl lg:text-[84px] xl:text-[96px] font-extrabold uppercase tracking-tight leading-[0.95] text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            OperateServices Staffing &amp; Services
          </h1>
          <p className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/95 leading-snug">
            Powering Businesses &amp; Advancing Careers
          </p>
          <p className="mt-5 text-lg sm:text-xl text-slate-200 leading-relaxed max-w-xl">
            Drive toward a more productive and powerful future with North America’s most trusted staffing agency and services provider.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onExploreSolutions}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#F09200] text-[#F09200] hover:bg-[#F09200] hover:text-[#001C36] text-base sm:text-lg font-bold transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>I&apos;m Looking For Solutions</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onFindJob}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#001C36] text-base sm:text-lg font-bold transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>I&apos;m Looking For A Job</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
