"use client";

import { useState } from "react";

type LensId = "callable" | "shape" | "binding" | "safety";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Delegates; Events; Lambda Expressions; try Statements and Exceptions; Enumeration and Iterators; Nullable Value Types; Nullable Reference Types; Extension Methods; Anonymous Types; Tuples; Records; Patterns; Attributes; Dynamic Binding; Operator Overloading; Unsafe Code and Pointers; Preprocessor Directives; XML Documentation";

const LENSES: readonly Lens[] = [
  {
    id: "callable",
    label: "Target / lifetime",
    question: "谁持有 callable、closure 或 enumerator，何时真正执行并清理？",
    evidence: "target/root graph + invocation count + Dispose path",
    accent: "var(--accent)",
    concepts: ["Delegates", "Events", "Lambda Expressions", "Enumeration and Iterators"],
  },
  {
    id: "shape",
    label: "Shape / control",
    question: "value shape、absence 和 exception 在哪一个真实评价点改变结果？",
    evidence: "truth table + case matrix + async/MoveNext test",
    accent: "var(--warning)",
    concepts: [
      "try Statements and Exceptions",
      "Nullable Value Types",
      "Nullable Reference Types",
      "Anonymous Types",
      "Tuples",
      "Records",
      "Patterns",
    ],
  },
  {
    id: "binding",
    label: "Compile / metadata",
    question: "调用是在 compile time、metadata consumer 还是 runtime binder 决定的？",
    evidence: "compile fixture + attribute target + version matrix",
    accent: "var(--success)",
    concepts: ["Extension Methods", "Attributes", "Dynamic Binding", "Operator Overloading", "XML Documentation"],
  },
  {
    id: "safety",
    label: "Safety / toolchain",
    question: "逃生舱把哪项检查推迟了，adapter 如何恢复 range、ABI 和 build 证据？",
    evidence: "negative/fuzz/platform matrix + bounded adapter",
    accent: "var(--danger)",
    concepts: ["Dynamic Binding", "Operator Overloading", "Unsafe Code and Pointers", "Preprocessor Directives"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10AdvancedCsharpBoundaryMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("callable");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Advanced C# 验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">高级特性移动了哪一道检查？</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            选择一个复习视角，再为 target、evaluation、binding 和 safety 各留下可复核证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Advanced C# 边界图"
          onClick={() => setActiveId("callable")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Advanced C# 复习视角" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
          viewBox="0 0 560 750"
          role="img"
          aria-label={`Advanced C# boundary map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Advanced C# boundary map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            高级特性不是语法捷径，而是检查时点的迁移
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            target / evaluation → binding / metadata → safety evidence
          </text>

          {["target", "evaluation", "binding", "safety"].map((stage, index) => {
            const x = 20 + index * 136;
            return (
              <g key={stage}>
                <rect x={x} y="68" width="112" height="34" rx="9" fill="var(--bg)" stroke={index === 1 ? activeLens.accent : "var(--border)"} strokeWidth={index === 1 ? "1.8" : "1"} />
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
            const y = 126 + row * 55;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="43"
                  rx="9"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 17} cy={y + 21.5} r="5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 31} y={y + 26} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 635 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="659" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="681" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="704" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>
          <text x="280" y="728" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            先写最早失败阶段，再决定是否需要 adapter、matrix 与 negative test
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 4-1：高级 C# 特性将检查移动到不同阶段；先定位 target、evaluation、binding 或 safety 边界，再选择验证手段。
      </figcaption>
    </figure>
  );
}
