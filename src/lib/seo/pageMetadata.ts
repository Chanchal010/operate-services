/**
 * src/lib/seo/pageMetadata.ts
 * Centralized Metadata Factory for Next.js App Router
 */

import type { Metadata } from 'next';
import { IndustrialCorridor } from '@/data/industrialCorridors';
import { IndustrialRole } from '@/data/industrialRoles';
import { IndustrialService } from '@/data/industrialServices';
import { SITE_URL } from './schemaGraph';

export function buildRoleCorridorMetadata(role: IndustrialRole, corridor: IndustrialCorridor): Metadata {
  const minWage = Math.max(role.baseHourlyRange.min, corridor.wageBenchmark.minHourly);
  const maxWage = Math.max(role.baseHourlyRange.max, corridor.wageBenchmark.maxHourly);
  const canonicalUrl = `${SITE_URL}/careers/${role.slug}/${corridor.slug}`;

  const title = `${role.title} Jobs in ${corridor.name} | $${minWage}–$${maxWage}/hr | OperateServices`;
  const description = `Immediate openings for ${role.title} in ${corridor.name}, ${corridor.stateCode}. Deploy with leading industrial facilities across ${corridor.keyZones.slice(0, 2).join(' and ')}. Guaranteed pay rates from $${minWage} to $${maxWage}/hr with weekly pay and full health benefits.`;
  const keywords = `${role.title} jobs in ${corridor.name}, ${role.shortTitle} hiring ${corridor.stateCode}, industrial ${role.shortTitle} ${corridor.metroArea}, ${corridor.slug} welding mechanic jobs`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OperateServices',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/operateservices_logo.png`,
          width: 1200,
          height: 630,
          alt: `${role.title} in ${corridor.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      audience: 'Tradespeople & Industrial Job Seekers',
      'search-intent': 'Local Job Transaction',
    },
  };
}

export function buildServiceCorridorMetadata(service: IndustrialService, corridor: IndustrialCorridor): Metadata {
  const canonicalUrl = `${SITE_URL}/solutions/${service.slug}/${corridor.slug}`;
  const title = `${service.name} in ${corridor.name} | Enterprise Workforce | OperateServices`;
  const description = `Deploy verified ${service.shortName} across ${corridor.name}, ${corridor.stateCode}. Rapid ${corridor.deploymentSlaHours}h SLA response, guaranteed OSHA compliance, and dedicated on-premise coordination for facilities in ${corridor.keyZones.slice(0, 2).join(' and ')}.`;
  const keywords = `${service.name} ${corridor.name}, ${service.shortName} supplier ${corridor.stateCode}, industrial staffing ${corridor.metroArea}, workforce solutions ${corridor.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OperateServices',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/operateservices_logo.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${corridor.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      audience: 'Enterprise Plant Managers & Procurement Directors',
      'search-intent': 'Commercial Staffing Procurement',
    },
  };
}
