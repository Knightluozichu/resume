"use client";

import { useMemo, useState, type ReactNode } from "react";

type ReductionExample = {
  from: string;
  to: string;
  transform: string;
  solve: string;
  lift: string;
  complexity: string;
};

const reductions: ReductionExample[] = [
  {
    from: "bipartite matching",
    to: "maximum flow",
    transform: "add source, sink, and unit-capacity edges",
    solve: "run maxflow",
    lift: "keep unit-flow left-right edges",
    complexity: "Tflow(V + 2, E + 2V) + O(E + V)",
  },
  {
    from: "PERT scheduling",
    to: "DAG longest paths",
    transform: "activities become weighted precedence edges",
    solve: "topological dynamic programming",
    lift: "distance is earliest start time",
    complexity: "O(E + V)",
  },
  {
    from: "undirected shortest path",
    to: "directed shortest path",
    transform: "replace each nonnegative edge by two arcs",
    solve: "run directed shortest paths",
    lift: "forget arc orientation pairs",
    complexity: "Tsp(V, 2E) + O(E)",
  },
  {
    from: "two-person zero-sum game",
    to: "linear programming",
    transform: "encode mixed strategies as nonnegative variables",
    solve: "solve primal and dual LPs",
    lift: "normalize vectors into probabilities",
    complexity: "TLP(m, n) + O(mn)",
  },
];

const factorial = (n: number) => Array.from({ length: n }, (_, index) => index + 1).reduce((product, value) => product * value, 1);

const vertices = [
  { x: 0, y: 0, label: "origin" },
  { x: 0, y: 4, label: "y boundary" },
  { x: 1, y: 3, label: "constraint intersection" },
  { x: 2.5, y: 0, label: "x boundary" },
];

const assignments = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];

const assignmentCost = [
  [9, 2, 7],
  [6, 4, 3],
  [5, 8, 1],
];

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

export function Algs4ReductionMap() {
  const [index, setIndex] = useState(0);
  const reduction = reductions[index];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">
          reduction example
          <select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={index} onChange={(event) => setIndex(Number(event.target.value))}>
            {reductions.map((item, itemIndex) => <option key={item.from} value={itemIndex}>{item.from} to {item.to}</option>)}
          </select>
        </label>
        <div className="mt-4 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="border border-accent p-3 text-accent"><div className="text-xs text-secondary">problem X</div><div className="mt-1 font-semibold">{reduction.from}</div></div>
          <div className="grid place-items-center text-accent">→</div>
          <div className="border border-warning p-3 text-warning"><div className="text-xs text-secondary">known problem Y</div><div className="mt-1 font-semibold">{reduction.to}</div></div>
          <div className="grid place-items-center text-success">→</div>
          <div className="border border-success p-3 text-success"><div className="text-xs text-secondary">solution to X</div><div className="mt-1 font-semibold">{reduction.lift}</div></div>
        </div>
        <div className="mt-3 border border-border p-3 font-mono text-xs text-secondary">{reduction.complexity}</div>
      </Panel>
      <Caption>A reduction is a complete transform-solve-lift contract, not merely a resemblance between two problems.</Caption>
    </figure>
  );
}

