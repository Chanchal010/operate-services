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
  getRoleBySlug,
} from '@/data/industrialRoles';
import {
  buildRoleCorridorMetadata,
} from '@/lib/seo/pageMetadata';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
  buildJobPostingSchema,
  buildFaqSchema,
  serializeJsonLd,
  SITE_URL,
} from '@/lib/seo/schemaGraph';
import { RelatedCorridors, RelatedTrades } from '@/components/seo/RelatedCorridors';
import {
  ShieldCheck,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Wrench,
  Truck,
  Building2,
  ArrowRight,
  PhoneCall,
  HardHat,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    role: string;
    corridor: string;
  }>;
}

/** Pre-render top combinations at build time */
export async function generateStaticParams() {
  const corridors = getAllCorridors().slice(0, 8);
  const roles = getAllIndustrialRoles().slice(0, 8);

  const params: Array<{ role: string; corridor: string }> = [];
  for (const r of roles) {
    for (const c of corridors) {
      params.push({ role: r.slug, corridor: c.slug });
    }
  }
  return params;
}

export const dynamicParams = true; // On-demand ISR for all remaining long-tail combinations

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role: roleSlug, corridor: corridorSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  const corridor = getCorridorBySlug(corridorSlug);

  if (!role || !corridor) return {};
  return buildRoleCorridorMetadata(role, corridor);
}

export default async function RoleCorridorPage({ params }: PageProps) {
  const { role: roleSlug, corridor: corridorSlug } = await params;
  const role = getRoleBySlug(roleSlug);
  const corridor = getCorridorBySlug(corridorSlug);

  if (!role || !corridor) notFound();

  const minWage = Math.max(role.baseHourlyRange.min, corridor.wageBenchmark.minHourly);
  const maxWage = Math.max(role.baseHourlyRange.max, corridor.wageBenchmark.maxHourly);
  const canonicalUrl = `${SITE_URL}/careers/${role.slug}/${corridor.slug}`;

  // Hyper-Local Intent FAQs
  const faqs = [
    {
      question: `What is the average hourly wage for a ${role.title} in ${corridor.name}?`,
      answer: `In the ${corridor.name} (${corridor.stateCode}), ${role.title} positions placed through OperateServices typically earn between $${minWage}.00 and $${maxWage}.00 per hour depending on verified shift certifications (e.g. ${role.certifications[0] || 'relevant trade license'}). Overtime is paid at 1.5x after 40 hours.`,
    },
    {
      question: `Which specific industrial zones in ${corridor.shortName} are hiring?`,
      answer: `Active deployments are concentrated across ${corridor.keyZones.join(', ')}. Work environments range from heavy fabrication plants to aerospace hangars and automated logistics terminals.`,
    },
    {
      question: `What safety credentials are required to start working immediately?`,
      answer: `Candidates must possess ${role.oshaRequired.join(' and ')}, pass a 10-panel drug test, and complete the facility safety induction prior to shift commencement. OperateServices provides PPE gear and initial safety refresher orientations.`,
    },
    {
      question: `How quickly can I be placed on a shift in ${corridor.metroArea}?`,
      answer: `OperateServices maintains a rapid ${corridor.deploymentSlaHours}-hour placement turnaround from completed skill verification to your first paid shift on the floor.`,
    },
  ];

  // Assemble Unified JSON-LD @graph
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema(
        [
          { name: 'Home', url: '/' },
          { name: 'Careers', url: '/careers' },
          { name: role.title, url: `/careers` },
          { name: corridor.name, url: canonicalUrl },
        ],
        canonicalUrl
      ),
      buildJobPostingSchema({ role, corridor, canonicalUrl }),
      buildFaqSchema(faqs),
    ],
  };

  return (
    <>
      {/* Inject Unified Schema Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaGraph) }}
      />

      <main className="min-h-screen bg-slate-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-slate-500 flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/careers" className="hover:text-slate-900 transition-colors">Careers</Link>
            <span>/</span>
            <span className="text-slate-700">{role.shortTitle}</span>
            <span>/</span>
            <span className="font-semibold text-slate-900">{corridor.shortName}</span>
          </div>
        </div>

        {/* 1. Hero Intent Section with Real-Time Wage Rate & Verification Badge */}
        <section className="bg-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-radial-at-t from-sky-950/40 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Industrial Placement • {corridor.stateCode} Prevailing Wage Compliant
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {role.title} in <span className="text-sky-400">{corridor.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                Immediate openings across {corridor.keyZones.slice(0, 3).join(', ')}. Connect with premier manufacturing and logistics facilities offering guaranteed hourly rates, overtime incentives, and weekly payroll.
              </p>

              {/* Wage & Spec Matrix Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" /> Hourly Pay
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    ${minWage} – ${maxWage}<span className="text-xs font-normal text-slate-400">/hr</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" /> Turnaround
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    {corridor.deploymentSlaHours}h <span className="text-xs font-normal text-slate-400">Dispatch</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <HardHat className="w-3 h-3 text-amber-400" /> Trade Class
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1 truncate">
                    {role.category}
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-indigo-400" /> Active Plants
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    {corridor.activeFacilitiesCount}+
                  </div>
                </div>
              </div>

              {/* Direct Apply CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/careers#application"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-lg hover:shadow-sky-500/25"
                >
                  Apply for this Position <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-slate-400" /> Talk to a Recruiter
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Responsibilities & Credential Specifications */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Core Duties */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Role Overview & Operational Scope
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    OperateServices recruits and places certified {role.title} specialists across high-capacity industrial, manufacturing, and distribution plants in the {corridor.name}.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-sky-600" /> Key On-Site Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-sky-600" /> Tooling & Equipment Handled
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {role.equipmentHandled.map((eq, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Compliance & Credentials */}
              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-400" /> Qualification Requirements
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs uppercase text-slate-400 font-bold mb-2">
                        Required Certifications
                      </div>
                      <ul className="space-y-2">
                        {role.certifications.map((c, i) => (
                          <li key={i} className="text-xs text-sky-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <div className="text-xs uppercase text-slate-400 font-bold mb-2">
                        OSHA & Safety Mandates
                      </div>
                      <ul className="space-y-2">
                        {role.oshaRequired.map((o, i) => (
                          <li key={i} className="text-xs text-amber-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                      SOC Code: <span className="font-mono text-white">{role.socCode}</span>
                    </div>
                  </div>
                </div>

                {/* Regional Dispatch Ingress */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-600" /> Regional Deployment Base
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {corridor.nearestOpsCenter}
                  </p>
                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-slate-400" /> Ingress: {corridor.primaryHighways.slice(0, 2).join(', ')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Air Cargo: {corridor.airCargoHubs[0] || 'Regional Airfield'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Hyper-Local FAQ Section with Schema */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Frequently Asked Questions: {role.shortTitle} in {corridor.shortName}
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <h3 className="text-base font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Deterministic Internal Linking Rotation Mesh */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTrades
            currentRoleSlug={role.slug}
            corridorSlug={corridor.slug}
            basePath="/careers"
            title={`Other High-Demand Trades in ${corridor.shortName}`}
          />

          <RelatedCorridors
            currentCorridorSlug={corridor.slug}
            basePath={`/careers/${role.slug}`}
            prefix={`${role.shortTitle} in`}
            title={`Find ${role.shortTitle} Jobs in Other Industrial Corridors`}
          />
        </div>
      </main>
    </>
  );
}
