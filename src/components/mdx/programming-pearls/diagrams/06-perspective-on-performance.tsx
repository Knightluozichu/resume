"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2NBodyBaselineLab() {
  const [bodies, setBodies] = useState(10_000);
  const pairs = (bodies * (bodies - 1)) / 2;
  const treeWork = bodies * Math.log2(Math.max(2, bodies));
  const ratio = pairs / treeWork;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">bodies n = {bodies.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="20000" step="100" value={bodies} onChange={(event) => setBodies(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-danger p-3 text-danger"><div className="text-xs">direct pairs</div><div className="mt-1 font-mono text-lg">{Math.round(pairs).toLocaleString()}</div></div><div className="border border-accent p-3 text-accent"><div className="text-xs">n log2 n model</div><div className="mt-1 font-mono text-lg">{Math.round(treeWork).toLocaleString()}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">work ratio</div><div className="mt-1 font-mono text-lg">{ratio.toFixed(1)}x</div></div></div>
      </Panel>
      <Caption>The direct model evaluates every pair; the hierarchical model changes the shape of the work before any code tuning begins.</Caption>
    </figure>
  );
}

export function PP2TreeApproximationLab() {
  const [opening, setOpening] = useState(0.55);
  const accepted = Math.round(4 + opening * 18);
  const direct = 64;
  const error = opening * opening * 2.4;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">cluster opening threshold = {opening.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.1" max="1" step="0.05" value={opening} onChange={(event) => setOpening(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-8 gap-1">{Array.from({ length: 64 }, (_, index) => <div key={index} className={"aspect-square border " + (index % Math.max(2, Math.round(9 - opening * 6)) === 0 ? "border-warning bg-warning/20" : "border-border bg-background")} />)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent">direct {direct}</div><div className="border border-success p-3 text-success">accepted clusters {accepted}</div><div className="border border-warning p-3 text-warning">modeled error {error.toFixed(2)}%</div></div>
      </Panel>
      <Caption>A distant cluster can be represented by aggregate mass; the acceptance threshold trades interaction count against approximation error.</Caption>
    </figure>
  );
}

export function PP2AppelSpeedupLab() {
  const levels = [
    ["tree algorithm", 12],
    ["larger time steps", 2],
    ["cluster reorganization", 2],
    ["single precision", 2],
    ["critical assembly", 2.5],
    ["floating-point accelerator", 2],
  ] as const;
  const [enabled, setEnabled] = useState(levels.map(() => true));
  const product = levels.reduce((value, [, factor], index) => value * (enabled[index] ? factor : 1), 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-2">{levels.map(([name, factor], index) => <label key={name} className="border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={enabled[index]} onChange={(event) => setEnabled((current) => current.map((value, item) => item === index ? event.target.checked : value))} />{name} <span className="float-right font-mono text-primary">{factor}x</span></label>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 text-accent"><div className="text-xs">product of listed estimates</div><div className="font-mono text-3xl">{product.toFixed(0)}x</div></div><div className="border border-success p-4 text-success"><div className="text-xs">reported overall result</div><div className="font-mono text-3xl">about 400x</div></div></div>
      </Panel>
      <Caption>The factors are approximate and partly dependent; their main lesson is that independent gains multiply across levels.</Caption>
    </figure>
  );
}

export function PP2AccuracyPerformanceLab() {
  const [precision, setPrecision] = useState<"64-bit" | "32-bit">("64-bit");
  const [stepScale, setStepScale] = useState(1);
  const precisionSpeed = precision === "32-bit" ? 2 : 1;
  const modeledSpeed = precisionSpeed * stepScale;
  const modeledError = (precision === "32-bit" ? 0.08 : 0.01) + Math.max(0, stepScale - 1) * 0.12;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">numeric precision<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={precision} onChange={(event) => setPrecision(event.target.value as typeof precision)}><option>64-bit</option><option>32-bit</option></select></label>
        <label className="mt-3 block text-xs text-secondary">time-step scale = {stepScale.toFixed(1)}x<input className="mt-2 w-full accent-current" type="range" min="1" max="3" step="0.1" value={stepScale} onChange={(event) => setStepScale(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-success p-4 text-success">modeled speed <span className="float-right font-mono">{modeledSpeed.toFixed(1)}x</span></div><div className="border border-warning p-4 text-warning">modeled error <span className="float-right font-mono">{modeledError.toFixed(2)}%</span></div></div>
      </Panel>
      <Caption>Precision and integration step are specification decisions: a speedup is valid only after domain-specific accuracy tests pass.</Caption>
    </figure>
  );
}

export function PP2DesignLevelsLab() {
  const [level, setLevel] = useState<"problem definition" | "system structure" | "algorithm and data structure" | "code tuning" | "system software" | "hardware">("algorithm and data structure");
  const detail = {
    "problem definition": ["change what must be computed", "largest leverage, may remove work", "validate user outcome"],
    "system structure": ["change module boundaries and data flow", "avoid repeated or remote work", "estimate end-to-end budget"],
    "algorithm and data structure": ["change asymptotic or locality behavior", "often the largest module speedup", "prove semantics and complexity"],
    "code tuning": ["change hot instructions and representation", "small to medium local gain", "profile before and benchmark after"],
    "system software": ["change compiler, runtime, database, or OS", "reuse a stronger platform", "measure the actual workload"],
    hardware: ["change processor, accelerator, memory, or topology", "fast deployment but real cost", "check portability and utilization"],
  }[level];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">design level<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={level} onChange={(event) => setLevel(event.target.value as typeof level)}><option>problem definition</option><option>system structure</option><option>algorithm and data structure</option><option>code tuning</option><option>system software</option><option>hardware</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-xs text-accent">{detail[0]}</div><div className="border border-success p-3 text-xs text-success">{detail[1]}</div><div className="border border-warning p-3 text-xs text-warning">{detail[2]}</div></div>
      </Panel>
      <Caption>Performance work starts by scanning every design level, then choosing the best gain for the least total effort and risk.</Caption>
    </figure>
  );
}

export function PP2ProblemDefinitionLab() {
  const [orders, setOrders] = useState(50);
  const [consolidated, setConsolidated] = useState(true);
  const transactions = consolidated ? 1 : orders;
  const speedup = orders / transactions;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">individual requests = {orders}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={orders} onChange={(event) => setOrders(Number(event.target.value))} /></label>
        <label className="mt-3 block border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={consolidated} onChange={(event) => setConsolidated(event.target.checked)} />consolidate into one order</label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent">requests {orders}</div><div className="border border-warning p-3 text-warning">transactions {transactions}</div><div className="border border-success p-3 text-success">workflow speedup {speedup.toFixed(0)}x</div></div>
      </Panel>
      <Caption>Changing the problem from processing many equivalent orders to processing one aggregate order removes work before software tuning.</Caption>
    </figure>
  );
}

