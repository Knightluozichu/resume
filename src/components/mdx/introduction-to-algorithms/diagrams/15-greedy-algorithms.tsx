"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>{children}</Panel>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

type Activity = { name: string; start: number; finish: number };

const activities: Activity[] = [
  { name: "a1", start: 1, finish: 4 },
  { name: "a2", start: 3, finish: 5 },
  { name: "a3", start: 0, finish: 6 },
  { name: "a4", start: 5, finish: 7 },
  { name: "a5", start: 3, finish: 9 },
  { name: "a6", start: 5, finish: 9 },
  { name: "a7", start: 6, finish: 10 },
  { name: "a8", start: 8, finish: 11 },
  { name: "a9", start: 8, finish: 12 },
  { name: "a10", start: 2, finish: 14 },
  { name: "a11", start: 12, finish: 16 },
];

function earliestFinish(items: Activity[]) {
  const sorted = [...items].sort((left, right) => left.finish - right.finish || left.start - right.start);
  const selected: Activity[] = [];
  let boundary = -Infinity;
  for (const item of sorted) {
    if (item.start >= boundary) {
      selected.push(item);
      boundary = item.finish;
    }
  }
  return selected;
}

function shortestDuration(items: Activity[]) {
  const sorted = [...items].sort((left, right) => (left.finish - left.start) - (right.finish - right.start));
  const selected: Activity[] = [];
  for (const item of sorted) {
    if (selected.every((chosen) => item.finish <= chosen.start || item.start >= chosen.finish)) selected.push(item);
  }
  return selected.sort((left, right) => left.start - right.start);
}

