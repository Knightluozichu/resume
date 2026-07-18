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

const flowEdges = [
  ["s", "a", 10],
  ["s", "b", 5],
  ["a", "b", 15],
  ["a", "t", 10],
  ["b", "t", 10],
] as const;

export function CLRS4FlowNetworkLab() {
  const [edgeIndex, setEdgeIndex] = useState(0);
  const edge = flowEdges[edgeIndex];
  return (
    <Figure caption="A flow network is a directed capacitated graph with source s and sink t; missing directed edges have zero capacity.">
      <label className="text-sm font-semibold text-primary">inspect edge<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={edgeIndex} onChange={(event) => setEdgeIndex(Number(event.target.value))}>{flowEdges.map((item, index) => <option key={`${item[0]}-${item[1]}`} value={index}>{item[0]} → {item[1]}</option>)}</select></label>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{flowEdges.map((item, index) => <div key={`${item[0]}-${item[1]}`} className={`border px-3 py-2 font-mono text-xs ${index === edgeIndex ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}>{item[0]}→{item[1]} · c={item[2]}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="source" value="s" /><Stat label="sink" value="t" /><Stat label="selected capacity" value={edge[2].toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4FlowConservationLab() {
  const [node, setNode] = useState<"a" | "b">("a");
  const rows = {
    a: ["10", "10", "flow to b 0, to t 10"],
    b: ["5", "5", "flow to t 5"],
  }[node];
  return (
    <Figure caption="Every internal vertex conserves flow: total inflow equals total outflow; only source creates net outflow and sink absorbs it.">
      <label className="text-sm font-semibold text-primary">internal vertex<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={node} onChange={(event) => setNode(event.target.value as typeof node)}><option value="a">a</option><option value="b">b</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="inflow" value={rows[0]} /><Stat label="outflow" value={rows[1]} tone="success" /><Stat label="routing" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4ResidualEdgeLab() {
  const [flow, setFlow] = useState(4);
  const capacity = 10;
  return (
    <Figure caption="Sending f units on (u,v) leaves c−f forward residual capacity and creates f reverse residual capacity, which can cancel earlier choices.">
      <label className="text-sm font-semibold text-primary">flow f(u,v) = {flow}<input className="mt-2 w-full accent-current" type="range" min="0" max={capacity} value={flow} onChange={(event) => setFlow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="original capacity" value={capacity.toString()} /><Stat label="forward residual" value={(capacity - flow).toString()} tone="success" /><Stat label="reverse residual" value={flow.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4AugmentingPathLab() {
  const [path, setPath] = useState<"a" | "b" | "reroute">("a");
  const rows = {
    a: ["s → a → t", "min(10,10)", "10"],
    b: ["s → b → t", "min(5,10)", "5"],
    reroute: ["s → b → a → t", "includes reverse residual edge", "cancel then redirect"],
  }[path];
  return (
    <Figure caption="An augmenting path lives in the residual network; its bottleneck is the minimum residual capacity on the path and determines the safe increment.">
      <label className="text-sm font-semibold text-primary">residual path<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={path} onChange={(event) => setPath(event.target.value as typeof path)}><option value="a">through a</option><option value="b">through b</option><option value="reroute">uses reverse edge</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="path" value={rows[0]} /><Stat label="bottleneck" value={rows[1]} tone="warning" /><Stat label="augmentation" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4FordFulkersonTraceLab() {
  const [step, setStep] = useState(1);
  const stages = [
    ["zero flow", "all forward residual capacities equal capacities", "0"],
    ["augment s-a-t by 10", "s-a and a-t saturate", "10"],
    ["augment s-b-t by 5", "source outgoing cut saturates", "15"],
  ];
  return (
    <Figure caption="Ford-Fulkerson repeatedly augments residual s-to-t paths; when no such path remains, the current flow is maximum.">
      <label className="text-sm font-semibold text-primary">augmentation step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-xs ${index === step ? "border-accent bg-accent/10 text-accent" : index < step ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="residual state" value={stages[step][1]} tone="warning" /><Stat label="flow value" value={stages[step][2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MinCutLab() {
  const [side, setSide] = useState<"s" | "sa" | "sab">("s");
  const rows = {
    s: ["{s}", "s→a 10 + s→b 5", "15"],
    sa: ["{s,a}", "s→b 5 + a→b 15 + a→t 10", "30"],
    sab: ["{s,a,b}", "a→t 10 + b→t 10", "20"],
  }[side];
  return (
    <Figure caption="Cut capacity sums only original forward edges from S to T; reverse-direction edges and current flow values do not belong in the capacity sum.">
      <label className="text-sm font-semibold text-primary">source side S<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={side} onChange={(event) => setSide(event.target.value as typeof side)}><option value="s">s</option><option value="sa">s,a</option><option value="sab">s,a,b</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="S" value={rows[0]} /><Stat label="crossing capacity" value={rows[1]} tone="warning" /><Stat label="c(S,T)" value={rows[2]} tone={side === "s" ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4MaxFlowMinCutLab() {
  const [complete, setComplete] = useState(true);
  return (
    <Figure caption="At termination, vertices reachable from s in the residual graph define a cut whose capacity equals the flow value, certifying both primal and dual optimality.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={complete} onChange={(event) => setComplete(event.target.checked)} />no residual s-to-t path remains</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="flow value |f|" value={complete ? "15" : "10"} /><Stat label="reachable cut capacity" value={complete ? "15" : "not tight"} tone={complete ? "success" : "warning"} /><Stat label="optimality" value={complete ? "certified" : "augmentable"} tone={complete ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4IntegralFlowLab() {
  const [capacity, setCapacity] = useState<"integer" | "fractional">("integer");
  const rows = {
    integer: ["integer capacities", "integer bottlenecks", "integer max flow exists"],
    fractional: ["real capacities", "fractional bottlenecks", "integrality not guaranteed"],
  }[capacity];
  return (
    <Figure caption="With integer capacities, Ford-Fulkerson starting from zero keeps every augmentation integral; this integrality powers the matching reduction.">
      <label className="text-sm font-semibold text-primary">capacity domain<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={capacity} onChange={(event) => setCapacity(event.target.value as typeof capacity)}><option value="integer">integer</option><option value="fractional">fractional</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="input" value={rows[0]} /><Stat label="augmentations" value={rows[1]} tone="warning" /><Stat label="conclusion" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

const matchingEdges = [["L1", "R1"], ["L1", "R2"], ["L2", "R2"], ["L2", "R3"], ["L3", "R1"]];

export function CLRS4BipartiteReductionLab() {
  const [edgeIndex, setEdgeIndex] = useState(2);
  const edge = matchingEdges[edgeIndex];
  return (
    <Figure caption="The matching reduction gives every source-to-left, bipartite, and right-to-sink edge unit capacity, so each vertex can carry at most one matched unit.">
      <label className="text-sm font-semibold text-primary">bipartite edge<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={edgeIndex} onChange={(event) => setEdgeIndex(Number(event.target.value))}>{matchingEdges.map((item, index) => <option key={item.join("-")} value={index}>{item[0]} — {item[1]}</option>)}</select></label>
      <div className="mt-4 flex items-center justify-center gap-2 font-mono text-sm"><div className="border border-accent p-3 text-accent">s</div><span>→</span><div className="border border-success p-3 text-success">{edge[0]}</div><span>→</span><div className="border border-success p-3 text-success">{edge[1]}</div><span>→</span><div className="border border-accent p-3 text-accent">t</div></div>
      <div className="mt-3 text-center text-sm text-secondary">every edge on this chain has capacity 1</div>
    </Figure>
  );
}

export function CLRS4MatchingFlowLab() {
  const [size, setSize] = useState(2);
  const pairs = [["L1", "R2"], ["L2", "R3"], ["L3", "R1"]];
  return (
    <Figure caption="Each unit-flow left-to-right edge corresponds to one matched pair; flow conservation and unit capacities enforce that no endpoint is reused.">
      <label className="text-sm font-semibold text-primary">matching units = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{pairs.map((pair, index) => <div key={pair.join("-")} className={`border p-3 text-center font-mono text-sm ${index < size ? "border-success text-success" : "border-border text-secondary"}`}>{pair[0]} — {pair[1]}</div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="flow value" value={size.toString()} /><Stat label="matching cardinality" value={size.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4FlowCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "capacity" | "conservation" | "residual" | "cut">("valid");
  const checks = {
    "capacity constraints hold": issue !== "capacity",
    "internal flow conservation holds": issue !== "conservation",
    "residual graph matches flow": issue !== "residual",
    "flow value equals a cut capacity": issue !== "cut",
  };
  return (
    <Figure caption="A maximum-flow certificate checks primal feasibility edge by edge and proves optimality by exhibiting a residual reachable cut with equal capacity.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid maximum flow</option><option value="capacity">over-capacity edge</option><option value="conservation">lost internal flow</option><option value="residual">missing reverse edge</option><option value="cut">flow below cut capacity</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
