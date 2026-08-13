"use client";

import { useState } from "react";

type LensId = "shape" | "contract" | "execution";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Overview; Filtering; Projecting; Joining; Ordering; Grouping; Set Operators; Conversion Methods; Element Operators; Aggregation Methods; Quantifiers; Generation Methods";

const LENSES: readonly Lens[] = [
  {
    id: "shape",
    label: "Shape / cardinality",
    question: "这个 operator 保留、变换、展开还是组合 input shape？",
    evidence: "input/output rows + empty/one/many fixture + order/duplicate notes",
    accent: "var(--accent)",
    concepts: ["Overview", "Filtering", "Projecting", "Joining", "Grouping"],
  },
  {
    id: "contract",
    label: "Comparer / empty contract",
    question: "comparer、tie、duplicate 与 empty/one/many 的业务契约是什么？",
    evidence: "equality/order laws + duplicate policy + explicit empty assertion",
    accent: "var(--warning)",
    concepts: ["Ordering", "Grouping", "Set Operators", "Element Operators", "Quantifiers"],
  },
  {
    id: "execution",
    label: "Boundary / evaluation",
    question: "何时 deferred，何时 buffer/materialize，何时 short-circuit 或触发 provider？",
    evidence: "counting source + MoveNext fault + query/bytes/materialization trace",
    accent: "var(--success)",
    concepts: ["Conversion Methods", "Aggregation Methods", "Quantifiers", "Generation Methods", "Overview"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10LinqOperatorsDecisionMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("shape");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">LINQ operator 决策图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先写契约，再选 operator</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 shape、comparer/empty 或 execution 视角，把名称映射成可验收的输入、输出与边界证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 LINQ operator 决策图"
          onClick={() => setActiveId("shape")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="LINQ operator 决策视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 720"
          role="img"
          aria-label={`LINQ operator decision map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>LINQ operator decision map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            operator name → shape → contract → evidence
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            input cardinality、comparer、empty policy 与 evaluation boundary
          </text>

          {["input shape", "operator", "output shape", "test gate"].map((stage, index) => {
            const x = 20 + index * 136;
            return (
              <g key={stage}>
                <rect
                  x={x}
                  y="68"
                  width="112"
                  height="34"
                  rx="9"
                  fill="var(--bg)"
                  stroke={index === 1 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 1 ? "1.8" : "1"}
                />
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
            const y = 126 + row * 53;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="42"
                  rx="9"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 17} cy={y + 21} r="5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 31} y={y + 26} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 438 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="463" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="486" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="510" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="538" width="520" height="112" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="564" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Operator gate
          </text>
          <text x="40" y="587" fill="var(--text-secondary)" fontSize="11">
            先记录 empty/one/many、duplicates、order/tie 与 comparer，再写 expected rows。
          </text>
          <text x="40" y="609" fill="var(--text-secondary)" fontSize="11">
            再用 counting source、throwing MoveNext、SQL/bytes 或 allocation 证明执行边界。
          </text>
          <text x="40" y="631" fill="var(--text-secondary)" fontSize="11">
            ToList/Array/Dictionary 是 boundary；First/Any/All 还要验收 short-circuit 与 empty policy。
          </text>
          <text x="280" y="690" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            shape 决定选择，contract 决定正确性，evidence 决定是否可发布
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 9-1：LINQ Operators 的验收路径；同一个 method name 必须落到明确的 shape、empty/comparer 契约与执行证据。
      </figcaption>
    </figure>
  );
}
