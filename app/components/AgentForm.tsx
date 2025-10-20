"use client";

import { useState } from "react";
import type { AgentPersona } from "../../lib/types";

const defaultAgent: Omit<AgentPersona, "id"> = {
  name: "",
  description: "",
  model: "gpt-4",
  strengths: [],
  limitations: []
};

function sanitizeList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

type AgentFormProps = {
  onCreate(agent: AgentPersona): void;
};

export function AgentForm({ onCreate }: AgentFormProps) {
  const [agent, setAgent] = useState(defaultAgent);
  const [strengthInput, setStrengthInput] = useState("");
  const [limitationsInput, setLimitationsInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agent.name.trim()) return;

    const newAgent: AgentPersona = {
      ...agent,
      strengths: sanitizeList(strengthInput),
      limitations: sanitizeList(limitationsInput),
      id: `agent-${Date.now()}`
    };

    onCreate(newAgent);
    setAgent(defaultAgent);
    setStrengthInput("");
    setLimitationsInput("");
  };

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="agent-name">Agent name</label>
        <input
          id="agent-name"
          placeholder="Aurora Planner"
          value={agent.name}
          onChange={(event) => setAgent((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
      </div>

      <div>
        <label htmlFor="agent-description">Mission profile</label>
        <textarea
          id="agent-description"
          placeholder="Planner-first agent for orchestrating complex workflows"
          value={agent.description}
          onChange={(event) =>
            setAgent((prev) => ({ ...prev, description: event.target.value }))
          }
          required
        />
      </div>

      <div>
        <label htmlFor="agent-model">Foundation model</label>
        <select
          id="agent-model"
          value={agent.model}
          onChange={(event) =>
            setAgent((prev) => ({ ...prev, model: event.target.value as AgentPersona["model"] }))
          }
        >
          <option value="gpt-4">OpenAI GPT-4</option>
          <option value="claude-3">Anthropic Claude 3</option>
          <option value="llama-3">Meta Llama 3</option>
          <option value="custom">Custom stack</option>
        </select>
      </div>

      <div>
        <label htmlFor="agent-strengths">Strengths (comma separated)</label>
        <input
          id="agent-strengths"
          placeholder="long-horizon planning, tool orchestration"
          value={strengthInput}
          onChange={(event) => setStrengthInput(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="agent-limitations">Limitations (comma separated)</label>
        <input
          id="agent-limitations"
          placeholder="slow execution, brittle safety filters"
          value={limitationsInput}
          onChange={(event) => setLimitationsInput(event.target.value)}
        />
      </div>

      <button type="submit">Add agent persona</button>
    </form>
  );
}
