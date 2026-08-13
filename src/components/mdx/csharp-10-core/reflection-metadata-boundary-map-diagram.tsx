"use client";

import { useState } from "react";

type LensId = "binding" | "metadata" | "emit";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Reflecting and Activating Types; Reflecting and Invoking Members; Reflecting Assemblies; Working with Attributes; Dynamic Code Generation; Emitting Assemblies and Types; Emitting Generic Methods and Types; Parsing IL";

const LENSES: readonly Lens[] = [
  {
    id: "binding",
    label: "Binding / execution",
    question: "名字只是候选，怎样用 identity、signature 与 visibility 绑定唯一目标？",
    evidence: "declaring type + generic arity + parameter types + overload/error propagation matrix",
    accent: "var(--accent)",
    concepts: ["Reflecting and Activating Types", "Reflecting and Invoking Members"],
  },
  {
    id: "metadata",
    label: "Metadata / preservation",
    question: "哪些读取路径只看 metadata，哪些会实例化 attribute 或执行 getter？",
    evidence: "metadata-only inspection + CustomAttributeData + trim/AOT published artifact test",
    accent: "var(--warning)",
    concepts: ["Reflecting Assemblies", "Working with Attributes", "Reflecting and Activating Types"],
  },
  {
    id: "emit",
    label: "Emit / IL proof",
    question: "动态代码的 signature、stack、branch、token 与 generic context 是否一致？",
    evidence: "capability fallback + stack/type ledger + operand bounds + original module resolution",
    accent: "var(--success)",
    concepts: ["Dynamic Code Generation", "Emitting Assemblies and Types", "Emitting Generic Methods and Types", "Parsing IL"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10ReflectionMetadataBoundaryMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("binding");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Reflection &amp; Metadata 边界图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先做 metadata proof，再允许执行</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 binding、metadata preservation 或 emit/IL proof 视角，区分读取结构、保留成员和执行代码的证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Reflection and Metadata 边界图"
          onClick={() => setActiveId("binding")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Reflection and Metadata 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Reflection and Metadata boundary map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Reflection and Metadata boundary map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            artifact → metadata → binding → execution
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            identity、signature、preservation、capability 与 IL invariants
          </text>

          {["PE / metadata", "candidate set", "validated target", "runtime code"].map((stage, index) => {
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

          <path d="M20 385 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="410" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="433" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="457" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="485" width="520" height="138" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="511" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Reflection boundary gate
          </text>
          <text x="40" y="534" fill="var(--text-secondary)" fontSize="11">
            binding：用 declaring type、generic arity、parameter types、visibility 选择唯一 member。
          </text>
          <text x="40" y="556" fill="var(--text-secondary)" fontSize="11">
            inspect：CustomAttributeData/metadata context 只读；activation、getter、Invoke 才跨入执行。
          </text>
          <text x="40" y="578" fill="var(--text-secondary)" fontSize="11">
            preserve：trim/AOT 用 annotation、descriptor 或 source generation，并测试真实发布产物。
          </text>
          <text x="40" y="600" fill="var(--text-secondary)" fontSize="11">
            emit：每条路径验证 stack/type、branch、operand bounds、token module 与 generic context。
          </text>
          <text x="280" y="664" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            读取 metadata 不等于安全执行，能生成代码也不等于完成验证
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 18-1：Reflection and Metadata 的安全边界；binding、preservation 与 IL proof 必须在执行前留下证据。
      </figcaption>
    </figure>
  );
}
