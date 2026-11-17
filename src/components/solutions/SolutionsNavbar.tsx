'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Globe, Menu, X } from 'lucide-react';
import { OperateServicesLogo } from '@/components/OperateServicesLogo';
import {
  LOCALE_OPTIONS,
  MAIN_NAV_MENUS,
  TOP_UTILITY_LINKS,
  type LocaleOption,
  type TopNavMenu,
} from '@/data/solutionsData';

interface SolutionsNavbarProps {
  activePageId: string;
  activeLocale: string;
  onNavigate: (pageId: string) => void;
  onSelectLocale: (locale: LocaleOption) => void;
}

export function SolutionsNavbar({
  activePageId,
  activeLocale,
  onNavigate,
  onSelectLocale,
}: SolutionsNavbarProps) {
  const [openMenuId, setOpenMenuId] = useState<TopNavMenu['id'] | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>('solutions');
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const hoverOpenedRef = useRef<{ id: TopNavMenu['id'] | null; ts: number }>({ id: null, ts: 0 });

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

  const handleNavTriggerClick = (menuId: TopNavMenu['id']) => {
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

  const handleLeafSelect = (targetId: string) => {
    setOpenMenuId(null);
    setLangOpen(false);
    setMobileOpen(false);
    onNavigate(targetId);
  };

  const handleUtilityClick = (id: string) => {
    setOpenMenuId(null);
    setLangOpen(false);
    setMobileOpen(false);
    if (id === 'contact-us') {
      if (activePageId !== 'solutions-home') {
        onNavigate('solutions-home');
        setTimeout(() => {
          document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onNavigate(id);
  };

  const activeMegaMenu = MAIN_NAV_MENUS.find((m) => m.id === openMenuId) || null;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/90 shadow-xs"
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
          <div className="flex items-center gap-6 shrink-0">
            <Link
              href="/"
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00558C] rounded-sm shrink-0"
              aria-label="OperateServices Home"
            >
              <OperateServicesLogo variant="dark" />
            </Link>
            <button
              type="button"
              onClick={() => handleLeafSelect('solutions-home')}
              className="hidden xl:inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#00558C] bg-sky-50 px-3 py-1 rounded-full border border-sky-200 hover:bg-sky-100 transition-colors cursor-pointer"
            >
              Solutions Portal
            </button>
          </div>

          {/* Desktop 2-Tier Utility + Mega-Menu Navigation */}
          <nav className="hidden lg:flex flex-col items-end justify-center gap-2.5" aria-label="Primary Navigation">
            {/* Top Utility Row */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-[11px] font-semibold tracking-wider uppercase text-[#081C31] underline underline-offset-4 decoration-[#081C31]/60 hover:text-[#00558C] hover:decoration-[#00558C] transition-colors whitespace-nowrap shrink-0"
              >
                MAIN SITE HOME
              </Link>
              {TOP_UTILITY_LINKS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleUtilityClick(item.id)}
                  className="text-[11px] font-semibold tracking-wider uppercase text-[#081C31] underline underline-offset-4 decoration-[#081C31]/60 hover:text-[#00558C] hover:decoration-[#00558C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleUtilityClick('job-seeker')}
                className="ml-1 px-4 py-1.5 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-[#475569] text-[11px] font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                I&apos;M A JOB SEEKER
              </button>
            </div>

            {/* Bottom Main Mega-Menu Row */}
            <div className="flex items-center gap-8">
              {MAIN_NAV_MENUS.map((menu) => {
                const isOpen = openMenuId === menu.id;
                const isSolutionsActive =
                  menu.id === 'solutions' && activePageId === 'solutions-home';
                return (
                  <button
                    key={menu.id}
                    type="button"
                    aria-expanded={isOpen}
                    onMouseEnter={() => {
                      cancelClose();
                      setLangOpen(false);
                      hoverOpenedRef.current = { id: menu.id, ts: Date.now() };
                      setOpenMenuId(menu.id);
                    }}
                    onClick={() => handleNavTriggerClick(menu.id)}
                    className={`inline-flex items-center gap-1.5 py-1 text-[14px] font-semibold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isOpen || isSolutionsActive
                        ? 'text-[#00558C]'
                        : 'text-[#081C31] hover:text-[#00558C]'
                    }`}
                  >
                    <span>{menu.label}</span>
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
                    )}
                  </button>
                );
              })}

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
                  <Globe className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
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
                                onSelectLocale(loc);
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
              onClick={() => handleUtilityClick('job-seeker')}
              className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#334155] text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap"
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="p-2 rounded text-[#081C31] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega-Menu Dropdown Panel */}
      {activeMegaMenu && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full z-40 px-6 sm:px-10"
          onMouseEnter={cancelClose}
        >
          <div
            className={`${
              activeMegaMenu.columns.length <= 2
                ? 'max-w-[760px] ml-auto mr-12 rounded-xl border border-slate-200/80 shadow-[0_22px_50px_rgba(2,26,50,0.20)]'
                : 'max-w-[1400px] mx-auto rounded-b-xl border-t border-slate-100 shadow-[0_22px_50px_rgba(2,26,50,0.22)]'
            } bg-white px-10 py-8`}
          >
            <h2 className="font-display text-[22px] font-bold tracking-wide text-[#00558C] uppercase mb-6">
              {activeMegaMenu.title}
            </h2>
            <div
              className={`grid gap-0 ${
                activeMegaMenu.columns.length === 4
                  ? 'grid-cols-4'
                  : activeMegaMenu.columns.length === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2 max-w-[680px]'
              }`}
            >
              {activeMegaMenu.columns.map((col, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx > 0 ? 'border-l border-slate-200 pl-8' : 'pr-6'
                  } ${idx < activeMegaMenu.columns.length - 1 ? 'pr-6' : ''}`}
                >
                  {col.heading && (
                    <button
                      type="button"
                      onClick={() => handleLeafSelect(col.heading!.id)}
                      className="block text-left text-[15px] font-bold text-[#081C31] hover:text-[#00558C] transition-colors mb-3 cursor-pointer"
                    >
                      {col.heading.label}
                    </button>
                  )}
                  {col.items.length > 0 && (
                    <ul className="space-y-3">
                      {col.items.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleLeafSelect(item.id)}
                            className={`text-left text-[14px] leading-snug transition-colors cursor-pointer ${
                              col.heading
                                ? 'font-normal text-[#475569] hover:text-[#00558C]'
                                : 'font-bold text-[#081C31] hover:text-[#00558C]'
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
          <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-slate-200">
            <Link
              href="/"
              className="text-left px-3 py-2.5 rounded bg-sky-50 text-[12px] font-semibold uppercase tracking-wide text-[#00558C] hover:bg-sky-100"
            >
              Main Site Home
            </Link>
            {TOP_UTILITY_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleUtilityClick(item.id)}
                className="text-left px-3 py-2.5 rounded bg-slate-50 text-[12px] font-semibold uppercase tracking-wide text-[#081C31] hover:bg-slate-100"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {MAIN_NAV_MENUS.map((menu) => {
              const expanded = mobileExpanded === menu.id;
              return (
                <div key={menu.id} className="border-b border-slate-100 pb-2">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileExpanded(expanded ? null : menu.id)}
                    className="w-full flex items-center justify-between py-2.5 text-[14px] font-bold uppercase tracking-wide text-[#081C31]"
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
                            <button
                              type="button"
                              onClick={() => handleLeafSelect(col.heading!.id)}
                              className="block text-left text-[14px] font-bold text-[#00558C]"
                            >
                              {col.heading.label}
                            </button>
                          )}
                          {col.items.length > 0 && (
                            <ul className="space-y-1.5 pl-2 border-l border-slate-200">
                              {col.items.map((leaf) => (
                                <li key={leaf.id}>
                                  <button
                                    type="button"
                                    onClick={() => handleLeafSelect(leaf.id)}
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
                      onSelectLocale(loc);
                      setMobileOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold ${
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
