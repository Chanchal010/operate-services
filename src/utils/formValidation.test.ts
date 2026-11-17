import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAreaOfNeedOptions,
  validateWorkWithUsForm,
  type WorkWithUsFormValues,
} from './formValidation';

const validForm: WorkWithUsFormValues = {
  inquiryType: 'Staffing Needs',
  areaOfNeed: 'Manufacturing & Production',
  firstName: 'Jordan',
  lastName: 'Miller',
  company: 'Midwest Precision Works',
  postalCode: '43215',
  businessEmail: 'jordan.miller@midwestprecision.com',
  contactPhone: '614-555-0192',
  comments: 'Need 18 second-shift CNC operators and 2 maintenance techs.',
  emailOptIn: true,
  humanVerified: true,
};

test('getAreaOfNeedOptions cascades dynamically based on Inquiry Type', () => {
  assert.deepEqual(getAreaOfNeedOptions(''), []);
  const staffing = getAreaOfNeedOptions('Staffing Needs');
  assert.equal(staffing.length, 5);
  assert.ok(staffing.includes('Distribution & Logistics'));

  const services = getAreaOfNeedOptions('Outsourced Services');
  assert.equal(services.length, 7);
  assert.ok(services.includes('Comprehensive Maintenance Services'));
});

test('validateWorkWithUsForm accepts a complete valid submission', () => {
  const errors = validateWorkWithUsForm(validForm);
  assert.deepEqual(errors, {});
});

test('validateWorkWithUsForm flags missing required fields and malformed email/phone', () => {
  const errors = validateWorkWithUsForm({
    ...validForm,
    inquiryType: '',
    areaOfNeed: '',
    businessEmail: 'not-an-email',
    contactPhone: '123',
    humanVerified: false,
  });

  assert.equal(errors.inquiryType, 'Inquiry Type is required.');
  assert.equal(errors.areaOfNeed, 'Area of Need is required.');
  assert.equal(errors.businessEmail, 'Please enter a valid Business Email.');
  assert.equal(errors.contactPhone, 'Please enter a valid Contact Phone.');
  assert.equal(errors.humanVerified, 'Please complete the verification check.');
});
