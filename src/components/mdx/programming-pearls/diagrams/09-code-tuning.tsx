"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2ProfileHotspotLab() {
  const [hotFraction, setHotFraction] = useState(70);
  const [localSpeedup, setLocalSpeedup] = useState(4);
  const p = hotFraction / 100;
  const overall = 1 / ((1 - p) + p / localSpeedup);
  const newHotFraction = (p / localSpeedup) / ((1 - p) + p / localSpeedup) * 100;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">profiled hot fraction = {hotFraction}%<input className="mt-2 w-full accent-current" type="range" min="5" max="98" value={hotFraction} onChange={(event) => setHotFraction(Number(event.target.value))} /></label><label className="text-xs text-secondary">local speedup = {localSpeedup.toFixed(1)}x<input className="mt-2 w-full accent-current" type="range" min="1" max="20" step="0.5" value={localSpeedup} onChange={(event) => setLocalSpeedup(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex h-8 overflow-hidden border border-border"><div className="bg-danger text-center text-xs leading-8 text-white" style={{ width: `${hotFraction}%` }}>hot {hotFraction}%</div><div className="bg-secondary/20 text-center text-xs leading-8 text-secondary" style={{ width: `${100 - hotFraction}%` }}>rest</div></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">overall <span className="float-right font-mono">{overall.toFixed(2)}x</span></div><div className="border border-warning p-3 text-warning">new hot share <span className="float-right font-mono">{newHotFraction.toFixed(0)}%</span></div><div className="border border-success p-3 text-success">limit <span className="float-right font-mono">{(1 / (1 - p)).toFixed(2)}x</span></div></div>
      </Panel>
      <Caption>A profile chooses the target; Amdahl&apos;s law predicts how much end-to-end improvement that target can possibly deliver.</Caption>
    </figure>
  );
}

export function PP2NodeCacheLab() {
  const [commonAllocations, setCommonAllocations] = useState(68000);
  const [runnerUp, setRunnerUp] = useState(2000);
  const [cacheHit, setCacheHit] = useState(90);
  const commonShare = commonAllocations / (commonAllocations + runnerUp) * 100;
  const allocatorCalls = commonAllocations * (1 - cacheHit / 100) + runnerUp;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">common record allocations = {commonAllocations.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="100000" step="1000" value={commonAllocations} onChange={(event) => setCommonAllocations(Number(event.target.value))} /></label><label className="text-xs text-secondary">runner-up allocations = {runnerUp.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="20000" step="100" value={runnerUp} onChange={(event) => setRunnerUp(Number(event.target.value))} /></label></div>
        <label className="mt-3 block text-xs text-secondary">free-list hit rate = {cacheHit}%<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={cacheHit} onChange={(event) => setCacheHit(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-warning p-3 text-warning">common share <span className="float-right font-mono">{commonShare.toFixed(1)}%</span></div><div className="border border-success p-3 text-success">fast-list hits <span className="float-right font-mono">{Math.round(commonAllocations * cacheHit / 100).toLocaleString()}</span></div><div className="border border-accent p-3 text-accent">general calls <span className="float-right font-mono">{Math.round(allocatorCalls).toLocaleString()}</span></div></div>
      </Panel>
      <Caption>Van Wyk measured a 34-to-1 allocation skew, then cached only the common record type and preserved the general allocator as fallback.</Caption>
    </figure>
  );
}

export function PP2TuningLoopLab() {
  const [fault, setFault] = useState<"none" | "no profile" | "wrong input" | "no correctness" | "no rollback">("none");
  const stages = [
    ["profile", fault !== "no profile"],
    ["model", true],
    ["one change", true],
    ["verify", fault !== "no correctness"],
    ["measure", fault !== "wrong input"],
    ["retain or rollback", fault !== "no rollback"],
  ] as const;
  const accepted = stages.every(([, ok]) => ok);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">experiment fault<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={fault} onChange={(event) => setFault(event.target.value as typeof fault)}><option value="none">none</option><option value="no profile">no profile</option><option value="wrong input">unrepresentative input</option><option value="no correctness">no correctness check</option><option value="no rollback">no rollback threshold</option></select></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-6">{stages.map(([name, ok], index) => <div key={name} className={"border p-3 text-center text-xs " + (ok ? "border-success text-success" : "border-danger text-danger")}><div className="text-[10px] text-secondary">{index + 1}</div><div className="mt-1">{name}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "Evidence supports retaining the change." : "The tuning claim cannot be trusted."}</div>
      </Panel>
      <Caption>Code tuning is a controlled experiment: locate, explain, change one factor, preserve behavior, measure representative work, and revert losers.</Caption>
    </figure>
  );
}

export function PP2RemainderStrengthLab() {
  const [size, setSize] = useState(97);
  const [step, setStep] = useState(31);
  const [index, setIndex] = useState(80);
  const raw = index + step;
  const modulo = raw % size;
  const conditional = raw >= size ? raw - size : raw;
  const precondition = step < size && index < size && raw < 2 * size;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">N = {size}<input className="mt-2 w-full accent-current" type="range" min="8" max="128" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">step = {step}<input className="mt-2 w-full accent-current" type="range" min="1" max="128" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label><label className="text-xs text-secondary">i = {index}<input className="mt-2 w-full accent-current" type="range" min="0" max="127" value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-3 font-mono text-accent">(i + step) % N = {modulo}</div><div className={"border p-3 font-mono " + (precondition ? "border-success text-success" : "border-danger text-danger")}>one subtract = {conditional}</div></div>
        <div className={"mt-3 border p-3 text-sm " + (precondition && modulo === conditional ? "border-success text-success" : "border-danger text-danger")}>{precondition ? "0 ≤ i, step < N and i + step < 2N: identity is valid." : "Precondition fails: one subtraction is not equivalent to remainder."}</div>
      </Panel>
      <Caption>Strength reduction is valid only under a proven range invariant, and its speed depends on the compiler and target machine.</Caption>
    </figure>
  );
}

