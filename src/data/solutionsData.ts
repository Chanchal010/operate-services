export interface NavLeafItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface NavColumnGroup {
  heading?: {
    id: string;
    label: string;
    href: string;
  };
  items: NavLeafItem[];
}

export interface TopNavMenu {
  id: 'solutions' | 'industries' | 'insights' | 'about';
  label: string;
  title: string;
  columns: NavColumnGroup[];
}

export interface LocaleOption {
  code: string;
  country: string;
  lang: string;
  href: string;
  active?: boolean;
}

export interface SolutionCard {
  id: string;
  title: string;
  href: string;
  summary: string;
}

export interface StatMetric {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string;
}

export interface IndustryCard {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imagePosition?: string;
  inlineLink?: {
    text: string;
    targetId: string;
  };
}

export interface PageDetailContent {
  id: string;
  category: 'Solutions' | 'Industries' | 'Insights' | 'About Us' | 'Careers' | 'Company';
  title: string;
  subtitle: string;
  summary: string;
  highlights: { title: string; detail: string }[];
  metrics: { value: string; label: string }[];
  rolesOrCapabilities: string[];
}

export const HERO_IMAGE = '/images/hero_aerotek_workers_1794754110578.jpg';
export const IMG_MANUFACTURING_SUPPLY = '/images/industry_manufacturing_supply_1794754112500.jpg';
export const IMG_CONSTRUCTION_SHIPYARD = '/images/industry_construction_shipyard_1794754109302.jpg';
export const IMG_AVIATION_AUTO = '/images/industry_aviation_automotive_1794754112580.jpg';
export const IMG_HEALTHCARE_SCIENCE = '/images/industry_healthcare_lifesciences_1794754117210.jpg';

export const TOP_UTILITY_LINKS = [
  { id: 'search-jobs', label: 'SEARCH JOBS', href: '#search-jobs' },
  { id: 'locations', label: 'LOCATIONS', href: '#locations' },
  { id: 'contact-us', label: 'CONTACT US', href: '#contactus' },
  { id: 'contractor-login', label: 'CONTRACTOR LOGIN', href: '#contractor-login' },
] as const;

