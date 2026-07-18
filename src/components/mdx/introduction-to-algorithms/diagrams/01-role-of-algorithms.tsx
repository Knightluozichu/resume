"use client";

import { useState, type ReactNode } from "react";

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

export function CLRS4ProblemContractLab() {
  const [problem, setProblem] = useState<"sorting" | "shortest path" | "matching">("sorting");
  const contracts = {
    sorting: ["sequence of comparable keys", "permutation in nondecreasing order", "preserve multiplicity"],
    "shortest path": ["weighted graph, source, target", "minimum-weight valid path", "respect edge direction and weights"],
    matching: ["bipartite graph", "largest set of vertex-disjoint edges", "each vertex used at most once"],
  }[problem];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">computational problem<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={problem} onChange={(event) => setProblem(event.target.value as typeof problem)}><option value="sorting">sorting</option><option value="shortest path">shortest path</option><option value="matching">bipartite matching</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="input contract" value={contracts[0]} /><Stat label="required output" value={contracts[1]} tone="success" /><Stat label="correctness condition" value={contracts[2]} tone="warning" /></div>
      </Panel>
      <Caption>A computational problem describes an input-output relation for every valid instance; one sample is not the problem itself.</Caption>
    </figure>
  );
}

export function CLRS4SortingInstanceLab() {
  const values = [8, 2, 4, 9, 3, 6, 1, 5];
  const [size, setSize] = useState(values.length);
  const input = values.slice(0, size);
  const output = [...input].sort((a, b) => a - b);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">sorting instance size n = {size}<input className="mt-2 w-full accent-current" type="range" min="2" max={values.length} value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="flex flex-wrap gap-1 border border-warning p-3">{input.map((value, index) => <span key={`${value}-${index}`} className="border border-warning px-2 py-1 font-mono text-warning">{value}</span>)}</div><div className="text-center text-xl text-secondary">→</div><div className="flex flex-wrap gap-1 border border-success p-3">{output.map((value, index) => <span key={`${value}-${index}`} className="border border-success px-2 py-1 font-mono text-success">{value}</span>)}</div></div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="input count" value={`${input.length}`} /><Stat label="output count" value={`${output.length}`} tone="success" /><Stat label="ordered" value="yes" tone="success" /></div>
      </Panel>
      <Caption>Sorting output must be ordered and a permutation of the input; either property alone is insufficient.</Caption>
    </figure>
  );
}

export function CLRS4CorrectnessLab() {
  const [candidate, setCandidate] = useState<"correct" | "drop duplicate" | "change value" | "unsorted">("correct");
  const outputs = {
    correct: [1, 2, 2, 5],
    "drop duplicate": [1, 2, 5],
    "change value": [1, 2, 3, 5],
    unsorted: [1, 5, 2, 2],
  };
  const input = [5, 2, 1, 2];
  const output = outputs[candidate];
  const ordered = output.every((value, index) => index === 0 || output[index - 1] <= value);
  const sameBag = [...input].sort((a, b) => a - b).join(",") === [...output].sort((a, b) => a - b).join(",");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate output<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={candidate} onChange={(event) => setCandidate(event.target.value as typeof candidate)}><option value="correct">correct</option><option value="drop duplicate">drop duplicate</option><option value="change value">change value</option><option value="unsorted">unsorted</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="ordered" value={ordered ? "pass" : "fail"} tone={ordered ? "success" : "danger"} /><Stat label="same multiset" value={sameBag ? "pass" : "fail"} tone={sameBag ? "success" : "danger"} /><Stat label="algorithm result" value={ordered && sameBag ? "accept" : "reject"} tone={ordered && sameBag ? "success" : "danger"} /></div>
      </Panel>
      <Caption>Correctness is a conjunction of obligations; a checker that tests only sortedness accepts outputs that lose or invent data.</Caption>
    </figure>
  );
}

export function CLRS4EfficiencyScaleLab() {
  const [power, setPower] = useState(4);
  const n = 10 ** power;
  const counts = [
    ["n", n],
    ["n log₂ n", Math.round(n * Math.log2(n))],
    ["n²", n ** 2],
    ["2ⁿ", Number.POSITIVE_INFINITY],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">input size n = 10^{power}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{counts.map(([name, count], index) => <Stat key={name} label={name} value={Number.isFinite(count) ? count.toLocaleString() : "infeasible"} tone={index < 2 ? "success" : index === 2 ? "warning" : "danger"} />)}</div>
      </Panel>
      <Caption>As input grows, the growth function dominates constants: linear and near-linear work remain feasible long after quadratic or exponential work fails.</Caption>
    </figure>
  );
}

export function CLRS4HardwareVsAlgorithmLab() {
  const [power, setPower] = useState(6);
  const n = 10 ** power;
  const fastMachineRate = 1_000_000_000;
  const slowMachineRate = 10_000_000;
  const quadraticSeconds = n ** 2 / fastMachineRate;
  const nlognSeconds = 50 * n * Math.log2(n) / slowMachineRate;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">input size n = {n.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="2" max="8" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-warning p-4"><div className="text-sm text-warning">fast hardware · n² algorithm</div><div className="mt-2 font-mono text-2xl text-warning">{quadraticSeconds.toLocaleString(undefined, { maximumFractionDigits: 2 })} s</div><div className="text-xs text-secondary">1 billion work units/s</div></div><div className="border border-success p-4"><div className="text-sm text-success">slower hardware · 50n log n algorithm</div><div className="mt-2 font-mono text-2xl text-success">{nlognSeconds.toLocaleString(undefined, { maximumFractionDigits: 2 })} s</div><div className="text-xs text-secondary">10 million work units/s</div></div></div>
      </Panel>
      <Caption>A better growth rate can beat a hundred-times faster machine; algorithm choice is a durable technology multiplier.</Caption>
    </figure>
  );
}

