"use client";

import type { SimulationResult } from "../../lib/types";

type RunHistoryProps = {
  runs: SimulationResult[];
  onSelect(runId: string): void;
  selectedId: string | null;
};

function formatTimestamp(input: string) {
  return new Date(input).toLocaleString();
}

export function RunHistory({ runs, onSelect, selectedId }: RunHistoryProps) {
  if (runs.length === 0) {
    return <p>No test runs yet. Execute a pairing to capture evidence.</p>;
  }

  return (
    <table className="table" aria-label="test run history">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Agent</th>
          <th>Scenario</th>
          <th>Status</th>
          <th>Coherence</th>
          <th>Completion</th>
          <th>Safety</th>
        </tr>
      </thead>
      <tbody>
        {runs.map(({ run }) => (
          <tr
            key={run.id}
            onClick={() => onSelect(run.id)}
            style={{
              cursor: "pointer",
              background: selectedId === run.id ? "rgba(99,102,241,0.18)" : undefined
            }}
          >
            <td>{formatTimestamp(run.timestamp)}</td>
            <td><code>{run.agentId}</code></td>
            <td><code>{run.scenarioId}</code></td>
            <td>
              <span className={`status-pill ${run.status === "passed" ? "success" : "danger"}`}>
                {run.status === "passed" ? "Passed" : "Failed"}
              </span>
            </td>
            <td>{Math.round(run.metrics.coherence * 100)}%</td>
            <td>{Math.round(run.metrics.taskCompletion * 100)}%</td>
            <td>{Math.round(run.metrics.safetyScore * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
