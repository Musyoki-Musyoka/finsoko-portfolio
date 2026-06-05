'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { fadeInUp, SectionHeader, impactChartData, sovereigntyData } from './shared';

export default function ImpactSection() {
  return (
    <section id="impact" className="bg-amber-100/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-border/50 shadow-md">
            <CardHeader>
              <SectionHeader title="Impact Assessment" subtitle="Projected Outcomes" icon={BarChart3} color="bg-green-700" badgeColor="bg-green-700/10 text-green-700" />
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Key Metrics */}
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-amber-600/20 bg-amber-600/5 p-5 text-center">
                  <p className="text-3xl font-extrabold text-amber-600">37%</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">Increase in female vendor loan approvals</p>
                </div>
                <div className="rounded-xl border border-green-700/20 bg-green-700/5 p-5 text-center">
                  <p className="text-3xl font-extrabold text-green-700">18hrs</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">Saved per loan officer per week</p>
                </div>
                <div className="rounded-xl border border-orange-700/20 bg-orange-700/5 p-5 text-center">
                  <p className="text-3xl font-extrabold text-orange-700">64%</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">Reduction in bias incidents</p>
                </div>
                <div className="rounded-xl border border-amber-800/20 bg-amber-800/5 p-5 text-center">
                  <p className="text-3xl font-extrabold text-amber-800">89%</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">Data under African governance</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-bold">Loan Approvals for Informal Traders (5-Year)</h4>
                  <div className="h-56 rounded-lg border border-border/30 bg-muted/10 p-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={impactChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="vendors" stroke="#D97706" strokeWidth={2} name="Informal Traders Approved" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold">Default Rate & Bias Reduction</h4>
                  <div className="h-56 rounded-lg border border-border/30 bg-muted/10 p-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={impactChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="defaultRate" stroke="#C2410C" strokeWidth={2} name="Default Rate %" />
                        <Line type="monotone" dataKey="biasReduction" stroke="#15803D" strokeWidth={2} name="Bias Reduction %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Data Sovereignty */}
              <div>
                <h4 className="mb-2 text-sm font-bold">Data Sovereignty Distribution</h4>
                <div className="h-56 rounded-lg border border-border/30 bg-muted/10 p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sovereigntyData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                        {sovereigntyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Table */}
              <div>
                <h4 className="mb-2 text-sm font-bold">5-Year Detailed Projections</h4>
                <div className="overflow-x-auto rounded-lg border border-border/30">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">Metric</th>
                        <th className="px-4 py-2 text-right font-semibold">Year 1</th>
                        <th className="px-4 py-2 text-right font-semibold">Year 3</th>
                        <th className="px-4 py-2 text-right font-semibold">Year 5</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr><td className="px-4 py-2">Informal trader approvals</td><td className="px-4 py-2 text-right">2,400</td><td className="px-4 py-2 text-right">7,800</td><td className="px-4 py-2 text-right font-bold">12,400</td></tr>
                      <tr><td className="px-4 py-2">Default rate</td><td className="px-4 py-2 text-right">2.8%</td><td className="px-4 py-2 text-right">2.5%</td><td className="px-4 py-2 text-right font-bold">2.3%</td></tr>
                      <tr><td className="px-4 py-2">Bias incidents</td><td className="px-4 py-2 text-right">42</td><td className="px-4 py-2 text-right">18</td><td className="px-4 py-2 text-right font-bold">8</td></tr>
                      <tr><td className="px-4 py-2">Officer time savings (hrs/week)</td><td className="px-4 py-2 text-right">8</td><td className="px-4 py-2 text-right">14</td><td className="px-4 py-2 text-right font-bold">18</td></tr>
                      <tr><td className="px-4 py-2">Data under African governance</td><td className="px-4 py-2 text-right">85%</td><td className="px-4 py-2 text-right">88%</td><td className="px-4 py-2 text-right font-bold">89%</td></tr>
                      <tr><td className="px-4 py-2">Member CSAT score</td><td className="px-4 py-2 text-right">72%</td><td className="px-4 py-2 text-right">81%</td><td className="px-4 py-2 text-right font-bold">88%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
