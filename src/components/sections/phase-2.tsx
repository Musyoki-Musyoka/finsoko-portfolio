'use client';

import { motion } from 'framer-motion';
import { TreePine, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, SectionHeader, FrameworkCard } from './shared';

export default function Phase2Section() {
  return (
    <section id="phase-2" className="bg-amber-100/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <SectionHeader phaseNumber={2} title="Tsavo Fluency" subtitle="4D Fluency Blueprint" icon={TreePine} color="bg-green-700" badgeColor="bg-green-700/10 text-green-700" />
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Delegation */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">1. Delegation: Mapping Human/AI/Collaborative Tasks</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <FrameworkCard title="Human Domain" label="Human" accent="var(--fs-terracotta)">
                    <ul className="ml-4 list-disc space-y-1.5 text-sm">
                      <li>Final loan approval for amounts &gt;KES 50,000</li>
                      <li>Cultural nuance: Dagbamba naming conventions affect identity verification — names like &quot;Abdul-Rahman&quot; and &quot;Abdulai&quot; may refer to the same person</li>
                      <li>Mediating disputes between members and the SACCO committee</li>
                      <li>Approving exceptions for members with non-standard income documentation</li>
                    </ul>
                  </FrameworkCard>
                  <FrameworkCard title="AI Domain" label="AI" accent="var(--fs-green)">
                    <ul className="ml-4 list-disc space-y-1.5 text-sm">
                      <li>Process 80% of Tier-1 inquiries (balance checks, statement requests, due date reminders)</li>
                      <li>Analyze transaction patterns for harvest-cycle alignment scoring</li>
                      <li>Generate personalized savings tips based on spending patterns</li>
                      <li>Auto-draft repayment schedule proposals using MAP memory</li>
                    </ul>
                  </FrameworkCard>
                  <FrameworkCard title="Collaborative Domain" label="Collaborative" accent="var(--fs-amber)">
                    <ul className="ml-4 list-disc space-y-1.5 text-sm">
                      <li>Co-author financial literacy content: human provides local metaphors (&quot;Save like a squirrel stores nuts for dry season&quot;), AI structures the curriculum and tracks completion</li>
                      <li>Co-design repayment schedules: AI generates options based on cash flow data, human officer adjusts for member circumstances (funeral costs, school fee timing)</li>
                      <li>Co-review flagged applications: AI surfaces risk signals, human provides cultural and relational context</li>
                    </ul>
                  </FrameworkCard>
                </div>
              </div>

              {/* Interaction Modalities */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">1b. Interaction Modalities: Calibrating the Human-AI Relationship</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-amber-600/20 bg-amber-600/5 p-4">
                    <p className="mb-1 text-sm font-bold text-amber-600">Automation (Auto-Pilot)</p>
                    <p className="text-sm">AI executes specific, repetitive tasks under direct supervision: balance checks, statement requests, due date reminders. The human defines the task; the AI runs it. No judgment calls.</p>
                  </div>
                  <div className="rounded-lg border border-green-700/20 bg-green-700/5 p-4">
                    <p className="mb-1 text-sm font-bold text-green-700">Augmentation (Co-Pilot)</p>
                    <p className="text-sm">Human and AI collaborate in back-and-forth dialogue: co-authoring financial literacy content, co-designing repayment schedules, co-reviewing flagged applications. The human provides cultural context; the AI provides data processing.</p>
                  </div>
                  <div className="rounded-lg border border-amber-800/20 bg-amber-800/5 p-4">
                    <p className="mb-1 text-sm font-bold text-amber-800">Agency (Autonomous Ranger)</p>
                    <p className="text-sm">AI works independently with configured knowledge and behavior boundaries: the SMS Savings Coach sends harvest-cycle tips, monitors savings patterns, and alerts the Guardian Agent when it detects financial stress signals. No direct human supervision per interaction — but human oversight at the system level.</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">2. Description: Engineering Precision Prompts</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <FrameworkCard title="Product" label="Product" accent="var(--fs-amber)">
                    <p className="font-mono text-xs">&quot;Generate a 3-sentence SMS in Sheng explaining loan eligibility. Target: market vendors in Nairobi&apos;s Gikomba market. Tone: direct, no jargon. Include: minimum savings balance, repayment options, and a USSD code to apply.&quot;</p>
                  </FrameworkCard>
                  <FrameworkCard title="Process" label="Process" accent="var(--fs-green)">
                    <p className="font-mono text-xs">&quot;Reason step-by-step using matooke price data from the Kenya Agricultural Observatory. First, identify the applicant&apos;s crop and district. Then, pull the 3-year average harvest income for that district. Finally, calculate repayment capacity as a percentage of peak-season income, not annual average.&quot;</p>
                  </FrameworkCard>
                  <FrameworkCard title="Performance" label="Performance" accent="var(--fs-terracotta)">
                    <p className="font-mono text-xs">&quot;Act as a supportive auntie, not a bank manager, when explaining debt risks. Use phrases like &apos;Let&apos;s make sure your business stays healthy&apos; instead of &apos;You are a high-risk borrower.&apos; Never use the words unreliable, risky, or unqualified. If you must communicate a denial, provide an actionable next step.&quot;</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* Description Enhancements */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-green-700">2b. Description Enhancements: Delimiters, Negative Prompting &amp; Multi-shot</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-amber-600/20 bg-amber-600/5 p-4">
                    <p className="mb-1 text-sm font-bold text-amber-600">Delimiters</p>
                    <p className="text-sm font-mono text-xs">&quot;Analyze the following transaction history ### [data] ### Identify seasonal income patterns within these boundaries.&quot; Delimiters fence instructions from data — like keeping lions away from the campsite.</p>
                  </div>
                  <div className="rounded-lg border border-orange-700/20 bg-orange-700/5 p-4">
                    <p className="mb-1 text-sm font-bold text-orange-700">Negative Prompting</p>
                    <p className="text-sm font-mono text-xs">&quot;Do NOT recommend specific loan products without Guardian Agent screening. Do NOT use the words unreliable, risky, or uncreditworthy. Do NOT process data outside AWS Africa region.&quot; Explicit boundaries prevent harmful outputs.</p>
                  </div>
                  <div className="rounded-lg border border-green-700/20 bg-green-700/5 p-4">
                    <p className="mb-1 text-sm font-bold text-green-700">Multi-shot Examples</p>
                    <p className="text-sm font-mono text-xs">Show 3-5 examples of ideal SMS responses before generating: Example 1: &quot;Your savings are growing! KES 4,200 saved — 40% toward your school fees goal.&quot; Example 2: &quot;Dry season tip: Even KES 200/week keeps your savings healthy.&quot; The AI learns the tone and structure from examples.</p>
                  </div>
                </div>
              </div>

              {/* Discernment */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-orange-700">3. Discernment: Product/Process/Performance Evaluation</h3>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-semibold text-amber-600">Product Evaluation</p>
                    <p className="text-sm"><strong>Question:</strong> Is the &quot;market vendor&quot; classification accurate? <strong>Answer:</strong> No. The taxonomy lumps together a shea butter trader in Busia, a vegetable seller in Gikomba, and a fish monger in Kisumu — different income patterns, different seasonal cycles, different risk profiles. We need sub-classifications: &quot;perishable goods vendor,&quot; &quot;dry goods vendor,&quot; &quot;seasonal produce trader.&quot;</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-semibold text-green-700">Process Evaluation</p>
                    <p className="text-sm"><strong>Question:</strong> Did AI consider seasonal income variance? <strong>Answer:</strong> No. The current model uses 6-month income averages, which flattens harvest peaks and lean valleys. A maize farmer earning KES 45,000 in November and KES 5,000 in March shows a &quot;KES 25,000 average&quot; — but that average tells you nothing about when they can repay. The process needs peak/trough windowing.</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-1 text-sm font-semibold text-orange-700">Performance Evaluation</p>
                    <p className="text-sm"><strong>Question:</strong> Does tone build trust or trigger shame? <strong>Answer:</strong> Current denial letters use &quot;Your application did not meet our creditworthiness criteria&quot; — this triggers shame and discourages reapplication. Rewritten: &quot;Your savings are growing well! To qualify for this loan amount, we need 3 more months of your current savings pattern. Keep it up — you&apos;re on track!&quot; The difference: one closes the door, the other builds the path.</p>
                  </div>
                </div>
              </div>

              {/* Diligence */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-amber-800">4. Diligence: Creation/Transparency/Deployment Protocols</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <FrameworkCard title="Creation" label="Creation" accent="var(--fs-amber)">
                    <p>Acknowledge bias risk in training data: the model was trained primarily on urban, formal-sector lending data from East African banks. This means the model understands &quot;salaried teacher&quot; but not &quot;matooke trader who earns 4x in harvest season.&quot; Bias mitigation: re-weight training with Ujima&apos;s actual repayment records and incorporate agricultural income modeling.</p>
                  </FrameworkCard>
                  <FrameworkCard title="Transparency" label="Transparency" accent="var(--fs-green)">
                    <p>Draft member consent script in Swahili and Luhya:</p>
                    <p className="mt-2 italic text-xs">&quot;Data yako ya miamala inatumika kufundisha AI ya Ujima tu, siyo model za Silicon Valley. Unaweza kufuta data yako wakati wowote kwa kupiga *#123#. Tunahifadhi data yako kwa Afrika Kusini chini ya sheria ya Kenya ya Data Protection 2022.&quot;</p>
                    <p className="mt-1 text-xs">(Your transaction data trains only Ujima&apos;s local AI, not Silicon Valley models. You can delete your data anytime by dialing *#123#. We store your data in South Africa under Kenya&apos;s Data Protection Act 2022.)</p>
                  </FrameworkCard>
                  <FrameworkCard title="Deployment" label="Deployment" accent="var(--fs-terracotta)">
                    <p>Fact-check all interest rate calculations against SASRA regulations: max interest rate for SACCO loans is capped per the SACCO Societies Act. Verify that AI-generated repayment schedules don&apos;t exceed the regulatory ceiling. Run a pre-deployment audit comparing 50 AI-generated quotes against manual officer calculations — tolerance threshold: 0.1% deviation.</p>
                  </FrameworkCard>
                </div>
              </div>

              {/* Temperature + RAG */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-green-700/20 bg-green-700/5 p-5">
                  <h4 className="mb-2 text-sm font-bold text-green-700">Temperature Calibration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Financial calculations / rate quotes</span><Badge className="bg-green-700/10 text-green-700 border-0 text-xs">0.1</Badge></div>
                    <div className="flex justify-between"><span>Loan eligibility explanations</span><Badge className="bg-amber-600/10 text-amber-600 border-0 text-xs">0.3</Badge></div>
                    <div className="flex justify-between"><span>Financial literacy content</span><Badge className="bg-orange-700/10 text-orange-700 border-0 text-xs">0.7</Badge></div>
                    <div className="flex justify-between"><span>Literacy content brainstorming</span><Badge className="bg-amber-800/10 text-amber-800 border-0 text-xs">0.9</Badge></div>
                  </div>
                </div>
                <div className="rounded-xl border border-amber-600/20 bg-amber-600/5 p-5">
                  <h4 className="mb-2 text-sm font-bold text-amber-600">RAG Implementation</h4>
                  <p className="text-sm">Connected to Kenya Agricultural Observatory API for live matooke and maize price data. This prevents the AI from hallucinating harvest incomes — every income projection is grounded in actual market prices from the current season. Also connected to CBK exchange rate feeds for USD/KES conversions on cross-border trade loans in Busia.</p>
                </div>
              </div>

              {/* Autonomous Ranger */}
              <div className="rounded-xl border-2 border-green-700/30 bg-green-700/5 p-5">
                <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-green-700">Autonomous Ranger: SMS Savings Coach</h4>
                <p className="mb-2 text-sm"><strong>Knowledge:</strong> Harvest calendars, member savings patterns, SASRA-compliant savings tips</p>
                <p className="mb-2 text-sm"><strong>Behavior:</strong> Sends max 3 SMS/week. Proactive during lean seasons: &quot;Dry season is coming — even KES 200/week keeps your savings growing.&quot; Reactive to deposits: &quot;Great deposit! You&apos;re 40% closer to your school fees goal.&quot; Never recommends specific loan products — that requires Guardian Agent screening.</p>
                <p className="text-sm"><strong>Kill switch:</strong> *#700# to pause all messages instantly.</p>
              </div>

              {/* Tsavo Mastery Check */}
              <div className="rounded-xl border-2 border-green-700/30 bg-amber-100/30 p-5">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-800">Tsavo Mastery Check</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Demonstrated all 4 D&apos;s with concrete examples: Delegation (human/AI/collab split), Description (3 engineered prompts), Discernment (3 evaluated outputs), Diligence (3 deployment protocols)</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Configured SMS Savings Coach as Autonomous Ranger with defined knowledge boundaries and kill switch</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>Temperature settings calibrated: 0.1 for financial math, 0.9 for literacy brainstorming</span></li>
                  <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-700" /><span>RAG connected to Kenya Agricultural Observatory for live harvest data — no more hallucinated incomes</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
