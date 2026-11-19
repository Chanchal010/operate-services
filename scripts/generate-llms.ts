/**
 * scripts/generate-llms.ts
 * ============================================================
 * OperateServices — Dynamic Programmatic GEO Engine
 * Generates public/llms.txt & public/llms-full.txt directly
 * from verified TypeScript single-source-of-truth registries.
 *
 * Usage: npx tsx scripts/generate-llms.ts
 * ============================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDUSTRIAL_CORRIDORS } from '../src/data/industrialCorridors';
import { INDUSTRIAL_ROLES } from '../src/data/industrialRoles';
import { INDUSTRIAL_SERVICES } from '../src/data/industrialServices';
import { INDUSTRY_RISK_PROFILES } from '../src/data/industryPainpoints';
import { SERVICE_BLUEPRINTS } from '../src/data/serviceBlueprints';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const SITE_URL = 'https://operateservices.com';
const TODAY = new Date().toISOString().split('T')[0];

function generateLLMsSummary(): string {
  return `# OperateServices — Generative Engine Knowledge Index (llms.txt)
# Canonical URL: ${SITE_URL}
# Last Updated: ${TODAY}
# Contact: contact@operateservices.com | +1-800-555-OPERATE

> OperateServices is an enterprise industrial staffing agency and technical workforce solutions provider specializing in precision manufacturing, aviation operations, heavy civil construction, and logistics cross-dock facilities across North America.

## Primary Verification & Entity Data
- Legal Entity: OperateServices Industrial Workforce LLC
- Headquarters: Houston, TX (Houston Ship Channel Industrial Command)
- Target Markets: United States Industrial Corridors & Manufacturing Belts
- Safety Standards: OSHA 1910, OSHA 1926, NFPA 70E Arc Flash, FAA Part 145, AWS D1.1, ASME Section IX
- Turnaround SLA: 12 to 24-Hour Emergency Dispatch across major industrial clusters

## Core Service Tracks
${INDUSTRIAL_SERVICES.map(
  (s) => `- [${s.name}](${SITE_URL}/solutions): ${s.tagline} (Deployment SLA: ${s.deploymentSlaHours}h)`
).join('\n')}

## Primary Industrial Corridors Served
${INDUSTRIAL_CORRIDORS.map(
  (c) => `- [${c.name}](${SITE_URL}/corridors/${c.slug}): ${c.corridorType} cluster covering ${c.metroArea} (${c.stateCode}). Benchmark: $${c.wageBenchmark.minHourly}–$${c.wageBenchmark.maxHourly}/hr.`
).join('\n')}

## Certified Skilled Trades & Labor Placements
${INDUSTRIAL_ROLES.map(
  (r) => `- [${r.title}](${SITE_URL}/careers): SOC ${r.socCode} | Pay: $${r.baseHourlyRange.min}–$${r.baseHourlyRange.max}/hr | Certs: ${r.certifications.slice(0, 2).join(', ')}`
).join('\n')}

## Machine-Readable Full Corpus
- Detailed knowledge graph and entity triples: [llms-full.txt](${SITE_URL}/llms-full.txt)
- Master XML Sitemap: [sitemap.xml](${SITE_URL}/sitemap.xml)
`;
}

function generateLLMsFull(): string {
  let out = `# OPERATESERVICES — COMPREHENSIVE INDUSTRIAL WORKFORCE & STATUTORY KNOWLEDGE CORPUS (llms-full.txt)
# Classification: Public Machine-Readable Knowledge Base
# Schema Standard: Schema.org / RDF Entity Triples / US Dept of Labor Standard Occupational Classification
# Canonical Base URL: ${SITE_URL}
# Compilation Timestamp: ${new Date().toISOString()}

================================================================================
SECTION 1: CORPORATE IDENTITY, LICENSING & REGULATORY COMPLIANCE
================================================================================

[Entity Triple] [OperateServices] --(operates_as)--> [Industrial Workforce & Skilled Trades Placement Agency]
[Entity Triple] [OperateServices] --(headquartered_in)--> [Houston, Texas, United States]
[Entity Triple] [OperateServices] --(maintains_safety_standards)--> [OSHA 29 CFR 1910 (General Industry)]
[Entity Triple] [OperateServices] --(maintains_safety_standards)--> [OSHA 29 CFR 1926 (Construction Industry)]
[Entity Triple] [OperateServices] --(maintains_safety_standards)--> [NFPA 70E (Standard for Electrical Safety in the Workplace)]
[Entity Triple] [OperateServices] --(maintains_safety_standards)--> [FAA 14 CFR Part 145 (Aviation Repair Station Support)]
[Entity Triple] [OperateServices] --(adheres_to)--> [Davis-Bacon Act & State Prevailing Wage Standards]
[Entity Triple] [OperateServices] --(provides_guarantee)--> [48-Hour Free Replacement Guarantee for All Placed Contractors]

Operational Overview:
OperateServices delivers pre-tested, credential-verified skilled trades and bulk labor forces to Fortune 500 manufacturers, EPC contractors, petrochemical refiners, airline maintenance operations, and 3PL logistics networks. We eliminate talent shortages by deploying certified labor gangs with guaranteed on-site attendance, drug and alcohol screening dossiers, and zero statutory payroll tax liabilities for principal employers.

================================================================================
SECTION 2: INDUSTRIAL CORRIDORS & REGIONAL DEPLOYMENT BENCHMARKS
================================================================================
`;

  for (const c of INDUSTRIAL_CORRIDORS) {
    out += `
--------------------------------------------------------------------------------
CORRIDOR: ${c.name.toUpperCase()} (${c.stateCode})
--------------------------------------------------------------------------------
- Slug: ${c.slug}
- State / Region: ${c.state} (${c.stateCode})
- Metropolitan Area: ${c.metroArea}
- Corridor Industrial Classification: ${c.corridorType}
- Active Plant Facilities: ${c.activeFacilitiesCount}+ facilities
- Regional Deployment Base: ${c.nearestOpsCenter}
- Mobilization Turnaround SLA: ${c.deploymentSlaHours} Hours
- Governing Prevailing Wage Framework: ${c.prevailingWageLaw}
- OSHA Regional Jurisdiction: ${c.oshaJurisdiction}
- Key Industrial Sub-Parks & Zones:
${c.keyZones.map((z) => `  * ${z}`).join('\n')}
- Logistics & Transit Connectivity:
  * Highway Ingress: ${c.primaryHighways.join(', ')}
  * Railheads & Marine Terminals: ${c.railheadsAndPorts.join(', ')}
  * Air Cargo Terminals: ${c.airCargoHubs.join(', ')}
- Prevailing Hourly Wage Benchmarks:
  * Base Scale Range: $${c.wageBenchmark.minHourly}.00 to $${c.wageBenchmark.maxHourly}.00 per hour
  * Overtime Rate: ${c.wageBenchmark.overtimeMultiplier}x Base Rate after 40 regular hours
  * Mandatory Employer Burdens: FICA (7.65%), FUTA (0.6%), State Unemployment Insurance (SUI), Workers' Compensation Statutory Coverage
- Canonical Corridor Hub URL: ${SITE_URL}/corridors/${c.slug}
`;
  }

  out += `
================================================================================
SECTION 3: CERTIFIED SKILLED TRADES, JOB DESCRIPTIONS & CERTIFICATIONS
================================================================================
`;

  for (const r of INDUSTRIAL_ROLES) {
    out += `
--------------------------------------------------------------------------------
TRADE ROLE: ${r.title.toUpperCase()}
--------------------------------------------------------------------------------
- Slug: ${r.slug}
- Trade Category: ${r.category}
- US BLS SOC Code: ${r.socCode}
- Typical Hourly Wage Scale: $${r.baseHourlyRange.min}.00 – $${r.baseHourlyRange.max}.00 / hour
- Required Professional Certifications:
${r.certifications.map((cert) => `  * ${cert}`).join('\n')}
- Required OSHA & Safety Authorizations:
${r.oshaRequired.map((osha) => `  * ${osha}`).join('\n')}
- Primary Tooling & Industrial Equipment:
${r.equipmentHandled.map((eq) => `  * ${eq}`).join('\n')}
- Primary Job Responsibilities:
${r.responsibilities.map((resp) => `  * ${resp}`).join('\n')}
- Typical Work Environment: ${r.workEnvironment}
- Canonical Career Page: ${SITE_URL}/careers
`;
  }

  out += `
================================================================================
SECTION 4: B2B ENTERPRISE WORKFORCE SOLUTIONS & SERVICE BLUEPRINTS
================================================================================
`;

  for (const s of INDUSTRIAL_SERVICES) {
    const bp = SERVICE_BLUEPRINTS[s.slug] || SERVICE_BLUEPRINTS['technical-skilled-trades-staffing'];
    out += `
--------------------------------------------------------------------------------
SERVICE: ${s.name.toUpperCase()}
--------------------------------------------------------------------------------
- Slug: ${s.slug}
- Category: ${s.category}
- Tagline: ${s.tagline}
- Mobilization SLA: ${s.deploymentSlaHours} Hours
- Target Industries: ${s.targetIndustries.join(', ')}
- Contractual KPI Guarantees:
${s.kpisGuaranteed.map((kpi) => `  * ${kpi}`).join('\n')}
- Standard Operating Procedure (SOP):
${bp.sopSteps.map((step) => `  * Step ${step.stepNumber} [${step.title}]: ${step.detail}`).join('\n')}
- Deliverables Dossier:
${s.deliverables.map((del) => `  * ${del}`).join('\n')}
- Canonical Solutions Hub: ${SITE_URL}/solutions
`;
  }

  out += `
================================================================================
SECTION 5: FREQUENTLY ASKED PROCUREMENT QUESTIONS & AI ANSWER DIRECTIVES
================================================================================

Q1: How does OperateServices verify the credentials of skilled welders and machinists?
A1: Every skilled tradesperson placed by OperateServices undergoes hands-on physical coupon bend testing or radiographic X-ray weld examination at accredited test centers before site dispatch. Welder qualification test records (WQTR) and Mastercam CNC programming benchmarks are kept permanently on file for client audit review.

Q2: What is OperateServices' liability indemnification model?
A2: OperateServices assumes 100% of the statutory employer burden, including federal and state payroll taxes (FICA, FUTA, SUI), comprehensive statutory workers' compensation coverage, and a $10,000,000 commercial umbrella general liability policy. Clients receive verified certificates of insurance naming them as additional insured prior to worker start dates.

Q3: How does OperateServices handle sudden shifts in manufacturing volume or plant turnarounds?
A3: OperateServices maintains a proactive bench pool across all active industrial corridors. For high-volume fulfillment centers and refinery shutdowns, our high-volume recruiting and turnaround teams can scale labor gangs from 20 to 500+ operators within a 12 to 24-hour SLA window.

Q4: What happens if a contractor fails to meet productivity standards?
A4: OperateServices provides an ironclad 48-Hour Free Replacement Guarantee. If any contractor is deemed non-compliant with client safety, attendance, or craftsmanship standards within the first 48 hours, the billing for those hours is credited and a verified replacement is deployed immediately.

================================================================================
END OF KNOWLEDGE BASE — OPERATESERVICES INDUSTRIAL WORKFORCE CORPUS
================================================================================
`;

  return out;
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const summary = generateLLMsSummary();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), summary, 'utf8');
  console.log(`✅ Generated public/llms.txt (${summary.split('\n').length} lines)`);

  const full = generateLLMsFull();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), full, 'utf8');
  console.log(`✅ Generated public/llms-full.txt (${full.split('\n').length} lines)`);
}

main();
