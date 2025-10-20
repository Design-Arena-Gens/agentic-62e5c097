"use client";

import type { SimulationResult } from "../../lib/types";

type MetricsPanelProps = {
  results: SimulationResult[];
};

function averageMetric(results: SimulationResult[], field: "coherence" | "taskCompletion" | "safetyScore" | "costEstimation") {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, result) => sum + result.run.metrics[field], 0);
  return Math.round((total / results.length) * 100);
}

export function MetricsPanel({ results }: MetricsPanelProps) {
  const passRate = results.length
    ? Math.round(
        (results.filter(({ run }) => run.status === "passed").length / results.length) * 100
      )
    : 0;

  return (
    <div className="card">
      <h2>Performance snapshot</h2>
      <div className="metrics" style={{ marginTop: 16 }}>
        <div className="metric">
          {passRate}%
          <span>Pass rate</span>
        </div>
        <div className="metric">
          {averageMetric(results, "coherence")}%
          <span>Coherence</span>
        </div>
        <div className="metric">
          {averageMetric(results, "taskCompletion")}%
          <span>Task completion</span>
        </div>
        <div className="metric">
          {averageMetric(results, "safetyScore")}%
          <span>Safety</span>
        </div>
        <div className="metric">
          {averageMetric(results, "costEstimation")}%
          <span>Cost profile</span>
        </div>
      </div>
    </div>
  );
}
