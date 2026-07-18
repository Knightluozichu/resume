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

export function CLRS4AggregateStackLab() {
  const [pushes, setPushes] = useState(8);
  const [requested, setRequested] = useState(5);
  const popped = Math.min(pushes, requested);
  const total = pushes + popped;
  return (
    <Figure caption="Across any stack sequence, each item is pushed once and popped at most once, so even a large MULTIPOP cannot make total cost exceed twice the pushes.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">PUSH count = {pushes}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={pushes} onChange={(event) => setPushes(Number(event.target.value))} /></label><label className="text-sm text-primary">MULTIPOP request = {requested}<input className="mt-2 w-full accent-current" type="range" min="0" max="16" value={requested} onChange={(event) => setRequested(Number(event.target.value))} /></label></div>
      <div className="mt-4 flex min-h-12 flex-wrap items-end gap-1">{Array.from({ length: pushes }, (_, index) => <div key={index} className={`h-10 w-8 border text-center text-xs leading-10 ${index >= pushes - popped ? "border-warning text-warning line-through" : "border-success text-success"}`}>{index + 1}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="actual pushes" value={pushes.toString()} /><Stat label="actual pops" value={popped.toString()} tone="warning" /><Stat label="sequence cost" value={`${total} ≤ ${2 * pushes}`} tone="success" /></div>
    </Figure>
  );
}

function counterFlips(increments: number) {
  let value = 0;
  let total = 0;
  const costs: number[] = [];
  for (let i = 0; i < increments; i += 1) {
    let bits = value;
    let trailing = 0;
    while ((bits & 1) === 1) {
      trailing += 1;
      bits >>= 1;
    }
    const flips = trailing + 1;
    costs.push(flips);
    total += flips;
    value += 1;
  }
  return { value, total, costs };
}

export function CLRS4BinaryCounterLab() {
  const [increments, setIncrements] = useState(12);
  const result = counterFlips(increments);
  return (
    <Figure caption="Bit 0 flips every increment, bit 1 every two, and bit j every 2^j; the geometric series bounds n increments by fewer than 2n flips.">
      <label className="text-sm font-semibold text-primary">increments n = {increments}<input className="mt-2 w-full accent-current" type="range" min="1" max="32" value={increments} onChange={(event) => setIncrements(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-1">{result.costs.map((cost, index) => <div key={index} className={`min-w-8 border p-2 text-center font-mono text-xs ${cost > 2 ? "border-warning text-warning" : "border-border text-secondary"}`}>{cost}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="final counter" value={result.value.toString(2).padStart(6, "0")} /><Stat label="actual flips" value={result.total.toString()} tone="warning" /><Stat label="2n bound" value={(2 * increments).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4AccountingCoinsLab() {
  const [pushes, setPushes] = useState(7);
  const [pops, setPops] = useState(4);
  const actualPops = Math.min(pushes, pops);
  const actual = pushes + actualPops;
  const charged = 2 * pushes;
  const credit = pushes - actualPops;
  return (
    <Figure caption="Charging two units to PUSH pays one unit now and stores one coin on the item; its later POP consumes that coin and never creates debt.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">pushes = {pushes}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={pushes} onChange={(event) => setPushes(Number(event.target.value))} /></label><label className="text-sm text-primary">pops = {pops}<input className="mt-2 w-full accent-current" type="range" min="0" max="12" value={pops} onChange={(event) => setPops(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="actual cost" value={actual.toString()} /><Stat label="amortized charge" value={charged.toString()} tone="warning" /><Stat label="stored credit" value={credit.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4AccountingInvariantLab() {
  const [badCharge, setBadCharge] = useState(false);
  const charge = badCharge ? 1 : 2;
  const balance = 6 * charge - 10;
  return (
    <Figure caption="Accounting proofs require nonnegative accumulated credit for every prefix, not merely enough money at the end of one convenient sequence.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={badCharge} onChange={(event) => setBadCharge(event.target.checked)} />charge only one unit per PUSH</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="charge / push" value={charge.toString()} /><Stat label="prefix actual cost" value="10" tone="warning" /><Stat label="credit balance" value={balance.toString()} tone={balance >= 0 ? "success" : "danger"} /></div>
      <div className={`mt-3 border p-3 text-center text-sm ${balance >= 0 ? "border-success text-success" : "border-danger text-danger"}`}>{balance >= 0 ? "invariant holds" : "proof borrows from the future"}</div>
    </Figure>
  );
}

export function CLRS4PotentialCounterLab() {
  const [value, setValue] = useState(7);
  const beforeOnes = value.toString(2).split("").filter((bit) => bit === "1").length;
  const trailing = value.toString(2).match(/1+$/)?.[0].length ?? 0;
  const after = value + 1;
  const afterOnes = after.toString(2).split("").filter((bit) => bit === "1").length;
  const actual = trailing + 1;
  const amortized = actual + afterOnes - beforeOnes;
  return (
    <Figure caption="For a binary counter, potential equals the number of 1 bits; an expensive carry chain releases exactly the stored potential needed to pay for its flips.">
      <label className="text-sm font-semibold text-primary">counter before increment = {value}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="before" value={value.toString(2)} /><Stat label="after" value={after.toString(2)} /><Stat label="actual flips" value={actual.toString()} tone="warning" /><Stat label="amortized" value={amortized.toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4PotentialTelescopeLab() {
  const [steps, setSteps] = useState(10);
  const result = counterFlips(steps);
  const finalPotential = result.value.toString(2).split("").filter((bit) => bit === "1").length;
  const amortized = result.total + finalPotential;
  return (
    <Figure caption="Potential changes telescope: all internal plus and minus terms cancel, leaving only final minus initial potential beside total actual cost.">
      <label className="text-sm font-semibold text-primary">prefix length = {steps}<input className="mt-2 w-full accent-current" type="range" min="1" max="24" value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="sum actual" value={result.total.toString()} /><Stat label="final potential" value={finalPotential.toString()} tone="warning" /><Stat label="sum amortized" value={amortized.toString()} tone="success" /></div>
      <div className="mt-3 border border-border p-3 text-center font-mono text-sm text-secondary">Σĉ = Σc + Φ(Dn) − Φ(D0)</div>
    </Figure>
  );
}

function insertionTrace(count: number) {
  let size = 1;
  let num = 0;
  const costs: number[] = [];
  const capacities: number[] = [];
  for (let i = 0; i < count; i += 1) {
    let cost = 1;
    if (num === size) {
      cost += num;
      size *= 2;
    }
    num += 1;
    costs.push(cost);
    capacities.push(size);
  }
  return { costs, capacities, num, size };
}

export function CLRS4DynamicTableLoadLab() {
  const [count, setCount] = useState(9);
  const trace = insertionTrace(count);
  return (
    <Figure caption="A dynamic table doubles only when full; rare copies cost 1, 2, 4, and so on, while most inserts cost one slot write.">
      <label className="text-sm font-semibold text-primary">insertions = {count}<input className="mt-2 w-full accent-current" type="range" min="1" max="24" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-8 gap-1">{Array.from({ length: trace.size }, (_, index) => <div key={index} className={`h-9 border text-center text-xs leading-9 ${index < trace.num ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}>{index < trace.num ? index + 1 : "·"}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="elements" value={trace.num.toString()} /><Stat label="capacity" value={trace.size.toString()} /><Stat label="load factor" value={(trace.num / trace.size).toFixed(2)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4DynamicResizeLab() {
  const [num, setNum] = useState(5);
  const size = 16;
  const shrink = num === size / 4;
  const immediateHalfRuleWouldShrink = num <= size / 2;
  return (
    <Figure caption="Shrinking at one-quarter full leaves hysteresis after halving: the new load is one-half, far from the next growth boundary, so alternating operations cannot thrash.">
      <label className="text-sm font-semibold text-primary">elements in capacity 16 = {num}<input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={num} onChange={(event) => setNum(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="load factor" value={(num / size).toFixed(2)} /><Stat label="quarter rule" value={shrink ? "shrink to 8" : "keep 16"} tone={shrink ? "warning" : "success"} /><Stat label="half rule" value={immediateHalfRuleWouldShrink ? "would shrink" : "keep"} tone={immediateHalfRuleWouldShrink ? "danger" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4MethodCompareLab() {
  const [method, setMethod] = useState<"aggregate" | "accounting" | "potential">("aggregate");
  const rows = {
    aggregate: ["whole sequence", "bound total cost T(n)", "best for one operation family"],
    accounting: ["objects or operation types", "store explicit credit", "best for local payment stories"],
    potential: ["entire data-structure state", "use Φ(Di) changes", "best for interacting state features"],
  }[method];
  return (
    <Figure caption="Aggregate, accounting, and potential methods prove the same kind of worst-case sequence bound but expose different proof structure.">
      <label className="text-sm font-semibold text-primary">analysis method<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={method} onChange={(event) => setMethod(event.target.value as typeof method)}><option value="aggregate">aggregate</option><option value="accounting">accounting</option><option value="potential">potential</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="scope" value={rows[0]} /><Stat label="proof object" value={rows[1]} tone="warning" /><Stat label="use when" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4AmortizedCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "probability" | "negative" | "missing resize" | "single sequence">("valid");
  const checks = {
    "all operation sequences covered": issue !== "single sequence",
    "no probability assumption": issue !== "probability",
    "credit or potential nonnegative": issue !== "negative",
    "resize copies included": issue !== "missing resize",
  };
  return (
    <Figure caption="An amortized certificate covers every operation sequence, includes hidden work, and keeps credit or potential conditions strong enough to upper-bound actual cost.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid proof</option><option value="probability">uses average input probability</option><option value="negative">negative credit</option><option value="missing resize">omits resize copies</option><option value="single sequence">checks one trace only</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
