'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { IMPACT_STATS, WORKFORCE_SOLUTIONS_CARDS } from '@/data/solutionsData';

interface WorkforceSolutionsSectionProps {
  onNavigate: (pageId: string) => void;
}

function formatStatNumber(val: number): string {
  return val.toLocaleString('en-US');
}

export function WorkforceSolutionsSection({ onNavigate }: WorkforceSolutionsSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(IMPACT_STATS.map((s) => s.target));
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const duration = 1000;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(IMPACT_STATS.map((s) => Math.round(s.target * eased)));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden text-white py-24 sm:py-32 lg:py-36"
      style={{
        background:
          'radial-gradient(ellipse at 25% 20%, #093C73 0%, #04254B 50%, #001C36 100%)',
      }}
      aria-labelledby="workforce-solutions-heading"
    >
      {/* Subtle geometric structural lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(125deg, transparent 48%, rgba(255,255,255,0.08) 48.2%, transparent 48.5%), linear-gradient(35deg, transparent 62%, rgba(255,255,255,0.06) 62.2%, transparent 62.5%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top 2-Column Split: Narrative Left + 2x2 Solution Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#7CC0F2]">
              WORKFORCE SOLUTIONS
            </p>
            <h2
              id="workforce-solutions-heading"
              className="mt-4 font-display text-[40px] sm:text-[48px] lg:text-[54px] font-bold leading-[1.05] text-white"
            >
              A Reliable Partnership That Scales as You Grow
            </h2>
            <div className="w-20 h-[3px] bg-[#F09200] my-8" aria-hidden="true" />
            <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-slate-200">
              <p>
                When your team is tasked to keep pace with shifting market demand, it can be
                difficult to stay on top of all your hiring, project and operational needs.
              </p>
              <p>
                From industrial and skilled trades staffing to services, we can{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('high-volume-recruiting')}
                  className="text-white underline underline-offset-4 decoration-[#F09200] hover:text-[#F09200] transition-colors font-semibold cursor-pointer"
                >
                  ramp up
                </button>{' '}
                our support as you need it, allowing your team to rise to any moment.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {WORKFORCE_SOLUTIONS_CARDS.map((card) => (
              <div
                key={card.id}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F09200]/50 transition-all duration-300 backdrop-blur-xs"
              >
                <h3 className="text-[20px] sm:text-[22px] font-bold text-white leading-snug min-h-[58px] flex items-center justify-center">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {card.summary}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate(card.id)}
                  className="mt-6 inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#F09200] text-white hover:bg-[#F09200] hover:text-[#001C36] text-[14px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Metric Cards */}
        <div
          ref={statsRef}
          className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {IMPACT_STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className="rounded-2xl bg-[#001C36]/85 border border-white/10 p-8 sm:p-10 text-center shadow-xl hover:border-white/20 transition-colors"
            >
              <div className="font-display text-[52px] sm:text-[60px] font-extrabold leading-none text-white tabular-nums">
                {formatStatNumber(counts[idx])}
                <span className="text-[#F09200]">{stat.suffix}</span>
              </div>
              <h3 className="mt-3 text-[22px] font-bold text-white">{stat.label}</h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-slate-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
