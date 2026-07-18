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

export function CAIAlgorithmContractLab() {
  const [size, setSize] = useState(6);
  const values = [7, 2, 9, 2, 5, 1, 8, 4].slice(0, size);
  const sorted = useMemo(() => [...values].sort((a, b) => a - b), [values]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          input prefix: {size} values
          <input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={size} onChange={(event) => setSize(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="border border-warning p-3"><div className="text-xs text-secondary">finite input</div><div className="mt-2 flex flex-wrap gap-1">{values.map((value, index) => <span key={`${value}-${index}`} className="border border-warning px-2 py-1 font-mono text-warning">{value}</span>)}</div></div>
          <div className="text-center text-xl text-secondary">→</div>
          <div className="border border-success p-3"><div className="text-xs text-secondary">required output</div><div className="mt-2 flex flex-wrap gap-1">{sorted.map((value, index) => <span key={`${value}-${index}`} className="border border-success px-2 py-1 font-mono text-success">{value}</span>)}</div></div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Metric label="terminates" value="yes" tone="success" />
          <Metric label="preserves count" value={`${sorted.length}`} />
          <Metric label="nondecreasing" value="yes" tone="success" />
        </div>
      </Panel>
      <Caption>An algorithm is a finite, executable procedure with an explicit input-output contract, not merely an implementation idea.</Caption>
    </figure>
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

export function CAICppChoiceLab() {
  const [need, setNeed] = useState<"sort" | "minimum" | "membership" | "fifo">("sort");
  const choices = {
    sort: ["std::sort", "vector", "O(n log n)"],
    minimum: ["priority_queue", "heap", "O(log n) update"],
    membership: ["unordered_set", "hash table", "expected O(1)"],
    fifo: ["queue", "deque", "O(1) ends"],
  }[need];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          required operation
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={need} onChange={(event) => setNeed(event.target.value as typeof need)}>
            <option value="sort">sort a batch</option>
            <option value="minimum">repeated minimum</option>
            <option value="membership">membership queries</option>
            <option value="fifo">first-in first-out</option>
          </select>
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric label="library tool" value={choices[0]} />
          <Metric label="structure" value={choices[1]} tone="warning" />
          <Metric label="operation cost" value={choices[2]} tone="success" />
        </div>
      </Panel>
      <Caption>C++ dominates contests because its zero-cost abstractions and standard library let competitors express proven data structures quickly.</Caption>
    </figure>
  );
}

export function CAIComplexityGrowthLab() {
  const [power, setPower] = useState(4);
  const n = 10 ** power;
  const values = [
    ["n", n],
    ["n log₂ n", Math.round(n * Math.log2(n))],
    ["n²", n * n],
    ["2ⁿ", n > 30 ? Number.POSITIVE_INFINITY : 2 ** n],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          input size n = 10^{power}
          <input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={power} onChange={(event) => setPower(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {values.map(([name, value], index) => <Metric key={name} label={name} value={Number.isFinite(value) ? value.toLocaleString() : "astronomical"} tone={index < 2 ? "success" : index === 2 ? "warning" : "danger"} />)}
        </div>
      </Panel>
      <Caption>Complexity compares growth rates: increasing n by orders of magnitude separates linear and near-linear work from quadratic or exponential work.</Caption>
    </figure>
  );
}

export function CAISortingRaceLab() {
  const [pattern, setPattern] = useState<"sorted" | "reverse" | "mixed">("mixed");
  const n = 12;
  const estimates = {
    sorted: { bubble: 11, selection: 66, insertion: 11 },
    reverse: { bubble: 66, selection: 66, insertion: 77 },
    mixed: { bubble: 54, selection: 66, insertion: 38 },
  }[pattern];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          data pattern
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pattern} onChange={(event) => setPattern(event.target.value as typeof pattern)}>
            <option value="sorted">already sorted</option>
            <option value="reverse">reverse order</option>
            <option value="mixed">mixed order</option>
          </select>
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric label="bubble comparisons" value={`${estimates.bubble}`} tone="warning" />
          <Metric label="selection comparisons" value={`${estimates.selection}`} tone="danger" />
          <Metric label="insertion operations" value={`${estimates.insertion}`} tone="success" />
        </div>
        <div className="mt-3 text-sm text-secondary">For n = {n}, the same asymptotic family still reacts differently to input order and implementation details.</div>
      </Panel>
      <Caption>Bubble, selection, and insertion sort expose why a complexity class is a growth model rather than an exact stopwatch reading.</Caption>
    </figure>
  );
}

export function CAIInputScaleLab() {
  const [seconds, setSeconds] = useState(1);
  const budget = seconds * 100_000_000;
  const limits = {
    linear: budget,
    nlogn: Math.floor(budget / 27),
    quadratic: Math.floor(Math.sqrt(budget)),
    exponential: Math.floor(Math.log2(budget)),
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          illustrative time limit: {seconds}s
          <input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={seconds} onChange={(event) => setSeconds(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Metric label="O(n)" value={`n≈${limits.linear.toLocaleString()}`} tone="success" />
          <Metric label="O(n log n)" value={`n≈${limits.nlogn.toLocaleString()}`} />
          <Metric label="O(n²)" value={`n≈${limits.quadratic.toLocaleString()}`} tone="warning" />
          <Metric label="O(2ⁿ)" value={`n≈${limits.exponential}`} tone="danger" />
        </div>
      </Panel>
      <Caption>A rough operation budget turns input constraints into a shortlist of feasible algorithm families; measurement must refine the estimate.</Caption>
    </figure>
  );
}

export function CAIConstantFactorLab() {
  const [power, setPower] = useState(2);
  const n = 10 ** power;
  const fastGrowthLargeConstant = 20 * n * Math.log2(n);
  const slowGrowthSmallConstant = n * n;
  const winner = fastGrowthLargeConstant < slowGrowthSmallConstant ? "20n log n" : "n²";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          crossover experiment: n = {n.toLocaleString()}
          <input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={power} onChange={(event) => setPower(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric label="20n log₂ n" value={Math.round(fastGrowthLargeConstant).toLocaleString()} tone="accent" />
          <Metric label="n²" value={slowGrowthSmallConstant.toLocaleString()} tone="warning" />
          <Metric label="less work now" value={winner} tone="success" />
        </div>
      </Panel>
      <Caption>Lower asymptotic complexity eventually wins, but constants and crossover points explain why it need not win on every small input.</Caption>
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

export function CAIAlgorithmDesignLab() {
  const [nPower, setNPower] = useState(5);
  const [ordered, setOrdered] = useState(false);
  const n = 10 ** nPower;
  const strategy = ordered ? "binary search / two pointers" : n <= 10_000 ? "quadratic enumeration may fit" : "sort, hash, or near-linear design";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="2" max="7" value={nPower} onChange={(event) => setNPower(Number(event.target.value))} /></label>
          <label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={ordered} onChange={(event) => setOrdered(event.target.checked)} />input has a useful sorted-order invariant</label>
        </div>
        <div className="mt-4 border border-success p-4 text-success"><div className="text-xs">design direction</div><div className="mt-1 font-semibold">{strategy}</div></div>
      </Panel>
      <Caption>Constraint-driven design narrows the search space before code: size sets the budget and structure suggests the operation.</Caption>
    </figure>
  );
}

export function CAIVerificationLab() {
  const [caseName, setCaseName] = useState<"normal" | "empty" | "duplicates" | "maximum">("normal");
  const checks = {
    normal: [true, true, true, true],
    empty: [true, true, true, false],
    duplicates: [true, false, true, true],
    maximum: [true, true, false, true],
  }[caseName];
  const labels = ["terminates", "preserves multiplicity", "fits numeric range", "meets budget"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          test family
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={caseName} onChange={(event) => setCaseName(event.target.value as typeof caseName)}>
            <option value="normal">normal input</option>
            <option value="empty">empty input</option>
            <option value="duplicates">all duplicates</option>
            <option value="maximum">maximum constraints</option>
          </select>
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {labels.map((label, index) => <Metric key={label} label={label} value={checks[index] ? "pass" : "inspect"} tone={checks[index] ? "success" : "danger"} />)}
        </div>
      </Panel>
      <Caption>Correctness and efficiency are separate obligations; boundary tests make hidden assumptions visible before submission.</Caption>
    </figure>
  );
}
