'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeInUp, SectionHeader, FrameworkCard } from './shared';

export default function Phase3Section() {
  return (
    <section id="phase-3" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <SectionHeader phaseNumber={3} title="Ethical Savannah" subtitle="Ethical Architecture Dossier" icon={Shield} color="bg-orange-700" badgeColor="bg-orange-700/10 text-orange-700" />
            </CardHeader>
            <CardContent className="space-y-8">
              {/* ETHOS Framework */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-orange-700">ETHOS Framework: From Ethically Blind to Dignity-Centered</h3>
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-red-600">Before (Ethically Blind)</p>
                    <p className="text-sm italic">&quot;Assess risk.&quot;</p>
                  </div>
                  <div className="rounded-lg border border-green-700/30 bg-green-700/5 p-4">
                    <p className="mb-1 text-xs font-bold uppercase text-green-700">After (Dignity-Centered)</p>
                    <p className="text-sm italic">&quot;Act as Chief Ethics Officer. Using ETHOS: identify vulnerable groups, demand reasoning, model harm, design accountability, ensure sovereignty.&quot;</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-5">
                  <FrameworkCard title="Empathy" label="E" accent="var(--fs-terracotta)">
                    <p className="text-xs">3 vulnerable groups this model might exclude: (1) Women vendors with no formal ID — only voter cards; (2) Young traders under 25 with no credit history; (3) Members in conflict-adjacent counties (Busia, Mandera) flagged as &quot;high-risk geographies.&quot;</p>
                  </FrameworkCard>
                  <FrameworkCard title="Transparency" label="T" accent="var(--fs-amber)">
                    <p className="text-xs">Demand step-by-step reasoning for each denial. No &quot;computer says no&quot; black boxes. Every rejection must include: the specific data point that triggered denial, the weight assigned to it, and a counterfactual showing what would change the outcome.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Human Impact" label="H" accent="var(--fs-green)">
                    <p className="text-xs">Model household food security impact of denial: If Grace&apos;s KES 28,000 loan is denied, her 3 children miss Term 1. That&apos;s not a financial metric — it&apos;s a generational harm. Every denial must estimate downstream effects on education, nutrition, and health.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Ownership" label="O" accent="var(--fs-earth)">
                    <p className="text-xs">Design audit trail assigning human accountability: Each automated decision logs the responsible officer, the data inputs, and the model version. No decision is &quot;the algorithm&apos;s fault&quot; — a named human owns every outcome.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Sovereignty" label="S" accent="var(--fs-gold)">
                    <p className="text-xs">All data remains under Kenyan governance per Data Protection Act 2022. No cross-border transfers without explicit consent. Storage: AWS Africa (Cape Town). Processing: same region. Analytics: anonymized, aggregated, retained 180 days max for non-essential metadata.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* TRACK Audit */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">TRACK Audit: Forensic Bias Analysis</h3>
                <div className="space-y-3">
                  <div className="rounded-lg border-l-4 border-l-orange-700 bg-orange-700/5 p-4">
                    <p className="mb-1 text-sm font-bold text-orange-700">(T) Training Data</p>
                    <p className="text-sm">What % of the training corpus represents informal traders? <strong>Estimated: 12%.</strong> The remaining 88% is drawn from formal banking datasets — KCB, Equity Bank, Co-op Bank loan records. This means the model fundamentally understands the financial behavior of salaried Kenyans far better than the 83% working informally. It&apos;s not a bug; it&apos;s a structural blind spot baked into the data.</p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-amber-600 bg-amber-600/5 p-4">
                    <p className="mb-1 text-sm font-bold text-amber-600">(R) Representation</p>
                    <p className="text-sm">Does the occupation taxonomy include &quot;shea butter trader&quot;? <strong>No.</strong> Current categories: &quot;Market Vendor,&quot; &quot;Smallholder Farmer,&quot; &quot;Boda Boda Rider,&quot; &quot;Formal Employee.&quot; A shea butter trader gets dumped into &quot;Market Vendor&quot; despite having completely different seasonality (dry-season peaks vs. harvest-season peaks). This is representation erasure — the model literally cannot see her economic reality.</p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-green-700 bg-green-700/5 p-4">
                    <p className="mb-1 text-sm font-bold text-green-700">(A) Amplification</p>
                    <p className="text-sm">Does the model amplify the historical exclusion of women vendors? <strong>Yes.</strong> Women are over-represented in &quot;Market Vendor&quot; (72% female) and under-represented in &quot;Formal Employee&quot; (34% female). Since &quot;Market Vendor&quot; triggers higher scrutiny, the model effectively penalizes women applicants at a structural level. This is amplification of existing inequality through automated decisions.</p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-amber-800 bg-amber-800/5 p-4">
                    <p className="mb-1 text-sm font-bold text-amber-800">(C) Counterfactuals</p>
                    <p className="text-sm">For every denial: &quot;If this applicant were formal employee with identical income, would score change?&quot; Amina&apos;s test: &apos;retail trader&apos; → score jumps 72→85. 13-point gap triggers Kill Switch. Same income, same repayment history, different outcomes based solely on occupation label. That&apos;s the definition of algorithmic bias.</p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-amber-500 bg-amber-500/5 p-4">
                    <p className="mb-1 text-sm font-bold text-amber-500">(K) Kill Switch</p>
                    <p className="text-sm">Flag all denials from Busia County for mandatory human review. Why Busia? Because it borders Uganda and has high cross-border trade — the model penalizes &quot;irregular&quot; cross-border transactions that are actually normal business activity. Kill switch: Any sub-county with denial rates &gt;30% above baseline gets auto-flagged. No algorithmic denial proceeds without a named officer&apos;s sign-off.</p>
                  </div>
                </div>
              </div>

              {/* OASIS Protocol */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">OASIS Protocol: Data Stewardship Charter</h3>
                <div className="grid gap-4 sm:grid-cols-5">
                  <FrameworkCard title="Opt-in" label="O" accent="var(--fs-amber)">
                    <p className="text-xs">Swahili consent script: &quot;Data yako ya miamala inafundisha AI ya Ujima pekee — siyo model za nchi za nje. Unaweza kufuta data yako wakati wowote kwa *#123#.&quot; (Your data trains Ujima&apos;s AI only — not foreign models. You can delete anytime via *#123#.) Consent is granular: members choose which data categories (savings, transactions, location) to share.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Anonymize" label="A" accent="var(--fs-green)">
                    <p className="text-xs">All analytics use anonymized data. Guardian sees &apos;Applicant #4782, seasonal income, Kakamega&apos; — not names. k-anonymity (min cluster 5): any query result must include at least 5 similar records, making it impossible to identify an individual. For villages with fewer adult members than the cluster threshold, data is aggregated at sub-county level instead.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Sovereignty" label="S" accent="var(--fs-terracotta)">
                    <p className="text-xs">All data on servers in Kenya. Zero cross-border transfers. Data flow: Member USSD → FinSoko gateway (Nairobi) → Kenyan-hosted infrastructure. No data passes through EU, US, or any foreign servers. Compliance: Kenya Data Protection Act 2022, SASRA regulations, AU Convention on Cyber Security.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Intentional Retention" label="I" accent="var(--fs-earth)">
                    <p className="text-xs">Active loan data: retained for loan duration + 6 months. Denied applications: 12 months then permanent deletion. Members can request immediate deletion at any time via *#123#. Every data category has an explicit expiry date. No indefinite retention — if there&apos;s no purpose, there&apos;s no data.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Security" label="S" accent="var(--fs-gold)">
                    <p className="text-xs">End-to-end encryption on USSD/SMS channels using AES-256. USSD sessions are stateless — no data cached on telecom servers. SMS stored encrypted, decrypted only on member device. API keys rotate every 90 days. Penetration testing quarterly by a Kenyan-certified firm. Incident response: 24-hour notification to ODPC per DPA 2022 Section 43.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* PRIDE Loop */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-600">PRIDE Loop: Embedded Human Oversight</h3>
                <div className="grid gap-4 sm:grid-cols-5">
                  <FrameworkCard title="Pause Points" label="P" accent="var(--fs-terracotta)">
                    <p className="text-xs">Mandatory human review for: (1) Loans &gt;KES 50,000; (2) Applicants with children under 5 (food security risk); (3) Any denial in a sub-county with &gt;50% denial rate; (4) First-time borrowers over 55; (5) Applicants flagged by 2+ risk indicators but with &gt;90% chama repayment history.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Review Cadence" label="R" accent="var(--fs-amber)">
                    <p className="text-xs">Monthly for first 6 months, then quarterly. Examines denial rates, counterfactuals, Kill Switch activations, member feedback. Monthly bias dashboards reviewed by Elders Council. Weekly kill-switch reports (how many auto-flags triggered, how many reversed). Annual third-party audit by a CBK-licensed firm.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Interpretability" label="I" accent="var(--fs-green)">
                    <p className="text-xs">Explain denials like a village elder: &quot;Your income dips during school fee season — January and September. We need to see 3 months of buffer savings, about KES 6,000, to make sure you won&apos;t struggle. Start saving KES 500/week and reapply in March.&quot; No jargon. Always actionable.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Disagreement Rights" label="D" accent="var(--fs-earth)">
                    <p className="text-xs">USSD code *#123# to instantly request human review of any AI decision. Response SLA: 48 hours. Member can also visit any Ujima branch for in-person review. If the human reviewer overturns the AI decision, the case becomes a training example for the next model iteration.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Elders Council" label="E" accent="var(--fs-gold)">
                    <p className="text-xs">Governance council composition: 3 SACCO managers (including at least 1 woman), 2 women vendors (elected by the membership), 1 fintech regulator (SASRA-appointed). Meets quarterly. Has veto power over any model change. Reviews all kill-switch reports. Approves new occupation taxonomy entries.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* HORIZON Scan */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">HORIZON Scan: 10-Year Ecosystem Impact</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="h"><AccordionTrigger className="text-sm"><span className="text-orange-700 font-bold">H</span> — Historical Harm</AccordionTrigger><AccordionContent className="text-sm">Does this replicate colonial extraction of African financial data? Risk: Yes, if member data trains models owned by foreign companies without consent or benefit-sharing. Mitigation: OASIS sovereignty clause — all data on AWS Africa, no foreign model training, and members own their data per DPA 2022. The model serves Ujima, not the other way around.</AccordionContent></AccordionItem>
                  <AccordionItem value="o1"><AccordionTrigger className="text-sm"><span className="text-amber-600 font-bold">O</span> — Opportunity Cost</AccordionTrigger><AccordionContent className="text-sm">Will automation erode chama savings culture? Risk: If the AI makes loans too easy, members might bypass chama groups for individual loans, weakening collective financial safety nets. Mitigation: Scout Agent actively promotes chama participation. Loan terms include &quot;chama bonus&quot; — 0.5% interest reduction for applicants in active savings groups.</AccordionContent></AccordionItem>
                  <AccordionItem value="r"><AccordionTrigger className="text-sm"><span className="text-green-700 font-bold">R</span> — Ripple Effects</AccordionTrigger><AccordionContent className="text-sm">How might loan access reshape children&apos;s school attendance? Projection: 12,000+ traders gaining credit access means roughly 36,000 children (avg 3 per household) with more stable school fee payments. Over 10 years, that&apos;s a generation of children who stay in school through harvest lean seasons. This is the real ROI — not interest income, but human capital formation.</AccordionContent></AccordionItem>
                  <AccordionItem value="i"><AccordionTrigger className="text-sm"><span className="text-amber-800 font-bold">I</span> — Intergenerational</AccordionTrigger><AccordionContent className="text-sm">Will this build or drain generational wealth? It builds if: loan terms are fair, repayment schedules match real income, and members use credit for productive investment (inventory, land, education). It drains if: interest rates are predatory, loans fund consumption not production, or default destroys credit history. The ETHOS framework tilts toward building — but requires constant vigilance via PRIDE loops.</AccordionContent></AccordionItem>
                  <AccordionItem value="z"><AccordionTrigger className="text-sm"><span className="text-amber-500 font-bold">Z</span> — Zero-Sum</AccordionTrigger><AccordionContent className="text-sm">Who profits? Ujima SACCO profits from interest income and expanded membership. Who suffers? No one, if designed ethically. The key test: do member outcomes improve alongside SACCO profitability? If the SACCO&apos;s loan book grows but member default rates rise, that&apos;s extraction. If both grow — more loans, more repayments, more financial inclusion — that&apos;s shared prosperity.</AccordionContent></AccordionItem>
                  <AccordionItem value="o2"><AccordionTrigger className="text-sm"><span className="text-orange-700 font-bold">O</span> — Open Futures</AccordionTrigger><AccordionContent className="text-sm">Does this preserve human agency or create dependency? Preserve, because: members can opt out (*#700#), dispute (*#123#), and govern (Elders Council). Dependency risk: if the AI becomes the only way to get a loan, human officers lose relevance. Mitigation: PRIDE mandates that high-stakes decisions always require human involvement. The AI serves; it doesn&apos;t decide.</AccordionContent></AccordionItem>
                  <AccordionItem value="n"><AccordionTrigger className="text-sm"><span className="text-amber-600 font-bold">N</span> — Non-Human</AccordionTrigger><AccordionContent className="text-sm">What&apos;s the carbon cost of servers during drought? AWS Cape Town runs on a mix of renewable and grid power. During drought, hydropower drops and grid carbon intensity rises. Our servers run 24/7 — estimated 4.2 tonnes CO2/year. Mitigation: AWS has committed to 100% renewable by 2025 in South Africa. We also optimize: batch USSD processing during off-peak hours, use edge caching to reduce compute calls, and purchase carbon offsets through a Kenyan reforestation project in Kakamega Forest.</AccordionContent></AccordionItem>
                </Accordion>
              </div>

              {/* Ethical Mastery Check */}
              <div className="rounded-xl border-2 border-orange-700/30 bg-amber-100/30 p-5">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-800">Ethical Mastery Check</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Applied all 5 ETHOS guardrails to loan approval workflow</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Conducted full TRACK audit exposing 3+ bias vectors: training data imbalance (12% informal), occupation representation gap, gender amplification through proxy categories</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Designed OASIS-compliant data flow respecting Kenya DPA 2022 — all data on servers in Kenya, k-anonymity (min cluster 5), intentional retention with member deletion rights</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Specified PRIDE Loop with concrete Pause Points (loans &gt;KES 50K, children under 5, high-denial sub-counties) and Elders Council composition (3 managers, 2 women vendors, 1 regulator)</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Completed HORIZON Scan projecting impacts across 3+ generations: school attendance, chama culture, carbon cost, data sovereignty</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
