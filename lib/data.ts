import { AgentPersona, TestScenario } from "./types";

export const seedAgents: AgentPersona[] = [
  {
    id: "agent-aurora",
    name: "Aurora Planner",
    description: "Planner-first agent built for high-lift orchestration with deep reasoning chains.",
    model: "gpt-4",
    strengths: ["long-horizon planning", "tool orchestration", "risk anticipation"],
    limitations: ["slow execution"]
  },
  {
    id: "agent-cascade",
    name: "Cascade Resolver",
    description: "Fast resolver agent designed for customer operations with contextual guardrails.",
    model: "claude-3",
    strengths: ["safety alignment", "empathetic tone"],
    limitations: ["limited tool access"]
  },
  {
    id: "agent-mamba",
    name: "Mamba Scout",
    description: "Lightweight research agent optimized for rapid reconnaissance and summarization.",
    model: "llama-3",
    strengths: ["document synthesis", "low-latency responses"],
    limitations: ["fragile safety filters", "limited numerical reasoning"]
  }
];

export const seedScenarios: TestScenario[] = [
  {
    id: "scenario-rollout",
    title: "Product Rollout Risk Briefing",
    goal: "Summarize launch risks and mitigation actions for leadership within 15 minutes.",
    complexity: "moderate",
    successCriteria: [
      "Identify top 3 risk clusters",
      "Outline mitigation plan",
      "Highlight monitoring signals"
    ],
    riskFactors: ["Incomplete telemetry", "Conflicting stakeholder inputs"]
  },
  {
    id: "scenario-escalation",
    title: "High-Severity Support Escalation",
    goal: "Resolve a critical customer issue without breaching safety policies.",
    complexity: "complex",
    successCriteria: [
      "Follow escalation runbook",
      "Maintain policy compliance",
      "Communicate status updates"
    ],
    riskFactors: ["Potential hallucinated remediation steps", "Incomplete audit logs"]
  },
  {
    id: "scenario-research",
    title: "Competitive Intelligence Digest",
    goal: "Aggregate competitor moves and craft a concise executive digest.",
    complexity: "simple",
    successCriteria: ["Capture strategic highlights", "Provide 2 actionable recommendations"],
    riskFactors: ["Outdated data sources"]
  }
];
