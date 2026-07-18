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

function range(start: number, end: number) {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

export function CLRS4SigmaRangeLab() {
  const [start, setStart] = useState(2);
  const [end, setEnd] = useState(6);
  const terms = range(start, Math.max(start, end));
  return (
    <Figure caption="Sigma notation binds an index over an inclusive integer range; changing either endpoint changes both term count and value.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">lower index a = {start}<input className="mt-2 w-full accent-current" type="range" min="0" max="6" value={start} onChange={(event) => setStart(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">upper index b = {end}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={end} onChange={(event) => setEnd(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="indices" value={terms.join(",") || "empty"} /><Stat label="term count" value={terms.length.toString()} /><Stat label="sum of indices" value={terms.reduce((sum, value) => sum + value, 0).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4LinearityLab() {
  const [alpha, setAlpha] = useState(2);
  const [beta, setBeta] = useState(3);
  const a = [1, 2, 4];
  const b = [5, 1, 2];
  const left = a.reduce((sum, value, index) => sum + alpha * value + beta * b[index], 0);
  const right = alpha * a.reduce((sum, value) => sum + value, 0) + beta * b.reduce((sum, value) => sum + value, 0);
  return (
    <Figure caption="Finite summation is linear: constants move outside and sums distribute across addition without changing the index range.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">α = {alpha}<input className="mt-2 w-full accent-current" type="range" min="-3" max="5" value={alpha} onChange={(event) => setAlpha(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">β = {beta}<input className="mt-2 w-full accent-current" type="range" min="-3" max="5" value={beta} onChange={(event) => setBeta(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Σ(αaᵢ+βbᵢ)" value={left.toString()} /><Stat label="αΣaᵢ+βΣbᵢ" value={right.toString()} tone="success" /><Stat label="difference" value={(left - right).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ArithmeticSeriesLab() {
  const [n, setN] = useState(10);
  const direct = range(1, n).reduce((sum, value) => sum + value, 0);
  const formula = n * (n + 1) / 2;
  return (
    <Figure caption="Pairing the first and last terms of 1+2+⋯+n yields n(n+1)/2; the closed form can be checked against direct accumulation.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="50" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="direct sum" value={direct.toString()} /><Stat label="n(n+1)/2" value={formula.toString()} tone="success" /><Stat label="paired average" value={((n + 1) / 2).toFixed(1)} /></div>
    </Figure>
  );
}

export function CLRS4GeometricSeriesLab() {
  const [ratio, setRatio] = useState(0.5);
  const [n, setN] = useState(6);
  const direct = range(0, n).reduce((sum, exponent) => sum + ratio ** exponent, 0);
  const formula = ratio === 1 ? n + 1 : (1 - ratio ** (n + 1)) / (1 - ratio);
  return (
    <Figure caption="A finite geometric series has a closed form for every ratio except the removable r=1 case, where every term equals one.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">ratio r = {ratio.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="-0.9" max="1.5" step="0.1" value={ratio} onChange={(event) => setRatio(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">last exponent n = {n}<input className="mt-2 w-full accent-current" type="range" min="0" max="12" value={n} onChange={(event) => setN(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="direct" value={direct.toFixed(4)} /><Stat label="closed form" value={formula.toFixed(4)} tone="success" /><Stat label="behavior" value={Math.abs(ratio) < 1 ? "convergent tail" : "no finite limit"} tone={Math.abs(ratio) < 1 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4HarmonicSeriesLab() {
  const [n, setN] = useState(16);
  const harmonic = range(1, n).reduce((sum, value) => sum + 1 / value, 0);
  return (
    <Figure caption="The harmonic sum grows without bound but only logarithmically; ln n and ln n+1 give useful integral comparison bounds.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="200" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Hₙ" value={harmonic.toFixed(4)} /><Stat label="ln n" value={Math.log(n).toFixed(4)} tone="success" /><Stat label="ln n + 1" value={(Math.log(n) + 1).toFixed(4)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4TelescopingLab() {
  const [n, setN] = useState(8);
  const terms = range(1, n).map((value) => 1 / value - 1 / (value + 1));
  const direct = terms.reduce((sum, value) => sum + value, 0);
  const boundary = 1 - 1 / (n + 1);
  return (
    <Figure caption="In a telescoping sum, adjacent positive and negative terms cancel, leaving only boundary values.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="expanded terms" value={terms.slice(0, 4).map((value) => value.toFixed(3)).join(",")} /><Stat label="direct sum" value={direct.toFixed(5)} /><Stat label="boundary form" value={boundary.toFixed(5)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4DifferentiateSeriesLab() {
  const [x, setX] = useState(0.5);
  const [n, setN] = useState(5);
  const derivativeTerms = range(1, n).map((k) => k * x ** (k - 1));
  const derivative = derivativeTerms.reduce((sum, value) => sum + value, 0);
  return (
    <Figure caption="Differentiating a finite power series term by term turns Σxᵏ into Σkxᵏ⁻¹ and generates weighted-sum identities.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x = {x.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="-0.8" max="0.9" step="0.1" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">degree n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="12" value={n} onChange={(event) => setN(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="derivative terms" value={derivativeTerms.map((value) => value.toFixed(2)).join(",")} /><Stat label="Σkxᵏ⁻¹" value={derivative.toFixed(4)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4TermwiseBoundLab() {
  const [n, setN] = useState(10);
  const actual = range(1, n).reduce((sum, value) => sum + Math.sqrt(value), 0);
  const bound = n * Math.sqrt(n);
  return (
    <Figure caption="If every nonnegative term aₖ is at most bₖ, summing preserves the inequality; a uniform maximum gives Σaₖ≤n·max aₖ.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="50" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Σ√k" value={actual.toFixed(2)} /><Stat label="n√n bound" value={bound.toFixed(2)} tone="success" /><Stat label="slack" value={(bound - actual).toFixed(2)} /></div>
    </Figure>
  );
}

export function CLRS4SplitRangeLab() {
  const [split, setSplit] = useState(5);
  const n = 12;
  const left = range(1, split).reduce((sum, value) => sum + value ** 2, 0);
  const right = range(split + 1, n).reduce((sum, value) => sum + value ** 2, 0);
  return (
    <Figure caption="Splitting a summation at a chosen threshold isolates ranges where different bounds or monotonicity arguments apply.">
      <label className="text-sm font-semibold text-primary">split index m = {split}<input className="mt-2 w-full accent-current" type="range" min="1" max={n - 1} value={split} onChange={(event) => setSplit(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Σ₁ᵐ k²" value={left.toString()} /><Stat label="Σₘ₊₁ⁿ k²" value={right.toString()} /><Stat label="combined" value={(left + right).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4IntegralBoundLab() {
  const [n, setN] = useState(20);
  const sum = range(1, n).reduce((total, value) => total + 1 / value, 0);
  const lower = Math.log(n + 1);
  const upper = 1 + Math.log(n);
  return (
    <Figure caption="For positive decreasing f, rectangles and the area under f bound the sum from both sides; f(x)=1/x yields logarithmic harmonic bounds.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="200" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="lower integral" value={lower.toFixed(4)} tone="success" /><Stat label="Hₙ" value={sum.toFixed(4)} /><Stat label="upper integral" value={upper.toFixed(4)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4DominantTermLab() {
  const [n, setN] = useState(10);
  const terms = range(1, n).map((value) => 2 ** value);
  const sum = terms.reduce((total, value) => total + value, 0);
  const last = terms[terms.length - 1];
  return (
    <Figure caption="For a geometrically increasing sequence, the last term is a constant fraction of the whole sum, so the sum has the same asymptotic order.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="last term 2ⁿ" value={last.toLocaleString()} /><Stat label="Σ2ᵏ" value={sum.toLocaleString()} /><Stat label="sum / last" value={(sum / last).toFixed(3)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4GeometricTailLab() {
  const [start, setStart] = useState(4);
  const ratio = 0.5;
  const tail = ratio ** start / (1 - ratio);
  return (
    <Figure caption="For |r|<1, the infinite tail beginning at index m equals rᵐ/(1−r), turning truncation error into an explicit bound.">
      <label className="text-sm font-semibold text-primary">tail starts at m = {start}<input className="mt-2 w-full accent-current" type="range" min="0" max="16" value={start} onChange={(event) => setStart(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="ratio r" value={ratio.toString()} /><Stat label="first omitted" value={(ratio ** start).toFixed(6)} /><Stat label="infinite tail" value={tail.toFixed(6)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4SummationCertificateLab() {
  const [identity, setIdentity] = useState(true);
  const [rangeCheck, setRangeCheck] = useState(true);
  const [boundCheck, setBoundCheck] = useState(false);
  const complete = identity && rangeCheck && boundCheck;
  return (
    <Figure caption="A summation certificate records the index range, transformation identity, inequality direction, and asymptotic conclusion rather than only the final formula.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={rangeCheck} onChange={(event) => setRangeCheck(event.target.checked)} />index range</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={identity} onChange={(event) => setIdentity(event.target.checked)} />identity</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={boundCheck} onChange={(event) => setBoundCheck(event.target.checked)} />bound direction</label></div>
      <div className="mt-4"><Stat label="derivation" value={complete ? "auditable" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
