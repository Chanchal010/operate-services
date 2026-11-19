'use client';

/**
 * src/components/seo/RelatedCorridors.tsx
 * Deterministic Link Equity Rotation Component for OperateServices
 * Ported from Workforce Web's zero-orphan PageRank distribution algorithm
 */

import React from 'react';
import Link from 'next/link';
import { INDUSTRIAL_CORRIDORS } from '@/data/industrialCorridors';
import { INDUSTRIAL_ROLES } from '@/data/industrialRoles';

interface RelatedCorridorsProps {
  currentCorridorSlug: string;
  basePath?: string;
  prefix?: string;
  max?: number;
  title?: string;
}

export function RelatedCorridors({
  currentCorridorSlug,
  basePath = '/careers',
  prefix = 'Jobs in',
  max = 8,
  title = 'Explore Nearby Industrial Corridors',
}: RelatedCorridorsProps) {
  const current = INDUSTRIAL_CORRIDORS.find((c) => c.slug === currentCorridorSlug);
  const eligible = INDUSTRIAL_CORRIDORS.filter((c) => c.slug !== currentCorridorSlug);

  // 1. Geographic affinity: Same state corridors first
  const sameState = current?.stateCode
    ? eligible.filter((c) => c.stateCode === current.stateCode)
    : [];
  const otherStates = eligible.filter((c) => c.stateCode !== current?.stateCode);

  // 2. Deterministic Polynomial String Hash
  let hash = 0;
  if (currentCorridorSlug) {
    for (let i = 0; i < currentCorridorSlug.length; i++) {
      hash = (hash << 5) - hash + currentCorridorSlug.charCodeAt(i);
      hash |= 0;
    }
  }
  const offset = Math.abs(hash);

  // 3. Deterministic Rotated Slice
  const rotatedCorridors: typeof eligible = [];
  if (sameState.length > 0) {
    const sOffset = offset % sameState.length;
    const rotated = [...sameState.slice(sOffset), ...sameState.slice(0, sOffset)];
    rotatedCorridors.push(...rotated.slice(0, max));
  }

  if (rotatedCorridors.length < max && otherStates.length > 0) {
    const oOffset = offset % otherStates.length;
    const rotated = [...otherStates.slice(oOffset), ...otherStates.slice(0, oOffset)];
    rotatedCorridors.push(...rotated.slice(0, max - rotatedCorridors.length));
  }

  return (
    <div className="pt-8 border-t border-slate-200 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <Link href="/locations" className="text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline">
          View All Industrial Corridors →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {rotatedCorridors.map((c) => (
          <Link
            key={c.slug}
            href={`${basePath}/${c.slug}`}
            className="text-xs font-medium text-slate-700 hover:text-sky-700 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg px-3 py-2 transition-all shadow-xs"
          >
            {prefix} {c.shortName} ({c.stateCode})
          </Link>
        ))}
      </div>
    </div>
  );
}

interface RelatedTradesProps {
  currentRoleSlug: string;
  corridorSlug?: string;
  basePath?: string;
  max?: number;
  title?: string;
}

export function RelatedTrades({
  currentRoleSlug,
  corridorSlug,
  basePath = '/careers',
  max = 6,
  title = 'Related Skilled Trades',
}: RelatedTradesProps) {
  const current = INDUSTRIAL_ROLES.find((r) => r.slug === currentRoleSlug);
  const eligible = INDUSTRIAL_ROLES.filter((r) => r.slug !== currentRoleSlug);

  // Category affinity first
  const sameCategory = current?.category
    ? eligible.filter((r) => r.category === current.category)
    : [];
  const otherCategory = eligible.filter((r) => r.category !== current?.category);

  const roles = [...sameCategory, ...otherCategory].slice(0, max);

  return (
    <div className="pt-8 border-t border-slate-200 mt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {roles.map((r) => {
          const href = corridorSlug
            ? `${basePath}/${r.slug}/${corridorSlug}`
            : `${basePath}/${r.slug}`;
          return (
            <Link
              key={r.slug}
              href={href}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 rounded-xl transition-all shadow-xs group"
            >
              <div className="font-semibold text-slate-900 group-hover:text-sky-600 text-sm">
                {r.title}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                ${r.baseHourlyRange.min} – ${r.baseHourlyRange.max}/hr • {r.category}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
