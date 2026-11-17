'use client';

import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { VIDEO_POSTER_IMAGE } from '../data/operateServicesData';

interface ExpertiseSectionProps {
  onLearnMore: () => void;
  onPlayVideo: () => void;
}

export function ExpertiseSection({ onLearnMore, onPlayVideo }: ExpertiseSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5">
          <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#00558C]">
            Workforce Expertise
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold leading-[1.05] text-[#001C36]">
            The Standard for Staffing &amp; Services
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            Trusted by more than <span className="font-bold text-[#001C36] tabular-nums">18,000</span> clients and{' '}
            <span className="font-bold text-[#001C36] tabular-nums">170,000</span> contractors annually, OperateServices has spent{' '}
            <span className="font-bold text-[#001C36] tabular-nums">40</span> years setting the bar as a valued staffing agency. In a quickly evolving labor market, who will you trust with your future?
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#001C36] hover:bg-[#00558C] text-white text-base sm:text-lg font-bold transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Learn More About OperateServices</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#001C36] aspect-video group">
            {!imgError ? (
              <img
                src={VIDEO_POSTER_IMAGE}
                alt="RISE: OperateServices Staffing & Services documentary video preview"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#001C36] to-[#00558C]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-white p-1.5 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                  <img
                    src="/images/operateservices_logo.png"
                    alt="OperateServices"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-base font-bold leading-tight">
                    RISE: OperateServices — Staffing &amp; Services
                  </p>
                  <p className="text-xs text-slate-200">OperateServices Workforce Story</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white/90 tabular-nums px-2.5 py-1 bg-black/40 rounded-full backdrop-blur-xs">
                2:14
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={onPlayVideo}
                aria-label="Play RISE: OperateServices Staffing & Services video"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F09200] hover:bg-[#D98200] text-[#001C36] flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current ml-1" aria-hidden="true" />
              </button>
            </div>

            <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between pointer-events-none">
              <span
                className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                RISE
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-200">
                Click to watch workforce reel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
