"use client";

import { useState } from "react";

type LensId = "binding" | "shape" | "boundary";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "The Dynamic Language Runtime; Numeric Type Unification; Dynamic Member Overload Resolution; Simplifying the Visitor Pattern; Anonymously Calling Members of a Generic Type; Implementing Dynamic Objects; DynamicObject; ExpandoObject; Interoperating with Dynamic Languages";

const LENSES: readonly Lens[] = [
  {
    id: "binding",
    label: "Binding / dispatch",
    question: "运行时输入到达 call site 后，哪组类型、转换与规则决定唯一结果？",
    evidence: "call-site key + runtime types + candidate members + conversion + selected result or binder error",
    accent: "var(--accent)",
    concepts: [
      "The Dynamic Language Runtime",
      "Numeric Type Unification",
      "Dynamic Member Overload Resolution",
      "Anonymously Calling Members of a Generic Type",
    ],
  },
  {
    id: "shape",
    label: "Shape / extension",
    question: "动态 shape 如何支持 visitor 与对象扩展，又在哪里丢失穷尽性和 schema？",
    evidence: "node/member matrix + fallback coverage + allowed operations + shape mutation replay",
    accent: "var(--warning)",
    concepts: [
      "Simplifying the Visitor Pattern",
      "Implementing Dynamic Objects",
      "DynamicObject",
      "ExpandoObject",
    ],
  },
  {
    id: "boundary",
    label: "Boundary / normalization",
    question: "foreign dynamic 对象怎样被限制、归一化并退出核心层？",
    evidence: "member allowlist + null/type/error policy + timeout/lifetime + typed DTO contract test",
    accent: "var(--success)",
    concepts: [
      "Interoperating with Dynamic Languages",
      "DynamicObject",
      "ExpandoObject",
      "The Dynamic Language Runtime",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10DynamicProgrammingRuntimeMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("binding");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Dynamic Programming 运行时图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先记录 binding，再压缩动态边界</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 binding/dispatch、shape/extension 或 boundary/normalization 视角，观察运行时证据如何覆盖本章概念。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Dynamic Programming 运行时图"
          onClick={() => setActiveId("binding")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Dynamic Programming 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Dynamic Programming runtime map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Dynamic Programming runtime map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            input → binder → rule cache → typed boundary
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            runtime type、shape、conversion、fallback 与 normalization
          </text>

          {["dynamic input", "runtime dispatch", "shape contract", "typed result"].map((stage, index) => {
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
                  stroke={index === 2 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 2 ? "1.8" : "1"}
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

          <path d="M20 410 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="435" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="458" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="482" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="510" width="520" height="132" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="536" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Dynamic boundary gate
          </text>
          <text x="40" y="559" fill="var(--text-secondary)" fontSize="11">
            bind：记录 site、runtime types、candidate members、conversion 与 restriction，再接受 result/error。
          </text>
          <text x="40" y="581" fill="var(--text-secondary)" fontSize="11">
            shape：对 node/member、fallback、allowed operations 与 mutation 做覆盖矩阵，不把 false 当业务失败。
          </text>
          <text x="40" y="603" fill="var(--text-secondary)" fontSize="11">
            boundary：foreign object 经过 allowlist、类型/null/error/lifetime 验证后，才转成 typed DTO。
          </text>
          <text x="280" y="681" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            dynamic 可以延迟选择，但不能替你消除契约、测试与资源边界
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 19-1：Dynamic 的证据路径；把运行时分派、shape 演化与 foreign boundary 归一到可测试的 typed 结果。
      </figcaption>
    </figure>
  );
}
