"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function choose(n: number, k: number) {
  let result = 1;
  for (let i = 1; i <= Math.min(k, n - k); ++i) result = result * (n - i + 1) / i;
  return result;
}

export function PP2ProblemRefinementLab() {
  const [n, setN] = useState(200);
  const [m, setM] = useState(20);
  const [mode, setMode] = useState<"names" | "positions">("names");
  const typed = mode === "names" ? n * 12 : String(n).length + String(m).length + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">precincts n = {n}<input className="mt-2 w-full accent-current" type="range" min="20" max="1000" step="10" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value - 1)); }} /></label><label className="text-xs text-secondary">sample m = {m}<input className="mt-2 w-full accent-current" type="range" min="1" max={Math.max(1, n - 1)} value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
        <label className="mt-3 block text-xs text-secondary">program boundary<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="names">type every precinct name</option><option value="positions">input m,n and mark printed list</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-warning p-3 text-warning">input characters <span className="float-right font-mono">≈ {typed.toLocaleString()}</span></div><div className="border border-success p-3 text-success">unused names avoided <span className="float-right font-mono">{mode === "positions" ? n - m : 0}</span></div></div>
      </Panel>
      <Caption>Reframing the interface removes hundreds of error-prone names: the program emits positions that users mark on the existing printed list.</Caption>
    </figure>
  );
}

export function PP2SequentialSelectionLab() {
  const [n, setN] = useState(12);
  const [m, setM] = useState(4);
  const [i, setI] = useState(0);
  const remaining = n - i;
  const required = Math.min(m, remaining);
  const probability = remaining > 0 ? required / remaining : 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="24" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value)); setI(Math.min(i, value - 1)); }} /></label><label className="text-xs text-secondary">still need m = {m}<input className="mt-2 w-full accent-current" type="range" min="0" max={n} value={m} onChange={(event) => setM(Number(event.target.value))} /></label><label className="text-xs text-secondary">candidate i = {i}<input className="mt-2 w-full accent-current" type="range" min="0" max={n - 1} value={i} onChange={(event) => setI(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-6 gap-1 sm:grid-cols-12">{Array.from({ length: n }, (_, value) => <div key={value} className={"border p-2 text-center font-mono text-xs " + (value < i ? "border-border text-secondary" : value === i ? "border-warning text-warning" : "border-accent text-accent")}>{value}</div>)}</div>
        <div className="mt-3 border border-success p-3 text-success">select current with probability <span className="float-right font-mono">{required}/{remaining} = {probability.toFixed(3)}</span></div>
      </Panel>
      <Caption>At candidate i, choose exactly m of the remaining n-i positions; when required equals remaining, every remaining position is forced.</Caption>
    </figure>
  );
}

export function PP2SamplingInvariantLab() {
  const [remaining, setRemaining] = useState(10);
  const [select, setSelect] = useState(3);
  const valid = select >= 0 && select <= remaining;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">remaining = {remaining}<input className="mt-2 w-full accent-current" type="range" min="0" max="20" value={remaining} onChange={(event) => setRemaining(Number(event.target.value))} /></label><label className="text-xs text-secondary">select = {select}<input className="mt-2 w-full accent-current" type="range" min="0" max="20" value={select} onChange={(event) => setSelect(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex h-10 border border-border">{remaining > 0 ? <><div className="flex items-center justify-center bg-success/20 text-xs text-success" style={{ width: `${Math.min(100, select / remaining * 100)}%` }}>select</div><div className="flex flex-1 items-center justify-center bg-background text-xs text-secondary">skip</div></> : null}</div>
        <div className={"mt-3 border p-3 " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? "0 ≤ select ≤ remaining; exact completion remains possible." : "Invariant broken: the requested sample cannot be completed."}</div>
      </Panel>
      <Caption>The state invariant guarantees exact cardinality: selection stops at zero, while select = remaining forces every final candidate.</Caption>
    </figure>
  );
}

