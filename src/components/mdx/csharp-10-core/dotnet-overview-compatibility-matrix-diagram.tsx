"use client";

import { useState } from "react";

type LensId = "contract" | "runtime" | "host";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  ".NET Standard; .NET Framework and .NET 6 Compatibility; Runtime and C# Language Versions; The CLR and BCL; System Types; Application Layers";

const LENSES: readonly Lens[] = [
  {
    id: "contract",
    label: "Contract / API",
    question: "这个 artifact 对哪些 TFM、consumer 和 API surface 作出承诺？",
    evidence: "TFM matrix + reference assembly + independent consumer build",
    accent: "var(--accent)",
    concepts: [".NET Standard", ".NET Framework and .NET 6 Compatibility", "System Types"],
  },
  {
    id: "runtime",
    label: "Runtime / host",
    question: "谁提供 implementation，哪个 runtime/CLR/BCL 在目标机执行？",
    evidence: "runtimeconfig/deps + host trace + clean target run",
    accent: "var(--warning)",
    concepts: ["Runtime and C# Language Versions", "The CLR and BCL", ".NET Framework and .NET 6 Compatibility"],
  },
  {
    id: "host",
    label: "App / deployment",
    question: "application model、lifecycle、RID 和 deployment 如何改变兼容声明？",
    evidence: "host lifecycle + RID assets + startup/shutdown contract",
    accent: "var(--success)",
    concepts: ["Application Layers", "Runtime and C# Language Versions", "System Types"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10DotnetOverviewCompatibilityMatrixDiagram() {
  const [activeId, setActiveId] = useState<LensId>("contract");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">.NET 兼容性验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">兼容声明必须穿过四层</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            选择 contract、runtime 或 app/deployment 视角，检查 source、API、执行和目标机证据是否齐全。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 .NET 兼容性矩阵"
          onClick={() => setActiveId("contract")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label=".NET 兼容性视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 570"
          role="img"
          aria-label={`.NET compatibility surface map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>.NET compatibility surface map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            compatibility surface：从 source 到目标机
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            source → reference/API → runtime/CLR/BCL → host/RID/deployment
          </text>

          {["source", "reference/API", "runtime", "host/RID"].map((stage, index) => {
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
            const y = 126 + row * 62;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="250"
                  height="50"
                  rx="9"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 17} cy={y + 25} r="5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 31} y={y + 30} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 338 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="363" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="386" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="410" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="438" width="520" height="72" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="463" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Release gate
          </text>
          <text x="40" y="485" fill="var(--text-secondary)" fontSize="11">
            clean consumer build + clean target run + artifact metadata
          </text>
          <text x="40" y="503" fill="var(--text-secondary)" fontSize="11">
            没有 runtime、RID 和 lifecycle 证据，就不能把“能编译”写成“兼容”。
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 5-1：.NET 兼容性不是一个版本号，而是从 API contract 到 runtime、host 与 deployment 的证据矩阵。
      </figcaption>
    </figure>
  );
}
