'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  INSIGHTS_DATA,
  SERVICES_DATA,
  SPECIALIZATIONS_DATA,
} from '@/data/careerPortalData';
import { ContactFormValues, SpecializationCategory } from '@/types/career';
import { validateContactForm } from '@/utils/careerFilters';

export interface ActiveModalState {
  topic: 'specialization' | 'service' | 'insights' | 'contractor-login' | 'contact';
  slug?: string;
}

interface CareerResourceModalsProps {
  modal: ActiveModalState | null;
  onClose: () => void;
  onSearchSpecialization?: (spec: SpecializationCategory) => void;
}

export const CareerResourceModals: React.FC<CareerResourceModalsProps> = ({
  modal,
  onClose,
  onSearchSpecialization,
}) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginStatus, setLoginStatus] = useState<string | null>(null);

  const [contactForm, setContactForm] = useState<ContactFormValues>({
    fullName: '',
    email: '',
    companyOrTopic: '',
    inquiryType: 'Job Seeker Support',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [contactSent, setContactSent] = useState(false);

  if (!modal) return null;

  const specDetail =
    modal.topic === 'specialization'
      ? SPECIALIZATIONS_DATA.find((s) => s.slug === modal.slug) ??
        SPECIALIZATIONS_DATA[0]
      : null;

  const serviceDetail =
    modal.topic === 'service'
      ? SERVICES_DATA.find((s) => s.slug === modal.slug) ?? SERVICES_DATA[0]
      : null;

  const insightArticle =
    modal.topic === 'insights'
      ? INSIGHTS_DATA.find((a) => a.slug === modal.slug) ?? INSIGHTS_DATA[0]
      : null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim()) || loginPass.length < 4) {
      setLoginStatus('Enter your registered OperateServices email and password (4+ characters).');
      return;
    }
    setLoginStatus(
      `Verification code sent to ${loginEmail.trim()}. Check your inbox to open your timesheet & W-2 portal.`
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateContactForm(contactForm);
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    setContactErrors({});
    setContactSent(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="OperateServices information dialog"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto">
        {/* Specialization Role Guide */}
        {specDetail && (
          <>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-[#00558C] font-semibold">
                  OperateServices Specialization · {specDetail.openCount} open jobs
                </p>
                <h2 className="font-display font-bold text-xl text-[#081C31] mt-1">
                  {specDetail.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="py-5 space-y-5 text-sm text-slate-700 leading-relaxed">
              <p>{specDetail.description}</p>
              <div>
                <h3 className="font-display font-bold text-sm text-[#081C31] mb-2">
                  High-Demand Roles
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {specDetail.roles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00558C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[#081C31]">Safety &amp; Certification Focus</div>
                  <p className="text-xs text-slate-600 mt-1">{specDetail.safetyFocus}</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-[#081C31] hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onSearchSpecialization) {
                    onSearchSpecialization(specDetail.title);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-semibold transition-colors"
              >
                <span>Search {specDetail.title} Jobs</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </>
        )}

        {/* Services Detail */}
        {serviceDetail && (
          <>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-semibold text-[#00558C]">
                  OperateServices Employer Solutions
                </p>
                <h2 className="font-display font-bold text-xl text-[#081C31] mt-1">
                  {serviceDetail.title}
                </h2>
                <p className="text-sm text-slate-600 mt-0.5">{serviceDetail.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="py-5 space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>{serviceDetail.description}</p>
              <div>
                <h3 className="font-display font-bold text-sm text-[#081C31] mb-2">
                  Program Deliverables
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  {serviceDetail.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#081C31] text-white text-sm font-semibold hover:bg-[#002D5A] transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}

        {/* Career Insights Article */}
        {insightArticle && (
          <>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-[#00558C]">{insightArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{insightArticle.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{insightArticle.date}</span>
                </div>
                <h2 className="font-display font-bold text-xl text-[#081C31] mt-1">
                  {insightArticle.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="py-5 space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-[#081C31]">{insightArticle.summary}</p>
              {insightArticle.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#081C31] text-white text-sm font-semibold hover:bg-[#002D5A] transition-colors"
              >
                Done Reading
              </button>
            </div>
          </>
        )}

        {/* Contractor Login Portal */}
        {modal.topic === 'contractor-login' && (
          <>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-semibold text-[#00558C]">
                  Contractor Resources &amp; Timecards
                </p>
                <h2 className="font-display font-bold text-xl text-[#081C31] mt-1">
                  OperateServices Contractor Portal Sign In
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="py-5 space-y-4">
              <p className="text-sm text-slate-600">
                Access weekly e-Timecard submission, direct deposit pay stubs, W-2 tax forms, and benefit enrollment.
              </p>
              <div>
                <label htmlFor="contractor-email" className="block text-xs font-medium text-slate-700 mb-1">
                  Registered Email
                </label>
                <input
                  id="contractor-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-[#081C31] focus:outline-[#00558C]"
                />
              </div>
              <div>
                <label htmlFor="contractor-pass" className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  id="contractor-pass"
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-[#081C31] focus:outline-[#00558C]"
                />
              </div>
              {loginStatus && (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-[#081C31]">
                  {loginStatus}
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>256-bit encrypted session</span>
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#081C31] hover:bg-[#002D5A] text-white text-sm font-semibold transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
          </>
        )}

        {/* Contact Us Inquiry */}
        {modal.topic === 'contact' && (
          <>
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-semibold text-[#00558C]">
                  OperateServices Support &amp; Recruiting Desk
                </p>
                <h2 className="font-display font-bold text-xl text-[#081C31] mt-1">
                  Contact Us
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            {contactSent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#00558C] mx-auto" aria-hidden="true" />
                <h3 className="font-display font-bold text-lg text-[#081C31]">
                  Inquiry Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {contactForm.fullName}. Your message has been routed to our {contactForm.inquiryType} team.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSent(false);
                    onClose();
                  }}
                  className="mt-2 px-5 py-2 rounded-lg bg-[#081C31] text-white text-sm font-semibold hover:bg-[#002D5A] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="py-5 space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={contactForm.fullName}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, fullName: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-[#00558C]"
                    />
                    {contactErrors.fullName && (
                      <p className="text-xs text-red-600 mt-1">{contactErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-[#00558C]"
                    />
                    {contactErrors.email && (
                      <p className="text-xs text-red-600 mt-1">{contactErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-type" className="block text-xs font-medium text-slate-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-type"
                    value={contactForm.inquiryType}
                    onChange={(e) =>
                      setContactForm((f) => ({
                        ...f,
                        inquiryType: e.target.value as ContactFormValues['inquiryType'],
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-[#00558C]"
                  >
                    <option value="Job Seeker Support">Job Seeker Support</option>
                    <option value="Employer Staffing Inquiry">Employer Staffing Inquiry</option>
                    <option value="Contractor Payroll & Benefits">Contractor Payroll &amp; Benefits</option>
                    <option value="Media & Community">Media &amp; Community</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-medium text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Share your location, trade specialization, or staffing question..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-[#00558C]"
                  />
                  {contactErrors.message && (
                    <p className="text-xs text-red-600 mt-1">{contactErrors.message}</p>
                  )}
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-[#081C31] hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-semibold transition-colors"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
