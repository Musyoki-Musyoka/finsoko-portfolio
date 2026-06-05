'use client';

import { motion } from 'framer-motion';
import {
  ChevronDown,
  Compass,
  Shield,
  Cpu,
  Bot,
  Leaf,
  Heart,
  Target,
  Brain,
  Eye,
  Zap,
  Users,
} from 'lucide-react';
import { scrollTo } from './shared';

const phaseIcons = [
  { icon: Target, label: 'Savannah Precision', color: 'bg-amber-600', section: 'phase-1' },
  { icon: Brain, label: 'Tsavo Fluency', color: 'bg-green-700', section: 'phase-2' },
  { icon: Shield, label: 'Ethical Savannah', color: 'bg-orange-700', section: 'phase-3' },
  { icon: Bot, label: 'Agent Savannah', color: 'bg-amber-800', section: 'phase-4' },
];

const featureIcons = [
  { icon: Compass, label: 'AIM + MAP', section: 'phase-1' },
  { icon: Eye, label: 'OCEAN', section: 'phase-1' },
  { icon: Leaf, label: 'OASIS', section: 'phase-3' },
  { icon: Heart, label: 'PRIDE', section: 'phase-3' },
  { icon: Cpu, label: 'RANK', section: 'phase-4' },
  { icon: Zap, label: 'HUNT', section: 'phase-4' },
  { icon: Users, label: 'GUARD', section: 'phase-4' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-amber-950 via-orange-900 to-amber-800"
    >
      {/* ── Hero image — let the Canva design speak for itself ── */}
      <div className="w-full">
        <img
          src="/hero-background.png"
          alt="FinSoko AI Safari Portfolio — Strategic AI Blueprint for Ethical SACCO Lending in East Africa"
          className="w-full h-auto object-cover object-center"
        />
      </div>

      {/* ── Icons bar below the image ── */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Tagline badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-2"
          >
            {['Pride Leader Capstone 2025', 'Ethical AI', 'SACCO Innovation', 'East Africa'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-200 ring-1 ring-white/10 backdrop-blur-sm sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Phase icons row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-5"
          >
            {phaseIcons.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.section)}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  aria-label={`Navigate to ${item.label}`}
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl shadow-lg ring-1 ring-white/20 transition-transform group-hover:scale-110 sm:size-14 ${item.color}`}
                  >
                    <Icon className="size-6 text-white sm:size-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100 drop-shadow-sm sm:text-xs">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Feature icons row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {featureIcons.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.section)}
                  className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/15 shadow-md transition-all hover:bg-black/50 hover:ring-white/30 hover:scale-105 cursor-pointer"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  <Icon className="size-4 text-white" />
                  <span className="text-[11px] font-bold text-amber-100 sm:text-xs">{item.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Authors */}
          <p className="mt-5 text-xs font-medium text-amber-200/80 sm:text-sm">
            Created by{' '}
            <span className="font-semibold text-white">Anthony Musyoka</span> &{' '}
            <span className="font-semibold text-white">Jonah Terry</span>
          </p>

          {/* Explore button */}
          <button
            onClick={() => scrollTo('executive-brief')}
            className="mx-auto mt-6 flex flex-col items-center gap-1 text-amber-200/60 transition-colors hover:text-white cursor-pointer"
            aria-label="Scroll to Executive Brief"
          >
            <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
            <ChevronDown className="size-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
