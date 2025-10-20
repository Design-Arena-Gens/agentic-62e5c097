"use client";

import { useMemo, useState } from "react";
import { evaluate } from "../../lib/evaluator";
import { seedAgents, seedScenarios } from "../../lib/data";
import type { AgentPersona, SimulationResult, TestScenario } from "../../lib/types";
import { AgentForm } from "./AgentForm";
import { ScenarioForm } from "./ScenarioForm";
import { RunHistory } from "./RunHistory";
import { ActiveRunDetail } from "./ActiveRunDetail";
import { MetricsPanel } from "./MetricsPanel";
import { AgentRoster } from "./AgentRoster";
import { ScenarioGallery } from "./ScenarioGallery";

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export function LabWorkspace() {
  const [agents, setAgents] = useState<AgentPersona[]>(seedAgents);
  const [scenarios, setScenarios] = useState<TestScenario[]>(seedScenarios);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(seedAgents[0]?.id ?? "");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(seedScenarios[0]?.id ?? "");
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [note, setNote] = useState("");

  const activeResult = useMemo(
    () => results.find((entry) => entry.run.id === activeRunId) ?? null,
    [activeRunId, results]
  );

  const selectedAgent = agents.find((entry) => entry.id === selectedAgentId);
  const selectedScenario = scenarios.find((entry) => entry.id === selectedScenarioId);
  const activeAgent = activeResult
    ? agents.find((entry) => entry.id === activeResult.run.agentId)
    : undefined;
  const activeScenario = activeResult
    ? scenarios.find((entry) => entry.id === activeResult.run.scenarioId)
    : undefined;

  const handleAgentCreate = (agent: AgentPersona) => {
    setAgents((prev) => [agent, ...prev]);
    setSelectedAgentId(agent.id);
  };

  const handleScenarioCreate = (scenario: TestScenario) => {
    setScenarios((prev) => [scenario, ...prev]);
    setSelectedScenarioId(scenario.id);
  };

  const executeRun = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAgent || !selectedScenario) return;
    setIsRunning(true);
    await wait(600);

    const result = evaluate(selectedAgent, {
      ...selectedScenario,
      goal: note ? `${selectedScenario.goal} | Custom note: ${note}` : selectedScenario.goal
    });

    setResults((prev) => [result, ...prev]);
    setActiveRunId(result.run.id);
    setIsRunning(false);
    setNote("");
  };

  return (
    <main>
      <header style={{ marginBottom: 36 }}>
        <span className="tag">Agent Ops Toolkit</span>
        <h1>Agent Test Lab</h1>
        <p className="lead">
          Pair agent personas with mission scenarios, simulate expected performance, and capture
          decisions in a single evidence stream.
        </p>
      </header>

      <section className="grid" style={{ marginBottom: 32 }}>
        <div className="card">
          <h2>Configure test run</h2>
          <form className="stack" style={{ marginTop: 16 }} onSubmit={executeRun}>
            <div>
              <label htmlFor="run-agent">Select agent</label>
              <select
                id="run-agent"
                value={selectedAgentId}
                onChange={(event) => setSelectedAgentId(event.target.value)}
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="run-scenario">Select scenario</label>
              <select
                id="run-scenario"
                value={selectedScenarioId}
                onChange={(event) => setSelectedScenarioId(event.target.value)}
              >
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="run-note">Optional operator note</label>
              <textarea
                id="run-note"
                placeholder="Inject last-minute constraints or context overrides"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>

            <button type="submit" disabled={isRunning}>
              {isRunning ? "Simulating…" : "Launch simulation"}
            </button>
          </form>
        </div>

        <MetricsPanel results={results} />
      </section>

      <section className="grid" style={{ marginBottom: 32 }}>
        <AgentRoster agents={agents} />
        <ScenarioGallery scenarios={scenarios} />
      </section>

      <section className="grid" style={{ marginBottom: 32 }}>
        <div className="card">
          <h2>Execution ledger</h2>
          <div style={{ marginTop: 16 }}>
            <RunHistory
              runs={results}
              onSelect={setActiveRunId}
              selectedId={activeRunId}
            />
          </div>
        </div>
        <ActiveRunDetail result={activeResult} agent={activeAgent} scenario={activeScenario} />
      </section>

      <section className="grid">
        <div className="card">
          <h2>Create new agent</h2>
          <AgentForm onCreate={handleAgentCreate} />
        </div>
        <div className="card">
          <h2>Author new scenario</h2>
          <ScenarioForm onCreate={handleScenarioCreate} />
        </div>
      </section>

      <footer className="footer">
        Designed for rapid iteration across agent personas, safety scenarios, and evaluation loops.
        Export data by copying run tables or connecting this UI to your own telemetry pipeline.
      </footer>
    </main>
  );
}