export function PP2MacroExpansionLab() {
  const [depth, setDepth] = useState(20);
  const macroCalls = 2 ** depth - 1;
  const functionCalls = depth;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">recursive depth n = {depth}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-success p-4 text-success"><div className="text-xs">function evaluates recursive argument once</div><div className="mt-1 font-mono text-2xl">{functionCalls.toLocaleString()}</div></div><div className="border border-danger p-4 text-danger"><div className="text-xs">unsafe macro may duplicate it</div><div className="mt-1 font-mono text-2xl">{macroCalls.toLocaleString()}</div></div></div>
        <div className="mt-3 border border-warning p-3 text-sm text-warning">A textual macro is not an inline function; argument evaluation count is part of behavior.</div>
      </Panel>
      <Caption>Bentley&apos;s recursive maximum can turn exponential when a max macro evaluates the recursive argument once in its test and again in its selected branch.</Caption>
    </figure>
  );
}

export function PP2SentinelSearchLab() {
  const [size, setSize] = useState(1000);
  const [position, setPosition] = useState(700);
  const found = position < size;
  const ordinaryTests = (found ? position + 1 : size) * 2;
  const sentinelTests = (found ? position + 1 : size + 1) + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">array size N = {size}<input className="mt-2 w-full accent-current" type="range" min="10" max="5000" step="10" value={size} onChange={(event) => { const next = Number(event.target.value); setSize(next); setPosition(Math.min(position, next)); }} /></label>
        <label className="mt-3 block text-xs text-secondary">target position = {position === size ? "missing" : position}<input className="mt-2 w-full accent-current" type="range" min="0" max={size} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-warning p-3 text-warning">bounds + value <span className="float-right font-mono">{ordinaryTests}</span></div><div className="border border-success p-3 text-success">sentinel path <span className="float-right font-mono">{sentinelTests}</span></div><div className="border border-accent p-3 text-accent">saved <span className="float-right font-mono">{ordinaryTests - sentinelTests}</span></div></div>
      </Panel>
      <Caption>A sentinel combines exhaustion and equality tests in the hot loop, then distinguishes a real hit from the guard after the loop.</Caption>
    </figure>
  );
}

export function PP2LoopUnrollLab() {
  const [iterations, setIterations] = useState(1024);
  const [factor, setFactor] = useState(4);
  const groups = Math.ceil(iterations / factor);
  const branchReduction = 100 * (1 - groups / iterations);
  const remainder = iterations % factor;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">iterations = {iterations}<input className="mt-2 w-full accent-current" type="range" min="16" max="4096" step="16" value={iterations} onChange={(event) => setIterations(Number(event.target.value))} /></label><label className="text-xs text-secondary">unroll factor = {factor}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={factor} onChange={(event) => setFactor(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4"><div className="border border-accent p-3 text-accent">loop branches <span className="float-right font-mono">{groups}</span></div><div className="border border-success p-3 text-success">reduction <span className="float-right font-mono">{branchReduction.toFixed(0)}%</span></div><div className="border border-warning p-3 text-warning">tail work <span className="float-right font-mono">{remainder}</span></div><div className="border border-danger p-3 text-danger">body copies <span className="float-right font-mono">{factor}</span></div></div>
      </Panel>
      <Caption>Unrolling trades branches and dependency gaps for code size, instruction-cache pressure, and a remainder path; measured optimums are machine-specific.</Caption>
    </figure>
  );
}

