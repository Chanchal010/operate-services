import type { JobPosting } from '../utils/jobs';

export interface InsightArticle {
  id: string;
  date: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  takeaways: string[];
  body: string[];
}

export interface TestimonialItem {
  id: string;
  heading: string;
  quote: string;
  attribution: string;
  role: string;
  image: string;
  imageAlt: string;
}

export interface SolutionTrack {
  id: string;
  number: string;
  title: string;
  summary: string;
  metrics: string;
}

export interface OfficeLocation {
  id: string;
  city: string;
  state: string;
  region: string;
  address: string;
  phone: string;
  specialties: string[];
}

export const HERO_IMAGE = '/images/hero_workforce_team_1794749051365.jpg';
export const WELDING_IMAGE = '/images/welding_sparks_industrial_1794749052787.jpg';
export const VIDEO_POSTER_IMAGE = '/images/rise_video_poster_1794749055176.jpg';
export const WAREHOUSE_IMAGE = '/images/partnership_warehouse_1794749053094.jpg';
export const ENGINEERING_IMAGE = '/images/partnership_engineering_1794749054885.jpg';

export const QUICK_SEARCH_ROLES = [
  'Maintenance Mechanic',
  'MIG Welder',
  'Heavy Equipment Operator',
  'Warehouse Supervisor',
  'Electrician',
];

