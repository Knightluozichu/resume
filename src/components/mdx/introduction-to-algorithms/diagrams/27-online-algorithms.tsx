"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

export function CLRS4OnlineTimelineLab() {
  const [revealed, setRevealed] = useState(3);
  const requests = ["A", "C", "B", "A", "D", "C", "A"];
  return (
    <Figure caption="An online algorithm must commit after each revealed request; the gray suffix exists for analysis but is unavailable to the decision maker.">
      <label className="text-sm font-semibold text-primary">revealed prefix = {revealed}<input className="mt-2 w-full accent-current" type="range" min="1" max={requests.length} value={revealed} onChange={(event) => setRevealed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-7 gap-2">{requests.map((request, index) => <div key={index} className={`border p-3 text-center font-mono text-sm ${index < revealed ? "border-accent text-accent" : "border-border text-secondary opacity-45"}`}>{request}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="available history" value={requests.slice(0, revealed).join(" ")} tone="success" /><Stat label="hidden future" value={`${requests.length - revealed} requests`} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4CompetitiveRatioLab() {
  const [onlineCost, setOnlineCost] = useState(18);
  const [offlineCost, setOfflineCost] = useState(10);
  const ratio = onlineCost / Math.max(1, offlineCost);
  return (
    <Figure caption="Competitive analysis compares one online policy with an omniscient offline optimum on the same complete request sequence.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">online cost = {onlineCost}<input className="mt-2 w-full accent-current" type="range" min="1" max="40" value={onlineCost} onChange={(event) => setOnlineCost(Number(event.target.value))} /></label>
        <label className="text-sm font-semibold text-primary">OPT cost = {offlineCost}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={offlineCost} onChange={(event) => setOfflineCost(Number(event.target.value))} /></label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="A(σ)" value={onlineCost.toString()} /><Stat label="OPT(σ)" value={offlineCost.toString()} tone="success" /><Stat label="observed ratio" value={ratio.toFixed(2)} tone={ratio <= 2 ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4ElevatorThresholdLab() {
  const [stairTime, setStairTime] = useState(8);
  const [arrival, setArrival] = useState(12);
  const threshold = stairTime;
  const online = arrival <= threshold ? arrival : threshold + stairTime;
  const optimum = Math.min(arrival, stairTime);
  return (
    <Figure caption="The hedge waits for one stair-climb time, then commits to the stairs; in the normalized model its cost never exceeds twice OPT.">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary">stair time b = {stairTime}<input className="mt-2 w-full accent-current" type="range" min="2" max="15" value={stairTime} onChange={(event) => setStairTime(Number(event.target.value))} /></label>
        <label className="text-sm font-semibold text-primary">elevator arrival ℓ = {arrival}<input className="mt-2 w-full accent-current" type="range" min="1" max="24" value={arrival} onChange={(event) => setArrival(Number(event.target.value))} /></label>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="hedge cost" value={online.toString()} /><Stat label="OPT" value={optimum.toString()} tone="success" /><Stat label="ratio" value={(online / optimum).toFixed(2)} tone={online / optimum <= 2 ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4ElevatorAdversaryLab() {
  const [threshold, setThreshold] = useState(6);
  const stairTime = 8;
  const earlyArrival = Math.max(1, threshold);
  const earlyRatio = earlyArrival <= threshold ? 1 : (threshold + stairTime) / Math.min(earlyArrival, stairTime);
  const lateRatio = (threshold + stairTime) / stairTime;
  return (
    <Figure caption="A threshold that is too small gives up just before a useful arrival; one that is too large wastes time before taking the stairs.">
      <label className="text-sm font-semibold text-primary">chosen waiting threshold = {threshold}<input className="mt-2 w-full accent-current" type="range" min="0" max="16" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="arrival by threshold" value={`ratio ${earlyRatio.toFixed(2)}`} tone="success" /><Stat label="elevator stays late" value={`ratio ${lateRatio.toFixed(2)}`} tone={lateRatio <= 2 ? "warning" : "danger"} /></div>
    </Figure>
  );
}

const baseList = ["A", "B", "C", "D", "E", "F"];

export function CLRS4SearchListCostLab() {
  const [target, setTarget] = useState("D");
  const rank = baseList.indexOf(target) + 1;
  return (
    <Figure caption="In a sequential search list, access cost is the current one-based rank; reordering changes the cost of future requests.">
      <label className="text-sm font-semibold text-primary">requested item<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={target} onChange={(event) => setTarget(event.target.value)}>{baseList.map((item) => <option key={item}>{item}</option>)}</select></label>
      <div className="mt-4 flex gap-2">{baseList.map((item, index) => <div key={item} className={`flex-1 border p-3 text-center font-mono text-sm ${item === target ? "border-warning text-warning" : "border-border text-secondary"}`}>{item}<div className="mt-1 text-xs">{index + 1}</div></div>)}</div>
      <div className="mt-4"><Stat label="access cost" value={rank.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4MoveToFrontLab() {
  const [list, setList] = useState(baseList);
  const [cost, setCost] = useState(0);
  function access(item: string) {
    const rank = list.indexOf(item) + 1;
    setCost((current) => current + rank);
    setList([item, ...list.filter((value) => value !== item)]);
  }
  return (
    <Figure caption="Move-to-front pays the current search rank, then moves the accessed item to the head for free while preserving every other relative order.">
      <div className="flex flex-wrap gap-2">{list.map((item, index) => <button key={item} type="button" className="min-w-12 border border-accent p-3 font-mono text-sm text-accent" onClick={() => access(item)} title={`Access ${item} at rank ${index + 1}`}>{item}</button>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="current order" value={list.join(" ")} /><Stat label="cumulative access cost" value={cost.toString()} tone="success" /></div>
    </Figure>
  );
}

function inversionCount(left: string[], right: string[]) {
  const position = new Map(right.map((item, index) => [item, index]));
  let count = 0;
  for (let i = 0; i < left.length; i += 1) {
    for (let j = i + 1; j < left.length; j += 1) {
      if ((position.get(left[i]) ?? 0) > (position.get(left[j]) ?? 0)) count += 1;
    }
  }
  return count;
}

export function CLRS4InversionPotentialLab() {
  const [mtfOrder, setMtfOrder] = useState(["D", "A", "B", "C", "E"]);
  const optimum = ["A", "C", "D", "B", "E"];
  const inversions = inversionCount(mtfOrder, optimum);
  function rotate() {
    setMtfOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);
  }
  return (
    <Figure caption="The inversion potential counts pairs ordered differently by MTF and OPT; an access can pay search cost while destroying enough disagreement to fund it.">
      <button type="button" className="border border-accent px-3 py-2 text-sm text-accent" onClick={rotate}>rotate MTF order</button>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="MTF order" value={mtfOrder.join(" ")} /><Stat label="OPT order" value={optimum.join(" ")} tone="warning" /></div>
      <div className="mt-2"><Stat label="inversion potential Φ" value={inversions.toString()} tone="success" /></div>
    </Figure>
  );
}

const cacheRequests = ["A", "B", "C", "A", "D", "B", "E", "A", "B", "C"];

function simulateLru(requests: string[], capacity: number) {
  const cache: string[] = [];
  let faults = 0;
  for (const request of requests) {
    const index = cache.indexOf(request);
    if (index >= 0) cache.splice(index, 1);
    else {
      faults += 1;
      if (cache.length === capacity) cache.shift();
    }
    cache.push(request);
  }
  return { cache, faults };
}

export function CLRS4CacheTraceLab() {
  const [processed, setProcessed] = useState(5);
  const result = simulateLru(cacheRequests.slice(0, processed), 3);
  return (
    <Figure caption="LRU refreshes a hit and evicts the least recently requested resident on a miss; the rightmost cache entry is most recent.">
      <label className="text-sm font-semibold text-primary">processed requests = {processed}<input className="mt-2 w-full accent-current" type="range" min="1" max={cacheRequests.length} value={processed} onChange={(event) => setProcessed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-10 gap-1">{cacheRequests.map((request, index) => <div key={index} className={`border p-2 text-center font-mono text-xs ${index < processed ? "border-accent text-accent" : "border-border text-secondary opacity-40"}`}>{request}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="LRU → MRU" value={result.cache.join(" ")} tone="success" /><Stat label="faults" value={result.faults.toString()} tone="warning" /></div>
    </Figure>
  );
}

function splitPhases(requests: string[], capacity: number) {
  const phases: string[][] = [];
  let current: string[] = [];
  let distinct = new Set<string>();
  for (const request of requests) {
    if (!distinct.has(request) && distinct.size === capacity) {
      phases.push(current);
      current = [];
      distinct = new Set<string>();
    }
    current.push(request);
    distinct.add(request);
  }
  if (current.length > 0) phases.push(current);
  return phases;
}

export function CLRS4CachePhaseLab() {
  const [capacity, setCapacity] = useState(3);
  const phases = splitPhases(cacheRequests, capacity);
  return (
    <Figure caption="A k-phase is maximal while containing at most k distinct pages; phase boundaries turn a long trace into local fault budgets.">
      <label className="text-sm font-semibold text-primary">cache capacity k = {capacity}<input className="mt-2 w-full accent-current" type="range" min="2" max="5" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{phases.map((phase, index) => <div key={index} className="border border-accent p-3 text-center text-sm text-accent"><div className="text-xs">phase {index + 1}</div><div className="mt-1 font-mono">{phase.join(" ")}</div></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="phase count" value={phases.length.toString()} /><Stat label="LRU fault cap / phase" value={capacity.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4CacheAdversaryLab() {
  const [capacity, setCapacity] = useState(3);
  const universe = Array.from({ length: capacity + 1 }, (_, index) => `p${index + 1}`);
  return (
    <Figure caption="With k+1 pages, an adaptive request can always name a page absent from a deterministic online cache, while an offline schedule exploits future knowledge.">
      <label className="text-sm font-semibold text-primary">online cache capacity k = {capacity}<input className="mt-2 w-full accent-current" type="range" min="2" max="6" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{universe.map((page, index) => <div key={page} className={`border p-3 font-mono text-sm ${index === universe.length - 1 ? "border-danger text-danger" : "border-success text-success"}`}>{page}{index === universe.length - 1 ? " requested / absent" : " cached"}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="online faults" value="every request" tone="danger" /><Stat label="deterministic lower bound" value={`${capacity}-competitive`} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4OnlineCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "future" | "baseline" | "model" | "additive">("valid");
  const checks = {
    "decisions use prefix information only": issue !== "future",
    "OPT sees the same full sequence": issue !== "baseline",
    "cost and legal actions are explicit": issue !== "model",
    "ratio states any additive constant": issue !== "additive",
  };
  return (
    <Figure caption="An online-analysis certificate fixes the information boundary, legal actions, cost model, offline comparator, adversary, and final inequality.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">complete proof</option><option value="future">policy peeks at future</option><option value="baseline">different input for OPT</option><option value="model">undefined move cost</option><option value="additive">hidden startup constant</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
