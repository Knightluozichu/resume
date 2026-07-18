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

export function CLRS4ApproximationRatioLab() {
  const [mode, setMode] = useState<"min" | "max">("min");
  const [value, setValue] = useState(14);
  const optimum = mode === "min" ? 10 : 20;
  const feasibleValue = mode === "min" ? Math.max(value, optimum) : Math.min(value, optimum);
  const ratio = mode === "min" ? feasibleValue / optimum : optimum / Math.max(1, feasibleValue);
  return (
    <Figure caption="An approximation ratio compares a feasible solution with the unknown optimum; the inequality reverses between minimization and maximization.">
      <div className="flex border border-border">{(["min", "max"] as const).map((item) => <button key={item} type="button" className={`flex-1 p-2 text-sm font-semibold ${mode === item ? "bg-accent text-background" : "text-primary"}`} onClick={() => setMode(item)}>{item === "min" ? "minimization" : "maximization"}</button>)}</div>
      <label className="mt-4 block text-sm font-semibold text-primary">algorithm value = {feasibleValue}<input className="mt-2 w-full accent-current" type="range" min="5" max="30" value={feasibleValue} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="OPT" value={optimum.toString()} /><Stat label="algorithm" value={feasibleValue.toString()} tone="warning" /><Stat label="ratio ρ" value={ratio.toFixed(2)} tone="success" /></div>
    </Figure>
  );
}

const vcEdges: [string, string][] = [["A", "B"], ["A", "C"], ["B", "C"], ["C", "D"], ["D", "E"], ["C", "E"]];

function incident(edge: [string, string], vertices: Set<string>) {
  return vertices.has(edge[0]) || vertices.has(edge[1]);
}