export const MAIN_NAV_MENUS: TopNavMenu[] = [
  {
    id: 'solutions',
    label: 'SOLUTIONS',
    title: 'SOLUTIONS',
    columns: [
      {
        heading: {
          id: 'staffing-solutions',
          label: 'Staffing',
          href: '/solutions/staffing',
        },
        items: [
          {
            id: 'high-volume-recruiting',
            label: 'High-Volume Recruiting',
            href: '/solutions/staffing/high-volume-recruiting',
          },
          {
            id: 'vendor-on-premise',
            label: 'Vendor On-Premise',
            href: '/solutions/staffing/vendor-on-premise',
          },
        ],
      },
      {
        heading: {
          id: 'industrial-services',
          label: 'Industrial Services',
          href: '/solutions/industrial-services',
        },
        items: [
          {
            id: 'comprehensive-maintenance-services',
            label: 'Comprehensive Maintenance Services',
            href: '/solutions/services/comprehensive-maintenance-services',
          },
          {
            id: 'facilities-management-services',
            label: 'Facilities Management Services',
            href: '/solutions/services/facilities-management-services',
          },
          {
            id: 'manufacturing-support-services',
            label: 'Manufacturing Support Services',
            href: '/solutions/services/manufacturing-support-services',
          },
          {
            id: 'automation-robotics-installation',
            label: 'Automation, Robotics & Installation Services',
            href: '/solutions/services/automation-robotics-installation',
          },
        ],
      },
      {
        heading: {
          id: 'construction-services',
          label: 'Construction Services',
          href: '/solutions/construction-services',
        },
        items: [
          {
            id: 'construction-support-services',
            label: 'Construction Support Services',
            href: '/solutions/services/construction-support-services',
          },
          {
            id: 'general-conditions',
            label: 'General Conditions',
            href: '/solutions/services/general-conditions',
          },
          {
            id: 'prefabrication-assembly-installation',
            label: 'Prefabrication, Assembly & Installation',
            href: '/solutions/services/prefabrication-assembly-installation',
          },
        ],
      },
      {
        heading: {
          id: 'services-experts',
          label: 'Services Experts',
          href: '/solutions/services-experts',
        },
        items: [],
      },
    ],
  },
  {
    id: 'industries',
    label: 'INDUSTRIES',
    title: 'INDUSTRIES',
    columns: [
      {
        items: [
          { id: 'automotive', label: 'Automotive', href: '/solutions/industries/automotive' },
          {
            id: 'aviation',
            label: 'Aviation & Airport Operations',
            href: '/solutions/industries/aviation',
          },
          {
            id: 'construction-energy',
            label: 'Construction & Energy',
            href: '/solutions/industries/construction-energy',
          },
        ],
      },
      {
        items: [
          {
            id: 'consumer-industrial-products',
            label: 'Consumer & Industrial Products',
            href: '/solutions/industries/consumer-industrial-products',
          },
          {
            id: 'data-centers',
            label: 'Data Centers',
            href: '/solutions/industries/data-center-workforce-solutions',
          },
          {
            id: 'distribution-supply-chain',
            label: 'Distribution & Logistics',
            href: '/solutions/industries/distribution-supply-chain',
          },
        ],
      },
      {
        items: [
          {
            id: 'government-services',
            label: 'Government Services',
            href: '/solutions/industries/government-services',
          },
          { id: 'healthcare', label: 'Healthcare', href: '/solutions/industries/healthcare' },
          {
            id: 'life-sciences',
            label: 'Life Sciences',
            href: '/solutions/industries/life-sciences',
          },
        ],
      },
    ],
  },
  {
    id: 'insights',
    label: 'INSIGHTS',
    title: 'INSIGHTS',
    columns: [
      {
        heading: {
          id: 'careers-insights',
          label: 'Careers',
          href: '/insights/careers',
        },
        items: [
          {
            id: 'advancing-your-career',
            label: 'Advancing Your Career',
            href: '/insights/advancing-your-career',
          },
          {
            id: 'how-to-get-a-job',
            label: 'How to Get a Job',
            href: '/insights/how-to-get-a-job',
          },
        ],
      },
      {
        heading: {
          id: 'solutions-insights',
          label: 'Solutions',
          href: '/insights/solutions',
        },
        items: [
          {
            id: 'workplace-management',
            label: 'Workplace Management',
            href: '/insights/workplace-management',
          },
          { id: 'how-to-hire', label: 'How to Hire', href: '/insights/how-to-hire' },
          { id: 'market-trends', label: 'Market Trends', href: '/insights/market-trends' },
          { id: 'white-papers', label: 'White Papers', href: '/insights/white-papers' },
          { id: 'case-studies', label: 'Case Studies', href: '/insights/case-studies' },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'ABOUT US',
    title: 'ABOUT US',
    columns: [
      {
        heading: {
          id: 'news-and-events',
          label: 'News & Events',
          href: '/about-us/news-and-events',
        },
        items: [
          { id: 'news', label: 'News', href: '/about-us/news-and-events/news' },
          {
            id: 'operateservices-in-the-media',
            label: 'OperateServices in the Media',
            href: '/about-us/news-and-events/media',
          },
        ],
      },
      {
        items: [
          {
            id: 'diversity-equity-inclusion',
            label: 'Diversity, Equity and Inclusion',
            href: '/about-us/diversity-equity-and-inclusion',
          },
          {
            id: 'corporate-social-responsibility',
            label: 'Corporate Social Responsibility',
            href: '/about-us/corporate-social-responsibility',
          },
          { id: 'leadership', label: 'Leadership', href: '/about-us/leadership' },
          {
            id: 'military-affairs',
            label: 'Military Affairs',
            href: '/about-us/military-affairs',
          },
        ],
      },
    ],
  },
];

export const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'ca-fr', country: 'Canada', lang: 'FR', href: '/fr-ca' },
  { code: 'uk-en', country: 'United Kingdom', lang: 'EN', href: '/en-gb' },
  { code: 'us-en', country: 'United States', lang: 'EN', href: '/en', active: true },
];

export const WORKFORCE_SOLUTIONS_CARDS: SolutionCard[] = [
  {
    id: 'construction-support-services',
    title: 'Construction Support Services',
    href: '/solutions/services/construction-support-services',
    summary:
      'Dedicated site logistics, general conditions labor, and skilled trade support to keep commercial and industrial builds on schedule.',
  },
  {
    id: 'manufacturing-support-services',
    title: 'Manufacturing Support Services',
    href: '/solutions/services/manufacturing-support-services',
    summary:
      'Managed production support, assembly teams, and quality inspection programs tailored to plant throughput goals.',
  },
  {
    id: 'staffing-solutions',
    title: 'Staffing Solutions',
    href: '/solutions/staffing',
    summary:
      'Contract, contract-to-hire, and direct placement recruiting across light industrial, skilled trades, and facility operations.',
  },
  {
    id: 'comprehensive-maintenance-services',
    title: 'Comprehensive Maintenance Services',
    href: '/solutions/services/comprehensive-maintenance-services',
    summary:
      'Preventive maintenance, equipment uptime management, and multi-craft technical teams embedded in your operations.',
  },
];

export const IMPACT_STATS: StatMetric[] = [
  {
    id: 'offices',
    target: 250,
    suffix: '+',
    label: 'Offices',
    description:
      'We operate a unified network of hundreds of offices across North America. Our broad reach allows us to provide faster and seamless workforce solutions that help you move your operations forward.',
  },
  {
    id: 'contractors',
    target: 170000,
    suffix: '+',
    label: 'Contractors',
    description:
      'As one of the largest industrial and skilled trades staffing companies in North America, we can provide a team of skilled workers — plus leadership and supervision — to execute entire projects or programs.',
  },
  {
    id: 'clients',
    target: 13000,
    suffix: '+',
    label: 'Clients',
    description:
      'OperateServices helps thousands of ambitious organizations hire reliable workers — and manage their projects, programs and operations — each year. Let’s do the same for you.',
  },
];

export const INDUSTRY_CARDS: IndustryCard[] = [
  {
    id: 'consumer-industrial-products',
    title: 'Consumer & Industrial Products',
    description:
      'OperateServices supports 10,500+ chemical manufacturing, electronics, food and beverage, industrial equipment, retail and ecommerce companies each year.',
    href: '/solutions/industries/consumer-industrial-products',
    image: IMG_MANUFACTURING_SUPPLY,
    imagePosition: 'object-left',
  },
  {
    id: 'distribution-supply-chain',
    title: 'Distribution & Supply Chain',
    description:
      'Our supply chain experts fine tune the production lines and distribution centers that power North America.',
    href: '/solutions/industries/distribution-supply-chain',
    image: IMG_MANUFACTURING_SUPPLY,
    imagePosition: 'object-right',
  },
  {
    id: 'government-services',
    title: 'Government Services',
    description:
      'We help hundreds of government organizations overcome persistent hiring and operational challenges, whether it’s shipbuilding, infrastructure, DOD or university maintenance programs.',
    href: '/solutions/industries/government-services',
    image: IMG_CONSTRUCTION_SHIPYARD,
    imagePosition: 'object-center',
    inlineLink: {
      text: 'maintenance programs',
      targetId: 'facilities-management-services',
    },
  },
  {
    id: 'life-sciences',
    title: 'Life Sciences',
    description:
      'We provide industrial-strength manufacturing, distribution and maintenance solutions for 800+ medical device, pharma, diagnostics and contract manufacturing organizations each year.',
    href: '/solutions/industries/life-sciences',
    image: IMG_HEALTHCARE_SCIENCE,
    imagePosition: 'object-bottom',
  },
  {
    id: 'construction-energy',
    title: 'Construction & Energy',
    description:
      'From construction project services to industrial and skilled trades staffing, we support 3,000+ commercial, institutional, industrial, land development, renewable energy and public works organizations each year.',
    href: '/solutions/industries/construction-energy',
    image: IMG_CONSTRUCTION_SHIPYARD,
    imagePosition: 'object-left',
  },
  {
    id: 'aviation',
    title: 'Aviation & Airport Operations',
    description:
      'We help 370+ airports and aviation organizations rise to the challenge of flexing demand every year.',
    href: '/solutions/industries/aviation',
    image: IMG_AVIATION_AUTO,
    imagePosition: 'object-left',
  },
  {
    id: 'automotive',
    title: 'Automotive',
    description:
      'OperateServices offers dedicated support and quality talent for the assembly and production of vehicles — while taking away the pressures of workforce management — for 590 automotive companies every year.',
    href: '/solutions/industries/automotive',
    image: IMG_AVIATION_AUTO,
    imagePosition: 'object-right',
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description:
      'We help hospitals, health systems, physician clinics and other medical facilities stay within health system budgets by optimizing their EVS, facilities and maintenance and food service operations.',
    href: '/solutions/industries/healthcare',
    image: IMG_HEALTHCARE_SCIENCE,
    imagePosition: 'object-top',
  },
];

export const PAGE_DETAILS_BY_ID: Record<string, PageDetailContent> = {
  'staffing-solutions': {
    id: 'staffing-solutions',
    category: 'Solutions',
    title: 'Staffing Solutions',
    subtitle: 'Flexible, Scalable Light Industrial & Skilled Trades Talent',
    summary:
      'Whether you need a single certified specialist or hundreds of production workers to meet seasonal peaks, OperateServices delivers pre-vetted talent backed by local market teams.',
    highlights: [
      {
        title: 'Contract & Contract-to-Hire',
        detail: 'Scale headcount up or down in lockstep with production schedules while evaluating talent on the job.',
      },
      {
        title: 'Direct Placement',
        detail: 'Targeted recruiting for permanent technicians, supervisors, and maintenance leaders.',
      },
      {
        title: 'Safety-First Onboarding',
        detail: 'Site-specific OSHA orientation, PPE readiness, and ongoing safety check-ins.',
      },
    ],
    metrics: [
      { value: '250+', label: 'North American Offices' },
      { value: '170,000+', label: 'Active Contractors Annually' },
      { value: '13,000+', label: 'Client Partners Served' },
    ],
    rolesOrCapabilities: [
      'Assemblers & Production Operators',
      'Forklift & Material Handlers',
      'CNC Machinists & Welders',
      'Industrial Maintenance Mechanics',
      'Licensed Electricians & HVAC Techs',
      'Quality Control Inspectors',
    ],
  },
  'high-volume-recruiting': {
    id: 'high-volume-recruiting',
    category: 'Solutions',
    title: 'High-Volume Recruiting',
    subtitle: 'Rapid Ramp-Up for Seasonal Peaks, New Shifts & Facility Launches',
    summary:
      'When order volume surges or a new distribution hub opens, our dedicated recruiting hubs source, screen, and onboard large cohorts without sacrificing retention or safety.',
    highlights: [
      {
        title: '48-Hour Cohort Mobilization',
        detail: 'Pre-built local talent pipelines aligned to your shift patterns and wage bands.',
      },
      {
        title: 'Dedicated On-Site Coordinators',
        detail: 'First-day orientation, badge check-in, and early-shift attendance tracking.',
      },
      {
        title: 'Retention Analytics',
        detail: 'Weekly turnover diagnostics and shift-level coaching to improve 90-day retention.',
      },
    ],
    metrics: [
      { value: '30–500+', label: 'Workers Deployed Per Ramp' },
      { value: '94%', label: 'First-Day Show Rate' },
      { value: '24/7', label: 'Shift Coverage Support' },
    ],
    rolesOrCapabilities: [
      'Pick/Pack & Fulfillment Associates',
      'Shipping & Receiving Clerks',
      'Machine Operators',
      'Sanitation & Food Production',
      'Line Leads & Shift Coordinators',
    ],
  },
  'vendor-on-premise': {
    id: 'vendor-on-premise',
    category: 'Solutions',
    title: 'Vendor On-Premise (VOP)',
    subtitle: 'Embedded Workforce Leadership Inside Your Facility',
    summary:
      'An on-site OperateServices program manager works alongside your plant or warehouse leadership to own scheduling, safety walks, coaching, and continuous workforce optimization.',
    highlights: [
      {
        title: 'Single Point of Accountability',
        detail: 'One embedded leader handles requisitions, timekeeping, coaching, and shift handoffs.',
      },
      {
        title: 'Real-Time Attendance & Productivity KPIs',
        detail: 'Weekly operational scorecards tied directly to your throughput targets.',
      },
      {
        title: 'Culture & Safety Alignment',
        detail: 'Co-branded onboarding and joint safety huddles on the floor.',
      },
    ],
    metrics: [
      { value: '28%', label: 'Average Attrition Reduction' },
      { value: '100%', label: 'On-Site Shift Coverage' },
      { value: '40+', label: 'Years Operational Heritage' },
    ],
    rolesOrCapabilities: [
      'Embedded Program Managers',
      'Shift Supervisors & Leads',
      'Safety & Compliance Auditors',
      'Workforce Forecasting & Scheduling',
    ],
  },
  'comprehensive-maintenance-services': {
    id: 'comprehensive-maintenance-services',
    category: 'Solutions',
    title: 'Comprehensive Maintenance Services',
    subtitle: 'Managed Preventive & Corrective Maintenance for Maximum Equipment Uptime',
    summary:
      'Reduce unplanned downtime and extend asset life with an outsourced maintenance team managed by OperateServices supervisors under clear SLA performance guarantees.',
    highlights: [
      {
        title: 'Preventive & Predictive Maintenance',
        detail: 'Structured PM schedules, vibration/thermal inspections, and CMMS work-order execution.',
      },
      {
        title: 'Multi-Craft Technical Teams',
        detail: 'PLC technicians, millwrights, industrial electricians, and HVAC specialists.',
      },
      {
        title: 'Outcome-Based SLAs',
        detail: 'Measured on mean time between failures (MTBF), PM completion, and line availability.',
      },
    ],
    metrics: [
      { value: '98.4%', label: 'Target PM Compliance' },
      { value: '22%', label: 'Downtime Reduction' },
      { value: '365', label: 'Days/Year Coverage' },
    ],
    rolesOrCapabilities: [
      'PLC & Controls Technicians',
      'Industrial Millwrights',
      'Licensed Plant Electricians',
      'Reliability Engineers',
      'CMMS Planners & Schedulers',
    ],
  },
  'construction-support-services': {
    id: 'construction-support-services',
    category: 'Solutions',
    title: 'Construction Support Services',
    subtitle: 'Skilled Trades, Site Logistics & General Conditions Labor Under One Partner',
    summary:
      'Keep critical-path construction schedules moving with reliable site support, safety coordination, material handling, and specialty skilled trades.',
    highlights: [
      {
        title: 'Site Logistics & Material Management',
        detail: 'Receiving, laydown yard organization, and crane/hoist coordination.',
      },
      {
        title: 'Safety & Jobsite Readiness',
        detail: 'Fire watch, perimeter control, dust/debris management, and OSHA 10/30 compliance.',
      },
      {
        title: 'Specialty Trade Mobilization',
        detail: 'Carpenters, ironworkers, pipefitters, and MEP support crews across North America.',
      },
    ],
    metrics: [
      { value: '3,000+', label: 'Construction & Energy Clients' },
      { value: 'OSHA', label: 'Aligned Field Protocols' },
      { value: '250+', label: 'Local Recruiting Hubs' },
    ],
    rolesOrCapabilities: [
      'General Conditions Labor',
      'MEP Helpers & Apprentices',
      'Site Safety Coordinators',
      'Composite Cleanup & Logistics Crews',
    ],
  },
  'manufacturing-support-services': {
    id: 'manufacturing-support-services',
    category: 'Solutions',
    title: 'Manufacturing Support Services',
    subtitle: 'Scalable Production & Quality Workcells Managed for Throughput',
    summary:
      'Offload non-core production lines, sub-assembly, kitting, and quality containment to managed OperateServices teams so your core engineers stay focused on growth.',
    highlights: [
      {
        title: 'Managed Workcells & Sub-Assembly',
        detail: 'Full shift supervision, SOP adherence, and unit-cost accountability.',
      },
      {
        title: 'Quality Containment & Sorting',
        detail: 'Rapid response inspection and rework teams to prevent line stoppages.',
      },
      {
        title: 'Kitting & Packaging Operations',
        detail: 'Dedicated teams integrated directly with your ERP/WMS workflows.',
      },
    ],
    metrics: [
      { value: '10,500+', label: 'Industrial Clients Supported' },
      { value: '99.2%', label: 'Quality Pass Benchmark' },
      { value: '24h', label: 'Containment Mobilization' },
    ],
    rolesOrCapabilities: [
      'Production Cell Leads',
      'Quality Containment Inspectors',
      'Electro-Mechanical Assemblers',
      'Line Material Coordinators',
    ],
  },
};

export function getDetailContent(id: string): PageDetailContent {
  if (PAGE_DETAILS_BY_ID[id]) return PAGE_DETAILS_BY_ID[id];

  // Dynamically generate rich domain-authentic content for any nested navbar item or industry card
  const industryMatch = INDUSTRY_CARDS.find((c) => c.id === id);
  if (industryMatch) {
    return {
      id: industryMatch.id,
      category: 'Industries',
      title: industryMatch.title,
      subtitle: `Specialized Industrial Staffing & Managed Services for ${industryMatch.title}`,
      summary: industryMatch.description,
      highlights: [
        {
          title: 'Industry-Aligned Recruiting',
          detail: `Recruiters specialized in ${industryMatch.title} compliance, certifications, and shift demands.`,
        },
        {
          title: 'Consultative Safety & Risk Management',
          detail: 'Dedicated Health & Safety specialists embedded into onboarding and client site reviews.',
        },
        {
          title: 'Scalable Workforce Models',
          detail: 'Seamlessly shift between contingent staffing, VOP, and outsourced operational services.',
        },
      ],
      metrics: [
        { value: '250+', label: 'North American Offices' },
        { value: '40+ Yrs', label: 'Industry Expertise' },
        { value: 'Best of Staffing', label: 'Client & Talent Winner' },
      ],
      rolesOrCapabilities: [
        'Skilled Trades & Technicians',
        'Production & Operations Teams',
        'Facility & Preventive Maintenance',
        'Quality & Compliance Specialists',
      ],
    };
  }

  // Search MAIN_NAV_MENUS for any nested item
  for (const menu of MAIN_NAV_MENUS) {
    for (const col of menu.columns) {
      if (col.heading?.id === id) {
        return {
          id,
          category: menu.id === 'about' ? 'About Us' : menu.id === 'insights' ? 'Insights' : 'Solutions',
          title: col.heading.label,
          subtitle: `${menu.title} · ${col.heading.label}`,
          summary: `Explore how OperateServices delivers ${col.heading.label.toLowerCase()} capabilities tailored to industrial, skilled trades, and facility operations across North America.`,
          highlights: col.items.map((item) => ({
            title: item.label,
            detail: `Dedicated operational support and vetted talent delivery under our ${item.label} practice.`,
          })),
          metrics: [
            { value: '250+', label: 'Local Offices' },
            { value: '170,000+', label: 'Contractors' },
            { value: '13,000+', label: 'Clients Served' },
          ],
          rolesOrCapabilities: col.items.map((i) => i.label),
        };
      }
      const found = col.items.find((i) => i.id === id);
      if (found) {
        const catMap: Record<TopNavMenu['id'], PageDetailContent['category']> = {
          solutions: 'Solutions',
          industries: 'Industries',
          insights: 'Insights',
          about: 'About Us',
        };
        return {
          id: found.id,
          category: catMap[menu.id],
          title: found.label,
          subtitle: `OperateServices ${menu.title} · Specialized Practice`,
          summary: `OperateServices delivers proven ${found.label.toLowerCase()} programs designed to help industrial, construction, and enterprise teams execute reliably and safely.`,
          highlights: [
            {
              title: 'Dedicated Practice Leadership',
              detail: `Experienced subject-matter experts guiding ${found.label} strategy and execution.`,
            },
            {
              title: 'North American Reach',
              detail: 'Supported by 250+ local offices and deep regional candidate networks.',
            },
            {
              title: 'Safety & Compliance First',
              detail: 'Consultative Health & Safety guidance integrated into every engagement.',
            },
          ],
          metrics: [
            { value: '40+ Yrs', label: 'Proven Experience' },
            { value: '94%', label: 'Fill & Attendance Benchmark' },
            { value: '250+', label: 'Unified Offices' },
          ],
          rolesOrCapabilities: [
            'Program Assessment & Scoping',
            'Safety & Risk Alignment',
            'Workforce Deployment & Supervision',
            'Continuous KPI Reporting',
          ],
        };
      }
    }
  }

  return PAGE_DETAILS_BY_ID['staffing-solutions'];
}