export function Algs4ReductionContractLab() {
  const [stage, setStage] = useState(3);
  const stages = [
    ["instance map", "construct an instance y = f(x)"],
    ["target solver", "compute answer b = solveY(y)"],
    ["answer map", "recover a = g(x, b)"],
    ["proof obligation", "prove a solves x and account for all costs"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">visible obligations = {stage + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={stage} onChange={(event) => setStage(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {stages.map(([name, detail], index) => <div key={name} className={"border p-3 text-xs " + (index <= stage ? "border-success text-success" : "border-border text-secondary opacity-40")}><div className="font-semibold">{index + 1}. {name}</div><div className="mt-2 text-secondary">{detail}</div></div>)}
        </div>
        <div className={"mt-3 border p-3 text-sm " + (stage === 3 ? "border-success text-success" : "border-danger text-danger")}>{stage === 3 ? "complete reduction: correctness and resource bounds are checkable" : "incomplete claim: a missing stage can invalidate the algorithm or its bound"}</div>
      </Panel>
      <Caption>Correct reductions preserve answers and explicitly charge instance construction, target solving, and answer recovery.</Caption>
    </figure>
  );
}

export function Algs4UpperBoundLab() {
  const [index, setIndex] = useState(0);
  const example = reductions[index];
  const [instances, setInstances] = useState(100);
  const construction = index === 0 ? instances * instances : index === 1 ? instances : index === 2 ? instances * 2 : instances * instances;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-secondary">reduction<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={index} onChange={(event) => setIndex(Number(event.target.value))}>{reductions.map((item, itemIndex) => <option key={item.from} value={itemIndex}>{item.from}</option>)}</select></label>
          <label className="text-xs text-secondary">input scale n = {instances}<input className="mt-2 w-full accent-current" type="range" min="10" max="300" step="10" value={instances} onChange={(event) => setInstances(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3"><div className="text-xs text-secondary">transform</div><div className="mt-1 text-sm text-accent">{example.transform}</div></div><div className="border border-warning p-3"><div className="text-xs text-secondary">derived size proxy</div><div className="mt-1 font-mono text-xl text-warning">{construction.toLocaleString()}</div></div><div className="border border-success p-3"><div className="text-xs text-secondary">upper-bound formula</div><div className="mt-1 font-mono text-xs text-success">{example.complexity}</div></div></div>
      </Panel>
      <Caption>To establish an upper bound for X, reduce X to a problem Y that already has an algorithm and include the reduction overhead.</Caption>
    </figure>
  );
}

export function Algs4LowerBoundLab() {
  const [direction, setDirection] = useState<"correct" | "reversed">("correct");
  const correct = direction === "correct";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">lower-bound direction<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={direction} onChange={(event) => setDirection(event.target.value as typeof direction)}><option value="correct">sorting reduces to candidate X</option><option value="reversed">candidate X reduces to sorting</option></select></label>
        <div className="mt-4 flex items-center justify-center gap-3 text-center">
          <div className="border border-danger p-4 text-danger"><div className="text-xs">known hard problem</div><div className="font-semibold">sorting</div><div className="font-mono">Ω(n log n)</div></div>
          <div className="text-2xl text-accent">{correct ? "→" : "←"}</div>
          <div className="border border-accent p-4 text-accent"><div className="text-xs">candidate</div><div className="font-semibold">element distinctness</div></div>
        </div>
        <div className={"mt-4 border p-3 text-sm " + (correct ? "border-success text-success" : "border-danger text-danger")}>{correct ? "If X were faster, sorting would become faster through this map; the known lower bound transfers to X." : "This only gives an algorithmic upper bound for X. It does not transfer sorting's hardness to X."}</div>
      </Panel>
      <Caption>Lower bounds travel from a known-hard source problem into the target problem; reversing the arrow proves a different statement.</Caption>
    </figure>
  );
}

export function Algs4DistinctnessDecisionTreeLab() {
  const [n, setN] = useState(6);
  const leaves = factorial(n);
  const depth = Math.ceil(Math.log2(leaves));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">distinct keys n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="10" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="border border-accent p-3"><div className="text-xs text-secondary">orders</div><div className="font-mono text-xl text-accent">{leaves.toLocaleString()}</div></div><div className="border border-warning p-3"><div className="text-xs text-secondary">binary depth</div><div className="font-mono text-xl text-warning">≥ {depth}</div></div><div className="border border-success p-3"><div className="text-xs text-secondary">asymptotic</div><div className="font-mono text-xl text-success">Ω(n log n)</div></div></div>
        <div className="mt-3 h-3 border border-border bg-background"><div className="h-full bg-accent" style={{ width: `${Math.min(100, depth * 5)}%` }} /></div>
      </Panel>
      <Caption>Distinguishing all n! possible strict orders forces comparison-tree depth at least log₂(n!), which is Θ(n log n).</Caption>
    </figure>
  );
}

export function Algs4LinearProgrammingLab() {
  const [cx, setCx] = useState(3);
  const [cy, setCy] = useState(2);
  const scored = vertices.map((vertex) => ({ ...vertex, value: cx * vertex.x + cy * vertex.y }));
  const best = scored.reduce((winner, candidate) => candidate.value > winner.value ? candidate : winner);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">objective coefficient c₁ = {cx}<input className="mt-2 w-full accent-current" type="range" min="-2" max="6" value={cx} onChange={(event) => setCx(Number(event.target.value))} /></label><label className="text-xs text-secondary">objective coefficient c₂ = {cy}<input className="mt-2 w-full accent-current" type="range" min="-2" max="6" value={cy} onChange={(event) => setCy(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{scored.map((vertex) => <div key={vertex.label} className={"border p-3 text-xs " + (vertex === best ? "border-success text-success" : "border-border text-secondary")}><div className="font-mono">({vertex.x}, {vertex.y})</div><div>{vertex.label}</div><div className="mt-1 font-mono">z = {vertex.value}</div></div>)}</div>
        <div className="mt-3 border border-success p-3 text-success">best basic feasible solution: ({best.x}, {best.y}), objective {best.value}</div>
      </Panel>
      <Caption>For this bounded polygon, a linear objective reaches an optimum at a vertex, which is why simplex can move among basic feasible solutions.</Caption>
    </figure>
  );
}

