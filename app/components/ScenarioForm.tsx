"use client";

import { useState } from "react";
import type { TestScenario } from "../../lib/types";

const defaultScenario: Omit<TestScenario, "id"> = {
  title: "",
  goal: "",
  complexity: "moderate",
  successCriteria: [],
  riskFactors: []
};

type ScenarioFormProps = {
  onCreate(scenario: TestScenario): void;
};

function parseList(input: string) {
  return input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ScenarioForm({ onCreate }: ScenarioFormProps) {
  const [scenario, setScenario] = useState(defaultScenario);
  const [criteriaInput, setCriteriaInput] = useState("");
  const [riskInput, setRiskInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scenario.title.trim()) return;

    const newScenario: TestScenario = {
      ...scenario,
      successCriteria: parseList(criteriaInput),
      riskFactors: parseList(riskInput),
      id: `scenario-${Date.now()}`
    };

    onCreate(newScenario);
    setScenario(defaultScenario);
    setCriteriaInput("");
    setRiskInput("");
  };

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="scenario-title">Scenario title</label>
        <input
          id="scenario-title"
          placeholder="High risk operations handoff"
          value={scenario.title}
          onChange={(event) => setScenario((prev) => ({ ...prev, title: event.target.value }))}
          required
        />
      </div>

      <div>
        <label htmlFor="scenario-goal">Mission goal</label>
        <textarea
          id="scenario-goal"
          placeholder="Coordinate a 30-minute response window for a high severity incident."
          value={scenario.goal}
          onChange={(event) => setScenario((prev) => ({ ...prev, goal: event.target.value }))}
          required
        />
      </div>

      <div>
        <label htmlFor="scenario-complexity">Complexity</label>
        <select
          id="scenario-complexity"
          value={scenario.complexity}
          onChange={(event) =>
            setScenario((prev) => ({ ...prev, complexity: event.target.value as TestScenario["complexity"] }))
          }
        >
          <option value="simple">Simple</option>
          <option value="moderate">Moderate</option>
          <option value="complex">Complex</option>
        </select>
      </div>

      <div>
        <label htmlFor="scenario-success">Success criteria (one per line)</label>
        <textarea
          id="scenario-success"
          placeholder={`Deliver schedule\nDocument action items`}
          value={criteriaInput}
          onChange={(event) => setCriteriaInput(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="scenario-risks">Risk factors (one per line)</label>
        <textarea
          id="scenario-risks"
          placeholder={`Ambiguous ownership\nMissing telemetry`}
          value={riskInput}
          onChange={(event) => setRiskInput(event.target.value)}
        />
      </div>

      <button type="submit">Add scenario</button>
    </form>
  );
}
