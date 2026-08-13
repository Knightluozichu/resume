"use client";

import { useState } from "react";

type LensId = "identity" | "ownership" | "streaming";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Architectural Overview; X-DOM Overview; Loading and Parsing; Saving and Serializing; Functional Construction; Navigating and Querying; Updating an X-DOM; Working with Values; Documents and Declarations; Names and Namespaces; Annotations; Streaming a Projection";

const LENSES: readonly Lens[] = [
  {
    id: "identity",
    label: "Identity / wire",
    question: "node 的 semantic identity 是什么，哪些信息只属于 serialization？",
    evidence: "URI + local name fixture + prefix/encoding/declaration round-trip corpus",
    accent: "var(--accent)",
    concepts: ["Architectural Overview", "Saving and Serializing", "Documents and Declarations", "Names and Namespaces"],
  },
  {
    id: "ownership",
    label: "Ownership / mutation",
    question: "谁拥有 node、reader 与 annotation，mutation 后 live query 还能否复现？",
    evidence: "parent/order/annotation snapshot + materialized axis + event trace",
    accent: "var(--warning)",
    concepts: ["X-DOM Overview", "Functional Construction", "Navigating and Querying", "Updating an X-DOM", "Annotations"],
  },
  {
    id: "streaming",
    label: "Streaming / lifetime",
    question: "全量 DOM 与 bounded subtree 的边界在哪里，partial break 如何释放资源？",
    evidence: "peak memory + reader position + malformed tail + dispose trace",
    accent: "var(--success)",
    concepts: ["Loading and Parsing", "Working with Values", "Streaming a Projection", "Architectural Overview"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10LinqToXmlBoundaryMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("identity");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">LINQ to XML 边界图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先守住 identity，再选择 DOM 或 stream</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 identity、ownership 或 streaming 视角，把 XML 树、wire 格式与资源 lifetime 变成可验证的契约。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 LINQ to XML 边界图"
          onClick={() => setActiveId("identity")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="LINQ to XML 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`LINQ to XML boundary map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>LINQ to XML boundary map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            XML bytes → tree identity → query/update → output
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            namespace URI、parent ownership、reader lifetime 与 semantic round-trip
          </text>

          {["input bytes", "X-DOM / subtree", "axes / mutation", "wire output"].map((stage, index) => {
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
            XML boundary gate
          </text>
          <text x="40" y="587" fill="var(--text-secondary)" fontSize="11">
            identity：URI + local name；prefix、whitespace 与 declaration 只在 wire contract 中单独验收。
          </text>
          <text x="40" y="609" fill="var(--text-secondary)" fontSize="11">
            ownership：mutation 前 materialize live axes，记录 parent/order/annotation 与 event 变化。
          </text>
          <text x="40" y="631" fill="var(--text-secondary)" fontSize="11">
            streaming：bounded subtree + reader owner，测 peak memory、partial break、dispose 与 malformed tail。
          </text>
          <text x="280" y="690" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            先定义 XML 语义，再决定使用 X-DOM、XmlReader 或 XmlWriter
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 10-1：LINQ to XML 的验收路径；expanded name、tree ownership 与 reader lifetime 决定结果是否可靠。
      </figcaption>
    </figure>
  );
}
