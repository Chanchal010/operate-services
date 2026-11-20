/**
 * src/lib/seo/schemaGraph.ts
 * Master JSON-LD Schema Factory for OperateServices
 * Assembles single coherent @graph entities with relational @id links
 * Powers Google Rich Snippets, Google for Jobs, and Generative AI Answer Engines
 */

import { IndustrialCorridor } from '@/data/industrialCorridors';
import { IndustrialRole } from '@/data/industrialRoles';
import { IndustrialService } from '@/data/industrialServices';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://operateservices.com';
export const ENTITY_ORG_ID = `${SITE_URL}/#organization`;
export const ENTITY_WEBSITE_ID = `${SITE_URL}/#website`;

/** Safe JSON-LD serializer preventing </script> XSS injection */
export function serializeJsonLd(obj: object): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}

/** Root Organization & Corporate Schema */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@id': ENTITY_ORG_ID,
    '@type': ['Organization', 'EmploymentAgency', 'LocalBusiness'],
    name: 'OperateServices',
    legalName: 'OperateServices Industrial Workforce LLC',
    alternateName: 'OperateServices Workforce & Skilled Trades',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/operateservices_logo.png`,
      width: 1200,
      height: 630,
    },
    image: `${SITE_URL}/operateservices_logo.png`,
    description: 'Premier industrial staffing, skilled trades placement, and operational workforce solutions across North American manufacturing belts, logistics corridors, and aviation complexes.',
    email: 'contact@operateservices.com',
    telephone: '+1-800-555-OPERATE',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '100 Industrial Parkway, Suite 500',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77002',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Certified Welder & Pipefitter Staffing',
      'Industrial Maintenance Mechanic & Millwright Deployment',
      'Precision CNC Machinist Placement',
      'FAA Part 145 Aircraft Maintenance Staffing',
      'High-Volume Warehouse & Cross-Dock Logistics Operations',
      'OSHA 1910 & NFPA 70E Safety Compliance',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-800-555-OPERATE',
        contactType: 'enterprise sales',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-800-555-OPERATE',
        contactType: 'tradesperson recruiting',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/operateservices',
      'https://twitter.com/operateservices',
      'https://github.com/Chanchal010/operate-services',
    ],
  };
}

/** Breadcrumbs Schema */
export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[], currentUrl: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`,
    })),
  };
}

/** FAQPage Schema */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Google for Jobs Schema: Role + Corridor JobPosting */
export function buildJobPostingSchema({
  role,
  corridor,
  canonicalUrl,
}: {
  role: IndustrialRole;
  corridor: IndustrialCorridor;
  canonicalUrl: string;
}) {
  const minWage = Math.max(role.baseHourlyRange.min, corridor.wageBenchmark.minHourly);
  const maxWage = Math.max(role.baseHourlyRange.max, corridor.wageBenchmark.maxHourly);
  const now = new Date();
  const datePosted = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const validThrough = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return {
    '@type': 'JobPosting',
    '@id': `${canonicalUrl}#jobposting`,
    title: `${role.title} — ${corridor.name}`,
    description: `<h3>Immediate Hiring: ${role.title} in ${corridor.name} (${corridor.stateCode})</h3>
      <p>OperateServices is actively deploying certified ${role.title} across premier manufacturing and industrial facilities in ${corridor.name}. Key assignment zones include ${corridor.keyZones.slice(0, 3).join(', ')}.</p>
      <h4>Guaranteed Compensation & Benefits:</h4>
      <ul>
        <li>Base Pay: $${minWage}.00 – $${maxWage}.00 per hour (W2 with Overtime at 1.5x)</li>
        <li>Comprehensive Medical, Dental, Vision, and 401(k) retirement options</li>
        <li>Weekly direct deposit with real-time digital pay stubs</li>
      </ul>
      <h4>Key Responsibilities:</h4>
      <ul>
        ${role.responsibilities.map((r) => `<li>${r}</li>`).join('')}
      </ul>
      <h4>Required Credentials:</h4>
      <ul>
        ${role.certifications.map((c) => `<li>${c}</li>`).join('')}
        ${role.oshaRequired.map((o) => `<li>${o}</li>`).join('')}
      </ul>`,
    datePosted,
    validThrough,
    employmentType: 'FULL_TIME',
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      '@id': ENTITY_ORG_ID,
      name: 'OperateServices',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/operateservices_logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: corridor.metroArea,
        addressRegion: corridor.stateCode,
        addressCountry: 'US',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: minWage,
        maxValue: maxWage,
        unitText: 'HOUR',
      },
    },
    industry: role.category,
    occupationalCategory: role.socCode,
    qualifications: role.certifications.join(', '),
    responsibilities: role.responsibilities.join('; '),
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

/** B2B Service Schema for Solutions + Corridor Matrix */
export function buildServiceSchema({
  service,
  corridor,
  canonicalUrl,
}: {
  service: IndustrialService;
  corridor: IndustrialCorridor;
  canonicalUrl: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: `${service.name} across ${corridor.name}`,
    serviceType: service.name,
    category: service.category,
    description: service.description,
    provider: {
      '@id': ENTITY_ORG_ID,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${corridor.name}, ${corridor.state}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.shortName} Deployment Options`,
      itemListElement: service.kpisGuaranteed.map((kpi, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: kpi,
        },
        position: idx + 1,
      })),
    },
  };
}