export function PP2SystemStructureLab() {
  const [boundaries, setBoundaries] = useState(6);
  const [calls, setCalls] = useState(20);
  const roundTrips = boundaries * calls;
  const batchedTrips = boundaries + calls;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">module boundaries = {boundaries}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={boundaries} onChange={(event) => setBoundaries(Number(event.target.value))} /></label><label className="text-xs text-secondary">items = {calls}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={calls} onChange={(event) => setCalls(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-4 text-danger">chatty crossings <span className="float-right font-mono">{roundTrips}</span></div><div className="border border-success p-4 text-success">batched model <span className="float-right font-mono">{batchedTrips}</span></div></div>
      </Panel>
      <Caption>Module decomposition and communication shape can dominate local instruction cost; estimate the whole path before tuning a leaf.</Caption>
    </figure>
  );
}

export function PP2AlgorithmLevelLab() {
  const [size, setSize] = useState(10_000);
  const quadratic = size * size;
  const hierarchical = size * Math.log2(Math.max(2, size));
  const gap = quadratic / hierarchical;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">problem size n = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="100000" step="100" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 h-4 border border-border bg-background"><div className="h-full bg-danger" style={{ width: "100%" }} /></div>
        <div className="mt-2 h-4 border border-border bg-background"><div className="h-full bg-success" style={{ width: `${Math.max(1, 100 / Math.sqrt(gap))}%` }} /></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-danger p-3 text-danger">n² {quadratic.toExponential(2)}</div><div className="border border-success p-3 text-success">n log n {hierarchical.toExponential(2)}</div><div className="border border-accent p-3 text-accent">gap {gap.toFixed(0)}x</div></div>
      </Panel>
      <Caption>Asymptotic improvement changes how much problem size fits in a fixed time budget; faster hardware alone preserves the old growth curve.</Caption>
    </figure>
  );
}

