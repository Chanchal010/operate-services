'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SolutionsNavbar } from '@/components/solutions/SolutionsNavbar';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { WorkforceSolutionsSection } from '@/components/solutions/WorkforceSolutionsSection';
import { HealthSafetySection } from '@/components/solutions/HealthSafetySection';
import { WorkforceExpertiseSection } from '@/components/solutions/WorkforceExpertiseSection';
import { WorkWithUsForm } from '@/components/solutions/WorkWithUsForm';
import { SubPageViews } from '@/components/solutions/SubPageViews';
import { SolutionsFooter } from '@/components/solutions/SolutionsFooter';
import type { LocaleOption } from '@/data/solutionsData';

function SolutionsPortalContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') || 'solutions-home';

  const [activePageId, setActivePageId] = useState<string>(initialView);
  const [activeLocale, setActiveLocale] = useState<string>('us-en');

  useEffect(() => {
    const view = searchParams.get('view');
    if (view && view !== activePageId) {
      setActivePageId(view);
    }
  }, [searchParams]);

  const handleNavigate = (pageId: string) => {
    setActivePageId(pageId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (pageId === 'solutions-home') {
        url.searchParams.delete('view');
      } else {
        url.searchParams.set('view', pageId);
      }
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToContact = () => {
    if (activePageId !== 'solutions-home') {
      setActivePageId('solutions-home');
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('view');
        window.history.pushState({}, '', url.toString());
      }
      setTimeout(() => {
        document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLocale = (loc: LocaleOption) => {
    setActiveLocale(loc.code);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#081C31]">
      <SolutionsNavbar
        activePageId={activePageId}
        activeLocale={activeLocale}
        onNavigate={handleNavigate}
        onSelectLocale={handleSelectLocale}
      />

      <main id="main-content" className="flex-1">
        {activePageId === 'solutions-home' ? (
          <>
            <SolutionsHero onFindSolution={handleGoToContact} />
            <WorkforceSolutionsSection onNavigate={handleNavigate} />
            <HealthSafetySection />
            <WorkforceExpertiseSection onNavigate={handleNavigate} />
            <WorkWithUsForm />
          </>
        ) : (
          <SubPageViews
            pageId={activePageId}
            onBackToSolutions={() => handleNavigate('solutions-home')}
            onGoToContact={handleGoToContact}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <SolutionsFooter onNavigate={handleNavigate} />
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#001C36] text-white">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-4 border-[#F09200] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-semibold text-lg text-slate-200">Loading Solutions Portal...</p>
          </div>
        </div>
      }
    >
      <SolutionsPortalContent />
    </Suspense>
  );
}
