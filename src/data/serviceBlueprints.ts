/**
 * src/data/serviceBlueprints.ts
 * Standard Operating Procedures (SOPs) & Service Blueprints for OperateServices
 */

export interface ServiceBlueprint {
  slug: string;
  name: string;
  sopSteps: Array<{
    stepNumber: number;
    title: string;
    detail: string;
  }>;
  deployedEquipment: string[];
  personnelProfiles: string[];
  complianceGuarantees: string[];
  reportingCadence: string;
}

export const SERVICE_BLUEPRINTS: Record<string, ServiceBlueprint> = {
  'technical-skilled-trades-staffing': {
    slug: 'technical-skilled-trades-staffing',
    name: 'Technical & Skilled Trades Staffing',
    sopSteps: [
      {
        stepNumber: 1,
        title: 'Rigorous Hands-On Skills Testing',
        detail: 'Candidates complete practical weld coupon tests, CNC programming simulations, or electrical diagnostic bench exams before client submission.',
      },
      {
        stepNumber: 2,
        title: 'Credential & Background Dossier Compilation',
        detail: 'Comprehensive verification of state licenses, AWS/ASME stamps, 10-panel drug screens, and past employer tenure audits.',
      },
      {
        stepNumber: 3,
        title: 'Site-Specific Safety Induction',
        detail: 'Mandatory completion of facility safety rules, LOTO procedures, PPE verification, and emergency evacuation protocols prior to clocking in.',
      },
      {
        stepNumber: 4,
        title: 'Ongoing Quality & Production Checkpoints',
        detail: 'Weekly supervisory check-ins with client floor managers to ensure weld X-ray pass rates, machining tolerances, and shift punctuality.',
      },
    ],
    deployedEquipment: [
      'Calibrated Auto-Darkening Welding Helmets & Flame-Resistant Leathers',
      'Fluke True-RMS Multimeters & Arc-Flash Rated Hand Tools',
      'PPE Kits (Steel-Toe Metatarsal Boots, Z87.1 Safety Glasses, Cut-Level 5 Gloves)',
      'Digital Calipers, Micrometers & Inspection Gauges',
    ],
    personnelProfiles: [
      'Certified Journeyman Welders with 6G ASME pipe stamps',
      'Experienced Industrial Mechanics with CMRP or NCCER credentials',
      'Multi-axis CNC Machinists proficient in Mastercam and G-Code editing',
      'Licensed Industrial Electricians with NFPA 70E Arc Flash certifications',
    ],
    complianceGuarantees: [
      '100% Drug Screen & DISA / TWIC clearance on file',
      'Full statutory payroll taxes, workers comp, and general liability indemnification',
      '48-hour no-cost replacement guarantee if a technician fails client standards',
    ],
    reportingCadence: 'Daily digital shift attendance, weekly productivity scores, and bi-weekly safety audit logs.',
  },
  'high-volume-recruiting': {
    slug: 'high-volume-recruiting',
    name: 'High-Volume Industrial & Logistics Recruiting',
    sopSteps: [
      {
        stepNumber: 1,
        title: 'Automated Demand & Capacity Forecasting',
        detail: 'Client production forecasts and trailer schedules are converted into exact daily shift headcount requirements.',
      },
      {
        stepNumber: 2,
        title: 'Rapid Talent Intake & Screening Pipeline',
        detail: 'High-volume digital application screening, automated background checks, and physical agility assessments.',
      },
      {
        stepNumber: 3,
        title: 'Cohort Orientation & Badge Issuance',
        detail: 'Group safety training, facility walk-through, timeclock registration, and locker assignments completed in structured cohorts.',
      },
      {
        stepNumber: 4,
        title: 'Dynamic Roster Management & Absenteeism Backfill',
        detail: 'Daily 15% bench pool ready on 60-minute notice to backfill unexpected absences and keep lines running at 100% capacity.',
      },
    ],
    deployedEquipment: [
      'Biometric & RFID Timeclock Terminals',
      'Hi-Visibility Safety Vests & Anti-Fatigue Insoles',
      'RF Inventory Scanners & Holsters',
      'Ergonomic Back-Support Belts for Heavy Lifting',
    ],
    personnelProfiles: [
      'OSHA 1910.178 Certified Forklift & Reach Truck Operators',
      'Experienced Container Destuffers & Pallet Builders',
      'High-Speed Order Pickers & RF Scanner Operators',
      'Assembly Line Operators trained in 5S lean manufacturing principles',
    ],
    complianceGuarantees: [
      '99.4% Shift Roster Fill Rate guarantee',
      '100% I-9 E-Verify employment eligibility compliance',
      'Zero unauthorized overtime billing without written client authorization',
    ],
    reportingCadence: 'Real-time shift clock-in dashboards, daily headcount variance reports, and weekly turnover analysis.',
  },
};

export function getServiceBlueprint(serviceSlug: string): ServiceBlueprint {
  return SERVICE_BLUEPRINTS[serviceSlug] || SERVICE_BLUEPRINTS['technical-skilled-trades-staffing'];
}
