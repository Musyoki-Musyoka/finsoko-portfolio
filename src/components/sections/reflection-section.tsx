'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { fadeInUp, SectionHeader } from './shared';

export default function ReflectionSection() {
  return (
    <section id="reflection" className="bg-amber-100/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-orange-700/20 shadow-lg">
            <CardHeader>
              <SectionHeader title="Safari Reflection" subtitle="500 Words on the Journey" icon={Heart} color="bg-orange-700" badgeColor="bg-orange-700/10 text-orange-700" />
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
              <p className="text-sm">
                I started this safari thinking AI was a tool — plug in a prompt, get an output, ship the product. Savannah Precision taught me that a vague prompt isn&apos;t just inefficient; it&apos;s dangerous. &quot;Assess risk&quot; sounds reasonable until you realize it produced a 68% denial rate for market vendors who repay at 94%. The AIM framework forced me to be specific about who I was asking the AI to be, what exactly I wanted it to inspect, and what I expected it to produce. Vague prompts don&apos;t create vague outputs — they create harmful ones, because the AI fills the gaps with its training assumptions, and those assumptions are built on someone else&apos;s reality.
              </p>
              <p className="text-sm">
                Tsavo Fluency shifted my relationship from &quot;using AI&quot; to &quot;thinking with AI.&quot; The 4D framework — Delegation, Description, Discernment, Diligence — made me realize that fluency isn&apos;t about writing better prompts. It&apos;s about knowing what to delegate, how to specify what you need, when to evaluate what you got, and how to document the whole process. Setting temperature to 0.1 for financial calculations felt like an act of care — I was telling the AI, &quot;This is not the place for creativity. Get the numbers right.&quot; Setting it to 0.9 for literacy brainstorming said, &quot;Be imaginative here — our members need metaphors that resonate, not bank jargon.&quot;
              </p>
              <p className="text-sm">
                The Ethical Savannah terrain was the most uncomfortable. Running the TRACK audit on my own system felt like holding up a mirror to decisions I&apos;d been making without thinking. The most jarring moment was the Counterfactual test: when I ran Amina&apos;s profile with identical cash flow to a formal employee and saw different outcomes, I couldn&apos;t blame the algorithm anymore. I had designed the categories. I had chosen the training data. The bias wasn&apos;t a bug — it was a reflection of my own blind spots. OASIS and PRIDE didn&apos;t just add guardrails; they forced me to ask who benefits from every design decision and who gets left out.
              </p>
              <p className="text-sm">
                Agent Savannah brought it all together. Designing the Scout-Guardian-Hunter handoff taught me that the most powerful AI systems aren&apos;t one super-intelligent agent — they&apos;re coordinated teams with clear authority limits, shared memory protocols, and mandatory human checkpoints. The kill switch (*#733#, *#799#) isn&apos;t a failure mode; it&apos;s a design statement that says &quot;people always have the final word.&quot;
              </p>
              <p className="text-sm">
                What would I do differently? I&apos;d start with the HORIZON scan, not end with it. Before writing a single prompt, I&apos;d ask: who might this hurt in 10 years? What assumption am I making that I can&apos;t see? I would involve community members from day one — not as test subjects, but as co-designers whose lived experience of informal lending is more valuable than any dataset. The frameworks work backward from harm, and that&apos;s the real lesson — ethical AI isn&apos;t something you add at the end. It&apos;s the terrain you walk on from the very first step.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
