"use client";

import { useState } from "react";

const scientificStages = [
  { name: "observe", evidence: "repeatable timing + input generator", question: "what changes with N?" },
  { name: "hypothesize", evidence: "T(N) ~ a N^b", question: "which exponent fits ratios?" },
  { name: "predict", evidence: "estimate unseen input time", question: "does doubling multiply by 2^b?" },
  { name: "verify", evidence: "new sizes + residuals", question: "where does the model fail?" },
] as const;

export function Algs4ScientificMethodCycle() {
  const [stage, setStage] = useState(1);
  const active = scientificStages[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {scientificStages.map((item, index) => <button key={item.name} type="button" onClick={() => setStage(index)} className={"min-h-11 border text-[10px] font-semibold sm:text-xs " + (stage === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{index + 1}. {item.name}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">evidence<div className="mt-1 font-mono text-success">{active.evidence}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">challenge<div className="mt-1 font-mono text-warning">{active.question}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Algorithm analysis反复连接measurement与model；新observations必须能推翻旧hypothesis。
      </figcaption>
    </figure>
  );
}

export function Algs4DoublingRatioLab() {
  const [exponent, setExponent] = useState(3);
  const [n, setN] = useState(1000);
  const coefficient = 1e-9;
  const time = coefficient * n ** exponent;
  const doubled = coefficient * (2 * n) ** exponent;
  const ratio = doubled / time;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-semibold text-primary">exponent b = {exponent}<input className="mt-2 w-full accent-current" type="range" min="1" max="4" step="0.5" value={exponent} onChange={(event) => setExponent(Number(event.target.value))} /></label>
          <label className="text-xs font-semibold text-primary">N = {n}<input className="mt-2 w-full accent-current" type="range" min="250" max="4000" step="250" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">T(N)<div className="font-mono text-primary">{time.toFixed(3)}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">T(2N)<div className="font-mono text-primary">{doubled.toFixed(3)}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">ratio<div className="font-mono text-success">{ratio.toFixed(2)} = 2^{exponent}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        若dominant model为aN^b，doubling ratio趋近2^b；startup与noise会扭曲小N。
      </figcaption>
    </figure>
  );
}

function choose3(n: number) {
  return (n * (n - 1) * (n - 2)) / 6;
}

export function Algs4ThreeSumFrequencyLab() {
  const [n, setN] = useState(8);
  const triples = choose3(n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">array length N = {n}<input className="mt-2 w-full accent-current" type="range" min="3" max="30" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">i choices<div className="font-mono text-primary">{n}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">ordered indices<div className="font-mono text-accent">i &lt; j &lt; k</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">sum tests<div className="font-mono text-success">{triples.toLocaleString()}</div></div>
        </div>
        <div className="mt-2 border border-warning bg-warning/10 p-3 font-mono text-xs text-warning">N(N-1)(N-2)/6 = {triples}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Frequency count来自合法index triples数量，leading term是N^3/6。
      </figcaption>
    </figure>
  );
}

type GrowthKind = "log N" | "N" | "N log N" | "N^2" | "N^3";

function growth(kind: GrowthKind, n: number) {
  if (kind === "log N") return Math.log2(n);
  if (kind === "N") return n;
  if (kind === "N log N") return n * Math.log2(n);
  if (kind === "N^2") return n * n;
  return n * n * n;
}

export function Algs4GrowthModelLab() {
  const [n, setN] = useState(1024);
  const kinds: GrowthKind[] = ["log N", "N", "N log N", "N^2", "N^3"];
  const values = kinds.map((kind) => ({ kind, value: growth(kind, n) }));
  const maxLog = Math.max(...values.map((item) => Math.log10(item.value + 1)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">N = {n}<input className="mt-2 w-full accent-current" type="range" min="16" max="4096" step="16" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">
          {values.map((item) => <div key={item.kind} className="grid grid-cols-[70px_1fr_95px] items-center gap-2 text-xs"><span className="font-mono text-secondary">{item.kind}</span><div className="h-6 border border-border bg-background"><div className="h-full bg-accent/40" style={{ width: `${(Math.log10(item.value + 1) / maxLog) * 100}%` }} /></div><span className="text-right font-mono text-primary">{item.value.toExponential(2)}</span></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对数宽度仅用于同时显示多种growth；实际operation counts差距会比bar视觉更大。
      </figcaption>
    </figure>
  );
}

export function Algs4FasterAlgorithmLab() {
  const [n, setN] = useState(1000);
  const cubic = choose3(n);
  const fast = (n * (n - 1) / 2) * Math.ceil(Math.log2(n));
  const speedup = cubic / fast;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">distinct integers N = {n}<input className="mt-2 w-full accent-current" type="range" min="100" max="5000" step="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">ThreeSum sum tests<div className="mt-1 font-mono text-warning">{cubic.toExponential(3)}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">ThreeSumFast search compares<div className="mt-1 font-mono text-success">{fast.toExponential(3)}</div></div>
        </div>
        <div className="mt-2 border border-accent bg-accent/10 p-3 text-center font-mono text-xs text-accent">model ratio ~ {speedup.toFixed(1)}x</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Sorting加pair enumeration与binary search把cubic降到N^2 log N，但新增distinct-input契约。
      </figcaption>
    </figure>
  );
}

type MemoryCase = "int array" | "double array" | "object array" | "linked nodes";

const memoryCases = {
  "int array": { header: 16, perItem: 4, references: 0, note: "primitive values inline" },
  "double array": { header: 16, perItem: 8, references: 0, note: "8-byte primitive values" },
  "object array": { header: 16, perItem: 8, references: 1, note: "references only; objects separate" },
  "linked nodes": { header: 16, perItem: 32, references: 2, note: "item + next + object overhead" },
} as const;

function align8(value: number) {
  return Math.ceil(value / 8) * 8;
}

export function Algs4MemoryModelLab() {
  const [kind, setKind] = useState<MemoryCase>("linked nodes");
  const [n, setN] = useState(10);
  const active = memoryCases[kind];
  const bytes = align8(active.header + active.perItem * n);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={kind} onChange={(event) => setKind(event.target.value as MemoryCase)}>
          {(Object.keys(memoryCases) as MemoryCase[]).map((candidate) => <option key={candidate}>{candidate}</option>)}
        </select>
        <label className="mt-4 block text-sm font-semibold text-primary">items N = {n}<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">model bytes<div className="font-mono text-primary">{bytes}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">refs/item<div className="font-mono text-accent">{active.references}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">layout<div className="font-mono text-success">{active.note}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        这是64-bit teaching model；真实object headers、compressed oops与alignment必须按目标VM测量。
      </figcaption>
    </figure>
  );
}
