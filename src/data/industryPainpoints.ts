/**
 * src/data/industryPainpoints.ts
 * Enterprise Industry Risk Profiles, Safety Regulations & Operational Pain Points
 * Powers dynamic local injection vector for OperateServices PSEO
 */

export interface IndustryRiskProfile {
  sector: string;
  criticalHazards: string[];
  complianceFramework: string[];
  typicalDowntimeCostPerHour: string;
  mitigationStrategy: string;
  kpisGuaranteed: string[];
  procurementChecklist: string[];
}

export const INDUSTRY_RISK_PROFILES: Record<string, IndustryRiskProfile> = {
  petrochemical: {
    sector: 'Petrochemical & Refining',
    criticalHazards: [
      'Volatile organic compounds (VOC) and H2S gas exposure',
      'High-pressure steam and hydrocarbon line leaks during hot work',
      'Confined space atmospheric hazards in distillation columns and storage tanks',
    ],
    complianceFramework: [
      'OSHA 1910.119 (Process Safety Management of Highly Hazardous Chemicals)',
      'API 570 Piping Inspection & API 653 Tank Maintenance Standards',
      'TWIC (Transportation Worker Identification Credential) Port Security',
    ],
    typicalDowntimeCostPerHour: '$45,000 – $120,000 / hour',
    mitigationStrategy: 'Deploy only DISA-cleared, drug-tested welders and pipefitters with certified continuous atmospheric monitoring and dedicated hole-watch attendants.',
    kpisGuaranteed: ['Zero OSHA Recordable Incidents', '100% DISA / TWIC Clearance Prior to Gate Arrival', '< 0.5% Radiographic Weld Reject Rate'],
    procurementChecklist: [
      'Proof of current DISA drug & alcohol pool membership',
      'TWIC credentials verified on biometric card readers',
      'ASME Section IX 6G pipe weld qualification test coupons on file',
      'Current safety manual and OSHA 300A logs for the past 3 consecutive years',
    ],
  },
  aerospace: {
    sector: 'Aerospace & Aviation Operations',
    criticalHazards: [
      'Foreign Object Debris (FOD) contamination in jet engine intakes and flight control bays',
      'Aircraft on Ground (AOG) severe revenue loss due to technician shortages',
      'Non-conforming torque or fastener fatigue in pressurized cabin assemblies',
    ],
    complianceFramework: [
      'FAA Part 145 Certified Repair Station Personnel Requirements',
      'AS9100D Aerospace Quality Management System Standards',
      'FAA DOT Drug & Alcohol Mandatory Testing Program (14 CFR Part 120)',
    ],
    typicalDowntimeCostPerHour: '$25,000 – $80,000 / hour (AOG)',
    mitigationStrategy: 'Rigid shadow-board tool accountability, FAA logbook verification, and pre-badged SIDA mechanics ready for on-demand tarmac deployment.',
    kpisGuaranteed: ['Zero FOD Incidents Guarantee', '100% Verified FAA Airframe & Powerplant Certifications', '4-Hour Emergency AOG Dispatch SLA'],
    procurementChecklist: [
      'Active FAA A&P certificate verification on FAA airmen registry',
      'Pre-cleared 10-year FBI fingerprint background check for SIDA badge',
      'Documented tooling calibration records traceable to NIST standards',
      'Compliance with AS9100 counterfeit part avoidance procedures',
    ],
  },
  automotive: {
    sector: 'Automotive & Advanced Stamping',
    criticalHazards: [
      'Stamping press pinch point and high-tonnage mechanical hydraulic failures',
      'Robotic welding cell interlock bypasses and flash burns',
      'High-speed assembly line stoppages cascading across Tier-1 supply chains',
    ],
    complianceFramework: [
      'IATF 16949 Automotive Quality Management Standards',
      'OSHA 1910.217 Mechanical Power Presses & Machine Guarding',
      'NFPA 79 Electrical Standard for Industrial Machinery',
    ],
    typicalDowntimeCostPerHour: '$50,000 – $150,000 / hour',
    mitigationStrategy: 'On-site cross-trained multi-craft mechanics and automated shift relief rosters ensuring continuous stamping and robotic welding throughput.',
    kpisGuaranteed: ['99.8% Shift Fill Rate', 'Zero Machine Guarding Violations', '< 15-Minute Response Time to Unscheduled Press Faults'],
    procurementChecklist: [
      'Documented Lockout/Tagout (LOTO) authorized personnel certifications',
      'Fanuc/ABB robotic programming safety certificates',
      'Comprehensive General Liability and Umbrella Insurance ($10M+ coverage)',
      'Proven Tier-1 JIT (Just-In-Time) labor continuity plan',
    ],
  },
  logistics: {
    sector: 'Logistics, Warehousing & E-Commerce',
    criticalHazards: [
      'Forklift-pedestrian collisions at high-density blind intersections',
      'Ergonomic musculoskeletal injuries from repetitive manual carton loading',
      'Severe seasonal peak turnover causing trailer detention fees and SLA penalties',
    ],
    complianceFramework: [
      'OSHA 1910.178 Powered Industrial Trucks Safety Standard',
      'ANSI/ITSDF B56.1 Safety Standard for Low Lift and High Lift Trucks',
      'Department of Transportation (DOT) Dock Safety & Wheel Chocking Regulations',
    ],
    typicalDowntimeCostPerHour: '$15,000 – $40,000 / hour (Trailer Detention & Missed Sort Windows)',
    mitigationStrategy: 'Embedded on-premise coordinators, digital telematics speed tracking, structured warm-up stretches, and certified equipment operators.',
    kpisGuaranteed: ['< 85-Minute Average Trailer Unload Time', 'Zero Forklift Tip-Overs or Structural Rack Collisions', '100% OSHA 1910.178 Operator Badge Compliance'],
    procurementChecklist: [
      'OSHA 1910.178 formal classroom and practical driving evaluation records',
      'Workers’ Compensation Experience Modification Rate (EMR) below 0.85',
      'Daily breathalyzer and random screening protocols',
      'WMS integration capability for digital performance KPI tracking',
    ],
  },
  semiconductor: {
    sector: 'Semiconductor & Cleanroom Manufacturing',
    criticalHazards: [
      'Ultra-pure chemical gas line leaks (silane, arsine, phosphine)',
      'Microscopic particulate contamination ruining wafer yields (ISO Class 3/4 cleanrooms)',
      'Electrostatic Discharge (ESD) catastrophic failures on micro-electronics',
    ],
    complianceFramework: [
      'SEMI S2 Environmental, Health, and Safety Guideline for Semiconductor Equipment',
      'ISO 14644-1 Cleanrooms and Associated Controlled Environments',
      'OSHA 1910.120 Hazardous Waste Operations and Emergency Response (HAZWOPER)',
    ],
    typicalDowntimeCostPerHour: '$100,000 – $300,000 / hour',
    mitigationStrategy: 'Cleanroom protocol certified technicians, high-purity orbital welders, and strict ESD apparel auditing at all gowning airlocks.',
    kpisGuaranteed: ['Zero Protocol Contamination Violations', '100% Orbital TIG Weld Helium Mass Spectrometer Leak-Test Pass Rate', 'Continuous Cleanroom Garb Compliance'],
    procurementChecklist: [
      'ISO 14644 cleanroom protocol certification records',
      'High-purity orbital welding certifications on 316L VIM/VAR tubing',
      'Comprehensive cleanroom behavioral and gowning training logs',
      'Non-disclosure agreements and IP security protocols signed by all staff',
    ],
  },
};

export function getIndustryRiskProfile(sectorKey: string): IndustryRiskProfile {
  const clean = sectorKey.toLowerCase();
  for (const [k, v] of Object.entries(INDUSTRY_RISK_PROFILES)) {
    if (clean.includes(k)) return v;
  }
  return INDUSTRY_RISK_PROFILES.manufacturing || INDUSTRY_RISK_PROFILES.logistics;
}
