'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WELDING_IMAGE } from '../data/operateServicesData';

interface SolutionsBandProps {
  onExploreSolutions: () => void;
}

export function SolutionsBand({ onExploreSolutions }: SolutionsBandProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="solutions" className="bg-[#001C36] text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#07294A] shadow-2xl">
            {!imgError ? (
              <img
                src={WELDING_IMAGE}
                alt="Industrial welder fabricating structural steel with bright sparks"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#07294A] to-[#001C36] flex items-center justify-center p-8 text-center">
                <span className="text-base font-medium text-slate-300">
                  Skilled Trades &amp; Manufacturing Operations
                </span>
              </div>
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0,28,54,0.15) 0%, transparent 25%, transparent 75%, rgba(0,28,54,0.85) 100%)',
                boxShadow: 'inset 0 0 50px 15px rgba(0, 28, 54, 0.5)',
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#F09200]">
            Staffing Solutions &amp; Services
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] font-bold leading-[1.05] text-white">
            Partnerships Built to Solve What&apos;s Next
          </h2>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-2xl font-normal">
            As a leading staffing agency and services provider, we relentlessly uncover and solve our clients’ toughest challenges to create a better tomorrow. We treat your business as our own, fostering consultative partnerships that center on people, operational excellence and stellar performance.
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={onExploreSolutions}
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#F09200] hover:bg-[#D98200] text-[#001C36] text-base sm:text-lg font-bold transition-all shadow-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Business Solutions</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
