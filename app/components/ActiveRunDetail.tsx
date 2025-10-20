"use client";

import type { AgentPersona, SimulationResult, TestScenario } from "../../lib/types";

type ActiveRunDetailProps = {
  result: SimulationResult | null;
  agent: AgentPersona | undefined;
  scenario: TestScenario | undefined;
};

export function ActiveRunDetail({ result, agent, scenario }: ActiveRunDetailProps) {
  if (!result || !agent || !scenario) {
    return (
      <div className="card">
        <h2>Run insights</h2>
        <p>Select a run to inspect transcript and recommendations.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Run insights</h2>
        <span
          className={`status-pill ${result.run.status === "passed" ? "success" : "danger"}`}
        >
          {result.run.status === "passed" ? "Healthy" : "Needs Attention"}
        </span>
      </div>

      <div className="stack" style={{ marginTop: 16 }}>
        <div>
          <strong>Agent profile</strong>
          <p style={{ margin: "4px 0" }}>{agent.description}</p>
          <div className="badge-stack">
            {agent.strengths.map((strength) => (
              <span key={strength} className="tag">
                {strength}
              </span>
            ))}
          </div>
        </div>

        <div>
          <strong>Scenario summary</strong>
          <p style={{ margin: "4px 0" }}>{scenario.goal}</p>
          <div className="badge-stack">
            {scenario.successCriteria.map((criteria) => (
              <span key={criteria} className="tag">
                {criteria}
              </span>
            ))}
          </div>
        </div>

        <div>
          <strong>Transcript</strong>
          <ol style={{ margin: "12px 0", paddingLeft: 20 }}>
            {result.transcript.map((line, index) => (
              <li key={`${result.run.id}-line-${index}`} style={{ marginBottom: 6 }}>
                {line}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <strong>Recommendations</strong>
          <ul style={{ margin: "12px 0", paddingLeft: 20 }}>
            {result.recommendations.map((item, index) => (
              <li key={`${result.run.id}-rec-${index}`} style={{ marginBottom: 4 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
