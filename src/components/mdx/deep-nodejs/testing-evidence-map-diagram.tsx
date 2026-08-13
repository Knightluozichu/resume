"use client";

import { useState } from "react";

type LensId = "contract" | "performance" | "data";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "第10章 测试; 10.1 单元测试; 10.1.1 单元测试的意义; 10.1.2 单元测试介绍; 10.1.3 工程化与自动化; 10.1.4 小结; 10.2 性能测试; 10.2.1 基准测试; 10.2.2 压力测试; 10.2.3 基准测试驱动开发; 10.2.4 测试数据与业务数据的转换; 10.3 总结; 10.4 参考资源";

const LENSES: readonly Lens[] = [
  {
    id: "contract",
    label: "Contract / isolation",
    question: "输入、替身、异步完成和 teardown 怎样形成一个可重放契约？",
    evidence: "fixture → test double → assertion → single completion → close/cleanup",
    accent: "var(--accent)",
    concepts: [
      "第10章 测试",
      "10.1 单元测试",
      "10.1.1 单元测试的意义",
      "10.1.2 单元测试介绍",
      "10.1.3 工程化与自动化",
      "10.1.4 小结",
    ],
  },
  {
    id: "performance",
    label: "Baseline / load",
    question: "性能变化如何在固定输入和资源预算下被比较？",
    evidence: "warmup → baseline → load profile → p95/p99 + error rate + resource ceiling",
    accent: "var(--warning)",
    concepts: [
      "10.2 性能测试",
      "10.2.1 基准测试",
      "10.2.2 压力测试",
      "10.2.3 基准测试驱动开发",
    ],
  },
  {
    id: "data",
    label: "Data / recovery",
    question: "测试数据转换后怎样保留约束、脱敏、版本与恢复证据？",
    evidence: "source version → masked fixture → invariant check → replay → cleanup",
    accent: "var(--success)",
    concepts: [
      "10.2.4 测试数据与业务数据的转换",
      "10.3 总结",
      "10.4 参考资源",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function DnjTestingEvidenceMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("contract");
  const [failureMode, setFailureMode] = useState(false);
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  const reset = () => {
    setActiveId("contract");
    setFailureMode(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Testing 证据图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从样本走到可比较的结论</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 contract/isolation、baseline/load 或 data/recovery 视角，观察目录条目如何落到断言、指标和恢复证据。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label="注入测试失败模式"
            aria-pressed={failureMode}
            onClick={() => setFailureMode((current) => !current)}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              failureMode
                ? "border-warning bg-warning/10 text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureMode ? "恢复正常" : "注入失败"}
          </button>
          <button
            type="button"
            aria-label="重置 Testing 证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            重置
          </button>
        </div>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Testing 验收视角" className="grid gap-2 md:grid-cols-3">
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
          viewBox="0 0 560 820"
          role="img"
          aria-label={`Testing evidence map. Active lens: ${activeLens.label}. Failure mode: ${failureMode ? "on" : "off"}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Testing evidence map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            sample → contract → measure → replay
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            isolate、warm up、stress、convert 与 clean up
          </text>

          {["fixture", "assertion", "baseline", "recovery"].map((stage, index) => {
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
            const column = index % 3;
            const row = Math.floor(index / 3);
            const x = 20 + column * 176;
            const y = 126 + row * 44;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="168"
                  height="34"
                  rx="8"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 13} cy={y + 17} r="4.5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 24} y={y + 22} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 346 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="371" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="394" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="418" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect
            x="20"
            y="450"
            width="520"
            height="148"
            rx="10"
            fill="var(--bg)"
            stroke={failureMode ? "var(--warning)" : "var(--border)"}
            strokeWidth={failureMode ? "1.8" : "1"}
          />
          <text x="40" y="476" fill={failureMode ? "var(--warning)" : "var(--text-primary)"} fontSize="12" fontWeight="700">
            {failureMode ? "Failure mode：p99 上升且 teardown 未完成" : "Testing boundary gate"}
          </text>
          <text x="40" y="500" fill="var(--text-secondary)" fontSize="11">
            contract：输入、断言、错误与唯一完成出口必须同一条 trace。
          </text>
          <text x="40" y="524" fill="var(--text-secondary)" fontSize="11">
            performance：预热后比较 p50/p95/p99、吞吐、错误率与资源峰值。
          </text>
          <text x="40" y="548" fill="var(--text-secondary)" fontSize="11">
            data：脱敏、关系、版本和幂等约束保留，fixture 可安全删除并重放。
          </text>
          <text x="40" y="572" fill="var(--text-secondary)" fontSize="11">
            {failureMode ? "先定位首个偏离点，再修复或回滚；不要用重试掩盖确定性回归。" : "成功不是唯一证据；资源关闭与失败可解释性也要通过。"}
          </text>
          <text x="280" y="650" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            测试可以失败，但不能不可重放、不可比较或不可清理
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 10-1：测试证据图；把功能契约、性能指标、数据转换和故障恢复放入同一条可重放链。
      </figcaption>
    </figure>
  );
}
