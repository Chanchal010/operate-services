export type InquiryType = '' | 'Staffing Needs' | 'Outsourced Services';

export interface WorkWithUsFormValues {
  inquiryType: InquiryType;
  areaOfNeed: string;
  firstName: string;
  lastName: string;
  company: string;
  postalCode: string;
  businessEmail: string;
  contactPhone: string;
  comments: string;
  emailOptIn: boolean;
  humanVerified: boolean;
}

export type FormFieldErrors = Partial<Record<keyof WorkWithUsFormValues, string>>;

export const STAFFING_NEEDS_AREAS: string[] = [
  'Aviation & Airport Operations',
  'Construction',
  'Distribution & Logistics',
  'Facilities & Maintenance',
  'Manufacturing & Production',
];

export const OUTSOURCED_SERVICES_AREAS: string[] = [
  'Automation, Robotics and Installation Services',
  'Comprehensive Maintenance Services',
  'Construction Support Services',
  'Facilities Management',
  'General Conditions',
  'Manufacturing Support Services',
  'Prefabrication, Assembly and Installation',
];

export function getAreaOfNeedOptions(inquiryType: InquiryType): string[] {
  if (inquiryType === 'Staffing Needs') return STAFFING_NEEDS_AREAS;
  if (inquiryType === 'Outsourced Services') return OUTSOURCED_SERVICES_AREAS;
  return [];
}

export function validateWorkWithUsForm(values: WorkWithUsFormValues): FormFieldErrors {
  const errors: FormFieldErrors = {};

  if (!values.inquiryType) {
    errors.inquiryType = 'Inquiry Type is required.';
  }
  if (!values.areaOfNeed) {
    errors.areaOfNeed = 'Area of Need is required.';
  }
  if (!values.firstName.trim()) {
    errors.firstName = 'First Name is required.';
  }
  if (!values.lastName.trim()) {
    errors.lastName = 'Last Name is required.';
  }
  if (!values.company.trim()) {
    errors.company = 'Company is required.';
  }
  if (!values.postalCode.trim() || values.postalCode.trim().length < 3) {
    errors.postalCode = 'Valid Postal Code is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.businessEmail.trim() || !emailRegex.test(values.businessEmail.trim())) {
    errors.businessEmail = 'Please enter a valid Business Email.';
  }
  const digitsOnly = values.contactPhone.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    errors.contactPhone = 'Please enter a valid Contact Phone.';
  }
  if (!values.comments.trim()) {
    errors.comments = 'Comments are required.';
  }
  if (!values.humanVerified) {
    errors.humanVerified = 'Please complete the verification check.';
  }

  return errors;
}
