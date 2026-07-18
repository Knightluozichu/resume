"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border bg-elevated p-4 sm:p-5">
      {children}
    </div>
  );
}

function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>{children}</Panel>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Stat({
  label,
  value,
  tone = "accent",
}: {
  label: string;
  value: string;
  tone?: "accent" | "warning" | "success" | "danger";
}) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return (
    <div className={`border p-3 text-center ${classes}`}>
      <div className="text-xs">{label}</div>
      <div className="mt-1 break-words font-mono text-sm">{value}</div>
    </div>
  );
}

const labels = ["A", "B", "C", "D"];
const INF = Number.POSITIVE_INFINITY;
const weight = [
  [0, 3, 8, INF],
  [INF, 0, -4, 1],
  [INF, INF, 0, 2],
  [5, INF, INF, 0],
];

function fmt(value: number) {
  return Number.isFinite(value) ? value.toString() : "∞";
}

function Matrix({
  values,
  active,
}: {
  values: number[][];
  active?: [number, number];
}) {
  return (
    <div className="grid grid-cols-5 gap-1 text-center font-mono text-xs">
      <div />
      {labels.map((label) => (
        <div key={label} className="p-2 text-accent">
          {label}
        </div>
      ))}
      {values.flatMap((row, i) => [
        <div key={`${i}-head`} className="p-2 text-accent">
          {labels[i]}
        </div>,
        ...row.map((value, j) => (
          <div
            key={`${i}-${j}`}
            className={`border p-2 ${active?.[0] === i && active[1] === j ? "border-success bg-success/10 text-success" : "border-border text-primary"}`}
          >
            {fmt(value)}
          </div>
        )),
      ])}
    </div>
  );
}

function minPlus(left: number[][], right: number[][]) {
  return left.map((_, i) =>
    right.map((__, j) =>
      Math.min(...labels.map((___, k) => left[i][k] + right[k][j])),
    ),
  );
}

function floyd(stage: number) {
  const distance = weight.map((row) => [...row]);
  for (let k = 0; k < stage; k += 1)
    for (let i = 0; i < labels.length; i += 1)
      for (let j = 0; j < labels.length; j += 1)
        distance[i][j] = Math.min(
          distance[i][j],
          distance[i][k] + distance[k][j],
        );
  return distance;
}

