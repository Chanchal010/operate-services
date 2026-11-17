'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/operateServicesData';

export function PartnershipSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const current = TESTIMONIALS_DATA[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#001C36] grid grid-cols-1 md:grid-cols-12 min-h-[460px] lg:min-h-[520px]">
          <div className="md:col-span-5 relative min-h-[280px] md:min-h-full bg-[#07294A]">
            {!failedImages[current.id] ? (
              <img
                src={current.image}
                alt={current.imageAlt}
                referrerPolicy="no-referrer"
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [current.id]: true }))
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#00558C] to-[#001C36]" />
            )}
          </div>

          <div className="md:col-span-7 p-8 sm:p-14 lg:p-20 flex flex-col justify-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {current.heading}
            </h2>
            <blockquote className="mt-6 text-lg sm:text-2xl lg:text-[26px] text-slate-100 leading-relaxed font-normal">
              {current.quote}
            </blockquote>
            <div className="mt-8 pt-6 border-t border-white/15">
              <p className="text-base sm:text-lg font-bold text-[#F09200]">
                {current.attribution}
              </p>
              <p className="text-sm text-slate-300 mt-1">{current.role}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-14 h-14 rounded-full border-2 border-slate-200 text-slate-600 hover:border-[#001C36] hover:text-[#001C36] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          <span className="text-sm font-bold text-slate-500 tabular-nums">
            {activeSlide + 1} / {TESTIMONIALS_DATA.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-14 h-14 rounded-full border-2 border-slate-200 text-slate-600 hover:border-[#001C36] hover:text-[#001C36] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            <ArrowRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
