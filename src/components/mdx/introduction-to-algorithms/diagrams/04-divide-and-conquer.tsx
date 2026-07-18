"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><Caption>{caption}</Caption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-base">{value}</div></div>;
}

export function CLRS4DivideConquerSchemaLab() {
  const [stage, setStage] = useState(0);
  const stages = [
    ["divide", "partition one size-n problem into smaller instances"],
    ["conquer", "solve subproblems recursively down to base cases"],
    ["combine", "construct the parent answer from child answers"],
  ];
  return (
    <Figure caption="A divide-and-conquer recurrence comes directly from the number and sizes of recursive calls plus divide/combine work.">
      <label className="text-sm font-semibold text-primary">stage {stage + 1} / 3<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{stages.map(([name], index) => <div key={name} className={`border p-3 text-center text-sm ${index === stage ? "border-accent bg-accent/10 text-accent" : index < stage ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
      <div className="mt-3 border border-accent p-4 text-center text-sm text-accent">{stages[stage][1]}</div>
    </Figure>
  );
}

export function CLRS4MatrixBlockLab() {
  const [block, setBlock] = useState<"C11" | "C12" | "C21" | "C22">("C11");
  const equations = {
    C11: "A11B11 + A12B21",
    C12: "A11B12 + A12B22",
    C21: "A21B11 + A22B21",
    C22: "A21B12 + A22B22",
  };
  return (
    <Figure caption="Block multiplication preserves the scalar rule: each output block is a row-by-column sum of two recursive block products.">
      <div className="grid grid-cols-2 gap-2">{Object.keys(equations).map((name) => <button key={name} type="button" className={`border p-4 font-mono ${block === name ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`} onClick={() => setBlock(name as typeof block)}>{name}</button>)}</div>
      <div className="mt-3 border border-warning p-4 text-center font-mono text-warning">{block} = {equations[block]}</div>
    </Figure>
  );
}

export function CLRS4StrassenProductLab() {
  const [product, setProduct] = useState(1);
  const formulas = [
    "(A11 + A22)(B11 + B22)",
    "(A21 + A22)B11",
    "A11(B12 − B22)",
    "A22(B21 − B11)",
    "(A11 + A12)B22",
    "(A21 − A11)(B11 + B12)",
    "(A12 − A22)(B21 + B22)",
  ];
  return (
    <Figure caption="Strassen trades extra block additions for seven recursive multiplications, reducing the branching factor from eight to seven.">
      <label className="text-sm font-semibold text-primary">Strassen product P{product}<input className="mt-2 w-full accent-current" type="range" min="1" max="7" value={product} onChange={(event) => setProduct(Number(event.target.value))} /></label>
      <div className="mt-4 border border-accent p-4 text-center font-mono text-accent">P{product} = {formulas[product - 1]}</div>
      <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="naive branches" value="8" tone="warning" /><Stat label="Strassen branches" value="7" tone="success" /><Stat label="exponent" value="lg 7 ≈ 2.807" /></div>
    </Figure>
  );
}

export function CLRS4RecurrenceAnatomyLab() {
  const [kind, setKind] = useState<"merge" | "binary" | "strassen">("merge");
  const rows = {
    merge: ["2T(n/2) + Θ(n)", "2", "n/2", "linear combine"],
    binary: ["T(n/2) + Θ(1)", "1", "n/2", "constant decision"],
    strassen: ["7T(n/2) + Θ(n²)", "7", "n/2", "block additions"],
  }[kind];
  return (
    <Figure caption="Each recurrence names child count, child size, and nonrecursive work; changing any one can change the final exponent.">
      <label className="text-sm font-semibold text-primary">algorithm<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="merge">merge sort</option><option value="binary">binary search</option><option value="strassen">Strassen</option></select></label>
      <div className="mt-4 grid grid-cols-4 gap-2"><Stat label="recurrence" value={rows[0]} /><Stat label="children" value={rows[1]} tone="success" /><Stat label="child size" value={rows[2]} tone="warning" /><Stat label="outside work" value={rows[3]} /></div>
    </Figure>
  );
}

export function CLRS4SubstitutionLab() {
  const [c, setC] = useState(2);
  const [n, setN] = useState(64);
  const left = c * n * Math.log2(n);
  const expanded = 2 * c * (n / 2) * Math.log2(n / 2) + n;
  const closes = expanded <= left;
  return (
    <Figure caption="Substitution guesses a bound, applies the inductive hypothesis to smaller arguments, and checks whether fixed constants close the inequality.">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">candidate constant c = {c}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={c} onChange={(event) => setC(Number(event.target.value))} /></label><label className="text-sm text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="256" step="2" value={n} onChange={(event) => setN(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="expanded RHS" value={Math.round(expanded).toString()} tone={closes ? "success" : "danger"} /><Stat label="candidate cn lg n" value={Math.round(left).toString()} /><Stat label="induction closes" value={closes ? "yes" : "no"} tone={closes ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4RecursionTreeLab() {
  const [power, setPower] = useState(5);
  const n = 2 ** power;
  const levels = Array.from({ length: power + 1 }, (_, level) => ({ level, nodes: 2 ** level, cost: level < power ? n : n }));
  return (
    <Figure caption="For 2T(n/2)+n, every internal level contributes n total work and there are lg n levels before the leaves.">
      <label className="text-sm font-semibold text-primary">n = 2^{power} = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="9" value={power} onChange={(event) => setPower(Number(event.target.value))} /></label>
      <div className="mt-4 space-y-2">{levels.map((row) => <div key={row.level} className="grid grid-cols-[4rem_1fr_8rem] items-center gap-2 text-xs"><span className="text-secondary">level {row.level}</span><div className="h-3 border border-border bg-accent/30"><div className="h-full bg-accent" style={{ width: "100%" }} /></div><span className="text-right font-mono text-accent">{row.nodes} nodes, Θ({row.cost})</span></div>)}</div>
    </Figure>
  );
}

export function CLRS4MasterCasesLab() {
  const [caseId, setCaseId] = useState<"1" | "2" | "3">("2");
  const rows = {
    "1": ["f(n) polynomially smaller", "T(n) = Θ(n^(log_b a))", "leaves dominate"],
    "2": ["f(n) = Θ(n^(log_b a) lg^k n)", "T(n) = Θ(n^(log_b a) lg^(k+1) n)", "levels balance"],
    "3": ["f(n) polynomially larger + regularity", "T(n) = Θ(f(n))", "root dominates"],
  }[caseId];
  return (
    <Figure caption="The master method compares f(n) with the critical leaf-growth function n raised to log base b of a.">
      <label className="text-sm font-semibold text-primary">master case<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={caseId} onChange={(event) => setCaseId(event.target.value as typeof caseId)}><option value="1">case 1</option><option value="2">case 2</option><option value="3">case 3</option></select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="comparison" value={rows[0]} /><Stat label="solution" value={rows[1]} tone="success" /><Stat label="tree intuition" value={rows[2]} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4RegularityLab() {
  const [example, setExample] = useState<"valid" | "oscillating">("valid");
  const valid = example === "valid";
  return (
    <Figure caption="Master-case 3 needs a regularity condition so recursive copies of f do not repeatedly regain the same total magnitude.">
      <label className="text-sm font-semibold text-primary">candidate f(n)<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={example} onChange={(event) => setExample(event.target.value as typeof example)}><option value="valid">n² for a=2,b=2</option><option value="oscillating">strongly oscillating f</option></select></label>
      <div className={`mt-4 border p-4 text-center font-mono ${valid ? "border-success text-success" : "border-danger text-danger"}`}>{valid ? "2f(n/2) = n²/2 ≤ c f(n), c = 1/2" : "no fixed c < 1 controls all large n"}</div>
    </Figure>
  );
}

export function CLRS4ContinuousMasterLab() {
  const [shape, setShape] = useState<"constant" | "linear" | "critical">("critical");
  const rows = {
    constant: ["g(u)=1", "integral weighted by recursion geometry", "leaf-heavy"],
    linear: ["g(u)=u", "equal contribution per scale", "extra logarithm"],
    critical: ["g(u)=u lg u", "slowly varying factor accumulates", "log-power shift"],
  }[shape];
  return (
    <Figure caption="The continuous master theorem converts level sums into a weighted integral, exposing how toll work accumulates across scales.">
      <label className="text-sm font-semibold text-primary">toll shape<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={shape} onChange={(event) => setShape(event.target.value as typeof shape)}><option value="constant">constant</option><option value="linear">linear</option><option value="critical">linear-log</option></select></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Stat label="g(u)" value={rows[0]} /><Stat label="integral reading" value={rows[1]} tone="warning" /><Stat label="effect" value={rows[2]} tone="success" /></div>
    </Figure>
  );
}

function solveP(terms: Array<[number, number]>) {
  let lo = -4;
  let hi = 8;
  for (let step = 0; step < 80; step += 1) {
    const mid = (lo + hi) / 2;
    const sum = terms.reduce((total, [a, b]) => total + a * b ** mid, 0);
    if (sum > 1) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function CLRS4AkraBazziLab() {
  const [kind, setKind] = useState<"balanced" | "unequal">("unequal");
  const terms: Array<[number, number]> = kind === "balanced" ? [[2, 0.5]] : [[1, 0.5], [1, 1 / 3]];
  const p = solveP(terms);
  return (
    <Figure caption="Akra-Bazzi handles unequal subproblem sizes by solving the characteristic equation sum of a_i times b_i to the p equals one.">
      <label className="text-sm font-semibold text-primary">recurrence shape<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="balanced">2T(n/2)+g(n)</option><option value="unequal">T(n/2)+T(n/3)+g(n)</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="subproblem fractions" value={terms.map(([, b]) => b.toFixed(3)).join(", ")} /><Stat label="characteristic p" value={p.toFixed(4)} tone="warning" /><Stat label="homogeneous scale" value={`n^${p.toFixed(4)}`} tone="success" /></div>
    </Figure>
  );
}
