import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterJobs,
  formatHourlyRange,
  validateApplicationForm,
  validateSolutionsInquiry,
  type JobPosting,
} from './jobs';

const sampleJobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'MIG Welder — Structural Steel',
    category: 'Skilled Trades',
    location: 'Columbus, OH',
    zip: '43215',
    employmentType: 'Contract-to-Hire',
    shift: '1st Shift (6:00 AM – 2:30 PM)',
    hourlyMin: 26,
    hourlyMax: 32,
    summary: 'Perform structural MIG welding on heavy steel assemblies using blueprints.',
    requirements: ['AWS D1.1 certification preferred', '2+ years MIG welding'],
    postedDaysAgo: 1,
  },
  {
    id: 'job-2',
    title: 'Industrial Maintenance Mechanic',
    category: 'Manufacturing',
    location: 'Charlotte, NC',
    zip: '28202',
    employmentType: 'Direct Placement',
    shift: '2nd Shift (2:00 PM – 10:30 PM)',
    hourlyMin: 31,
    hourlyMax: 38,
    summary: 'Troubleshoot hydraulic, pneumatic, and PLC-controlled packaging lines.',
    requirements: ['480V 3-phase troubleshooting', 'Preventive maintenance experience'],
    postedDaysAgo: 2,
  },
  {
    id: 'job-3',
    title: 'Warehouse Operations Supervisor',
    category: 'Logistics',
    location: 'Dallas, TX',
    zip: '75201',
    employmentType: 'Full-Time Contract',
    shift: '1st Shift (7:00 AM – 3:30 PM)',
    hourlyMin: 29,
    hourlyMax: 34,
    summary: 'Lead 25-person fulfillment crew and oversee outbound dock scheduling.',
    requirements: ['WMS proficiency', 'OSHA 10 certification'],
    postedDaysAgo: 3,
  },
];

test('filterJobs matches keywords across title, category, and requirements', () => {
  const welders = filterJobs(sampleJobs, { keywords: 'MIG Welder', location: '' });
  assert.equal(welders.length, 1);
  assert.equal(welders[0].id, 'job-1');

  const plcJobs = filterJobs(sampleJobs, { keywords: 'PLC', location: '' });
  assert.equal(plcJobs.length, 1);
  assert.equal(plcJobs[0].id, 'job-2');
});

test('filterJobs matches city, state, or zip and category filter', () => {
  const dallas = filterJobs(sampleJobs, { keywords: '', location: '75201' });
  assert.equal(dallas.length, 1);
  assert.equal(dallas[0].location, 'Dallas, TX');

  const trades = filterJobs(sampleJobs, {
    keywords: '',
    location: '',
    category: 'Skilled Trades',
  });
  assert.equal(trades.length, 1);
});

test('formatHourlyRange formats range and single rate cleanly', () => {
  assert.equal(formatHourlyRange(26, 32), '$26–$32/hr');
  assert.equal(formatHourlyRange(30, 30), '$30/hr');
});

test('validateApplicationForm rejects invalid inputs and accepts valid data', () => {
  const invalid = validateApplicationForm({
    fullName: 'A',
    email: 'not-an-email',
    phone: '123',
    experienceYears: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.experienceYears);

  const valid = validateApplicationForm({
    fullName: 'Jordan Vance',
    email: 'jordan.vance@example.com',
    phone: '(614) 555-0192',
    experienceYears: '3–5 years',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateSolutionsInquiry enforces required business contact fields', () => {
  const invalid = validateSolutionsInquiry({
    companyName: '',
    contactName: 'Sam',
    workEmail: 'bad-email',
    phone: '555',
    serviceTrack: '',
    headcount: '10-25',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.companyName);
  assert.ok(invalid.errors.workEmail);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.serviceTrack);

  const valid = validateSolutionsInquiry({
    companyName: 'Midwest Stamping Co.',
    contactName: 'Elena Rostova',
    workEmail: 'elena@midweststamping.com',
    phone: '312-555-0148',
    serviceTrack: 'Maintenance & Reliability Services',
    headcount: '25–50',
    notes: 'Need 3rd shift coverage across two lines.',
  });
  assert.equal(valid.valid, true);
});
