'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeInUp, SectionHeader } from './shared';

export default function BlueprintSection() {
  return (
    <section id="blueprint" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <SectionHeader title="Strategic AI Blueprint" subtitle="FinSoko Capstone — Four-Terrain Strategy" icon={FileText} color="bg-amber-600" badgeColor="bg-amber-600/10 text-amber-600" />
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="section1" className="w-full">
                <TabsList className="mb-6 w-full grid grid-cols-4">
                  <TabsTrigger value="section1" className="text-xs sm:text-sm">Diagnostic</TabsTrigger>
                  <TabsTrigger value="section2" className="text-xs sm:text-sm">Redesign</TabsTrigger>
                  <TabsTrigger value="section3" className="text-xs sm:text-sm">Impact</TabsTrigger>
                  <TabsTrigger value="section4" className="text-xs sm:text-sm">Reflection</TabsTrigger>
                </TabsList>

                {/* Section 1: Diagnostic Report */}
                <TabsContent value="section1" className="space-y-6">
                  <h3 className="text-lg font-bold">Section 1: Diagnostic Report</h3>
                  <p className="text-sm text-muted-foreground">Audit of FinSoko&apos;s current AI failures across four domains.</p>

                  <div className="space-y-4">
                    <div className="rounded-lg border-l-4 border-l-amber-600 bg-amber-600/5 p-4">
                      <p className="mb-1 text-sm font-bold">Prompting — AIM Framework Failure</p>
                      <p className="text-sm"><strong>Gap:</strong> FinSoko&apos;s loan screening prompt was &quot;Assess risk.&quot; This vague prompt produced outputs that treated all informal income as instability, resulting in 68% denial for market vendors vs. 22% for formal employees. <strong>Real-world harm:</strong> Grace, a 42-year-old maize farmer in Kakamega with 3 children and a 94% on-time repayment record, was denied a KES 28,000 school fees loan because her &quot;income variance&quot; triggered the risk threshold — even though that variance follows perfectly predictable harvest cycles.</p>
                    </div>

                    <div className="rounded-lg border-l-4 border-l-green-700 bg-green-700/5 p-4">
                      <p className="mb-1 text-sm font-bold">Fluency — 4D Framework Failure</p>
                      <p className="text-sm"><strong>Gap:</strong> FinSoko used a single-prompt, single-output workflow with no delegation, no description engineering, no discernment layer, and no diligence protocols. The AI both scored applicants and generated denial messages — no human in the loop for high-stakes decisions. <strong>Real-world harm:</strong> Amina, a shea butter trader in Busia, received an automated rejection stating she was &quot;unreliable due to inconsistent income.&quot; The message used shame-triggering language, offered no actionable next steps, and ignored that her income seasonality matches a well-documented dry-season trade pattern.</p>
                    </div>

                    <div className="rounded-lg border-l-4 border-l-orange-700 bg-orange-700/5 p-4">
                      <p className="mb-1 text-sm font-bold">Ethics — TRACK + OASIS Failure</p>
                      <p className="text-sm"><strong>Gap:</strong> Training data was 88% formal-sector banking records, with no representation audit. Occupation taxonomy had no entry for &quot;shea butter trader&quot; or other informal specializations. No consent mechanism existed for AI data usage. Data was processed through servers outside Africa. <strong>Real-world harm:</strong> The model amplified existing gender bias — women are 72% of &quot;market vendors&quot; (the high-denial category), meaning the AI systematically denies more women than men with identical financial profiles. This violates Kenya&apos;s Data Protection Act 2022 principles of fairness and the constitutional right to non-discrimination.</p>
                    </div>

                    <div className="rounded-lg border-l-4 border-l-amber-800 bg-amber-800/5 p-4">
                      <p className="mb-1 text-sm font-bold">Agents — RANK + TRAIL Failure</p>
                      <p className="text-sm"><strong>Gap:</strong> FinSoko ran a single AI agent that both screened and approved/denied loans with no authority limits, no memory architecture, no handoff protocols, and no kill switch. <strong>Real-world harm:</strong> A 29-year-old boda boda rider in Kisumu was auto-approved for KES 75,000 — far beyond his repayment capacity — because the agent had no authority ceiling. He defaulted within 4 months, destroying his credit record and forcing him to borrow from a loan shark to survive.</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Section 2: Redesigned AI System */}
                <TabsContent value="section2" className="space-y-6">
                  <h3 className="text-lg font-bold">Section 2: Redesigned AI System</h3>

                  <div className="space-y-6">
                    <div className="rounded-xl border border-amber-600/20 bg-amber-600/5 p-5">
                      <h4 className="mb-3 text-sm font-bold text-amber-600">Prompting: Rewritten Using AIM + MAP</h4>
                      <div className="space-y-2 text-sm font-mono">
                        <p><span className="text-amber-600 font-bold">(A) Actor:</span> Act as a seasonal-income lending analyst for Ujima SACCO. Your role: evaluate repayment capacity in the context of harvest liquidity, not apply one-size-fits-all risk thresholds.</p>
                        <p><span className="text-amber-600 font-bold">(I) Input:</span> Inspect the applicant&apos;s M-Pesa transaction history, harvest calendar for their district, and Ujima&apos;s 2025 data showing 68% denial rate for &quot;market vendor&quot; vs. 22% for &quot;formal employee,&quot; cross-referenced with 94% on-time repayment for approved vendors.</p>
                        <p><span className="text-amber-600 font-bold">(M) Mission:</span> Produce a repayment capacity assessment based on seasonal income peaks, not monthly averages. Score applicants against harvest-cycle earnings and propose repayment schedules aligned with their income timing.</p>
                        <hr className="border-border/30 my-2" />
                        <p><span className="text-green-700 font-bold">(M) Memory:</span> Matooke harvest cycles (Mar/Apr, Sept/Oct), maize peaks (Oct/Nov), shea butter trade surges (Dec-Feb).</p>
                        <p><span className="text-green-700 font-bold">(A) Assets:</span> M-Pesa transaction history showing income spikes during harvest, chama savings records as collective collateral.</p>
                        <p><span className="text-green-700 font-bold">(P) Prompt:</span> Generate 4 repayment schedules aligned with agricultural liquidity cycles, with payments due post-harvest only.</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-green-700/20 bg-green-700/5 p-5">
                      <h4 className="mb-3 text-sm font-bold text-green-700">Fluency: Redesigned Using 4D Framework</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Delegation:</strong> AI processes 80% of Tier-1 inquiries; humans approve loans &gt;KES 50K; collaborative for financial literacy content.</p>
                        <p><strong>Description:</strong> &quot;Generate a 3-sentence SMS in Sheng explaining loan eligibility. Reason step-by-step using matooke price data from Kenya Agricultural Observatory. Act as supportive auntie, not bank manager.&quot;</p>
                        <p><strong>Temperature:</strong> 0.1 for financial calculations, 0.7 for literacy content, 0.9 for brainstorming.</p>
                        <p><strong>RAG source:</strong> Kenya Agricultural Observatory API for live crop price data.</p>
                        <p><strong>Negative prompt:</strong> &quot;Never use the words unreliable, risky, or uncreditworthy. Never recommend specific loan products without Guardian screening. Never process data outside AWS Africa region.&quot;</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-orange-700/20 bg-orange-700/5 p-5">
                      <h4 className="mb-3 text-sm font-bold text-orange-700">Ethics: TRACK + OASIS Applied to Data Handling</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>TRACK:</strong> (T) Training data is 88% formal-sector — structurally biased. (R) Occupation taxonomy lacks &quot;shea butter trader&quot; — representation erasure. (A) Model amplifies gender bias through proxy categories. (C) Counterfactual test: identical cash flow, different outcomes by occupation label. (K) Kill switch: flag all Busia County denials for human review.</p>
                        <p><strong>OASIS:</strong> (O) Opt-in consent in Swahili and Luhya. (A) k-anonymity (min cluster 5): any query result must include at least 5 similar records. (S) All data on AWS Africa (Cape Town). (I) 180-day auto-delete for non-essential metadata. (S) AES-256 encryption on USSD/SMS.</p>
                        <p><strong>Regulation referenced:</strong> Kenya Data Protection Act, 2022 — Section 25 (right to explanation), Section 43 (breach notification), and the SACCO Societies Act cap on lending interest rates. Also aligned with AU Convention on Cyber Security and Personal Data Protection.</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-amber-800/20 bg-amber-800/5 p-5">
                      <h4 className="mb-3 text-sm font-bold text-amber-800">Agents: 3-Agent Pride Using RANK + TRAIL</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Guardian Agent → Hunter Agent handoff:</strong></p>
                        <p><strong>RANK:</strong> Guardian (R: Tier-1 screening; A: approve ≤KES 15K only; N: escalate if amount &gt;15K or 2+ children under 5; K: *#733# for human takeover). Hunter (R: coordinate officers; A: NEVER approve/deny; N: alert officer within 15 min; K: *#799# full pause).</p>
                        <p><strong>TRAIL:</strong> Guardian passes Transient (current application), Relational (transaction history), Archival (district baselines), and Inheritance (enriched risk flags) to Hunter. Hunter receives and adds officer availability calendar and specialty matching. Land Rights: all PII stays on AWS Africa, officer data anonymized after 90 days.</p>
                        <p><strong>Kill switch:</strong> Guardian has *#733# (instant human takeover of current decision). Hunter has *#799# (full system pause — no new applications processed until manually restarted). Both are accessible via USSD, SMS, and the web dashboard.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Section 3: Impact Projection */}
                <TabsContent value="section3" className="space-y-6">
                  <h3 className="text-lg font-bold">Section 3: HORIZON Scan — 5-Year Impact Projection</h3>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-green-700/20 bg-green-700/5 p-5">
                      <h4 className="mb-2 text-sm font-bold text-green-700">Direct Users: Informal Traders & SACCO Members</h4>
                      <p className="text-sm">12,000+ traders gain first-time credit access over 5 years. Female vendor approvals increase by 37%. Repayment schedules aligned to harvest cycles reduce default stress — members repay when they have cash, not when a calendar dictates. The dignity filter transforms denials from dead ends into action plans. Children in member households stay in school through lean seasons because school-fee bridge loans match harvest timing. By Year 5, member CSAT reaches 88%, and the average time from application to decision drops from 14 days to 48 hours.</p>
                    </div>

                    <div className="rounded-lg border border-amber-600/20 bg-amber-600/5 p-5">
                      <h4 className="mb-2 text-sm font-bold text-amber-600">Surrounding Communities: Rural Economies & Chama Networks</h4>
                      <p className="text-sm">Loan access for traders means more inventory, more trade, more market activity. A shea butter trader in Busia who can stock inventory during peak season employs 2-3 additional women as processing helpers. Multiply that across 12,000 borrowers and you get 24,000-36,000 indirect jobs. The chama bonus (0.5% interest reduction for group savers) actually strengthens collective financial traditions rather than eroding them. Community trust in formal financial institutions increases — reducing reliance on loan sharks who charge 20-30% monthly interest.</p>
                    </div>

                    <div className="rounded-lg border border-amber-800/20 bg-amber-800/5 p-5">
                      <h4 className="mb-2 text-sm font-bold text-amber-800">Non-Human Stakeholder: Kakamega Forest Carbon Sequestration</h4>
                      <p className="text-sm">Our AWS Cape Town servers generate approximately 4.2 tonnes CO₂ annually. We offset this through a reforestation partnership with Kakamega Forest — Kenya&apos;s last tropical rainforest, which sequesters approximately 15 tonnes CO₂/hectare/year. Our contribution funds 1 hectare of new planting per year. But the deeper environmental impact is indirect: when traders can access formal credit, they&apos;re less likely to resort to charcoal burning (a common fallback during lean seasons) — which drives deforestation across Western Kenya. By stabilizing informal trader income, we reduce pressure on forest reserves. This isn&apos;t greenwashing; it&apos;s the material connection between financial inclusion and environmental preservation.</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Section 4: Reflection */}
                <TabsContent value="section4" className="space-y-6">
                  <h3 className="text-lg font-bold">Section 4: Reflection</h3>
                  <div className="rounded-xl border border-orange-700/20 bg-amber-100/30 p-6">
                    <p className="text-sm leading-relaxed">
                      This course dismantled my assumption that AI in Africa is just AI elsewhere with translated interfaces. The shift happened during the TRACK audit — specifically the Representation question: &quot;Does your occupation taxonomy include &apos;shea butter trader&apos;?&quot; I realized the model literally could not see Amina. Not because she was a data point that got misclassified, but because the taxonomy was designed by people who never stood in Busia&apos;s market and watched women trade shea butter across the Uganda border. The model didn&apos;t fail Amina — the people who built the category system failed her.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed">
                      That changed how I think about every AI system I&apos;ll build. Bias isn&apos;t just a training data problem — it starts at the moment you decide what categories exist, what &quot;normal&quot; income looks like, what counts as &quot;stable.&quot; Those design decisions are moral decisions. The OCEAN framework taught me to verify every &quot;fact&quot; an AI gives me, but more importantly, to question the assumptions baked into the questions themselves. Why do we ask &quot;What&apos;s your monthly income?&quot; when half our members don&apos;t have monthly income? Why not ask &quot;When do you earn the most?&quot; — a question that actually fits their reality.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed">
                      Moving from Savannah to Agent terrain showed me that ethical AI isn&apos;t a constraint on innovation — it&apos;s the foundation. The PRIDE loop doesn&apos;t slow down the system; it makes the system trustworthy. And in communities where trust is everything, a trustworthy AI is the only kind worth building.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