export function Algs4StandardFormLab() {
  const [kind, setKind] = useState<"greater" | "equality" | "free">("greater");
  const rows = {
    greater: ["a·x ≥ b", "−a·x ≤ −b", "flip every coefficient and the right side"],
    equality: ["a·x = b", "a·x ≤ b and −a·x ≤ −b", "both inequalities must hold"],
    free: ["x unrestricted", "x = x⁺ − x⁻, x⁺, x⁻ ≥ 0", "replace one free variable by two nonnegative variables"],
  }[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">general constraint<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}><option value="greater">greater-than constraint</option><option value="equality">equality constraint</option><option value="free">unrestricted variable</option></select></label>
        <div className="mt-4 grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]"><div className="border border-danger p-4 font-mono text-danger">{rows[0]}</div><div className="text-accent">→</div><div className="border border-success p-4 font-mono text-success">{rows[1]}</div></div>
        <div className="mt-3 text-sm text-secondary">{rows[2]}</div>
      </Panel>
      <Caption>General linear programs reduce to a standard nonnegative-variable form through semantics-preserving local transformations.</Caption>
    </figure>
  );
}

export function Algs4SimplexPivotLab() {
  const [pivot, setPivot] = useState(2);
  const path = vertices.slice(0, pivot + 1);
  const current = path[path.length - 1];
  const objective = 3 * current.x + 2 * current.y;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">simplex pivots = {pivot}<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={pivot} onChange={(event) => setPivot(Number(event.target.value))} /></label>
        <div className="mt-4 flex items-center justify-between">{vertices.slice(0, 3).map((vertex, index) => <div key={vertex.label} className="flex flex-1 items-center"><div className={"grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 text-xs " + (index < pivot ? "border-success text-success" : index === pivot ? "border-warning text-warning" : "border-border text-secondary")}><span>({vertex.x},{vertex.y})</span></div>{index < 2 ? <div className={"h-px flex-1 " + (index < pivot ? "bg-success" : "bg-border")} /> : null}</div>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2"><div className="border border-accent p-3 text-accent"><div className="text-xs">current basis</div><div className="font-mono">{current.label}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">3x + 2y</div><div className="font-mono text-xl">{objective}</div></div></div>
      </Panel>
      <Caption>A pivot exchanges one basic variable and moves along an edge to an adjacent basic feasible solution with better reduced cost.</Caption>
    </figure>
  );
}

export function Algs4PrimalDualLab() {
  const [candidate, setCandidate] = useState<"optimal" | "primal bad" | "gap">("optimal");
  const state = {
    optimal: { x: [1, 3], y: [1, 1] },
    "primal bad": { x: [2, 2], y: [1, 1] },
    gap: { x: [0, 4], y: [3, 0] },
  }[candidate];
  const primalFeasible = state.x[0] + state.x[1] <= 4 && 2 * state.x[0] + state.x[1] <= 5;
  const dualFeasible = state.y[0] + 2 * state.y[1] >= 3 && state.y[0] + state.y[1] >= 2;
  const primal = 3 * state.x[0] + 2 * state.x[1];
  const dual = 4 * state.y[0] + 5 * state.y[1];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate certificate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={candidate} onChange={(event) => setCandidate(event.target.value as typeof candidate)}><option value="optimal">optimal pair</option><option value="primal bad">infeasible primal</option><option value="gap">feasible but non-tight pair</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className={"border p-4 " + (primalFeasible ? "border-success text-success" : "border-danger text-danger")}><div className="text-xs">primal x = ({state.x.join(", ")})</div><div className="mt-1 font-mono text-2xl">max = {primal}</div><div>{primalFeasible ? "feasible" : "constraint violated"}</div></div><div className={"border p-4 " + (dualFeasible ? "border-success text-success" : "border-danger text-danger")}><div className="text-xs">dual y = ({state.y.join(", ")})</div><div className="mt-1 font-mono text-2xl">min = {dual}</div><div>{dualFeasible ? "feasible" : "constraint violated"}</div></div></div>
        <div className={"mt-3 border p-3 text-center font-mono " + (primalFeasible && dualFeasible && primal === dual ? "border-success text-success" : "border-warning text-warning")}>duality gap = {dual - primal}</div>
      </Panel>
      <Caption>Feasible primal and dual solutions with equal objective values form an independently checkable optimality certificate.</Caption>
    </figure>
  );
}