export const JOBS_DATA: JobPosting[] = [
  {
    id: 'os-101',
    title: 'Industrial Maintenance Mechanic',
    category: 'Manufacturing',
    location: 'Columbus, OH',
    zip: '43215',
    employmentType: 'Contract-to-Hire',
    shift: '1st Shift (6:00 AM – 2:30 PM)',
    hourlyMin: 30,
    hourlyMax: 37,
    summary:
      'Perform preventive and reactive maintenance on automated conveyor, hydraulic press, and pneumatic packaging equipment inside an ISO-certified facility.',
    requirements: [
      '3+ years industrial maintenance mechanic experience',
      '480V 3-phase motor and PLC fault diagnostics',
      'Blueprint and schematic reading proficiency',
    ],
    postedDaysAgo: 1,
  },
  {
    id: 'os-102',
    title: 'MIG Welder — Structural & Heavy Frame',
    category: 'Skilled Trades',
    location: 'Milwaukee, WI',
    zip: '53202',
    employmentType: 'Contract-to-Hire',
    shift: '1st Shift (6:00 AM – 2:30 PM)',
    hourlyMin: 26,
    hourlyMax: 33,
    summary:
      'Fabricate and weld heavy-gauge structural steel assemblies and sub-frames using wire-feed MIG processes per engineering blueprints.',
    requirements: [
      '2+ years production MIG welding on carbon steel',
      'Ability to pass 2F/3F weld test on site',
      'Familiarity with overhead crane rigging',
    ],
    postedDaysAgo: 1,
  },
  {
    id: 'os-103',
    title: 'Heavy Equipment Operator',
    category: 'Skilled Trades',
    location: 'Phoenix, AZ',
    zip: '85004',
    employmentType: 'Full-Time Contract',
    shift: 'Day Shift (6:30 AM – 4:00 PM)',
    hourlyMin: 28,
    hourlyMax: 35,
    summary:
      'Operate excavators, articulated haul trucks, and motor graders for commercial infrastructure site preparation and utility trenching.',
    requirements: [
      '3+ years commercial civil earthmoving experience',
      'Valid OSHA 10 or OSHA 30 safety card',
      'Clean MVR and daily pre-trip inspection discipline',
    ],
    postedDaysAgo: 2,
  },
  {
    id: 'os-104',
    title: 'Warehouse Supervisor — Distribution',
    category: 'Logistics',
    location: 'Dallas, TX',
    zip: '75201',
    employmentType: 'Direct Placement',
    shift: '1st Shift (7:00 AM – 3:30 PM)',
    hourlyMin: 31,
    hourlyMax: 36,
    summary:
      'Lead a 30-person inbound receiving and outbound shipping team, managing daily KPIs, forklift safety compliance, and WMS inventory accuracy.',
    requirements: [
      '3+ years high-volume distribution supervision',
      'SAP or Manhattan WMS operational mastery',
      'Track record improving order-fill accuracy',
    ],
    postedDaysAgo: 2,
  },
  {
    id: 'os-105',
    title: 'Industrial Electrician (Journeyman)',
    category: 'Skilled Trades',
    location: 'Charlotte, NC',
    zip: '28202',
    employmentType: 'Contract-to-Hire',
    shift: '2nd Shift (2:00 PM – 10:30 PM)',
    hourlyMin: 34,
    hourlyMax: 42,
    summary:
      'Install, troubleshoot, and maintain industrial control panels, VFDs, conduit runs, and high-voltage facility power distribution.',
    requirements: [
      'Active Journeyman Electrician license or equivalent hours',
      'NFPA 70E arc-flash safety compliance',
      'VFD, servo drive, and relay logic troubleshooting',
    ],
    postedDaysAgo: 3,
  },
  {
    id: 'os-106',
    title: 'CNC Machinist — 5-Axis Mill Setup',
    category: 'Manufacturing',
    location: 'Seattle, WA',
    zip: '98108',
    employmentType: 'Direct Placement',
    shift: '1st Shift (6:00 AM – 2:30 PM)',
    hourlyMin: 33,
    hourlyMax: 41,
    summary:
      'Set up and run close-tolerance aerospace aluminum and titanium components on 5-axis CNC machining centers using GD&T blueprints.',
    requirements: [
      '4+ years CNC mill setup and Fanuc/Haas control edits',
      'Micrometer, bore gauge, and CMM verification experience',
      'AS9100 shop floor documentation familiarity',
    ],
    postedDaysAgo: 3,
  },
  {
    id: 'os-107',
    title: 'Reliability & Maintenance Engineer',
    category: 'Engineering',
    location: 'Detroit, MI',
    zip: '48201',
    employmentType: 'Direct Placement',
    shift: 'Day Shift (8:00 AM – 5:00 PM)',
    hourlyMin: 44,
    hourlyMax: 54,
    summary:
      'Design predictive maintenance intervals, vibration analysis schedules, and root-cause corrective actions across an EV battery assembly plant.',
    requirements: [
      'B.S. in Mechanical or Industrial Engineering',
      'CMMS asset hierarchy and PM optimization background',
      'Experience launching greenfield manufacturing lines',
    ],
    postedDaysAgo: 4,
  },
  {
    id: 'os-108',
    title: 'Automated Logistics Technician',
    category: 'Logistics',
    location: 'Atlanta, GA',
    zip: '30303',
    employmentType: 'Contract-to-Hire',
    shift: '3rd Shift (10:00 PM – 6:30 AM)',
    hourlyMin: 27,
    hourlyMax: 33,
    summary:
      'Maintain high-speed sortation conveyors, barcode scanners, and robotic palletizers in a 24/7 regional fulfillment hub.',
    requirements: [
      '2+ years conveyor and photo-eye sensor repair',
      'Comfortable working at heights and with lock-out/tag-out',
      'Basic mechanical fabrication and belt tracking skills',
    ],
    postedDaysAgo: 5,
  },
];

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'oct-2026-trends',
    date: 'November 11, 2026',
    category: 'Market Intelligence',
    readTime: '4 min read',
    title: 'October 2026 Market Trends Report',
    excerpt:
      "Job growth significantly exceeded expectations, unemployment declined, and the BLS revised September and August numbers up by a collective 84,000 jobs: all favorable signs for a market revving up. Explore OperateServices' manufacturing, construction and logistics job reports for a closer look at the trends shaping the third quarter of 2026.",
    takeaways: [
      'Manufacturing and industrial construction added 42,000 net skilled roles month-over-month.',
      'Maintenance reliability and industrial electrical postings led all skilled trade wage growth at +4.8% YoY.',
      'Facilities offering structured shift differentials and clear 90-day conversion paths reduced turnover by 28%.',
    ],
    body: [
      'Across North America, industrial employers entered the fourth quarter with renewed capital project momentum. Revised Bureau of Labor Statistics figures show sustained demand for skilled technicians, heavy equipment operators, and plant maintenance specialists.',
      'Distribution networks and domestic manufacturing expansions continue to compete for experienced tradespeople. Employers who streamline technical screening and shorten interview-to-start cycles from three weeks to five business days are capturing top-tier talent.',
      'OperateServices workforce analysts recommend pairing competitive base wages with transparent skill-progression milestones and safety leadership training to protect throughput into 2027.',
    ],
  },
  {
    id: 'workers-recommend-mfg',
    date: 'September 22, 2026',
    category: 'Workforce Retention',
    readTime: '5 min read',
    title: '91% of Experienced Workers Recommend Manufacturing Jobs',
    excerpt:
      'Discover why experienced workers recommend manufacturing jobs and how clear career paths, technology and skills training can strengthen workforce retention.',
    takeaways: [
      '91% of seasoned technicians cite hands-on problem solving and predictable schedules as top job satisfaction drivers.',
      'Access to modern automation and CNC upskilling increases 12-month retention by 34%.',
      'Mentorship pairings during the first 30 days cut early contractor attrition nearly in half.',
    ],
    body: [
      'A nationwide survey of over 3,400 experienced manufacturing contractors and supervisors revealed a striking reality: workers who reach the two-year mark in modern industrial facilities overwhelmingly advocate for careers in the trades.',
      'Contrary to outdated perceptions, today’s plant floors integrate digital work instructions, collaborative robotics, and clean environmental controls. Workers value seeing tangible output every shift alongside steady overtime and advancement opportunities.',
      'Organizations that formalize cross-training matrices and communicate promotion criteria early consistently outperform regional peers on attendance and safety metrics.',
    ],
  },
  {
    id: 'ev-battery-reliability',
    date: 'November 9, 2026',
    category: 'Case Study',
    readTime: '4 min read',
    title: 'OperateServices Helps EV Battery Startup Launch Facility-Wide Maintenance Reliability Program',
    excerpt:
      'OperateServices built a maintenance reliability program for an EV battery startup, finishing nearly two months early and reducing OEM reliance.',
    takeaways: [
      'Program commissioned 7 weeks ahead of production ramp target.',
      'OEM external service dispatch costs reduced by 41% during first two quarters.',
      '38 certified electro-mechanical technicians onboarded with unified safety standards.',
    ],
    body: [
      'When a high-growth EV battery manufacturer prepared to transition from pilot cells to commercial-scale gigafactory output, unplanned equipment downtime threatened delivery commitments.',
      'OperateServices deployed an embedded reliability engineering and skilled technician team to build CMMS asset hierarchies, standardize lock-out/tag-out workflows, and train internal leads across cell assembly and formation bays.',
      'By completing critical commissioning milestones nearly two months ahead of schedule, the client gained full operational ownership and dramatically reduced dependence on third-party OEM field technicians.',
    ],
  },
  {
    id: 'skilled-labor-shortage',
    date: 'June 15, 2026',
    category: 'Hiring Strategy',
    readTime: '6 min read',
    title: 'Manufacturing Recruitment Strategies To Attract Skilled Labor During a Shortage',
    excerpt:
      'Explore manufacturing recruitment strategies to attract skilled labor, address the labor shortage and build a stronger workforce with training and faster hiring.',
    takeaways: [
      'Skills-first assessments widen qualified candidate pools by 27% over rigid degree filters.',
      'Same-week shop-floor weld and mechanical evaluations reduce offer drop-off.',
      'Dedicated recruiter follow-through during onboarding raises 90-day retention above 88%.',
    ],
    body: [
      'Industrial employers facing persistent skilled trade vacancies can no longer rely on passive job board postings alone. Winning talent requires local market intelligence, proactive outreach to passive candidates, and frictionless practical evaluations.',
      'Partnering with specialized staffing teams enables hiring managers to validate hands-on proficiency in welding, electrical diagnostics, and CNC setup before day one—protecting both productivity and plant safety culture.',
    ],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    heading: 'Trusted Partnership',
    quote:
      '"OperateServices made the application and onboarding process very smooth. They found me a position that suited me. I\'m happy to be a part of the organization they assigned me to."',
    attribution: 'Marcus Holloway, Senior Maintenance Technician',
    role: 'OperateServices Contractor · Columbus, OH',
    image: WAREHOUSE_IMAGE,
    imageAlt: 'Operations supervisor inspecting logistics facility',
  },
  {
    id: 'test-2',
    heading: 'Trusted Partnership',
    quote:
      '"Many staffing agencies provide a good wave of quality candidates to start and then decline. OperateServices has been a strong partner for more than 10 years in providing quality candidates that are well-prepared and screened before even interviewing."',
    attribution: 'Diane Callahan, VP of Plant Operations',
    role: 'OperateServices Client · Precision Components Group',
    image: ENGINEERING_IMAGE,
    imageAlt: 'Engineers reviewing blueprints inside automated manufacturing plant',
  },
  {
    id: 'test-3',
    heading: 'Trusted Partnership',
    quote:
      '"My overall experience with OperateServices has been great. I would say the best thing is how proactive my recruiter has been through this whole experience, especially through the hiring process. My recruiter could not have made it any easier."',
    attribution: 'Devon Alvarez, Certified MIG Welder',
    role: 'OperateServices Contractor · Milwaukee, WI',
    image: WELDING_IMAGE,
    imageAlt: 'Welder fabricating structural steel in industrial facility',
  },
  {
    id: 'test-4',
    heading: 'Trusted Partnership',
    quote:
      '"The customer support provided to me by OperateServices has always been outstanding. It is obvious that they have taken the time to learn about the work history and experience of their contractors prior to submitting them for consideration."',
    attribution: 'Kenneth Brooks, Director of Supply Chain',
    role: 'OperateServices Client · Mid-Atlantic Distribution',
    image: VIDEO_POSTER_IMAGE,
    imageAlt: 'Manufacturing technician operating CNC precision machine',
  },
];

