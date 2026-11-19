import type { MetadataRoute } from 'next';
import { getAllCorridors } from '@/data/industrialCorridors';
import { getAllIndustrialRoles } from '@/data/industrialRoles';
import { getAllServices } from '@/data/industrialServices';

export default function sitemap(): MetadataRoute.Sitemap {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl =
    envUrl && !envUrl.includes('localhost')
      ? envUrl.replace(/\/$/, '')
      : 'https://operateservices.com';

  const now = new Date();
  const corridors = getAllCorridors();
  const roles = getAllIndustrialRoles().filter((r) => r.indexabilityStatus === 'eligible');
  const services = getAllServices();

  const entries: MetadataRoute.Sitemap = [
    // 1. Core Brand & Navigation Hubs
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Industrial Corridor Hubs (/corridors/[slug])
  for (const c of corridors) {
    entries.push({
      url: `${baseUrl}/corridors/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: c.featured ? 0.9 : 0.8,
    });
  }

  // 3. Trade Role × Corridor Job Placement Matrix (/careers/[role]/[corridor])
  for (const r of roles) {
    for (const c of corridors) {
      entries.push({
        url: `${baseUrl}/careers/${r.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: r.featured ? 0.85 : 0.75,
      });
    }
  }

  // 4. B2B Service × Corridor Enterprise Matrix (/solutions/[service]/[corridor])
  for (const s of services) {
    for (const c of corridors) {
      entries.push({
        url: `${baseUrl}/solutions/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: s.featured ? 0.85 : 0.75,
      });
    }
  }

  return entries;
}
