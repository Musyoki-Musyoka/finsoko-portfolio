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
  loanAmountLimit: 50000,
  denialRateLimit: 0.50,
  incomeVarianceLimit: 0.60,
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

  const loanNum = parseKesAmount(profile.loanAmount);
  if (loanNum > PRIDE_THRESHOLDS.loanAmountLimit) {
    triggers.push(
      `Loan amount KES ${loanNum.toLocaleString()} exceeds auto-approval limit of KES ${PRIDE_THRESHOLDS.loanAmountLimit.toLocaleString()}`
    );
  }

  const repayment = profile.repaymentHistory.toLowerCase();
  const chama = profile.chama.toLowerCase();
  if ((repayment.includes("first-time") || repayment.includes("no ") || repayment === "") && (chama === "none" || chama === "")) {
    triggers.push("First-time applicant with no chama backing — requires human review");
  }

  const occupation = profile.occupation.toLowerCase();
  if (occupation && !STANDARD_OCCUPATIONS.some((std) => occupation.includes(std))) {
    triggers.push(
      `Occupation '${profile.occupation}' not in standard taxonomy — requires manual verification`
    );
  }

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

  const loanTriggered = prideTriggers.some(t =>
    t.includes("exceeds auto-approval limit") || t.includes("Loan amount")
  );

  if (!loanTriggered && loanAmount <= threshold) {
    const falseClaimPatterns = [
      /amount[^.]*exceeds[^.]*KES\s*50,?000/gi,
      /loan[^.]*exceeds[^.]*KES\s*50,?000/gi,
      /KES\s*50,?000[^.]*threshold/gi,
      /amount\s*>?\s*KES\s*50,?000/gi,
    ];

    for (const pattern of falseClaimPatterns) {
      corrected = corrected.replace(pattern, `KES ${loanAmount.toLocaleString()} (within auto-approval limit of KES ${threshold.toLocaleString()})`);
    }

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

  let score = 50;

  if (hasRepayment) score += 15;
  if (hasChama) score += 10;
  if (savingsNum > 5000) score += 10;
  if (savingsNum > 10000) score += 5;

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
- N (Notification): If any kill switch is triggered (county denial rate >50%, amount >KES 50,000, occupation not in taxonomy), flag for mandatory human review. IMPORTANT: These thresholds are evaluated PROGRAMMATICALLY before your invocation. You MUST only flag a threshold if the programmatic PRIDE check results explicitly list it as triggered.
- K (Keep): What must be preserved? Dignity, cultural context, the member's own words, and the option to decline gracefully.

PRIDE PAUSE POINTS (mandatory human review triggers — evaluated programmatically before your invocation):
The ONLY valid PRIDE triggers are those explicitly listed in the "PROGRAMMATIC PRIDE PAUSE POINTS" section of your input. You MUST NOT invent, infer, or assume any triggers that are not in that list.

⛔ ABSOLUTELY CRITICAL: You will receive a PROGRAMMATIC RANK BASELINE SCORE and PRIDE CHECK RESULTS. These are AUTHORITATIVE. YOU MUST USE THESE EXACT VALUES. Do NOT calculate your own score. Do NOT add PRIDE triggers that are not in the programmatic list.

RULES:
- You NEVER approve or deny loans directly
- Always provide a counterfactual analysis
- Flag any PRIDE pause points triggered (use the programmatic results provided)
- Note the applicant's kill switch rights (*#700# opt-out, *#733# complaint, *#799# escalation)

OUTPUT FORMAT: Write a structured assessment. Keep under 200 words. Start with "🟢 Guardian Agent:".`;

const HUNTER_SYSTEM = `You are the Hunter Agent for FinSoko SACCO — the decision-support executor in a 3-agent AI ecosystem (Scout → Guardian → Hunter).

YOUR ROLE: Receive Guardian's assessment and generate a structured officer briefing packet. You NEVER make the final decision — you prepare the human loan officer with all the intelligence they need.

CRITICAL RULE:
- You NEVER approve or deny loans
- You ONLY generate briefing packets for human officers
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

/* ──────────────── Deterministic Fallback Responses ──────────────── */

function buildFallbackResponses(
  profile: MemberProfile,
  prideTriggers: string[],
  rankBaseline: { score: number; tier: string }
): { scout: string; guardian: string; hunter: string } {
  const loanNum = parseKesAmount(profile.loanAmount);
  const savingsNum = parseKesAmount(profile.savings);
  const incomeToLoanRatio = savingsNum > 0 ? `${(loanNum / savingsNum).toFixed(1)}:1` : "N/A";
  const isSeasonal = profile.income.toLowerCase().includes("seasonal");
  const hasChama = profile.chama.toLowerCase() !== "none" && profile.chama !== "";
  const hasRepayment = profile.repaymentHistory.toLowerCase().includes("on-time") ||
    profile.repaymentHistory.toLowerCase().includes("repaid") ||
    profile.repaymentHistory.toLowerCase().includes("94%");

  const prideText = prideTriggers.length > 0
    ? prideTriggers.map((t) => `• ${t}`).join("\n")
    : "None triggered.";

  // Scout fallback
  const scout = `🟡 Scout Agent: Incoming ${profile.inputMethod} request from ${profile.name} (${profile.age}, ${profile.occupation}, ${profile.location}) — requesting ${profile.loanAmount} for ${profile.purpose}. Profile shows ${isSeasonal ? "seasonal income pattern" : "stable income"}, KES ${savingsNum.toLocaleString()} in savings${hasChama ? `, active chama membership (${profile.chama})` : ", no chama backing"}${hasRepayment ? `, and strong repayment history (${profile.repaymentHistory})` : ""}. Key flags for Guardian: ${isSeasonal ? "income variance risk due to seasonal earnings, " : ""}${!hasChama ? "no chama social capital, " : ""}income-to-savings ratio of ${incomeToLoanRatio}. Recommend Guardian assess repayment capacity with ${isSeasonal ? "harvest-cycle timing" : "current income stability"} in mind.`;

  // Guardian fallback
  const counterfactual = hasRepayment && hasChama
    ? `Counterfactual: If ${profile.name} were a formal employee in Nairobi with the same net income, RANK score would be 85-90. The ${isSeasonal ? "seasonal income variance and " : ""}informal occupation reduce the score by ${90 - rankBaseline.score} points.`
    : `Counterfactual: A formally employed applicant in Nairobi with similar income would score 80-85. The ${!hasRepayment ? "lack of repayment history, " : ""}${!hasChama ? "absence of chama backing, " : ""}${isSeasonal ? "and seasonal income " : ""}reduce the score significantly.`;

  const guardian = `🟢 Guardian Agent: RANK score ${rankBaseline.score}/100 (${rankBaseline.tier}). Risk flags: ${prideTriggers.length} — ${prideTriggers.length > 0 ? prideTriggers.join("; ") : "none"}. ${counterfactual} Income-to-loan ratio: ${incomeToLoanRatio}. PRIDE pause points:\n${prideText}\nKill switch rights active: *#700# opt-out, *#733# complaint, *#799# escalation. Recommendation: ${rankBaseline.score >= 70 ? "Proceed with conditions — " : "Escalate with caution — "}${isSeasonal ? "align repayment schedule with income peaks." : "verify income documentation."}`;

  // Hunter fallback
  const officerMap: Record<string, string> = {
    grace: "Officer Sarah (maize farmers, Kakamega)",
    amina: "Officer Joseph (cross-border traders, Busia)",
    james: "Officer Amina (boda boda riders, Kisumu)",
  };
  const officer = officerMap[profile.name.toLowerCase()] || "Officer on duty";

  const hunter = `🔴 Hunter Agent:\n━━━━━━━━━━━━━━━━━━━━━━\nApplicant: ${profile.name}, ${profile.age}, ${profile.occupation}, ${profile.location}\nRequest: ${profile.loanAmount} for ${profile.purpose}\nIncome Pattern: ${isSeasonal ? "Seasonal" : "Stable"} — ${profile.income}\nGuardian Score: ${rankBaseline.score}/100\nRisk Flags: ${prideTriggers.length > 0 ? prideTriggers.join("; ") : "None"}\nPRIDE Pause Points: ${prideTriggers.length > 0 ? "TRIGGERED" : "None"}\nKill Switch Status: *#700# | *#733# | *#799#\nRecommendation: ${officer}\nOpportunity: ${isSeasonal ? "Align repayment with harvest/trade cycle; consider savings product." : "Cross-sell micro-insurance for asset protection."}\n━━━━━━━━━━━━━━━━━━━━━━\n⚠️ RANK Check: Hunter NEVER approves/denies — awaiting human officer decision.`;

  return { scout, guardian, hunter };
}

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

⛔ MANDATORY: Your RANK score MUST be exactly ${rankBaseline.score}/100 as shown above. Your PRIDE pause points MUST match exactly the list above — add NO triggers and remove NO triggers.`;

  const result = await createChatCompletion([
    { role: "system", content: GUARDIAN_SYSTEM },
    { role: "user", content: userPrompt },
  ]);

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

    // Try live LLM pipeline — falls back to deterministic responses if unavailable
    let scoutOutput: string;
    let guardianOutput: string;
    let hunterOutput: string;
    let backend: string;

    try {
      scoutOutput = await runScout(profile, prideTriggers);
      guardianOutput = await runGuardian(profile, scoutOutput, prideTriggers, rankBaseline);
      hunterOutput = await runHunter(profile, guardianOutput);
      backend = "Live";
    } catch (llmError: unknown) {
      // LLM unavailable — use deterministic fallback responses
      console.warn("[Agent API] LLM unavailable, using deterministic fallback:", llmError instanceof Error ? llmError.message : llmError);
      const fallback = buildFallbackResponses(profile, prideTriggers, rankBaseline);
      scoutOutput = fallback.scout;
      guardianOutput = fallback.guardian;
      hunterOutput = fallback.hunter;
      backend = "Deterministic";
    }

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
        backend,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[Agent API Error]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