export function CLRS4VertexCoverMatchingLab() {
  const [steps, setSteps] = useState(1);
  const matching: [string, string][] = [["A", "B"], ["D", "E"]];
  const active = matching.slice(0, steps);
  const selected = new Set(active.flat());
  const covered = vcEdges.filter((edge) => incident(edge, selected)).length;
  return (
    <Figure caption="The 2-approximation repeatedly chooses an uncovered edge, takes both endpoints, and deletes every incident edge; chosen edges form a matching.">
      <label className="text-sm font-semibold text-primary">chosen matching edges = {steps}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="matching" value={active.map((edge) => edge.join("-")).join(",") || "empty"} /><Stat label="cover vertices" value={[...selected].join(",") || "empty"} tone="warning" /><Stat label="covered edges" value={`${covered}/${vcEdges.length}`} tone={covered === vcEdges.length ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4VertexCoverBoundLab() {
  const [matchingSize, setMatchingSize] = useState(3);
  const algorithmSize = 2 * matchingSize;
  return (
    <Figure caption="Every vertex cover must hit each edge in the matching, so matching size lower-bounds OPT while the algorithm takes exactly two endpoints per edge.">
      <label className="text-sm font-semibold text-primary">matching size |M| = {matchingSize}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={matchingSize} onChange={(event) => setMatchingSize(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="lower bound on OPT" value={`≥ ${matchingSize}`} tone="success" /><Stat label="algorithm size" value={algorithmSize.toString()} tone="warning" /><Stat label="proved factor" value="2" /></div>
    </Figure>
  );
}

export function CLRS4TriangleInequalityLab() {
  const [metric, setMetric] = useState(true);
  const direct = metric ? 7 : 14;
  const detour = 9;
  return (
    <Figure caption="Shortcutting repeated vertices is safe only when the triangle inequality guarantees that a direct edge is no longer than the detour it replaces.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={metric} onChange={(event) => setMetric(event.target.checked)} />triangle inequality holds</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="u→w→v" value={detour.toString()} /><Stat label="u→v" value={direct.toString()} tone={direct <= detour ? "success" : "danger"} /><Stat label="shortcut" value={direct <= detour ? "safe" : "can increase cost"} tone={direct <= detour ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4MSTTourLab() {
  const [mstCost, setMstCost] = useState(18);
  const optimum = 24;
  const doubled = 2 * mstCost;
  return (
    <Figure caption="Deleting one edge from an optimal tour leaves a spanning tree, so MST cost lower-bounds OPT; doubling the MST produces an Eulerian walk of cost twice the tree.">
      <label className="text-sm font-semibold text-primary">MST cost = {mstCost}<input className="mt-2 w-full accent-current" type="range" min="12" max="24" value={mstCost} onChange={(event) => setMstCost(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="MST lower bound" value={mstCost.toString()} tone="success" /><Stat label="illustrative OPT" value={optimum.toString()} /><Stat label="doubled walk" value={doubled.toString()} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4PreorderShortcutLab() {
  const [shortcuts, setShortcuts] = useState(2);
  const eulerWalk = ["A", "B", "A", "C", "D", "C", "A"];
  const tours = [
    ["A", "B", "A", "C", "D", "C", "A"],
    ["A", "B", "C", "D", "C", "A"],
    ["A", "B", "C", "D", "A"],
  ];
  return (
    <Figure caption="Reading vertices at first appearance shortcuts a doubled-tree Euler walk into a Hamiltonian tour without increasing metric cost.">
      <label className="text-sm font-semibold text-primary">shortcut passes = {shortcuts}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={shortcuts} onChange={(event) => setShortcuts(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="Euler walk" value={eulerWalk.join("→")} /><Stat label="current tour" value={tours[shortcuts].join("→")} tone={shortcuts === 2 ? "success" : "warning"} /></div>
    </Figure>
  );
}

const coverSets = [
  { name: "S1", values: [1, 2, 3, 4] },
  { name: "S2", values: [3, 4, 5] },
  { name: "S3", values: [5, 6, 7] },
  { name: "S4", values: [7, 8] },
  { name: "S5", values: [1, 6, 8] },
];

function greedyCover(rounds: number) {
  const uncovered = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
  const chosen: string[] = [];
  for (let round = 0; round < rounds && uncovered.size > 0; round += 1) {
    const best = coverSets
      .filter((set) => !chosen.includes(set.name))
      .map((set) => ({ ...set, gain: set.values.filter((value) => uncovered.has(value)).length }))
      .sort((left, right) => right.gain - left.gain || left.name.localeCompare(right.name))[0];
    if (!best || best.gain === 0) break;
    chosen.push(best.name);
    best.values.forEach((value) => uncovered.delete(value));
  }
  return { chosen, uncovered };
}

export function CLRS4GreedySetCoverLab() {
  const [rounds, setRounds] = useState(2);
  const result = greedyCover(rounds);
  return (
    <Figure caption="Greedy set cover repeatedly chooses the set with maximum uncovered gain; only newly covered elements count at each round.">
      <label className="text-sm font-semibold text-primary">greedy rounds = {rounds}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={rounds} onChange={(event) => setRounds(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="chosen sets" value={result.chosen.join(",") || "none"} /><Stat label="uncovered" value={[...result.uncovered].join(",") || "none"} tone={result.uncovered.size ? "warning" : "success"} /><Stat label="status" value={result.uncovered.size ? "continue" : "covered"} tone={result.uncovered.size ? "accent" : "success"} /></div>
    </Figure>
  );
}

export function CLRS4SetCoverChargingLab() {
  const [elements, setElements] = useState(16);
  const harmonic = Array.from({ length: elements }, (_, index) => 1 / (index + 1)).reduce((sum, value) => sum + value, 0);
  return (
    <Figure caption="Charging each newly covered element an equal share of its selected set yields the harmonic bound Hₙ, which is at most ln n + 1.">
      <label className="text-sm font-semibold text-primary">universe size n = {elements}<input className="mt-2 w-full accent-current" type="range" min="2" max="100" value={elements} onChange={(event) => setElements(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Hₙ" value={harmonic.toFixed(3)} tone="success" /><Stat label="ln n + 1" value={(Math.log(elements) + 1).toFixed(3)} /><Stat label="bound holds" value={harmonic <= Math.log(elements) + 1 ? "yes" : "no"} tone="success" /></div>
    </Figure>
  );
}

const max3Clauses = [
  (x: boolean, y: boolean, z: boolean) => x || y || z,
  (x: boolean, y: boolean, z: boolean) => !x || y || z,
  (x: boolean, y: boolean, z: boolean) => x || !y || z,
  (x: boolean, y: boolean, z: boolean) => x || y || !z,
];

export function CLRS4RandomAssignmentLab() {
  const [mask, setMask] = useState(5);
  const values = [Boolean(mask & 4), Boolean(mask & 2), Boolean(mask & 1)];
  const satisfied = max3Clauses.filter((clause) => clause(values[0], values[1], values[2])).length;
  return (
    <Figure caption="For a clause with three distinct variables, a uniform random assignment fails only on one of eight local assignments, giving expected satisfaction 7/8 per clause.">
      <label className="text-sm font-semibold text-primary">sample assignment = {mask}<input className="mt-2 w-full accent-current" type="range" min="0" max="7" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x,y,z" value={values.map(Number).join(",")} /><Stat label="sample score" value={`${satisfied}/${max3Clauses.length}`} tone="warning" /><Stat label="single-clause expectation" value="7/8" tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ConditionalExpectationLab() {
  const [fixed, setFixed] = useState(0);
  const expectations = [3.5, 3.25, 3.0, 3.0];
  return (
    <Figure caption="Conditional expectation fixes one variable at a time to a value that does not reduce the remaining expected objective, derandomizing the guarantee.">
      <label className="text-sm font-semibold text-primary">fixed variables = {fixed}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={fixed} onChange={(event) => setFixed(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="variables fixed" value={fixed.toString()} /><Stat label="remaining expectation" value={expectations[fixed].toFixed(2)} tone="success" /><Stat label="random bits left" value={(3 - fixed).toString()} /></div>
    </Figure>
  );
}

export function CLRS4LPRelaxationLab() {
  const [fractional, setFractional] = useState(0.5);
  const rounded = fractional >= 0.5 ? 1 : 0;
  return (
    <Figure caption="An LP relaxation drops integrality to obtain a polynomially solvable lower bound; rounding must preserve feasibility and bound the cost increase.">
      <label className="text-sm font-semibold text-primary">fractional vertex value xᵥ = {fractional.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.05" value={fractional} onChange={(event) => setFractional(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="LP value" value={fractional.toFixed(2)} tone="success" /><Stat label="rounded xᵥ" value={rounded.toString()} tone="warning" /><Stat label="local inflation" value={fractional ? (rounded / fractional).toFixed(2) : "0"} /></div>
    </Figure>
  );
}

export function CLRS4RandomizedRoundingLab() {
  const [probability, setProbability] = useState(0.6);
  const [sample, setSample] = useState(0.42);
  const selected = sample < probability;
  return (
    <Figure caption="Randomized rounding interprets a fractional LP coordinate as a selection probability; guarantees concern expectation or high probability, not every sample.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">LP probability = {probability.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="0.95" step="0.05" value={probability} onChange={(event) => setProbability(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">sample u = {sample.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1" step="0.01" value={sample} onChange={(event) => setSample(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="rule" value="select when u < p" /><Stat label="sample outcome" value={selected ? "selected" : "not selected"} tone={selected ? "success" : "warning"} /></div>
    </Figure>
  );
}

function exactSubsetSums(values: number[], target: number) {
  let sums = [0];
  for (const value of values) sums = [...new Set([...sums, ...sums.map((sum) => sum + value)])].filter((sum) => sum <= target).sort((a, b) => a - b);
  return sums;
}

function trimList(values: number[], delta: number) {
  if (values.length === 0) return values;
  const result = [values[0]];
  for (const value of values.slice(1)) {
    if (value > result[result.length - 1] * (1 + delta)) result.push(value);
  }
  return result;
}

export function CLRS4SubsetSumListLab() {
  const [items, setItems] = useState(3);
  const values = [3, 5, 6, 9].slice(0, items);
  const sums = exactSubsetSums(values, 15);
  return (
    <Figure caption="Exact subset-sum DP merges the old sums with copies shifted by the new item, deduplicates, and discards values above the target.">
      <label className="text-sm font-semibold text-primary">processed items = {items}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={items} onChange={(event) => setItems(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="items" value={values.join(",") || "none"} /><Stat label="reachable sums" value={sums.join(",")} /><Stat label="best ≤ 15" value={Math.max(...sums).toString()} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4SubsetSumTrimLab() {
  const [delta, setDelta] = useState(0.15);
  const exact = exactSubsetSums([3, 5, 6, 9, 11], 25);
  const trimmed = trimList(exact, delta);
  return (
    <Figure caption="TRIM retains only multiplicatively separated representatives, shrinking the list while ensuring every discarded value has a nearby smaller survivor.">
      <label className="text-sm font-semibold text-primary">trim parameter δ = {delta.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.02" max="0.5" step="0.01" value={delta} onChange={(event) => setDelta(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact list size" value={exact.length.toString()} /><Stat label="trimmed size" value={trimmed.length.toString()} tone="success" /><Stat label="representatives" value={trimmed.join(",")} /></div>
    </Figure>
  );
}

export function CLRS4FPTASLab() {
  const [epsilon, setEpsilon] = useState(0.2);
  const items = 20;
  const delta = epsilon / (2 * items);
  return (
    <Figure caption="With δ=ε/(2n), accumulated trimming error stays within a 1+ε factor while list length and runtime remain polynomial in n and 1/ε.">
      <label className="text-sm font-semibold text-primary">accuracy ε = {epsilon.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.05" max="0.8" step="0.05" value={epsilon} onChange={(event) => setEpsilon(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="items n" value={items.toString()} /><Stat label="trim δ" value={delta.toFixed(4)} /><Stat label="guarantee" value={`output ≥ OPT/${(1 + epsilon).toFixed(2)}`} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4ApproximationCertificateLab() {
  const [feasible, setFeasible] = useState(true);
  const [bound, setBound] = useState(true);
  const [assumptions, setAssumptions] = useState(false);
  const complete = feasible && bound && assumptions;
  return (
    <Figure caption="An approximation certificate needs a feasible output, a lower or upper bound tied to OPT, and explicit assumptions such as metric costs or random expectation.">
      <div className="grid gap-3 sm:grid-cols-3"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={feasible} onChange={(event) => setFeasible(event.target.checked)} />feasibility</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={bound} onChange={(event) => setBound(event.target.checked)} />OPT bound</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={assumptions} onChange={(event) => setAssumptions(event.target.checked)} />assumptions</label></div>
      <div className="mt-4"><Stat label="certificate" value={complete ? "complete" : "missing evidence"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
