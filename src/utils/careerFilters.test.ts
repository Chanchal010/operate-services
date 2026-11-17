import test from 'node:test';
import assert from 'node:assert/strict';
import { JOBS_DATA, OFFICES_DATA } from '@/data/careerPortalData';
import {
  filterJobs,
  filterOffices,
  formatJobPay,
  groupOfficesByState,
  validateApplicationForm,
  validateContactForm,
} from './careerFilters';
import { JobFilters } from '@/types/career';

const defaultFilters: JobFilters = {
  keyword: '',
  location: '',
  radiusMiles: 50,
  specialization: 'All',
  employmentType: 'All',
  shift: 'All',
  minHourlyPay: 0,
  savedOnly: false,
  sortBy: 'relevance',
};

test('filterJobs filters by keyword across title and skills', () => {
  const results = filterJobs(JOBS_DATA, { ...defaultFilters, keyword: 'CNC' });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'OPS-48210');
});

test('filterJobs filters by city/state tokens and specialization', () => {
  const results = filterJobs(JOBS_DATA, {
    ...defaultFilters,
    location: 'Phoenix, AZ',
    specialization: 'Aviation & Airport Operations',
  });
  assert.equal(results.length, 1);
  assert.equal(results[0].city, 'Phoenix');
});

test('filterJobs sorts by highest-pay descending', () => {
  const results = filterJobs(JOBS_DATA, {
    ...defaultFilters,
    sortBy: 'highest-pay',
  });
  assert.ok(results.length > 2);
  assert.equal(results[0].id, 'OPS-48219'); // $44/hr A&P Tech
});

test('filterJobs respects savedOnly filter', () => {
  const results = filterJobs(
    JOBS_DATA,
    { ...defaultFilters, savedOnly: true },
    ['OPS-48233', 'OPS-48251']
  );
  assert.equal(results.length, 2);
});

test('formatJobPay formats hourly and annual salary cleanly', () => {
  const hourly = JOBS_DATA.find((j) => j.payUnit === 'hr')!;
  const annual = JOBS_DATA.find((j) => j.payUnit === 'yr')!;
  assert.match(formatJobPay(hourly), /^\$\d+–\$\d+ \/ hr$/);
  assert.match(formatJobPay(annual), /^\$\d+k–\$\d+k \/ yr$/);
});

test('filterOffices and groupOfficesByState filter by country and query', () => {
  const usOffices = filterOffices(OFFICES_DATA, 'United States', 'Ohio');
  assert.equal(usOffices.length, 1);
  assert.equal(usOffices[0].city, 'Columbus');

  const canadaGrouped = groupOfficesByState(
    filterOffices(OFFICES_DATA, 'Canada', '')
  );
  assert.equal(canadaGrouped.length, 3);
  assert.equal(canadaGrouped[0].state, 'Alberta');
});

test('validateApplicationForm catches invalid inputs and passes valid submission', () => {
  const bad = validateApplicationForm({
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
    postalCode: '',
    yearsExperience: '',
    workAuthorized: false,
  });
  assert.ok(bad.fullName);
  assert.ok(bad.email);
  assert.ok(bad.phone);
  assert.ok(bad.postalCode);
  assert.ok(bad.yearsExperience);
  assert.ok(bad.workAuthorized);

  const good = validateApplicationForm({
    fullName: 'Jordan Vance',
    email: 'jordan@example.com',
    phone: '(410) 555-0192',
    postalCode: '21076',
    yearsExperience: '3-5 years',
    workAuthorized: true,
  });
  assert.deepEqual(good, {});
});

test('validateContactForm validates message length and email', () => {
  const errors = validateContactForm({
    fullName: 'Sam',
    email: 'bad',
    companyOrTopic: 'Welding',
    inquiryType: 'Job Seeker Support',
    message: 'hi',
  });
  assert.ok(errors.email);
  assert.ok(errors.message);
});
