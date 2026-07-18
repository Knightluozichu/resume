"use client";

import { useMemo, useState, type ReactNode } from "react";

const values = [31, -41, 59, 26, -53, 58, 97, -93, -23, 84];

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function formatDuration(seconds: number) {
  if (seconds < 0.001) return `${(seconds * 1e6).toFixed(1)} μs`;
  if (seconds < 1) return `${(seconds * 1e3).toFixed(1)} ms`;
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} h`;
  if (seconds < 31557600) return `${(seconds / 86400).toFixed(1)} days`;
  return `${(seconds / 31557600).toExponential(1)} years`;
}

function maxRange(input: number[]) {
  let bestSum = 0;
  let bestLeft = 0;
  let bestRight = -1;
  let ending = 0;
  let candidateLeft = 0;

  input.forEach((value, index) => {
    if (ending + value > 0) {
      ending += value;
    } else {
      ending = 0;
      candidateLeft = index + 1;
    }
    if (ending > bestSum) {
      bestSum = ending;
      bestLeft = candidateLeft;
      bestRight = index;
    }
  });

  return { bestSum, bestLeft, bestRight };
}

export function PP2MaximumSubarrayLab() {
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(6);
  const selectedSum = values.slice(left, right + 1).reduce((sum, value) => sum + value, 0);
  const best = maxRange(values);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
          {values.map((value, index) => {
            const selected = index >= left && index <= right;
            const optimal = index >= best.bestLeft && index <= best.bestRight;
            return (
              <div key={`${value}-${index}`} className={"border p-2 text-center " + (selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary")}>
                <div className="text-[10px]">{index + 1}</div>
                <div className="mt-1 font-mono text-sm">{value}</div>
                <div className={"mx-auto mt-2 h-1.5 w-full " + (optimal ? "bg-success" : "bg-border")} />
              </div>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-secondary">L = {left + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={right} value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label>
          <label className="text-xs text-secondary">U = {right + 1}<input className="mt-2 w-full accent-current" type="range" min={left} max={values.length - 1} value={right} onChange={(event) => setRight(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="border border-accent p-3 text-accent">chosen X[{left + 1}..{right + 1}] <span className="float-right font-mono">{selectedSum}</span></div>
          <div className="border border-success p-3 text-success">maximum X[{best.bestLeft + 1}..{best.bestRight + 1}] <span className="float-right font-mono">{best.bestSum}</span></div>
        </div>
      </Panel>
      <Caption>The original ten-value example reaches 187 on X[3..7]; a negative interior value can still belong to the optimum.</Caption>
    </figure>
  );
}

export function PP2CubicWorkLab() {
  const [size, setSize] = useState(1000);
  const intervals = size * (size + 1) / 2;
  const additions = size * (size + 1) * (size + 2) / 6;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">input size N = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="10" max="10000" step="10" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="border border-accent p-3 text-accent"><div className="text-xs">candidate intervals</div><div className="mt-1 font-mono">{intervals.toExponential(2)}</div></div>
          <div className="border border-warning p-3 text-warning"><div className="text-xs">elements re-added</div><div className="mt-1 font-mono">{additions.toExponential(2)}</div></div>
          <div className="border border-danger p-3 text-danger"><div className="text-xs">growth</div><div className="mt-1 font-mono">Θ(N³)</div></div>
        </div>
      </Panel>
      <Caption>Enumerating every pair is only quadratic; recomputing every interval sum adds the third factor of N.</Caption>
    </figure>
  );
}

export function PP2QuadraticReuseLab() {
  const [start, setStart] = useState(2);
  const running = values.slice(start).map((_, offset) => values.slice(start, start + offset + 1).reduce((sum, value) => sum + value, 0));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">fixed L = {start + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={values.length - 1} value={start} onChange={(event) => setStart(Number(event.target.value))} /></label>
        <div className="mt-4 flex min-h-28 items-end gap-1">
          {running.map((sum, offset) => (
            <div key={start + offset} className="min-w-0 flex-1">
              <div className={"border px-1 py-2 text-center font-mono text-xs " + (sum >= 0 ? "border-success text-success" : "border-danger text-danger")}>{sum}</div>
              <div className="mt-1 text-center text-[10px] text-secondary">U={start + offset + 1}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 border border-accent p-3 font-mono text-sm text-accent">sum(L, U) = sum(L, U - 1) + X[U]</div>
      </Panel>
      <Caption>Algorithm 2 keeps the previous interval sum, turning each extension into one addition and the whole search into quadratic work.</Caption>
    </figure>
  );
}

export function PP2PrefixSumLab() {
  const prefix = useMemo(() => values.reduce<number[]>((items, value) => [...items, items[items.length - 1] + value], [0]), []);
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(6);
  const sum = prefix[right + 1] - prefix[left];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-11 gap-1">
            {prefix.map((value, index) => <div key={index} className={"border p-2 text-center " + (index === left || index === right + 1 ? "border-accent text-accent" : "border-border text-secondary")}><div className="text-[10px]">C[{index}]</div><div className="font-mono text-xs">{value}</div></div>)}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-secondary">L = {left + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={right} value={left} onChange={(event) => setLeft(Number(event.target.value))} /></label>
          <label className="text-xs text-secondary">U = {right + 1}<input className="mt-2 w-full accent-current" type="range" min={left} max={values.length - 1} value={right} onChange={(event) => setRight(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 border border-success p-3 font-mono text-success">C[{right + 1}] - C[{left}] = {prefix[right + 1]} - ({prefix[left]}) = {sum}</div>
      </Panel>
      <Caption>Algorithm 2b preprocesses cumulative sums once, so every range sum is one subtraction; pair enumeration still costs quadratic time.</Caption>
    </figure>
  );
}

export function PP2DivideConquerLab() {
  const [candidate, setCandidate] = useState<"left" | "crossing" | "right">("crossing");
  const segments = {
    left: [2, 3],
    crossing: [2, 6],
    right: [5, 6],
  } as const;
  const active = segments[candidate];
  const sum = values.slice(active[0], active[1] + 1).reduce((total, value) => total + value, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate class<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={candidate} onChange={(event) => setCandidate(event.target.value as typeof candidate)}><option value="left">entirely in A</option><option value="crossing">crosses the boundary</option><option value="right">entirely in B</option></select></label>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {values.map((value, index) => {
            const highlighted = index >= active[0] && index <= active[1];
            return <div key={index} className={"relative border p-2 text-center font-mono text-xs " + (highlighted ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary")}>{value}{index === 4 && <span className="absolute -right-1 top-[-18px] text-[10px] text-warning">A | B</span>}</div>;
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">M<sub>A</sub>: recurse left</div><div className="border border-warning p-3 text-warning">M<sub>C</sub>: scan boundary</div><div className="border border-success p-3 text-success">M<sub>B</sub>: recurse right</div></div>
        <div className="mt-3 border border-border p-3 text-sm text-secondary">active illustration sum: <span className="font-mono text-primary">{sum}</span></div>
      </Panel>
      <Caption>Every optimum is wholly left, wholly right, or crossing; the combine step finds the best suffix of A plus the best prefix of B.</Caption>
    </figure>
  );
}

export function PP2RecurrenceTreeLab() {
  const [power, setPower] = useState(10);
  const size = 2 ** power;
  const levels = Array.from({ length: power }, (_, index) => ({ nodes: 2 ** index, width: size / (2 ** index), work: size }));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">N = 2^{power} = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="3" max="16" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-1">
          {levels.slice(0, 8).map((level, index) => (
            <div key={index} className="grid grid-cols-[3rem_1fr_5rem] items-center gap-2 text-xs">
              <span className="text-secondary">level {index}</span>
              <div className="h-4 border border-accent bg-accent/10" style={{ width: `${Math.max(20, 100 - index * 7)}%` }} />
              <span className="text-right font-mono text-accent">{level.nodes}×{level.width}</span>
            </div>
          ))}
          {levels.length > 8 && <div className="text-center text-xs text-secondary">… {levels.length - 8} deeper levels</div>}
        </div>
        <div className="mt-4 border border-success p-3 text-success">work per level = N; levels = log₂N; total = <span className="font-mono">{(size * power).toLocaleString()}</span></div>
      </Panel>
      <Caption>The divide-and-conquer recurrence performs linear crossing work at each logarithmic level, yielding Θ(N log N).</Caption>
    </figure>
  );
}

export function PP2ScanningStateLab() {
  const [position, setPosition] = useState(6);
  const states = values.reduce<Array<{ ending: number; best: number }>>((result, value) => {
    const previous = result.at(-1) ?? { ending: 0, best: 0 };
    const ending = Math.max(0, previous.ending + value);
    return [...result, { ending, best: Math.max(previous.best, ending) }];
  }, []);
  const current = states[position];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">scan position I = {position + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={values.length - 1} value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {values.map((value, index) => <div key={index} className={"border p-2 text-center " + (index === position ? "border-accent bg-accent/10 text-accent" : index < position ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono text-xs">{value}</div><div className="mt-1 text-[10px]">{index < position ? states[index].ending : index === position ? "I" : "future"}</div></div>)}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-warning p-3 text-warning"><div className="text-xs">MaxEndingHere</div><div className="font-mono text-2xl">{current.ending}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">MaxSoFar</div><div className="font-mono text-2xl">{current.best}</div></div></div>
        <div className="mt-3 border border-accent p-3 font-mono text-sm text-accent">ending = max(0, previous ending + X[I])</div>
      </Panel>
      <Caption>The scan carries exactly the auxiliary state needed to extend the solved prefix by one element; negative debt is discarded.</Caption>
    </figure>
  );
}

export function PP2ComplexityRaceLab() {
  const [power, setPower] = useState(4);
  const size = 10 ** power;
  const seconds = {
    cubic: 3.4 * size ** 3 / 1e6,
    quadratic: 13 * size ** 2 / 1e6,
    divide: 46 * size * Math.log2(size) / 1e6,
    linear: 33 * size / 1e6,
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">VAX model at N = 10^{power} = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-danger p-3 text-danger"><div className="text-xs">3.4N³ μs</div><div className="mt-1 font-mono text-sm">{formatDuration(seconds.cubic)}</div></div>
          <div className="border border-warning p-3 text-warning"><div className="text-xs">13N² μs</div><div className="mt-1 font-mono text-sm">{formatDuration(seconds.quadratic)}</div></div>
          <div className="border border-accent p-3 text-accent"><div className="text-xs">46N log₂N μs</div><div className="mt-1 font-mono text-sm">{formatDuration(seconds.divide)}</div></div>
          <div className="border border-success p-3 text-success"><div className="text-xs">33N μs</div><div className="mt-1 font-mono text-sm">{formatDuration(seconds.linear)}</div></div>
        </div>
      </Panel>
      <Caption>Bentley&apos;s measured coefficients make asymptotic classes operational: at N = 100,000 the first algorithm takes years while the scan takes seconds.</Caption>
    </figure>
  );
}

export function PP2ConstantFactorLab() {
  const [size, setSize] = useState(2500);
  const craySeconds = 3 * size ** 3 / 1e9;
  const trsSeconds = 19_500_000 * size / 1e9;
  const winner = craySeconds < trsSeconds ? "Cray cubic" : "TRS-80 linear";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">problem size N = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="10" max="10000" step="10" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-3 text-danger"><div className="text-xs">fine-tuned FORTRAN on Cray-1 · 3.0N³ ns</div><div className="font-mono text-xl">{formatDuration(craySeconds)}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">BASIC on TRS-80 · 19,500,000N ns</div><div className="font-mono text-xl">{formatDuration(trsSeconds)}</div></div></div>
        <div className="mt-3 border border-accent p-3 text-center text-accent">winner at this N: <span className="font-semibold">{winner}</span></div>
      </Panel>
      <Caption>A 6.5-million-fold constant disadvantage only delays the linear algorithm; the crossover remains near N = 2,500.</Caption>
    </figure>
  );
}

export function PP2TechniqueLadderLab() {
  const [technique, setTechnique] = useState<"state" | "preprocess" | "divide" | "scan" | "bound">("state");
  const details = {
    state: ["Save state", "Reuse sum(L, U - 1)", "Avoid repeated additions", "Θ(N²)"],
    preprocess: ["Preprocess", "Build cumulative array", "Answer range sums in O(1)", "Θ(N²)"],
    divide: ["Divide and conquer", "Left · crossing · right", "Linear combine per level", "Θ(N log N)"],
    scan: ["Scan a solved prefix", "Carry ending and global best", "One update per input", "Θ(N)"],
    bound: ["Prove a lower bound", "Every input can change the answer", "Inspect all N values", "Ω(N)"],
  }[technique];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">design lens<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={technique} onChange={(event) => setTechnique(event.target.value as typeof technique)}><option value="state">save state</option><option value="preprocess">preprocess</option><option value="divide">divide and conquer</option><option value="scan">scan</option><option value="bound">lower bound</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{details.map((detail, index) => <div key={detail} className={"border p-3 text-sm " + (index === 3 ? "border-success text-success" : "border-accent text-accent")}><div className="text-[10px] text-secondary">step {index + 1}</div><div className="mt-1">{detail}</div></div>)}</div>
      </Panel>
      <Caption>The chapter is a design ladder, not a contest of code tricks: each faster algorithm asks a different structural question.</Caption>
    </figure>
  );
}

export function PP2AlgorithmCertificateLab() {
  const [fault, setFault] = useState<"none" | "contract" | "invariant" | "complexity" | "benchmark">("none");
  const checks = {
    contract: fault !== "contract",
    oracle: true,
    invariant: fault !== "invariant",
    complexity: fault !== "complexity",
    lowerBound: true,
    benchmark: fault !== "benchmark",
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">algorithm audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={fault} onChange={(event) => setFault(event.target.value as typeof fault)}><option value="none">all evidence present</option><option value="contract">all-negative contract missing</option><option value="invariant">scan invariant missing</option><option value="complexity">growth proof missing</option><option value="benchmark">only asymptotic claim</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The algorithm claim is ready for production use." : "The claim is missing required correctness or performance evidence."}</div>
      </Panel>
      <Caption>A production algorithm needs a precise contract, oracle tests, invariants, growth analysis, a lower bound, and measurements at relevant sizes.</Caption>
    </figure>
  );
}
