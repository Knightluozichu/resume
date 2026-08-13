"use client";

import { useState } from "react";

type LensId = "binding" | "deferred" | "provider";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Getting Started; Query Expressions; Deferred Execution; Subqueries; Composition Strategies; Projection Strategies; Interpreted Queries; EF Core; Building Query Expressions";

const LENSES: readonly Lens[] = [
  {
    id: "binding",
    label: "Binding / operators",
    question: "source 的 static type 把 lambda 绑定成 delegate，还是 expression tree？",
    evidence: "receiver type + operator overload + element-shape fixture",
    accent: "var(--accent)",
    concepts: ["Getting Started", "Query Expressions", "Composition Strategies", "Building Query Expressions"],
  },
  {
    id: "deferred",
    label: "Deferred / timeline",
    question: "query 何时定义、何时 MoveNext、何时 materialize，期间谁可能改变？",
    evidence: "counting source + capture mutation + terminal/dispose timeline",
    accent: "var(--warning)",
    concepts: ["Deferred Execution", "Subqueries", "Composition Strategies", "Projection Strategies"],
  },
  {
    id: "provider",
    label: "Provider / SQL",
    question: "哪些 operators 留在 server，哪里切到 client，结果是否引入 N+1 或额外 round trips？",
    evidence: "expression nodes + generated SQL + rows/bytes/query count",
    accent: "var(--success)",
    concepts: ["Interpreted Queries", "EF Core", "Projection Strategies", "Building Query Expressions"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10LinqQueriesExecutionBoundaryDiagram() {
  const [activeId, setActiveId] = useState<LensId>("binding");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">LINQ 执行验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一段 query，三条执行边界</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            选择 binding、deferred 或 provider 视角，追踪 query 从定义到结果的真实证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 LINQ 查询执行边界图"
          onClick={() => setActiveId("binding")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="LINQ 查询执行视角" className="grid gap-2 md:grid-cols-3">
          {LENSES.map((lens) => {
            const selected = lens.id === activeId;
            return (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveId(lens.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 560 700"
          role="img"
          aria-label={`LINQ query execution boundary map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>LINQ query execution boundary map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            query recipe ≠ query execution
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            source type → operators → enumeration → local/remote result
          </text>

          {["source type", "query recipe", "MoveNext", "result"].map((stage, index) => {
            const x = 20 + index * 136;
            return (
              <g key={stage}>
                <rect x={x} y="68" width="112" height="34" rx="9" fill="var(--bg)" stroke={index === 2 ? activeLens.accent : "var(--border)"} strokeWidth={index === 2 ? "1.8" : "1"} />
                <text x={x + 56} y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {stage}
                </text>
                {index < 3 && <path d={`M${x + 116} 85 H${x + 130}`} stroke="var(--text-secondary)" strokeWidth="1.5" />}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 126 + row * 57;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="45"
                  rx="9"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 17} cy={y + 22.5} r="5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 31} y={y + 27} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 411 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="436" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="459" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="483" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="512" width="520" height="116" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="538" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Query gate
          </text>
          <text x="40" y="561" fill="var(--text-secondary)" fontSize="11">
            before materialize：写 cardinality、order、rows/bytes、tracking 与 owner
          </text>
          <text x="40" y="583" fill="var(--text-secondary)" fontSize="11">
            after materialize：保存 SQL、parameters、query count、exception 与 cancellation
          </text>
          <text x="40" y="605" fill="var(--text-secondary)" fontSize="11">
            AsEnumerable 只改变后续 binding；ToList/ToArray 才建立 snapshot。
          </text>
          <text x="280" y="670" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            先确认绑定和执行时点，再讨论 LINQ 性能与 provider 语义
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 8-1：LINQ 的核心不是语法，而是绑定、延迟执行、provider 翻译与 materialization 的边界证据。
      </figcaption>
    </figure>
  );
}
