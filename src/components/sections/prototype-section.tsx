'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Zap,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Smartphone,
  Shield,
  Crosshair,
  User,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fadeInUp, SectionHeader } from './shared';

/* ──────────────────────────── Types ──────────────────────────── */

interface SimMessage {
  agent: 'scout' | 'guardian' | 'hunter' | 'system';
  text: string;
  loading?: boolean;
  timestamp?: string;
}

interface CustomProfile {
  name: string;
  age: number;
  occupation: string;
  location: string;
  children: number;
  income: string;
  savings: string;
  chama: string;
  repaymentHistory: string;
  loanAmount: string;
  purpose: string;
  smsText: string;
}

interface PipelineNode {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
  glowColor: string;
}

/* ──────────────────────────── Constants ──────────────────────────── */

const PIPELINE_NODES: PipelineNode[] = [
  { id: 'input', label: 'Input', icon: Smartphone, color: 'bg-gray-300 text-gray-600', activeColor: 'bg-amber-500 text-white', glowColor: 'shadow-amber-500/50' },
  { id: 'scout', label: 'Scout', icon: RefreshCw, color: 'bg-gray-300 text-gray-600', activeColor: 'bg-amber-500 text-white', glowColor: 'shadow-amber-500/50' },
  { id: 'guardian', label: 'Guardian', icon: Shield, color: 'bg-gray-300 text-gray-600', activeColor: 'bg-green-600 text-white', glowColor: 'shadow-green-600/50' },
  { id: 'hunter', label: 'Hunter', icon: Crosshair, color: 'bg-gray-300 text-gray-600', activeColor: 'bg-orange-600 text-white', glowColor: 'shadow-orange-600/50' },
  { id: 'human', label: 'Human', icon: User, color: 'bg-gray-300 text-gray-600', activeColor: 'bg-amber-800 text-white', glowColor: 'shadow-amber-800/50' },
];

const SCENARIO_DETAILS: Record<string, { name: string; description: string }> = {
  grace: { name: 'Grace — Maize Farmer, Kakamega', description: '42yo, 3 children, requesting KES 28,000 for school fees. Seasonal income with harvest peaks.' },
  amina: { name: 'Amina — Shea Butter Trader, Busia', description: '38yo, 4 children, requesting KES 15,000 for inventory. First-time applicant, no repayment history.' },
  james: { name: 'James — Boda Boda Rider, Kisumu', description: '29yo, requesting KES 55,000 (over auto-approval limit). Stable income, previous loan repaid.' },
};

const AGENT_CONFIG: Record<string, { color: string; bgColor: string; borderColor: string; icon: string; badge: string; badgeColor: string }> = {
  scout: {
    color: 'text-amber-600',
    bgColor: 'bg-amber-600',
    borderColor: 'border-l-amber-600 bg-amber-600/5',
    icon: '🟡',
    badge: 'TRAIL Memory',
    badgeColor: 'bg-amber-600/10 text-amber-700 border-amber-600/20',
  },
  guardian: {
    color: 'text-green-700',
    bgColor: 'bg-green-700',
    borderColor: 'border-l-green-700 bg-green-700/5',
    icon: '🟢',
    badge: 'RANK + PRIDE',
    badgeColor: 'bg-green-700/10 text-green-700 border-green-700/20',
  },
  hunter: {
    color: 'text-orange-700',
    bgColor: 'bg-orange-700',
    borderColor: 'border-l-orange-700 bg-orange-700/5',
    icon: '🔴',
    badge: 'HUNT Protocol',
    badgeColor: 'bg-orange-700/10 text-orange-700 border-orange-700/20',
  },
  system: {
    color: 'text-amber-800',
    bgColor: 'bg-amber-800',
    borderColor: 'border-l-amber-800 bg-amber-800/5',
    icon: '📋',
    badge: 'System',
    badgeColor: 'bg-amber-800/10 text-amber-800 border-amber-800/20',
  },
};

const INCOME_OPTIONS = [
  'Seasonal - harvest peaks',
  'Seasonal - dry season peaks',
  'Stable year-round',
];

const EMPTY_CUSTOM: CustomProfile = {
  name: '',
  age: 30,
  occupation: '',
  location: '',
  children: 0,
  income: 'Seasonal - harvest peaks',
  savings: '',
  chama: '',
  repaymentHistory: '',
  loanAmount: '',
  purpose: '',
  smsText: '',
};

/* ──────────────────────────── Pipeline Component ──────────────────────────── */

function WorkflowPipeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-4">
      {PIPELINE_NODES.map((node, idx) => {
        const isActive = activeStep === idx;
        const isComplete = activeStep > idx;
        const Icon = node.icon;

        return (
          <div key={node.id} className="flex items-center gap-1 sm:gap-2">
            <motion.div
              className={`
                flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5
                border transition-all duration-500 whitespace-nowrap
                ${isComplete ? node.activeColor + ' border-transparent shadow-md' : ''}
                ${isActive ? node.activeColor + ' border-transparent shadow-lg ' + node.glowColor + ' shadow-[0_0_20px]' : ''}
                ${!isComplete && !isActive ? node.color + ' border-gray-200' : ''}
              `}
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={isActive ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
            >
              {isActive && !isComplete ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isComplete ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <Icon className="size-4" />
              )}
              <span className="text-xs font-semibold sm:text-sm">{node.label}</span>
            </motion.div>
            {idx < PIPELINE_NODES.length - 1 && (
              <div className={`h-0.5 w-4 sm:w-8 rounded-full transition-colors duration-500 ${isComplete ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────── PRIDE Banner Component ──────────────────────────── */

function PrideBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-xl border-2 border-amber-500/50 bg-amber-50 p-4 shadow-md dark:bg-amber-950/30"
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
      <div>
        <p className="text-sm font-bold text-amber-800 dark:text-amber-400">
          PRIDE Pause Point Detected
        </p>
        <p className="mt-0.5 text-sm text-amber-700 dark:text-amber-300">
          Human oversight required at this stage. The system has paused for your review.
        </p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────── Agent Message Component ──────────────────────────── */

function AgentMessage({ msg, index }: { msg: SimMessage; index: number }) {
  const config = AGENT_CONFIG[msg.agent] ?? AGENT_CONFIG.system;

  if (msg.loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={`rounded-lg border-l-4 p-4 ${config.borderColor}`}
      >
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {config.icon} {msg.agent.charAt(0).toUpperCase() + msg.agent.slice(1)} Agent is analyzing...
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`rounded-lg border-l-4 p-4 ${config.borderColor}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <div className={`flex size-6 items-center justify-center rounded-full ${config.bgColor} text-white text-xs`}>
          {config.icon}
        </div>
        <span className={`text-sm font-bold ${config.color}`}>
          {msg.agent.charAt(0).toUpperCase() + msg.agent.slice(1)} Agent
        </span>
        {msg.timestamp && (
          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
        )}
        {msg.agent !== 'system' && (
          <Badge className={`border text-[10px] font-semibold ${config.badgeColor}`} variant="outline">
            {config.badge}
          </Badge>
        )}
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">{msg.text}</p>
    </motion.div>
  );
}

/* ──────────────────────────── Simulator ──────────────────────────── */

function AgentSimulator() {
  const [activeTab, setActiveTab] = useState<string>('preset');
  const [selectedScenario, setSelectedScenario] = useState<string>('grace');
  const [messages, setMessages] = useState<SimMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pipelineStep, setPipelineStep] = useState(-1);
  const [customForm, setCustomForm] = useState<CustomProfile>({ ...EMPTY_CUSTOM });
  const [prideDetected, setPrideDetected] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const getTimestamp = useCallback(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }, []);

  const updateCustomField = useCallback((field: keyof CustomProfile, value: string | number) => {
    setCustomForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const buildRequestBody = useCallback(() => {
    if (activeTab === 'preset') {
      return { scenarioId: selectedScenario };
    }
    return {
      scenarioId: 'custom',
      customProfile: {
        name: customForm.name || 'Applicant',
        age: customForm.age || 30,
        occupation: customForm.occupation || 'Unknown',
        location: customForm.location || 'Unknown',
        children: customForm.children || 0,
        income: customForm.income || 'Not specified',
        savings: customForm.savings || 'Not specified',
        chama: customForm.chama || 'None',
        repaymentHistory: 'Not specified',
        loanAmount: customForm.loanAmount || 'Not specified',
        purpose: customForm.purpose || 'Not specified',
        smsText: customForm.smsText || '',
      },
    };
  }, [activeTab, selectedScenario, customForm]);

  const runSimulation = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setError(null);
    setMessages([]);
    setPrideDetected(false);
    setPipelineStep(0);

    abortRef.current = new AbortController();

    try {
      const requestBody = buildRequestBody();

      // Show input step
      setPipelineStep(0);
      await new Promise((r) => setTimeout(r, 400));

      setPipelineStep(1); // Scout active

      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();

      // Stream in the responses one by one with delays for UX
      for (let i = 0; i < data.responses.length; i++) {
        if (abortRef.current.signal.aborted) break;

        const agentName = data.responses[i]?.agent;
        const isLast = i === data.responses.length - 1;

        // Update pipeline step based on agent
        if (agentName === 'system' && i === 0) {
          setPipelineStep(0); // Input
        } else if (agentName === 'scout') {
          setPipelineStep(1); // Scout
        } else if (agentName === 'guardian') {
          setPipelineStep(2); // Guardian
        } else if (agentName === 'hunter') {
          setPipelineStep(3); // Hunter
        } else if (agentName === 'system' && i > 0) {
          setPipelineStep(4); // Human
        }

        // Show "thinking" state for agent messages (not system)
        if (agentName && agentName !== 'system' && i > 0) {
          setMessages((prev) => [
            ...prev,
            { agent: agentName, text: '', loading: true, timestamp: getTimestamp() },
          ]);
          await new Promise((r) => setTimeout(r, 1200));
        }

        // Replace loading message or add new one
        setMessages((prev) => {
          const hasLoading = prev.some((m) => m.loading);
          const newMsg = { ...data.responses[i], loading: false, timestamp: getTimestamp() };
          if (hasLoading) {
            return prev.map((m) =>
              m.loading ? newMsg : m
            );
          }
          return [...prev, newMsg];
        });

        // Check for PRIDE pause points using programmatic metadata from backend
        if (data.metadata?.prideTriggers && data.metadata.prideTriggers.length > 0) {
          setPrideDetected(true);
        }

        // Small delay between messages
        if (!isLast) {
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Simulation failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, buildRequestBody, getTimestamp]);

  const cancelSimulation = useCallback(() => {
    abortRef.current?.abort();
    setIsRunning(false);
    setPipelineStep(-1);
  }, []);

  const resetForm = useCallback(() => {
    setCustomForm({ ...EMPTY_CUSTOM });
  }, []);

  const isCustomFormValid = customForm.smsText.trim() !== '' && customForm.name.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="preset" className="flex-1 sm:flex-none px-4">
            Preset Scenarios
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex-1 sm:flex-none px-4">
            Custom Input
          </TabsTrigger>
        </TabsList>

        {/* Preset Scenarios Tab */}
        <TabsContent value="preset" className="mt-4">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {Object.entries(SCENARIO_DETAILS).map(([id, details]) => (
                <Button
                  key={id}
                  variant={selectedScenario === id ? 'default' : 'outline'}
                  size="sm"
                  disabled={isRunning}
                  onClick={() => {
                    setSelectedScenario(id);
                    setMessages([]);
                    setError(null);
                    setPrideDetected(false);
                    setPipelineStep(-1);
                  }}
                  className={selectedScenario === id ? 'bg-amber-600 hover:bg-amber-600/90' : ''}
                >
                  {details.name}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {SCENARIO_DETAILS[selectedScenario]?.description}
            </p>
          </div>
        </TabsContent>

        {/* Custom Input Tab */}
        <TabsContent value="custom" className="mt-4">
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* SMS/USSD Message - full width */}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="smsText" className="text-sm font-medium">
                  SMS/USSD Message
                </Label>
                <Input
                  id="smsText"
                  placeholder="e.g., Hakuna pesa ya shule..."
                  value={customForm.smsText}
                  onChange={(e) => updateCustomField('smsText', e.target.value)}
                  disabled={isRunning}
                  className="w-full"
                />
              </div>

              {/* Applicant Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">
                  Applicant Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Grace"
                  value={customForm.name}
                  onChange={(e) => updateCustomField('name', e.target.value)}
                  disabled={isRunning}
                />
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  min={18}
                  max={100}
                  value={customForm.age}
                  onChange={(e) => updateCustomField('age', parseInt(e.target.value) || 0)}
                  disabled={isRunning}
                />
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <Label htmlFor="occupation" className="text-sm font-medium">
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  placeholder="e.g., Maize farmer"
                  value={customForm.occupation}
                  onChange={(e) => updateCustomField('occupation', e.target.value)}
                  disabled={isRunning}
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Kakamega"
                  value={customForm.location}
                  onChange={(e) => updateCustomField('location', e.target.value)}
                  disabled={isRunning}
                />
              </div>

              {/* Children */}
              <div className="space-y-1.5">
                <Label htmlFor="children" className="text-sm font-medium">
                  Children
                </Label>
                <Input
                  id="children"
                  type="number"
                  min={0}
                  max={20}
                  value={customForm.children}
                  onChange={(e) => updateCustomField('children', parseInt(e.target.value) || 0)}
                  disabled={isRunning}
                />
              </div>

              {/* Loan Amount */}
              <div className="space-y-1.5">
                <Label htmlFor="loanAmount" className="text-sm font-medium">
                  Loan Amount
                </Label>
                <Input
                  id="loanAmount"
                  placeholder="e.g., KES 28,000"
                  value={customForm.loanAmount}
                  onChange={(e) => updateCustomField('loanAmount', e.target.value)}
                  disabled={isRunning}
                />
              </div>

              {/* Purpose */}
              <div className="space-y-1.5">
                <Label htmlFor="purpose" className="text-sm font-medium">
                  Purpose
                </Label>
                <Input
                  id="purpose"
                  placeholder="e.g., School fees"
                  value={customForm.purpose}
                  onChange={(e) => updateCustomField('purpose', e.target.value)}
                  disabled={isRunning}
                />
              </div>

              {/* Income Pattern */}
              <div className="space-y-1.5">
                <Label htmlFor="income" className="text-sm font-medium">
                  Income Pattern
                </Label>
                <Select
                  value={customForm.income}
                  onValueChange={(val) => updateCustomField('income', val)}
                  disabled={isRunning}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select income pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCOME_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Savings */}
              <div className="space-y-1.5">
                <Label htmlFor="savings" className="text-sm font-medium">
                  Savings
                </Label>
                <Input
                  id="savings"
                  placeholder="e.g., KES 4,200"
                  value={customForm.savings}
                  onChange={(e) => updateCustomField('savings', e.target.value)}
                  disabled={isRunning}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetForm}
                disabled={isRunning}
              >
                Reset Form
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Run Simulation Button */}
      <div className="flex gap-3">
        <Button
          onClick={runSimulation}
          disabled={isRunning || (activeTab === 'custom' && !isCustomFormValid)}
          className="bg-green-700 hover:bg-green-700/90"
        >
          {isRunning ? (
            <>
              <RefreshCw className="mr-2 size-4 animate-spin" /> Agents thinking...
            </>
          ) : (
            <>
              <Zap className="mr-2 size-4" /> Run Live Simulation
            </>
          )}
        </Button>
        {isRunning && (
          <Button variant="outline" onClick={cancelSimulation}>
            Cancel
          </Button>
        )}
      </div>

      {/* Workflow Pipeline */}
      <AnimatePresence>
        {(pipelineStep >= 0 || messages.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-3 sm:p-4">
                <WorkflowPipeline activeStep={pipelineStep} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:bg-red-950/30"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800 dark:text-red-400">Simulation Error</p>
            <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
          </div>
        </motion.div>
      )}

      {/* PRIDE Pause Point Banner */}
      <AnimatePresence>
        {prideDetected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PrideBanner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message log */}
      <div className="max-h-[32rem] space-y-3 overflow-y-auto rounded-lg border border-border/50 bg-muted/20 p-4 scrollbar-thin">
        {messages.length === 0 && !isRunning && (
          <div className="text-center py-6">
            <p className="text-sm italic text-muted-foreground">
              Click &quot;Run Live Simulation&quot; to watch the Scout → Guardian → Hunter handoff with real AI agents
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
3-Agent CrewAI Pipeline · RANK-constrained · PRIDE Loop enabled
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <AgentMessage key={i} msg={msg} index={i} />
        ))}
        {isRunning && messages.length === 0 && (
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground py-6">
            <div className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              <span>Running 3-agent pipeline (Scout → Guardian → Hunter)...</span>
            </div>
            <span className="text-xs">CrewAI agent pipeline — this takes ~10-20 seconds</span>
          </div>
        )}
      </div>

      {/* Live badge */}
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
        </span>
        <span className="text-xs font-medium text-green-700">Live AI Agents</span>
        <span className="text-xs text-muted-foreground">· CrewAI Orchestration · RANK-constrained · TRAIL memory · HUNT handoff · GUARD rails · PRIDE oversight</span>
      </div>
    </div>
  );
}

/* ──────────────────────────── Section ──────────────────────────── */

export default function PrototypeSection() {
  return (
    <section id="prototype" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div {...fadeInUp}>
          <Card className="border-amber-500/20 shadow-lg">
            <CardHeader>
              <SectionHeader title="Live Prototype" subtitle="3-Agent Ecosystem — Real AI Demo" icon={Bot} color="bg-amber-500" badgeColor="bg-amber-500/10 text-amber-500" />
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-sm text-muted-foreground">
                Select a scenario or create your own and watch the <strong>Scout → Guardian → Hunter</strong> handoff with <strong>real AI agents</strong> using CrewAI orchestration. Each agent operates under RANK-calibrated authority, TRAIL memory architecture, HUNT triggers, and GUARD safety rails — with PRIDE Loop human oversight built in.
              </p>
              <AgentSimulator />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