export const SOLUTIONS_TRACKS: SolutionTrack[] = [
  {
    id: 'skilled-trades',
    number: '01',
    title: 'Skilled Trades & Manufacturing Staffing',
    summary:
      'On-demand contract, contract-to-hire, and direct placement for welders, electricians, CNC machinists, and plant mechanics.',
    metrics: '170,000+ contractors placed annually across North America',
  },
  {
    id: 'maintenance-reliability',
    number: '02',
    title: 'Maintenance & Reliability Services',
    summary:
      'Managed preventive maintenance programs, predictive diagnostics, and plant commissioning teams delivered under clear SLAs.',
    metrics: '41% average reduction in unplanned OEM dispatch spend',
  },
  {
    id: 'logistics-distribution',
    number: '03',
    title: 'Distribution & Logistics Operations',
    summary:
      'Scalable warehouse supervision, certified equipment operators, and peak-season fulfillment workforce management.',
    metrics: '250+ local recruiting offices supporting rapid ramp-ups',
  },
  {
    id: 'engineering-support',
    number: '04',
    title: 'Production & Quality Engineering',
    summary:
      'Specialized quality control inspectors, manufacturing engineers, and automation technicians aligned to ISO & AS9100 standards.',
    metrics: '40+ years setting the industrial staffing standard',
  },
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'loc-baltimore',
    city: 'Hanover (HQ)',
    state: 'MD',
    region: 'Mid-Atlantic',
    address: '7301 Parkway Drive, Hanover, MD 21076',
    phone: '(888) 237-6835',
    specialties: ['Corporate Headquarters', 'Engineering', 'Government Services'],
  },
  {
    id: 'loc-columbus',
    city: 'Columbus',
    state: 'OH',
    region: 'Midwest',
    address: '4500 Easton Commons, Suite 320, Columbus, OH 43219',
    phone: '(614) 555-0180',
    specialties: ['Manufacturing', 'EV & Battery Operations', 'Distribution'],
  },
  {
    id: 'loc-dallas',
    city: 'Dallas',
    state: 'TX',
    region: 'South Central',
    address: '12221 Merit Drive, Suite 900, Dallas, TX 75251',
    phone: '(972) 555-0144',
    specialties: ['Supply Chain & Logistics', 'Construction Trades', 'HVAC'],
  },
  {
    id: 'loc-charlotte',
    city: 'Charlotte',
    state: 'NC',
    region: 'Southeast',
    address: '6100 Fairview Road, Suite 400, Charlotte, NC 28210',
    phone: '(704) 555-0162',
    specialties: ['Industrial Electrical', 'Aerospace Manufacturing', 'Maintenance'],
  },
  {
    id: 'loc-phoenix',
    city: 'Phoenix',
    state: 'AZ',
    region: 'Southwest',
    address: '2555 E Camelback Road, Suite 600, Phoenix, AZ 85016',
    phone: '(602) 555-0129',
    specialties: ['Semiconductor Facilities', 'Civil Construction', 'Skilled Trades'],
  },
  {
    id: 'loc-seattle',
    city: 'Seattle',
    state: 'WA',
    region: 'Pacific Northwest',
    address: '1000 Second Avenue, Suite 1400, Seattle, WA 98104',
    phone: '(206) 555-0195',
    specialties: ['Aerospace & Defense', 'CNC Machining', 'Marine Trades'],
  },
];
