'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { JobSearchSection } from '@/components/JobSearchSection';
import { SolutionsBand } from '@/components/SolutionsBand';
import { ExpertiseSection } from '@/components/ExpertiseSection';
import { InsightsSection } from '@/components/InsightsSection';
import { PartnershipSection } from '@/components/PartnershipSection';
import { Footer } from '@/components/Footer';
import {
  InfoDrawerModal,
  InsightReaderModal,
  JobApplicationModal,
  SolutionsInquiryModal,
  VideoShowcaseModal,
} from '@/components/Modals';
import { INSIGHTS_DATA, JOBS_DATA, type InsightArticle } from '@/data/operateServicesData';
import { filterJobs, type JobPosting } from '@/utils/jobs';

export default function HomePage() {
  const router = useRouter();
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showJobResults, setShowJobResults] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  const [activeJobModal, setActiveJobModal] = useState<JobPosting | null>(null);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState<InsightArticle | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [infoMode, setInfoMode] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const filteredJobs = useMemo(
    () =>
      filterJobs(JOBS_DATA, {
        keywords,
        location,
        category: selectedCategory,
      }),
    [keywords, location, selectedCategory]
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const revealJobResults = () => {
    setShowJobResults(true);
    setTimeout(() => {
      const panel = document.querySelector('[data-testid="job-results-panel"]');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 80);
  };

  const focusJobSearch = (openList = true) => {
    if (openList) {
      setShowJobResults(true);
    }
    scrollToSection('job-search');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 350);
  };

  const handleQuickRoleClick = (role: string) => {
    setKeywords(role);
    setSelectedCategory('All');
    revealJobResults();
  };

  const handleClearFilters = () => {
    setKeywords('');
    setLocation('');
    setSelectedCategory('All');
    revealJobResults();
  };

  const handleApplicationSubmitted = (jobId: string) => {
    setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#081C31]">
      <Header
        onNavigateSection={scrollToSection}
        onOpenLocations={() => setInfoMode('locations')}
        onOpenAbout={() => setInfoMode('about')}
        onOpenSearchJobs={() => focusJobSearch(true)}
        onOpenContact={() => setSolutionsOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setKeywords('');
          revealJobResults();
          scrollToSection('job-search');
        }}
      />

      <main className="flex-1">
        <HeroSection
          onExploreSolutions={() => router.push('/solutions')}
          onFindJob={() => focusJobSearch(true)}
        />

        <JobSearchSection
          keywords={keywords}
          location={location}
          selectedCategory={selectedCategory}
          showResults={showJobResults}
          filteredJobs={filteredJobs}
          appliedJobIds={appliedJobIds}
          searchInputRef={searchInputRef}
          onKeywordsChange={setKeywords}
          onLocationChange={setLocation}
          onCategoryChange={setSelectedCategory}
          onSearchSubmit={revealJobResults}
          onQuickRoleClick={handleQuickRoleClick}
          onBrowseAll={() => {
            setKeywords('');
            setLocation('');
            setSelectedCategory('All');
            revealJobResults();
          }}
          onClearFilters={handleClearFilters}
          onApplyJob={(job) => setActiveJobModal(job)}
        />

        <SolutionsBand onExploreSolutions={() => router.push('/solutions')} />

        <ExpertiseSection
          onLearnMore={() => setInfoMode('about')}
          onPlayVideo={() => setVideoOpen(true)}
        />

        <InsightsSection
          onSelectArticle={(article) => setActiveInsight(article)}
          onViewAllInsights={() => setActiveInsight(INSIGHTS_DATA[0])}
        />

        <PartnershipSection />
      </main>

      <Footer
        onOpenLocations={() => setInfoMode('locations')}
        onOpenAbout={() => setInfoMode('about')}
        onOpenPolicy={(title) => setInfoMode(title)}
        onNavigateSection={scrollToSection}
      />

      <JobApplicationModal
        job={activeJobModal}
        onClose={() => setActiveJobModal(null)}
        onSubmitted={handleApplicationSubmitted}
      />

      <SolutionsInquiryModal
        open={solutionsOpen}
        onClose={() => setSolutionsOpen(false)}
      />

      <InsightReaderModal
        article={activeInsight}
        onSelectArticle={(article) => setActiveInsight(article)}
        onClose={() => setActiveInsight(null)}
      />

      <VideoShowcaseModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <InfoDrawerModal
        mode={infoMode}
        onClose={() => setInfoMode(null)}
        onExploreSolutions={() => setSolutionsOpen(true)}
      />
    </div>
  );
}
