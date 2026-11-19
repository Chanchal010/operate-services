/**
 * src/data/industrialServices.ts
 * B2B Enterprise Staffing & Industrial Workforce Services Registry
 */

export interface IndustrialService {
  slug: string;
  name: string;
  shortName: string;
  category: 'Staffing' | 'On-Premise Management' | 'Turnaround Services' | 'Technical Staffing';
  tagline: string;
  description: string;
  targetIndustries: string[];
  deploymentSlaHours: number;
  kpisGuaranteed: string[];
  deliverables: string[];
  featured?: boolean;
}

export const INDUSTRIAL_SERVICES: IndustrialService[] = [
  {
    slug: 'technical-skilled-trades-staffing',
    name: 'Technical & Skilled Trades Staffing Solutions',
    shortName: 'Skilled Trades Staffing',
    category: 'Technical Staffing',
    tagline: 'Vetted, certified journeymen and technical operators deployed with zero ramp-up delay.',
    description: 'Direct procurement and deployment of pre-qualified welders (AWS/ASME), precision CNC machinists, industrial millwrights, PLC technicians, and heavy equipment operators. Backed by rigorous hands-on weld testing, credential validation, and full OSHA safety compliance.',
    targetIndustries: ['Heavy Manufacturing', 'Automotive', 'Petrochemical', 'Aviation', 'Pre-Engineered Buildings'],
    deploymentSlaHours: 24,
    kpisGuaranteed: [
      '100% Drug Screen & Background Verification',
      'Certified Weld Coupon Radiographic Testing Verification',
      '< 1.8% First-Month Voluntary Turnover',
      '48-Hour Free Replacement Guarantee'
    ],
    deliverables: [
      'Complete OSHA 10/30 training dossier',
      'Digital skill matrix and weld test coupon certifications',
      'Daily electronic time tracking and prevailing wage auditing'
    ],
    featured: true,
  },
  {
    slug: 'high-volume-recruiting',
    name: 'High-Volume Industrial & Logistics Recruiting',
    shortName: 'High-Volume Staffing',
    category: 'Staffing',
    tagline: 'Rapid deployment of 50 to 500+ shift workers for peak seasonal demand and plant expansions.',
    description: 'Enterprise high-volume hiring engine designed for massive fulfillment centers, automotive assembly lines, and seasonal e-commerce peaks. Delivers hundreds of pre-screened material handlers, pickers, forklift drivers, and machine operators on predictable shift schedules.',
    targetIndustries: ['Logistics & Warehousing', 'E-Commerce', 'Consumer Goods', 'Packaging', 'Food Processing'],
    deploymentSlaHours: 48,
    kpisGuaranteed: [
      '99.4% Shift Roster Fill Rate Guarantee',
      'Sub-24h Backfill SLA for Unplanned Absences',
      'On-Site Badge & Biometric Timeclock Synchronization'
    ],
    deliverables: [
      'Dedicated on-site recruiting managers',
      'Customized pre-hire aptitude & physical agility screening',
      'Weekly headcount attrition & retention analytics dashboard'
    ],
    featured: true,
  },
  {
    slug: 'on-premise-workforce-management',
    name: 'On-Premise Workforce & Vendor Neutral Management',
    shortName: 'On-Premise Management',
    category: 'On-Premise Management',
    tagline: 'Embedded leadership managing check-in, safety adherence, attendance, and shift optimization.',
    description: 'OperateServices places experienced operational supervisors directly inside your facility to handle daily shift check-ins, biometric attendance logging, continuous PPE compliance, coaching, and immediate backfill dispatch, freeing plant leadership to focus on production quotas.',
    targetIndustries: ['Automotive Stamping', 'Distribution Hubs', 'Aerospace Assembly', 'Chemical Manufacturing'],
    deploymentSlaHours: 12,
    kpisGuaranteed: [
      'Zero Idle Time on Shift Changeover',
      '100% OSHA 300 Recordable Compliance Logging',
      'Daily Overtime Variance Held Below 2.0%'
    ],
    deliverables: [
      'Dedicated on-site coordinator desk inside facility',
      'Daily digitized shift handover and muster reports',
      'Incident management & first-line dispute resolution protocol'
    ],
    featured: true,
  },
  {
    slug: 'aviation-maintenance-turnaround',
    name: 'Aviation Maintenance & Rapid Turnaround Staffing',
    shortName: 'Aviation Turnaround Staffing',
    category: 'Turnaround Services',
    tagline: 'FAA-certified A&P mechanics, avionics specialists, and SIDA-badged flightline support.',
    description: 'Specialized aerospace workforce solutions delivering FAA Part 147 licensed A&P mechanics, avionics technicians, sheet metal riveters, and ramp ground handlers for airline maintenance bases, regional repair stations, and aircraft manufacturing programs.',
    targetIndustries: ['Commercial Aviation', 'Air Cargo Hubs', 'Defense Aerospace', 'MRO Repair Stations'],
    deploymentSlaHours: 24,
    kpisGuaranteed: [
      '100% FAA Part 145 Compliance and Drug & Alcohol Testing',
      'Airport SIDA Badge Cleared Prior to Arrival',
      'Zero Aircraft-on-Ground (AOG) Labor Bottlenecks'
    ],
    deliverables: [
      'Airworthiness release logbook credential verification',
      'FAA-mandated recurrent training logs and tooling signoffs',
      'Rapid AOG mobilization squad'
    ],
    featured: true,
  },
  {
    slug: 'plant-shutdown-turnaround-staffing',
    name: 'Plant Shutdown, Outage & Turnaround Workforce',
    shortName: 'Plant Turnaround Teams',
    category: 'Turnaround Services',
    tagline: 'Short-duration, high-intensity labor surge for refinery, chemical, and utility outages.',
    description: 'Turnkey staffing for scheduled plant shutdowns, catalytic revamps, boiler outages, and manufacturing line retooling. We supply specialized gangs of pipefitters, 6G pipe welders, millwrights, riggers, and safety attendants working around the clock to meet critical startup deadlines.',
    targetIndustries: ['Petrochemical Refineries', 'Power Generation', 'Pulp & Paper Mills', 'Chemical Processing'],
    deploymentSlaHours: 12,
    kpisGuaranteed: [
      'Zero Shift Delay Startup Guarantee',
      '100% Confined Space & Hole-Watch Certified Personnel',
      'Daily Real-Time Progress Burn-Down Reporting'
    ],
    deliverables: [
      'Comprehensive pre-outage safety orientation dossiers',
      'Dedicated turnarounds superintendent and tool room managers',
      '24/7 dual-shift rotating schedule coordination'
    ],
    featured: true,
  },
  {
    slug: 'warehouse-crossdock-operations',
    name: 'Warehouse Operations & Cross-Dock Labor Solutions',
    shortName: 'Cross-Dock Operations',
    category: 'Staffing',
    tagline: 'High-throughput loading, container destuffing, and inventory management teams.',
    description: 'Skilled logistics gangs engineered for fast-paced cross-dock freight sorting, high-cube pallet racking, container destuffing, and reverse logistics. Our certified equipment operators and dock specialists integrate seamlessly with your WMS (Manhattan, Blue Yonder, SAP).',
    targetIndustries: ['3PL Logistics Providers', 'Port Intermodal Terminals', 'Retail Distribution', 'Cold Chain'],
    deploymentSlaHours: 18,
    kpisGuaranteed: [
      'Average Unload Time < 85 Minutes per 53ft Trailer',
      '< 0.01% Freight Handling Damage Claims',
      '100% OSHA 1910.178 Forklift Certified Fleet Operators'
    ],
    deliverables: [
      'Inbound/outbound freight verification logs',
      'Dock safety inspection and slip-sheet verification protocol',
      'Flexible surge staffing model for holiday & promotional spikes'
    ],
    featured: true,
  }
];

export function getAllServices(): IndustrialService[] {
  return INDUSTRIAL_SERVICES;
}

export function getServiceBySlug(slug: string): IndustrialService | undefined {
  return INDUSTRIAL_SERVICES.find((s) => s.slug === slug);
}
