'use client';

import { motion } from 'framer-motion';
import { Compass, BarChart3, Clock, Globe, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { fadeInUp, SectionHeader } from './shared';

export default function ExecutiveBrief() {
  return (
    <section id="executive-brief" className="bg-amber-100/40 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-amber-600/20 shadow-lg">
            <CardHeader>
              <SectionHeader title="Executive Brief" subtitle="Board-Ready Strategic Summary" icon={Compass} color="bg-amber-600" badgeColor="bg-amber-600/10 text-amber-600" />
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
              <p>
                FinSoko&apos;s agent ecosystem targets a critical failure in Ujima SACCO&apos;s lending operations: a <strong>68% loan denial rate</strong> for market vendors compared to <strong>22% for formal employees</strong>. This disparity isn&apos;t rooted in actual repayment risk — it&apos;s a data pipeline failure that treats seasonal income as instability.
              </p>
              <p>
                Our three-agent architecture — <strong className="text-amber-600">Scout</strong> (Financial Literacy Coach), <strong className="text-green-700">Guardian</strong> (Loan Triage), and <strong className="text-orange-700">Hunter</strong> (Human-in-Loop Coordinator) — restructures the approval workflow around agricultural liquidity cycles. By aligning repayment schedules with matooke harvest peaks (March/April, September/October) and validating income against seasonal transaction patterns rather than monthly salary stubs, we project a <strong>37% increase in loan approvals</strong> for female vendors while maintaining below <strong>3% default risk</strong>.
              </p>
              <p>
                The system embeds ethics at every layer: <strong>ETHOS</strong> guardrails prevent exclusion of vulnerable groups, <strong>TRACK</strong> audits expose training data bias, <strong>OASIS</strong> protocols enforce Kenyan DPA 2022 compliance, and <strong>PRIDE</strong> loops mandate human oversight for high-stakes decisions. All data remains on AWS Africa (Cape Town) region, with 180-day auto-deletion for non-essential metadata and end-to-end encryption on USSD/SMS channels.
              </p>
              <div className="rounded-xl border border-amber-600/20 bg-amber-100/50 p-5">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-800">Impact Projection (5 Years)</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  <li className="flex items-start gap-2 text-sm"><BarChart3 className="mt-0.5 size-4 shrink-0 text-amber-600" /><span><strong>12,000+</strong> informal traders gain first-time credit access</span></li>
                  <li className="flex items-start gap-2 text-sm"><Clock className="mt-0.5 size-4 shrink-0 text-green-700" /><span><strong>18 hrs/week</strong> loan officer time savings</span></li>
                  <li className="flex items-start gap-2 text-sm"><Globe className="mt-0.5 size-4 shrink-0 text-orange-700" /><span><strong>89%</strong> of member data stays under African governance</span></li>
                  <li className="flex items-start gap-2 text-sm"><Shield className="mt-0.5 size-4 shrink-0 text-amber-800" /><span><strong>64%</strong> drop in bias incidents through quarterly TRACK audits</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
