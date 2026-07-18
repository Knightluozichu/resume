"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function PP2MississippiFlowLab() {
  const [width, setWidth] = useState(1);
  const [depthFeet, setDepthFeet] = useState(20);
  const [speedMph, setSpeedMph] = useState(5);
  const depthMiles = depthFeet / 5280;
  const volume = width * depthMiles * speedMph * 24;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">width = {width.toFixed(1)} mile<input className="mt-2 w-full accent-current" type="range" min="0.2" max="3" step="0.1" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label><label className="text-xs text-secondary">depth = {depthFeet} ft<input className="mt-2 w-full accent-current" type="range" min="5" max="100" value={depthFeet} onChange={(event) => setDepthFeet(Number(event.target.value))} /></label><label className="text-xs text-secondary">speed = {speedMph.toFixed(1)} mph<input className="mt-2 w-full accent-current" type="range" min="0.5" max="10" step="0.5" value={speedMph} onChange={(event) => setSpeedMph(Number(event.target.value))} /></label></div>
        <div className="mt-4 border border-accent p-4 text-accent"><div className="text-xs">width × depth × distance/day</div><div className="mt-1 font-mono text-3xl">{volume.toFixed(2)} mile³/day</div></div>
      </Panel>
      <Caption>Three rough quantities recover the river&apos;s order of magnitude; units expose the structure of the estimate.</Caption>
    </figure>
  );
}

export function PP2DualEstimateLab() {
  const [basinWidth, setBasinWidth] = useState(1000);
  const [runoffFeet, setRunoffFeet] = useState(1);
  const geometryEstimate = 0.5;
  const rainfallEstimate = (basinWidth * basinWidth * (runoffFeet / 5280)) / 365;
  const ratio = Math.max(geometryEstimate, rainfallEstimate) / Math.max(0.0001, Math.min(geometryEstimate, rainfallEstimate));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">basin side = {basinWidth} miles<input className="mt-2 w-full accent-current" type="range" min="500" max="1600" step="25" value={basinWidth} onChange={(event) => setBasinWidth(Number(event.target.value))} /></label><label className="text-xs text-secondary">annual runoff = {runoffFeet.toFixed(1)} ft<input className="mt-2 w-full accent-current" type="range" min="0.2" max="3" step="0.1" value={runoffFeet} onChange={(event) => setRunoffFeet(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">river geometry<br /><span className="font-mono">{geometryEstimate.toFixed(2)}</span></div><div className="border border-success p-3 text-success">basin runoff<br /><span className="font-mono">{rainfallEstimate.toFixed(2)}</span></div><div className={"border p-3 " + (ratio < 3 ? "border-success text-success" : "border-warning text-warning")}>agreement<br /><span className="font-mono">{ratio.toFixed(1)}x</span></div></div>
      </Panel>
      <Caption>Independent decompositions reduce the chance that the same hidden assumption contaminates both answers.</Caption>
    </figure>
  );
}

export function PP2DimensionCheckLab() {
  const [formula, setFormula] = useState<"flow" | "latency" | "invalid sum" | "invalid throughput">("flow");
  const detail = {
    flow: ["mile × mile × mile/day", "mile³/day", true],
    latency: ["requests ÷ requests/second", "seconds", true],
    "invalid sum": ["seconds + bytes", "no common dimension", false],
    "invalid throughput": ["requests × seconds", "request·second", false],
  }[formula];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">expression<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={formula} onChange={(event) => setFormula(event.target.value as typeof formula)}><option>flow</option><option>latency</option><option>invalid sum</option><option>invalid throughput</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 font-mono text-accent">{detail[0]}</div><div className={"border p-4 font-mono " + (detail[2] ? "border-success text-success" : "border-danger text-danger")}>{detail[1]}</div></div>
      </Panel>
      <Caption>Dimension checks reject malformed equations before uncertain numeric inputs can distract from a structural error.</Caption>
    </figure>
  );
}

