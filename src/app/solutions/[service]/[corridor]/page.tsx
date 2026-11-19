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
  INDUSTRIAL_SERVICES,
  getAllServices,
  getServiceBySlug,
} from '@/data/industrialServices';
import {
  getIndustryRiskProfile,
} from '@/data/industryPainpoints';
import {
  getServiceBlueprint,
} from '@/data/serviceBlueprints';
import {
  buildServiceCorridorMetadata,
} from '@/lib/seo/pageMetadata';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildFaqSchema,
  serializeJsonLd,
  SITE_URL,
} from '@/lib/seo/schemaGraph';
import { RelatedCorridors } from '@/components/seo/RelatedCorridors';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  ArrowRight,
  PhoneCall,
  AlertTriangle,
  Award,
  BarChart3,
  FileCheck2,
  Truck,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    service: string;
    corridor: string;
  }>;
}

/** Pre-render top combinations at build time */
export async function generateStaticParams() {
  const corridors = getAllCorridors().slice(0, 6);
  const services = getAllServices().slice(0, 6);

  const params: Array<{ service: string; corridor: string }> = [];
  for (const s of services) {
    for (const c of corridors) {
      params.push({ service: s.slug, corridor: c.slug });
    }
  }
  return params;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, corridor: corridorSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const corridor = getCorridorBySlug(corridorSlug);

  if (!service || !corridor) return {};
  return buildServiceCorridorMetadata(service, corridor);
}

export default async function ServiceCorridorPage({ params }: PageProps) {
  const { service: serviceSlug, corridor: corridorSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const corridor = getCorridorBySlug(corridorSlug);

  if (!service || !corridor) notFound();

  const riskProfile = getIndustryRiskProfile(corridor.corridorType);
  const blueprint = getServiceBlueprint(service.slug);
  const canonicalUrl = `${SITE_URL}/solutions/${service.slug}/${corridor.slug}`;

  // Hyper-Local Intent FAQs
  const faqs = [
    {
      question: `What is OperateServices' deployment SLA for ${service.shortName} in ${corridor.name}?`,
      answer: `OperateServices maintains a guaranteed ${service.deploymentSlaHours}-hour mobilization SLA for ${corridor.name}. Rapid response squads can deploy within ${corridor.deploymentSlaHours} hours to cover emergency plant turnarounds or sudden shifts in volume across ${corridor.keyZones.slice(0, 2).join(' and ')}.`,
    },
    {
      question: `How does OperateServices ensure OSHA & ${corridor.stateCode} statutory compliance?`,
      answer: `All workforce personnel deployed in ${corridor.name} operate under strict adherence to ${corridor.oshaJurisdiction} and ${corridor.prevailingWageLaw}. We manage full statutory payroll deductions, comprehensive workers' compensation coverage, and provide complete safety training dossiers prior to site arrival.`,
    },
    {
      question: `Can OperateServices scale workforce volume during seasonal peaks or plant outages?`,
      answer: `Yes. In ${corridor.name}, we support plant expansions and scheduled shutdowns requiring 25 to 500+ tradespeople and operators with dedicated on-premise coordination to eliminate production bottlenecks.`,
    },
    {
      question: `What guarantees exist if a deployed contractor does not meet client standards?`,
      answer: `We provide a 48-Hour Free Replacement Guarantee. If any operator or technician fails to meet your quality or productivity benchmarks, they are replaced immediately with zero billing dispute.`,
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
          { name: 'Solutions', url: '/solutions' },
          { name: service.name, url: `/solutions` },
          { name: corridor.name, url: canonicalUrl },
        ],
        canonicalUrl
      ),
      buildServiceSchema({ service, corridor, canonicalUrl }),
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
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-slate-500 flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-slate-900 transition-colors">Solutions</Link>
            <span>/</span>
            <span className="text-slate-700">{service.shortName}</span>
            <span>/</span>
            <span className="font-semibold text-slate-900">{corridor.shortName}</span>
          </div>
        </div>

        {/* 1. Hero Intent Section */}
        <section className="bg-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-radial-at-t from-sky-950/40 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Workforce Deployment • {corridor.stateCode} Industrial Node
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {service.name} across <span className="text-sky-400">{corridor.name}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                {service.tagline} Deployed with rigorous credential validation, dedicated on-premise coordination, and guaranteed adherence to {corridor.prevailingWageLaw}.
              </p>

              {/* SLA & Ops Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" /> Mobilization SLA
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    {service.deploymentSlaHours}h Turnaround
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-emerald-400" /> Corridors Served
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    {corridor.keyZones.length} Key Zones
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" /> Vetting Guarantee
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1 truncate">
                    100% Tested
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-indigo-400" /> Compliance
                  </div>
                  <div className="text-lg sm:text-xl font-black text-white mt-1">
                    Zero-Defect
                  </div>
                </div>
              </div>

              {/* B2B Call to Action */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-lg hover:shadow-sky-500/25"
                >
                  Request Workforce Proposal <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-slate-400" /> Consult an Industrial Specialist
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Guaranteed KPIs & Standard Operating Blueprint */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Blueprint 4-Step SOP */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Standard Operating Procedure (SOP) & Deployment Blueprint
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Every staffing deployment across {corridor.name} follows our 4-phase standardized workflow to guarantee immediate floor productivity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blueprint.sopSteps.map((step) => (
                    <div key={step.stepNumber} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                      <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                        {step.stepNumber}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>

                {/* Guaranteed Deliverables */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-sky-600" /> Contractual Deliverables & Audit Dossier
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar: Industrial Risk & Safety Guardrails */}
              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" /> Sector Risk Mitigation
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs uppercase text-slate-400 font-bold mb-2">
                        Governing Compliance Standards
                      </div>
                      <ul className="space-y-1.5">
                        {riskProfile.complianceFramework.map((cf, i) => (
                          <li key={i} className="text-xs text-sky-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            {cf}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <div className="text-xs uppercase text-slate-400 font-bold mb-1">
                        Downtime Hazard Cost
                      </div>
                      <div className="text-amber-400 font-mono text-sm font-bold">
                        {riskProfile.typicalDowntimeCostPerHour}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {riskProfile.mitigationStrategy}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <div className="text-xs uppercase text-slate-400 font-bold mb-2">
                        Guaranteed Contract KPIs
                      </div>
                      <ul className="space-y-1.5">
                        {service.kpisGuaranteed.map((kpi, i) => (
                          <li key={i} className="text-xs text-emerald-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {kpi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Regional Operations & Dispatch Center */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-sky-600" /> Operational Nexus
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {corridor.nearestOpsCenter}
                  </p>
                  <div className="space-y-2 text-xs text-slate-500">
                    <div><strong>Ingress:</strong> {corridor.primaryHighways.join(', ')}</div>
                    <div><strong>Railheads / Terminals:</strong> {corridor.railheadsAndPorts.slice(0, 2).join(', ')}</div>
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
              Procurement & Operational FAQs: {service.shortName} in {corridor.shortName}
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
          <RelatedCorridors
            currentCorridorSlug={corridor.slug}
            basePath={`/solutions/${service.slug}`}
            prefix={`${service.shortName} in`}
            title={`Deploy ${service.shortName} in Other Major Industrial Corridors`}
          />
        </div>
      </main>
    </>
  );
}
