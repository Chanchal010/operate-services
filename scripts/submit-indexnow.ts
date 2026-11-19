/**
 * scripts/submit-indexnow.ts
 * ============================================================
 * OperateServices — Instant IndexNow Search Submission Engine
 * Submits all active canonical PSEO URLs in batches of 10,000
 * directly to https://api.indexnow.org/indexnow
 * Instantly triggers Bing, Copilot, ChatGPT Search, and Yandex.
 *
 * Usage: npx tsx scripts/submit-indexnow.ts
 * ============================================================
 */

import { getAllCorridors } from '../src/data/industrialCorridors';
import { getAllIndustrialRoles } from '../src/data/industrialRoles';
import { getAllServices } from '../src/data/industrialServices';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'operateservices.com';
const KEY = 'e4f5a6b7c8d90123456789abcdef0123';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BASE_URL = `https://${HOST}`;

async function collectAllUrls(): Promise<string[]> {
  const urls: string[] = [
    `${BASE_URL}`,
    `${BASE_URL}/careers`,
    `${BASE_URL}/jobs`,
    `${BASE_URL}/solutions`,
    `${BASE_URL}/locations`,
    `${BASE_URL}/about-us`,
  ];

  const corridors = getAllCorridors();
  const roles = getAllIndustrialRoles().filter((r) => r.indexabilityStatus === 'eligible');
  const services = getAllServices();

  // Corridor Hubs
  for (const c of corridors) {
    urls.push(`${BASE_URL}/corridors/${c.slug}`);
  }

  // Trade Roles × Corridors
  for (const r of roles) {
    for (const c of corridors) {
      urls.push(`${BASE_URL}/careers/${r.slug}/${c.slug}`);
    }
  }

  // B2B Services × Corridors
  for (const s of services) {
    for (const c of corridors) {
      urls.push(`${BASE_URL}/solutions/${s.slug}/${c.slug}`);
    }
  }

  return [...new Set(urls)];
}

async function submitBatches(urls: string[]) {
  const BATCH_SIZE = 10000;
  console.log(`🚀 Starting IndexNow submission for ${urls.length} canonical URLs...`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const chunk = urls.slice(i, i + BATCH_SIZE);
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk,
    };

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      console.log(`📡 Submitted batch ${Math.floor(i / BATCH_SIZE) + 1} (${chunk.length} URLs): HTTP ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log(`✅ IndexNow successfully acknowledged batch! Bing & AI search engines notified.`);
      } else {
        const text = await res.text();
        console.warn(`⚠️ IndexNow response message:`, text);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ Failed to submit batch to IndexNow:`, msg);
    }
  }
}

async function main() {
  const urls = await collectAllUrls();
  await submitBatches(urls);
}

main().catch(console.error);