export function PP2RuleOf72Lab() {
  const [rate, setRate] = useState(8);
  const estimate = 72 / rate;
  const exact = Math.log(2) / Math.log(1 + rate / 100);
  const error = Math.abs(estimate - exact) / exact * 100;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">growth rate = {rate.toFixed(1)}% per period<input className="mt-2 w-full accent-current" type="range" min="1" max="20" step="0.5" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">72/r <span className="float-right font-mono">{estimate.toFixed(1)}</span></div><div className="border border-success p-3 text-success">exact <span className="float-right font-mono">{exact.toFixed(1)}</span></div><div className="border border-warning p-3 text-warning">error <span className="float-right font-mono">{error.toFixed(1)}%</span></div></div>
      </Panel>
      <Caption>The Rule of 72 turns a percentage growth rate into an approximate doubling time and makes exponential scale intuitive.</Caption>
    </figure>
  );
}

export function PP2NodeMemoryLab() {
  const [nodes, setNodes] = useState(2_000_000);
  const [pointerBytes, setPointerBytes] = useState<4 | 8>(8);
  const [overhead, setOverhead] = useState(8);
  const rawNode = 4 + pointerBytes;
  const alignedNode = Math.ceil(rawNode / pointerBytes) * pointerBytes + overhead;
  const totalMiB = nodes * alignedNode / (1024 * 1024);
  const fits = totalMiB <= 85;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">nodes = {nodes.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100000" max="4000000" step="100000" value={nodes} onChange={(event) => setNodes(Number(event.target.value))} /></label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">pointer bytes<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pointerBytes} onChange={(event) => setPointerBytes(Number(event.target.value) as 4 | 8)}><option value="4">4</option><option value="8">8</option></select></label><label className="text-xs text-secondary">allocator overhead = {overhead} bytes<input className="mt-2 w-full accent-current" type="range" min="0" max="32" step="4" value={overhead} onChange={(event) => setOverhead(Number(event.target.value))} /></label></div>
        <div className={"mt-4 border p-4 " + (fits ? "border-success text-success" : "border-danger text-danger")}><div className="text-xs">{alignedNode} bytes/node against 85 MiB free</div><div className="font-mono text-3xl">{totalMiB.toFixed(1)} MiB · {fits ? "fits" : "does not fit"}</div></div>
      </Panel>
      <Caption>Payload, alignment, pointer width, and allocator metadata all belong in a memory estimate; sizeof the fields alone is not enough.</Caption>
    </figure>
  );
}

export function PP2PrimitiveCostLab() {
  const [operation, setOperation] = useState<"integer add" | "cache miss" | "disk seek" | "network round trip">("cache miss");
  const [count, setCount] = useState(1_000_000);
  const nanos = {
    "integer add": 1,
    "cache miss": 100,
    "disk seek": 5_000_000,
    "network round trip": 20_000_000,
  }[operation];
  const seconds = nanos * count / 1e9;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">primitive<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={operation} onChange={(event) => setOperation(event.target.value as typeof operation)}><option>integer add</option><option>cache miss</option><option>disk seek</option><option>network round trip</option></select></label>
        <label className="mt-3 block text-xs text-secondary">count = {count.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1" max="2000000" step="1000" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 text-accent">model <span className="float-right font-mono">{nanos.toLocaleString()} ns/op</span></div><div className="border border-success p-4 text-success">total <span className="float-right font-mono">{seconds.toFixed(3)} s</span></div></div>
      </Panel>
      <Caption>Numbers are illustrative models; measure local primitives on the target system and keep units attached to every multiplication.</Caption>
    </figure>
  );
}

export function PP2OlympicsFeasibilityLab() {
  const [eventsPerMinute, setEventsPerMinute] = useState(30_000);
  const [millisecondsPerEvent, setMillisecondsPerEvent] = useState(4);
  const [workers, setWorkers] = useState(1);
  const requiredSeconds = eventsPerMinute * millisecondsPerEvent / 1000 / workers;
  const feasible = requiredSeconds <= 60;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">events/min = {eventsPerMinute.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000" max="100000" step="1000" value={eventsPerMinute} onChange={(event) => setEventsPerMinute(Number(event.target.value))} /></label><label className="text-xs text-secondary">ms/event = {millisecondsPerEvent}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={millisecondsPerEvent} onChange={(event) => setMillisecondsPerEvent(Number(event.target.value))} /></label><label className="text-xs text-secondary">workers = {workers}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={workers} onChange={(event) => setWorkers(Number(event.target.value))} /></label></div>
        <div className={"mt-4 border p-4 " + (feasible ? "border-success text-success" : "border-danger text-danger")}><div className="text-xs">compute demanded in each wall-clock minute</div><div className="font-mono text-3xl">{requiredSeconds.toFixed(1)} seconds · {feasible ? "feasible" : "redesign"}</div></div>
      </Panel>
      <Caption>A feasibility estimate should reject a design that demands more service time than the interval contains, even under generous assumptions.</Caption>
    </figure>
  );
}

