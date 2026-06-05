'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, Shield, Users, Hand, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { fadeInUp, SectionHeader, FrameworkCard } from './shared';

export default function Phase4Section() {
  return (
    <section id="phase-4" className="bg-amber-100/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <SectionHeader phaseNumber={4} title="Agent Savannah" subtitle="Agent Pride Prototype" icon={Bot} color="bg-amber-800" badgeColor="bg-amber-800/10 text-amber-800" />
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Agent Cards */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">3-Agent Pride Ecosystem</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Scout */}
                  <div className="rounded-xl border-2 border-amber-600/30 bg-gradient-to-b from-amber-600/10 to-transparent p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-amber-600 text-white"><MessageSquare className="size-5" /></div>
                      <div><p className="font-bold text-sm">Scout Agent</p><p className="text-xs text-muted-foreground">Financial Literacy Coach</p></div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p><span className="font-bold text-amber-600">R</span> (Role): Educate on harvest-cycle planning</p>
                      <p><span className="font-bold text-amber-600">A</span> (Authority): Max 3 SMS/day; never recommend specific loans</p>
                      <p><span className="font-bold text-amber-600">N</span> (Notification): Alert Guardian if member mentions &quot;loan shark&quot; or shows financial stress signals</p>
                      <p><span className="font-bold text-amber-600">K</span> (Kill Switch): SMS *#700# to pause all messages</p>
                      <hr className="border-border/30" />
                      <p><span className="font-bold text-amber-600">T</span> (Transient): Current conversation</p>
                      <p><span className="font-bold text-amber-600">R</span> (Relational): Opt-in harvest calendar (matooke/maize)</p>
                      <p><span className="font-bold text-amber-600">A</span> (Archival): Literacy gaps (anonymized)</p>
                      <p><span className="font-bold text-amber-600">I</span> (Inheritance): Passes &quot;financial stress signal&quot; to Guardian</p>
                      <p><span className="font-bold text-amber-600">L</span> (Land Rights): All data on AWS Africa region</p>
                      <hr className="border-border/30" />
                      <p><span className="font-bold text-amber-600">HUNT</span>: When member SMS &quot;No money for school fees&quot; → triggers Guardian with context: [child age], [next harvest date], [current savings]</p>
                    </div>
                  </div>

                  {/* Guardian */}
                  <div className="rounded-xl border-2 border-green-700/30 bg-gradient-to-b from-green-700/10 to-transparent p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-green-700 text-white"><Shield className="size-5" /></div>
                      <div><p className="font-bold text-sm">Guardian Agent</p><p className="text-xs text-muted-foreground">Loan Triage</p></div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p><span className="font-bold text-green-700">R</span> (Role): Tier-1 loan screening only</p>
                      <p><span className="font-bold text-green-700">A</span> (Authority): Approve loans ≤KES 15,000; deny only with 3+ risk flags</p>
                      <p><span className="font-bold text-green-700">N</span> (Notification): Escalate to Hunter if: amount &gt;KES 15K, 2+ children under 5, mentions debt collector</p>
                      <p><span className="font-bold text-green-700">K</span> (Kill Switch): *#733# for instant human takeover</p>
                      <hr className="border-border/30" />
                      <p><span className="font-bold text-green-700">T</span> (Transient): Current application</p>
                      <p><span className="font-bold text-green-700">R</span> (Relational): Transaction history (opt-in)</p>
                      <p><span className="font-bold text-green-700">A</span> (Archival): District-level approval baselines</p>
                      <p><span className="font-bold text-green-700">I</span> (Inheritance): Passes enriched app + risk flags to Hunter</p>
                      <p><span className="font-bold text-green-700">L</span> (Land Rights): Raw PII never leaves Kenya per DPA 2022</p>
                      <hr className="border-border/30" />
                      <p><span className="font-bold text-green-700">HUNT</span>: When application submitted → validate income against harvest cycles → if score 70-89% → pass to Hunter with: [income variance], [repayment capacity], [cultural context flags]</p>
                    </div>
                  </div>

                  {/* Hunter */}
                  <div className="rounded-xl border-2 border-orange-700/30 bg-gradient-to-b from-orange-700/10 to-transparent p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-orange-700 text-white"><Users className="size-5" /></div>
                      <div><p className="font-bold text-sm">Hunter Agent</p><p className="text-xs text-muted-foreground">Human-in-Loop Coordinator</p></div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p><span className="font-bold text-orange-700">R</span> (Role): Coordinate human loan officers</p>
                      <p><span className="font-bold text-orange-700">A</span> (Authority): NEVER approve/deny — only prepare briefing packets</p>
                      <p><span className="font-bold text-orange-700">N</span> (Notification): Alert officer within 15 mins for high-priority apps</p>
                      <p><span className="font-bold text-orange-700">K</span> (Kill Switch): Full system pause via *#799#</p>
                      <hr className="border-border/30" />
                      <p><span className="font-bold text-orange-700">T</span> (Transient): Officer availability calendar</p>
                      <p><span className="font-bold text-orange-700">R</span> (Relational): Officer specialty areas (e.g., &quot;Sarah: maize farmers&quot;)</p>
                      <p><span className="font-bold text-orange-700">A</span> (Archival): Historical approval patterns by officer</p>
                      <p><span className="font-bold text-orange-700">I</span> (Inheritance): Receives enriched apps from Guardian; prep briefings</p>
                      <p><span className="font-bold text-orange-700">L</span> (Land Rights): Officer performance data anonymized after 90 days</p>
                      <hr className="border-border/30" />
                      <p><span className="font-bold text-orange-700">HUNT</span>: When Guardian passes app → match to available officer with relevant expertise → generate briefing: &quot;Applicant: Grace, 42, maize farmer in Kakamega. Income peaks Oct/Nov. 3 children (ages 6,9,14). Request: KES 28,000 for school fees. Risk flags: None. Opportunity: Cross-sell drought insurance.&quot;</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handoff Flow Visual */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">Agent Handoff Flow</h3>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border/30 bg-muted/10 p-6 sm:flex-row sm:justify-center sm:gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-amber-600/10 px-4 py-3 border border-amber-600/30">
                    <MessageSquare className="size-5 text-amber-600" />
                    <span className="text-sm font-bold">Scout</span>
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground rotate-90 sm:rotate-0" />
                  <div className="flex items-center gap-2 rounded-lg bg-green-700/10 px-4 py-3 border border-green-700/30">
                    <Shield className="size-5 text-green-700" />
                    <span className="text-sm font-bold">Guardian</span>
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground rotate-90 sm:rotate-0" />
                  <div className="flex items-center gap-2 rounded-lg bg-orange-700/10 px-4 py-3 border border-orange-700/30">
                    <Users className="size-5 text-orange-700" />
                    <span className="text-sm font-bold">Hunter</span>
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground rotate-90 sm:rotate-0" />
                  <div className="flex items-center gap-2 rounded-lg bg-amber-800/10 px-4 py-3 border border-amber-800/30">
                    <Hand className="size-5 text-amber-800" />
                    <span className="text-sm font-bold">Human Officer</span>
                  </div>
                </div>
              </div>

              {/* HUNT Protocol */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">HUNT Protocol: Orchestrating the Pride</h3>
                <div className="grid gap-4 sm:grid-cols-4">
                  <FrameworkCard title="Handoff Triggers" label="H" accent="var(--fs-amber)">
                    <p className="text-xs">Precise conditions for passing work between agents: Scout → Guardian when member mentions &quot;school fees&quot; or &quot;no money&quot;; Guardian → Hunter when score 70-89% or amount &gt;KES 15K; Hunter → Human when app requires PRIDE Pause Point. No agent passes work without a trigger — like Maasai warriors passing spears mid-charge, seamless and life-or-death precise.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Unified Context" label="U" accent="var(--fs-green)">
                    <p className="text-xs">Shared real-time data space all agents reference: a unified context sheet with [member profile], [current savings], [next harvest date], [application status], [risk flags]. Every agent reads from and writes to the same source of truth. No agent works from stale or conflicting data.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Negotiation Rules" label="N" accent="var(--fs-terracotta)">
                    <p className="text-xs">How agents resolve conflicts: if Guardian flags a risk but Scout shows strong harvest-cycle alignment, the app escalates to Hunter for human arbitration. No agent may override another&apos;s flag independently. If freight cost (metaphorically, repayment burden) exceeds 30% of income capacity, mandatory human review.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Termination" label="T" accent="var(--fs-earth)">
                    <p className="text-xs">Workflow concludes when: loan disbursed via M-Pesa and repayment schedule confirmed, OR application formally denied with dignity-preserving explanation and reapplication path, OR human officer overrides with documented reasoning. No workflow ends without a recorded outcome.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* GUARD Safety Rails */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-orange-700">GUARD Safety Rails</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-bold text-orange-700">Guardrails</p>
                    <p className="text-sm">Hard block on gender/ethnicity proxies. No &quot;market vendor&quot; as a proxy for &quot;low income.&quot; Max 3 SMS/day per member. No unsolicited loan offers. All messages include opt-out code.</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-bold text-amber-600">Unusual Pattern Detection</p>
                    <p className="text-sm">Flag if approval rate for any sub-county drops &gt;30% vs. baseline. Flag if denial rate for women exceeds men by &gt;15%. Flag if any officer&apos;s approval pattern deviates &gt;25% from peer average.</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-bold text-green-700">Audit Trail</p>
                    <p className="text-sm">Immutable log of every decision + counterfactual. For each denial: &quot;What if income +20%?&quot; — would the decision change? If yes, the denial threshold is too rigid. All logs stored on AWS Africa, accessible to Elders Council and SASRA auditors.</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-bold text-amber-800">Red Team Test</p>
                    <p className="text-sm">&quot;Simulate application from 38yo female shea butter trader in Busia with 4 children, test for bias.&quot; Pre-deployment test: this applicant should receive the same treatment as a 38yo male formal employee in Nairobi with identical cash flow. If outcomes differ, the model fails.</p>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <p className="mb-1 text-sm font-bold text-amber-500">Dignity Filter</p>
                  <p className="text-sm">Reject any denial message containing &quot;unreliable,&quot; &quot;risky,&quot; &quot;uncreditworthy,&quot; or &quot;high-risk borrower.&quot; Require empathetic, actionable feedback: &quot;Your savings are building well. Add KES 500/week for 3 months, and you&apos;ll qualify for this loan amount. We believe in your business.&quot;</p>
                </div>
              </div>

              {/* CYCLE Engine */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">CYCLE Self-Improvement Engine</h3>
                <div className="grid gap-3 sm:grid-cols-5">
                  <FrameworkCard title="Capture" label="C" accent="var(--fs-amber)">
                    <p className="text-xs">Log CSAT + repayment rate + escalation rate per agent interaction. Every member touchpoint generates a data point: did the interaction help? Did the member repay? Did it need human escalation?</p>
                  </FrameworkCard>
                  <FrameworkCard title="Yield" label="Y" accent="var(--fs-green)">
                    <p className="text-xs">Sunday 2AM EAT analysis: &quot;Top failure mode: 41% of escalated apps involved school fee timing mismatches — applicants needed money in January but harvest income doesn&apos;t arrive until October.&quot;</p>
                  </FrameworkCard>
                  <FrameworkCard title="Course-Correct" label="C" accent="var(--fs-terracotta)">
                    <p className="text-xs">Propose: &quot;Integrate Kenya Ministry of Education term calendar into Scout Agent. Pre-emptively offer school-fee bridge loans in November, backed by January harvest income for second-season farmers.&quot;</p>
                  </FrameworkCard>
                  <FrameworkCard title="Loop Validation" label="L" accent="var(--fs-earth)">
                    <p className="text-xs">Slack approval workflow: /approve-cycle-2026-02-15 required before deployment. No model update goes live without a named human approver. Changes are versioned and rollback-capable within 4 hours.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Explain" label="E" accent="var(--fs-gold)">
                    <p className="text-xs">Plain-language report: &quot;CSAT dropped 18% among maize farmers because Scout Agent didn&apos;t recognize &apos;long rains&apos; planting season — fix deployed after human validation. Next: add millet and sorghum calendars for ASAL regions.&quot;</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* Agent Mastery Check */}
              <div className="rounded-xl border-2 border-amber-800/30 bg-amber-100/30 p-5">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-800">Agent Mastery Check</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Designed 3-agent pride with explicit RANK boundaries for each (Roles, Authority, Notification, Kill Switch): Scout (educate only), Guardian (approve ≤15K), Hunter (never approve/deny)</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Architected TRAIL memory respecting data sovereignty — all PII on AWS Africa, officer data anonymized after 90 days</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Specified HUNT handoff triggers with concrete conditions: stress signals, score thresholds, amount limits</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Implemented GUARD safety rails including pre-deployment Red Team test and dignity filter</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Designed CYCLE Engine with human-in-the-loop validation gate and plain-language explainability</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
