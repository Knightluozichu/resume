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

function fibCallCount(n: number): number {
  return n < 2 ? 1 : 1 + fibCallCount(n - 1) + fibCallCount(n - 2);
}

export function CAISearchToDPGraph() {
  const [n, setN] = useState(10);
  const calls = fibCallCount(n);
  const states = n + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">recursive puzzle depth n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="search calls" value={calls.toLocaleString()} tone="danger" /><Stat label="distinct states" value={states.toLocaleString()} tone="success" /><Stat label="duplicate work" value={(calls - states).toLocaleString()} tone="warning" /></div>
        <div className="mt-3 h-4 border border-border bg-background"><div className="h-full bg-success" style={{ width: `${Math.max(3, states / calls * 100)}%` }} /></div>
      </Panel>
      <Caption>Dynamic programming merges search nodes that have the same future, replacing an exponential recursion tree with a compact state graph.</Caption>
    </figure>
  );
}

export function CAIWarehouseTransitionLab() {
  const demand = [2, 4, 1, 5, 3];
  const [day, setDay] = useState(2);
  const [inventory, setInventory] = useState(3);
  const choices = [0, 2, 4, 6].map((order) => {
    const next = inventory + order - demand[day];
    return { order, next, feasible: next >= 0 && next <= 8, cost: order * 3 + Math.max(0, next) };
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">day = {day + 1}, demand = {demand[day]}<input className="mt-2 w-full accent-current" type="range" min="0" max={demand.length - 1} value={day} onChange={(event) => setDay(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">starting inventory = {inventory}<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={inventory} onChange={(event) => setInventory(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{choices.map((choice) => <div key={choice.order} className={`border p-3 text-center ${choice.feasible ? "border-success text-success" : "border-danger text-danger"}`}><div className="text-xs">order {choice.order}</div><div className="font-mono text-lg">next {choice.next}</div><div className="text-xs">step cost {choice.cost}</div></div>)}</div>
      </Panel>
      <Caption>A warehouse state records the day and inventory; an order decision produces the next inventory and a local cost.</Caption>
    </figure>
  );
}

export function CAIStockStateLab() {
  const prices = [3, 7, 2, 8, 4, 10];
  const [day, setDay] = useState(prices.length - 1);
  let cash = 0;
  let hold = -prices[0];
  const trace = [{ cash, hold }];
  for (let i = 1; i <= day; i += 1) {
    const nextCash = Math.max(cash, hold + prices[i]);
    const nextHold = Math.max(hold, cash - prices[i]);
    cash = nextCash;
    hold = nextHold;
    trace.push({ cash, hold });
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">investment horizon = day {day + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={prices.length - 1} value={day} onChange={(event) => setDay(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-6">{trace.map((state, index) => <div key={index} className="border border-border p-2 text-center"><div className="text-xs text-secondary">p={prices[index]}</div><div className="font-mono text-success">cash {state.cash}</div><div className="font-mono text-warning">hold {state.hold}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="best no-stock wealth" value={`${cash}`} tone="success" /><Stat label="best holding wealth" value={`${hold}`} tone="warning" /></div>
      </Panel>
      <Caption>Stock planning needs two states because the same day has different futures depending on whether one share is currently held.</Caption>
    </figure>
  );
}

export function CAICatMaskLab() {
  const [mask, setMask] = useState(5);
  const cats = ["Mika", "Luna", "Nori", "Tama"];
  const selected = cats.filter((_, index) => (mask >> index) & 1);
  const occupied = selected.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">assigned-cat mask = {mask.toString(2).padStart(4, "0")}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{cats.map((cat, index) => <div key={cat} className={`border p-3 text-center ${selected.includes(cat) ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}><div>{cat}</div><div className="font-mono text-xs">bit {index}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="mask integer" value={`${mask}`} /><Stat label="assigned" value={`${occupied}`} tone="success" /><Stat label="remaining" value={`${cats.length - occupied}`} tone="warning" /></div>
      </Panel>
      <Caption>A bitmask stores a subset of assigned cats in one integer, enabling O(1) membership and compact subset transitions.</Caption>
    </figure>
  );
}

export function CAITransportPruningLab() {
  const [capacity, setCapacity] = useState(12);
  const states = [
    { load: 3, cost: 9 },
    { load: 5, cost: 8 },
    { load: 7, cost: 11 },
    { load: 8, cost: 7 },
    { load: 10, cost: 13 },
    { load: 13, cost: 6 },
  ];
  const feasible = states.filter((state) => state.load <= capacity);
  const frontier = feasible.filter((state) => !feasible.some((other) => other.load >= state.load && other.cost <= state.cost && (other.load > state.load || other.cost < state.cost)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">transport capacity = {capacity}<input className="mt-2 w-full accent-current" type="range" min="6" max="15" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{states.map((state) => { const valid = state.load <= capacity; const kept = frontier.includes(state); return <div key={`${state.load}-${state.cost}`} className={`border p-2 text-center text-xs ${kept ? "border-success text-success" : valid ? "border-warning text-warning" : "border-danger text-danger"}`}><div>load {state.load}</div><div>cost {state.cost}</div><div>{kept ? "frontier" : valid ? "dominated" : "invalid"}</div></div>; })}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="generated" value={`${states.length}`} /><Stat label="feasible" value={`${feasible.length}`} tone="warning" /><Stat label="nondominated" value={`${frontier.length}`} tone="success" /></div>
      </Panel>
      <Caption>Transition pruning removes infeasible states and states dominated by another state that carries at least as much load for no greater cost.</Caption>
    </figure>
  );
}

const meetings = [
  { id: "A", start: 1, end: 3, value: 5 },
  { id: "B", start: 2, end: 5, value: 6 },
  { id: "C", start: 4, end: 6, value: 5 },
  { id: "D", start: 6, end: 8, value: 4 },
  { id: "E", start: 5, end: 9, value: 8 },
  { id: "F", start: 8, end: 10, value: 5 },
];

function meetingDP(prefix: number) {
  const chosen = meetings.slice(0, prefix);
  const dp = Array(prefix + 1).fill(0);
  const take = Array(prefix + 1).fill(false);
  for (let i = 1; i <= prefix; i += 1) {
    let p = i - 1;
    while (p > 0 && chosen[p - 1].end > chosen[i - 1].start) p -= 1;
    const include = chosen[i - 1].value + dp[p];
    if (include > dp[i - 1]) {
      dp[i] = include;
      take[i] = true;
    } else dp[i] = dp[i - 1];
  }
  return { dp, take };
}

export function CAIMeetingDecisionLab() {
  const [prefix, setPrefix] = useState(meetings.length);
  const result = meetingDP(prefix);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">meetings considered = {prefix}<input className="mt-2 w-full accent-current" type="range" min="1" max={meetings.length} value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-6">{meetings.slice(0, prefix).map((meeting, index) => <div key={meeting.id} className={`border p-3 text-center ${result.take[index + 1] ? "border-success text-success" : "border-border text-secondary"}`}><div>{meeting.id}: {meeting.start}–{meeting.end}</div><div className="font-mono">value {meeting.value}</div></div>)}</div>
        <div className="mt-3 border border-accent p-3 text-center text-accent">best total value = <span className="font-mono text-xl">{result.dp[prefix]}</span></div>
      </Panel>
      <Caption>Weighted meeting scheduling compares skipping the current meeting with taking it plus the best compatible prefix.</Caption>
    </figure>
  );
}

const pathCost = [
  [1, 3, 1, 5, 2],
  [2, 1, 4, 2, 3],
  [5, 2, 1, 1, 4],
  [3, 3, 2, 1, 1],
];

function pathDP(rows: number) {
  const dp = pathCost.map((row) => row.map(() => Number.POSITIVE_INFINITY));
  dp[0][0] = pathCost[0][0];
  for (let r = 0; r < rows; r += 1) for (let c = 0; c < pathCost[0].length; c += 1) {
    if (r > 0) dp[r][c] = Math.min(dp[r][c], dp[r - 1][c] + pathCost[r][c]);
    if (c > 0) dp[r][c] = Math.min(dp[r][c], dp[r][c - 1] + pathCost[r][c]);
  }
  return dp;
}

export function CAIGridPathLab() {
  const [rows, setRows] = useState(pathCost.length);
  const dp = pathDP(rows);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">processed rows = {rows}<input className="mt-2 w-full accent-current" type="range" min="1" max={pathCost.length} value={rows} onChange={(event) => setRows(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 gap-1">{pathCost.flatMap((row, r) => row.map((cost, c) => <div key={`${r}-${c}`} className={`border p-2 text-center ${r < rows ? "border-accent text-accent" : "border-border text-secondary"}`}><div className="text-xs">cost {cost}</div><div className="font-mono">{Number.isFinite(dp[r][c]) ? dp[r][c] : "·"}</div></div>))}</div>
        <div className="mt-3 text-sm text-secondary">Each cell combines the best predecessor from above or left with its local cost.</div>
      </Panel>
      <Caption>Grid path planning is a DAG shortest-path problem when movement is restricted to right and down; topological order becomes table order.</Caption>
    </figure>
  );
}

export function CAIMatrixChainLab() {
  const [middleFirst, setMiddleFirst] = useState(false);
  const dimensions = [10, 30, 5, 60];
  const leftCost = dimensions[0] * dimensions[1] * dimensions[2] + dimensions[0] * dimensions[2] * dimensions[3];
  const rightCost = dimensions[1] * dimensions[2] * dimensions[3] + dimensions[0] * dimensions[1] * dimensions[3];
  const chosen = middleFirst ? rightCost : leftCost;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setMiddleFirst(false)} className={`border p-3 ${!middleFirst ? "border-success text-success" : "border-border text-secondary"}`}>(A·B)·C</button><button type="button" onClick={() => setMiddleFirst(true)} className={`border p-3 ${middleFirst ? "border-warning text-warning" : "border-border text-secondary"}`}>A·(B·C)</button></div>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="matrix dimensions" value="10×30, 30×5, 5×60" /><Stat label="scalar multiplies" value={chosen.toLocaleString()} tone={chosen === leftCost ? "success" : "warning"} /><Stat label="best possible" value={leftCost.toLocaleString()} tone="success" /></div>
      </Panel>
      <Caption>Matrix-chain DP changes parenthesization, not matrix order; associative results can have radically different scalar multiplication costs.</Caption>
    </figure>
  );
}

function editDistance(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= a.length; i += 1) for (let j = 1; j <= b.length; j += 1) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp;
}

