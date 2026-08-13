"use client";

import { useState } from "react";

type LensId = "identity" | "isolation" | "lifecycle";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "What's in an Assembly; Strong Names and Assembly Signing; Resources and Satellite Assemblies; Loading, Resolving, and Isolating Assemblies; Assembly Load Contexts; Writing a Plug-In System";

const LENSES: readonly Lens[] = [
  {
    id: "identity",
    label: "Identity / trust",
    question: "manifest、metadata、签名与 resource culture 分别证明什么？",
    evidence: "AssemblyQualifiedName + public key/token + resource fallback + artifact inventory",
    accent: "var(--accent)",
    concepts: ["What's in an Assembly", "Strong Names and Assembly Signing", "Resources and Satellite Assemblies"],
  },
  {
    id: "isolation",
    label: "Dependency isolation",
    question: "host contract、plugin implementation 与 native dependency 由谁共享或私有加载？",
    evidence: "ALC graph + resolver path allowlist + two-version cast/load matrix",
    accent: "var(--warning)",
    concepts: ["Loading, Resolving, and Isolating Assemblies", "Assembly Load Contexts", "Writing a Plug-In System"],
  },
  {
    id: "lifecycle",
    label: "Plugin lifecycle",
    question: "stop、dispose、退订与 unload 是否清除了所有跨 context root？",
    evidence: "task/event/delegate/native callback ledger + WeakReference + unload replay",
    accent: "var(--success)",
    concepts: ["Assembly Load Contexts", "Writing a Plug-In System", "Loading, Resolving, and Isolating Assemblies"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10AssembliesIsolationMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("identity");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Assemblies 隔离图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先定义 identity，再管理依赖与卸载</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 identity/trust、dependency isolation 或 plugin lifecycle 视角，观察程序集从文件到可回收 context 的边界。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Assemblies 隔离图"
          onClick={() => setActiveId("identity")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Assemblies 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Assemblies isolation map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Assemblies isolation map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            artifact → identity → load context → plugin lifecycle
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            manifest、contract sharing、resolver boundary、stop/dispose/unload
          </text>

          {["assembly artifact", "host contract", "private deps", "running plugin"].map((stage, index) => {
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

          <path d="M20 279 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="304" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="327" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="351" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="379" width="520" height="164" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="405" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Assembly boundary gate
          </text>
          <text x="40" y="428" fill="var(--text-secondary)" fontSize="11">
            identity：区分 assembly name/version/key、namespace/type name、publisher trust 与 sandbox。
          </text>
          <text x="40" y="450" fill="var(--text-secondary)" fontSize="11">
            isolation：Default 共享 host contract，custom ALC 私有 implementation，并限制 resolver root。
          </text>
          <text x="40" y="472" fill="var(--text-secondary)" fontSize="11">
            lifecycle：先停调用、取消并 await work、退订 events、清 cache，再 Dispose 与 Unload。
          </text>
          <text x="40" y="494" fill="var(--text-secondary)" fontSize="11">
            unload：用 WeakReference/GC 只做测试证据；不可信插件需 process/container，而非只靠 ALC。
          </text>
          <text x="40" y="516" fill="var(--text-secondary)" fontSize="11">
            resources：culture fallback 与 contract version 也属于可回归的 artifact inventory。
          </text>
          <text x="280" y="584" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            加载成功不等于类型兼容、依赖隔离或安全卸载
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 17-1：Assemblies 的 identity 与隔离验收路径；contract、dependency、root 和权限边界必须分别验证。
      </figcaption>
    </figure>
  );
}
