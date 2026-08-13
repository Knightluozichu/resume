"use client";

import { useState } from "react";

type LensId = "capability" | "adapter" | "publication";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Stream Architecture; Backing Store Streams; Stream Adapters; Compression Streams; File and Directory Operations; OS Security; Memory-Mapped Files";

const LENSES: readonly Lens[] = [
  {
    id: "capability",
    label: "Capability / transfer",
    question: "这个 Stream 支持哪些 capability，partial transfer 与 EOF 如何证明？",
    evidence: "CanRead/Write/Seek + short read/write fixture + byte/position assertions",
    accent: "var(--accent)",
    concepts: ["Stream Architecture", "Backing Store Streams"],
  },
  {
    id: "adapter",
    label: "Adapter / ownership",
    question: "buffer、encoding、compression 与 backing store 的完成和 Dispose 顺序是什么？",
    evidence: "outer-to-inner ownership stack + leaveOpen + footer/flush trace",
    accent: "var(--warning)",
    concepts: ["Stream Adapters", "Compression Streams", "Backing Store Streams"],
  },
  {
    id: "publication",
    label: "Publication / safety",
    question: "文件、路径和 mapping 怎样让 reader 只看到完整版本并守住安全边界？",
    evidence: "same-volume temp + replace race + permission/symlink + view lifetime matrix",
    accent: "var(--success)",
    concepts: ["File and Directory Operations", "OS Security", "Memory-Mapped Files"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10StreamsIoBoundaryMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("capability");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Streams &amp; I/O 边界图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先写 capability，再交付完整 artifact</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换传输能力、adapter ownership 或安全发布视角，把 Read、Dispose、path 与 mapping 变成可验收契约。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Streams and I/O 边界图"
          onClick={() => setActiveId("capability")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Streams and I/O 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Streams and I/O boundary map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Streams and I/O boundary map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            bytes → adapter stack → owned resource → published version
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            partial transfer、buffer/footer、path identity 与 atomic visibility
          </text>

          {["source capability", "adapter stack", "flush / close", "reader view"].map((stage, index) => {
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

          <path d="M20 332 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="357" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="380" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="404" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="432" width="520" height="150" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="458" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            I/O boundary gate
          </text>
          <text x="40" y="481" fill="var(--text-secondary)" fontSize="11">
            read/write：用 capability、partial transfer、EOF、cancel 与 size limit 定义完成条件。
          </text>
          <text x="40" y="503" fill="var(--text-secondary)" fontSize="11">
            adapter：outer-to-inner 完成 encoder、buffer、compression footer，再决定 leaveOpen。
          </text>
          <text x="40" y="525" fill="var(--text-secondary)" fontSize="11">
            publish：同 volume temp → flush/close → replace；不要用 Exists 检查冒充安全或原子性。
          </text>
          <text x="40" y="547" fill="var(--text-secondary)" fontSize="11">
            mapping：记录 offset/length/version/owner，区分可见性、持久化、原子性与进程同步。
          </text>
          <text x="280" y="624" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            只有 capability、ownership 与 publication 都有证据，I/O 才可发布
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 15-1：Streams and I/O 的边界验收路径；一次 Read、一次 Dispose 或一次 Exists 都不能替代完整契约。
      </figcaption>
    </figure>
  );
}
