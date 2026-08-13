"use client";

import { useState } from "react";

type ScenarioId = "wrong-value" | "stuck-work" | "retained-resource" | "boundary-fault";

type Scenario = {
  id: ScenarioId;
  label: string;
  symptom: string;
  firstViolation: string;
  close: string;
  transfer: string;
  accent: string;
  layerEvidence: readonly string[];
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "wrong-value",
    label: "wrong value",
    symptom: "结果错了：先冻结输入、模型和 identity",
    firstViolation: "Model semantics gate",
    close: "用 value diff、equality、schema 和 version fixture 证明错误消失。",
    transfer: "不要先调并行度；先证明 domain invariant 与数据边界。",
    accent: "var(--accent)",
    layerEvidence: ["invariant / identity", "operation input", "value diff", "schema / version"],
  },
  {
    id: "stuck-work",
    label: "stuck work",
    symptom: "工作卡住：先固定 timeline、capacity 和 cancellation",
    firstViolation: "Operation ownership timeline",
    close: "用 trace、stack、queue depth 和 cancel/drain 证据闭合生命周期。",
    transfer: "Task 不是 thread；超时、重试与 shutdown 必须有明确 owner。",
    accent: "var(--warning)",
    layerEvidence: ["work contract", "owner / cancel", "timeline / stack", "capacity / timeout"],
  },
  {
    id: "retained-resource",
    label: "retained resource",
    symptom: "内存或句柄增长：先区分 reachability 与 deterministic ownership",
    firstViolation: "Operation ownership timeline",
    close: "用 heap root、lease counter、Dispose 和 unload WeakReference 验证回收。",
    transfer: "GC 只能回收不可达对象；stream、buffer、plugin 仍需 owner。",
    accent: "var(--success)",
    layerEvidence: ["object graph", "resource owner", "root path", "lease / unload"],
  },
  {
    id: "boundary-fault",
    label: "boundary fault",
    symptom: "边界失败：先核对 bytes、ABI、limits、nonce 和 shutdown",
    firstViolation: "Integrated failure matrix",
    close: "用 invalid、near-miss、race、exhaustion 和 shutdown case 验证拒绝策略。",
    transfer: "外部输入必须有 limit/version；优化必须有 baseline 与最坏规模证据。",
    accent: "var(--danger)",
    layerEvidence: ["contract / limit", "boundary owner", "first failure", "reject / recover"],
  },
];

const REVIEW_LAYERS = [
  { label: "Model", detail: "value + identity" },
  { label: "Operation", detail: "owner + completion" },
  { label: "Inspection", detail: "evidence + identity" },
  { label: "Boundary", detail: "limit + version" },
] as const;

const REVIEW_CONCEPTS =
  "cross-chapter causal trace; model semantics gate; operation ownership timeline; runtime binding gate; integrated failure matrix";

export function CtcFinalReviewFailureMatrixDiagram() {
  const [activeId, setActiveId] = useState<ScenarioId>("wrong-value");
  const active = SCENARIOS.find((scenario) => scenario.id === activeId) ?? SCENARIOS[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">跨章节迁移验收图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从症状追到首个违约点</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            选择一种故障，再沿 Model、Operation、Inspection、Boundary 四层留下可复核证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置跨章节故障矩阵"
          onClick={() => setActiveId("wrong-value")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="跨章节故障类型" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((scenario) => {
            const selected = scenario.id === activeId;
            return (
              <button
                key={scenario.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveId(scenario.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 560 620"
          role="img"
          aria-label={`Cross-chapter failure matrix. Active scenario: ${active.label}. Review concepts: ${REVIEW_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Cross-chapter failure matrix</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            症状 → 首个违约点 → 证据闭环
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            cross-chapter causal trace：不要按章节名猜根因
          </text>

          <rect x="20" y="68" width="520" height="48" rx="10" fill="var(--bg)" stroke={active.accent} strokeWidth="1.8" />
          <circle cx="40" cy="92" r="6" fill={active.accent} />
          <text x="55" y="89" fill={active.accent} fontSize="12" fontWeight="700">
            Active symptom
          </text>
          <text x="55" y="106" fill="var(--text-primary)" fontSize="11">
            {active.symptom}
          </text>

          {REVIEW_LAYERS.map((layer, index) => {
            const x = 20 + index * 135;
            const emphasis = index === (activeId === "wrong-value" ? 0 : activeId === "stuck-work" || activeId === "retained-resource" ? 1 : 3);
            return (
              <g key={layer.label}>
                <rect
                  x={x}
                  y="144"
                  width="115"
                  height="96"
                  rx="10"
                  fill={emphasis ? active.accent : "var(--bg)"}
                  fillOpacity={emphasis ? "0.1" : "1"}
                  stroke={emphasis ? active.accent : "var(--border)"}
                  strokeWidth={emphasis ? "1.8" : "1"}
                />
                <text x={x + 12} y="170" fill={emphasis ? active.accent : "var(--text-primary)"} fontSize="13" fontWeight="700">
                  {layer.label}
                </text>
                <text x={x + 12} y="194" fill="var(--text-secondary)" fontSize="11">
                  {layer.detail}
                </text>
                <text x={x + 12} y="218" fill={emphasis ? "var(--text-primary)" : "var(--text-secondary)"} fontSize="11">
                  {active.layerEvidence[index]}
                </text>
                {index < REVIEW_LAYERS.length - 1 && (
                  <path d={`M${x + 119} 192 H${x + 131}`} stroke="var(--text-secondary)" strokeWidth="1.5" />
                )}
              </g>
            );
          })}

          <path d="M20 270 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="294" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Failure matrix checkpoints
          </text>

          {[
            ["1", "freeze", "input + version"],
            ["2", "locate", "first deviation"],
            ["3", "assign", "owner + limit"],
            ["4", "close", "success + fault"],
          ].map(([number, label, detail], index) => {
            const x = 20 + index * 135;
            return (
              <g key={number}>
                <rect x={x} y="314" width="115" height="90" rx="10" fill="var(--bg)" stroke={index === 1 ? active.accent : "var(--border)"} strokeWidth={index === 1 ? "1.8" : "1"} />
                <circle cx={x + 19} cy="335" r="9" fill={index === 1 ? active.accent : "var(--border)"} />
                <text x={x + 19} y="339" textAnchor="middle" fill="var(--bg)" fontSize="11" fontWeight="700">
                  {number}
                </text>
                <text x={x + 12} y="367" fill="var(--text-primary)" fontSize="12" fontWeight="700">
                  {label}
                </text>
                <text x={x + 12} y="388" fill="var(--text-secondary)" fontSize="11">
                  {detail}
                </text>
              </g>
            );
          })}

          <path d="M20 438 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="462" textAnchor="middle" fill={active.accent} fontSize="12" fontWeight="700">
            首个违约点：{active.firstViolation}
          </text>
          <text x="280" y="486" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {active.close}
          </text>
          <text x="280" y="510" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {active.transfer}
          </text>
          <text x="280" y="548" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            transfer check
          </text>
          <text x="280" y="570" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            解释 → 实现 → 诊断 → 迁移，四种交付都能复现同一结论
          </text>
          <text x="280" y="592" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            通过成功、失败、取消、耗尽与 shutdown 路径才算关门
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 26-1：总复习的验收闭环；先按症状分类，再找到首个违约点，最后用成功与故障证据共同关门。
      </figcaption>
    </figure>
  );
}
