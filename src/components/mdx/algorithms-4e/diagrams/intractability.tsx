"use client";

import { useState, type ReactNode } from "react";

type Assignment = Record<"x1" | "x2" | "x3", boolean>;

const clauses: (("x1" | "x2" | "x3") | `!${"x1" | "x2" | "x3"}`)[][] = [
  ["x1", "!x2", "x3"],
  ["!x1", "x2"],
  ["x2", "!x3"],
];

const tours = [
  { name: "A-B-C-D-A", cost: 22 },
  { name: "A-B-D-C-A", cost: 17 },
  { name: "A-C-B-D-A", cost: 24 },
  { name: "A-C-D-B-A", cost: 19 },
];

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function logFactorial(n: number) {
  let total = 0;
  for (let value = 2; value <= n; value += 1) total += Math.log10(value);
  return total;
}

function literalValue(literal: string, assignment: Assignment) {
  const negated = literal.startsWith("!");
  const variable = (negated ? literal.slice(1) : literal) as keyof Assignment;
  return negated ? !assignment[variable] : assignment[variable];
}

export function Algs4GrowthRaceLab() {
  const [n, setN] = useState(30);
  const rows = [
    { name: "n³", log: 3 * Math.log10(n), kind: "polynomial" },
    { name: "n¹⁰", log: 10 * Math.log10(n), kind: "polynomial" },
    { name: "1.1ⁿ", log: n * Math.log10(1.1), kind: "exponential" },
    { name: "2ⁿ", log: n * Math.log10(2), kind: "exponential" },
    { name: "n!", log: logFactorial(n), kind: "factorial" },
  ];
  const max = Math.max(...rows.map((row) => row.log));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">input size n = {n}<input className="mt-2 w-full accent-current" type="range" min="5" max="100" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{rows.map((row) => <div key={row.name} className="grid grid-cols-[3rem_1fr_5.5rem] items-center gap-2 text-xs"><span className="font-mono text-primary">{row.name}</span><div className="h-3 border border-border bg-background"><div className={"h-full " + (row.kind === "polynomial" ? "bg-success" : row.kind === "exponential" ? "bg-warning" : "bg-danger")} style={{ width: `${Math.max(2, row.log / max * 100)}%` }} /></div><span className="text-right font-mono text-secondary">10^{row.log.toFixed(1)}</span></div>)}</div>
      </Panel>
      <Caption>Even a mild exponential eventually outruns every fixed-degree polynomial; factorial growth separates still faster.</Caption>
    </figure>
  );
}

export function Algs4EncodingSizeLab() {
  const [bits, setBits] = useState(40);
  const trialLog = bits / 2 * Math.log10(2);
  const polynomialLog = 3 * Math.log10(bits);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">integer encoding length b = {bits} bits<input className="mt-2 w-full accent-current" type="range" min="8" max="128" step="8" value={bits} onChange={(event) => setBits(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-success p-4 text-success"><div className="text-xs">polynomial in input length b³</div><div className="mt-1 font-mono text-xl">≈ 10^{polynomialLog.toFixed(1)}</div></div><div className="border border-danger p-4 text-danger"><div className="text-xs">trial divisors up to √N</div><div className="mt-1 font-mono text-xl">≈ 10^{trialLog.toFixed(1)}</div></div></div>
        <div className="mt-3 text-sm text-secondary">The represented integer can be as large as about 2^{bits}; complexity is measured against {bits}, not against that numeric value.</div>
      </Panel>
      <Caption>Input size is representation length: trial division to √N is exponential in the number of bits used to encode N.</Caption>
    </figure>
  );
}

export function Algs4SearchDecisionLab() {
  const [threshold, setThreshold] = useState(18);
  const feasible = tours.filter((tour) => tour.cost <= threshold);
  const optimum = Math.min(...tours.map((tour) => tour.cost));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">decision threshold L = {threshold}<input className="mt-2 w-full accent-current" type="range" min="15" max="25" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{tours.map((tour) => <div key={tour.name} className={"border p-3 text-xs " + (tour.cost <= threshold ? "border-success text-success" : "border-border text-secondary")}><div>{tour.name}</div><div className="font-mono text-lg">{tour.cost}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><div className={"border p-3 " + (feasible.length > 0 ? "border-success text-success" : "border-danger text-danger")}>decision: {feasible.length > 0 ? "YES" : "NO"}</div><div className="border border-accent p-3 text-accent">optimization optimum: {optimum}</div></div>
      </Panel>
      <Caption>Decision asks whether a witness under threshold L exists; repeated threshold queries can recover an optimum when costs have bounded encoding.</Caption>
    </figure>
  );
}

