import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  INDUSTRIAL_CORRIDORS,
  getAllCorridors,
  getCorridorBySlug,
} from '@/data/industrialCorridors';
import {
  INDUSTRIAL_ROLES,
  getAllIndustrialRoles,
} from '@/data/industrialRoles';
import {
  INDUSTRIAL_SERVICES,
  getAllServices,
} from '@/data/industrialServices';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  serializeJsonLd,
  SITE_URL,
} from '@/lib/seo/schemaGraph';
import { RelatedCorridors } from '@/components/seo/RelatedCorridors';
import {
  ShieldCheck,
  Building2,
  DollarSign,
  Briefcase,
  Wrench,
  Truck,
  ArrowRight,
  HardHat,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCorridors().map((c) => ({ slug: c.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const corridor = getCorridorBySlug(slug);
  if (!corridor) return {};

  const title = `${corridor.name} Industrial Workforce & Staffing Hub | OperateServices`;
  const description = `Comprehensive industrial staffing, certified trades, and workforce solutions across ${corridor.name} (${corridor.stateCode}). Serving ${corridor.keyZones.slice(0, 3).join(', ')} with high-capacity staffing and 24h turnaround SLAs.`;
  const canonicalUrl = `${SITE_URL}/corridors/${corridor.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OperateServices',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function CorridorHubPage({ params }: PageProps) {
  const { slug } = await params;
  const corridor = getCorridorBySlug(slug);
  if (!corridor) notFound();

  const canonicalUrl = `${SITE_URL}/corridors/${corridor.slug}`;
  const roles = getAllIndustrialRoles();
  const services = getAllServices();

  const faqs = [
    {
      question: `What industries predominate the ${corridor.name}?`,
      answer: `The ${corridor.name} is primarily anchored by ${corridor.corridorType} operations, including heavy manufacturing, continuous processing, and high-velocity logistics across ${corridor.keyZones.join(', ')}.`,
    },
    {
      question: `What is the prevailing wage benchmark in ${corridor.shortName}?`,
      answer: `Wages across ${corridor.shortName} range from $${corridor.wageBenchmark.minHourly}.00 to $${corridor.wageBenchmark.maxHourly}.00 per hour depending on trade specialization, certified skill ratings, and overtime requirements under ${corridor.prevailingWageLaw}.`,
    },
  ];

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema(
        [
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: corridor.name, url: canonicalUrl },
        ],
        canonicalUrl
      ),
      buildFaqSchema(faqs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaGraph) }}
      />

      <main className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-slate-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-slate-900 transition-colors">Locations</Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">{corridor.shortName}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Strategic Industrial Corridor • {corridor.stateCode}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {corridor.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                OperateServices provides turnkey skilled trades staffing, high-volume industrial recruiting, and embedded workforce leadership across the {corridor.metroArea} industrial complex.
              </p>

              {/* Corridor Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-sky-400" /> Facilities
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    {corridor.activeFacilitiesCount}+ Active
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" /> Wage Range
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    ${corridor.wageBenchmark.minHourly}–${corridor.wageBenchmark.maxHourly}<span className="text-xs font-normal text-slate-400">/hr</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <HardHat className="w-3 h-3 text-amber-400" /> Corridor Type
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1 truncate">
                    {corridor.corridorType}
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Truck className="w-3 h-3 text-indigo-400" /> Turnaround
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    {corridor.deploymentSlaHours}h SLA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Skilled Trades in this Corridor */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-sky-600" /> Skilled Trades Placement in {corridor.shortName}
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Browse immediate open positions and deployment gangs for certified tradespeople across this corridor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((r) => (
                <Link
                  key={r.slug}
                  href={`/careers/${r.slug}/${corridor.slug}`}
                  className="p-4 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 rounded-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-sky-600 text-sm">
                      {r.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.responsibilities[0]}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-xs font-semibold text-sky-600">
                    <span>${Math.max(r.baseHourlyRange.min, corridor.wageBenchmark.minHourly)} – ${Math.max(r.baseHourlyRange.max, corridor.wageBenchmark.maxHourly)}/hr</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Staffing Solutions in this Corridor */}
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-600" /> B2B Workforce Solutions in {corridor.shortName}
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Contractor and enterprise staffing programs engineered for manufacturing plants and logistics hubs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}/${corridor.slug}`}
                  className="p-4 bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 rounded-xl transition-all group"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-600 text-sm mb-1">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{s.tagline}</p>
                  <div className="mt-3 text-xs font-semibold text-sky-600 flex items-center gap-1">
                    Deploy Solution ({s.deploymentSlaHours}h SLA) <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Rotational Internal Linking Mesh */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedCorridors
            currentCorridorSlug={corridor.slug}
            basePath="/corridors"
            prefix="Corridor:"
            title="Explore Other Major North American & Global Corridors"
          />
        </div>
      </main>
    </>
  );
}