export function PP2SphericalDistanceLab() {
  const [storedPoints, setStoredPoints] = useState(5000);
  const [queries, setQueries] = useState(20000);
  const pairs = storedPoints * queries;
  const trigOps = pairs * 10;
  const cartesianOps = pairs * 6 + storedPoints * 10;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">stored points = {storedPoints.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="10000" step="100" value={storedPoints} onChange={(event) => setStoredPoints(Number(event.target.value))} /></label><label className="text-xs text-secondary">query points = {queries.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="40000" step="100" value={queries} onChange={(event) => setQueries(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-warning p-3 text-warning">pairs <span className="float-right font-mono">{pairs.toExponential(2)}</span></div><div className="border border-danger p-3 text-danger">trig calls <span className="float-right font-mono">{trigOps.toExponential(2)}</span></div><div className="border border-success p-3 text-success">xyz arithmetic <span className="float-right font-mono">{cartesianOps.toExponential(2)}</span></div></div>
        <div className="mt-3 border border-accent p-3 text-sm text-accent">For points on one sphere, minimizing angular distance is equivalent to maximizing dot product or minimizing squared chord distance.</div>
      </Panel>
      <Caption>Data augmentation converts repeated trigonometry into additions and multiplications while preserving the nearest-neighbor ordering.</Caption>
    </figure>
  );
}

function binaryTrace(target: number) {
  const trace: Array<{ lower: number; upper: number; middle: number }> = [];
  let lower = -1;
  let upper = 1000;
  while (lower + 1 !== upper) {
    const middle = Math.floor((lower + upper) / 2);
    trace.push({ lower, upper, middle });
    if (middle < target) lower = middle;
    else upper = middle;
  }
  return trace;
}

export function PP2BinaryInvariantLab() {
  const [target, setTarget] = useState(613);
  const [step, setStep] = useState(0);
  const trace = binaryTrace(target);
  const current = trace[Math.min(step, trace.length - 1)];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">first occurrence position = {target}<input className="mt-2 w-full accent-current" type="range" min="0" max="999" value={target} onChange={(event) => { setTarget(Number(event.target.value)); setStep(0); }} /></label>
        <label className="mt-3 block text-xs text-secondary">decision step = {Math.min(step + 1, trace.length)} / {trace.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={Math.max(0, trace.length - 1)} value={Math.min(step, trace.length - 1)} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 h-10 border border-border bg-background p-1"><div className="h-full bg-accent/20" style={{ marginLeft: `${(current.lower + 1) / 10}%`, width: `${Math.max(0.2, (current.upper - current.lower - 1) / 10)}%` }} /></div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3"><div className="border border-danger p-3 text-danger">l = {current.lower}</div><div className="border border-accent p-3 text-accent">m = {current.middle}</div><div className="border border-success p-3 text-success">u = {current.upper}</div></div>
        <div className="mt-3 border border-warning p-3 font-mono text-sm text-warning">x[l] &lt; t and x[u] ≥ t; answer converges to first equal position.</div>
      </Panel>
      <Caption>Combining comparisons is safe because the lower-bound invariant turns each iteration into one yes-or-no test against the target.</Caption>
    </figure>
  );
}

export function PP2BinaryBenchmarkLab() {
  const [pattern, setPattern] = useState<"ordered" | "random">("random");
  const clean = pattern === "ordered" ? 350 : 418;
  const unrolled = pattern === "ordered" ? 125 : 266;
  const reduction = 100 * (clean - unrolled) / clean;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">query order<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pattern} onChange={(event) => setPattern(event.target.value as typeof pattern)}><option value="ordered">x[0], x[1], … in order</option><option value="random">same targets in random order</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">clean search <span className="float-right font-mono">{clean} ns</span></div><div className="border border-success p-3 text-success">unrolled <span className="float-right font-mono">{unrolled} ns</span></div><div className="border border-warning p-3 text-warning">reduction <span className="float-right font-mono">{reduction.toFixed(0)}%</span></div></div>
        <div className={"mt-3 border p-3 text-sm " + (pattern === "random" ? "border-success text-success" : "border-danger text-danger")}>{pattern === "random" ? "Representative branch and memory behavior: retain the 36% claim." : "Ordered scaffolding favors prediction and locality: the 64% claim is biased."}</div>
      </Panel>
      <Caption>Bentley&apos;s own benchmark changed from an apparent 64 percent reduction to 36 percent after randomizing query order.</Caption>
    </figure>
  );
}

export function PP2TuningCertificateLab() {
  const [failure, setFailure] = useState<"none" | "hotspot" | "equivalence" | "representative" | "maintainability">("none");
  const checks = {
    hotspot: failure !== "hotspot",
    costModel: true,
    equivalence: failure !== "equivalence",
    representative: failure !== "representative",
    endToEnd: true,
    maintainability: failure !== "maintainability",
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">review scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={failure} onChange={(event) => setFailure(event.target.value as typeof failure)}><option value="none">complete evidence</option><option value="hotspot">changed cold code</option><option value="equivalence">behavior drift</option><option value="representative">biased workload</option><option value="maintainability">unbounded complexity</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The tuning patch has enough evidence to retain." : "Reject or revise the patch before merging."}</div>
      </Panel>
      <Caption>A local speedup is not a deliverable until it targets measured cost, preserves behavior, survives representative tests, moves end-to-end time, and remains supportable.</Caption>
    </figure>
  );
}
