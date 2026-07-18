"use client";

import { useState } from "react";

type AmortizedMethod = "aggregate" | "accounting" | "potential";

export function DsaAmortizedMethodsLab() {
  const [method, setMethod] = useState<AmortizedMethod>("potential");
  const details = {
    aggregate: { unit: "total cost / operation count", invariant: "bound whole sequence directly" },
    accounting: { unit: "charge cheap ops extra credits", invariant: "stored credit never negative" },
    potential: { unit: "actual + Phi(after) - Phi(before)", invariant: "Phi starts at 0 and stays nonnegative" },
  }[method];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["aggregate", "accounting", "potential"] as AmortizedMethod[]).map((candidate) => <button key={candidate} type="button" onClick={() => setMethod(candidate)} className={"min-h-10 border text-xs font-semibold " + (method === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">amortized unit<div className="mt-1 font-mono text-primary">{details.unit}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">proof obligation<div className="mt-1 font-mono text-success">{details.invariant}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Amortized analysis对任意operation sequence给deterministic average，不是输入概率平均。</figcaption>
    </figure>
  );
}

export function DsaUnrelatedPuzzleLab() {
  const [distance, setDistance] = useState(100);
  const approachingSpeed = 20;
  const runnerSpeed = 100;
  const minutes = distance / approachingSpeed;
  const runnerDistance = minutes * runnerSpeed;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">initial separation = {distance} yards<input className="mt-2 w-full accent-current" type="range" min="20" max="200" step="20" value={distance} onChange={(event) => setDistance(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">meeting time<div className="mt-1 font-mono text-primary">{minutes} min</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-secondary">runner speed<div className="mt-1 font-mono text-accent">{runnerSpeed} yd/min</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">total distance<div className="mt-1 font-mono text-success">{runnerDistance} yd</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">原书谜题引入time这个额外变量，绕开逐段求无限往返距离；potential也以间接变量简化sequence证明。</figcaption>
    </figure>
  );
}

export function DsaBinomialPotentialLab() {
  const [size, setSize] = useState(7);
  const nextSize = size + 1;
  const beforeTrees = size.toString(2).split("").filter((bit) => bit === "1").length;
  const afterTrees = nextSize.toString(2).split("").filter((bit) => bit === "1").length;
  const links = Math.max(0, beforeTrees + 1 - afterTrees);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">queue size before insert = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max="31" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">before bits<div className="mt-1 font-mono text-primary">{size.toString(2)} ({beforeTrees} trees)</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">tree links<div className="mt-1 font-mono text-warning">{links}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">after bits<div className="mt-1 font-mono text-success">{nextSize.toString(2)} ({afterTrees} trees)</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Binomial insert像binary increment；长carry虽贵，却显著减少root-tree potential。</figcaption>
    </figure>
  );
}

export function DsaSkewHeapPotentialLab() {
  const [rightPath, setRightPath] = useState(5);
  const heavyBefore = Math.max(0, rightPath - 2);
  const heavyAfter = Math.floor(rightPath / 2);
  const potentialDrop = heavyBefore - heavyAfter;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">merge right-path nodes = {rightPath}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={rightPath} onChange={(event) => setRightPath(Number(event.target.value))} /></label>
        <div className="mt-4 flex gap-1">{Array.from({ length: rightPath }, (_, index) => <span key={index} className={"h-10 flex-1 border " + (index < heavyBefore ? "border-warning bg-warning/20" : "border-success bg-success/10")} />)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-2 text-secondary">actual path <strong className="font-mono text-primary">{rightPath}</strong></div>
          <div className="border border-warning bg-warning/10 p-2 text-secondary">heavy before <strong className="font-mono text-warning">{heavyBefore}</strong></div>
          <div className="border border-success bg-success/10 p-2 text-secondary">potential drop <strong className="font-mono text-success">{potentialDrop}</strong></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Skew-heap merge沿right paths付actual cost；child swaps让许多heavy nodes转light，势能下降支付工作。</figcaption>
    </figure>
  );
}

type FibonacciOperation = "insert" | "decrease-key" | "delete-min";

export function DsaFibonacciHeapPotentialLab() {
  const [operation, setOperation] = useState<FibonacciOperation>("decrease-key");
  const rows = {
    insert: { actual: 1, rootsBefore: 3, rootsAfter: 4, markedBefore: 1, markedAfter: 1, result: "O(1) amortized" },
    "decrease-key": { actual: 3, rootsBefore: 3, rootsAfter: 5, markedBefore: 2, markedAfter: 0, result: "O(1) amortized" },
    "delete-min": { actual: 9, rootsBefore: 6, rootsAfter: 3, markedBefore: 1, markedAfter: 1, result: "O(log N) amortized" },
  }[operation];
  const phiBefore = rows.rootsBefore + 2 * rows.markedBefore;
  const phiAfter = rows.rootsAfter + 2 * rows.markedAfter;
  const amortized = rows.actual + phiAfter - phiBefore;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["insert", "decrease-key", "delete-min"] as FibonacciOperation[]).map((candidate) => <button key={candidate} type="button" onClick={() => setOperation(candidate)} className={"min-h-11 border px-1 text-[10px] font-semibold sm:text-xs " + (operation === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1 text-[10px] sm:text-xs">
          <div className="border border-border bg-background p-2 text-secondary">actual<div className="font-mono text-primary">{rows.actual}</div></div>
          <div className="border border-border bg-background p-2 text-secondary">Phi before<div className="font-mono text-primary">{phiBefore}</div></div>
          <div className="border border-border bg-background p-2 text-secondary">Phi after<div className="font-mono text-primary">{phiAfter}</div></div>
          <div className="border border-success bg-success/10 p-2 text-success">amortized<div className="font-mono">{amortized}</div></div>
        </div>
        <div className="mt-3 border border-accent bg-accent/10 p-3 text-center font-mono text-xs text-accent">{rows.result}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Fibonacci heap用Phi=trees+2*marked把lazy roots与未来cascading cuts记作势能。</figcaption>
    </figure>
  );
}

export function DsaSplayPotentialLab() {
  const [caseName, setCaseName] = useState<"zig" | "zig-zig" | "zig-zag">("zig-zig");
  const details = {
    zig: { rotations: 1, before: "x child of root", after: "x becomes root" },
    "zig-zig": { rotations: 2, before: "x,p,g aligned", after: "two same-direction rotations" },
    "zig-zag": { rotations: 2, before: "x,p,g alternate", after: "two opposite rotations" },
  }[caseName];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["zig", "zig-zig", "zig-zag"] as const).map((candidate) => <button key={candidate} type="button" onClick={() => setCaseName(candidate)} className={"min-h-10 border text-xs font-semibold " + (caseName === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">before<div className="mt-1 font-mono text-primary">{details.before}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">actual rotations<div className="mt-1 font-mono text-warning">{details.rotations}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">after<div className="mt-1 font-mono text-success">{details.after}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Splay access lemma用subtree-size ranks的势能变化支付多次rotations，得到amortized logarithmic access。</figcaption>
    </figure>
  );
}
