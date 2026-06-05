'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navLinks, scrollTo } from './shared';

export default function StickyNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-600/20 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <Image
            src="/logo.jpeg"
            alt="FinSoko logo"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">FinSoko</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-amber-100 hover:text-amber-800"
            >
              {link.label}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-amber-600/10 md:hidden">
          <div className="scrollbar-thin flex gap-1 overflow-x-auto px-4 py-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollTo(link.id);
                  setMobileOpen(false);
                }}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-amber-100 hover:text-amber-800"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
