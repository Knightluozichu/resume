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
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-base">{value}</div></div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><Caption>{caption}</Caption></figure>;
}

function compact(value: number) {
  if (!Number.isFinite(value) || value > 1e12) return "> 10^12";
  return Math.round(value).toLocaleString();
}

export function CLRS4GrowthRaceLab() {
  const [power, setPower] = useState(6);
  const n = 2 ** power;
  const rows = [
    ["n", n, "bg-success"],
    ["n lg n", n * Math.log2(n), "bg-accent"],
    ["n²", n * n, "bg-warning"],
    ["2ⁿ", 2 ** n, "bg-danger"],
  ] as const;
  const maxLog = Math.max(...rows.map(([, value]) => Math.log10(Math.min(value, 1e12) + 1)));
  return (
    <Figure caption="Comparing growth rates means increasing the same input scale; constants matter locally, while the function family controls the long run.">
      <label className="text-sm font-semibold text-primary">n = 2^{power} = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="10" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
      <div className="mt-4 space-y-3">{rows.map(([label, value, color]) => <div key={label} className="grid grid-cols-[4rem_1fr_7rem] items-center gap-2 text-xs"><span className="font-mono text-secondary">{label}</span><div className="h-3 border border-border bg-background"><div className={`h-full ${color}`} style={{ width: `${100 * Math.log10(Math.min(value, 1e12) + 1) / maxLog}%` }} /></div><span className="text-right font-mono text-primary">{compact(value)}</span></div>)}</div>
    </Figure>
  );
}

