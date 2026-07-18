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

function values(low: number, high: number) {
  return Array.from({ length: high - low + 1 }, (__, index) => low + index);
}

function bitOperation(name: "AND" | "OR" | "XOR", left: number, right: number) {
  if (name === "AND") return left & right;
  if (name === "OR") return left | right;
  return left ^ right;
}

export function HD4MembershipLab() {
  const [value, setValue] = useState(17);
  const low = -8;
  const high = 23;
  const inside = value >= low && value <= high;
  const shifted = value - low;
  const span = high - low;
  return (
    <Figure caption="A closed-range check can be viewed either as two comparisons or as one unsigned distance comparison after translating the lower bound to zero.">
      <label className="text-sm font-semibold text-primary">x = {value}<input className="mt-2 w-full accent-current" type="range" min="-32" max="48" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="range" value={`[${low}, ${high}]`} /><Stat label="x−low" value={shifted.toString()} /><Stat label="span" value={span.toString()} /><Stat label="inside" value={inside ? "yes" : "no"} tone={inside ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD4UnsignedDistanceLab() {
  const [value, setValue] = useState(-12);
  const low = -8;
  const high = 23;
  const modulo = 256;
  const distance = (value - low + modulo) % modulo;
  const span = high - low;
  const inside = distance <= span;
  return (
    <Figure caption="In an 8-bit model, values below low translate to a large modulo distance, allowing one unsigned comparison to reject both sides of a nonwrapping interval.">
      <label className="text-sm font-semibold text-primary">signed x = {value}<input className="mt-2 w-full accent-current" type="range" min="-32" max="48" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="modulo distance" value={distance.toString()} /><Stat label="allowed span" value={span.toString()} /><Stat label="inside" value={inside ? "yes" : "no"} tone={inside ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function HD4AddIntervalLab() {
  const [leftLow, setLeftLow] = useState(-3);
  const leftHigh = leftLow + 8;
  const rightLow = 4;
  const rightHigh = 11;
  const low = leftLow + rightLow;
  const high = leftHigh + rightHigh;
  return (
    <Figure caption="Independent integer intervals add endpointwise because addition is monotone in both operands; the result hull is [a+c, b+d].">
      <label className="text-sm font-semibold text-primary">left interval = [{leftLow}, {leftHigh}]<input className="mt-2 w-full accent-current" type="range" min="-20" max="10" value={leftLow} onChange={(event) => setLeftLow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left" value={`[${leftLow}, ${leftHigh}]`} /><Stat label="right" value={`[${rightLow}, ${rightHigh}]`} /><Stat label="sum hull" value={`[${low}, ${high}]`} tone="success" /></div>
    </Figure>
  );
}

export function HD4SubtractIntervalLab() {
  const [rightLow, setRightLow] = useState(3);
  const leftLow = 10;
  const leftHigh = 18;
  const rightHigh = rightLow + 5;
  const low = leftLow - rightHigh;
  const high = leftHigh - rightLow;
  return (
    <Figure caption="Subtraction increases with the left operand and decreases with the right, so opposite endpoints form [a−d, b−c].">
      <label className="text-sm font-semibold text-primary">right interval = [{rightLow}, {rightHigh}]<input className="mt-2 w-full accent-current" type="range" min="-8" max="12" value={rightLow} onChange={(event) => setRightLow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="left" value={`[${leftLow}, ${leftHigh}]`} /><Stat label="right" value={`[${rightLow}, ${rightHigh}]`} /><Stat label="difference hull" value={`[${low}, ${high}]`} tone="success" /></div>
    </Figure>
  );
}

export function HD4WraparoundBoundsLab() {
  const [leftLow, setLeftLow] = useState(240);
  const leftHigh = Math.min(255, leftLow + 10);
  const rightLow = 10;
  const rightHigh = 20;
  const exactLow = leftLow + rightLow;
  const exactHigh = leftHigh + rightHigh;
  const wraps = exactHigh > 255;
  const first = `[${exactLow & 0xff}, 255]`;
  const second = `[0, ${exactHigh & 0xff}]`;
  return (
    <Figure caption="A modulo sum may be a union of two unsigned intervals; forcing it into one ordinary interval either becomes unsound or loses nearly all precision.">
      <label className="text-sm font-semibold text-primary">left interval start = {leftLow}<input className="mt-2 w-full accent-current" type="range" min="220" max="245" value={leftLow} onChange={(event) => setLeftLow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="integer sum hull" value={`[${exactLow}, ${exactHigh}]`} /><Stat label="wraps 8-bit" value={wraps ? "yes" : "no"} tone={wraps ? "warning" : "success"} /><Stat label="stored set" value={wraps ? `${first} ∪ ${second}` : `[${exactLow}, ${exactHigh}]`} tone="success" /></div>
    </Figure>
  );
}

export function HD4DependencyLab() {
  const [radius, setRadius] = useState(10);
  const naiveLow = -2 * radius;
  const naiveHigh = 2 * radius;
  return (
    <Figure caption="Interval propagation treats repeated occurrences as independent unless correlation is tracked: x−x is exactly zero, not the wide independent hull.">
      <label className="text-sm font-semibold text-primary">x interval = [−{radius}, {radius}]<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={radius} onChange={(event) => setRadius(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="independent x−y" value={`[${naiveLow}, ${naiveHigh}]`} tone="warning" /><Stat label="constraint" value="y = x" /><Stat label="exact x−x" value="[0, 0]" tone="success" /></div>
    </Figure>
  );
}

export function HD4LogicalIntervalLab() {
  const [operation, setOperation] = useState<"AND" | "OR" | "XOR">("OR");
  const leftLow = 0;
  const [leftHigh, setLeftHigh] = useState(2);
  const rightLow = 0;
  const rightHigh = 2;
  const outputs = values(leftLow, leftHigh).flatMap((left) => values(rightLow, rightHigh).map((right) => bitOperation(operation, left, right)));
  const minimum = Math.min(...outputs);
  const maximum = Math.max(...outputs);
  const distinct = new Set(outputs).size;
  return (
    <Figure caption="Small-width enumeration gives the exact extrema and reveals that logical operations are not numerically monotone over integer intervals.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">operation<select className="mt-2 w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value as "AND" | "OR" | "XOR")}><option>AND</option><option>OR</option><option>XOR</option></select></label><label className="text-sm font-semibold text-primary">left high = {leftHigh}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={leftHigh} onChange={(event) => setLeftHigh(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="left interval" value={`[0, ${leftHigh}]`} /><Stat label="right interval" value="[0, 2]" /><Stat label="exact hull" value={`[${minimum}, ${maximum}]`} tone="success" /><Stat label="distinct outputs" value={distinct.toString()} /></div>
    </Figure>
  );
}

export function HD4EndpointTrapLab() {
  const [operation, setOperation] = useState<"AND" | "OR" | "XOR">("OR");
  const a = 0;
  const b = operation === "AND" ? 1 : 2;
  const c = 0;
  const d = 2;
  const all = values(a, b).flatMap((left) => values(c, d).map((right) => bitOperation(operation, left, right)));
  const endpoints = [bitOperation(operation, a, c), bitOperation(operation, a, d), bitOperation(operation, b, c), bitOperation(operation, b, d)];
  const exact = `[${Math.min(...all)}, ${Math.max(...all)}]`;
  const endpointHull = `[${Math.min(...endpoints)}, ${Math.max(...endpoints)}]`;
  return (
    <Figure caption="Evaluating only four endpoint pairs works for monotone arithmetic but can miss logical extrema attained by interior bit patterns.">
      <label className="text-sm font-semibold text-primary">operation<select className="mt-2 w-full border border-border bg-background p-2" value={operation} onChange={(event) => setOperation(event.target.value as "AND" | "OR" | "XOR")}><option>AND</option><option>OR</option><option>XOR</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="input intervals" value={`[${a},${b}] × [${c},${d}]`} /><Stat label="endpoint-only hull" value={endpointHull} tone="danger" /><Stat label="exact hull" value={exact} tone="success" /></div>
    </Figure>
  );
}

export function HD4ComplementBoundsLab() {
  const [low, setLow] = useState(40);
  const high = Math.min(255, low + 50);
  const outLow = 255 - high;
  const outHigh = 255 - low;
  return (
    <Figure caption="Fixed-width complement is order reversing: NOT x equals mask−x, so an interval [a,b] maps exactly to [mask−b, mask−a].">
      <label className="text-sm font-semibold text-primary">8-bit input = [{low}, {high}]<input className="mt-2 w-full accent-current" type="range" min="0" max="205" value={low} onChange={(event) => setLow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="NOT lower endpoint" value={(255 - low).toString()} /><Stat label="NOT upper endpoint" value={(255 - high).toString()} /><Stat label="exact output hull" value={`[${outLow}, ${outHigh}]`} tone="success" /></div>
    </Figure>
  );
}

export function HD4PrefixSplitLab() {
  const [low, setLow] = useState(5);
  const high = low + 6;
  const split = 8;
  const below = Math.max(0, Math.min(high, split - 1) - low + 1);
  const above = Math.max(0, high - Math.max(low, split) + 1);
  return (
    <Figure caption="Exact logical-bound algorithms split an interval where a significant bit changes, then reason under fixed high-bit prefixes.">
      <label className="text-sm font-semibold text-primary">4-bit interval = [{low}, {high}]<input className="mt-2 w-full accent-current" type="range" min="0" max="9" value={low} onChange={(event) => setLow(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="bit-3 = 0 values" value={below.toString()} /><Stat label="bit-3 = 1 values" value={above.toString()} /><Stat label="needs split" value={below > 0 && above > 0 ? "yes" : "no"} tone={below > 0 && above > 0 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function HD4CoarseLogicalBoundsLab() {
  const [leftHigh, setLeftHigh] = useState(90);
  const rightHigh = 150;
  const wordMaximum = 255;
  const andUpper = Math.min(leftHigh, rightHigh);
  const xorOrUpper = Math.min(wordMaximum, leftHigh + rightHigh);
  return (
    <Figure caption="Cheap universal bounds remain sound without pretending to be exact: AND cannot exceed either operand, while OR and XOR cannot exceed x+y or the word maximum.">
      <label className="text-sm font-semibold text-primary">x upper bound = {leftHigh}<input className="mt-2 w-full accent-current" type="range" min="0" max="200" value={leftHigh} onChange={(event) => setLeftHigh(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="AND upper" value={andUpper.toString()} tone="success" /><Stat label="OR upper" value={xorOrUpper.toString()} /><Stat label="XOR upper" value={xorOrUpper.toString()} /></div>
    </Figure>
  );
}

export function HD4BoundsCertificateLab() {
  const [domain, setDomain] = useState(true);
  const [overflow, setOverflow] = useState(false);
  const [correlation, setCorrelation] = useState(true);
  const complete = domain && overflow && correlation;
  return (
    <Figure caption="A bound is usable only when its numeric domain, overflow model, and variable correlations are stated and checked.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={domain} onChange={(event) => setDomain(event.target.checked)} />domain</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={overflow} onChange={(event) => setOverflow(event.target.checked)} />overflow</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={correlation} onChange={(event) => setCorrelation(event.target.checked)} />correlation</label></div>
      <div className="mt-4"><Stat label="bounds certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
