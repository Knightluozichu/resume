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

function Matrix({ values, label }: { values: number[][]; label: string }) {
  return <div><div className="mb-2 text-center text-xs text-secondary">{label}</div><div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${values[0].length}, minmax(0, 1fr))` }}>{values.flatMap((row, i) => row.map((value, j) => <div key={`${i}-${j}`} className="border border-border p-2 text-center font-mono text-xs text-primary">{Number.isInteger(value) ? value : value.toFixed(2)}</div>))}</div></div>;
}

export function CLRS4LinearSystemLab() {
  const [b1, setB1] = useState(9);
  const [b2, setB2] = useState(8);
  const determinant = 10;
  const x1 = (3 * b1 - b2) / determinant;
  const x2 = (-2 * b1 + 4 * b2) / determinant;
  return (
    <Figure caption="A fixed nonsingular coefficient matrix defines a reusable transformation; changing b changes the solution but not the factorization of A.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">b₁ = {b1}<input className="mt-2 w-full accent-current" type="range" min="-10" max="15" value={b1} onChange={(event) => setB1(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">b₂ = {b2}<input className="mt-2 w-full accent-current" type="range" min="-10" max="15" value={b2} onChange={(event) => setB2(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-3"><Matrix label="A" values={[[4, 1], [2, 3]]} /><Matrix label="b" values={[[b1], [b2]]} /><Matrix label="solution x" values={[[x1], [x2]]} /></div>
    </Figure>
  );
}

export function CLRS4EliminationLab() {
  const [step, setStep] = useState(0);
  const states = [
    { matrix: [[2, 1, 5], [4, 3, 11]], note: "augmented system" },
    { matrix: [[4, 3, 11], [2, 1, 5]], note: "swap largest pivot into row 1" },
    { matrix: [[4, 3, 11], [0, -0.5, -0.5]], note: "R₂ ← R₂ − 0.5R₁" },
    { matrix: [[4, 3, 11], [0, 1, 1]], note: "back substitution gives x₂=1, x₁=2" },
  ];
  return (
    <Figure caption="Gaussian elimination records row swaps and multipliers while transforming A into an upper-triangular system.">
      <label className="text-sm font-semibold text-primary">elimination step = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={states.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4"><Matrix label={states[step].note} values={states[step].matrix} /></div>
    </Figure>
  );
}

export function CLRS4LUPFactorLab() {
  const [showProduct, setShowProduct] = useState(false);
  return (
    <Figure caption="Partial pivoting represents all row swaps by P and all elimination multipliers below the diagonal of unit-lower-triangular L.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={showProduct} onChange={(event) => setShowProduct(event.target.checked)} />show the reconstructed product</label>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><Matrix label="P" values={[[0, 1], [1, 0]]} /><Matrix label="A" values={[[2, 1], [4, 3]]} /><Matrix label="L" values={[[1, 0], [0.5, 1]]} /><Matrix label="U" values={[[4, 3], [0, -0.5]]} /></div>
      <div className="mt-4"><Stat label="identity" value={showProduct ? "PA = LU = [[4,3],[2,1]]" : "toggle to verify PA = LU"} tone={showProduct ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4TriangularSolveLab() {
  const [stage, setStage] = useState<"permute" | "forward" | "backward">("forward");
  const values = {
    permute: { equation: "Pb", result: "[11, 5]" },
    forward: { equation: "Ly = Pb", result: "y = [11, -0.5]" },
    backward: { equation: "Ux = y", result: "x = [2, 1]" },
  }[stage];
  return (
    <Figure caption="Once PA=LU is available, every right-hand side is solved by permutation, forward substitution, and backward substitution.">
      <div className="grid grid-cols-3 gap-2">{(["permute", "forward", "backward"] as const).map((value) => <button key={value} type="button" className={`border p-2 text-xs ${stage === value ? "border-accent text-accent" : "border-border text-secondary"}`} onClick={() => setStage(value)}>{value}</button>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="current equation" value={values.equation} /><Stat label="result" value={values.result} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4PivotingLab() {
  const [epsilonPower, setEpsilonPower] = useState(5);
  const epsilon = 10 ** -epsilonPower;
  const multiplierWithoutSwap = 1 / epsilon;
  return (
    <Figure caption="A tiny pivot creates a huge elimination multiplier; partial pivoting swaps in the largest available absolute entry to reduce numerical amplification.">
      <label className="text-sm font-semibold text-primary">tiny pivot ε = 10<sup>−{epsilonPower}</sup><input className="mt-2 w-full accent-current" type="range" min="1" max="10" value={epsilonPower} onChange={(event) => setEpsilonPower(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="no-swap multiplier" value={multiplierWithoutSwap.toExponential(1)} tone="danger" /><Stat label="pivot after swap" value="1" tone="success" /><Stat label="swapped multiplier" value={epsilon.toExponential(1)} tone="success" /></div>
    </Figure>
  );
}

export function CLRS4InverseColumnsLab() {
  const [column, setColumn] = useState(0);
  const inverse = [[0.3, -0.1], [-0.2, 0.4]];
  return (
    <Figure caption="The jth inverse column is the solution of Ax=eⱼ; one factorization of A is reused for every identity column.">
      <div className="grid grid-cols-2 gap-2"><button type="button" className={`border p-2 text-sm ${column === 0 ? "border-accent text-accent" : "border-border text-secondary"}`} onClick={() => setColumn(0)}>solve Ae₁</button><button type="button" className={`border p-2 text-sm ${column === 1 ? "border-accent text-accent" : "border-border text-secondary"}`} onClick={() => setColumn(1)}>solve Ae₂</button></div>
      <div className="mt-4 grid grid-cols-3 gap-3"><Matrix label="A" values={[[4, 1], [2, 3]]} /><Matrix label={`e${column + 1}`} values={column === 0 ? [[1], [0]] : [[0], [1]]} /><Matrix label={`inverse column ${column + 1}`} values={inverse.map((row) => [row[column]])} /></div>
    </Figure>
  );
}

export function CLRS4InverseResidualLab() {
  const [digits, setDigits] = useState(3);
  const residual = 10 ** -digits;
  return (
    <Figure caption="An inverse candidate should be certified by a residual such as ‖I−AX‖, not by printing plausible-looking entries.">
      <label className="text-sm font-semibold text-primary">retained decimal digits = {digits}<input className="mt-2 w-full accent-current" type="range" min="1" max="8" value={digits} onChange={(event) => setDigits(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate X" value={`${digits} digits`} /><Stat label="residual scale" value={residual.toExponential(1)} tone="warning" /><Stat label="certificate" value={digits >= 6 ? "strong" : "inspect"} tone={digits >= 6 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4SPDQuadraticLab() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(-1);
  const quadratic = 4 * x1 * x1 + 2 * x1 * x2 + 3 * x2 * x2;
  return (
    <Figure caption="A symmetric matrix is positive definite when every nonzero direction has strictly positive quadratic energy xᵀAx.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x₁ = {x1}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={x1} onChange={(event) => setX1(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">x₂ = {x2}<input className="mt-2 w-full accent-current" type="range" min="-5" max="5" value={x2} onChange={(event) => setX2(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-2 gap-3"><Matrix label="A" values={[[4, 1], [1, 3]]} /><Stat label="xᵀAx" value={quadratic.toString()} tone={quadratic > 0 ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4CholeskyLab() {
  const [stage, setStage] = useState(1);
  const labels = ["A is symmetric positive definite", "compute lower-triangular L", "verify A = LLᵀ", "solve Ly=b then Lᵀx=y"];
  return (
    <Figure caption="Cholesky exploits symmetry and positive definiteness to replace general LUP with one triangular factor and its transpose.">
      <label className="text-sm font-semibold text-primary">factorization stage = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">{labels.map((label, index) => <div key={label} className={`border p-3 text-center text-xs ${index <= stage ? "border-success text-success" : "border-border text-secondary"}`}>{label}</div>)}</div>
    </Figure>
  );
}

const points = [[0, 1], [1, 2], [2, 2], [3, 4]];

export function CLRS4LeastSquaresLab() {
  const [included, setIncluded] = useState(points.length);
  const sample = points.slice(0, included);
  const meanX = sample.reduce((sum, point) => sum + point[0], 0) / sample.length;
  const meanY = sample.reduce((sum, point) => sum + point[1], 0) / sample.length;
  const denominator = sample.reduce((sum, point) => sum + (point[0] - meanX) ** 2, 0);
  const slope = denominator === 0 ? 0 : sample.reduce((sum, point) => sum + (point[0] - meanX) * (point[1] - meanY), 0) / denominator;
  const intercept = meanY - slope * meanX;
  const residual = sample.reduce((sum, point) => sum + (point[1] - (intercept + slope * point[0])) ** 2, 0);
  return (
    <Figure caption="Least squares projects observations onto the column space of the design matrix, choosing the line with minimum squared residual.">
      <label className="text-sm font-semibold text-primary">included observations = {included}<input className="mt-2 w-full accent-current" type="range" min="2" max={points.length} value={included} onChange={(event) => setIncluded(Number(event.target.value))} /></label>
      <div className="mt-4 flex gap-2">{points.map((point, index) => <div key={index} className={`flex-1 border p-3 text-center font-mono text-xs ${index < included ? "border-accent text-accent" : "border-border text-secondary opacity-40"}`}>({point[0]},{point[1]})</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="intercept" value={intercept.toFixed(2)} /><Stat label="slope" value={slope.toFixed(2)} tone="success" /><Stat label="squared residual" value={residual.toFixed(2)} tone="warning" /></div>
    </Figure>
  );
}

export function CLRS4NormalEquationLab() {
  const [condition, setCondition] = useState(4);
  return (
    <Figure caption="Forming AᵀA gives a compact SPD system under full column rank, but approximately squares the condition number and can amplify roundoff.">
      <label className="text-sm font-semibold text-primary">condition estimate κ(A) = {condition}<input className="mt-2 w-full accent-current" type="range" min="1" max="50" value={condition} onChange={(event) => setCondition(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="κ(A)" value={condition.toString()} /><Stat label="κ(AᵀA)" value={(condition ** 2).toString()} tone="danger" /><Stat label="stable alternative" value="QR / SVD" tone="success" /></div>
    </Figure>
  );
}

export function CLRS4MatrixCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "singular" | "pivot" | "residual" | "rank">("valid");
  const checks = {
    "dimensions and rank assumptions hold": issue !== "singular" && issue !== "rank",
    "pivoting or SPD structure is explicit": issue !== "pivot",
    "factorization identity is verified": issue !== "singular",
    "solution residual is reported": issue !== "residual",
  };
  return (
    <Figure caption="A matrix-computation certificate records dimensions, rank and structure assumptions, pivot policy, factorization identity, and backward residual.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">validated solve</option><option value="singular">singular coefficient matrix</option><option value="pivot">tiny pivot ignored</option><option value="residual">no residual check</option><option value="rank">rank-deficient least squares</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
