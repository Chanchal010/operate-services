'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Clock,
  Globe,
  MapPin,
  Phone,
  Search,
  X,
} from 'lucide-react';
import { OFFICES_DATA, SPECIALIZATIONS_DATA } from '@/data/careerPortalData';
import { CountryCode, OfficeLocation } from '@/types/career';
import { filterOffices, groupOfficesByState } from '@/utils/careerFilters';

const COUNTRIES: CountryCode[] = ['United States', 'Canada', 'United Kingdom'];

export const LocationsView: React.FC = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('United States');
  const [query, setQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('off-md-hanover');

  const filteredOffices = useMemo(
    () =>
      filterOffices(OFFICES_DATA, selectedCountry, query, specializationFilter),
    [selectedCountry, query, specializationFilter]
  );

  const groupedByState = useMemo(
    () => groupOfficesByState(filteredOffices),
    [filteredOffices]
  );

  const activeOffice: OfficeLocation | null = useMemo(() => {
    const found = filteredOffices.find((o) => o.id === selectedOfficeId);
    return found ?? filteredOffices[0] ?? null;
  }, [filteredOffices, selectedOfficeId]);

  const handleSearchJobsNearOffice = (city: string, stateCode: string) => {
    const locParam = encodeURIComponent(`${city}, ${stateCode}`);
    router.push(`/jobs?location=${locParam}`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
      {/* Locations Hero & Filter Header */}
      <section className="bg-[#081C31] text-white border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] mb-2">
              Our Global Offices
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">
              OperateServices Locations Across North America &amp; Europe
            </h1>
            <p className="text-slate-300 mt-4 leading-relaxed text-base">
              With over 200 local recruiting hubs, OperateServices teams live and work in the industrial communities we serve. Search by city, state, province, or postal code to connect with a nearby branch.
            </p>
          </div>

          {/* Country Segmented Tabs + Search Input */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div
              role="tablist"
              aria-label="Country directory selector"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#04111F] border border-white/10 self-start shadow-inner"
            >
              {COUNTRIES.map((country) => {
                const active = selectedCountry === country;
                return (
                  <button
                    key={country}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setSelectedCountry(country);
                      setQuery('');
                    }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#E85D04] text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {country}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 lg:max-w-2xl">
              <label className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white text-[#081C31] shadow-md">
                <Search className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                <span className="sr-only">Search offices by city, state, or postal code</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="City, state, or ZIP (e.g. Texas, OH)"
                  className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear office search"
                    onClick={() => setQuery('')}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </label>

              <label className="sm:w-64">
                <span className="sr-only">Filter by specialization</span>
                <select
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white text-sm font-medium text-[#081C31] focus:outline-none shadow-md cursor-pointer"
                >
                  <option value="All">All Specializations</option>
                  {SPECIALIZATIONS_DATA.map((spec) => (
                    <option key={spec.slug} value={spec.title}>
                      {spec.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory + Selected Office Spotlight */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Alphabetical State/Province Directory */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-2xl text-[#081C31]">
              {selectedCountry} Offices
            </h2>
            <span className="font-mono tabular-nums text-xs font-semibold text-slate-600 bg-slate-200/60 px-3 py-1 rounded-full">
              {filteredOffices.length} regional hubs shown
            </span>
          </div>

          {groupedByState.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs">
              <Globe className="w-12 h-12 text-slate-400 mx-auto mb-3" aria-hidden="true" />
              <h3 className="font-display font-bold text-lg text-[#081C31]">
                No offices matched your filter
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Clear your search or specialization filter to view all regional hubs in {selectedCountry}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSpecializationFilter('All');
                }}
                className="mt-6 px-5 py-2.5 rounded-xl bg-[#E85D04] text-white text-sm font-bold tracking-wide transition-colors cursor-pointer"
              >
                Show All {selectedCountry} Offices
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {groupedByState.map((group) => (
                <div
                  key={group.state}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-display font-bold text-sm text-[#081C31] uppercase tracking-wider">
                      {group.state}
                    </h3>
                    <span className="font-mono tabular-nums text-xs text-slate-500 font-medium">
                      {group.offices.length}{' '}
                      {group.offices.length === 1 ? 'office' : 'offices'}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {group.offices.map((office) => {
                      const isSelected = activeOffice?.id === office.id;
                      return (
                        <div
                          key={office.id}
                          className={`p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                            isSelected ? 'bg-[#00558C]/5' : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <div>
                            <button
                              type="button"
                              onClick={() => setSelectedOfficeId(office.id)}
                              className="text-left font-display font-bold text-lg text-[#081C31] hover:text-[#00558C] transition-colors cursor-pointer"
                            >
                              {office.city}
                            </button>
                            <p className="text-xs text-slate-600 mt-1 font-medium">
                              {office.street}
                              {office.suite ? `, ${office.suite}` : ''} · {office.city},{' '}
                              {office.stateCode} {office.postalCode}
                            </p>
                            <p className="text-xs font-mono tabular-nums text-slate-500 mt-1">
                              {office.phone} · <span className="font-semibold text-[#00558C]">{office.openJobsCount} active openings</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <button
                              type="button"
                              onClick={() => setSelectedOfficeId(office.id)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#081C31] text-white border-[#081C31]'
                                  : 'bg-white text-[#081C31] border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              Office Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Office Spotlight */}
        <div className="lg:col-span-5">
          {activeOffice && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:sticky lg:top-24 shadow-sm">
              <div className="pb-6 border-b border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00558C] mb-1.5">
                  {activeOffice.country} · {activeOffice.region} Region
                </p>
                <h2 className="font-display font-bold text-2xl text-[#081C31]">
                  {activeOffice.officeName}
                </h2>
              </div>

              <div className="py-6 space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[#081C31]">Address</div>
                    <div className="mt-0.5">
                      {activeOffice.street}
                      {activeOffice.suite ? `, ${activeOffice.suite}` : ''}
                    </div>
                    <div>
                      {activeOffice.city}, {activeOffice.stateOrProvince}{' '}
                      {activeOffice.postalCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[#081C31]">Direct Branch Phone</div>
                    <div className="font-mono tabular-nums text-base font-semibold text-[#081C31] mt-0.5">
                      {activeOffice.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#00558C] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[#081C31]">Office Hours</div>
                    <div className="mt-0.5">{activeOffice.hours}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-bold text-[#081C31] mb-2">
                    Local Recruiting Specializations
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {activeOffice.specializations.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSearchJobsNearOffice(
                      activeOffice.city.split(' ')[0],
                      activeOffice.stateCode
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E85D04] hover:bg-[#CF5102] text-white text-sm font-bold tracking-wide uppercase transition-colors cursor-pointer shadow-md"
                >
                  <span>
                    Search Jobs Near {activeOffice.city.split(' ')[0]} ({activeOffice.openJobsCount})
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
