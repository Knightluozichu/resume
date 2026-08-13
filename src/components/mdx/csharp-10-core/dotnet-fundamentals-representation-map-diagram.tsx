"use client";

import { useState } from "react";

type LensId = "representation" | "roundtrip" | "collection";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "String and Text Handling; Dates and Times; Formatting and Parsing; Globalization; Working with Numbers; Enums; The Guid Struct; Equality Comparison; Order Comparison; Utility Classes";

const LENSES: readonly Lens[] = [
  {
    id: "representation",
    label: "Representation / unit",
    question: "这个值在 memory、display、wire 和 storage 中分别是什么表示？",
    evidence: "code unit/scalar + instant/zone + range/precision table",
    accent: "var(--accent)",
    concepts: ["String and Text Handling", "Dates and Times", "Working with Numbers", "The Guid Struct"],
  },
  {
    id: "roundtrip",
    label: "Culture / round-trip",
    question: "显示可以变化，但 machine wire 如何在不同 culture 和版本中稳定往返？",
    evidence: "explicit provider + exact grammar + golden corpus",
    accent: "var(--warning)",
    concepts: ["Formatting and Parsing", "Globalization", "Dates and Times", "String and Text Handling"],
  },
  {
    id: "collection",
    label: "Equality / ordering",
    question: "Equals、hash、Compare 与 domain identity 能否让 collection 行为稳定？",
    evidence: "algebra properties + comparer + mutation/duplicate tests",
    accent: "var(--success)",
    concepts: ["Enums", "The Guid Struct", "Equality Comparison", "Order Comparison", "Utility Classes"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10DotnetFundamentalsRepresentationMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("representation");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">BCL 表示验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先定义表示，再调用 API</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            选择表示、往返或 collection 视角，检查文本、时间、数值与 identity 的隐含契约。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 .NET Fundamentals 表示图"
          onClick={() => setActiveId("representation")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label=".NET Fundamentals 表示视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 730"
          role="img"
          aria-label={`.NET Fundamentals representation map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>.NET Fundamentals representation map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            Representation contract：同一个 value，四种边界
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            memory → display → wire → collection/storage behavior
          </text>

          {["memory", "display", "wire", "collection"].map((stage, index) => {
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
            const y = 126 + row * 58;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="46"
                  rx="9"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
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

          <rect x="20" y="538" width="520" height="104" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="564" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Round-trip gate
          </text>
          <text x="40" y="587" fill="var(--text-secondary)" fontSize="11">
            canonical parse → explicit format → compare original/value semantics
          </text>
          <text x="40" y="608" fill="var(--text-secondary)" fontSize="11">
            golden corpus：culture、zone、precision、unknown、duplicate 与 mutation
          </text>
          <text x="40" y="629" fill="var(--text-secondary)" fontSize="11">
            display 可以变化，但 wire、identity、hash 和 order 必须有明确契约。
          </text>
          <text x="280" y="685" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            先写 representation contract，再决定使用哪一个 BCL utility
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 6-1：.NET Fundamentals 的核心验收路径；同一 value 在文本、时间、wire 和 collection 边界必须保留可验证语义。
      </figcaption>
    </figure>
  );
}