export function PP2SafetyFactorLab() {
  const [uncertainty, setUncertainty] = useState<"measured" | "estimated" | "unknown nonlinear">("estimated");
  const [predictedLoad, setPredictedLoad] = useState(40);
  const factor = uncertainty === "measured" ? 1.5 : uncertainty === "estimated" ? 3 : 6;
  const designCapacity = predictedLoad * factor;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">knowledge quality<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={uncertainty} onChange={(event) => setUncertainty(event.target.value as typeof uncertainty)}><option>measured</option><option>estimated</option><option>unknown nonlinear</option></select></label>
        <label className="mt-3 block text-xs text-secondary">predicted peak load = {predictedLoad}<input className="mt-2 w-full accent-current" type="range" min="10" max="100" value={predictedLoad} onChange={(event) => setPredictedLoad(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">estimate {predictedLoad}</div><div className="border border-warning p-3 text-warning">factor {factor}x</div><div className="border border-success p-3 text-success">capacity {designCapacity}</div></div>
      </Panel>
      <Caption>A safety factor compensates for model uncertainty and variation; it does not excuse an avoidably wrong model or missing measurements.</Caption>
    </figure>
  );
}

export function PP2LittleLawLab() {
  const [rate, setRate] = useState(25);
  const [holding, setHolding] = useState(6);
  const inventory = rate * holding;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">flow rate λ = {rate}/year<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label><label className="text-xs text-secondary">holding time W = {holding.toFixed(1)} years<input className="mt-2 w-full accent-current" type="range" min="0.5" max="15" step="0.5" value={holding} onChange={(event) => setHolding(Number(event.target.value))} /></label></div>
        <div className="mt-4 border border-accent p-4 text-accent"><div className="text-xs">L = λW</div><div className="font-mono text-3xl">{inventory.toFixed(0)} items in system</div></div>
      </Panel>
      <Caption>At 25 cases per year and six years per case, a stable cellar holds about 150 cases on average.</Caption>
    </figure>
  );
}

export function PP2QueueFeasibilityLab() {
  const [inventory, setInventory] = useState(60);
  const [throughput, setThroughput] = useState(20);
  const [queueAhead, setQueueAhead] = useState(20);
  const systemTime = inventory / throughput;
  const wait = queueAhead / throughput;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs text-secondary">inside L = {inventory}<input className="mt-2 w-full accent-current" type="range" min="5" max="200" value={inventory} onChange={(event) => setInventory(Number(event.target.value))} /></label><label className="text-xs text-secondary">entry λ = {throughput}/hr<input className="mt-2 w-full accent-current" type="range" min="1" max="80" value={throughput} onChange={(event) => setThroughput(Number(event.target.value))} /></label><label className="text-xs text-secondary">queue = {queueAhead}<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={queueAhead} onChange={(event) => setQueueAhead(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 text-accent">average stay <span className="float-right font-mono">{systemTime.toFixed(1)} hr</span></div><div className="border border-warning p-4 text-warning">estimated wait <span className="float-right font-mono">{wait.toFixed(1)} hr</span></div></div>
      </Panel>
      <Caption>Little&apos;s Law converts visible inventory and flow into holding time without needing the detailed arrival or service distribution.</Caption>
    </figure>
  );
}

export function PP2EstimateCertificateLab() {
  const [fault, setFault] = useState<"none" | "unit mismatch" | "single path" | "no margin">("none");
  const checks = {
    question: true,
    decomposition: true,
    units: fault !== "unit mismatch",
    crosscheck: fault !== "single path",
    margin: fault !== "no margin",
    experiment: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">estimate audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={fault} onChange={(event) => setFault(event.target.value as typeof fault)}><option>none</option><option>unit mismatch</option><option>single path</option><option>no margin</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The estimate is suitable for a design decision." : "The estimate lacks a required confidence check."}</div>
      </Panel>
      <Caption>A useful envelope estimate states the question, decomposes it, preserves units, cross-checks independently, adds margin, and identifies what to measure next.</Caption>
    </figure>
  );
}
