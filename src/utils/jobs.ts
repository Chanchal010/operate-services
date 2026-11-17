export interface JobPosting {
  id: string;
  title: string;
  category: 'Skilled Trades' | 'Manufacturing' | 'Logistics' | 'Engineering';
  location: string;
  zip: string;
  employmentType: 'Contract-to-Hire' | 'Full-Time Contract' | 'Direct Placement';
  shift: string;
  hourlyMin: number;
  hourlyMax: number;
  summary: string;
  requirements: string[];
  postedDaysAgo: number;
}

export interface JobSearchQuery {
  keywords: string;
  location: string;
  category?: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  experienceYears: string;
}

export interface SolutionsInquiryData {
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  serviceTrack: string;
  headcount: string;
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function filterJobs(jobs: JobPosting[], query: JobSearchQuery): JobPosting[] {
  const kw = query.keywords.trim().toLowerCase();
  const loc = query.location.trim().toLowerCase();
  const cat = query.category?.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesKeyword =
      !kw ||
      job.title.toLowerCase().includes(kw) ||
      job.category.toLowerCase().includes(kw) ||
      job.summary.toLowerCase().includes(kw) ||
      job.requirements.some((req) => req.toLowerCase().includes(kw));

    const matchesLocation =
      !loc ||
      job.location.toLowerCase().includes(loc) ||
      job.zip.toLowerCase().includes(loc);

    const matchesCategory = !cat || cat === 'all' || job.category.toLowerCase() === cat;

    return matchesKeyword && matchesLocation && matchesCategory;
  });
}

export function formatHourlyRange(min: number, max: number): string {
  if (min === max) {
    return `$${min}/hr`;
  }
  return `$${min}–$${max}/hr`;
}

export function validateApplicationForm(data: ApplicationFormData): ValidationResult {
  const errors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = data.phone.replace(/\D/g, '');

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (phoneDigits.length < 10) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  }
  if (!data.experienceYears.trim()) {
    errors.experienceYears = 'Please select your years of experience.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSolutionsInquiry(data: SolutionsInquiryData): ValidationResult {
  const errors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = data.phone.replace(/\D/g, '');

  if (!data.companyName.trim()) {
    errors.companyName = 'Company name is required.';
  }
  if (!data.contactName.trim()) {
    errors.contactName = 'Contact name is required.';
  }
  if (!data.workEmail.trim() || !emailRegex.test(data.workEmail.trim())) {
    errors.workEmail = 'Please enter a valid work email.';
  }
  if (phoneDigits.length < 10) {
    errors.phone = 'Please enter a valid 10-digit business phone number.';
  }
  if (!data.serviceTrack.trim()) {
    errors.serviceTrack = 'Select a workforce solution track.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
