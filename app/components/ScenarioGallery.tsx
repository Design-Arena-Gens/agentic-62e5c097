"use client";

import type { TestScenario } from "../../lib/types";

type ScenarioGalleryProps = {
  scenarios: TestScenario[];
};

export function ScenarioGallery({ scenarios }: ScenarioGalleryProps) {
  return (
    <div className="card">
      <h2>Scenario catalog</h2>
      <div className="list" style={{ marginTop: 16 }}>
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="list-item" aria-label={`scenario-${scenario.id}`}>
            <div style={{ flex: 1 }}>
              <strong>{scenario.title}</strong>
              <p style={{ margin: "6px 0" }}>{scenario.goal}</p>
              <div className="badge-stack" style={{ marginBottom: 6 }}>
                <span className="tag">Complexity · {scenario.complexity}</span>
                {scenario.successCriteria.map((criteria) => (
                  <span key={`${scenario.id}-criteria-${criteria}`} className="tag">
                    {criteria}
                  </span>
                ))}
              </div>
              {scenario.riskFactors.length > 0 && (
                <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.75 }}>
                  Risks: {scenario.riskFactors.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
