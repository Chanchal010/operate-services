'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { INSIGHTS_DATA, type InsightArticle } from '../data/operateServicesData';

interface InsightsSectionProps {
  onSelectArticle: (article: InsightArticle) => void;
  onViewAllInsights: () => void;
}

export function InsightsSection({
  onSelectArticle,
  onViewAllInsights,
}: InsightsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleArticles = [
    INSIGHTS_DATA[activeIndex % INSIGHTS_DATA.length],
    INSIGHTS_DATA[(activeIndex + 1) % INSIGHTS_DATA.length],
    INSIGHTS_DATA[(activeIndex + 2) % INSIGHTS_DATA.length],
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + INSIGHTS_DATA.length) % INSIGHTS_DATA.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % INSIGHTS_DATA.length);
  };

  return (
    <section id="insights" className="concrete-texture py-24 sm:py-32 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-3 pt-3">
            <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#00558C]">
              OperateServices Insights
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#001C36] leading-[1.08]">
              Staffing &amp; Services Expertise
            </h2>
            <button
              type="button"
              onClick={onViewAllInsights}
              className="mt-8 inline-block text-base font-bold text-[#00558C] hover:text-[#001C36] underline underline-offset-4 cursor-pointer"
            >
              View All Insights
            </button>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,28,54,0.07)] border border-slate-100 p-8 sm:p-9 flex flex-col justify-between min-h-[440px] sm:min-h-[460px] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00558C]">
                      <span>{article.date}</span>
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-[#001C36] leading-snug">
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="text-left hover:text-[#00558C] transition-colors cursor-pointer"
                      >
                        {article.title}
                      </button>
                    </h3>

                    <p className="mt-5 text-base text-slate-600 leading-relaxed line-clamp-4 font-normal">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <span className="text-xs sm:text-sm text-slate-500 truncate">
                      {article.category} · {article.readTime}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      aria-label={`Read ${article.title}`}
                      className="w-12 h-12 rounded-full border-2 border-[#F09200] text-[#F09200] hover:bg-[#F09200] hover:text-[#001C36] flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous insights slide"
                  className="w-12 h-12 rounded-full border border-slate-300 bg-white text-[#001C36] hover:border-[#00558C] hover:text-[#00558C] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next insights slide"
                  className="w-12 h-12 rounded-full border border-slate-300 bg-white text-[#001C36] hover:border-[#00558C] hover:text-[#00558C] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center gap-2.5" role="tablist" aria-label="Insights pagination">
                {INSIGHTS_DATA.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show insight slide ${idx + 1}: ${item.title}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                        isActive ? 'bg-[#00558C]' : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