export function PP2UniformSubsetLab() {
  const [n, setN] = useState(8);
  const [m, setM] = useState(3);
  const subsets = choose(n, m);
  const probability = 1 / subsets;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="20" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value - 1)); }} /></label><label className="text-xs text-secondary">m = {m}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">valid subsets <span className="float-right font-mono">{Math.round(subsets).toLocaleString()}</span></div><div className="border border-success p-3 text-success">each subset <span className="float-right font-mono">{probability.toExponential(3)}</span></div><div className="border border-warning p-3 text-warning">each item marginal <span className="float-right font-mono">{(m / n).toFixed(3)}</span></div></div>
      </Panel>
      <Caption>Uniform subset selection is stronger than equal marginal inclusion: every one of the C(n,m) subsets must receive exactly the same probability.</Caption>
    </figure>
  );
}

export function PP2SetRejectionLab() {
  const [n, setN] = useState(1000);
  const [m, setM] = useState(100);
  let expectedDraws = 0;
  for (let size = 0; size < m; ++size) expectedDraws += n / (n - size);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">universe n = {n}<input className="mt-2 w-full accent-current" type="range" min="10" max="5000" step="10" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value - 1)); }} /></label><label className="text-xs text-secondary">sample m = {m}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-success p-3 text-success">accepted <span className="float-right font-mono">{m}</span></div><div className="border border-warning p-3 text-warning">expected draws <span className="float-right font-mono">{expectedDraws.toFixed(1)}</span></div><div className="border border-danger p-3 text-danger">duplicates <span className="float-right font-mono">{(expectedDraws - m).toFixed(1)}</span></div></div>
      </Panel>
      <Caption>Set rejection is attractive when m is small relative to n; as occupancy approaches one, duplicate draws dominate.</Caption>
    </figure>
  );
}

export function PP2PartialShuffleLab() {
  const [n, setN] = useState(1000000);
  const [m, setM] = useState(1000);
  const memoryMiB = n * 4 / 1024 / 1024;
  const work = n + m + m * Math.log2(Math.max(2, m));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="5000000" step="1000" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value - 1)); }} /></label><label className="text-xs text-secondary">m = {m.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} step="100" value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">initialize <span className="float-right font-mono">n</span></div><div className="border border-warning p-3 text-warning">partial swaps <span className="float-right font-mono">{m.toLocaleString()}</span></div><div className="border border-danger p-3 text-danger">array memory <span className="float-right font-mono">{memoryMiB.toFixed(1)} MiB</span></div></div>
        <div className="mt-3 text-xs text-secondary">illustrative operation model: {Math.round(work).toLocaleString()}</div>
      </Panel>
      <Caption>Partial Fisher-Yates uses exactly m random swaps but still initializes and stores all n integers, then sorts the selected prefix.</Caption>
    </figure>
  );
}

export function PP2ComplementLab() {
  const [n, setN] = useState(1000000);
  const [missing, setMissing] = useState(10);
  const selected = n - missing;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">universe n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="2000000" step="1000" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setMissing(Math.min(missing, value - 1)); }} /></label><label className="text-xs text-secondary">excluded k = {missing}<input className="mt-2 w-full accent-current" type="range" min="1" max={Math.min(1000, n - 1)} value={missing} onChange={(event) => setMissing(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-3 text-danger">sample selected set <span className="float-right font-mono">m = {selected.toLocaleString()}</span></div><div className="border border-success p-3 text-success">sample complement <span className="float-right font-mono">k = {missing}</span></div></div>
      </Panel>
      <Caption>When m is near n, generate the small excluded set uniformly and report its complement; the distribution remains uniform by bijection.</Caption>
    </figure>
  );
}

