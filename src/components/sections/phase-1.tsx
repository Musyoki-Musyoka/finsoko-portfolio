'use client';

import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fadeInUp, SectionHeader, FrameworkCard, denialData } from './shared';

export default function Phase1Section() {
  return (
    <section id="phase-1" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <SectionHeader phaseNumber={1} title="Savannah Precision" subtitle="AIM/MAP Diagnostic Report" icon={Compass} color="bg-amber-600" badgeColor="bg-amber-600/10 text-amber-600" />
            </CardHeader>
            <CardContent className="space-y-8">
              {/* AIM Framework — Before → After Transformation */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-600">AIM Framework: Prompt Transformation — Before &amp; After</h3>
                <p className="mb-4 text-sm text-muted-foreground">A vague prompt becomes a precision instrument by defining the <strong>Actor</strong> (who the AI should be), providing the <strong>Input</strong> (what the AI should inspect), and stating the <strong>Mission</strong> (what the AI should produce).</p>

                {/* Before / After pair */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  {/* BEFORE */}
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-red-600">Before (Vague)</p>
                    <p className="text-sm italic text-red-900/80">&quot;Assess risk.&quot;</p>
                    <p className="mt-2 text-xs text-red-700/70">No persona. No data context. No measurable goal. The AI fills the gaps with its training defaults — which over-represent formal-sector borrowers. Result: 68% denial for market vendors who repay at 94%.</p>
                  </div>

                  {/* AFTER */}
                  <div className="rounded-lg border border-green-700/30 bg-green-700/5 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-green-700">After (AIM-Structured)</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold" style={{ backgroundColor: 'color-mix(in srgb, var(--fs-amber) 10%, transparent)', color: 'var(--fs-amber)' }}>A — Actor</span>
                        <span className="italic"> &quot;Act as a seasonal-income lending analyst for Ujima SACCO.&quot;</span>
                      </p>
                      <p>
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold" style={{ backgroundColor: 'color-mix(in srgb, var(--fs-green) 10%, transparent)', color: 'var(--fs-green)' }}>I — Input</span>
                        <span className="italic"> &quot;Inspect the applicant&apos;s M-Pesa transaction history, harvest calendar for their district, and Ujima&apos;s 2025 approval data showing 68% denial rate for market vendors vs. 22% for formal employees — with 94% on-time repayment for approved vendors.&quot;</span>
                      </p>
                      <p>
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-bold" style={{ backgroundColor: 'color-mix(in srgb, var(--fs-terracotta) 10%, transparent)', color: 'var(--fs-terracotta)' }}>M — Mission</span>
                        <span className="italic"> &quot;Assess repayment capacity based on seasonal income peaks rather than monthly averages. Score applicants against harvest-cycle earnings and propose repayment schedules aligned with their income timing.&quot;</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* AIM annotated breakdown */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <FrameworkCard title="Actor" label="A" accent="var(--fs-amber)">
                    <p><strong>Who the AI should be:</strong> &quot;Act as a seasonal-income lending analyst for Ujima SACCO&quot; — not &quot;assess risk.&quot; A specialist who understands that informal-sector income follows agricultural cycles, not monthly payrolls. Your role is to evaluate repayment capacity in the context of harvest liquidity, not to apply one-size-fits-all risk thresholds.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Input" label="I" accent="var(--fs-green)">
                    <p><strong>What the AI should inspect:</strong> The applicant&apos;s M-Pesa transaction history showing seasonal income spikes, the harvest calendar for their district (matooke: Mar/Apr &amp; Sept/Oct; maize: Oct/Nov; shea butter: Dec-Feb), and Ujima&apos;s 2025 approval data: 68% denial rate for &quot;market vendor&quot; vs. 22% for &quot;formal employee,&quot; with 94% on-time repayment for approved vendors.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Mission" label="M" accent="var(--fs-terracotta)">
                    <p><strong>What the AI should produce:</strong> A repayment capacity assessment based on seasonal income peaks, not monthly averages. Score applicants against harvest-cycle earnings and propose repayment schedules aligned with their income timing. Flag any case where the current model&apos;s denial contradicts the applicant&apos;s actual repayment capacity.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* Denial Rate Chart */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-600">Denial Rate by Occupation</h3>
                <div className="h-64 rounded-lg border border-border/30 bg-muted/10 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={denialData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                      <YAxis dataKey="category" type="category" width={120} />
                      <Tooltip formatter={(v: number) => `${v}%`} />
                      <Bar dataKey="denied" fill="#C2410C" name="Denied" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="approved" fill="#15803D" name="Approved" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* MAP Framework */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">MAP Framework for Context: Grounding AI Reasoning in Reality</h3>
                <p className="mb-4 text-sm text-muted-foreground">Ground AI reasoning by providing <strong>Memory</strong>, <strong>Assets</strong>, and a structured <strong>Prompt</strong>.</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <FrameworkCard title="Memory" label="M" accent="var(--fs-amber)">
                    <p>Matooke harvest cycles: March/April (first season) and September/October (second season). Maize peaks October/November. Shea butter trade surges December through February during dry season. These aren&apos;t footnotes — they&apos;re the economic heartbeat of our members.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Assets" label="A" accent="var(--fs-green)">
                    <p>Member transaction history from M-Pesa and SACCO savings accounts showing income spikes during harvest: maize farmers earn 3-4x their lean-month income in Oct/Nov; market vendors see 2x volume during harvest season as farmers spend. This data exists. We just aren&apos;t using it.</p>
                  </FrameworkCard>

                  <FrameworkCard title="Prompt" label="P" accent="var(--fs-earth)">
                    <p>Generate 4 repayment schedules aligned with agricultural liquidity cycles: (1) Matooke grower plan — payments due May 15 and Nov 15; (2) Maize farmer plan — payments due Dec 1 and Jun 1; (3) Market vendor plan — variable payments matching harvest-season revenue; (4) Shea butter trader plan — payments due Mar 1 and Aug 1 around dry-season trade peaks.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* Chain of Thought + Verifier */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-orange-700">Debugging Weak Outputs: Chain-of-Thought + Verifier Pattern</h3>
                <div className="rounded-xl border border-orange-700/20 bg-orange-700/5 p-5 space-y-3">
                  <p className="text-sm font-medium"><strong>Weak output:</strong> &quot;Market vendors are high-risk borrowers.&quot;</p>
                  <p className="text-sm font-medium"><strong>Chain-of-Thought debugging:</strong> &quot;Step 1: Define &apos;high-risk.&apos; What metric? Default rate? Income variance? Step 2: Check default rate for approved market vendors — it&apos;s 6%, vs. 9% for formal employees. Step 3: Income variance is not the same as repayment risk if repayment schedules align with income peaks. Step 4: The model is conflating &apos;irregular income&apos; with &apos;unreliable repayment.&apos;&quot;</p>
                  <p className="text-sm font-medium"><strong>Verifier Pattern:</strong> &quot;Does this conclusion hold when tested against Ujima&apos;s 2024 repayment data for Busia County? No — approved vendors in Busia repaid at 94%. The &apos;high-risk&apos; label is a taxonomy error, not a repayment reality.&quot;</p>
                  <p className="text-sm font-medium"><strong>Refinement Protocol:</strong> Ask the AI to propose two sharper versions of the original prompt. Version 1: &quot;Analyze Ujima&apos;s loan denial disparity by occupation, cross-referencing with on-time repayment rates.&quot; Version 2: &quot;Act as a fairness auditor. Using 2025 data, identify which occupation categories show denial-repayment mismatches and hypothesize pipeline failures.&quot; Both versions produce more targeted, actionable outputs than &quot;assess risk.&quot;</p>
                </div>
              </div>

              {/* OCEAN Verification */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">OCEAN Framework: Verifying Claims Against Central Bank of Kenya Guidelines</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="o">
                    <AccordionTrigger className="text-sm font-semibold"><span className="text-amber-600">O</span> — Original: Is this claim original or recycled from outdated data?</AccordionTrigger>
                    <AccordionContent className="text-sm">Ujima SACCO internal records, 2023-2025. Verified against CBK Annual Supervision Report 2024 showing SACCO sector average default rate of 5.2%. Our claimed vendor default rate of 6% is within CBK tolerance — not &quot;high risk&quot; by regulator standards.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="c">
                    <AccordionTrigger className="text-sm font-semibold"><span className="text-amber-600">C</span> — Concrete: Are there real names, examples, and numbers?</AccordionTrigger>
                    <AccordionContent className="text-sm">Kenya&apos;s informal sector employs 83% of the workforce (KNBS 2024). Treating 83% of workers as &quot;high risk&quot; contradicts the economic reality that informal trade drives GDP. CBK&apos;s own financial inclusion strategy (2023-2028) prioritizes extending credit to informal earners.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="e">
                    <AccordionTrigger className="text-sm font-semibold"><span className="text-amber-600">E</span> — Evident: Does the logic show proof chains?</AccordionTrigger>
                    <AccordionContent className="text-sm">Claim: &quot;Market vendors default more.&quot; Evidence: False. Ujima&apos;s own data shows 94% on-time repayment for approved vendors. The 68% denial rate reflects scoring bias, not repayment behavior. Hallucination exposed: a prior AI output claimed &quot;informal traders default at 2x the rate of salaried workers&quot; — no such data exists in Ujima records.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="a">
                    <AccordionTrigger className="text-sm font-semibold"><span className="text-amber-600">A</span> — Assertive: Does the AI take a clear, verifiable stance?</AccordionTrigger>
                    <AccordionContent className="text-sm">Core assumption: Monthly salary = reliable income. This is a Silicon Valley assumption. In Kenya, a market vendor earning KES 30,000/month with 8% variance is more predictable than a gig worker earning KES 25,000 with 40% variance. The model needs seasonal variance windows, not flat monthly targets.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="n">
                    <AccordionTrigger className="text-sm font-semibold"><span className="text-amber-600">N</span> — Narrative: Is the insight wrapped in coherent, contextual storytelling?</AccordionTrigger>
                    <AccordionContent className="text-sm">The nuance of &quot;chama&quot; (group savings) as informal credit insurance. SACCO members in rotating savings groups have collective repayment buffers that individual scoring misses. A vendor in a 12-member chama has 11 guarantors — that&apos;s a risk mitigation structure the model ignores.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Savannah Mastery Check */}
              <div className="rounded-xl border-2 border-amber-600/30 bg-amber-100/30 p-5">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-800">Savannah Mastery Check</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Replaced vague &quot;assess risk&quot; prompt with AIM-calibrated: &quot;Actor: seasonal-income lending analyst → Input: M-Pesa transactions + harvest calendars + denial data → Mission: assess repayment capacity against seasonal income peaks&quot;</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Anchored all outputs in Kenyan/Ugandan economic reality — matooke harvest cycles, M-Pesa transaction data, KNBS informal sector statistics</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Verified 5+ facts via OCEAN: CBK default rates, KNBS employment stats, Ujima repayment records, chama structures, SASRA regulations</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Exposed 2 hallucinations: &quot;informal traders default at 2x rate&quot; (no data), &quot;monthly income is the standard risk metric&quot; (violates CBK inclusion strategy)</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
