/**
 * src/data/industrialRoles.ts
 * Master Industrial Roles & Skilled Trades Registry
 * Single Source of Truth for OperateServices Job Postings & PSEO Strategy
 */

export interface IndustrialRole {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'Aviation' | 'Manufacturing' | 'Logistics' | 'Facilities' | 'Construction';
  socCode: string; // US Bureau of Labor Statistics Standard Occupational Classification
  certifications: string[];
  oshaRequired: string[];
  equipmentHandled: string[];
  baseHourlyRange: {
    min: number;
    max: number;
  };
  responsibilities: string[];
  workEnvironment: string;
  relatedRoleSlugs: string[];
  indexabilityStatus: 'eligible' | 'not-yet-eligible' | 'noindex';
  featured?: boolean;
}

export const INDUSTRIAL_ROLES: IndustrialRole[] = [
  // ─── Aviation & Airport Operations ─────────────────────────────────────────
  {
    slug: 'aircraft-maintenance-technician-ap',
    title: 'Certified A&P Aircraft Maintenance Technician',
    shortTitle: 'A&P Aircraft Mechanic',
    category: 'Aviation',
    socCode: '49-3011',
    certifications: ['FAA Airframe & Powerplant (A&P) License', 'FCC General Radiotelephone Operator License (GROL)'],
    oshaRequired: ['OSHA 10 General Industry', 'FAA Part 145 Drug & Alcohol Testing', 'Flightline Safety Protocol'],
    equipmentHandled: ['Turbine Engine Borescopes', 'Hydraulic Mule Test Rigs', 'Torque Multipliers', 'Aircraft Jacks & Rigging Fixtures'],
    baseHourlyRange: { min: 38, max: 64 },
    responsibilities: [
      'Perform scheduled phase inspections, C-checks, and flightline turnarounds per FAA Part 145 repair station standards.',
      'Troubleshoot and overhaul turbofan engines, APUs, thrust reversers, and pneumatic bleed air systems.',
      'Document all maintenance actions, logbook signoffs, and FAA 8130-3 airworthiness release forms.',
      'Execute avionics harness diagnostics, pitot-static system leak tests, and flight control rigging.',
    ],
    workEnvironment: 'Active airport hangars, flight lines, and MRO maintenance stations.',
    relatedRoleSlugs: ['avionics-technician-aerospace', 'airport-ramp-ground-handler', 'aerospace-structural-riveter'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'avionics-technician-aerospace',
    title: 'Avionics Installation & Flightline Systems Technician',
    shortTitle: 'Avionics Technician',
    category: 'Aviation',
    socCode: '49-2091',
    certifications: ['NCATT AET (Aircraft Electronics Technician)', 'FAA Repairman Certificate or A&P'],
    oshaRequired: ['Electrostatic Discharge (ESD) Safety', 'OSHA 10 General Industry'],
    equipmentHandled: ['Digital Oscilloscopes', 'Pitot-Static Flight Line Test Sets', 'TDR Cable Analyzers', 'Nav/Comm Signal Generators'],
    baseHourlyRange: { min: 35, max: 58 },
    responsibilities: [
      'Install, calibrate, and troubleshoot glass cockpit displays, TCAS, weather radar, and fly-by-wire flight control computers.',
      'Perform coaxial harness routing, pin crimping, and MIL-SPEC circular connector terminations.',
      'Verify RVSM (Reduced Vertical Separation Minimum) altimeter accuracy and navigation integrity.',
    ],
    workEnvironment: 'Temperature-controlled avionics shops and clean flightline bays.',
    relatedRoleSlugs: ['aircraft-maintenance-technician-ap', 'aerospace-structural-riveter'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'airport-ramp-ground-handler',
    title: 'Airport Ramp Operations & Baggage Ground Crew',
    shortTitle: 'Airport Ramp Specialist',
    category: 'Aviation',
    socCode: '53-7065',
    certifications: ['SIDA Airport Security Badge', 'IATA Ramp Operations Certification', 'Valid Driver License'],
    oshaRequired: ['OSHA Hearing Conservation Program', 'Ramp Marshalling Protocol', 'Baggage Tug Driving Safety'],
    equipmentHandled: ['Belt Loaders', 'Baggage Tugs & Carts', 'Ground Power Units (GPU)', 'Air Start Units', 'Pushback Tractors'],
    baseHourlyRange: { min: 20, max: 32 },
    responsibilities: [
      'Marshal arriving and departing commercial aircraft into terminal gates using illuminated wands.',
      'Execute rapid cargo and passenger baggage loading/unloading within 25-minute turnaround SLAs.',
      'Position ground support equipment (GPU, PCA, Lavatory service trucks) under strict flightline safety rules.',
    ],
    workEnvironment: 'Active commercial airport tarmac in all weather conditions.',
    relatedRoleSlugs: ['aircraft-maintenance-technician-ap', 'certified-forklift-operator'],
    indexabilityStatus: 'eligible',
  },

  // ─── Manufacturing & Production ───────────────────────────────────────────
  {
    slug: 'certified-mig-tig-pipe-welder',
    title: 'Certified MIG/TIG High-Pressure Pipe Welder',
    shortTitle: 'Pipe Welder (6G / AWS)',
    category: 'Manufacturing',
    socCode: '51-4121',
    certifications: ['AWS D1.1 Structural Steel', 'ASME Section IX 6G Pipe', 'API 1104 Pipeline Certification'],
    oshaRequired: ['OSHA 10 Construction', 'Hot Work Permit Certification', 'Confined Space Welding'],
    equipmentHandled: ['Miller Dynasty TIG Welders', 'Lincoln Electric Dual Shield MIG Rigs', 'Pipe Facing bevelers', 'Oxygen-Acetylene Torches'],
    baseHourlyRange: { min: 34, max: 58 },
    responsibilities: [
      'Perform multi-pass X-ray quality root and cap welds on carbon steel, stainless steel, and Inconel high-pressure piping.',
      'Maintain 100% radiographic inspection passing rates on heavy chemical, refinery, and steam distribution lines.',
      'Pre-heat and post-weld heat treat (PWHT) alloy metals to prevent micro-fractures.',
    ],
    workEnvironment: 'Fabrication shops, petrochemical plants, offshore modules, and boiler houses.',
    relatedRoleSlugs: ['industrial-maintenance-mechanic', 'pipefitter-steamfitter', 'structural-steel-ironworker-rigger'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'cnc-machinist-multi-axis',
    title: 'Precision CNC Machinist & Multi-Axis Programmer',
    shortTitle: 'CNC Machinist',
    category: 'Manufacturing',
    socCode: '51-9041',
    certifications: ['NIMS Machining Level II', 'Mastercam Programmer Certification', 'Journeyman Tool & Die'],
    oshaRequired: ['Machine Guarding (OSHA 1910.212)', 'Eye & Cut-Resistant PPE'],
    equipmentHandled: ['Haas 5-Axis VMC', 'Mazak Integrex Multi-Tasking Lathes', 'Renishaw Probing Systems', 'Mitutoyo CMM Arms'],
    baseHourlyRange: { min: 30, max: 52 },
    responsibilities: [
      'Set up and operate 3-axis, 4-axis, and 5-axis vertical machining centers holding tolerances within ±0.0002 inches.',
      'Optimize G-code and CAM toolpaths to maximize spindle feed rates and eliminate chatter on aerospace alloys.',
      'Perform first-article inspections using bore micrometers, optical comparators, and coordinate measuring machines.',
    ],
    workEnvironment: 'Clean, climate-controlled precision manufacturing facilities.',
    relatedRoleSlugs: ['certified-mig-tig-pipe-welder', 'quality-control-cmm-inspector'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'industrial-maintenance-mechanic',
    title: 'Industrial Maintenance Mechanic & Millwright',
    shortTitle: 'Industrial Maintenance Mechanic',
    category: 'Manufacturing',
    socCode: '49-9041',
    certifications: ['CMRP (Certified Maintenance & Reliability Professional)', 'NCCER Millwright Level 3'],
    oshaRequired: ['Lockout/Tagout (LOTO - OSHA 1910.147)', 'Confined Space Entry', 'Fall Protection'],
    equipmentHandled: ['Laser Shaft Alignment Tools', 'Hydraulic Press Units', 'Stroboscopic Vibration Analyzers', 'Rigging Jacks & Hoists'],
    baseHourlyRange: { min: 29, max: 48 },
    responsibilities: [
      'Maintain, disassemble, and align high-speed bottling lines, automated conveyor sortation belts, and industrial gearboxes.',
      'Execute dynamic laser alignment on 500HP electric drive motors and centrifugal slurry pumps.',
      'Diagnose hydraulic proportional valves, pneumatic manifolds, and lubrication recirculation loops.',
    ],
    workEnvironment: 'High-volume production plants, paper mills, automotive stamping facilities.',
    relatedRoleSlugs: ['industrial-electrician-plc-technician', 'certified-mig-tig-pipe-welder', 'hvacr-industrial-chiller-technician'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'quality-control-cmm-inspector',
    title: 'Quality Control Inspector & CMM Technician',
    shortTitle: 'Quality Inspector',
    category: 'Manufacturing',
    socCode: '51-9061',
    certifications: ['ASQ Certified Quality Inspector (CQI)', 'Hexagon / Zeiss CMM Operator Certificate'],
    oshaRequired: ['OSHA 10 General Industry'],
    equipmentHandled: ['Zeiss Coordinate Measuring Machines (CMM)', 'Keyence Optical Comparators', 'Surface Roughness Profilometers'],
    baseHourlyRange: { min: 26, max: 44 },
    responsibilities: [
      'Verify complex machined parts against CAD models and GD&T (Geometric Dimensioning & Tolerancing) callouts.',
      'Issue Non-Conformance Reports (NCR) and conduct Root Cause Corrective Action (RCCA) investigations.',
      'Manage calibration schedules for shop floor micrometers, height gauges, and thread plug sets.',
    ],
    workEnvironment: 'Cleanroom quality labs and production inspection stations.',
    relatedRoleSlugs: ['cnc-machinist-multi-axis', 'industrial-maintenance-mechanic'],
    indexabilityStatus: 'eligible',
  },

  // ─── Distribution & Logistics ─────────────────────────────────────────────
  {
    slug: 'certified-forklift-operator',
    title: 'Certified Forklift & High-Reach Truck Operator',
    shortTitle: 'Forklift Operator',
    category: 'Logistics',
    socCode: '53-7051',
    certifications: ['OSHA 1910.178 Forklift Certification (Class I, II, IV, V)', 'High-Reach Narrow Aisle License'],
    oshaRequired: ['OSHA Powered Industrial Truck Safety', 'Dock Safety & Pedestrian Separation'],
    equipmentHandled: ['Crown High-Reach Trucks (40ft mast)', 'Raymond Order Pickers', 'Toyota Sit-Down Propane Forklifts', 'Electric Pallet Jacks'],
    baseHourlyRange: { min: 21, max: 35 },
    responsibilities: [
      'Navigate narrow-aisle pallet racking to pick and put away double-deep freight up to 40 feet elevation.',
      'Conduct daily pre-shift inspection checklist (mast hydraulics, chain tension, battery fluid, brakes).',
      'Load and unload 53ft dry van trailers and ocean intermodal containers at busy distribution cross-docks.',
    ],
    workEnvironment: 'High-cube 3PL e-commerce fulfillment centers and refrigerated cold storage facilities.',
    relatedRoleSlugs: ['warehouse-material-handler-lead', 'airport-ramp-ground-handler'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'warehouse-material-handler-lead',
    title: 'Warehouse Material Handler & Container Destuffing Lead',
    shortTitle: 'Material Handler / Dock Lead',
    category: 'Logistics',
    socCode: '53-7062',
    certifications: ['Supply Chain Logistics Associate (CLA)', 'Electric Walkie Stacker Certified'],
    oshaRequired: ['Safe Lifting & Ergonomics Protocol (OSHA 1910)', 'Dock Lock & Chock Procedures'],
    equipmentHandled: ['Electric Pallet Jacks (Rider)', 'RF Barcode Scanners (Zebra/Honeywell)', 'Stretch Wrap Turntables', 'Dock Levelers'],
    baseHourlyRange: { min: 19, max: 30 },
    responsibilities: [
      'Lead container destuffing and cross-dock pallet sortation teams achieving 300+ cartons/hour throughput.',
      'Operate warehouse management systems (Manhattan, SAP EWM, Blue Yonder) for inventory scans and bin transfers.',
      'Audit pallet stability, slip-sheet placement, and edge-protector strapping prior to freight outbound.',
    ],
    workEnvironment: 'Fast-paced logistics cross-docks and fulfillment hubs.',
    relatedRoleSlugs: ['certified-forklift-operator', 'airport-ramp-ground-handler'],
    indexabilityStatus: 'eligible',
  },

  // ─── Facilities & Maintenance ─────────────────────────────────────────────
  {
    slug: 'industrial-electrician-plc-technician',
    title: 'Industrial Electrician & PLC Automation Technician',
    shortTitle: 'Industrial Electrician (480V / PLC)',
    category: 'Facilities',
    socCode: '47-2111',
    certifications: ['State Journeyman Electrician License', 'NFPA 70E Arc Flash Safety', 'Allen-Bradley Rockwell Automation Certified'],
    oshaRequired: ['OSHA 30 Construction', 'NFPA 70E Standard for Electrical Safety in the Workplace', 'LOTO'],
    equipmentHandled: ['Fluke 87V Industrial Multimeters', 'Megohmmeters (Megger Insulation Testers)', 'Allen-Bradley ControlLogix PLCs', '480V 3-Phase Switchgear'],
    baseHourlyRange: { min: 36, max: 62 },
    responsibilities: [
      'Install, commission, and troubleshoot 480V 3-phase industrial power feeds, motor control centers (MCC), and VFDs.',
      'Connect to Allen-Bradley and Siemens PLCs via Ethernet/IP to diagnose ladder logic faults and sensor feedback errors.',
      'Enforce strict NFPA 70E PPE compliance (Cat 4 arc-flash suits) when working within flash protection boundaries.',
    ],
    workEnvironment: 'Industrial plants, commercial high-rises, automated distribution centers.',
    relatedRoleSlugs: ['industrial-maintenance-mechanic', 'hvacr-industrial-chiller-technician'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'hvacr-industrial-chiller-technician',
    title: 'Commercial HVAC/R Industrial Chiller Technician',
    shortTitle: 'HVAC/R Chiller Mechanic',
    category: 'Facilities',
    socCode: '49-9021',
    certifications: ['EPA Universal Section 608 License', 'NATE Commercial Refrigeration Certification'],
    oshaRequired: ['Hazardous Refrigerant Handling (ASHRAE 15)', 'Confined Space & Roof Safety'],
    equipmentHandled: ['Carrier & York Centrifugal Chillers', 'Digital Refrigeration Gauges', 'Refrigerant Recovery Units', 'Air Balancing Hoods'],
    baseHourlyRange: { min: 34, max: 56 },
    responsibilities: [
      'Service and overhaul 500+ ton centrifugal water chillers, cooling towers, and ammonia refrigeration loops.',
      'Diagnose VAV airflow distribution, pneumatic thermostat controls, and Building Automation Systems (Johnson Controls Metasys).',
      'Recover and recharge R-410A, R-134a, and low-GWP refrigerants in full accordance with Clean Air Act Section 608.',
    ],
    workEnvironment: 'Commercial campus plant rooms, data centers, pharmaceutical cold storage facilities.',
    relatedRoleSlugs: ['industrial-electrician-plc-technician', 'industrial-maintenance-mechanic'],
    indexabilityStatus: 'eligible',
  },

  // ─── Construction & Heavy Infrastructure ─────────────────────────────────
  {
    slug: 'heavy-equipment-crane-operator',
    title: 'Heavy Equipment & Mobile Crane Operator',
    shortTitle: 'Crane & Heavy Equipment Operator',
    category: 'Construction',
    socCode: '53-7021',
    certifications: ['NCCCO Mobile Crane Operator (TSS, TLL, LBC)', 'Valid Commercial Driver License (CDL-A)'],
    oshaRequired: ['OSHA Subpart CC - Cranes & Derricks in Construction', 'Rigging & Signal Person Safety'],
    equipmentHandled: ['Liebherr 100-Ton All-Terrain Cranes', 'CAT 349 Excavators', 'Komatsu D85 Dozers', 'Grove Rough-Terrain Cranes'],
    baseHourlyRange: { min: 36, max: 62 },
    responsibilities: [
      'Execute critical tandem crane picks and structural steel erection following calculated lift plan engineering sheets.',
      'Conduct daily wire rope, hydraulic outrigger, and Load Moment Indicator (LMI) computer safety inspections.',
      'Operate heavy earthmoving excavators on civil grading, trench shoring, and industrial foundation projects.',
    ],
    workEnvironment: 'Heavy industrial civil works, bridge construction, port terminal upgrades.',
    relatedRoleSlugs: ['structural-steel-ironworker-rigger', 'certified-mig-tig-pipe-welder'],
    indexabilityStatus: 'eligible',
    featured: true,
  },
  {
    slug: 'structural-steel-ironworker-rigger',
    title: 'Structural Steel Ironworker & Master Rigger',
    shortTitle: 'Structural Ironworker & Rigger',
    category: 'Construction',
    socCode: '47-2221',
    certifications: ['NCCCO Certified Rigger Level II', 'AWS D1.1 Certified Welder', 'Qualified Signal Person'],
    oshaRequired: ['OSHA Subpart R - Steel Erection Standard', '100% Tie-Off Fall Protection at Heights'],
    equipmentHandled: ['Impact Wrenches (Torque-Controlled)', 'Chain Hoists & Come-Alongs', 'Spreader Bars', 'Torque Spud Wrenches'],
    baseHourlyRange: { min: 32, max: 54 },
    responsibilities: [
      'Connect, plumb, bolt up, and torque heavy wide-flange structural steel beams at elevations up to 200 feet.',
      'Inspect wire rope slings, synthetic web chokers, and shackles prior to each crane pick.',
      'Execute bolt torque tension verification using Skidmore-Wilhelm calibrators and calibrated hydraulic guns.',
    ],
    workEnvironment: 'Pre-engineered steel building erections, petrochemical structures, high-rise frames.',
    relatedRoleSlugs: ['heavy-equipment-crane-operator', 'certified-mig-tig-pipe-welder'],
    indexabilityStatus: 'eligible',
  },
  {
    slug: 'pipefitter-steamfitter',
    title: 'Industrial Pipefitter & High-Pressure Steamfitter',
    shortTitle: 'Industrial Pipefitter',
    category: 'Construction',
    socCode: '47-2152',
    certifications: ['UA Journeyman Pipefitter Certificate', 'NCCER Pipefitting Level 4'],
    oshaRequired: ['OSHA 30 Construction', 'Confined Space Trenching & Shoring'],
    equipmentHandled: ['Hydraulic Pipe Benders', 'Ridgid 300 Threading Machines', 'Pipe Laser Levels', 'Hydrostatic Test Pumps'],
    baseHourlyRange: { min: 33, max: 56 },
    responsibilities: [
      'Fabricate, route, and hang schedule 40/80 process piping, steam headers, and chilled water mains per ASME B31.3.',
      'Perform hydrostatic pressure testing up to 1,500 PSI to verify zero leakage across all welded joints and flanges.',
      'Cut and bevel pipe spools with oxy-fuel and plasma cutters to exact isometric drawing tolerances.',
    ],
    workEnvironment: 'New plant builds, boiler room revamps, pharmaceutical process piping corridors.',
    relatedRoleSlugs: ['certified-mig-tig-pipe-welder', 'industrial-maintenance-mechanic'],
    indexabilityStatus: 'eligible',
  },
];

export function getAllIndustrialRoles(): IndustrialRole[] {
  return INDUSTRIAL_ROLES;
}

export function getRoleBySlug(slug: string): IndustrialRole | undefined {
  return INDUSTRIAL_ROLES.find((r) => r.slug === slug);
}
