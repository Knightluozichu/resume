"use client";

import { useState } from "react";

const OFFICIAL_NODES = [
  "第7章 高质量的子程序",
  "7.1 创建子程序的正当理由",
  "似乎过于简单而没必要写成子程序的操作",
  "总结：创建子程序的理由",
  "7.2 在子程序层上设计",
  "7.3 好的子程序名字",
  "7.4 子程序可以写多长",
  "7.5 如何使用子程序参数",
  "7.6 使用函数时要特别考虑的问题",
  "什么时候使用函数，什么时候使用过程",
  "设置函数的返回值",
  "7.7 宏子程序和内联子程序",
  "宏子程序在使用上的限制",
  "内联子程序",
  "关键点",
] as const;

const STAGES = [
  { id: "intent", label: "调用意图", evidence: "动作、对象与单位" },
  { id: "precondition", label: "前置条件", evidence: "输入和状态可检查" },
  { id: "responsibility", label: "单一职责", evidence: "变化理由不混合" },
  { id: "postcondition", label: "后置条件", evidence: "结果与副作用可复核" },
  { id: "failure", label: "失败边界", evidence: "错误语义可处理" },
] as const;

type StageId = (typeof STAGES)[number]["id"];

export function Cc2e07HighQualityRoutinesContractLab({
  focus = "intent",
}: {
  focus?: StageId;
}) {
  const initialIndex = Math.max(
    0,
    STAGES.findIndex((stage) => stage.id === focus),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [faultInjected, setFaultInjected] = useState(false);
  const active = STAGES[activeIndex] ?? STAGES[0];
  const reset = () => {
    setActiveIndex(initialIndex);
    setFaultInjected(false);
  };

  return (
    <section
      aria-label="子程序合同机制实验"
      data-visual-kind="cc2e-07-routine-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            第7章 · 调用边界的可复核合同
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary">
            子程序合同压缩器
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择合同节点，再注入“错误语义不清”的故障，观察调用者为什么必须停下。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置子程序合同实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-2 sm:grid-cols-5"
          aria-label="选择合同节点"
        >
          {STAGES.map((stage, index) => (
            <button
              key={stage.id}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`min-h-11 min-w-0 rounded-control border px-2 py-2 text-left text-xs transition-colors ${
                activeIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">{stage.label}</span>
              <span className="mt-1 block truncate">{stage.evidence}</span>
            </button>
          ))}
        </div>

        <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border bg-surface px-3 py-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={faultInjected}
            onChange={(event) => setFaultInjected(event.target.checked)}
            className="h-5 w-5 shrink-0 accent-accent"
          />
          <span>注入故障：把错误返回压成没有上下文的 false</span>
        </label>

        <div className="mt-5 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox="0 0 760 430"
            role="img"
            aria-label={`子程序合同五段机制图。当前节点是${active.label}。${faultInjected ? "合同被拒绝。" : "合同闭合。"}`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[760px]"
          >
            <defs>
              <marker
                id="cc2e-routine-arrow"
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--accent)" />
              </marker>
            </defs>
            <text
              x="24"
              y="30"
              fontSize="18"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              子程序合同：意图 → 入口 → 职责 → 结果 → 失败
            </text>
            <text x="24" y="53" fontSize="12" fill="var(--text-secondary)">
              高质量不是“短函数”标签，而是让调用者能在边界外完成可靠推理
            </text>
            <line
              x1="102"
              y1="166"
              x2="702"
              y2="166"
              stroke="var(--border)"
              strokeWidth="3"
            />
            {STAGES.map((stage, index) => {
              const x = 102 + index * 150;
              const selected = index === activeIndex;
              const blocked = faultInjected && stage.id === "failure";
              return (
                <g key={stage.id}>
                  {index < STAGES.length - 1 ? (
                    <line
                      x1={x + 24}
                      y1="166"
                      x2={x + 122}
                      y2="166"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      markerEnd="url(#cc2e-routine-arrow)"
                    />
                  ) : null}
                  <circle
                    cx={x}
                    cy="166"
                    r={selected ? 19 : 14}
                    fill={
                      blocked
                        ? "var(--danger)"
                        : selected
                          ? "var(--accent)"
                          : "var(--bg)"
                    }
                    stroke={blocked ? "var(--danger)" : "var(--accent)"}
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y="171"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={
                      selected || blocked ? "var(--bg)" : "var(--text-primary)"
                    }
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y="211"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {stage.label}
                  </text>
                  <text
                    x={x}
                    y="232"
                    textAnchor="middle"
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    {stage.evidence}
                  </text>
                </g>
              );
            })}
            <rect
              x="24"
              y="266"
              width="712"
              height="82"
              rx="12"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <text
              x="44"
              y="293"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              当前检查点：{active.label}
            </text>
            <text x="44" y="319" fontSize="12" fill="var(--text-secondary)">
              选择节点查看它应留下的证据；实现细节留在合同边界之后。
            </text>
            <text
              x="44"
              y="340"
              fontSize="11"
              fill={faultInjected ? "var(--danger)" : "var(--success)"}
            >
              {faultInjected
                ? "首个偏离：失败边界没有告诉调用者如何处理"
                : "证据：名称、输入、职责与结果可以分别复核"}
            </text>
            <rect
              x="24"
              y="370"
              width="712"
              height="38"
              rx="10"
              fill="var(--bg)"
              stroke={faultInjected ? "var(--danger)" : "var(--success)"}
              strokeWidth="1.5"
              strokeDasharray={faultInjected ? "6 4" : undefined}
            />
            <text
              x="44"
              y="395"
              fontSize="12"
              fontWeight="700"
              fill={faultInjected ? "var(--danger)" : "var(--success)"}
            >
              {faultInjected
                ? "拒绝调用：补全错误语义或恢复到同一基线"
                : "可交接：调用者不需要阅读实现即可决定下一步"}
            </text>
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <div
            role="status"
            className={`rounded-control border px-3 py-3 text-sm ${faultInjected ? "border-danger/50 text-danger" : "border-success/50 text-success"}`}
          >
            {faultInjected
              ? "合同拒绝：错误语义不可处理，不能安全继续。"
              : `合同闭合：${active.label}的证据已可交给调用者。`}
          </div>
          <span className="rounded-control border border-border bg-surface px-3 py-3 text-xs text-secondary">
            目录节点 {OFFICIAL_NODES.length}/15
          </span>
        </div>

        <details className="mt-4 rounded-control border border-border bg-surface p-3 text-sm text-secondary">
          <summary className="cursor-pointer font-semibold text-primary">
            展开本章目录检查点
          </summary>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {OFFICIAL_NODES.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
