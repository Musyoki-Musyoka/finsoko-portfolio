'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function SectionSkeleton() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          {/* Header skeleton */}
          <div className="flex items-start gap-4">
            <Skeleton className="size-12 shrink-0 rounded-xl" />
            <div className="space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-6 w-48 rounded-md" />
              </div>
              <Skeleton className="h-4 w-64 rounded-md" />
            </div>
          </div>
          {/* Content skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
            <div className="grid gap-4 sm:grid-cols-3 pt-4">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
