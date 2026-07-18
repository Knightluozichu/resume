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

export function CLRS4FeasibleRegionLab() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(2);
  const checks = [x1 + x2 <= 4, x1 <= 2, x2 <= 3, x1 >= 0, x2 >= 0];
  const feasible = checks.every(Boolean);
  return (
    <Figure caption="Linear inequalities intersect into a convex feasible polyhedron; the objective assigns a value to every feasible point.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x₁ = {x1.toFixed(1)}<input className="mt-2 w-full accent-current" type="range" min="-1" max="5" step="0.5" value={x1} onChange={(event) => setX1(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">x₂ = {x2.toFixed(1)}<input className="mt-2 w-full accent-current" type="range" min="-1" max="5" step="0.5" value={x2} onChange={(event) => setX2(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="x₁+x₂ ≤ 4" value={checks[0] ? "pass" : "fail"} tone={checks[0] ? "success" : "danger"} /><Stat label="box bounds" value={checks.slice(1).every(Boolean) ? "pass" : "fail"} tone={checks.slice(1).every(Boolean) ? "success" : "danger"} /><Stat label="3x₁+2x₂" value={(3 * x1 + 2 * x2).toFixed(1)} tone={feasible ? "accent" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4LPStatusLab() {
  const [scenario, setScenario] = useState<"optimal" | "infeasible" | "unbounded">("optimal");
  const details = {
    optimal: ["nonempty", "finite optimum", "solver returns x and value"],
    infeasible: ["empty", "no feasible point", "solver returns infeasibility certificate"],
    unbounded: ["nonempty ray", "objective improves forever", "solver returns improving direction"],
  }[scenario];
  return (
    <Figure caption="An LP does not always have a finite optimum: feasibility and boundedness are separate questions with different certificates.">
      <label className="text-sm font-semibold text-primary">problem status<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={scenario} onChange={(event) => setScenario(event.target.value as typeof scenario)}><option value="optimal">feasible and bounded</option><option value="infeasible">infeasible</option><option value="unbounded">unbounded objective</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{details.map((detail, index) => <Stat key={detail} label={["region", "objective", "evidence"][index]} value={detail} tone={scenario === "optimal" ? "success" : "warning"} />)}</div>
    </Figure>
  );
}

export function CLRS4SlackFormLab() {
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(2);
  const slacks = [4 - x1 - x2, 2 - x1, 3 - x2];
  return (
    <Figure caption="Slack variables convert each resource inequality into an equality and expose which constraints are tight at a candidate solution.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">x₁ = {x1}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" step="0.5" value={x1} onChange={(event) => setX1(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">x₂ = {x2}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" step="0.5" value={x2} onChange={(event) => setX2(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{slacks.map((slack, index) => <Stat key={index} label={`slack s${index + 1}`} value={slack.toFixed(1)} tone={slack === 0 ? "warning" : "success"} />)}</div>
    </Figure>
  );
}

const primalVertices = [[0, 0], [2, 0], [2, 2], [1, 3], [0, 3]];

export function CLRS4SimplexWalkLab() {
  const [vertex, setVertex] = useState(1);
  const point = primalVertices[vertex];
  return (
    <Figure caption="Simplex maintains a basic feasible solution and pivots along adjacent vertices toward an improving objective value.">
      <label className="text-sm font-semibold text-primary">visited vertex = {vertex + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={primalVertices.length - 1} value={vertex} onChange={(event) => setVertex(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-wrap gap-2">{primalVertices.map(([x1, x2], index) => <div key={index} className={`border p-3 text-center text-xs ${index <= vertex ? "border-success text-success" : "border-border text-secondary"}`}><div className="font-mono">({x1},{x2})</div><div className="mt-1">value {3 * x1 + 2 * x2}</div></div>)}</div>
      <div className="mt-4"><Stat label="current basic feasible solution" value={`x=(${point[0]},${point[1]}), z=${3 * point[0] + 2 * point[1]}`} tone="accent" /></div>
    </Figure>
  );
}

export function CLRS4LPAlgorithmLab() {
  const [algorithm, setAlgorithm] = useState<"simplex" | "ellipsoid" | "interior">("interior");
  const properties = {
    simplex: ["walks between bases", "excellent practical history", "exponential worst cases"],
    ellipsoid: ["cuts enclosing ellipsoids", "first polynomial LP method", "mainly theoretical landmark"],
    interior: ["moves through the interior", "polynomial families", "strong large sparse performance"],
  }[algorithm];
  return (
    <Figure caption="LP algorithms share the same mathematical problem but follow different geometric paths and offer different theory-practice tradeoffs.">
      <label className="text-sm font-semibold text-primary">algorithm family<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as typeof algorithm)}><option value="simplex">simplex</option><option value="ellipsoid">ellipsoid</option><option value="interior">interior point</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2">{properties.map((property, index) => <Stat key={property} label={["path", "guarantee", "engineering"][index]} value={property} tone={index === 1 ? "success" : "accent"} />)}</div>
    </Figure>
  );
}

export function CLRS4ModelingPipelineLab() {
  const [stage, setStage] = useState(2);
  const stages = ["decision variables", "linear constraints", "linear objective", "domain restrictions", "solution interpretation"];
  return (
    <Figure caption="A correct formulation maps domain decisions into variables, constraints, objective, and domains, then maps the solver result back to the original problem.">
      <label className="text-sm font-semibold text-primary">completed modeling stages = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={stages.length - 1} value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
      <div className="mt-4 grid gap-2 sm:grid-cols-5">{stages.map((name, index) => <div key={name} className={`border p-3 text-center text-xs ${index <= stage ? "border-success text-success" : "border-border text-secondary"}`}>{index + 1}. {name}</div>)}</div>
    </Figure>
  );
}

export function CLRS4ProductionLPModelLab() {
  const [productA, setProductA] = useState(2);
  const [productB, setProductB] = useState(2);
  const labor = 2 * productA + productB;
  const material = productA + 2 * productB;
  const feasible = labor <= 8 && material <= 8;
  return (
    <Figure caption="A production formulation turns each product count into a variable, each resource budget into a row, and contribution into the objective.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">product A = {productA}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={productA} onChange={(event) => setProductA(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">product B = {productB}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={productB} onChange={(event) => setProductB(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="labor / 8" value={labor.toString()} tone={labor <= 8 ? "success" : "danger"} /><Stat label="material / 8" value={material.toString()} tone={material <= 8 ? "success" : "danger"} /><Stat label="profit 5A+4B" value={(5 * productA + 4 * productB).toString()} tone={feasible ? "accent" : "warning"} /></div>
    </Figure>
  );
}

export function CLRS4FlowLPModelLab() {
  const [upper, setUpper] = useState(3);
  const [lower, setLower] = useState(2);
  const outgoing = upper + lower;
  return (
    <Figure caption="A flow LP uses one variable per directed edge, capacity bounds per edge, and conservation equalities at internal vertices.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">flow s→u = {upper}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={upper} onChange={(event) => setUpper(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">flow s→v = {lower}<input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={lower} onChange={(event) => setLower(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="upper capacity 5" value={upper <= 5 ? "pass" : "fail"} tone={upper <= 5 ? "success" : "danger"} /><Stat label="lower capacity 4" value={lower <= 4 ? "pass" : "fail"} tone={lower <= 4 ? "success" : "danger"} /><Stat label="flow value" value={outgoing.toString()} tone="accent" /></div>
    </Figure>
  );
}

export function CLRS4RelaxationLab() {
  const [fractional, setFractional] = useState(true);
  const integerValue = 9;
  const relaxedValue = 10.5;
  return (
    <Figure caption="Relaxing binary variables to an interval enlarges the feasible region, producing an upper bound for a maximization integer program.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={fractional} onChange={(event) => setFractional(event.target.checked)} />allow fractional decisions</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="domain" value={fractional ? "0 ≤ x ≤ 1" : "x ∈ {0,1}"} /><Stat label="best objective" value={(fractional ? relaxedValue : integerValue).toString()} tone={fractional ? "warning" : "success"} /><Stat label="role" value={fractional ? "upper bound" : "feasible integer"} tone="accent" /></div>
    </Figure>
  );
}

const dualCandidates = [
  { y: [3, 0, 0], value: 12 },
  { y: [2, 1, 0], value: 10 },
  { y: [2, 2, 0], value: 12 },
];

export function CLRS4PrimalDualLab() {
  const [candidate, setCandidate] = useState(1);
  const dual = dualCandidates[candidate];
  return (
    <Figure caption="Every dual-feasible price vector upper-bounds every primal-feasible profit; the tight candidate meets the primal optimum at value 10.">
      <label className="text-sm font-semibold text-primary">dual candidate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={candidate} onChange={(event) => setCandidate(Number(event.target.value))}>{dualCandidates.map((entry, index) => <option key={index} value={index}>y=({entry.y.join(",")})</option>)}</select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="primal x=(2,2)" value="10" tone="success" /><Stat label="dual bound bᵀy" value={dual.value.toString()} tone="warning" /><Stat label="duality gap" value={(dual.value - 10).toString()} tone={dual.value === 10 ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4WeakDualityLab() {
  const [primalValue, setPrimalValue] = useState(8);
  const dualBound = 10;
  return (
    <Figure caption="Weak duality is a pointwise certificate: any primal-feasible value lies below any dual-feasible bound for this maximization form.">
      <label className="text-sm font-semibold text-primary">primal feasible objective = {primalValue}<input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={primalValue} onChange={(event) => setPrimalValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="cᵀx" value={primalValue.toString()} /><Stat label="bᵀy" value={dualBound.toString()} tone="warning" /><Stat label="certified gap" value={(dualBound - primalValue).toString()} tone={primalValue === dualBound ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function CLRS4ComplementarySlacknessLab() {
  const [optimal, setOptimal] = useState(true);
  const rows = optimal
    ? [["resource 1", "tight", "price y₁=2"], ["bound x₁≤2", "tight", "price y₂=1"], ["bound x₂≤3", "slack", "price y₃=0"]]
    : [["resource 1", "slack", "price y₁=2"], ["bound x₁≤2", "tight", "price y₂=1"], ["bound x₂≤3", "slack", "price y₃=1"]];
  return (
    <Figure caption="Complementary slackness pairs positive dual prices with tight primal constraints and positive primal variables with tight dual constraints.">
      <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={optimal} onChange={(event) => setOptimal(event.target.checked)} />use complementary primal-dual pair</label>
      <div className="mt-4 space-y-2">{rows.map((row) => <div key={row[0]} className="grid grid-cols-3 gap-2 border border-border p-3 text-center text-xs"><span className="text-primary">{row[0]}</span><span className="text-secondary">{row[1]}</span><span className="font-mono text-accent">{row[2]}</span></div>)}</div>
      <div className="mt-4"><Stat label="optimality certificate" value={optimal ? "pass" : "violated"} tone={optimal ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function CLRS4LPCertificateLab() {
  const [issue, setIssue] = useState<"valid" | "domain" | "feasible" | "dual" | "mapping">("valid");
  const checks = {
    "variable domains match decisions": issue !== "domain",
    "all primal constraints are feasible": issue !== "feasible",
    "dual feasibility and gap are verified": issue !== "dual",
    "solution maps back to the domain": issue !== "mapping",
  };
  return (
    <Figure caption="An LP certificate combines formulation fidelity, primal feasibility, dual feasibility, objective agreement, and domain interpretation.">
      <label className="text-sm font-semibold text-primary">audit scenario<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={issue} onChange={(event) => setIssue(event.target.value as typeof issue)}><option value="valid">complete LP certificate</option><option value="domain">binary variable relaxed accidentally</option><option value="feasible">resource constraint violated</option><option value="dual">no dual bound</option><option value="mapping">solver vector not interpreted</option></select></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{Object.entries(checks).map(([name, ok]) => <div key={name} className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}>{name}<div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
    </Figure>
  );
}
