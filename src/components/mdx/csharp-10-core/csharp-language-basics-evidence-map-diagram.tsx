"use client";

import { useState } from "react";

type LensId = "storage" | "boundary" | "evaluation";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "A First C# Program; Compilation; Syntax; Type Basics; Numeric Types; Boolean Type and Operators; Strings and Characters; Arrays; Variables and Parameters; Expressions and Operators; Null Operators; Statements; Namespaces";

const LENSES: readonly Lens[] = [
  {
    id: "storage",
    label: "Storage / copy",
    question: "赋值到底复制了 value、reference，还是 caller 的 storage alias？",
    evidence: "对象图 + identity/value test + ref escape check",
    accent: "var(--accent)",
    concepts: [
      "Type Basics",
      "Strings and Characters",
      "Arrays",
      "Variables and Parameters",
    ],
  },
  {
    id: "boundary",
    label: "Range / precision",
    question: "输入、转换与文本边界会丢什么信息，失败发生在哪一层？",
    evidence: "range table + checked matrix + culture/encoding fixture",
    accent: "var(--warning)",
    concepts: [
      "Numeric Types",
      "Boolean Type and Operators",
      "Strings and Characters",
      "Arrays",
    ],
  },
  {
    id: "evaluation",
    label: "Evaluation / scope",
    question: "代码何时求值、怎样分支、名字在哪个 compilation scope 中解析？",
    evidence: "compile fixture + truth table + first-failure diagnostic",
    accent: "var(--success)",
    concepts: [
      "A First C# Program",
      "Compilation",
      "Syntax",
      "Expressions and Operators",
      "Null Operators",
      "Statements",
      "Namespaces",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10CsharpLanguageBasicsEvidenceMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("storage");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">语言基础验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一条语句的三种证据路线</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            先选择你要追踪的边界，再回到代码验证 storage、numeric 或 evaluation 的实际行为。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置语言基础证据图"
          onClick={() => setActiveId("storage")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="语言基础证据路线" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 620"
          role="img"
          aria-label={`C# language basics evidence map. Active route: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>C# language basics evidence map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            语言基础不是语法清单，而是证据链
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            source → compile → evaluate → boundary test
          </text>

          {["source", "compile", "evaluate", "boundary test"].map((stage, index) => {
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
                  stroke={index === 1 ? "var(--accent)" : "var(--border)"}
                  strokeWidth={index === 1 ? "2" : "1"}
                />
                <text x={x + 56} y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {stage}
                </text>
                {index < 3 && (
                  <path d={`M${x + 116} 85 H${x + 130}`} stroke="var(--text-secondary)" strokeWidth="1.5" />
                )}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 20 : 290;
            const y = 124 + row * 58;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="46"
                  rx="9"
                  fill={highlighted ? `${activeLens.accent}` : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 17} cy={y + 23} r="5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 31} y={y + 28} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 532 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="554" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="575" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.evidence}
          </text>
          <text x="280" y="598" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.question}
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 2-1：用存储、数值边界和求值作用域三条路线验收 C# 基础规则；高亮项是当前路线优先留下的证据。
      </figcaption>
    </figure>
  );
}