export function CAITextEditLab() {
  const source = "kitten";
  const target = "sitting";
  const [prefix, setPrefix] = useState(target.length);
  const b = target.slice(0, prefix);
  const dp = editDistance(source, b);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">target prefix = {b || "∅"}<input className="mt-2 w-full accent-current" type="range" min="0" max={target.length} value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="source" value={source} /><Stat label="target prefix" value={b || "empty"} tone="warning" /><Stat label="edit distance" value={`${dp[source.length][b.length]}`} tone="success" /></div>
        <div className="mt-3 flex flex-wrap gap-1">{dp[source.length].map((value, index) => <span key={index} className="border border-border px-2 py-1 font-mono text-xs text-secondary">{value}</span>)}</div>
      </Panel>
      <Caption>Edit distance aligns text prefixes and chooses the cheapest insertion, deletion, or substitution transition.</Caption>
    </figure>
  );
}

export function CAIDPContractLab() {
  const [issue, setIssue] = useState<"valid" | "missing state" | "cycle" | "wrong order">("valid");
  const checks = {
    state: issue !== "missing state",
    acyclicOrder: issue !== "cycle" && issue !== "wrong order",
    transition: true,
    baseCase: true,
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">DP design review<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid design</option><option value="missing state">missing state field</option><option value="cycle">unresolved zero-cost cycle</option><option value="wrong order">dependency read before computed</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
      </Panel>
      <Caption>A DP certificate checks sufficient state, valid transitions, base cases, and an evaluation order that respects every dependency.</Caption>
    </figure>
  );
}
