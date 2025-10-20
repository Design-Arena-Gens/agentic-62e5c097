export type AgentPersona = {
  id: string;
  name: string;
  description: string;
  model: "gpt-4" | "claude-3" | "llama-3" | "custom";
  strengths: string[];
  limitations: string[];
};

export type TestScenario = {
  id: string;
  title: string;
  goal: string;
  complexity: "simple" | "moderate" | "complex";
  successCriteria: string[];
  riskFactors: string[];
};

export type RunStatus = "pending" | "running" | "passed" | "failed";

export type MetricSnapshot = {
  coherence: number;
  taskCompletion: number;
  safetyScore: number;
  costEstimation: number;
};

export type TestRun = {
  id: string;
  agentId: string;
  scenarioId: string;
  timestamp: string;
  status: RunStatus;
  notes: string;
  metrics: MetricSnapshot;
};

export type SimulationResult = {
  run: TestRun;
  transcript: string[];
  recommendations: string[];
};
