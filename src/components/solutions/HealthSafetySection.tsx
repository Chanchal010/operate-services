import React from 'react';

export function HealthSafetySection() {
  return (
    <section
      className="bg-[#001C36] text-white py-20 sm:py-28 border-t border-white/10"
      aria-labelledby="health-safety-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#F09200]">
          SAFETY &amp; COMPLIANCE FIRST
        </p>
        <h2
          id="health-safety-heading"
          className="mt-3 font-display text-[34px] sm:text-[44px] lg:text-[48px] font-bold tracking-tight text-white leading-tight"
        >
          Build a Healthy and Safe Workforce
        </h2>
        <div className="mt-8 space-y-6 text-[16px] sm:text-[18px] leading-[1.75] text-slate-200 max-w-[980px] mx-auto">
          <p>
            OperateServices prioritizes the safety of every employee on our clients&apos; worksites. Our
            Health and Safety team is ready to partner with you, offering consultative support on
            evolving safety standards and providing safety resources.
          </p>
          <p>
            Because health and safety are so important to a productive workplace, we provide this
            ongoing service for all of our clients to effectively manage risk. Whether you need to
            hire a team of ten skilled workers or hundreds of industrial contractors, we&apos;ll
            support a safe worksite that keeps our employees and your business protected and
            productive.
          </p>
        </div>
      </div>
    </section>
  );
}
