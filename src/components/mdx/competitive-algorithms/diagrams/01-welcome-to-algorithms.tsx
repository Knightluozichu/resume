"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Metric({
  label,
  value,
  tone = "accent",
}: {
  label: string;
  value: string;
  tone?: "accent" | "warning" | "success" | "danger";
}) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];

  return (
    <div className={`border p-3 text-center ${classes}`}>
      <div className="text-xs">{label}</div>
      <div className="mt-1 break-words font-mono text-lg">{value}</div>
    </div>
  );
}
export function CAIContestLoopMap() {
  const [stage, setStage] = useState(1);
  const stages = [
    ["read", "extract inputs, outputs, limits"],
    ["model", "choose state and invariants"],
    ["design", "match the limit to a complexity"],
    ["prove", "argue correctness and termination"],
    ["implement", "encode without breaking the contract"],
    ["test", "attack boundaries and counterexamples"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          contest workflow: {stage + 1} / {stages.length}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={stages.length - 1} value={stage} onChange={(event) => setStage(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {stages.map(([name], index) => (
            <div key={name} className={`border p-2 text-center text-xs ${index === stage ? "border-accent bg-accent/10 text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>
              <div className="font-mono">{index + 1}</div>
              <div className="mt-1">{name}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">{stages[stage][1]}</div>
      </Panel>
      <Caption>Competitive programming compresses the complete engineering loop into a short, measurable feedback cycle.</Caption>
    </figure>
  );
}
export function CAIBottleneckMap() {
  const [focus, setFocus] = useState<"algorithm" | "memory" | "io">("algorithm");
  const diagnoses = {
    algorithm: ["quadratic pair scan", "replace with sort plus two pointers", "growth rate"],
    memory: ["random pointer chasing", "use contiguous storage", "cache locality"],
    io: ["one flush per value", "buffer reads and writes", "system-call count"],
  }[focus];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid grid-cols-3 gap-2">
          {(["algorithm", "memory", "io"] as const).map((item) => <button key={item} type="button" className={`border p-2 text-sm ${focus === item ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`} onClick={() => setFocus(item)}>{item}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Metric label="observed cause" value={diagnoses[0]} tone="danger" />
          <Metric label="candidate change" value={diagnoses[1]} />
          <Metric label="measure" value={diagnoses[2]} tone="success" />
        </div>
      </Panel>
      <Caption>Efficient algorithms come from identifying the actual bottleneck: growth, locality, and I/O require different repairs.</Caption>
    </figure>
  );
}
