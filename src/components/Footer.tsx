'use client';

import { useRouter } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { OperateServicesLogo } from './OperateServicesLogo';

export interface FooterProps {
  onOpenLocations?: () => void;
  onOpenAbout?: () => void;
  onOpenPolicy?: (title: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export function Footer({
  onOpenLocations,
  onOpenAbout,
  onOpenPolicy,
  onNavigateSection,
}: FooterProps) {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLocationsClick = () => {
    if (onOpenLocations) {
      onOpenLocations();
    } else {
      router.push('/locations');
    }
  };

  const handleAboutClick = () => {
    if (onOpenAbout) {
      onOpenAbout();
    } else {
      router.push('/about-us');
    }
  };

  const handleNewsClick = () => {
    if (onNavigateSection) {
      onNavigateSection('insights');
    } else {
      router.push('/about-us#news');
    }
  };

  const handleContractorResourcesClick = () => {
    if (onOpenPolicy) {
      onOpenPolicy('Contractor Resources');
    } else {
      router.push('/careers#contractors');
    }
  };

  const handlePolicyClick = (policyTitle: string) => {
    if (onOpenPolicy) {
      onOpenPolicy(policyTitle);
    } else {
      router.push('/about-us');
    }
  };

  return (
    <footer className="relative bg-[#001C36] text-white pt-24 pb-16 lg:pt-32 lg:pb-20">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          <div className="md:col-span-4 flex flex-col justify-between gap-8">
            <div>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                aria-label="OperateServices Home"
              >
                <OperateServicesLogo variant="light" size="lg" />
              </a>
              <p className="mt-5 text-base text-slate-300 leading-relaxed max-w-sm">
                Our People Are Everything. Connecting specialized talent with leading industrial, manufacturing, logistics, and engineering employers across North America.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-3 text-sm font-semibold text-slate-200 hover:text-[#F09200] transition-colors cursor-pointer"
              >
                <span className="w-10 h-10 rounded-full bg-white text-[#001C36] flex items-center justify-center shadow-md">
                  <ArrowUp className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>Back to top</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-[#F09200]">
              Company
            </h3>
            <ul className="mt-5 space-y-3.5 text-[15px] text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={handleLocationsClick}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleNewsClick}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  News &amp; Events
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleContractorResourcesClick}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Contractor Resources
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleAboutClick}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  About OperateServices
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-[#F09200]">
              Website
            </h3>
            <ul className="mt-5 space-y-3.5 text-[15px] text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Labor Condition Applications (LCA)')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  LCA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Code of Conduct')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Code Of Conduct
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Terms & Conditions')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Privacy Notices')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Privacy Notices
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-[#F09200]">
              Compliance
            </h3>
            <ul className="mt-5 space-y-3.5 text-[15px] text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('CA Notice At Collection')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  CA Notice At Collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Cookie Notice')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Cookie Notice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Mandatory Notices')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Mandatory Notices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Accessibility Commitment')}
                  className="hover:text-white hover:underline underline-offset-4 cursor-pointer text-left"
                >
                  Accessibility
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
          <p>© 2026 OperateServices, Inc. All rights reserved.</p>
          <p>Equal Opportunity Employer · Minority / Female / Disability / Veteran</p>
        </div>
      </div>
    </footer>
  );
}