export function PP2FloydLab() {
  const [n, setN] = useState(20);
  const [m, setM] = useState(6);
  const [iteration, setIteration] = useState(0);
  const j = n - m + iteration;
  const selected = Math.min(iteration, m);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="50" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value - 1)); setIteration(0); }} /></label><label className="text-xs text-secondary">m = {m}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} value={m} onChange={(event) => { setM(Number(event.target.value)); setIteration(0); }} /></label><label className="text-xs text-secondary">iteration = {iteration}<input className="mt-2 w-full accent-current" type="range" min="0" max={m} value={iteration} onChange={(event) => setIteration(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">current j <span className="float-right font-mono">{Math.min(j, n - 1)}</span></div><div className="border border-success p-3 text-success">set size <span className="float-right font-mono">{selected}</span></div><div className="border border-warning p-3 text-warning">random draws <span className="float-right font-mono">{iteration}</span></div></div>
        <div className="mt-3 border border-border p-3 text-xs text-secondary">Draw t from 0..j. Insert t if absent; otherwise insert j, which cannot already be in the prior set.</div>
      </Panel>
      <Caption>Floyd’s algorithm grows a uniform j-sized universe one step at a time and uses exactly m random draws, with collision fallback preserving cardinality.</Caption>
    </figure>
  );
}

export function PP2DesignSpaceLab() {
  const [n, setN] = useState(1000000);
  const [m, setM] = useState(1000);
  const density = m / n;
  const choice = density > 0.9 ? "sample complement" : n < 100000 ? "Knuth sequential" : density < 0.02 ? "Floyd or ordered set" : "measure sequential vs Floyd";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="5000000" step="1000" value={n} onChange={(event) => { const value = Number(event.target.value); setN(value); setM(Math.min(m, value - 1)); }} /></label><label className="text-xs text-secondary">m = {m.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} step="100" value={m} onChange={(event) => setM(Number(event.target.value))} /></label></div>
        <div className="mt-4 border border-accent p-4 text-accent"><div className="text-xs">candidate to prototype</div><div className="mt-1 text-xl font-semibold">{choice}</div></div>
        <div className="mt-3 text-xs text-secondary">density = {(density * 100).toFixed(3)}%; output must be sorted, distinct, and uniform over subsets.</div>
      </Panel>
      <Caption>No one implementation dominates every m,n pair; output order, memory, random draws, data structures, and density define the design space.</Caption>
    </figure>
  );
}

export function PP2ProcessLab() {
  const stages = ["perceived problem", "abstract problem", "design space", "one implementation", "retrospect"];
  const [stage, setStage] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">design stage = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">{stages.map((name, index) => <div key={name} className={"border p-3 text-center text-xs " + (index === stage ? "border-accent text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono">{index + 1}</div><div className="mt-1">{name}</div></div>)}</div>
        <div className="mt-3 border border-warning p-3 text-sm text-warning">The real process iterates: evidence can send the design back to any earlier stage.</div>
      </Panel>
      <Caption>Column 12 names five stages but rejects a rigid waterfall; programmers move among them until the problem and solution fit.</Caption>
    </figure>
  );
}

export function PP2SampleCertificateLab() {
  const [missing, setMissing] = useState<"none" | "cardinality" | "uniformity" | "range" | "rng">("none");
  const checks = { range: missing !== "range", distinct: true, cardinality: missing !== "cardinality", sorted: true, uniformity: missing !== "uniformity", rng: missing !== "rng" };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">sample review<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={missing} onChange={(event) => setMissing(event.target.value as typeof missing)}><option value="none">complete evidence</option><option value="cardinality">exact m not proven</option><option value="uniformity">subset distribution not tested</option><option value="range">boundary range missing</option><option value="rng">modulo bias or RNG contract unknown</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The sampling implementation satisfies its contract." : "The sampling claim is missing required evidence."}</div>
      </Panel>
      <Caption>A sample is releasable only when range, distinctness, exact cardinality, order, uniform subsets, and the random-number contract are all evidenced.</Caption>
    </figure>
  );
}