export function CLRS4WeightMatrixLab() {
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(2);
  return (
    <Figure caption="The weight matrix stores zero on the diagonal, edge weight for a direct edge, and infinity when no direct edge exists.">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-primary">
          row source
          <select
            className="mt-2 w-full border border-border bg-background p-2 text-primary"
            value={row}
            onChange={(event) => setRow(Number(event.target.value))}
          >
            {labels.map((label, index) => (
              <option key={label} value={index}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-primary">
          column target
          <select
            className="mt-2 w-full border border-border bg-background p-2 text-primary"
            value={col}
            onChange={(event) => setCol(Number(event.target.value))}
          >
            {labels.map((label, index) => (
              <option key={label} value={index}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4">
        <Matrix values={weight} active={[row, col]} />
      </div>
      <div className="mt-3 text-center text-sm text-primary">
        w({labels[row]},{labels[col]}) = {fmt(weight[row][col])}
      </div>
    </Figure>
  );
}

export function CLRS4MinPlusCellLab() {
  const [source, setSource] = useState(0);
  const [target, setTarget] = useState(3);
  const terms = labels.map((label, k) => ({
    label,
    value: weight[source][k] + weight[k][target],
  }));
  const best = Math.min(...terms.map((term) => term.value));
  return (
    <Figure caption="Min-plus multiplication replaces multiply by addition and sum by minimum; each k proposes a path from i to k and then k to j.">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-primary">
          source
          <select
            className="mt-2 w-full border border-border bg-background p-2 text-primary"
            value={source}
            onChange={(event) => setSource(Number(event.target.value))}
          >
            {labels.map((label, index) => (
              <option key={label} value={index}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-primary">
          target
          <select
            className="mt-2 w-full border border-border bg-background p-2 text-primary"
            value={target}
            onChange={(event) => setTarget(Number(event.target.value))}
          >
            {labels.map((label, index) => (
              <option key={label} value={index}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {terms.map((term) => (
          <Stat
            key={term.label}
            label={`via ${term.label}`}
            value={fmt(term.value)}
            tone={term.value === best ? "success" : "accent"}
          />
        ))}
      </div>
      <div className="mt-3 text-center text-sm text-primary">
        best with at most two edges = {fmt(best)}
      </div>
    </Figure>
  );
}

export function CLRS4EdgeDoublingLab() {
  const [power, setPower] = useState(1);
  let matrix = weight.map((row) => [...row]);
  for (let step = 0; step < power; step += 1) matrix = minPlus(matrix, matrix);
  return (
    <Figure caption="Repeated squaring doubles the maximum permitted edge count from 1 to 2, 4, 8, and so on until it covers every simple shortest path.">
      <label className="text-sm font-semibold text-primary">
        squaring rounds = {power}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="2"
          value={power}
          onChange={(event) => setPower(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Stat
          label="paths use at most"
          value={(2 ** power).toString()}
          tone="warning"
        />
        <Stat
          label="A to D distance"
          value={fmt(matrix[0][3])}
          tone="success"
        />
      </div>
    </Figure>
  );
}

export function CLRS4FloydIntermediateLab() {
  const [stage, setStage] = useState(2);
  const distance = floyd(stage);
  return (
    <Figure caption="At Floyd-Warshall stage k, every internal path vertex must come from the first k labels; a path either avoids k or splits at k.">
      <label className="text-sm font-semibold text-primary">
        allowed intermediates = {labels.slice(0, stage).join(", ") || "none"}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="4"
          value={stage}
          onChange={(event) => setStage(Number(event.target.value))}
        />
      </label>
      <div className="mt-4">
        <Matrix values={distance} />
      </div>
    </Figure>
  );
}

export function CLRS4FloydCellLab() {
  const [k, setK] = useState(1);
  const before = floyd(k);
  const i = 0;
  const j = 3;
  const direct = before[i][j];
  const through = before[i][k] + before[k][j];
  return (
    <Figure caption="The Floyd-Warshall cell update compares the best path that avoids k with one whose internal occurrence of k splits the path into two solved subpaths.">
      <label className="text-sm font-semibold text-primary">
        new intermediate k = {labels[k]}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="3"
          value={k}
          onChange={(event) => setK(Number(event.target.value))}
        />
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="avoid k" value={fmt(direct)} />
        <Stat label={`via ${labels[k]}`} value={fmt(through)} tone="warning" />
        <Stat
          label="new A→D"
          value={fmt(Math.min(direct, through))}
          tone="success"
        />
      </div>
    </Figure>
  );
}

export function CLRS4PredecessorMatrixLab() {
  const [pair, setPair] = useState<"AD" | "AC" | "DA">("AD");
  const rows = {
    AD: ["A → B → C → D", "C", "predecessor of D on A-to-D path"],
    AC: ["A → B → C", "B", "predecessor of C on A-to-C path"],
    DA: ["D → A", "D", "direct edge predecessor"],
  }[pair];
  return (
    <Figure caption="A predecessor matrix stores the predecessor of j on an i-to-j shortest path; recursive splitting or backward walking reconstructs the witness.">
      <label className="text-sm font-semibold text-primary">
        ordered pair
        <select
          className="mt-2 w-full border border-border bg-background p-2 text-primary"
          value={pair}
          onChange={(event) => setPair(event.target.value as typeof pair)}
        >
          <option value="AD">A to D</option>
          <option value="AC">A to C</option>
          <option value="DA">D to A</option>
        </select>
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="path" value={rows[0]} tone="success" />
        <Stat label="π[i,j]" value={rows[1]} />
        <Stat label="meaning" value={rows[2]} tone="warning" />
      </div>
    </Figure>
  );
}

export function CLRS4TransitiveClosureLab() {
  const [stage, setStage] = useState(2);
  const reach = floyd(stage).map((row) =>
    row.map((value) => (Number.isFinite(value) ? 1 : INF)),
  );
  return (
    <Figure caption="Replacing min-plus with Boolean OR-AND yields transitive closure: t[i,j] reports whether any directed path from i to j exists.">
      <label className="text-sm font-semibold text-primary">
        Boolean Floyd stages = {stage}
        <input
          className="mt-2 w-full accent-current"
          type="range"
          min="0"
          max="4"
          value={stage}
          onChange={(event) => setStage(Number(event.target.value))}
        />
      </label>
      <div className="mt-4">
        <Matrix values={reach} />
      </div>
    </Figure>
  );
}

const potentials: Record<string, number> = { A: 0, B: 0, C: -4, D: -2 };
type Edge = { u: string; v: string; w: number };

const johnsonEdges: Edge[] = [
  { u: "A", v: "B", w: 3 },
  { u: "A", v: "C", w: 8 },
  { u: "B", v: "C", w: -4 },
  { u: "B", v: "D", w: 1 },
  { u: "C", v: "D", w: 2 },
  { u: "D", v: "A", w: 5 },
];

export function CLRS4JohnsonPotentialLab() {
  const [vertex, setVertex] = useState("C");
  return (
    <Figure caption="Johnson adds a zero-edge super-source and runs Bellman-Ford; h(v)=δ(q,v) supplies a potential that makes every reweighted edge nonnegative.">
      <label className="text-sm font-semibold text-primary">
        vertex potential
        <select
          className="mt-2 w-full border border-border bg-background p-2 text-primary"
          value={vertex}
          onChange={(event) => setVertex(event.target.value)}
        >
          {labels.map((label) => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="super-source edge" value={`q→${vertex}:0`} />
        <Stat
          label="h(v)"
          value={potentials[vertex].toString()}
          tone="warning"
        />
        <Stat label="negative cycle" value="none" tone="success" />
      </div>
    </Figure>
  );
}

export function CLRS4JohnsonReweightLab() {
  const [edgeIndex, setEdgeIndex] = useState(2);
  const edge = johnsonEdges[edgeIndex];
  const reweighted = edge.w + potentials[edge.u] - potentials[edge.v];
  return (
    <Figure caption="Reweighting adds h(u)−h(v) to an edge; these potential terms telescope along a path, preserving path order while eliminating negative edge weights.">
      <label className="text-sm font-semibold text-primary">
        edge
        <select
          className="mt-2 w-full border border-border bg-background p-2 text-primary"
          value={edgeIndex}
          onChange={(event) => setEdgeIndex(Number(event.target.value))}
        >
          {johnsonEdges.map((item, index) => (
            <option key={`${item.u}-${item.v}`} value={index}>
              {item.u}→{item.v}: {item.w}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="original w" value={edge.w.toString()} />
        <Stat
          label="h(u) − h(v)"
          value={(potentials[edge.u] - potentials[edge.v]).toString()}
          tone="warning"
        />
        <Stat label="reweighted" value={reweighted.toString()} tone="success" />
      </div>
    </Figure>
  );
}

export function CLRS4APSPCompareLab() {
  const [algorithm, setAlgorithm] = useState<"matrix" | "floyd" | "johnson">(
    "floyd",
  );
  const rows = {
    matrix: [
      "min-plus repeated squaring",
      "dense algebraic view",
      "O(V³ log V)",
    ],
    floyd: ["intermediate-set DP", "dense graph and simple matrix", "O(V³)"],
    johnson: [
      "Bellman-Ford plus V Dijkstra runs",
      "sparse graph with negative edges",
      "O(VE log V) with binary heaps",
    ],
  }[algorithm];
  return (
    <Figure caption="All-pairs algorithms solve the same contract with different states and density tradeoffs; weight preconditions and witness requirements choose the implementation.">
      <label className="text-sm font-semibold text-primary">
        algorithm
        <select
          className="mt-2 w-full border border-border bg-background p-2 text-primary"
          value={algorithm}
          onChange={(event) =>
            setAlgorithm(event.target.value as typeof algorithm)
          }
        >
          <option value="matrix">min-plus matrix</option>
          <option value="floyd">Floyd-Warshall</option>
          <option value="johnson">Johnson</option>
        </select>
      </label>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="state" value={rows[0]} />
        <Stat label="best fit" value={rows[1]} tone="warning" />
        <Stat label="time" value={rows[2]} tone="success" />
      </div>
    </Figure>
  );
}

export function CLRS4APSPCertificateLab() {
  const [issue, setIssue] = useState<
    "valid" | "diagonal" | "triangle" | "parent" | "reweight"
  >("valid");
  const checks = {
    "diagonal and negative-cycle status valid": issue !== "diagonal",
    "all-pairs triangle inequalities hold": issue !== "triangle",
    "predecessors reconstruct tight paths": issue !== "parent",
    "Johnson reweights nonnegative and recovers distances":
      issue !== "reweight",
  };
  return (
    <Figure caption="An APSP certificate checks every ordered pair, diagonal negative-cycle evidence, triangle inequalities, path witnesses, and Johnson's recovery equation.">
      <label className="text-sm font-semibold text-primary">
        audit scenario
        <select
          className="mt-2 w-full border border-border bg-background p-2 text-primary"
          value={issue}
          onChange={(event) => setIssue(event.target.value as typeof issue)}
        >
          <option value="valid">valid result</option>
          <option value="diagonal">negative diagonal</option>
          <option value="triangle">triangle violation</option>
          <option value="parent">broken predecessor</option>
          <option value="reweight">bad recovered distance</option>
        </select>
      </label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(checks).map(([name, ok]) => (
          <div
            key={name}
            className={`border p-3 text-center text-xs ${ok ? "border-success text-success" : "border-danger text-danger"}`}
          >
            {name}
            <div className="mt-1 font-mono">{ok ? "pass" : "fail"}</div>
          </div>
        ))}
      </div>
    </Figure>
  );
}