export function Algs4PolynomialVerifierLab() {
  const [assignment, setAssignment] = useState<Assignment>({ x1: true, x2: false, x3: true });
  const clauseValues = clauses.map((clause) => clause.some((literal) => literalValue(literal, assignment)));
  const accepted = clauseValues.every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid grid-cols-3 gap-2">{(Object.keys(assignment) as (keyof Assignment)[]).map((variable) => <label key={variable} className={"border p-3 text-center text-sm " + (assignment[variable] ? "border-accent text-accent" : "border-border text-secondary")}><input className="mr-2 accent-current" type="checkbox" checked={assignment[variable]} onChange={() => setAssignment((current) => ({ ...current, [variable]: !current[variable] }))} />{variable} = {assignment[variable] ? "T" : "F"}</label>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{clauses.map((clause, index) => <div key={clause.join("|")} className={"border p-3 text-xs " + (clauseValues[index] ? "border-success text-success" : "border-danger text-danger")}><div className="font-mono">({clause.join(" ∨ ")})</div><div>{clauseValues[index] ? "satisfied" : "false"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-center " + (accepted ? "border-success text-success" : "border-danger text-danger")}>certificate verifier: {accepted ? "accept" : "reject"}</div>
      </Panel>
      <Caption>A SAT assignment may be hard to discover, but checking every literal and clause takes time polynomial in the formula length.</Caption>
    </figure>
  );
}

export function Algs4PvsNPMap() {
  const [assumption, setAssumption] = useState<"unknown" | "equal" | "separate">("unknown");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">hypothesis<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={assumption} onChange={(event) => setAssumption(event.target.value as typeof assumption)}><option value="unknown">current knowledge: unresolved</option><option value="equal">suppose P = NP</option><option value="separate">suppose P ≠ NP</option></select></label>
        <div className="mt-4 grid place-items-center">
          <div className="grid h-52 w-52 place-items-center rounded-full border-2 border-warning text-warning">
            <div className={"grid place-items-center rounded-full border-2 border-success text-center text-success " + (assumption === "equal" ? "h-48 w-48" : "h-28 w-28")}><div><div className="text-2xl font-semibold">P</div><div className="text-xs">polynomial solve</div></div></div>
            <span className="absolute mt-40 text-xs">NP: polynomial verify</span>
          </div>
        </div>
        <div className="mt-3 border border-border p-3 text-sm text-secondary">{assumption === "equal" ? "Every polynomially verifiable YES witness would also be polynomially discoverable." : assumption === "separate" ? "Some NP problems would have efficiently checkable witnesses but no polynomial-time deterministic solver." : "P is contained in NP; whether the containment is strict remains unproved."}</div>
      </Panel>
      <Caption>P is contained in NP because a polynomial-time solver also supplies a polynomial-time verifier; equality is the open question.</Caption>
    </figure>
  );
}

export function Algs4NPCompleteDefinitionMap() {
  const [state, setState] = useState<"complete" | "hard only" | "member only">("complete");
  const inNP = state !== "hard only";
  const allReduce = state !== "member only";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate problem X<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={state} onChange={(event) => setState(event.target.value as typeof state)}><option value="complete">both obligations proved</option><option value="hard only">only NP-hardness proved</option><option value="member only">only X in NP proved</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className={"border p-4 " + (inNP ? "border-success text-success" : "border-danger text-danger")}><div className="font-semibold">membership</div><div className="mt-1 text-sm">X has polynomial-size certificates and verifier</div></div><div className={"border p-4 " + (allReduce ? "border-success text-success" : "border-danger text-danger")}><div className="font-semibold">hardness</div><div className="mt-1 text-sm">every problem in NP polynomially reduces to X</div></div></div>
        <div className={"mt-3 border p-3 text-center " + (inNP && allReduce ? "border-success text-success" : "border-warning text-warning")}>{inNP && allReduce ? "X is NP-complete" : allReduce ? "X is NP-hard; membership is still missing" : "X is in NP; hardness is still missing"}</div>
      </Panel>
      <Caption>NP-completeness requires both polynomial verifiability and universality under polynomial-time reductions.</Caption>
    </figure>
  );
}

