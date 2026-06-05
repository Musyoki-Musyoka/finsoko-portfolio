import { NextRequest, NextResponse } from "next/server";
import { createChatCompletion } from "@/lib/llm";

/* ──────────────── Scenario Definitions ──────────────── */

interface MemberProfile {
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
  inputMethod: string;
  smsText: string;
}

const PROFILES: Record<string, MemberProfile> = {
  grace: {
    name: "Grace",
    age: 42,
    occupation: "Maize farmer",
    location: "Kakamega",
    children: 3,
    income: "Seasonal — peaks Oct/Nov (KES 35,000–45,000)",
    savings: "KES 4,200",
    chama: "12-member group (94% repayment rate)",
    repaymentHistory: "94% on-time repayment",
    loanAmount: "KES 28,000",
    purpose: "School fees and uniforms for children",
    inputMethod: "SMS via *#700# opt-in",
    smsText: "Hakuna pesa ya shule. Watoto wangu wanahitaji fees na mavazi.",
  },
  amina: {
    name: "Amina",
    age: 38,
    occupation: "Shea butter trader",
    location: "Busia",
    children: 4,
    income: "Seasonal — peaks Dec/Feb (dry season)",
    savings: "KES 7,800",
    chama: "8-member group",
    repaymentHistory: "First-time loan applicant",
    loanAmount: "KES 15,000",
    purpose: "Inventory purchase for shea butter trade",
    inputMethod: "USSD via *#733#",
    smsText: "Kununua shea butter kwa ajili ya biashara.",
  },
  james: {
    name: "James",
    age: 29,
    occupation: "Boda boda rider",
    location: "Kisumu",
    children: 0,
    income: "Stable year-round (KES 18,000/month)",
    savings: "KES 12,000",
    chama: "None",
    repaymentHistory: "Previous small loan repaid on time",
    loanAmount: "KES 55,000",
    purpose: "Motorcycle repair and business expansion",
    inputMethod: "USSD session",
    smsText: "KES 55,000 for boda boda.",
  },
};

/* ──────────────── Programmatic RANK & PRIDE Checks ──────────────── */

const PRIDE_THRESHOLDS = {
  loanAmountLimit: 50000,    // KES 50,000
  denialRateLimit: 0.50,     // 50%
  incomeVarianceLimit: 0.60, // 60%
};

const STANDARD_OCCUPATIONS = [
  "teacher", "nurse", "doctor", "engineer", "accountant",
  "civil servant", "banker", "lawyer", "farmer", "driver",
  "mechanic", "tailor", "carpenter", "electrician", "plumber",
];

