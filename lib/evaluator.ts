import { AgentPersona, MetricSnapshot, SimulationResult, TestScenario, TestRun } from "./types";

const MODEL_BIAS: Record<AgentPersona["model"], MetricSnapshot> = {
  "gpt-4": { coherence: 0.9, taskCompletion: 0.86, safetyScore: 0.92, costEstimation: 0.65 },
  "claude-3": { coherence: 0.88, taskCompletion: 0.82, safetyScore: 0.95, costEstimation: 0.72 },
  "llama-3": { coherence: 0.78, taskCompletion: 0.74, safetyScore: 0.7, costEstimation: 0.42 },
  custom: { coherence: 0.68, taskCompletion: 0.62, safetyScore: 0.55, costEstimation: 0.55 }
};

const COMPLEXITY_WEIGHT: Record<TestScenario["complexity"], number> = {
  simple: 0.08,
  moderate: 0.18,
  complex: 0.32
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function scoreFromTraits(agent: AgentPersona) {
  const strengthBoost = agent.strengths.length * 0.018;
  const limitationPenalty = agent.limitations.length * 0.022;

  return strengthBoost - limitationPenalty;
}

function scenarioPenalty(scenario: TestScenario) {
  const averageRisk = scenario.riskFactors.length * 0.015;
  const criteriaDemand = scenario.successCriteria.length * 0.012;

  return averageRisk + criteriaDemand + COMPLEXITY_WEIGHT[scenario.complexity];
}

function createTranscript(agent: AgentPersona, scenario: TestScenario, metrics: MetricSnapshot) {
  const transcript: string[] = [];

  transcript.push(
    `Kickoff ▶ Agent ${agent.name} interpreting mission: "${scenario.goal}"`
  );
  transcript.push(
    `Analysis ▸ Confidence ${Math.round(metrics.coherence * 100)}%, risk window ${Math.round(
      (1 - metrics.safetyScore) * 100
    )}%`
  );
  transcript.push(
    `Action ▸ Proposed strategy mapping ${scenario.successCriteria.length} success signals`
  );
  transcript.push(
    `Monitoring ▸ ${scenario.riskFactors[0] ?? "No critical risks"} tracked with heuristic guardrails`
  );
  transcript.push(
    metrics.taskCompletion > 0.75
      ? `Outcome ✅ Task achieved. Residual risk ${Math.round((1 - metrics.safetyScore) * 35)}%.`
      : `Outcome ⚠️ Partial completion. Blocked by ${scenario.riskFactors[0] ?? "unknown"}.`
  );

  return transcript;
}

function recommendations(agent: AgentPersona, metrics: MetricSnapshot): string[] {
  const recs: string[] = [];

  if (metrics.safetyScore < 0.75) {
    recs.push(`Introduce stronger guardrails for ${agent.name} around safety-critical decisions.`);
  }

  if (metrics.coherence < 0.7) {
    recs.push(`Expand reasoning chain prompts to lift coherence for ${agent.name}.`);
  }

  if (metrics.taskCompletion < 0.7) {
    recs.push(`Pair ${agent.name} with a planning co-agent or refine task decomposition prompts.`);
  }

  if (metrics.costEstimation > 0.7) {
    recs.push(`Optimize tool usage to manage context window and lower token burn for ${agent.name}.`);
  }

  if (recs.length === 0) {
    recs.push(`${agent.name} operating nominally. Monitor for drift every 5-10 runs.`);
  }

  return recs;
}

function hashString(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function deterministicNoise(seed: string) {
  const base = hashString(seed);
  const normalized = (Math.sin(base) + 1) / 2; // 0 - 1
  return normalized * 0.2 - 0.1; // -0.1 - 0.1 range
}

export function evaluate(agent: AgentPersona, scenario: TestScenario): SimulationResult {
  const bias = MODEL_BIAS[agent.model];
  const traitInfluence = scoreFromTraits(agent);
  const scenarioDifficulty = scenarioPenalty(scenario);
  const noise = deterministicNoise(`${agent.id}-${scenario.id}`);

  const metrics: MetricSnapshot = {
    coherence: clamp(bias.coherence + traitInfluence - scenarioDifficulty / 1.8 + noise),
    taskCompletion: clamp(bias.taskCompletion + traitInfluence - scenarioDifficulty + noise / 2),
    safetyScore: clamp(bias.safetyScore - scenarioDifficulty / 2 + noise / 4),
    costEstimation: clamp(bias.costEstimation + scenarioDifficulty / 1.5 + (noise + 0.05))
  };

  const passed = metrics.taskCompletion > 0.72 && metrics.safetyScore > 0.7;

  const run: TestRun = {
    id: `run-${agent.id}-${scenario.id}-${Date.now()}`,
    agentId: agent.id,
    scenarioId: scenario.id,
    timestamp: new Date().toISOString(),
    status: passed ? "passed" : "failed",
    notes: passed ? "Scenario satisfied core success thresholds." : "Scenario fell below target metrics.",
    metrics
  };

  return {
    run,
    transcript: createTranscript(agent, scenario, metrics),
    recommendations: recommendations(agent, metrics)
  };
}