export function Algs4HardnessReductionLab() {
  const [direction, setDirection] = useState<"correct" | "reversed">("correct");
  const [targetInNP, setTargetInNP] = useState(true);
  const correct = direction === "correct";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">reduction claim<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={direction} onChange={(event) => setDirection(event.target.value as typeof direction)}><option value="correct">known NP-complete X reduces to Y</option><option value="reversed">Y reduces to known NP-complete X</option></select></label>
        <label className="mt-3 block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={targetInNP} onChange={(event) => setTargetInNP(event.target.checked)} />Y has also been proved in NP</label>
        <div className="mt-4 flex items-center justify-center gap-4"><div className="border border-danger p-4 text-center text-danger">NP-complete X</div><div className="text-2xl text-accent">{correct ? "→" : "←"}</div><div className="border border-accent p-4 text-center text-accent">candidate Y</div></div>
        <div className={"mt-3 border p-3 text-sm " + (correct && targetInNP ? "border-success text-success" : "border-warning text-warning")}>{correct && targetInNP ? "Y is NP-complete: hardness transfers and membership closes the definition." : correct ? "Y is NP-hard, but NP membership is not established." : "This direction can give Y an upper bound; it does not establish Y's hardness."}</div>
      </Panel>
      <Caption>To prove a new problem NP-complete, reduce one known NP-complete problem into it, then separately prove the new problem is in NP.</Caption>
    </figure>
  );
}

export function Algs4CircuitSatLab() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const g1 = a || b;
  const g2 = !a || b;
  const output = g1 && g2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid grid-cols-2 gap-2"><label className="border border-border p-3 text-center"><input className="mr-2 accent-current" type="checkbox" checked={a} onChange={(event) => setA(event.target.checked)} />a = {a ? "1" : "0"}</label><label className="border border-border p-3 text-center"><input className="mr-2 accent-current" type="checkbox" checked={b} onChange={(event) => setB(event.target.checked)} />b = {b ? "1" : "0"}</label></div>
        <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><div className={"border p-3 text-center " + (g1 ? "border-success text-success" : "border-danger text-danger")}>g₁ = a ∨ b<br />{g1 ? "1" : "0"}</div><div className="text-accent">→</div><div className={"border p-3 text-center " + (g2 ? "border-success text-success" : "border-danger text-danger")}>g₂ = ¬a ∨ b<br />{g2 ? "1" : "0"}</div><div className="text-accent">→</div><div className={"border p-3 text-center " + (output ? "border-success text-success" : "border-danger text-danger")}>g₁ ∧ g₂<br />{output ? "SAT" : "false"}</div></div>
        <div className="mt-3 font-mono text-xs text-secondary">local gate clauses + output = true form a certificate-preserving SAT encoding</div>
      </Panel>
      <Caption>Cook-Levin style encodings constrain each local computation step so a satisfying assignment represents one accepting computation.</Caption>
    </figure>
  );
}

export function Algs4TSPDecisionLab() {
  const [tourIndex, setTourIndex] = useState(1);
  const [threshold, setThreshold] = useState(18);
  const tour = tours[tourIndex];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">certificate tour<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={tourIndex} onChange={(event) => setTourIndex(Number(event.target.value))}>{tours.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}</select></label><label className="text-xs text-secondary">bound L = {threshold}<input className="mt-2 w-full accent-current" type="range" min="15" max="25" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label></div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">{tour.name.split("-").map((vertex, index) => <div key={`${vertex}-${index}`} className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-accent text-accent">{vertex}</span>{index < 4 ? <span className="text-secondary">→</span> : null}</div>)}</div>
        <div className={"mt-4 border p-3 text-center " + (tour.cost <= threshold ? "border-success text-success" : "border-danger text-danger")}>visits each vertex once and returns; cost {tour.cost} {tour.cost <= threshold ? "≤" : ">"} {threshold}</div>
      </Panel>
      <Caption>TSP decision is in NP because a proposed tour has polynomial length and its permutation validity and total cost are easy to check.</Caption>
    </figure>
  );
}

export function Algs4CopingTriangleLab() {
  const [relax, setRelax] = useState<"time" | "optimality" | "generality">("optimality");
  const choices = {
    time: ["keep exact + arbitrary", "allow exponential worst case", "branch-and-bound, SAT/CDCL, dynamic programming"],
    optimality: ["keep polynomial + arbitrary", "accept approximate or heuristic answer", "approximation, local search, randomized heuristic"],
    generality: ["keep polynomial + exact", "restrict the instance family", "bounded treewidth, geometry, small parameter, special graph"],
  }[relax];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">requirement to relax<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={relax} onChange={(event) => setRelax(event.target.value as typeof relax)}><option value="time">polynomial worst-case time</option><option value="optimality">guaranteed optimality</option><option value="generality">arbitrary instances</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className={"border p-3 " + (relax === "time" ? "border-danger text-danger" : "border-success text-success")}>polynomial time</div><div className={"border p-3 " + (relax === "optimality" ? "border-danger text-danger" : "border-success text-success")}>optimal answer</div><div className={"border p-3 " + (relax === "generality" ? "border-danger text-danger" : "border-success text-success")}>arbitrary input</div></div>
        <div className="mt-3 border border-accent p-3 text-accent"><div className="font-semibold">{choices[0]}</div><div className="mt-1 text-sm text-secondary">{choices[1]}</div><div className="mt-1 font-mono text-xs">{choices[2]}</div></div>
      </Panel>
      <Caption>For NP-complete optimization, practical designs typically relax worst-case time, exact optimality, or unrestricted input generality.</Caption>
    </figure>
  );
}

