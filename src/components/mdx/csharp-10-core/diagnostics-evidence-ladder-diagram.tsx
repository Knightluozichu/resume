"use client";

import { useState } from "react";

type LensId = "ladder" | "thread" | "budget";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "Conditional Compilation; Debug and Trace Classes; Debugger Integration; Processes and Process Threads; StackTrace and StackFrame; Windows Event Logs; Performance Counters; The Stopwatch Class; Cross-Platform Diagnostic Tools";

const LENSES: readonly Lens[] = [
  {
    id: "ladder",
    label: "Evidence ladder",
    question: "当前症状需要哪一级最便宜且足够的证据？",
    evidence: "counter/log → bounded trace/stack → dump，记录 trigger 与停止条件",
    accent: "var(--accent)",
    concepts: ["Debug and Trace Classes", "Windows Event Logs", "Performance Counters", "Cross-Platform Diagnostic Tools"],
  },
  {
    id: "thread",
    label: "Thread / symbols",
    question: "采样中的 frame、wait、PID 与 symbols 能否归属于同一 build 和时间窗？",
    evidence: "PID + start time + thread table + repeated stacks + PDB/build hash",
    accent: "var(--warning)",
    concepts: ["Debugger Integration", "Processes and Process Threads", "StackTrace and StackFrame", "Conditional Compilation"],
  },
  {
    id: "budget",
    label: "Budget / replay",
    question: "采集开销、PII 与 artifact 大小是否有边界，修复后能否同场景复现？",
    evidence: "level/sampling/duration + redaction + checksum + before/after scenario",
    accent: "var(--success)",
    concepts: ["Conditional Compilation", "Debug and Trace Classes", "The Stopwatch Class", "Cross-Platform Diagnostic Tools"],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function Ctc10DiagnosticsEvidenceLadderDiagram() {
  const [activeId, setActiveId] = useState<LensId>("ladder");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Diagnostics 证据图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先问问题，再升级采集</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换证据阶梯、线程与符号或预算回放视角，把“很慢/卡住/崩溃”转成可复现的诊断链。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Diagnostics 证据图"
          onClick={() => setActiveId("ladder")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Diagnostics 验收视角" className="grid gap-2 md:grid-cols-3">
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
          aria-label={`Diagnostics evidence ladder. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Diagnostics evidence ladder</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            question → signal → artifact → conclusion
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            症状、时间窗、build identity、采集预算与 before/after 复现
          </text>

          {["question", "lowest-cost signal", "bounded artifact", "replay gate"].map((stage, index) => {
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
            Diagnostic gate
          </text>
          <text x="40" y="534" fill="var(--text-secondary)" fontSize="11">
            counter/log：先确认趋势与关联；trace/stack：限制 duration、sampling、PII 与 artifact 大小。
          </text>
          <text x="40" y="556" fill="var(--text-secondary)" fontSize="11">
            dump：只在 hang/crash/retention 假设需要时采集，并绑定 PID、start time、commit 与 PDB。
          </text>
          <text x="40" y="578" fill="var(--text-secondary)" fontSize="11">
            每组证据记录 UTC window、provider/tool version、checksum；修复后用相同 scenario 复放。
          </text>
          <text x="40" y="600" fill="var(--text-secondary)" fontSize="11">
            结论必须同时说明症状改变与证据改变，避免把一次 StackTrace 当成 root cause。
          </text>
          <text x="280" y="664" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            最小充分证据 + 可复现回放，才是低扰动的诊断闭环
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 13-1：Diagnostics 的证据升级路径；先限定问题与预算，再用同一 build 和负载验证因果结论。
      </figcaption>
    </figure>
  );
}