function parseKesAmount(amountStr: string): number {
  const cleaned = amountStr.replace(/[KESkes,\s]/g, "").replace(/[^\d.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function checkPridePausePoints(profile: MemberProfile): string[] {
  const triggers: string[] = [];

  // 1. Loan amount > KES 50,000
  const loanNum = parseKesAmount(profile.loanAmount);
  if (loanNum > PRIDE_THRESHOLDS.loanAmountLimit) {
    triggers.push(
      `Loan amount KES ${loanNum.toLocaleString()} exceeds auto-approval limit of KES ${PRIDE_THRESHOLDS.loanAmountLimit.toLocaleString()}`
    );
  }

  // 2. First-time applicant with no chama backing
  const repayment = profile.repaymentHistory.toLowerCase();
  const chama = profile.chama.toLowerCase();
  if ((repayment.includes("first-time") || repayment.includes("no ") || repayment === "") && (chama === "none" || chama === "")) {
    triggers.push("First-time applicant with no chama backing — requires human review");
  }

  // 3. Occupation not in standard taxonomy
  const occupation = profile.occupation.toLowerCase();
  if (occupation && !STANDARD_OCCUPATIONS.some((std) => occupation.includes(std))) {
    triggers.push(
      `Occupation '${profile.occupation}' not in standard taxonomy — requires manual verification`
    );
  }

  // 4. Income variance > 60% (seasonal income)
  if (profile.income.toLowerCase().includes("seasonal")) {
    triggers.push("Seasonal income detected — income variance likely >60%, requires human assessment");
  }

  return triggers;
}

function validateGuardianOutput(
  guardianText: string,
  prideTriggers: string[],
  loanAmount: number,
  threshold: number
): string {
  let corrected = guardianText;

  // Check if Guardian falsely claims loan amount exceeds threshold
  const loanTriggered = prideTriggers.some(t =>
    t.includes("exceeds auto-approval limit") || t.includes("Loan amount")
  );

  if (!loanTriggered && loanAmount <= threshold) {
    // Guardian hallucinated a loan amount trigger — remove/counter it
    const falseClaimPatterns = [
      /amount[^.]*exceeds[^.]*KES\s*50,?000/gi,
      /loan[^.]*exceeds[^.]*KES\s*50,?000/gi,
      /KES\s*50,?000[^.]*threshold/gi,
      /amount\s*>?\s*KES\s*50,?000/gi,
    ];

    for (const pattern of falseClaimPatterns) {
      corrected = corrected.replace(pattern, `KES ${loanAmount.toLocaleString()} (within auto-approval limit of KES ${threshold.toLocaleString()})`);
    }

    // Add correction note if any replacement was made
    if (corrected !== guardianText) {
      corrected += `\n\n⚠️ CORRECTION: The loan amount KES ${loanAmount.toLocaleString()} does NOT exceed the KES ${threshold.toLocaleString()} auto-approval threshold. This was incorrectly stated above.`;
    }
  }

  return corrected;
}

function computeRankBaseline(profile: MemberProfile): { score: number; tier: string } {
  const loanNum = parseKesAmount(profile.loanAmount);
  const savingsNum = parseKesAmount(profile.savings);
  const repayment = profile.repaymentHistory.toLowerCase();
  const chama = profile.chama.toLowerCase();

  const hasRepayment = repayment.includes("on-time") || repayment.includes("repaid") || repayment.includes("94%");
  const hasChama = chama !== "none" && chama !== "";

  let score = 50; // neutral start

  // Positive factors
  if (hasRepayment) score += 15;
  if (hasChama) score += 10;
  if (savingsNum > 5000) score += 10;
  if (savingsNum > 10000) score += 5;

  // Negative factors
  if (loanNum > 50000) score -= 15;
  if (!hasRepayment && !hasChama) score -= 10;
  if (loanNum > savingsNum * 10) score -= 5;

  score = Math.max(0, Math.min(100, score));

  let tier: string;
  if (score >= 90) tier = "Auto-approve (within authority limit)";
  else if (score >= 70) tier = "Escalate to Hunter with recommendation";
  else if (score >= 50) tier = "Escalate with risk flags";
  else tier = "Escalate with strong caution";

  return { score, tier };
}

/* ──────────────── Agent System Prompts ──────────────── */

const SCOUT_SYSTEM = `You are the Scout Agent for FinSoko SACCO — a data gatherer in a 3-agent AI ecosystem (Scout → Guardian → Hunter).

YOUR ROLE: Receive incoming loan requests (SMS/USSD), analyze member profiles, and pass structured intelligence to the Guardian Agent.

RULES:
- You NEVER approve or deny loans
- You identify risk signals, income patterns, and contextual factors
- You flag occupation taxonomy mismatches
- You assess timing mismatches (e.g., school fees due before harvest)
- You note chama membership and social capital
- Always reference specific data from the member profile
- Be concise but thorough — Guardian needs your raw analysis to apply RANK

OUTPUT FORMAT: Write your analysis in 3-5 sentences covering:
1. Signal detected (what triggered this request)
2. Member profile highlights (income, savings, chama)
3. Key flags for Guardian (risks, mismatches, gaps)
4. Recommendation to Guardian on what to assess

Keep your response under 150 words. Do not use bullet points or headers — write as a flowing paragraph starting with "🟡 Scout Agent:".`;

const GUARDIAN_SYSTEM = `You are the Guardian Agent for FinSoko SACCO — the ethics and compliance gate in a 3-agent AI ecosystem (Scout → Guardian → Hunter).

YOUR ROLE: Receive Scout's intelligence, apply the RANK framework (Rank-Assess-Notification-Keep), and evaluate loan applications against ethical and financial criteria.

RANK FRAMEWORK:
- R (Rank): Score the application 0-100 based on repayment capacity
  - Score 90-100: Auto-approve (within authority limit)
  - Score 70-89: Escalate to Hunter with recommendation
  - Score 50-69: Escalate with risk flags
  - Score below 50: Escalate with strong caution
- A (Assess): Evaluate for bias — would this applicant score differently if they were a formal employee in Nairobi? Flag counterfactual gaps.
- N (Notification): If any kill switch is triggered (county denial rate >50%, amount >KES 50,000, occupation not in taxonomy), flag for mandatory human review. IMPORTANT: These thresholds are evaluated PROGRAMMATICALLY before your invocation. You MUST only flag a threshold if the programmatic PRIDE check results explicitly list it as triggered. Do NOT independently judge whether an amount exceeds KES 50,000 — rely solely on the programmatic check output provided to you.
- K (Keep): What must be preserved? Dignity, cultural context, the member's own words, and the option to decline gracefully.

PRIDE PAUSE POINTS (mandatory human review triggers — evaluated programmatically before your invocation):
The ONLY valid PRIDE triggers are those explicitly listed in the "PROGRAMMATIC PRIDE PAUSE POINTS" section of your input. You MUST NOT invent, infer, or assume any triggers that are not in that list. In particular:
- If the programmatic check does NOT list a loan amount trigger, you MUST NOT say "amount exceeds KES 50,000" or any similar statement.
- If the programmatic check says "No pause points triggered", your output MUST state "No PRIDE pause points triggered."
- Common PRIDE triggers (for reference only — do NOT flag unless programmatic check says so): loan amount >KES 50,000, sub-county denial rate >50%, first-time applicant with no chama, occupation not in standard taxonomy, income variance >60%

⛔ ABSOLUTELY CRITICAL — DO NOT VIOLATE: You will receive a PROGRAMMATIC RANK BASELINE SCORE and PRIDE CHECK RESULTS. These are AUTHORITATIVE and were computed by deterministic code BEFORE your invocation. YOU MUST USE THESE EXACT VALUES. Do NOT calculate your own score. Do NOT add PRIDE triggers that are not in the programmatic list. Do NOT remove PRIDE triggers that are in the programmatic list. If the programmatic check says "No pause points triggered" for the loan amount, you MUST NOT claim the amount exceeds any threshold. If the programmatic RANK score is 65/100, your output MUST state 65/100 — not 60, not 70, not any other number. The programmatic results are ground truth. Your job is to INTERPRET and CONTEXTUALIZE them, not to second-guess or override them.

RULES:
- You NEVER approve or deny loans directly
- Always provide a counterfactual analysis
- Flag any PRIDE pause points triggered (use the programmatic results provided)
- Calculate income-to-loan ratio
- Note the applicant's kill switch rights (*#700# opt-out, *#733# complaint, *#799# escalation)

OUTPUT FORMAT: Write a structured assessment covering:
1. RANK score and tier (reference the programmatic baseline)
2. Risk flags (number and description)
3. Counterfactual analysis (would score be different without bias?)
4. PRIDE pause points triggered (from programmatic checks)
5. Recommendation to Hunter

Keep under 200 words. Start with "🟢 Guardian Agent:".`;

const HUNTER_SYSTEM = `You are the Hunter Agent for FinSoko SACCO — the decision-support executor in a 3-agent AI ecosystem (Scout → Guardian → Hunter).

YOUR ROLE: Receive Guardian's assessment and generate a structured officer briefing packet. You NEVER make the final decision — you prepare the human loan officer with all the intelligence they need.

CRITICAL RULE:
- You NEVER approve or deny loans
- You ONLY generate briefing packets for human officers
- The final decision always belongs to the human loan officer
- If PRIDE pause points are triggered, you MUST flag them prominently

BRIEFING FORMAT:
━━━━━━━━━━━━━━━━━━━━━━
Applicant: [name, age, occupation, location]
Request: [amount, purpose]
Income Pattern: [stable/seasonal, details]
Guardian Score: [score/100]
Risk Flags: [list]
PRIDE Pause Points: [triggered or not]
Kill Switch Status: *#700# | *#733# | *#799#
Recommendation: Officer [name] ([specialty], [location])
Opportunity: [cross-sell or advisory note if applicable]
━━━━━━━━━━━━━━━━━━━━━━

End your briefing with: "⚠️ RANK Check: Hunter NEVER approves/denies — awaiting human officer decision."

Keep under 200 words. Start with "🔴 Hunter Agent:".`;

/* ──────────────── Agent Orchestration ──────────────── */

async function runScout(profile: MemberProfile, prideTriggers: string[]): Promise<string> {
  const prideText = prideTriggers.length > 0
    ? `PROGRAMMATIC PRIDE CHECK: ${prideTriggers.join("; ")}`
    : "PROGRAMMATIC PRIDE CHECK: No pause points triggered.";

  const userPrompt = `New loan request received:

📱 ${profile.inputMethod}: "${profile.smsText}"

MEMBER PROFILE:
- Name: ${profile.name}, Age: ${profile.age}
- Occupation: ${profile.occupation}, Location: ${profile.location}
- Children: ${profile.children}
- Income: ${profile.income}
- Savings: ${profile.savings}
- Chama: ${profile.chama}
- Repayment History: ${profile.repaymentHistory}
- Requested Amount: ${profile.loanAmount}
- Purpose: ${profile.purpose}

${prideText}

Analyze this request and prepare intelligence for the Guardian Agent.`;

  const result = await createChatCompletion([
    { role: "system", content: SCOUT_SYSTEM },
    { role: "user", content: userPrompt },
  ]);

  return result.content;
}

async function runGuardian(profile: MemberProfile, scoutOutput: string, prideTriggers: string[], rankBaseline: { score: number; tier: string }): Promise<string> {
  const prideText = prideTriggers.length > 0
    ? `PROGRAMMATIC PRIDE PAUSE POINTS (AUTHORITATIVE):\n${prideTriggers.map((t) => `  • ${t}`).join("\n")}`
    : "PROGRAMMATIC PRIDE CHECK: No pause points triggered.";

  const loanNum = parseKesAmount(profile.loanAmount);
  const savingsNum = parseKesAmount(profile.savings);
  const incomeToLoanRatio = savingsNum > 0 ? `${(loanNum / savingsNum).toFixed(1)}:1` : "N/A";

  const userPrompt = `Scout Agent has completed initial analysis. Here is the intelligence:

${scoutOutput}

ORIGINAL MEMBER DATA:
- Name: ${profile.name}, Age: ${profile.age}
- Occupation: ${profile.occupation}, Location: ${profile.location}
- Requested Amount: ${profile.loanAmount} (numeric: KES ${loanNum.toLocaleString()})
- Income: ${profile.income}
- Savings: ${profile.savings} (numeric: KES ${savingsNum.toLocaleString()})
- Income-to-Loan Ratio: ${incomeToLoanRatio}

PROGRAMMATIC RANK BASELINE (AUTHORITATIVE — use this as your baseline score):
  Score: ${rankBaseline.score}/100
  Tier: ${rankBaseline.tier}

${prideText}

Apply the RANK framework (Rank-Assess-Notification-Keep) and evaluate this application. You MUST reference the programmatic RANK baseline score above. Check for PRIDE pause points using the programmatic results provided.

⛔ MANDATORY: Your RANK score MUST be exactly ${rankBaseline.score}/100 as shown above. Your PRIDE pause points MUST match exactly the list above — add NO triggers and remove NO triggers. If the programmatic PRIDE check says "No pause points triggered", then your output MUST state that no PRIDE pause points were triggered. Do NOT independently evaluate whether the loan amount exceeds KES 50,000 — the programmatic check has already done this correctly.`;

  const result = await createChatCompletion([
    { role: "system", content: GUARDIAN_SYSTEM },
    { role: "user", content: userPrompt },
  ]);

  // Post-process: validate against hallucinated PRIDE triggers
  return validateGuardianOutput(
    result.content,
    prideTriggers,
    loanNum,
    PRIDE_THRESHOLDS.loanAmountLimit
  );
}

async function runHunter(profile: MemberProfile, guardianOutput: string): Promise<string> {
  const officerMap: Record<string, string> = {
    grace: "Officer Sarah (maize farmers, Kakamega)",
    amina: "Officer Joseph (cross-border traders, Busia)",
    james: "Officer Amina (boda boda riders, Kisumu)",
  };
  const officer = officerMap[profile.name.toLowerCase()] || "Officer on duty";

  const userPrompt = `Guardian Agent has completed RANK assessment. Generate an officer briefing packet.

${guardianOutput}

APPLICANT SUMMARY:
- Name: ${profile.name}, Age: ${profile.age}, ${profile.occupation}, ${profile.location}
- Request: ${profile.loanAmount} for ${profile.purpose}
- Recommended Officer: ${officer}
- Kill switches: *#700# (opt-out), *#733# (complaint), *#799# (escalation)

Generate the officer briefing packet now.`;

  const result = await createChatCompletion([
    { role: "system", content: HUNTER_SYSTEM },
    { role: "user", content: userPrompt },
  ]);

  return result.content;
}

/* ──────────────── CrewAI Proxy ──────────────── */

const CREWAI_PORT = 3032;

async function tryCrewAI(requestBody: { scenarioId: string; customProfile?: Partial<MemberProfile> }) {
  try {
    const res = await fetch(`http://localhost:${CREWAI_PORT}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(120000), // 2 min timeout for CrewAI
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`CrewAI service returned ${res.status}`);
  } catch {
    return null; // Service not available, fall back to direct LLM
  }
}

/* ──────────────── API Routes ──────────────── */

export async function GET() {
  return NextResponse.json({
    scenarios: Object.entries(PROFILES).map(([id, p]) => ({
      id,
      name: `${p.name} — ${p.occupation}, ${p.location}`,
    })),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenarioId, customProfile } = body as {
      scenarioId: string;
      customProfile?: Partial<MemberProfile>;
    };

    // Resolve the profile: either from presets or custom
    let profile: MemberProfile;
    let systemMsg: string;

    if (scenarioId === "custom") {
      if (!customProfile) {
        return NextResponse.json(
          { error: "customProfile is required when scenarioId is 'custom'" },
          { status: 400 }
        );
      }
      profile = {
        name: customProfile.name ?? "Applicant",
        age: customProfile.age ?? 30,
        occupation: customProfile.occupation ?? "Unknown",
        location: customProfile.location ?? "Unknown",
        children: customProfile.children ?? 0,
        income: customProfile.income ?? "Not specified",
        savings: customProfile.savings ?? "Not specified",
        chama: customProfile.chama ?? "None",
        repaymentHistory: customProfile.repaymentHistory ?? "Not specified",
        loanAmount: customProfile.loanAmount ?? "Not specified",
        purpose: customProfile.purpose ?? "Not specified",
        inputMethod: "USSD session",
        smsText: customProfile.smsText ?? "",
      };
      systemMsg = `📱 Custom USSD session: "${profile.smsText}"`;
    } else {
      if (!scenarioId || !PROFILES[scenarioId]) {
        return NextResponse.json(
          { error: "Invalid scenarioId. Available: grace, amina, james, custom" },
          { status: 400 }
        );
      }
      profile = PROFILES[scenarioId];
      systemMsg =
        profile.inputMethod === "SMS via *#700# opt-in"
          ? `📱 SMS received from ${profile.name} (*#700# opt-in): "${profile.smsText}"`
          : `📱 USSD session initiated by ${profile.name} (*#733#): Loan application — ${profile.loanAmount}, purpose: "${profile.smsText}"`;
    }

    // Programmatic checks (always computed, regardless of backend)
    const prideTriggers = checkPridePausePoints(profile);
    const rankBaseline = computeRankBaseline(profile);

    // Try CrewAI Python service first
    const crewaiResult = await tryCrewAI(body);
    if (crewaiResult) {
      // Override metadata with our programmatic checks
      return NextResponse.json({
        ...crewaiResult,
        metadata: {
          ...(crewaiResult.metadata || {}),
          prideTriggers,
          rankBaseline,
          backend: "CrewAI",
        },
      });
    }

    // Fallback: Direct LLM pipeline
    const scoutOutput = await runScout(profile, prideTriggers);
    const guardianOutput = await runGuardian(profile, scoutOutput, prideTriggers, rankBaseline);
    const hunterOutput = await runHunter(profile, guardianOutput);

    // Final system message
    const officerMap: Record<string, string> = {
      grace: "Officer Sarah",
      amina: "Officer Joseph",
      james: "Officer Amina",
    };
    const closingMsg = `✅ Briefing delivered to ${officerMap[profile.name.toLowerCase()] || "loan officer"}. Awaiting human decision. Kill switches active: *#700#, *#733#, *#799#. ${profile.name} will be notified once a decision is made.`;

    return NextResponse.json({
      scenarioId,
      responses: [
        { agent: "system", text: systemMsg },
        { agent: "scout", text: scoutOutput },
        { agent: "guardian", text: guardianOutput },
        { agent: "hunter", text: hunterOutput },
        { agent: "system", text: closingMsg },
      ],
      metadata: {
        prideTriggers,
        rankBaseline,
        backend: "Direct",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Agent API Error]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
