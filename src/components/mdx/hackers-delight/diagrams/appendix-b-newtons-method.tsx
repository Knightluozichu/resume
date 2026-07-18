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
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

function sqrtSteps(value: number, initial: number, count: number) {
  const values = [initial];
  for (let index = 0; index < count; index += 1) values.push(0.5 * (values.at(-1)! + value / values.at(-1)!));
  return values;
}

function reciprocalSteps(value: number, initial: number, count: number) {
  const values = [initial];
  for (let index = 0; index < count; index += 1) {
    const current = values.at(-1)!;
    values.push(current * (2 - value * current));
  }
  return values;
}

export function HDAppendixBTangentLab() {
  const [estimate, setEstimate] = useState(2.4);
  const value = 2;
  const next = estimate - (estimate * estimate - value) / (2 * estimate);
  const width = 600;
  const height = 260;
  const xTo = (x: number) => 30 + x * 170;
  const yTo = (y: number) => 220 - y * 28;
  const curve = Array.from({ length: 61 }, (_, index) => {
    const x = index / 20;
    return `${index === 0 ? "M" : "L"}${xTo(x)},${yTo(x * x - value)}`;
  }).join(" ");
  const slope = 2 * estimate;
  const tangentAt = (x: number) => estimate * estimate - value + slope * (x - estimate);
  return (
    <Figure caption="Newton's next estimate is the x-intercept of the tangent line drawn at the current estimate.">
      <label className="text-sm font-semibold text-primary">current x_n = {estimate.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.5" max="3" step="0.05" value={estimate} onChange={(event) => setEstimate(Number(event.target.value))} /></label>
      <svg className="mt-4 h-auto w-full border border-border bg-background" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Parabola and Newton tangent"><line x1="30" y1={yTo(0)} x2="570" y2={yTo(0)} stroke="currentColor" className="text-border" /><path d={curve} fill="none" stroke="currentColor" strokeWidth="3" className="text-accent" /><line x1={xTo(0)} y1={yTo(tangentAt(0))} x2={xTo(3)} y2={yTo(tangentAt(3))} stroke="currentColor" strokeWidth="2" className="text-warning" /><circle cx={xTo(estimate)} cy={yTo(estimate * estimate - value)} r="6" fill="currentColor" className="text-warning" /><circle cx={xTo(next)} cy={yTo(0)} r="6" fill="currentColor" className="text-success" /></svg>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="f(x_n)" value={(estimate * estimate - value).toExponential(3)} /><Stat label="f'(x_n)" value={(2 * estimate).toFixed(3)} /><Stat label="x_(n+1)" value={next.toFixed(8)} tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixBSqrtIterationLab() {
  const [value, setValue] = useState(10);
  const [initial, setInitial] = useState(5);
  const values = sqrtSteps(value, initial, 5);
  const exact = Math.sqrt(value);
  return (
    <Figure caption="For f(x)=x²−a, Newton becomes the Babylonian update x←(x+a/x)/2 and rapidly settles near √a.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">a = {value}<input className="mt-2 w-full accent-current" type="range" min="0.25" max="64" step="0.25" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">x_0 = {initial}<input className="mt-2 w-full accent-current" type="range" min="0.25" max="16" step="0.25" value={initial} onChange={(event) => setInitial(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{values.map((entry, index) => <Stat key={index} label={`x_${index}`} value={entry.toPrecision(7)} tone={index === values.length - 1 ? "success" : "accent"} />)}</div>
      <div className="mt-3"><Stat label="final absolute error" value={Math.abs(values.at(-1)! - exact).toExponential(3)} tone="success" /></div>
    </Figure>
  );
}

export function HDAppendixBQuadraticErrorLab() {
  const [initialError, setInitialError] = useState(0.5);
  const errors = [initialError];
  for (let index = 0; index < 4; index += 1) {
    const current = errors.at(-1)!;
    errors.push(current * current / (2 * (1 + current)));
  }
  return (
    <Figure caption="For square-root Newton with relative error e, the exact recurrence e_next=e²/(2(1+e)) displays local quadratic convergence.">
      <label className="text-sm font-semibold text-primary">initial relative error e_0 = {initialError.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="-0.8" max="1.5" step="0.05" value={initialError} onChange={(event) => setInitialError(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-2">{errors.map((error, index) => <Stat key={index} label={`|e_${index}|`} value={Math.abs(error).toExponential(2)} tone={index >= 3 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function HDAppendixBReciprocalLab() {
  const [value, setValue] = useState(7);
  const [initial, setInitial] = useState(0.12);
  const values = reciprocalSteps(value, initial, 4);
  return (
    <Figure caption="Solving 1/y−a=0 yields y←y(2−ay); the multiplicative residual δ=1−ay is squared exactly each step.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">a = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" step="0.5" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">y_0 = {initial.toFixed(3)}<input className="mt-2 w-full accent-current" type="range" min="0.01" max="0.5" step="0.005" value={initial} onChange={(event) => setInitial(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-5 gap-2">{values.map((entry, index) => <Stat key={index} label={`δ_${index}`} value={(1 - value * entry).toExponential(2)} tone={index === values.length - 1 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function HDAppendixBDivisionLab() {
  const [numerator, setNumerator] = useState(37);
  const [denominator, setDenominator] = useState(7);
  const initial = 2 ** -Math.ceil(Math.log2(denominator));
  const reciprocal = reciprocalSteps(denominator, initial, 4).at(-1)!;
  const quotient = numerator * reciprocal;
  return (
    <Figure caption="Division can refine a reciprocal once, then multiply many numerators; quotient error inherits the reciprocal's relative residual.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">numerator = {numerator}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={numerator} onChange={(event) => setNumerator(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">denominator = {denominator}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={denominator} onChange={(event) => setDenominator(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="seed reciprocal" value={initial.toPrecision(5)} /><Stat label="refined reciprocal" value={reciprocal.toPrecision(9)} /><Stat label="multiply quotient" value={quotient.toPrecision(9)} tone="success" /><Stat label="exact division" value={(numerator / denominator).toPrecision(9)} /></div>
    </Figure>
  );
}

export function HDAppendixBInitialGuessLab() {
  const [value, setValue] = useState(37);
  const exponent = Math.floor(Math.log2(value));
  const seed = 2 ** Math.ceil(exponent / 2);
  const values = sqrtSteps(value, seed, 4);
  return (
    <Figure caption="A power-of-two seed from the input exponent puts square-root Newton within a bounded factor before refinement begins.">
      <label className="text-sm font-semibold text-primary">a = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="1024" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="floor log2(a)" value={exponent.toString()} /><Stat label="seed" value={seed.toString()} /><Stat label="after one step" value={values[1].toPrecision(7)} /><Stat label="after four steps" value={values.at(-1)!.toPrecision(9)} tone="success" /></div>
    </Figure>
  );
}

function failureSequence(mode: string) {
  let current = mode === "regular" ? 2.5 : mode === "multiple" ? 3 : 0;
  const values = [current];
  for (let index = 0; index < 5; index += 1) {
    let f: number;
    let derivative: number;
    if (mode === "regular") { f = current * current - 2; derivative = 2 * current; }
    else if (mode === "multiple") { f = (current - 1) ** 2; derivative = 2 * (current - 1); }
    else { f = current ** 3 - 2 * current + 2; derivative = 3 * current * current - 2; }
    if (derivative === 0) break;
    current -= f / derivative;
    values.push(current);
  }
  return values;
}

export function HDAppendixBFailureModesLab() {
  const [mode, setMode] = useState("cycle");
  const values = failureSequence(mode);
  return (
    <Figure caption="Newton is local: a simple root can converge quadratically, a repeated root often only linearly, and a poor start can enter a cycle.">
      <label className="text-sm font-semibold text-primary">case<select className="mt-2 block w-full border border-border bg-background p-2" value={mode} onChange={(event) => setMode(event.target.value)}><option value="regular">simple root: x²−2</option><option value="multiple">double root: (x−1)²</option><option value="cycle">cycle: x³−2x+2</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{values.map((entry, index) => <Stat key={index} label={`x_${index}`} value={entry.toPrecision(6)} tone={index === values.length - 1 ? "warning" : "accent"} />)}</div>
    </Figure>
  );
}

export function HDAppendixBDampingLab() {
  const [lambda, setLambda] = useState(0.5);
  let current = 0;
  const values = [current];
  for (let index = 0; index < 6; index += 1) {
    const f = current ** 3 - 2 * current + 2;
    const derivative = 3 * current * current - 2;
    current -= lambda * f / derivative;
    values.push(current);
  }
  return (
    <Figure caption="Damping scales the Newton correction; it can avoid an aggressive full step, but it does not by itself guarantee global convergence.">
      <label className="text-sm font-semibold text-primary">step scale λ = {lambda.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.1" max="1" step="0.05" value={lambda} onChange={(event) => setLambda(Number(event.target.value))} /></label>
      <div className="mt-4 flex items-end gap-2 overflow-x-auto pb-2">{values.map((entry, index) => <div key={index} className="w-16 shrink-0"><div className={`border ${Math.abs(entry ** 3 - 2 * entry + 2) < 0.01 ? "border-success bg-success/20" : "border-warning bg-warning/15"}`} style={{ height: `${24 + Math.min(100, Math.abs(entry) * 20)}px` }} /><div className="mt-1 text-center font-mono text-xs">{entry.toFixed(2)}</div></div>)}</div>
    </Figure>
  );
}

export function HDAppendixBStoppingLab() {
  const [value, setValue] = useState(19);
  const values = sqrtSteps(value, 8, 7);
  const rows = values.slice(1).map((entry, index) => ({ entry, step: Math.abs(entry - values[index]), residual: Math.abs(entry * entry - value) }));
  return (
    <Figure caption="A robust stop contract checks step size, residual, iteration cap, and finite values rather than waiting for exact equality alone.">
      <label className="text-sm font-semibold text-primary">a = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="64" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[30rem] border-collapse text-sm"><thead><tr><th className="border-b border-border p-2 text-left">iteration</th><th className="border-b border-border p-2 text-left">estimate</th><th className="border-b border-border p-2 text-left">step</th><th className="border-b border-border p-2 text-left">residual</th></tr></thead><tbody>{rows.map((row, index) => <tr key={index}><td className="border-b border-border/60 p-2 font-mono">{index + 1}</td><td className="border-b border-border/60 p-2 font-mono">{row.entry.toPrecision(9)}</td><td className="border-b border-border/60 p-2 font-mono">{row.step.toExponential(2)}</td><td className="border-b border-border/60 p-2 font-mono">{row.residual.toExponential(2)}</td></tr>)}</tbody></table></div>
    </Figure>
  );
}

export function HDAppendixBIntegerSqrtLab() {
  const [value, setValue] = useState(12345);
  const bitLength = Math.max(1, Math.floor(Math.log2(value)) + 1);
  let current = 2 ** Math.ceil(bitLength / 2);
  const values = [current];
  for (let index = 0; index < 12; index += 1) {
    const next = Math.floor((current + Math.floor(value / current)) / 2);
    if (next >= current) break;
    current = next;
    values.push(current);
  }
  return (
    <Figure caption="Integer square-root Newton floors division and stops when the decreasing sequence no longer improves; the result satisfies r²≤n<(r+1)².">
      <label className="text-sm font-semibold text-primary">n = {value}<input className="mt-2 w-full accent-current" type="range" min="1" max="1000000" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{values.map((entry, index) => <Stat key={index} label={`r_${index}`} value={entry.toString()} tone={index === values.length - 1 ? "success" : "accent"} />)}</div>
      <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="r²" value={(current * current).toString()} /><Stat label="(r+1)²" value={((current + 1) ** 2).toString()} /></div>
    </Figure>
  );
}

export function HDAppendixBPrecisionLab() {
  const [digits, setDigits] = useState(5);
  const round = (value: number) => Number(value.toPrecision(digits));
  let current = round(3);
  const values = [current];
  for (let index = 0; index < 6; index += 1) {
    current = round(0.5 * (current + 10 / current));
    values.push(current);
  }
  return (
    <Figure caption="Quadratic convergence eventually reaches a precision wall: rounding prevents the mathematical error-squaring law from creating more stored digits.">
      <label className="text-sm font-semibold text-primary">significant digits = {digits}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={digits} onChange={(event) => setDigits(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-7">{values.map((entry, index) => <Stat key={index} label={`x_${index}`} value={entry.toString()} tone={index === values.length - 1 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function HDAppendixBCertificateLab() {
  const [domain, setDomain] = useState(true);
  const [derivative, setDerivative] = useState(false);
  const [residual, setResidual] = useState(true);
  const [iterations, setIterations] = useState(false);
  const complete = domain && derivative && residual && iterations;
  return (
    <Figure caption="A Newton implementation needs a domain/seed contract, derivative safeguards, residual and step tests, and a hard iteration limit.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={domain} onChange={(event) => setDomain(event.target.checked)} />domain + seed</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={derivative} onChange={(event) => setDerivative(event.target.checked)} />derivative guard</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={residual} onChange={(event) => setResidual(event.target.checked)} />step + residual</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={iterations} onChange={(event) => setIterations(event.target.checked)} />iteration cap</label></div>
      <div className="mt-4"><Stat label="Newton certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
