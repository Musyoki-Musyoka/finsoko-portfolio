'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

/* ──────────────────────────── data ──────────────────────────── */

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'executive-brief', label: 'Brief' },
  { id: 'phase-1', label: 'Phase 1' },
  { id: 'phase-2', label: 'Phase 2' },
  { id: 'phase-3', label: 'Phase 3' },
  { id: 'phase-4', label: 'Phase 4' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'impact', label: 'Impact' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'reflection', label: 'Reflection' },
];

export const heroBadges = [
  { label: 'Savannah Precision', color: 'bg-amber-600' },
  { label: 'Tsavo Fluency', color: 'bg-green-700' },
  { label: 'Ethical Savannah', color: 'bg-orange-700' },
  { label: 'Agent Savannah', color: 'bg-amber-800' },
];

export const denialData = [
  { category: 'Market Vendor', denied: 68, approved: 32 },
  { category: 'Formal Employee', denied: 22, approved: 78 },
  { category: 'Smallholder Farmer', denied: 61, approved: 39 },
  { category: 'Boda Boda Rider', denied: 54, approved: 46 },
];

export const impactChartData = [
  { year: 'Year 1', vendors: 2400, defaultRate: 2.8, biasReduction: 18 },
  { year: '2', vendors: 5200, defaultRate: 2.6, biasReduction: 34 },
  { year: '3', vendors: 7800, defaultRate: 2.5, biasReduction: 48 },
  { year: '4', vendors: 10200, defaultRate: 2.4, biasReduction: 58 },
  { year: '5', vendors: 12400, defaultRate: 2.3, biasReduction: 64 },
];

export const sovereigntyData = [
  { name: 'AWS Africa (Cape Town)', value: 89, color: '#15803D' },
  { name: 'Local SACCO Servers', value: 8, color: '#D97706' },
  { name: 'Edge/USSD Cache', value: 3, color: '#C2410C' },
];

/* ──────────────────────────── helpers ──────────────────────────── */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ──────────────────────────── shared components ──────────────────────────── */

export function SectionHeader({
  phaseNumber,
  title,
  subtitle,
  icon: Icon,
  color,
  badgeColor,
}: {
  phaseNumber?: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  badgeColor: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color} text-white shadow-md`}>
        <Icon className="size-6" />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {phaseNumber !== undefined && (
            <Badge className={`${badgeColor} border-0 text-xs font-bold`}>Phase {phaseNumber}</Badge>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 text-sm font-medium text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function FrameworkCard({
  title,
  label,
  children,
  accent = 'var(--fs-amber)',
}: {
  title: string;
  label: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm" style={{ borderLeftWidth: '4px', borderLeftColor: accent }}>
      <div className="mb-3 flex items-center gap-2">
        <Badge className="border-0 text-xs font-bold" style={{ backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`, color: accent }}>{label}</Badge>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}
