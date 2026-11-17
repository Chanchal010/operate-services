import {
  ApplicationFormValues,
  ContactFormValues,
  CountryCode,
  JobFilters,
  JobListing,
  OfficeLocation,
} from '@/types/career';

export function normalizeHourlyEquivalent(job: JobListing): number {
  if (job.payUnit === 'hr') {
    return job.payMax;
  }
  return Math.round((job.payMax / 2080) * 100) / 100;
}

export function formatJobPay(job: JobListing): string {
  if (job.payUnit === 'hr') {
    return `$${job.payMin}–$${job.payMax} / hr`;
  }
  const minK = Math.round(job.payMin / 1000);
  const maxK = Math.round(job.payMax / 1000);
  return `$${minK}k–$${maxK}k / yr`;
}

export function filterJobs(
  jobs: JobListing[],
  filters: JobFilters,
  savedJobIds: string[] = []
): JobListing[] {
  const kw = filters.keyword.trim().toLowerCase();
  const loc = filters.location.trim().toLowerCase();

  const filtered = jobs.filter((job) => {
    if (filters.savedOnly && !savedJobIds.includes(job.id)) {
      return false;
    }

    if (filters.specialization !== 'All' && job.specialization !== filters.specialization) {
      return false;
    }

    if (filters.employmentType !== 'All' && job.employmentType !== filters.employmentType) {
      return false;
    }

    if (filters.shift !== 'All' && job.shift !== filters.shift) {
      return false;
    }

    if (filters.minHourlyPay > 0) {
      const hourlyMax = normalizeHourlyEquivalent(job);
      if (hourlyMax < filters.minHourlyPay) {
        return false;
      }
    }

    if (kw) {
      const haystack = [
        job.id,
        job.title,
        job.specialization,
        job.summary,
        ...job.responsibilities,
        ...job.requirements,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(kw)) {
        return false;
      }
    }

    if (loc) {
      const locHaystack = `${job.city} ${job.state} ${job.stateCode} ${job.zip} ${job.country}`.toLowerCase();
      // Allow comma-separated "City, ST" queries cleanly
      const tokens = loc
        .split(/[\s,]+/)
        .map((t) => t.trim())
        .filter(Boolean);
      const allMatch = tokens.every((token) => locHaystack.includes(token));
      if (!allMatch) {
        return false;
      }
    }

    return true;
  });

  return sortJobs(filtered, filters.sortBy);
}

export function sortJobs(
  jobs: JobListing[],
  sortBy: JobFilters['sortBy']
): JobListing[] {
  const copy = [...jobs];
  if (sortBy === 'newest') {
    return copy.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }
  if (sortBy === 'highest-pay') {
    return copy.sort(
      (a, b) => normalizeHourlyEquivalent(b) - normalizeHourlyEquivalent(a)
    );
  }
  // relevance: featured first, then newest
  return copy.sort((a, b) => {
    const featDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featDiff !== 0) return featDiff;
    return a.postedDaysAgo - b.postedDaysAgo;
  });
}

export function filterOffices(
  offices: OfficeLocation[],
  country: CountryCode,
  query: string,
  specializationFilter: string = 'All'
): OfficeLocation[] {
  const q = query.trim().toLowerCase();

  return offices.filter((office) => {
    if (office.country !== country) {
      return false;
    }
    if (
      specializationFilter !== 'All' &&
      !office.specializations.some((s) => s === specializationFilter)
    ) {
      return false;
    }
    if (!q) {
      return true;
    }
    const haystack = `${office.city} ${office.stateOrProvince} ${office.stateCode} ${office.postalCode} ${office.officeName}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function groupOfficesByState(
  offices: OfficeLocation[]
): Array<{ state: string; offices: OfficeLocation[] }> {
  const map = new Map<string, OfficeLocation[]>();
  for (const office of offices) {
    const existing = map.get(office.stateOrProvince) ?? [];
    existing.push(office);
    map.set(office.stateOrProvince, existing);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([state, list]) => ({
      state,
      offices: list.sort((x, y) => x.city.localeCompare(y.city)),
    }));
}

export function validateApplicationForm(
  values: ApplicationFormValues
): Partial<Record<keyof ApplicationFormValues, string>> {
  const errors: Partial<Record<keyof ApplicationFormValues, string>> = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 10) {
    errors.phone = 'Enter a 10-digit phone number.';
  }
  if (values.postalCode.trim().length < 3) {
    errors.postalCode = 'Enter your ZIP or postal code.';
  }
  if (!values.yearsExperience.trim()) {
    errors.yearsExperience = 'Select your years of experience.';
  }
  if (!values.workAuthorized) {
    errors.workAuthorized = 'Confirm work authorization to proceed.';
  }

  return errors;
}

export function validateContactForm(
  values: ContactFormValues
): Partial<Record<keyof ContactFormValues, string>> {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please include at least 10 characters describing your request.';
  }

  return errors;
}