export function Algs4ApproximationLab() {
  const [heuristicCost, setHeuristicCost] = useState(19);
  const lowerBound = 16;
  const ratio = heuristicCost / lowerBound;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate tour cost = {heuristicCost}<input className="mt-2 w-full accent-current" type="range" min="16" max="32" value={heuristicCost} onChange={(event) => setHeuristicCost(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 text-accent"><div className="text-xs">certified lower bound</div><div className="font-mono text-2xl">{lowerBound}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">candidate</div><div className="font-mono text-2xl">{heuristicCost}</div></div><div className={"border p-3 " + (ratio <= 1.25 ? "border-success text-success" : "border-danger text-danger")}><div className="text-xs">provable ratio</div><div className="font-mono text-2xl">{ratio.toFixed(2)}×</div></div></div>
      </Panel>
      <Caption>An approximation guarantee compares every returned solution with an independently valid lower bound, not just with another heuristic.</Caption>
    </figure>
  );
}

export function Algs4SpecialCaseLab() {
  const [family, setFamily] = useState<"general" | "circle" | "small parameter" | "treewidth">("circle");
  const detail = {
    general: ["general metric TSP", "NP-hard optimization", "no exact polynomial algorithm known"],
    circle: ["points on a circle boundary", "visit cyclic order", "sort by angle and close the cycle"],
    "small parameter": ["feedback set size k", "fixed-parameter search", "f(k) · n^c can be practical for small k"],
    treewidth: ["bounded-treewidth graph", "dynamic programming on a decomposition", "polynomial for every fixed width"],
  }[family];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">instance family<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={family} onChange={(event) => setFamily(event.target.value as typeof family)}><option value="general">arbitrary instance</option><option value="circle">points on circle</option><option value="small parameter">small structural parameter</option><option value="treewidth">bounded treewidth</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">{detail[0]}</div><div className="border border-warning p-3 text-warning">{detail[1]}</div><div className="border border-success p-3 text-success">{detail[2]}</div></div>
      </Panel>
      <Caption>Restricting instance structure can move an NP-hard general problem into an exactly solvable polynomial or parameterized regime.</Caption>
    </figure>
  );
}

export function Algs4ComplexityCertificateLab() {
  const [mutation, setMutation] = useState<"valid" | "long witness" | "slow verifier" | "wrong reduction">("valid");
  const checks = {
    witnessSize: mutation !== "long witness",
    verifierTime: mutation !== "slow verifier",
    yesEquivalence: mutation !== "wrong reduction",
    mapTime: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">complexity proof audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option value="valid">complete proof</option><option value="long witness">exponential witness</option><option value="slow verifier">exponential verifier</option><option value="wrong reduction">NO instance maps to YES</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-3 text-center text-[11px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "Membership and hardness arguments are resource-bounded and answer-preserving." : "The proof cannot support the claimed complexity classification."}</div>
      </Panel>
      <Caption>Complexity classifications are certificates too: witness length, verifier time, reduction time, and YES/NO equivalence must all be checked.</Caption>
    </figure>
  );
}
