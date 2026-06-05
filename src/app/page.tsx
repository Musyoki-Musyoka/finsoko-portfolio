'use client';

import React, { Suspense } from 'react';

/* ── Eager imports (above the fold / always needed) ── */
import StickyNav from '@/components/sections/sticky-nav';
import HeroSection from '@/components/sections/hero-section';
import SectionSkeleton from '@/components/sections/loading-skeleton';

/* ── Lazy imports (below the fold / heavy sections) ── */
const ExecutiveBrief = React.lazy(() => import('@/components/sections/executive-brief'));
const Phase1Section = React.lazy(() => import('@/components/sections/phase-1'));
const Phase2Section = React.lazy(() => import('@/components/sections/phase-2'));
const Phase3Section = React.lazy(() => import('@/components/sections/phase-3'));
const Phase4Section = React.lazy(() => import('@/components/sections/phase-4'));
const PrototypeSection = React.lazy(() => import('@/components/sections/prototype-section'));
const ImpactSection = React.lazy(() => import('@/components/sections/impact-section'));
const BlueprintSection = React.lazy(() => import('@/components/sections/blueprint-section'));
const ReflectionSection = React.lazy(() => import('@/components/sections/reflection-section'));

export default function FinSokoPortfolio() {
  return (
    <div className="flex min-h-screen flex-col">
      <StickyNav />
      <main className="flex-1">
        {/* Hero loads eagerly — it's the first thing users see */}
        <HeroSection />

        {/* Everything below the fold is lazy-loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <ExecutiveBrief />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Phase1Section />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Phase2Section />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Phase3Section />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Phase4Section />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <PrototypeSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ImpactSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <BlueprintSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ReflectionSection />
        </Suspense>

      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-amber-600/15 bg-amber-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium">FinSoko AI Safari Portfolio | Pride Leader Capstone 2025</p>
            <p className="mt-1 text-xs text-white/70">Created by Anthony Musyoka & Jonah Terry</p>
          </div>
          <p className="text-xs text-white/60">Ethical AI · SACCO Innovation · East Africa</p>
        </div>
      </footer>
    </div>
  );
}
