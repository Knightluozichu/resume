"use client";

import { useState } from "react";

type DesignTechnique = "greedy" | "divide" | "dynamic" | "randomized" | "backtracking";

export function DsaDesignTechniqueMapLab() {
  const [technique, setTechnique] = useState<DesignTechnique>("dynamic");
  const details = {
    greedy: { decision: "commit one locally best choice", revisit: "never", proof: "exchange / cut property" },
    divide: { decision: "split independent subproblems", revisit: "combine results", proof: "recurrence + induction" },
    dynamic: { decision: "reuse overlapping states", revisit: "table/memo", proof: "optimal substructure" },
    randomized: { decision: "sample internal choice", revisit: "repeat trials", proof: "probability bound" },
    backtracking: { decision: "enumerate feasible branches", revisit: "undo on return", proof: "exhaustive search + pruning safety" },
  }[technique];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={technique} onChange={(event) => setTechnique(event.target.value as DesignTechnique)}>
          {(["greedy", "divide", "dynamic", "randomized", "backtracking"] as DesignTechnique[]).map((candidate) => <option key={candidate}>{candidate}</option>)}
        </select>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">choice<div className="mt-1 font-mono text-primary">{details.decision}</div></div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">state reuse<div className="mt-1 font-mono text-accent">{details.revisit}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">proof handle<div className="mt-1 font-mono text-success">{details.proof}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Design technique 是组织choices与subproblems的方法，不是只看loop或recursion外形。</figcaption>
    </figure>
  );
}

const coinCases = {
  canonical: { coins: [25, 10, 5, 1], amount: 30, greedy: [25, 5], optimal: [25, 5] },
  counterexample: { coins: [4, 3, 1], amount: 6, greedy: [4, 1, 1], optimal: [3, 3] },
} as const;

export function DsaGreedyExchangeLab() {
  const [kind, setKind] = useState<keyof typeof coinCases>("counterexample");
  const active = coinCases[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(coinCases) as (keyof typeof coinCases)[]).map((candidate) => <button key={candidate} type="button" onClick={() => setKind(candidate)} className={"min-h-11 border text-xs font-semibold " + (kind === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 border border-border bg-background p-3 font-mono text-xs text-secondary">coins {active.coins.join(", ")}; amount {active.amount}</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">greedy<div className="mt-1 font-mono text-warning">{active.greedy.join(" + ")} ({active.greedy.length})</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">optimal<div className="mt-1 font-mono text-success">{active.optimal.join(" + ")} ({active.optimal.length})</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Greedy choice需要exchange argument或结构定理；在一个coin system有效不代表普遍正确。</figcaption>
    </figure>
  );
}

type RecurrenceCase = "binary" | "linear combine" | "unbalanced";

export function DsaDivideConquerRecurrenceLab() {
  const [kind, setKind] = useState<RecurrenceCase>("binary");
  const details = {
    binary: { formula: "2T(N/2) + O(N)", result: "O(N log N)", example: "mergesort" },
    "linear combine": { formula: "2T(N/2) + O(1)", result: "O(N)", example: "tree aggregation" },
    unbalanced: { formula: "T(N-1) + O(N)", result: "O(N^2)", example: "bad quicksort pivot" },
  }[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(["binary", "linear combine", "unbalanced"] as RecurrenceCase[]).map((candidate) => <button key={candidate} type="button" onClick={() => setKind(candidate)} className={"min-h-11 border px-1 text-[10px] font-semibold sm:text-xs " + (kind === candidate ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{candidate}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 font-mono text-xs text-primary">{details.formula}</div>
          <div className="border border-success bg-success/10 p-3 font-mono text-xs text-success">{details.result}</div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-accent">{details.example}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Divide-and-conquer成本由subproblem数量、size与combine work共同决定；“递归”本身不给出复杂度。</figcaption>
    </figure>
  );
}

const matrixChainCells = [
  { span: 1, cells: "m[1,1]...m[4,4]", meaning: "base cost 0" },
  { span: 2, cells: "m[1,2], m[2,3], m[3,4]", meaning: "one split each" },
  { span: 3, cells: "m[1,3], m[2,4]", meaning: "compare two split points" },
  { span: 4, cells: "m[1,4]", meaning: "global optimum + lastChange" },
] as const;

export function DsaDynamicProgrammingTableLab() {
  const [span, setSpan] = useState(2);
  const cell = matrixChainCells[span - 1];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">chain span = {span}<input className="mt-2 w-full accent-current" type="range" min="1" max="4" value={span} onChange={(event) => setSpan(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <div className="border border-border bg-background p-3 font-mono text-xs text-primary">{cell.cells}</div>
          <div className="border border-success bg-success/10 p-3 text-xs text-success">{cell.meaning}</div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1">{matrixChainCells.map((item) => <div key={item.span} className={"h-8 border " + (item.span <= span ? "border-accent bg-accent/20" : "border-border bg-background")} />)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Matrix-chain DP按subchain length填上三角table，lastChange另存最优split以重建parenthesization。</figcaption>
    </figure>
  );
}

export function DsaRandomizedConfidenceLab() {
  const [trials, setTrials] = useState(5);
  const oneSidedError = 0.25 ** trials;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">independent witness trials = {trials}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={trials} onChange={(event) => setTrials(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">composite witness<div className="mt-1 font-mono text-success">definitely composite</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">all trials pass<div className="mt-1 font-mono text-warning">error at most {oneSidedError.toExponential(2)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Independent one-sided tests multiply error probability；seed、independence与arithmetic overflow仍属于correctness contract。</figcaption>
    </figure>
  );
}

const backtrackingFrames = [
  { placed: ["r1:c2"], pruned: 0, frontier: 3 },
  { placed: ["r1:c2", "r2:c4"], pruned: 2, frontier: 2 },
  { placed: ["r1:c2", "r2:c4", "r3:c1"], pruned: 4, frontier: 1 },
  { placed: ["r1:c2", "r2:c4", "r3:c1", "r4:c3"], pruned: 5, frontier: 0 },
] as const;

export function DsaBacktrackingSearchLab() {
  const [step, setStep] = useState(1);
  const frame = backtrackingFrames[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">search depth = {step + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={backtrackingFrames.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 flex flex-wrap gap-2">{frame.placed.map((item) => <span key={item} className="border border-success bg-success/10 px-3 py-2 font-mono text-xs text-success">{item}</span>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-warning bg-warning/10 p-3 text-secondary">pruned branches<div className="mt-1 font-mono text-warning">{frame.pruned}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">remaining frontier<div className="mt-1 font-mono text-primary">{frame.frontier}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Backtracking维护partial assignment，冲突时undo；安全pruning不能删除任何可扩展为solution的branch。</figcaption>
    </figure>
  );
}