export function PP2DependencyLab() {
  const [tree, setTree] = useState(true);
  const [singlePrecision, setSinglePrecision] = useState(true);
  const [accelerator, setAccelerator] = useState(true);
  const algorithm = tree ? 12 : 1;
  const precision = tree && singlePrecision ? 2 : 1;
  const hardware = accelerator ? (tree ? 1.8 : 2.2) : 1;
  const total = algorithm * precision * hardware;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-3"><label className="border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={tree} onChange={(event) => setTree(event.target.checked)} />tree representation</label><label className="border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={singlePrecision} onChange={(event) => setSinglePrecision(event.target.checked)} />single precision</label><label className="border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={accelerator} onChange={(event) => setAccelerator(event.target.checked)} />accelerator</label></div>
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent">{algorithm.toFixed(1)}x</div><div className="border border-warning p-3 text-warning">{precision.toFixed(1)}x</div><div className="border border-success p-3 text-success">{hardware.toFixed(1)}x</div><div className="border border-primary p-3 text-primary">{total.toFixed(1)}x total</div></div>
        {!tree && singlePrecision ? <div className="mt-3 border border-warning p-3 text-xs text-warning">Single precision is disabled in this model because the tree-relative coordinates created the needed numeric range.</div> : null}
      </Panel>
      <Caption>Speedups multiply only when their prerequisites hold; representation may enable precision changes, and hardware can interact with algorithm shape.</Caption>
    </figure>
  );
}

export function PP2OptimizationPortfolioLab() {
  const [need, setNeed] = useState<"small" | "large">("small");
  const options = [
    { name: "remove requirement", gain: 20, effort: 2 },
    { name: "system batching", gain: 8, effort: 3 },
    { name: "algorithm change", gain: 12, effort: 6 },
    { name: "code tuning", gain: 2, effort: 4 },
    { name: "new hardware", gain: 3, effort: 2 },
  ];
  const selected = need === "small"
    ? [...options].sort((a, b) => b.gain / b.effort - a.gain / a.effort)[0]
    : options.filter((option) => option.gain > 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">required improvement<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={need} onChange={(event) => setNeed(event.target.value as typeof need)}><option>small</option><option>large</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">{options.map((option) => { const active = Array.isArray(selected) ? selected.includes(option) : selected === option; return <div key={option.name} className={"border p-3 text-center text-[11px] " + (active ? "border-success text-success" : "border-border text-secondary")}><div>{option.name}</div><div className="mt-1 font-mono">{option.gain}x / e{option.effort}</div></div>; })}</div>
        <div className="mt-3 border border-accent p-3 text-xs text-accent">{need === "small" ? "Choose the best leverage-to-effort level." : "A large target usually requires a coordinated multi-level portfolio."}</div>
      </Panel>
      <Caption>For a modest goal, choose one high-leverage level; for an enormous goal, coordinate several compatible levels and multiply verified gains.</Caption>
    </figure>
  );
}

export function PP2PerformanceCertificateLab() {
  const [fault, setFault] = useState<"none" | "wrong metric" | "dependent factors" | "accuracy loss">("none");
  const checks = {
    outcome: fault !== "wrong metric",
    baseline: true,
    levels: true,
    dependencies: fault !== "dependent factors",
    accuracy: fault !== "accuracy loss",
    cost: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">portfolio audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={fault} onChange={(event) => setFault(event.target.value as typeof fault)}><option>none</option><option>wrong metric</option><option>dependent factors</option><option>accuracy loss</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The performance claim is ready for an end-to-end experiment." : "The speedup claim omits a required design-level obligation."}</div>
      </Panel>
      <Caption>A valid performance claim names the user outcome, baseline, levels changed, dependencies, accuracy envelope, and total engineering cost.</Caption>
    </figure>
  );
}
