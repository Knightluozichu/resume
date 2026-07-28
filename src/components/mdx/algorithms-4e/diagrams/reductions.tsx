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
