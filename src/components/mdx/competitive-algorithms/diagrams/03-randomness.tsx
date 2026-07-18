"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-lg">{value}</div></div>;
}

function sequence(seed: number, count: number) {
  let state = seed >>> 0;
  return Array.from({ length: count }, () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 2 ** 32;
  });
}

export function CAIBuffonNeedleLab() {
  const [trials, setTrials] = useState(400);
  const [seed, setSeed] = useState(7);
  const values = useMemo(() => sequence(seed, trials * 2), [seed, trials]);
  const length = 0.8;
  let crossings = 0;
  for (let i = 0; i < trials; i += 1) {
    const distance = values[i * 2] * 0.5;
    const angle = values[i * 2 + 1] * Math.PI;
    if (distance <= (length / 2) * Math.sin(angle)) crossings += 1;
  }
  const estimate = crossings === 0 ? 0 : 2 * length * trials / crossings;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">needle trials = {trials}<input className="mt-2 w-full accent-current" type="range" min="50" max="2000" step="50" value={trials} onChange={(event) => setTrials(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">seed = {seed}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="crossings" value={`${crossings}`} /><Stat label="crossing rate" value={`${(crossings / trials * 100).toFixed(1)}%`} tone="warning" /><Stat label="π estimate" value={estimate.toFixed(4)} tone={Math.abs(estimate - Math.PI) < 0.2 ? "success" : "danger"} /></div>
      </Panel>
      <Caption>Buffon needle experiments convert a geometric crossing probability into an estimate of pi; more independent trials reduce typical sampling error.</Caption>
    </figure>
  );
}

export function CAIMazeRandomWalkLab() {
  const [steps, setSteps] = useState(18);
  const [seed, setSeed] = useState(11);
  const path = useMemo(() => {
    const random = sequence(seed, steps);
    const points: Array<[number, number]> = [[3, 3]];
    for (const value of random) {
      const [row, col] = points[points.length - 1];
      const direction = Math.floor(value * 4);
      const next: [number, number] = direction === 0 ? [Math.max(0, row - 1), col] : direction === 1 ? [row, Math.min(6, col + 1)] : direction === 2 ? [Math.min(6, row + 1), col] : [row, Math.max(0, col - 1)];
      points.push(next);
    }
    return points;
  }, [seed, steps]);
  const visited = new Set(path.map(([row, col]) => `${row}-${col}`));
  const current = path[path.length - 1];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">walk steps = {steps}<input className="mt-2 w-full accent-current" type="range" min="1" max="48" value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">seed = {seed}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label></div>
        <div className="mx-auto mt-4 grid max-w-sm grid-cols-7 gap-1">{Array.from({ length: 49 }, (_, index) => { const row = Math.floor(index / 7); const col = index % 7; const key = `${row}-${col}`; const isCurrent = current[0] === row && current[1] === col; return <div key={key} className={`aspect-square border ${isCurrent ? "border-accent bg-accent/40" : visited.has(key) ? "border-success bg-success/20" : "border-border bg-background"}`} />; })}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="unique cells" value={`${visited.size}`} tone="success" /><Stat label="coverage" value={`${(visited.size / 49 * 100).toFixed(1)}%`} /></div>
      </Panel>
      <Caption>At each maze crossroads a random walk chooses a direction locally; a seed makes the apparently random trajectory exactly reproducible.</Caption>
    </figure>
  );
}

export function CAIReservoirSamplingLab() {
  const [seen, setSeen] = useState(12);
  const [size, setSize] = useState(4);
  const random = useMemo(() => sequence(23, seen), [seen]);
  const reservoir: number[] = [];
  for (let item = 1; item <= seen; item += 1) {
    if (reservoir.length < size) reservoir.push(item);
    else {
      const index = Math.floor(random[item - 1] * item);
      if (index < size) reservoir[index] = item;
    }
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">stream items seen = {seen}<input className="mt-2 w-full accent-current" type="range" min="4" max="40" value={seen} onChange={(event) => setSeen(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">sample size k = {size}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex min-h-16 flex-wrap items-center justify-center gap-2 border border-success p-3">{reservoir.map((item) => <span key={item} className="border border-success px-3 py-2 font-mono text-success">{item}</span>)}</div>
        <div className="mt-3 text-center text-sm text-secondary">Each seen item has final inclusion probability k / n = {(Math.min(size, seen) / seen).toFixed(3)}.</div>
      </Panel>
      <Caption>Reservoir sampling keeps a uniform fixed-size sample from a stream whose final length may be unknown.</Caption>
    </figure>
  );
}