export function CLRS4BoundDirectionLab() {
  const [notation, setNotation] = useState<"O" | "Ω" | "Θ">("Θ");
  const content = {
    O: ["eventual upper bound", "f(n) ≤ c g(n)", "guarantees no faster growth"],
    Ω: ["eventual lower bound", "c g(n) ≤ f(n)", "guarantees no slower growth"],
    Θ: ["eventual tight bound", "c₁g(n) ≤ f(n) ≤ c₂g(n)", "both directions hold"],
  }[notation];
  return (
    <Figure caption="O, Omega, and Theta are sets defined by eventual inequalities, not synonyms for worst, best, and average case.">
      <label className="text-sm font-semibold text-primary">notation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={notation} onChange={(event) => setNotation(event.target.value as typeof notation)}><option value="O">O</option><option value="Ω">Ω</option><option value="Θ">Θ</option></select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="meaning" value={content[0]} /><Stat label="for n ≥ n₀" value={content[1]} tone="warning" /><Stat label="consequence" value={content[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4WitnessLab() {
  const [c, setC] = useState(5);
  const [n0, setN0] = useState(4);
  const f = (n: number) => 3 * n * n + 2 * n + 1;
  const valid = Array.from({ length: 201 - n0 }, (_, index) => index + n0).every((n) => f(n) <= c * n * n);
  return (
    <Figure caption="A Big-O proof supplies concrete witnesses c and n0, then proves the inequality for every later input rather than for sampled points only.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">constant c = {c}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={c} onChange={(event) => setC(Number(event.target.value))} /></label><label className="text-sm text-primary">threshold n₀ = {n0}<input className="mt-2 w-full accent-current" type="range" min="1" max="40" value={n0} onChange={(event) => setN0(Number(event.target.value))} /></label></div>
      <div className={`mt-4 border p-4 text-center font-mono ${valid ? "border-success text-success" : "border-danger text-danger"}`}>3n² + 2n + 1 ≤ {c}n² for tested n ≥ {n0}: {valid ? "holds" : "counterexample"}</div>
    </Figure>
  );
}

export function CLRS4ThetaSandwichLab() {
  const [n, setN] = useState(20);
  const f = 4 * n * n + 3 * n;
  return (
    <Figure caption="A Theta proof sandwiches one function between positive constant multiples of the comparison function after a threshold.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="4n²" value={compact(4 * n * n)} tone="success" /><Stat label="4n² + 3n" value={compact(f)} /><Stat label="7n²" value={compact(7 * n * n)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4NotationSetLab() {
  const [relation, setRelation] = useState<"intersection" | "subset" | "nonmember">("intersection");
  const rows = {
    intersection: ["Θ(g) = O(g) ∩ Ω(g)", "tight means both upper and lower"],
    subset: ["n ∈ O(n²)", "a valid but deliberately loose upper bound"],
    nonmember: ["n² ∉ O(n)", "no fixed c catches quadratic growth"],
  }[relation];
  return (
    <Figure caption="Asymptotic classes are sets of functions; set language makes intersections, loose bounds, and nonmembership precise.">
      <label className="text-sm font-semibold text-primary">set relation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={relation} onChange={(event) => setRelation(event.target.value as typeof relation)}><option value="intersection">intersection</option><option value="subset">loose membership</option><option value="nonmember">nonmembership</option></select></label>
      <div className="mt-4 border border-accent p-4 text-center"><div className="font-mono text-lg text-accent">{rows[0]}</div><div className="mt-2 text-sm text-secondary">{rows[1]}</div></div>
    </Figure>
  );
}

export function CLRS4QuantifierLab() {
  const [swapped, setSwapped] = useState(false);
  return (
    <Figure caption="The quantifier order is the definition: one pair of fixed witnesses must work for every input after the threshold.">
      <label className="block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={swapped} onChange={(event) => setSwapped(event.target.checked)} />choose a new constant for each n</label>
      <div className={`mt-4 border p-4 text-center font-mono ${swapped ? "border-danger text-danger" : "border-success text-success"}`}>{swapped ? "∀ n, ∃ c(n): f(n) ≤ c(n)g(n)" : "∃ c > 0, ∃ n₀, ∀ n ≥ n₀: f(n) ≤ cg(n)"}</div>
      <div className="mt-2 text-center text-sm text-secondary">{swapped ? "too weak: nearly any positive functions pass" : "valid O-definition quantifiers"}</div>
    </Figure>
  );
}

export function CLRS4RatioClassifierLab() {
  const [pair, setPair] = useState<"same" | "smaller" | "larger">("same");
  const rows = {
    same: ["(3n² + n) / n²", "3", "Θ"],
    smaller: ["n lg n / n²", "0", "O but not Θ"],
    larger: ["2ⁿ / n³", "∞", "not O"],
  }[pair];
  return (
    <Figure caption="Ratio limits are a convenient classifier when the limit exists and comparison functions are eventually positive.">
      <label className="text-sm font-semibold text-primary">function pair<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={pair} onChange={(event) => setPair(event.target.value as typeof pair)}><option value="same">quadratic / quadratic</option><option value="smaller">n lg n / n²</option><option value="larger">2ⁿ / n³</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="ratio" value={rows[0]} /><Stat label="limit" value={rows[1]} tone="warning" /><Stat label="classification" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4CommonFunctionsLab() {
  const [family, setFamily] = useState<"floors" | "modular" | "polynomial" | "exponential" | "factorial" | "fibonacci">("floors");
  const rows = {
    floors: ["floor / ceiling", "⌊x⌋ ≤ x ≤ ⌈x⌉", "discrete sizes"],
    modular: ["modular arithmetic", "a mod n ∈ {0,…,n−1}", "cyclic indices"],
    polynomial: ["polynomial", "Σ aᵢnⁱ = Θ(nᵈ)", "largest nonzero degree"],
    exponential: ["exponential", "(1 + a/n)ⁿ → eᵃ", "repeated multiplication"],
    factorial: ["factorial", "n! ≈ √(2πn)(n/e)ⁿ", "permutations"],
    fibonacci: ["Fibonacci", "Fᵢ = (φⁱ − φ̂ⁱ)/√5", "linear recurrence"],
  }[family];
  return (
    <Figure caption="Common-function identities turn discrete indices, logarithms, factorials, and recurrences into reusable bounds.">
      <label className="text-sm font-semibold text-primary">function family<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={family} onChange={(event) => setFamily(event.target.value as typeof family)}>{Object.keys({ floors: 1, modular: 1, polynomial: 1, exponential: 1, factorial: 1, fibonacci: 1 }).map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="family" value={rows[0]} /><Stat label="identity" value={rows[1]} tone="warning" /><Stat label="algorithm role" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4LogScaleLab() {
  const [power, setPower] = useState(10);
  const n = 2 ** power;
  return (
    <Figure caption="Changing a logarithm base multiplies by a constant, so algorithmic asymptotic notation normally writes lg n without base ambiguity.">
      <label className="text-sm font-semibold text-primary">n = 2^{power}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="n" value={compact(n)} /><Stat label="lg n" value={power.toString()} tone="success" /><Stat label="ln n" value={(power * Math.LN2).toFixed(2)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4AsymptoticCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "sample only" | "moving constant" | "wrong direction" | "negative witness">("valid");
  const checks = {
    "eventual inequality": issue !== "sample only",
    "fixed constants": issue !== "moving constant",
    "bound direction": issue !== "wrong direction",
    "positive witnesses": issue !== "negative witness",
  };
  return (
    <Figure caption="A valid asymptotic certificate names the comparison function, direction, positive fixed witnesses, and universal range.">
      <label className="text-sm font-semibold text-primary">proof audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">valid proof</option><option value="sample only">finite samples only</option><option value="moving constant">constant depends on n</option><option value="wrong direction">wrong inequality direction</option><option value="negative witness">nonpositive witness</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}><div>{name}</div><div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
