"use client";

import type { AgentPersona } from "../../lib/types";

type AgentRosterProps = {
  agents: AgentPersona[];
};

export function AgentRoster({ agents }: AgentRosterProps) {
  return (
    <div className="card">
      <h2>Agent personas</h2>
      <div className="list" style={{ marginTop: 16 }}>
        {agents.map((agent) => (
          <div key={agent.id} className="list-item" aria-label={`agent-${agent.id}`}>
            <div style={{ flex: 1 }}>
              <strong>{agent.name}</strong>
              <p style={{ margin: "6px 0" }}>{agent.description}</p>
              <div className="badge-stack">
                <span className="tag">Model · {agent.model}</span>
                {agent.strengths.map((item) => (
                  <span key={`${agent.id}-strength-${item}`} className="tag">
                    {item}
                  </span>
                ))}
              </div>
              {agent.limitations.length > 0 && (
                <p style={{ marginTop: 8, fontSize: "0.85rem", opacity: 0.75 }}>
                  Constraints: {agent.limitations.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