export function CAIExpectedRuntimeLab() {
  const [attempts, setAttempts] = useState(10);
  const ranks = useMemo(() => sequence(19, attempts).map((value) => 1 + Math.floor(value * 100)), [attempts]);
  const balanced = ranks.filter((rank) => rank >= 25 && rank <= 75).length;
  const firstBalanced = ranks.findIndex((rank) => rank >= 25 && rank <= 75);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">random pivot attempts = {attempts}<input className="mt-2 w-full accent-current" type="range" min="1" max="24" value={attempts} onChange={(event) => setAttempts(Number(event.target.value))} /></label>
        <div className="mt-4 flex h-20 items-end gap-1 border border-border p-2">{ranks.map((rank, index) => <div key={index} className={`flex-1 ${rank >= 25 && rank <= 75 ? "bg-success" : "bg-warning"}`} style={{ height: `${rank}%` }} title={`pivot rank ${rank}`} />)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="balanced pivots" value={`${balanced}/${attempts}`} tone="success" /><Stat label="first success" value={firstBalanced < 0 ? "none" : `try ${firstBalanced + 1}`} /><Stat label="worst one run" value="still possible" tone="warning" /></div>
      </Panel>
      <Caption>Expected complexity averages over internal random choices; it does not claim every run takes the average time.</Caption>
    </figure>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

export function CAIDominoProgressionLab() {
  const [samples, setSamples] = useState(4);
  const progression = Array.from({ length: 20 }, (_, index) => 7 + index * 6);
  const random = sequence(29, samples);
  const selected = [...new Set(random.map((value) => progression[Math.floor(value * progression.length)]))].sort((a, b) => a - b);
  const inferred = selected.slice(1).reduce((step, value, index) => gcd(step, value - selected[index]), 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">random domino probes = {samples}<input className="mt-2 w-full accent-current" type="range" min="2" max="16" value={samples} onChange={(event) => setSamples(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-2">{selected.map((value) => <span key={value} className="border border-accent px-3 py-2 font-mono text-accent">{value}</span>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="observed values" value={`${selected.length}`} /><Stat label="gcd of gaps" value={`${inferred || "?"}`} tone="warning" /><Stat label="true step" value="6" tone={inferred === 6 ? "success" : "danger"} /></div>
      </Panel>
      <Caption>Random probes can expose an arithmetic progression quickly, but finite evidence may infer a multiple of the true step; verification remains necessary.</Caption>
    </figure>
  );
}

export function CAILivingCostLab() {
  const costs = [42, 35, 61, 48, 39, 52, 44, 95, 37, 46, 58, 40, 49, 43, 55, 41, 47, 62, 38, 50];
  const [sampleSize, setSampleSize] = useState(5);
  const indices = [...new Set(sequence(37, 40).map((value) => Math.floor(value * costs.length)))].slice(0, sampleSize);
  const sample = indices.map((index) => costs[index]);
  const estimate = sample.reduce((sum, value) => sum + value, 0) / sample.length;
  const truth = costs.reduce((sum, value) => sum + value, 0) / costs.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">sampled expense days = {sampleSize}<input className="mt-2 w-full accent-current" type="range" min="2" max="15" value={sampleSize} onChange={(event) => setSampleSize(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-2">{sample.map((value, index) => <span key={`${indices[index]}-${value}`} className="border border-warning px-3 py-2 font-mono text-warning">¥{value}</span>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="sample mean" value={`¥${estimate.toFixed(1)}`} /><Stat label="full mean" value={`¥${truth.toFixed(1)}`} tone="success" /><Stat label="absolute error" value={`¥${Math.abs(estimate - truth).toFixed(1)}`} tone="warning" /></div>
      </Panel>
      <Caption>A random sample estimates a large population such as living expenses; sample size and outliers control the uncertainty.</Caption>
    </figure>
  );
}

function hashString(text: string, buckets: number) {
  let hash = 0;
  for (const char of text) hash = (Math.imul(hash, 131) + char.codePointAt(0)!) >>> 0;
  return hash % buckets;
}

export function CAIHashMappingLab() {
  const [buckets, setBuckets] = useState(7);
  const words = ["maze", "needle", "random", "sample", "greedy", "string", "number"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">hash buckets = {buckets}<input className="mt-2 w-full accent-current" type="range" min="3" max="13" value={buckets} onChange={(event) => setBuckets(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{words.map((word) => <div key={word} className="border border-border p-3"><div className="font-mono text-sm text-primary">{word}</div><div className="mt-1 text-xs text-secondary">→ bucket <span className="text-accent">{hashString(word, buckets)}</span></div></div>)}</div>
      </Panel>
      <Caption>A string hash folds an arbitrary-length character sequence into a fixed range; equal strings must agree, while different strings may collide.</Caption>
    </figure>
  );
}

export function CAIHashCollisionLab() {
  const [items, setItems] = useState(40);
  const [buckets, setBuckets] = useState(365);
  const exponent = -items * (items - 1) / (2 * buckets);
  const probability = 1 - Math.exp(exponent);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">inserted keys = {items}<input className="mt-2 w-full accent-current" type="range" min="2" max="100" value={items} onChange={(event) => setItems(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">bucket range = {buckets}<input className="mt-2 w-full accent-current" type="range" min="32" max="1024" step="16" value={buckets} onChange={(event) => setBuckets(Number(event.target.value))} /></label></div>
        <div className="mt-4 h-5 border border-border bg-background"><div className={`h-full ${probability < 0.25 ? "bg-success" : probability < 0.65 ? "bg-warning" : "bg-danger"}`} style={{ width: `${probability * 100}%` }} /></div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="load" value={(items / buckets).toFixed(3)} /><Stat label="collision chance" value={`${(probability * 100).toFixed(1)}%`} tone={probability < 0.25 ? "success" : "warning"} /><Stat label="zero collisions" value="not guaranteed" tone="danger" /></div>
      </Panel>
      <Caption>The birthday effect makes a collision likely long before the table is full; hash equality is never proof of string equality.</Caption>
    </figure>
  );
}

function randomGreedy(seed: number) {
  const candidates = sequence(seed, 8).map((value, index) => ({ id: index, score: Math.round(value * 9) + 1, conflict: index % 4 }));
  const selected: typeof candidates = [];
  for (const item of [...candidates].sort((a, b) => b.score - a.score)) if (!selected.some((current) => current.conflict === item.conflict)) selected.push(item);
  return { selected, score: selected.reduce((sum, item) => sum + item.score, 0) };
}

export function CAIRandomGreedyLab() {
  const [restarts, setRestarts] = useState(4);
  const runs = Array.from({ length: restarts }, (_, index) => randomGreedy(index + 1));
  const best = Math.max(...runs.map((run) => run.score));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">random greedy restarts = {restarts}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={restarts} onChange={(event) => setRestarts(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{runs.map((run, index) => <div key={index} className={`border p-3 text-center ${run.score === best ? "border-success text-success" : "border-border text-secondary"}`}><div className="text-xs">seed {index + 1}</div><div className="font-mono text-xl">{run.score}</div><div className="text-[10px]">{run.selected.map((item) => item.id).join(", ")}</div></div>)}</div>
      </Panel>
      <Caption>Random restarts diversify a greedy construction and keep the best verified result; they improve exploration but do not prove optimality.</Caption>
    </figure>
  );
}

export function CAIReproducibilityLab() {
  const [seed, setSeed] = useState(17);
  const values = sequence(seed, 6).map((value) => Math.floor(value * 100));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">recorded seed = {seed}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-6 gap-2">{values.map((value, index) => <div key={index} className="border border-accent p-2 text-center font-mono text-accent">{value}</div>)}</div>
        <div className="mt-3 text-sm text-secondary">Same generator + same seed + same call order = same sequence and reproducible failure.</div>
      </Panel>
      <Caption>Logging the seed turns a random counterexample into a deterministic regression test.</Caption>
    </figure>
  );
}
