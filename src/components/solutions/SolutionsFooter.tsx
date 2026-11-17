'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OperateServicesLogo } from '@/components/OperateServicesLogo';

interface SolutionsFooterProps {
  onNavigate: (pageId: string) => void;
}

export function SolutionsFooter({ onNavigate }: SolutionsFooterProps) {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  return (
    <footer className="bg-[#001427] text-white border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Logo & Main Link */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00558C] rounded-sm"
              aria-label="OperateServices Home"
            >
              <OperateServicesLogo variant="light" />
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Industrial staffing and scalable managed workforce services across North America. Connecting great people with great organizations.
            </p>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">
              COMPANY
            </p>
            <ul className="space-y-2.5 text-[14px] text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('locations')}
                  className="hover:text-[#F09200] transition-colors cursor-pointer"
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('news-and-events')}
                  className="hover:text-[#F09200] transition-colors cursor-pointer"
                >
                  News &amp; Events
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contractor-login')}
                  className="hover:text-[#F09200] transition-colors cursor-pointer"
                >
                  Contractor Resources
                </button>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F09200] transition-colors inline-block"
                >
                  Main Site Home
                </Link>
              </li>
            </ul>
          </div>

          {/* WEBSITE (2 columns) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">
              WEBSITE
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] text-slate-200">
              <div className="space-y-2.5">
                <div>
                  <button
                    type="button"
                    onClick={() => onNavigate('staffing-solutions')}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    LCA
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => onNavigate('corporate-social-responsibility')}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Code of Conduct
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setCookieModalOpen(true)}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Terms &amp; Conditions
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setCookieModalOpen(true)}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Privacy Notices
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <div>
                  <button
                    type="button"
                    onClick={() => setCookieModalOpen(true)}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Cookie Notice
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setCookieModalOpen(true)}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Mandatory Notices
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => onNavigate('solutions-home')}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Sitemap
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setCookieModalOpen(true)}
                    className="hover:text-[#F09200] transition-colors cursor-pointer text-left"
                  >
                    Cookie Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2 flex items-center md:justify-end gap-3.5">
            <a
              href="#facebook"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('news-and-events');
              }}
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-200 hover:border-[#F09200] hover:text-[#F09200] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
            </a>
            <a
              href="#linkedin"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('news-and-events');
              }}
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-200 hover:border-[#F09200] hover:text-[#F09200] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
              </svg>
            </a>
            <a
              href="#youtube"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('news-and-events');
              }}
              aria-label="YouTube"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-200 hover:border-[#F09200] hover:text-[#F09200] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77C2 8.77 2 12 2 12s0 3.23.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.23 22 12 22 12s0-3.23-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
              </svg>
            </a>
            <a
              href="#x"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('news-and-events');
              }}
              aria-label="X"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-200 hover:border-[#F09200] hover:text-[#F09200] transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 text-center text-[13px] text-slate-400 font-medium">
          &copy; 2026 OperateServices, Inc. All rights reserved.
        </div>
      </div>

      {cookieModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Privacy and Cookie Preferences"
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
        >
          <div className="bg-white text-[#081C31] rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h3 className="font-display text-2xl font-bold uppercase">
              Privacy &amp; Cookie Settings
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Manage your cookie preferences and review OperateServices&apos; privacy notice. Essential
              cookies remain active to support navigation and form submissions.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCookieModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-[#081C31] hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setCookieModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#F09200] text-[#001C36] text-xs font-bold hover:bg-[#d98300] cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
