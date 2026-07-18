"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><Caption>{caption}</Caption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-base">{value}</div></div>;
}

const values = [12, 3, 5, 7, 4, 19, 26, 1, 8, 15, 10];

export function CLRS4OrderStatisticLab() {
  const [rank, setRank] = useState(6);
  const sorted = [...values].sort((a, b) => a - b);
  return (
    <Figure caption="The ith order statistic asks for one rank in sorted order; it does not require materializing all other ranks.">
      <label className="text-sm font-semibold text-primary">target rank i = {rank}<input className="mt-2 w-full accent-current" type="range" min="1" max={sorted.length} value={rank} onChange={(event) => setRank(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">{sorted.map((value, index) => <div key={index} className={`border p-2 text-center ${index + 1 === rank ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}><div className="font-mono">{value}</div><div className="text-[10px]">rank {index + 1}</div></div>)}</div>
    </Figure>
  );
}

export function CLRS4MinimumScanLab() {
  const [seen, setSeen] = useState(5);
  const prefix = values.slice(0, seen);
  const minimum = Math.min(...prefix);
  return (
    <Figure caption="A minimum scan maintains the smallest key in the processed prefix and uses exactly n minus one comparisons.">
      <label className="text-sm font-semibold text-primary">items processed = {seen}<input className="mt-2 w-full accent-current" type="range" min="1" max={values.length} value={seen} onChange={(event) => setSeen(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-11">{values.map((value, index) => <div key={index} className={`border p-2 text-center font-mono ${index >= seen ? "border-border text-secondary" : value === minimum ? "border-success bg-success/10 text-success" : "border-warning text-warning"}`}>{value}</div>)}</div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="current minimum" value={minimum.toString()} tone="success" /><Stat label="comparisons" value={(seen - 1).toString()} /></div>
    </Figure>
  );
}

export function CLRS4MinMaxTournamentLab() {
  const [n, setN] = useState(20);
  const separate = 2 * n - 2;
  const paired = n % 2 === 0 ? 3 * n / 2 - 2 : 3 * (n - 1) / 2;
  return (
    <Figure caption="Pairing elements first lets one comparison route the smaller candidate only toward minimum and the larger only toward maximum.">
      <label className="text-sm font-semibold text-primary">item count n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="two separate scans" value={separate.toString()} tone="warning" /><Stat label="pair tournament" value={Math.floor(paired).toString()} tone="success" /><Stat label="comparisons saved" value={(separate - Math.floor(paired)).toString()} /></div>
    </Figure>
  );
}

function quickselectTrace(input: number[], target: number, pivots: number[]) {
  let current = [...input];
  const states = [{ current: [...current], pivot: null as number | null, discarded: 0 }];
  let discarded = 0;
  for (const pivotIndex of pivots) {
    if (current.length <= 1) break;
    const pivot = current[pivotIndex % current.length];
    const low = current.filter((value) => value < pivot);
    const equal = current.filter((value) => value === pivot);
    const high = current.filter((value) => value > pivot);
    if (target <= low.length) current = low;
    else if (target <= low.length + equal.length) {
      current = equal;
      states.push({ current: [...current], pivot, discarded: input.length - current.length });
      break;
    } else {
      target -= low.length + equal.length;
      discarded += low.length + equal.length;
      current = high;
    }
    states.push({ current: [...current], pivot, discarded });
  }
  return states;
}

export function CLRS4RandomizedSelectTraceLab() {
  const states = quickselectTrace(values, 6, [3, 4, 1, 0]);
  const [step, setStep] = useState(0);
  const state = states[Math.min(step, states.length - 1)];
  return (
    <Figure caption="RANDOMIZED-SELECT partitions like quicksort but follows only the side containing the requested rank and discards the other side permanently.">
      <label className="text-sm font-semibold text-primary">selection partitions = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{state.current.map((value, index) => <div key={index} className={`border p-3 font-mono ${value === state.pivot ? "border-warning bg-warning/10 text-warning" : "border-accent text-accent"}`}>{value}</div>)}</div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="active size" value={state.current.length.toString()} /><Stat label="discarded" value={state.discarded.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4RandomSelectCostLab() {
  const [quality, setQuality] = useState<"middle half" | "extreme" | "median">("middle half");
  const rows = {
    "middle half": ["next size ≤ 3n/4", "probability at least 1/2", "constant expected trials"],
    extreme: ["next size n−1", "possible but not persistent in expectation", "bad step"],
    median: ["next size n/2", "best balanced progress", "good step"],
  }[quality];
  return (
    <Figure caption="A random pivot lands in the middle half with constant probability, so expected work forms a geometrically shrinking sequence.">
      <label className="text-sm font-semibold text-primary">pivot quality<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={quality} onChange={(event) => setQuality(event.target.value as typeof quality)}><option value="middle half">middle half</option><option value="extreme">extreme</option><option value="median">exact median</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="progress" value={rows[0]} /><Stat label="frequency" value={rows[1]} tone="warning" /><Stat label="reading" value={rows[2]} tone={quality === "extreme" ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4PivotRankLab() {
  const [rank, setRank] = useState(5);
  const n = 11;
  const left = rank - 1;
  const right = n - rank;
  return (
    <Figure caption="After partition, comparing target rank with pivot rank decides the unique recursive side and adjusts rank when moving right.">
      <label className="text-sm font-semibold text-primary">pivot rank k = {rank}<input className="mt-2 w-full accent-current" type="range" min="1" max={n} value={rank} onChange={(event) => setRank(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="smaller side" value={left.toString()} /><Stat label="pivot rank" value={rank.toString()} tone="success" /><Stat label="larger side" value={right.toString()} tone="warning" /></div>
    </Figure>
  );
}

const groupInput = [12, 3, 5, 7, 4, 19, 26, 1, 8, 15, 10, 2, 18, 6, 11, 25, 9, 14, 20, 13, 17, 16, 21, 24, 23];

export function CLRS4GroupFiveLab() {
  const [group, setGroup] = useState(0);
  const groups = Array.from({ length: 5 }, (_, index) => groupInput.slice(index * 5, index * 5 + 5).sort((a, b) => a - b));
  return (
    <Figure caption="Sorting groups of five exposes one median per group at constant cost and guarantees two smaller and two larger witnesses around each full-group median.">
      <label className="text-sm font-semibold text-primary">highlight group = {group + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={groups.length - 1} value={group} onChange={(event) => setGroup(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{groups.map((items, groupIndex) => <div key={groupIndex} className={`border p-2 ${groupIndex === group ? "border-accent bg-accent/10" : "border-border"}`}>{items.map((value, index) => <div key={value} className={`text-center font-mono text-xs ${index === 2 ? "font-bold text-success" : "text-secondary"}`}>{value}</div>)}</div>)}</div>
    </Figure>
  );
}

export function CLRS4MedianOfMediansLab() {
  const [groups, setGroups] = useState(9);
  const guaranteedGroups = Math.max(0, Math.floor(groups / 2) - 1);
  const eliminated = 3 * guaranteedGroups;
  return (
    <Figure caption="The median of group medians is at least half the medians, and each such median certifies three elements on its side.">
      <label className="text-sm font-semibold text-primary">full groups of five = {groups}<input className="mt-2 w-full accent-current" type="range" min="3" max="30" value={groups} onChange={(event) => setGroups(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="medians on each side" value={guaranteedGroups.toString()} /><Stat label="elements certified per median" value="3" tone="warning" /><Stat label="guaranteed eliminated" value={eliminated.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4WorstSelectRecurrenceLab() {
  const [n, setN] = useState(100);
  const medians = Math.ceil(n / 5);
  const largeSide = Math.floor(7 * n / 10 + 6);
  return (
    <Figure caption="SELECT pays for medians of groups, then recurses on at most seven tenths plus a constant after partitioning around the median of medians.">
      <label className="text-sm font-semibold text-primary">input size n = {n}<input className="mt-2 w-full accent-current" type="range" min="20" max="500" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="median subproblem" value={`⌈n/5⌉ = ${medians}`} /><Stat label="largest selected side" value={`≤ ${largeSide}`} tone="warning" /><Stat label="fraction sum" value={(medians / n + largeSide / n).toFixed(2)} tone={medians + largeSide < n ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4SelectionCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "rank not shifted" | "both sides" | "weak pivot" | "missing base">("valid");
  const checks = {
    "rank translation": issue !== "rank not shifted",
    "one recursive side": issue !== "both sides",
    "pivot guarantee": issue !== "weak pivot",
    "base case": issue !== "missing base",
  };
  return (
    <Figure caption="A selection certificate tracks rank translation, one-sided recursion, pivot quality, and a terminating small-input base case.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid</option><option value="rank not shifted">rank not shifted</option><option value="both sides">recurse both sides</option><option value="weak pivot">no pivot guarantee</option><option value="missing base">missing base</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