export function CLRS4AlgorithmsEverywhereMap() {
  const [domain, setDomain] = useState<"internet" | "biology" | "commerce" | "manufacturing">("internet");
  const rows = {
    internet: ["routing and shortest paths", "search indexing and ranking", "congestion and load balancing"],
    biology: ["sequence alignment", "genome assembly", "phylogenetic inference"],
    commerce: ["matching and auctions", "recommendation", "inventory and delivery routing"],
    manufacturing: ["scheduling", "cutting and packing", "fault diagnosis"],
  }[domain];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">application domain<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={domain} onChange={(event) => setDomain(event.target.value as typeof domain)}><option value="internet">internet</option><option value="biology">biology</option><option value="commerce">commerce</option><option value="manufacturing">manufacturing</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{rows.map((row, index) => <div key={row} className={`border p-4 ${index === 0 ? "border-accent text-accent" : index === 1 ? "border-warning text-warning" : "border-success text-success"}`}>{row}</div>)}</div>
      </Panel>
      <Caption>Algorithms turn domain data and constraints into reproducible decisions across networks, biology, commerce, and physical production.</Caption>
    </figure>
  );
}

const gridWeights = [
  [1, 1, 4, 2, 3],
  [3, 2, 1, 5, 1],
  [4, 3, 1, 1, 1],
  [2, 1, 5, 2, 1],
];

export function CLRS4ShortestPathLab() {
  const [rows, setRows] = useState(gridWeights.length);
  const dp = gridWeights.map((row) => row.map(() => Number.POSITIVE_INFINITY));
  dp[0][0] = gridWeights[0][0];
  for (let r = 0; r < rows; r += 1) for (let c = 0; c < gridWeights[0].length; c += 1) {
    if (r > 0) dp[r][c] = Math.min(dp[r][c], dp[r - 1][c] + gridWeights[r][c]);
    if (c > 0) dp[r][c] = Math.min(dp[r][c], dp[r][c - 1] + gridWeights[r][c]);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">processed map rows = {rows}<input className="mt-2 w-full accent-current" type="range" min="1" max={gridWeights.length} value={rows} onChange={(event) => setRows(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 gap-1">{gridWeights.flatMap((row, r) => row.map((weight, c) => <div key={`${r}-${c}`} className={`border p-2 text-center ${r < rows ? "border-accent text-accent" : "border-border text-secondary"}`}><div className="text-xs">w {weight}</div><div className="font-mono">{Number.isFinite(dp[r][c]) ? dp[r][c] : "·"}</div></div>))}</div>
      </Panel>
      <Caption>Shortest-path algorithms transform a network and edge costs into a route certificate; the correct method depends on graph structure and weight assumptions.</Caption>
    </figure>
  );
}

export function CLRS4ExactApproximationLab() {
  const [size, setSize] = useState(20);
  const exactStates = size > 50 ? Number.POSITIVE_INFINITY : 2 ** size;
  const heuristicWork = size ** 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">combinatorial instance size = {size}<input className="mt-2 w-full accent-current" type="range" min="5" max="80" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact subsets" value={Number.isFinite(exactStates) ? exactStates.toLocaleString() : "astronomical"} tone="danger" /><Stat label="heuristic work" value={heuristicWork.toLocaleString()} tone="success" /><Stat label="evidence needed" value="bound + verifier" tone="warning" /></div>
      </Panel>
      <Caption>When exact optimization is intractable, approximation and randomized algorithms trade optimality or certainty for a quantified, verifiable guarantee.</Caption>
    </figure>
  );
}

export function CLRS4TechnologyStackLab() {
  const [focus, setFocus] = useState(2);
  const layers = [
    ["hardware", "instruction throughput, memory hierarchy"],
    ["systems", "scheduling, storage, networking"],
    ["algorithms", "scalable procedures and data structures"],
    ["applications", "domain behavior and user value"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">technology layer = {layers[focus][0]}<input className="mt-2 w-full accent-current" type="range" min="0" max={layers.length - 1} value={focus} onChange={(event) => setFocus(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{[...layers].reverse().map(([name, detail]) => { const index = layers.findIndex((layer) => layer[0] === name); return <div key={name} className={`border p-3 ${index === focus ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}><span className="font-semibold">{name}</span><span className="ml-3 text-sm">{detail}</span></div>; })}</div>
      </Panel>
      <Caption>Algorithms are a technology layer of their own: they amplify hardware and enable applications that raw computing capacity cannot rescue from poor scaling.</Caption>
    </figure>
  );
}

export function CLRS4EvidenceChecklistLab() {
  const [issue, setIssue] = useState<"valid" | "sample only" | "nontermination" | "overflow" | "too slow">("valid");
  const checks = {
    contract: true,
    allInstances: issue !== "sample only",
    termination: issue !== "nontermination",
    representation: issue !== "overflow",
    resources: issue !== "too slow",
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">algorithm review case<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="sample only">tested only on samples</option><option value="nontermination">cycle without progress</option><option value="overflow">integer overflow</option><option value="too slow">resource bound exceeded</option></select></label>
        <div className="mt-4 grid grid-cols-5 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-2 text-center text-[11px] ${ok ? "border-success text-success" : "border-danger text-danger"}`}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
      </Panel>
      <Caption>A complete algorithm certificate combines the problem contract, proof over all valid instances, termination, representation safety, and resource bounds.</Caption>
    </figure>
  );
}
