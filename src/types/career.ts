export type RoutePath =
  | '/careers'
  | '/jobs'
  | '/about-us'
  | '/locations'
  | '/solutions';

export type SpecializationCategory =
  | 'Aviation & Airport Operations'
  | 'Construction'
  | 'Distribution & Logistics'
  | 'Facilities & Maintenance'
  | 'Manufacturing & Production'
  | 'Internal Corporate';

export type EmploymentType = 'Contract' | 'Contract-to-Hire' | 'Direct Placement';
export type ShiftType = '1st Shift' | '2nd Shift' | '3rd Shift' | 'Rotating';
export type CountryCode = 'United States' | 'Canada' | 'United Kingdom';

export interface NavChildItem {
  id: string;
  label: string;
  description: string;
  route: RoutePath;
  sectionId?: string;
  specializationFilter?: SpecializationCategory;
  countryFilter?: CountryCode;
  modalTopic?: 'specialization' | 'service' | 'insights' | 'contractor-login' | 'contact';
  modalSlug?: string;
}

export interface NavGroupItem {
  id: string;
  label: string;
  route: RoutePath;
  children: NavChildItem[];
}

export interface JobListing {
  id: string;
  title: string;
  specialization: SpecializationCategory;
  city: string;
  state: string;
  stateCode: string;
  zip: string;
  country: CountryCode;
  payMin: number;
  payMax: number;
  payUnit: 'hr' | 'yr';
  shift: ShiftType;
  employmentType: EmploymentType;
  postedDaysAgo: number;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  featured?: boolean;
}

export interface OfficeLocation {
  id: string;
  city: string;
  stateOrProvince: string;
  stateCode: string;
  country: CountryCode;
  officeName: string;
  street: string;
  suite?: string;
  postalCode: string;
  phone: string;
  hours: string;
  specializations: SpecializationCategory[];
  openJobsCount: number;
  region: 'West' | 'Midwest' | 'South' | 'Northeast' | 'Canada' | 'Europe';
}

export interface SpecializationDetail {
  slug: string;
  title: SpecializationCategory;
  shortTagline: string;
  description: string;
  image?: string;
  roles: string[];
  safetyFocus: string;
  openCount: number;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface InsightArticle {
  slug: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  summary: string;
  body: string[];
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  tenure: string;
  bio: string;
  initials: string;
}

export interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  summary: string;
  body: string[];
}

export interface FaqItem {
  id: string;
  category: 'Contractors' | 'Benefits' | 'Internal Careers';
  question: string;
  answer: string;
}

export interface JobFilters {
  keyword: string;
  location: string;
  radiusMiles: number;
  specialization: SpecializationCategory | 'All';
  employmentType: EmploymentType | 'All';
  shift: ShiftType | 'All';
  minHourlyPay: number;
  savedOnly: boolean;
  sortBy: 'relevance' | 'newest' | 'highest-pay';
}

export interface ApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  yearsExperience: string;
  workAuthorized: boolean;
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  companyOrTopic: string;
  inquiryType:
    | 'Job Seeker Support'
    | 'Employer Staffing Inquiry'
    | 'Contractor Payroll & Benefits'
    | 'Media & Community';
  message: string;
}
