'use client';

import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';
import {
  getAreaOfNeedOptions,
  validateWorkWithUsForm,
  type FormFieldErrors,
  type InquiryType,
  type WorkWithUsFormValues,
} from '@/utils/formValidation';

const INITIAL_VALUES: WorkWithUsFormValues = {
  inquiryType: '',
  areaOfNeed: '',
  firstName: '',
  lastName: '',
  company: '',
  postalCode: '',
  businessEmail: '',
  contactPhone: '',
  comments: '',
  emailOptIn: false,
  humanVerified: false,
};

export function WorkWithUsForm() {
  const [values, setValues] = useState<WorkWithUsFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [submittedData, setSubmittedData] = useState<WorkWithUsFormValues | null>(null);

  const areaOptions = getAreaOfNeedOptions(values.inquiryType);

  const handleInquiryChange = (nextType: InquiryType) => {
    setValues((prev) => ({
      ...prev,
      inquiryType: nextType,
      areaOfNeed: '',
    }));
    setErrors((prev) => ({
      ...prev,
      inquiryType: undefined,
      areaOfNeed: undefined,
    }));
  };

  const updateField = <K extends keyof WorkWithUsFormValues>(
    field: K,
    val: WorkWithUsFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateWorkWithUsForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedData(values);
  };

  return (
    <section
      id="contactus"
      className="bg-[#001C36] text-white py-24 sm:py-32"
      aria-labelledby="work-with-us-heading"
    >
      <div className="max-w-[880px] mx-auto px-6 sm:px-10">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#F09200]">
            GET IN TOUCH
          </p>
          <h2
            id="work-with-us-heading"
            className="mt-3 font-display text-[38px] sm:text-[46px] font-bold text-white leading-tight"
          >
            Work With Us
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.7] text-slate-200 max-w-[700px] mx-auto">
            Fill out the form below, and we&apos;ll reach out to talk through the challenges your
            team is facing and how you can solve them (whether you choose to partner with us or
            not).
          </p>
        </div>

        {submittedData ? (
          <div
            role="status"
            className="mt-12 rounded-2xl bg-[#06294D] border border-[#7CC0F2]/40 p-10 text-center shadow-2xl"
          >
            <CheckCircle2 className="w-16 h-16 text-[#F09200] mx-auto" aria-hidden="true" />
            <h3 className="mt-5 font-display text-[30px] font-bold text-white">
              Thank You, {submittedData.firstName}
            </h3>
            <p className="mt-3 text-[16px] text-slate-200 max-w-[560px] mx-auto leading-relaxed">
              Your inquiry for <strong>{submittedData.inquiryType}</strong> (
              {submittedData.areaOfNeed}) at <strong>{submittedData.company}</strong> has been
              received. A local OperateServices specialist will reach out to{' '}
              <span className="underline text-white font-semibold">{submittedData.businessEmail}</span> shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(INITIAL_VALUES);
                setSubmittedData(null);
              }}
              className="mt-8 px-8 py-3 rounded-full border-2 border-[#F09200] text-white hover:bg-[#F09200] hover:text-[#001C36] text-sm font-bold transition-all cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-12">
            <p className="text-center text-[13px] font-semibold text-slate-300 uppercase tracking-wider mb-8">
              All Fields Required
            </p>

            <div className="space-y-6">
              {/* Row 1: Inquiry Type & Area of Need */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="inquiry-type"
                    className="block text-[14px] font-semibold text-white mb-2"
                  >
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select
                      id="inquiry-type"
                      value={values.inquiryType}
                      onChange={(e) => handleInquiryChange(e.target.value as InquiryType)}
                      className="w-full appearance-none rounded-full bg-white text-[#081C31] text-[15px] font-medium px-5 py-3.5 pr-10 focus:outline-2 focus:outline-[#F09200] shadow-sm cursor-pointer"
                    >
                      <option value="">Please select...</option>
                      <option value="Staffing Needs">Staffing Needs</option>
                      <option value="Outsourced Services">Outsourced Services</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none w-5 h-5 text-[#081C31] absolute right-4 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.inquiryType && (
                    <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.inquiryType}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="area-of-need"
                    className="block text-[14px] font-semibold text-white mb-2"
                  >
                    Area of Need
                  </label>
                  <div className="relative">
                    <select
                      id="area-of-need"
                      disabled={areaOptions.length === 0}
                      value={values.areaOfNeed}
                      onChange={(e) => updateField('areaOfNeed', e.target.value)}
                      className={`w-full appearance-none rounded-full text-[15px] font-medium px-5 py-3.5 pr-10 focus:outline-2 focus:outline-[#F09200] shadow-sm ${
                        areaOptions.length === 0
                          ? 'bg-[#94A3B8] text-[#1E293B] cursor-not-allowed'
                          : 'bg-white text-[#081C31] cursor-pointer'
                      }`}
                    >
                      {areaOptions.length === 0 ? (
                        <option value="">Please select an Inquiry Type first</option>
                      ) : (
                        <>
                          <option value="">Please select...</option>
                          {areaOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <ChevronDown
                      className="pointer-events-none w-5 h-5 text-[#081C31] absolute right-4 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.areaOfNeed && (
                    <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.areaOfNeed}</p>
                  )}
                </div>
              </div>

              {/* Row 2: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-[14px] font-semibold text-white mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    value={values.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full rounded-full bg-white text-[#081C31] text-[15px] px-5 py-3 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-[14px] font-semibold text-white mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    value={values.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full rounded-full bg-white text-[#081C31] text-[15px] px-5 py-3 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Company & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company-name"
                    className="block text-[14px] font-semibold text-white mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    value={values.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className="w-full rounded-full bg-white text-[#081C31] text-[15px] px-5 py-3 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                  />
                  {errors.company && (
                    <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-[14px] font-semibold text-white mb-2"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postal-code"
                    type="text"
                    maxLength={11}
                    value={values.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    className="w-full rounded-full bg-white text-[#081C31] text-[15px] px-5 py-3 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                  />
                  {errors.postalCode && (
                    <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Business Email */}
              <div>
                <label
                  htmlFor="business-email"
                  className="block text-[14px] font-semibold text-white mb-2"
                >
                  Business Email
                </label>
                <input
                  id="business-email"
                  type="email"
                  value={values.businessEmail}
                  onChange={(e) => updateField('businessEmail', e.target.value)}
                  className="w-full rounded-full bg-white text-[#081C31] text-[15px] px-5 py-3 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                />
                {errors.businessEmail && (
                  <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.businessEmail}</p>
                )}
              </div>

              {/* Row 5: Contact Phone */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-[14px] font-semibold text-white mb-2"
                >
                  Contact Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={values.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  className="w-full rounded-full bg-white text-[#081C31] text-[15px] px-5 py-3 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                />
                {errors.contactPhone && (
                  <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.contactPhone}</p>
                )}
              </div>

              {/* Row 6: Comments */}
              <div>
                <label
                  htmlFor="comments"
                  className="block text-[14px] font-semibold text-white mb-2"
                >
                  Comments
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  value={values.comments}
                  onChange={(e) => updateField('comments', e.target.value)}
                  className="w-full rounded-2xl bg-white text-[#081C31] text-[15px] px-5 py-3.5 focus:outline-2 focus:outline-[#F09200] shadow-sm"
                />
                {errors.comments && (
                  <p className="mt-1.5 text-xs font-medium text-[#FDBA74]">{errors.comments}</p>
                )}
              </div>
            </div>

            {/* Marketing Consent & Privacy Notice */}
            <div className="mt-8 space-y-2.5 text-[13px] text-slate-300">
              <label className="inline-flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.emailOptIn}
                  onChange={(e) => updateField('emailOptIn', e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#F09200]"
                />
                <span>Yes I would like to receive email updates from OperateServices.</span>
              </label>
              <p className="text-slate-400">
                For details on how we use and protect your Personal Information, see our{' '}
                <a
                  href="#privacy-notice"
                  onClick={(e) => {
                    e.preventDefault();
                    updateField('emailOptIn', values.emailOptIn);
                  }}
                  className="underline text-white hover:text-[#F09200]"
                >
                  Privacy Notice
                </a>
                .
              </p>
            </div>

            {/* Verification Widget + Submit */}
            <div className="mt-8 flex flex-col items-center gap-6">
              <div>
                <div className="bg-[#F9F9F9] text-[#081C31] rounded-xl border border-slate-300 px-5 py-3.5 w-[310px] flex items-center justify-between shadow-md">
                  <label className="flex items-center gap-3.5 cursor-pointer text-[14px] font-medium">
                    <input
                      type="checkbox"
                      checked={values.humanVerified}
                      onChange={(e) => updateField('humanVerified', e.target.checked)}
                      className="h-5 w-5 rounded border-slate-400 accent-[#00558C]"
                    />
                    <span>I&apos;m not a robot</span>
                  </label>
                  <div className="flex flex-col items-center text-[10px] text-slate-500">
                    <ShieldCheck className="w-6 h-6 text-[#00558C]" aria-hidden="true" />
                    <span>Verification</span>
                  </div>
                </div>
                {errors.humanVerified && (
                  <p className="mt-2 text-center text-xs font-semibold text-[#FDBA74]">
                    {errors.humanVerified}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="px-12 py-4 rounded-full bg-[#F09200] hover:bg-[#d98300] text-[#001C36] font-bold text-[16px] transition-all duration-200 shadow-xl hover:shadow-2xl cursor-pointer"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
