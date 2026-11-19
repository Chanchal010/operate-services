/**
 * src/data/industrialCorridors.ts
 * Master Industrial Corridors & Manufacturing Belts Registry
 * Single Source of Truth for OperateServices PSEO & GEO Architecture
 */

export interface IndustrialCorridor {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  stateCode: string;
  metroArea: string;
  corridorType: 'Petrochemical' | 'Aerospace' | 'Automotive' | 'Logistics' | 'Heavy Manufacturing' | 'Semiconductor' | 'Marine';
  keyZones: string[];
  wageBenchmark: {
    minHourly: number;
    maxHourly: number;
    overtimeMultiplier: number;
  };
  primaryHighways: string[];
  railheadsAndPorts: string[];
  airCargoHubs: string[];
  oshaJurisdiction: string;
  prevailingWageLaw: string;
  activeFacilitiesCount: number;
  deploymentSlaHours: number;
  nearestOpsCenter: string;
  featured?: boolean;
}

export const INDUSTRIAL_CORRIDORS: IndustrialCorridor[] = [
  // ─── Texas & Gulf Coast ───────────────────────────────────────────────────
  {
    slug: 'houston-ship-channel',
    name: 'Houston Ship Channel & Petrochemical Complex',
    shortName: 'Houston Ship Channel',
    state: 'Texas',
    stateCode: 'TX',
    metroArea: 'Greater Houston',
    corridorType: 'Petrochemical',
    keyZones: ['Pasadena Industrial District', 'Baytown Refinery Complex', 'Deer Park Petrochemical Hub', 'Texas City Marine Terminal', 'La Porte Chemical Basin'],
    wageBenchmark: { minHourly: 32, maxHourly: 56, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-10 East', 'I-610 Loop', 'TX-225', 'Beltway 8'],
    railheadsAndPorts: ['Port of Houston Turning Basin', 'BNSF Booth Yard', 'UP Englewood Yard'],
    airCargoHubs: ['George Bush Intercontinental (IAH)', 'William P. Hobby (HOU)'],
    oshaJurisdiction: 'OSHA Region 6 (Dallas/Houston South Area Office)',
    prevailingWageLaw: 'Davis-Bacon Act & Texas Labor Code Chapter 62',
    activeFacilitiesCount: 168,
    deploymentSlaHours: 12,
    nearestOpsCenter: 'Houston Regional Industrial Command — Pasadena Operations Desk',
    featured: true,
  },
  {
    slug: 'dallas-fort-worth-logistics',
    name: 'Dallas-Fort Worth Logistics & Air Cargo Gateway',
    shortName: 'DFW Logistics Corridor',
    state: 'Texas',
    stateCode: 'TX',
    metroArea: 'Dallas-Fort Worth Metroplex',
    corridorType: 'Logistics',
    keyZones: ['Alliance Texas Mega-Hub', 'Great Southwest Industrial District', 'South Dallas Inland Port', 'D/FW Airport Foreign Trade Zone #39'],
    wageBenchmark: { minHourly: 22, maxHourly: 42, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-35W / I-35E', 'I-20 Transcontinental', 'I-30', 'TX-114'],
    railheadsAndPorts: ['BNSF Alliance Intermodal Facility', 'Union Pacific Dallas Intermodal Terminal (DIT)'],
    airCargoHubs: ['Dallas/Fort Worth International (DFW)', 'Fort Worth Alliance (AFW)'],
    oshaJurisdiction: 'OSHA Region 6 (Dallas Area Office)',
    prevailingWageLaw: 'Texas Labor Code Chapter 62 (Fair Labor Standards)',
    activeFacilitiesCount: 240,
    deploymentSlaHours: 18,
    nearestOpsCenter: 'DFW Strategic Hub — Fort Worth Alliance Dispatch Desk',
    featured: true,
  },

  // ─── California & West Coast ──────────────────────────────────────────────
  {
    slug: 'inland-empire-logistics',
    name: 'Inland Empire Logistics & Supply Chain Corridor',
    shortName: 'Inland Empire Logistics Hub',
    state: 'California',
    stateCode: 'CA',
    metroArea: 'Riverside-San Bernardino-Ontario',
    corridorType: 'Logistics',
    keyZones: ['Ontario International Logistics Basin', 'San Bernardino Cargo Hub', 'Moreno Valley 3PL Center', 'Fontana Cross-Dock Yards', 'Mira Loma Logistics Park'],
    wageBenchmark: { minHourly: 24, maxHourly: 45, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-10 San Bernardino Fwy', 'I-15 Mojave Corridor', 'CA-60 Pomona Fwy'],
    railheadsAndPorts: ['BNSF San Bernardino Intermodal Yard', 'Union Pacific West Colton Yard'],
    airCargoHubs: ['Ontario International (ONT Cargo)', 'San Bernardino International (SBD)'],
    oshaJurisdiction: 'Cal/OSHA (San Bernardino District Office)',
    prevailingWageLaw: 'California Industrial Welfare Commission (IWC Wage Order 9-2001)',
    activeFacilitiesCount: 310,
    deploymentSlaHours: 16,
    nearestOpsCenter: 'Southern California Command — Ontario Logistics Desk',
    featured: true,
  },
  {
    slug: 'los-angeles-long-beach-ports',
    name: 'Port of Los Angeles & Long Beach Maritime Corridor',
    shortName: 'LA / Long Beach Port Complex',
    state: 'California',
    stateCode: 'CA',
    metroArea: 'Greater Los Angeles',
    corridorType: 'Marine',
    keyZones: ['San Pedro Bay Terminal', 'Terminal Island Container Yards', 'Carson Logistics Belt', 'Compton Freight Logistics Zone'],
    wageBenchmark: { minHourly: 28, maxHourly: 58, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-710 Long Beach Fwy', 'I-110 Harbor Fwy', 'CA-47 Ocean Blvd'],
    railheadsAndPorts: ['Port of Los Angeles (POLA)', 'Port of Long Beach (POLB)', 'Alameda Corridor Rail Expressway'],
    airCargoHubs: ['Los Angeles International (LAX Cargo)', 'Long Beach Airport (LGB)'],
    oshaJurisdiction: 'Cal/OSHA & OSHA Maritime Advisory Committee (MACOSH)',
    prevailingWageLaw: 'California Labor Code Section 1720 / Maritime Wage Agreements',
    activeFacilitiesCount: 195,
    deploymentSlaHours: 12,
    nearestOpsCenter: 'Pacific Maritime Operations — Carson Terminal Desk',
    featured: true,
  },
  {
    slug: 'seattle-everett-aerospace',
    name: 'Seattle-Everett Aerospace & Advanced Manufacturing Belt',
    shortName: 'Everett Aerospace Belt',
    state: 'Washington',
    stateCode: 'WA',
    metroArea: 'Greater Seattle / Puget Sound',
    corridorType: 'Aerospace',
    keyZones: ['Paine Field Aerospace Basin', 'Renton Commercial Assembly Hub', 'Kent Valley Industrial Corridor', 'Auburn Logistics Gateway'],
    wageBenchmark: { minHourly: 34, maxHourly: 62, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-5 Pacific Highway', 'WA-526 Boeing Fwy', 'WA-167 Valley Corridor'],
    railheadsAndPorts: ['Port of Seattle', 'Port of Tacoma', 'BNSF Intermodal Hub Seattle'],
    airCargoHubs: ['Seattle-Tacoma International (SEA)', 'Snohomish County Paine Field (PAE)'],
    oshaJurisdiction: 'Washington DOSH (WISHA Safety Standards)',
    prevailingWageLaw: 'Washington State Prevailing Wage Act (RCW 39.12)',
    activeFacilitiesCount: 135,
    deploymentSlaHours: 18,
    nearestOpsCenter: 'Pacific Northwest Command — Everett Aerospace Desk',
    featured: true,
  },

  // ─── Midwest & Automotive Heartland ───────────────────────────────────────
  {
    slug: 'detroit-warren-automotive',
    name: 'Detroit-Warren Advanced Automotive & Tooling Corridor',
    shortName: 'Detroit Automotive Belt',
    state: 'Michigan',
    stateCode: 'MI',
    metroArea: 'Metro Detroit',
    corridorType: 'Automotive',
    keyZones: ['Warren Stamping & Tech Center', 'Sterling Heights Assembly Hub', 'Dearborn Heavy Stamping Zone', 'Romulus Airport Logistics Basin', 'Livonia Transmission Belt'],
    wageBenchmark: { minHourly: 28, maxHourly: 52, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-94 Industrial Fwy', 'I-75 Auto Alley', 'I-696 Walter Reuther'],
    railheadsAndPorts: ['Port of Detroit', 'Conrail Shared Assets Yard', 'Norfolk Southern Detroit Intermodal'],
    airCargoHubs: ['Detroit Metropolitan Wayne County (DTW Cargo)', 'Willow Run Air Cargo (YIP)'],
    oshaJurisdiction: 'MIOSHA (Michigan Occupational Safety & Health Administration)',
    prevailingWageLaw: 'Michigan Public Act 10 of 2023 (Restored Prevailing Wage)',
    activeFacilitiesCount: 220,
    deploymentSlaHours: 14,
    nearestOpsCenter: 'Midwest Automotive Desk — Warren Technical Operations Center',
    featured: true,
  },
  {
    slug: 'chicago-gary-midwest-crossroads',
    name: 'Chicago-Gary Midwest Industrial & Rail Crossroads',
    shortName: 'Chicago Industrial Crossroads',
    state: 'Illinois',
    stateCode: 'IL',
    metroArea: 'Chicagoland / Northwest Indiana',
    corridorType: 'Heavy Manufacturing',
    keyZones: ['Gary Steel Mills & Marine Complex', 'Bedford Park Logistics Hub', 'Elk Grove Technology Park', 'Joliet-Elwood Intermodal Hub'],
    wageBenchmark: { minHourly: 26, maxHourly: 50, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-80 Transcontinental', 'I-90 / I-94', 'I-55 Stevenson Expressway'],
    railheadsAndPorts: ['BNSF Logistics Park Chicago (LPC)', 'Union Pacific Global IV Center Point Intermodal', 'Port of Indiana-Burns Harbor'],
    airCargoHubs: ['Chicago O\'Hare International (ORD Cargo)', 'Chicago Rockford International (RFD)'],
    oshaJurisdiction: 'OSHA Region 5 (Chicago Area Office)',
    prevailingWageLaw: 'Illinois Prevailing Wage Act (820 ILCS 130/)',
    activeFacilitiesCount: 340,
    deploymentSlaHours: 12,
    nearestOpsCenter: 'Great Lakes Regional Command — Joliet Intermodal Operations Desk',
    featured: true,
  },
  {
    slug: 'indianapolis-crossroads-logistics',
    name: 'Indianapolis Crossroads Logistics & Distribution Network',
    shortName: 'Indianapolis Logistics Crossroads',
    state: 'Indiana',
    stateCode: 'IN',
    metroArea: 'Greater Indianapolis',
    corridorType: 'Logistics',
    keyZones: ['Plainfield Warehousing Corridor', 'Mount Comfort Distribution Park', 'Greenwood Logistics Center', 'Whitestown Fulfillment Basin'],
    wageBenchmark: { minHourly: 21, maxHourly: 38, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-70', 'I-65', 'I-69', 'I-465 Beltway'],
    railheadsAndPorts: ['CSX Hawthorne Yard', 'Indiana Rail Road Senate Avenue Terminal'],
    airCargoHubs: ['Indianapolis International (IND FedEx World Hub #2)'],
    oshaJurisdiction: 'IOSHA (Indiana Department of Labor)',
    prevailingWageLaw: 'Indiana Common Construction Wage Compliance Framework',
    activeFacilitiesCount: 185,
    deploymentSlaHours: 16,
    nearestOpsCenter: 'Crossroads Operations Desk — Plainfield Logistics Terminal',
    featured: true,
  },

  // ─── Southeast & Mid-Atlantic ─────────────────────────────────────────────
  {
    slug: 'savannah-port-logistics',
    name: 'Savannah Port Ocean Terminal & Interstate Corridor',
    shortName: 'Savannah Port Corridor',
    state: 'Georgia',
    stateCode: 'GA',
    metroArea: 'Savannah Metropolitan',
    corridorType: 'Logistics',
    keyZones: ['Garden City Ocean Terminal Hub', 'I-95 Mega Distribution Corridor', 'Pooler Logistics Basin', 'Rincon Industrial Gateway'],
    wageBenchmark: { minHourly: 23, maxHourly: 42, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-95 Eastern Seaboard Corridor', 'I-16 Inland Connector', 'GA-21'],
    railheadsAndPorts: ['Georgia Ports Authority Garden City Terminal', 'Mason Mega Rail Intermodal Terminal'],
    airCargoHubs: ['Savannah/Hilton Head International (SAV)'],
    oshaJurisdiction: 'OSHA Region 4 (Savannah Area Office)',
    prevailingWageLaw: 'Georgia State Code § 34-4-3 (Minimum Wage Law)',
    activeFacilitiesCount: 145,
    deploymentSlaHours: 14,
    nearestOpsCenter: 'Southeast Maritime Desk — Pooler Logistics Command',
    featured: true,
  },
  {
    slug: 'atlanta-air-cargo-supply-chain',
    name: 'Atlanta Air Cargo & Interstate Distribution Crossroads',
    shortName: 'Atlanta Supply Chain Belt',
    state: 'Georgia',
    stateCode: 'GA',
    metroArea: 'Metro Atlanta',
    corridorType: 'Logistics',
    keyZones: ['Hartsfield-Jackson Air Cargo City', 'I-85 South Industrial Corridor (Fairburn/Newnan)', 'I-75 North Logistics Basin (Cartersville)', 'Gwinnett Distribution Belt'],
    wageBenchmark: { minHourly: 22, maxHourly: 44, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-85', 'I-75', 'I-20', 'I-285 Perimeter'],
    railheadsAndPorts: ['Norfolk Southern Inman Yard', 'CSX Tilford Yard / Fairburn Intermodal'],
    airCargoHubs: ['Hartsfield-Jackson Atlanta International (ATL Cargo City)'],
    oshaJurisdiction: 'OSHA Region 4 (Atlanta West Area Office)',
    prevailingWageLaw: 'Georgia Labor Department Administrative Code § 300',
    activeFacilitiesCount: 290,
    deploymentSlaHours: 12,
    nearestOpsCenter: 'Atlanta Operations Center — Fairburn Logistics Desk',
    featured: true,
  },
  {
    slug: 'charlotte-advanced-energy',
    name: 'Charlotte Advanced Energy, Aviation & Logistics Corridor',
    shortName: 'Charlotte Industrial Belt',
    state: 'North Carolina',
    stateCode: 'NC',
    metroArea: 'Charlotte-Concord-Gastonia',
    corridorType: 'Heavy Manufacturing',
    keyZones: ['I-77 Southern Industrial Basin', 'Concord Advanced Technology Park', 'Gastonia Manufacturing Belt', 'CLT Airport Intermodal Facility'],
    wageBenchmark: { minHourly: 25, maxHourly: 48, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-85', 'I-77', 'I-485 Outer Belt'],
    railheadsAndPorts: ['Norfolk Southern Charlotte Regional Intermodal Facility'],
    airCargoHubs: ['Charlotte Douglas International (CLT Cargo)'],
    oshaJurisdiction: 'NC OSH Division (North Carolina Department of Labor)',
    prevailingWageLaw: 'North Carolina Wage and Hour Act (N.C.G.S. § 95-25.1)',
    activeFacilitiesCount: 160,
    deploymentSlaHours: 18,
    nearestOpsCenter: 'Carolinas Command — Charlotte Airport Operations Desk',
    featured: true,
  },

  // ─── Southwest & Mountain West ───────────────────────────────────────────
  {
    slug: 'phoenix-semiconductor-corridor',
    name: 'Phoenix Semiconductor, Aerospace & Cleanroom Corridor',
    shortName: 'Phoenix Silicon Desert',
    state: 'Arizona',
    stateCode: 'AZ',
    metroArea: 'Greater Phoenix',
    corridorType: 'Semiconductor',
    keyZones: ['North Phoenix Semiconductor Fab Hub (TSMC District)', 'Chandler Silicon Basin (Intel Ocotillo)', 'Mesa Gateway Aerospace Hub', 'West Valley Logistics Belt'],
    wageBenchmark: { minHourly: 30, maxHourly: 58, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-10', 'Loop 101 Agua Fria / Pima', 'Loop 303 Logistics Corridor', 'Loop 202'],
    railheadsAndPorts: ['Union Pacific Phoenix Intermodal Yard', 'BNSF Glendale Intermodal Terminal'],
    airCargoHubs: ['Phoenix Sky Harbor International (PHX)', 'Phoenix-Mesa Gateway (AZA)'],
    oshaJurisdiction: 'ADOSH (Arizona Division of Occupational Safety and Health)',
    prevailingWageLaw: 'Arizona Fair Wages and Healthy Families Act (A.R.S. § 23-363)',
    activeFacilitiesCount: 175,
    deploymentSlaHours: 14,
    nearestOpsCenter: 'Southwest High-Tech Desk — Chandler Semiconductor Command',
    featured: true,
  },
  {
    slug: 'salt-lake-inland-port',
    name: 'Utah Inland Port & Crossroads Industrial Corridor',
    shortName: 'Utah Inland Port Belt',
    state: 'Utah',
    stateCode: 'UT',
    metroArea: 'Greater Salt Lake City',
    corridorType: 'Logistics',
    keyZones: ['Northwest Quadrant Inland Port', 'West Valley Industrial District', 'Falcon Hill Aerospace & Defense Park', 'Ogden Manufacturing Belt'],
    wageBenchmark: { minHourly: 23, maxHourly: 45, overtimeMultiplier: 1.5 },
    primaryHighways: ['I-80 Transcontinental', 'I-15 Intermountain Corridor', 'I-215 Belt'],
    railheadsAndPorts: ['Union Pacific Salt Lake Intermodal Terminal', 'Utah Inland Port Authority Rail Network'],
    airCargoHubs: ['Salt Lake City International (SLC Cargo)'],
    oshaJurisdiction: 'UOSH (Utah Occupational Safety and Health Division)',
    prevailingWageLaw: 'Utah Labor Commission Framework (UCA § 34-40-101)',
    activeFacilitiesCount: 125,
    deploymentSlaHours: 18,
    nearestOpsCenter: 'Intermountain Operations — Salt Lake Inland Port Desk',
    featured: true,
  },
];

export function getAllCorridors(): IndustrialCorridor[] {
  return INDUSTRIAL_CORRIDORS;
}

export function getCorridorBySlug(slug: string): IndustrialCorridor | undefined {
  return INDUSTRIAL_CORRIDORS.find((c) => c.slug === slug);
}