export function Algs4AssignmentLab() {
  const [permutationIndex, setPermutationIndex] = useState(5);
  const permutation = assignments[permutationIndex];
  const costs = permutation.map((column, row) => assignmentCost[row][column]);
  const total = costs.reduce((sum, value) => sum + value, 0);
  const best = useMemo(() => assignments.map((assignment, index) => ({ index, total: assignment.reduce((sum, column, row) => sum + assignmentCost[row][column], 0) })).reduce((winner, candidate) => candidate.total < winner.total ? candidate : winner), []);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">perfect assignment<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={permutationIndex} onChange={(event) => setPermutationIndex(Number(event.target.value))}>{assignments.map((assignment, index) => <option key={assignment.join("-")} value={index}>{assignment.map((column, row) => `worker ${row + 1}→job ${column + 1}`).join(", ")}</option>)}</select></label>
        <div className="mt-4 grid grid-cols-3 gap-2">{assignmentCost.map((row, rowIndex) => row.map((cost, columnIndex) => <div key={`${rowIndex}-${columnIndex}`} className={"border p-3 text-center font-mono " + (permutation[rowIndex] === columnIndex ? "border-accent text-accent" : "border-border text-secondary")}><div className="text-[10px]">w{rowIndex + 1} / j{columnIndex + 1}</div><div>{cost}</div></div>))}</div>
        <div className={"mt-3 border p-3 text-sm " + (permutationIndex === best.index ? "border-success text-success" : "border-warning text-warning")}>selected cost = {total}; optimum = {best.total}</div>
      </Panel>
      <Caption>The assignment LP selects one entry in every row and column; integrality makes an optimal extreme point a permutation matrix.</Caption>
    </figure>
  );
}

export function Algs4ZeroSumGameLab() {
  const [topProbability, setTopProbability] = useState(50);
  const p = topProbability / 100;
  const againstLeft = p * 3 + (1 - p) * -1;
  const againstRight = p * 0 + (1 - p) * 2;
  const guaranteed = Math.min(againstLeft, againstRight);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">row player chooses top with p = {p.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="100" value={topProbability} onChange={(event) => setTopProbability(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2"><div className="border border-accent p-4 text-center"><div className="text-xs text-secondary">column chooses left</div><div className="font-mono text-2xl text-accent">{againstLeft.toFixed(2)}</div></div><div className="border border-warning p-4 text-center"><div className="text-xs text-secondary">column chooses right</div><div className="font-mono text-2xl text-warning">{againstRight.toFixed(2)}</div></div></div>
        <div className={"mt-3 border p-3 text-center " + (Math.abs(p - 0.5) < 0.01 ? "border-success text-success" : "border-border text-secondary")}>guaranteed payoff min = {guaranteed.toFixed(2)}; equilibrium p = 0.50, value = 1.00</div>
      </Panel>
      <Caption>A maximin mixed strategy equalizes active pure responses from the opponent; LP duality yields the minimax equality.</Caption>
    </figure>
  );
}

export function Algs4ReductionCertificateLab() {
  const [mutation, setMutation] = useState<"valid" | "lost edge" | "wrong lift">("valid");
  const checks = {
    size: true,
    instance: mutation !== "lost edge",
    answer: mutation !== "wrong lift",
    cost: true,
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">matching-to-flow certificate<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option value="valid">valid construction</option><option value="lost edge">omit one allowed edge</option><option value="wrong lift">lift a zero-flow edge</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-3 text-center text-xs " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "Reduction preserves every feasible matching and every integral flow solution." : "The claimed equivalence is broken even if the target solver itself is correct."}</div>
      </Panel>
      <Caption>A reduction certificate checks instance preservation, answer recovery, size growth, and total running-time accounting.</Caption>
    </figure>
  );
}