export function CLRS4ActivityScheduleLab() {
  const [strategy, setStrategy] = useState<"finish" | "shortest">("finish");
  const selected = strategy === "finish" ? earliestFinish(activities) : shortestDuration(activities);
  const names = new Set(selected.map((item) => item.name));
  return (
    <Figure caption="The earliest-finish rule leaves the largest suffix of mutually compatible activities; plausible local rules need a proof, not a label.">
      <label className="text-sm font-semibold text-primary">selection rule<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={strategy} onChange={(event) => setStrategy(event.target.value as typeof strategy)}><option value="finish">earliest finish</option><option value="shortest">shortest duration</option></select></label>
      <div className="mt-4 space-y-1">{activities.map((item) => <div key={item.name} className="grid grid-cols-[2.25rem_1fr_3.5rem] items-center gap-2 text-xs"><span className={names.has(item.name) ? "font-semibold text-success" : "text-secondary"}>{item.name}</span><div className="relative h-5 border border-border bg-background"><div className={`absolute top-0 h-full ${names.has(item.name) ? "bg-success/70" : "bg-secondary/25"}`} style={{ left: `${item.start / 16 * 100}%`, width: `${(item.finish - item.start) / 16 * 100}%` }} /></div><span className="font-mono text-secondary">{item.start}–{item.finish}</span></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="selected count" value={selected.length.toString()} tone="success" /><Stat label="witness" value={selected.map((item) => item.name).join(" → ")} /></div>
    </Figure>
  );
}

export function CLRS4ActivityExchangeLab() {
  const [first, setFirst] = useState("a1");
  const chosen = activities.find((item) => item.name === first) ?? activities[0];
  const suffix = activities.filter((item) => item.start >= chosen.finish);
  const optimalSuffix = earliestFinish(suffix);
  const earliest = activities[0];
  return (
    <Figure caption="Replacing an optimal schedule's first activity by the globally earliest-finishing activity cannot shrink the compatible suffix.">
      <label className="text-sm font-semibold text-primary">candidate first activity<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={first} onChange={(event) => setFirst(event.target.value)}>{activities.slice(0, 4).map((item) => <option key={item.name} value={item.name}>{item.name}: [{item.start}, {item.finish})</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate finish" value={chosen.finish.toString()} /><Stat label="earliest finish" value={`${earliest.name} @ ${earliest.finish}`} tone="success" /><Stat label="best suffix count" value={optimalSuffix.length.toString()} tone="warning" /></div>
      <div className="mt-3 border border-border p-3 text-center text-sm text-secondary">exchange {chosen.name} for {earliest.name}: boundary moves from {chosen.finish} to {earliest.finish}</div>
    </Figure>
  );
}

export function CLRS4GreedyDecisionLab() {
  const [obligation, setObligation] = useState<"choice" | "substructure" | "feasibility" | "implementation">("choice");
  const rows = {
    choice: ["greedy-choice property", "some optimum begins with the local choice", "exchange argument"],
    substructure: ["optimal substructure", "the remainder is an optimal subproblem", "cut-and-paste"],
    feasibility: ["feasibility invariant", "every prefix can still be completed", "induction"],
    implementation: ["efficient selector", "find the next choice without rescanning", "sorting or priority queue"],
  }[obligation];
  return (
    <Figure caption="A greedy design is a proof package: local choice, exchange, residual subproblem, feasibility invariant, and an efficient selector.">
      <label className="text-sm font-semibold text-primary">proof obligation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={obligation} onChange={(event) => setObligation(event.target.value as typeof obligation)}><option value="choice">greedy choice</option><option value="substructure">substructure</option><option value="feasibility">feasibility</option><option value="implementation">implementation</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="claim" value={rows[0]} /><Stat label="meaning" value={rows[1]} tone="warning" /><Stat label="proof tool" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

function coinGreedy(amount: number) {
  const out: number[] = [];
  let rest = amount;
  for (const coin of [4, 3, 1]) {
    while (rest >= coin) {
      out.push(coin);
      rest -= coin;
    }
  }
  return out;
}

function coinOptimal(amount: number) {
  const dp = Array(amount + 1).fill(Infinity) as number[];
  const take = Array(amount + 1).fill(0) as number[];
  dp[0] = 0;
  for (let value = 1; value <= amount; value += 1) {
    for (const coin of [1, 3, 4]) {
      if (coin <= value && dp[value - coin] + 1 < dp[value]) {
        dp[value] = dp[value - coin] + 1;
        take[value] = coin;
      }
    }
  }
  const out: number[] = [];
  for (let rest = amount; rest > 0; rest -= take[rest]) out.push(take[rest]);
  return out;
}

export function CLRS4GreedyCounterexampleLab() {
  const [amount, setAmount] = useState(6);
  const greedy = coinGreedy(amount);
  const optimal = coinOptimal(amount);
  return (
    <Figure caption="The coin system 1, 3, 4 exposes why an intuitive local rule is not automatically safe: amount 6 defeats largest-coin-first.">
      <label className="text-sm font-semibold text-primary">amount = {amount}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="greedy coins" value={`${greedy.join(" + ")} (${greedy.length})`} tone={greedy.length === optimal.length ? "success" : "danger"} /><Stat label="optimal coins" value={`${optimal.join(" + ")} (${optimal.length})`} tone="success" /></div>
    </Figure>
  );
}

type HuffNode = { label: string; weight: number; left?: HuffNode; right?: HuffNode };
const frequencies = [
  { label: "a", weight: 45 },
  { label: "b", weight: 13 },
  { label: "c", weight: 12 },
  { label: "d", weight: 16 },
  { label: "e", weight: 9 },
  { label: "f", weight: 5 },
];

function buildHuffman() {
  const queue: HuffNode[] = frequencies.map((item) => ({ ...item }));
  const stages: { merged: string; weight: number; queue: string }[] = [];
  while (queue.length > 1) {
    queue.sort((left, right) => left.weight - right.weight || left.label.localeCompare(right.label));
    const left = queue.shift() as HuffNode;
    const right = queue.shift() as HuffNode;
    const parent: HuffNode = { label: left.label + right.label, weight: left.weight + right.weight, left, right };
    queue.push(parent);
    stages.push({ merged: `${left.label}:${left.weight} + ${right.label}:${right.weight}`, weight: parent.weight, queue: queue.map((node) => `${node.label}:${node.weight}`).join("  ") });
  }
  return { root: queue[0], stages };
}

function collectCodes(node: HuffNode, prefix = "", out: Record<string, string> = {}) {
  if (!node.left && !node.right) out[node.label] = prefix || "0";
  if (node.left) collectCodes(node.left, `${prefix}0`, out);
  if (node.right) collectCodes(node.right, `${prefix}1`, out);
  return out;
}

export function CLRS4HuffmanForestLab() {
  const { stages } = useMemo(() => buildHuffman(), []);
  const [stage, setStage] = useState(0);
  const current = stages[stage];
  return (
    <Figure caption="Huffman repeatedly merges the two minimum-frequency roots; contraction reduces the alphabet by one while preserving the residual optimum.">
      <label className="text-sm font-semibold text-primary">merge {stage + 1} of {stages.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={stages.length - 1} value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="two minima" value={current.merged} tone="warning" /><Stat label="parent weight" value={current.weight.toString()} tone="success" /></div>
      <div className="mt-3 border border-border p-3 text-center font-mono text-xs text-secondary">{current.queue}</div>
    </Figure>
  );
}

export function CLRS4HuffmanPrefixLab() {
  const { root } = useMemo(() => buildHuffman(), []);
  const codes = useMemo(() => collectCodes(root), [root]);
  const [symbol, setSymbol] = useState("a");
  const weightedBits = frequencies.reduce((sum, item) => sum + item.weight * codes[item.label].length, 0);
  return (
    <Figure caption="A Huffman tree assigns short root-to-leaf bit strings to frequent symbols; leaves guarantee that no codeword prefixes another.">
      <label className="text-sm font-semibold text-primary">inspect symbol<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={symbol} onChange={(event) => setSymbol(event.target.value)}>{frequencies.map((item) => <option key={item.label} value={item.label}>{item.label} · frequency {item.weight}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="codeword" value={codes[symbol]} tone="success" /><Stat label="bit length" value={codes[symbol].length.toString()} /><Stat label="weighted total" value={weightedBits.toString()} tone="warning" /></div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(codes).sort().map(([name, code]) => <div key={name} className="border border-border p-2 text-center"><div className="font-semibold text-primary">{name}</div><div className="font-mono text-xs text-accent">{code}</div></div>)}</div>
    </Figure>
  );
}

const requests = ["A", "B", "C", "A", "B", "D", "A", "B", "C", "D", "E", "A"];

type CacheStep = { request: string; before: string[]; after: string[]; hit: boolean; evicted?: string; nextUses: Record<string, number> };

function beladyTrace(capacity: number) {
  const cache: string[] = [];
  return requests.map((request, index): CacheStep => {
    const before = [...cache];
    const nextUses = Object.fromEntries(cache.map((page) => {
      const next = requests.indexOf(page, index + 1);
      return [page, next === -1 ? Infinity : next];
    }));
    if (cache.includes(request)) return { request, before, after: [...cache], hit: true, nextUses };
    let evicted: string | undefined;
    if (cache.length === capacity) {
      evicted = cache.reduce((farthest, page) => nextUses[page] > nextUses[farthest] ? page : farthest, cache[0]);
      cache.splice(cache.indexOf(evicted), 1);
    }
    cache.push(request);
    return { request, before, after: [...cache], hit: false, evicted, nextUses };
  });
}

export function CLRS4OfflineCacheTraceLab() {
  const [capacity, setCapacity] = useState(3);
  const trace = beladyTrace(capacity);
  const misses = trace.filter((step) => !step.hit).length;
  return (
    <Figure caption="Offline caching knows the complete request sequence; Belady's rule evicts the resident page whose next request is farthest away.">
      <label className="text-sm font-semibold text-primary">cache capacity k = {capacity}<input className="mt-2 w-full accent-current" type="range" min="2" max="4" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-1">{trace.map((step, index) => <div key={`${step.request}-${index}`} className={`min-w-8 border p-2 text-center font-mono text-xs ${step.hit ? "border-success text-success" : "border-warning text-warning"}`}>{step.request}<div className="mt-1 text-[9px]">{step.hit ? "hit" : "miss"}</div></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="requests" value={requests.length.toString()} /><Stat label="optimal misses" value={misses.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4FarthestFutureLab() {
  const trace = useMemo(() => beladyTrace(3), []);
  const missIndexes = trace.map((step, index) => ({ step, index })).filter(({ step }) => !step.hit && step.evicted);
  const [choice, setChoice] = useState(0);
  const { step } = missIndexes[choice];
  return (
    <Figure caption="At a full-cache miss, compare every resident page's next occurrence; infinity wins because that page is never requested again.">
      <label className="text-sm font-semibold text-primary">full-cache miss<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={choice} onChange={(event) => setChoice(Number(event.target.value))}>{missIndexes.map((item, option) => <option key={item.index} value={option}>request {item.index + 1}: {item.step.request}</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{step.before.map((page) => <Stat key={page} label={`resident ${page}`} value={Number.isFinite(step.nextUses[page]) ? `next @ ${step.nextUses[page] + 1}` : "never again"} tone={page === step.evicted ? "danger" : "accent"} />)}</div>
      <div className="mt-3 border border-danger p-3 text-center text-sm text-danger">evict {step.evicted}, then load {step.request}</div>
    </Figure>
  );
}

export function CLRS4GreedyProofLab() {
  const [stage, setStage] = useState(0);
  const stages = [
    ["local choice", "name the deterministic earliest-finishing, least-frequency, or farthest-future decision"],
    ["exchange", "transform an arbitrary optimum to include that decision without worsening cost"],
    ["contract", "remove or merge the decision and expose an instance of the same problem"],
    ["induct", "apply the claim to the smaller residual instance and preserve feasibility"],
  ];
  return (
    <Figure caption="Exchange plus contraction turns a local choice into an inductive proof of global optimality.">
      <label className="text-sm font-semibold text-primary">proof stage = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === stage ? "border-accent bg-accent/10 text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-warning p-4 text-center text-sm text-warning">{stages[stage][1]}</div>
    </Figure>
  );
}

export function CLRS4GreedyCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "choice" | "exchange" | "residual" | "cost">("valid");
  const checks = {
    "choice is deterministic": issue !== "choice",
    "exchange is nonworsening": issue !== "exchange",
    "residual problem matches": issue !== "residual",
    "cost accounting is complete": issue !== "cost",
  };
  return (
    <Figure caption="A greedy certificate audits the exact choice, nonworsening exchange, residual-instance equivalence, and complete cost accounting.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid proof</option><option value="choice">ambiguous tie policy</option><option value="exchange">exchange worsens objective</option><option value="residual">wrong residual instance</option><option value="cost">missing cost term</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
