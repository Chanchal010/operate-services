'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Globe, Menu, X } from 'lucide-react';
import { OperateServicesLogo } from './OperateServicesLogo';
import {
  LOCALE_OPTIONS,
  type LocaleOption,
} from '@/data/solutionsData';

export interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
  onOpenLocations?: () => void;
  onOpenAbout?: () => void;
  onOpenSearchJobs?: () => void;
  onOpenContact?: () => void;
  onSelectCategory?: (category: string) => void;
}

type MenuKey = 'career-paths' | 'specializations' | 'insights' | 'about';

interface NavColumn {
  heading?: string;
  items: {
    id: string;
    label: string;
    category?: string;
    keyword?: string;
    view?: string;
  }[];
}

interface MenuDefinition {
  id: MenuKey;
  label: string;
  title: string;
  columns: NavColumn[];
}

const MENUS_CONFIG: MenuDefinition[] = [
  {
    id: 'career-paths',
    label: 'CAREER PATHS',
    title: 'CAREER PATHS',
    columns: [
      {
        heading: 'Skilled Trades',
        items: [
          { id: 'maint-tech', label: 'Industrial Maintenance Technician', keyword: 'Maintenance Mechanic', category: 'Skilled Trades' },
          { id: 'cnc-mach', label: 'CNC Machinist & Toolmaker', keyword: 'CNC', category: 'Manufacturing' },
          { id: 'welder', label: 'MIG / TIG Welder & Fabricator', keyword: 'Welder', category: 'Skilled Trades' },
          { id: 'electrician', label: 'Licensed Electrician & Journeyman', keyword: 'Electrician', category: 'Skilled Trades' },
        ],
      },
      {
        heading: 'Operations & Logistics',
        items: [
          { id: 'warehouse', label: 'Warehouse & Fulfillment Specialist', keyword: 'Warehouse', category: 'Distribution & Logistics' },
          { id: 'assembly', label: 'Manufacturing & Assembly Operator', keyword: 'Assembler', category: 'Manufacturing' },
          { id: 'heavy-equip', label: 'Heavy Equipment Operator', keyword: 'Equipment', category: 'Construction' },
          { id: 'aviation-mech', label: 'A&P Aviation Maintenance Mechanic', keyword: 'Aviation', category: 'Aviation' },
        ],
      },
    ],
  },
  {
    id: 'specializations',
    label: 'SPECIALIZATIONS',
    title: 'SPECIALIZATIONS',
    columns: [
      {
        items: [
          { id: 'aviation-jobs', label: 'Aviation & Airport Operations Jobs', category: 'Aviation' },
          { id: 'construction-jobs', label: 'Construction Jobs', category: 'Construction' },
          { id: 'distribution-jobs', label: 'Distribution & Logistics Jobs', category: 'Distribution & Logistics' },
        ],
      },
      {
        items: [
          { id: 'facilities-jobs', label: 'Facilities & Maintenance Jobs', category: 'Facilities & Maintenance' },
          { id: 'manufacturing-jobs', label: 'Manufacturing & Production Jobs', category: 'Manufacturing' },
        ],
      },
    ],
  },
  {
    id: 'insights',
    label: 'INSIGHTS',
    title: 'INSIGHTS',
    columns: [
      {
        heading: 'Careers',
        items: [
          { id: 'advancing-your-career', label: 'Advancing Your Career', view: 'advancing-your-career' },
          { id: 'how-to-get-a-job', label: 'How to Get a Job', view: 'how-to-get-a-job' },
        ],
      },
      {
        heading: 'Solutions',
        items: [
          { id: 'workplace-management', label: 'Workforce Management', view: 'workplace-management' },
          { id: 'how-to-hire', label: 'How to Hire', view: 'how-to-hire' },
          { id: 'market-trends', label: 'Market Trends', view: 'market-trends' },
          { id: 'white-papers', label: 'White Papers', view: 'white-papers' },
          { id: 'case-studies', label: 'Case Studies', view: 'case-studies' },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'ABOUT US',
    title: 'ABOUT US',
    columns: [
      {
        heading: 'News & Events',
        items: [
          { id: 'news', label: 'News', view: 'news' },
          { id: 'operateservices-in-the-media', label: 'OperateServices in the Media', view: 'operateservices-in-the-media' },
        ],
      },
      {
        items: [
          { id: 'diversity-equity-inclusion', label: 'Diversity, Equity and Inclusion', view: 'diversity-equity-inclusion' },
          { id: 'corporate-social-responsibility', label: 'Corporate Social Responsibility', view: 'corporate-social-responsibility' },
          { id: 'leadership', label: 'Leadership', view: 'leadership' },
          { id: 'military-affairs', label: 'Military Affairs', view: 'military-affairs' },
        ],
      },
    ],
  },
];

export function Header({
  onNavigateSection,
  onOpenLocations,
  onOpenAbout,
  onOpenSearchJobs,
  onOpenContact,
  onSelectCategory,
}: HeaderProps) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<MenuKey | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLocale, setActiveLocale] = useState('us-en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const hoverOpenedRef = useRef<{ id: string | null; ts: number }>({ id: null, ts: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenuId(null);
        setLangOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
        setLangOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenuId(null);
    }, 180);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleNavTriggerClick = (menuId: MenuKey) => {
    setLangOpen(false);
    setOpenMenuId((prev) => {
      if (
        prev === menuId &&
        hoverOpenedRef.current.id === menuId &&
        Date.now() - hoverOpenedRef.current.ts < 500
      ) {
        return menuId;
      }
      return prev === menuId ? null : menuId;
    });
  };

  const handleItemSelect = (item: { id: string; category?: string; keyword?: string; view?: string }) => {
    setOpenMenuId(null);
    setLangOpen(false);
    setMobileOpen(false);

    if (item.keyword) {
      router.push(`/jobs?keyword=${encodeURIComponent(item.keyword)}`);
      return;
    }

    if (item.category) {
      if (onSelectCategory) {
        onSelectCategory(item.category);
      } else {
        router.push(`/jobs?specialization=${encodeURIComponent(item.category)}`);
      }
      return;
    }

    if (item.view) {
      const aboutViews = [
        'news',
        'operateservices-in-the-media',
        'diversity-equity-inclusion',
        'corporate-social-responsibility',
        'leadership',
        'military-affairs',
      ];
      if (aboutViews.includes(item.view)) {
        router.push(`/about-us#${item.view}`);
        return;
      }
      router.push(`/solutions?view=${item.view}`);
      return;
    }

    router.push(`/solutions?view=${item.id}`);
  };

  const handleUtilityAction = (actionId: 'locations' | 'contact' | 'contractor-login' | 'employer') => {
    setOpenMenuId(null);
    setLangOpen(false);
    setMobileOpen(false);

    if (actionId === 'locations') {
      if (onOpenLocations) {
        onOpenLocations();
      } else {
        router.push('/locations');
      }
      return;
    }
    if (actionId === 'contact') {
      if (onOpenContact) {
        onOpenContact();
      } else {
        router.push('/solutions#contactus');
      }
      return;
    }
    if (actionId === 'contractor-login') {
      router.push('/careers#contractors');
      return;
    }
    if (actionId === 'employer') {
      router.push('/solutions');
      return;
    }
  };

  const activeMegaMenu = MENUS_CONFIG.find((m) => m.id === openMenuId) || null;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 bg-[#001C36] text-white px-3 py-1.5 rounded text-xs font-semibold"
      >
        Skip to Content
      </a>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-22 lg:h-24">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => {
              setOpenMenuId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00558C] rounded-sm shrink-0"
            aria-label="OperateServices Home"
          >
            <OperateServicesLogo variant="dark" />
          </Link>

          {/* Desktop 2-Tier Navigation (Exact Screenshot Layout) */}
          <nav
            className="hidden lg:flex flex-col items-end justify-center gap-2.5"
            aria-label="Primary Navigation"
          >
            {/* Top Utility Row */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => handleUtilityAction('locations')}
                className="text-[11px] font-semibold tracking-wider uppercase text-[#081C31] underline underline-offset-4 decoration-[#081C31]/60 hover:text-[#00558C] hover:decoration-[#00558C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                LOCATIONS
              </button>
              <button
                type="button"
                onClick={() => handleUtilityAction('contact')}
                className="text-[11px] font-semibold tracking-wider uppercase text-[#081C31] underline underline-offset-4 decoration-[#081C31]/60 hover:text-[#00558C] hover:decoration-[#00558C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                CONTACT US
              </button>
              <button
                type="button"
                onClick={() => handleUtilityAction('contractor-login')}
                className="text-[11px] font-semibold tracking-wider uppercase text-[#081C31] underline underline-offset-4 decoration-[#081C31]/60 hover:text-[#00558C] hover:decoration-[#00558C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                CONTRACTOR LOGIN
              </button>
              <button
                type="button"
                onClick={() => handleUtilityAction('employer')}
                className="ml-1 px-4 py-1.5 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-[#475569] hover:text-[#081C31] text-[11px] font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                I&apos;M AN EMPLOYER
              </button>
            </div>

            {/* Bottom Main Navigation Row */}
            <div className="flex items-center gap-8">
              {/* SEARCH JOBS */}
              <button
                type="button"
                onClick={() => {
                  setOpenMenuId(null);
                  if (onOpenSearchJobs) {
                    onOpenSearchJobs();
                  } else {
                    router.push('/jobs');
                  }
                }}
                className="py-1 text-[14px] font-bold tracking-wide uppercase text-[#081C31] hover:text-[#00558C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                SEARCH JOBS
              </button>

              {/* CAREER PATHS Dropdown */}
              <button
                type="button"
                aria-expanded={openMenuId === 'career-paths'}
                onMouseEnter={() => {
                  cancelClose();
                  setLangOpen(false);
                  hoverOpenedRef.current = { id: 'career-paths', ts: Date.now() };
                  setOpenMenuId('career-paths');
                }}
                onClick={() => handleNavTriggerClick('career-paths')}
                className={`inline-flex items-center gap-1.5 py-1 text-[14px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  openMenuId === 'career-paths' ? 'text-[#00558C]' : 'text-[#081C31] hover:text-[#00558C]'
                }`}
              >
                <span>CAREER PATHS</span>
                {openMenuId === 'career-paths' ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                )}
              </button>

              {/* SPECIALIZATIONS Dropdown */}
              <button
                type="button"
                aria-expanded={openMenuId === 'specializations'}
                onMouseEnter={() => {
                  cancelClose();
                  setLangOpen(false);
                  hoverOpenedRef.current = { id: 'specializations', ts: Date.now() };
                  setOpenMenuId('specializations');
                }}
                onClick={() => handleNavTriggerClick('specializations')}
                className={`inline-flex items-center gap-1.5 py-1 text-[14px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  openMenuId === 'specializations' ? 'text-[#00558C]' : 'text-[#081C31] hover:text-[#00558C]'
                }`}
              >
                <span>SPECIALIZATIONS</span>
                {openMenuId === 'specializations' ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                )}
              </button>

              {/* SOLUTIONS Link */}
              <Link
                href="/solutions"
                onClick={() => setOpenMenuId(null)}
                className="py-1 text-[14px] font-bold tracking-wide uppercase text-[#081C31] hover:text-[#00558C] transition-colors whitespace-nowrap shrink-0"
              >
                SOLUTIONS
              </Link>

              {/* INSIGHTS Dropdown */}
              <button
                type="button"
                aria-expanded={openMenuId === 'insights'}
                onMouseEnter={() => {
                  cancelClose();
                  setLangOpen(false);
                  hoverOpenedRef.current = { id: 'insights', ts: Date.now() };
                  setOpenMenuId('insights');
                }}
                onClick={() => handleNavTriggerClick('insights')}
                className={`inline-flex items-center gap-1.5 py-1 text-[14px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  openMenuId === 'insights' ? 'text-[#00558C]' : 'text-[#081C31] hover:text-[#00558C]'
                }`}
              >
                <span>INSIGHTS</span>
                {openMenuId === 'insights' ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                )}
              </button>

              {/* ABOUT US Dropdown */}
              <button
                type="button"
                aria-expanded={openMenuId === 'about'}
                onMouseEnter={() => {
                  cancelClose();
                  setLangOpen(false);
                  hoverOpenedRef.current = { id: 'about', ts: Date.now() };
                  setOpenMenuId('about');
                }}
                onClick={() => handleNavTriggerClick('about')}
                className={`inline-flex items-center gap-1.5 py-1 text-[14px] font-bold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  openMenuId === 'about' ? 'text-[#00558C]' : 'text-[#081C31] hover:text-[#00558C]'
                }`}
              >
                <span>ABOUT US</span>
                {openMenuId === 'about' ? (
                  <ChevronUp className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.4]" aria-hidden="true" />
                )}
              </button>

              {/* Language / Region Globe Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  aria-label="Language selection"
                  aria-expanded={langOpen}
                  onClick={() => {
                    setOpenMenuId(null);
                    setLangOpen((prev) => !prev);
                  }}
                  className="p-1.5 text-[#081C31] hover:text-[#00558C] transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-[#00558C] cursor-pointer"
                >
                  <Globe className="w-5 h-5 stroke-[1.8]" aria-hidden="true" />
                </button>

                {langOpen && (
                  <div
                    role="menu"
                    aria-label="Language and region options"
                    className="absolute right-0 mt-3 w-64 bg-white rounded-md shadow-[0_14px_40px_rgba(2,26,50,0.16)] border border-slate-100 py-5 px-6 z-50"
                  >
                    <ul className="divide-y divide-slate-200">
                      {LOCALE_OPTIONS.map((loc) => {
                        const isSelected = activeLocale === loc.code;
                        return (
                          <li key={loc.code} className="py-3 first:pt-1 last:pb-1">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveLocale(loc.code);
                                setLangOpen(false);
                              }}
                              className="w-full flex items-center justify-between text-left group cursor-pointer"
                            >
                              <span className="text-[13px] font-medium text-[#334155] group-hover:text-[#00558C] transition-colors">
                                {loc.country}
                              </span>
                              <span
                                className={`text-[12px] font-bold tracking-wider px-3.5 py-1.5 rounded-sm transition-colors ${
                                  isSelected
                                    ? 'bg-[#001C36] text-white'
                                    : 'text-[#001C36] group-hover:bg-slate-100'
                                }`}
                              >
                                {loc.lang}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => handleUtilityAction('employer')}
              className="px-3.5 py-1.5 rounded-full bg-[#F3F4F6] text-[#081C31] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xs"
            >
              Employer
            </button>
            <button
              type="button"
              onClick={() => onOpenSearchJobs()}
              className="px-3.5 py-1.5 rounded-full bg-[#001C36] text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xs"
            >
              Jobs
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="p-2 rounded-lg text-[#081C31] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Dropdown Mega-Menu (Matches SPECIALIZATIONS & other options from screenshot) */}
      {activeMegaMenu && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full z-40 px-6 sm:px-10"
          onMouseEnter={cancelClose}
        >
          <div className="max-w-[780px] ml-auto mr-10 bg-white shadow-[0_22px_50px_rgba(2,26,50,0.20)] border border-slate-200/80 rounded-xl px-10 py-8">
            <h3 className="font-display text-[20px] font-bold tracking-wide text-[#00558C] uppercase mb-6 border-b border-slate-100 pb-2">
              {activeMegaMenu.title}
            </h3>

            <div className="grid grid-cols-2 gap-8">
              {activeMegaMenu.columns.map((col, idx) => (
                <div
                  key={idx}
                  className={`${idx > 0 ? 'border-l border-slate-200 pl-8' : 'pr-4'}`}
                >
                  {col.heading && (
                    <div className="text-[15px] font-bold text-[#081C31] mb-3">
                      {col.heading}
                    </div>
                  )}

                  {col.items.length > 0 && (
                    <ul className="space-y-3">
                      {col.items.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleItemSelect(item)}
                            className={`block text-left text-[14px] leading-snug transition-colors cursor-pointer ${
                              col.heading
                                ? 'font-normal text-[#475569] hover:text-[#00558C]'
                                : 'font-semibold text-[#081C31] hover:text-[#00558C]'
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 max-h-[calc(100vh-80px)] overflow-y-auto px-6 py-5 space-y-5 shadow-xl">
          {/* Mobile Utility Row */}
          <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-slate-200">
            <button
              type="button"
              onClick={() => handleUtilityAction('locations')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 text-[12px] font-bold uppercase tracking-wider text-[#081C31] hover:bg-slate-100"
            >
              LOCATIONS
            </button>
            <button
              type="button"
              onClick={() => handleUtilityAction('contact')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 text-[12px] font-bold uppercase tracking-wider text-[#081C31] hover:bg-slate-100"
            >
              CONTACT US
            </button>
            <button
              type="button"
              onClick={() => handleUtilityAction('contractor-login')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 text-[12px] font-bold uppercase tracking-wider text-[#081C31] hover:bg-slate-100"
            >
              CONTRACTOR LOGIN
            </button>
            <button
              type="button"
              onClick={() => handleUtilityAction('employer')}
              className="text-left px-3 py-2.5 rounded-lg bg-sky-50 text-[12px] font-bold uppercase tracking-wider text-[#00558C] hover:bg-sky-100"
            >
              I&apos;M AN EMPLOYER
            </button>
          </div>

          {/* Main Links */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (onOpenSearchJobs) {
                  onOpenSearchJobs();
                } else {
                  router.push('/jobs');
                }
              }}
              className="w-full text-left py-2.5 text-[15px] font-bold uppercase tracking-wide text-[#081C31] hover:text-[#00558C] border-b border-slate-100 cursor-pointer"
            >
              SEARCH JOBS
            </button>

            {/* Accordions for CAREER PATHS, SPECIALIZATIONS, INSIGHTS, ABOUT US */}
            {MENUS_CONFIG.map((menu) => {
              const expanded = mobileExpanded === menu.id;
              return (
                <div key={menu.id} className="border-b border-slate-100 pb-2">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileExpanded(expanded ? null : menu.id)}
                    className="w-full flex items-center justify-between py-2.5 text-[15px] font-bold uppercase tracking-wide text-[#081C31]"
                  >
                    <span className={expanded ? 'text-[#00558C]' : ''}>{menu.label}</span>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4 text-[#00558C]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {expanded && (
                    <div className="pl-3 pt-1 pb-3 space-y-4">
                      {menu.columns.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-2">
                          {col.heading && (
                            <div className="text-[13px] font-bold uppercase tracking-wider text-[#00558C]">
                              {col.heading}
                            </div>
                          )}
                          {col.items.length > 0 && (
                            <ul className="space-y-2 pl-2 border-l border-slate-200">
                              {col.items.map((leaf) => (
                                <li key={leaf.id}>
                                  <button
                                    type="button"
                                    onClick={() => handleItemSelect(leaf)}
                                    className="block text-left py-1 text-[13px] text-[#334155] hover:text-[#00558C]"
                                  >
                                    {leaf.label}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/solutions"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left py-2.5 text-[15px] font-bold uppercase tracking-wide text-[#081C31] hover:text-[#00558C] border-b border-slate-100"
            >
              SOLUTIONS
            </Link>
          </div>

          {/* Mobile Region Selection */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Region &amp; Language
            </p>
            <div className="flex flex-wrap gap-2">
              {LOCALE_OPTIONS.map((loc) => {
                const isSelected = activeLocale === loc.code;
                return (
                  <button
                    key={loc.code}
                    type="button"
                    onClick={() => {
                      setActiveLocale(loc.code);
                      setMobileOpen(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold ${
                      isSelected
                        ? 'bg-[#001C36] text-white'
                        : 'bg-slate-100 text-[#081C31]'
                    }`}
                  >
                    {loc.country} ({loc.lang})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
