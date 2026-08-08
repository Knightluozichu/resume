"use client";

import { useState } from "react";

const VIEW_W = 920;
const VIEW_H = 500;
const ACCENT = "var(--accent)";
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

// 这些节点让实验和第25章目录保持一一可追踪，而不是只替换一个标题。
const OFFICIAL_NODES = [
  "第25章 代码调整策略",
  "25.1 性能概述",
  "质量特性和性能",
  "性能和代码调整",
  "25.2 代码调整简介",
  "Pareto法则",
  "一些无稽之谈",
  "何时调整代码",
  "编译器优化",
  "25.3 蜜糖和哥斯拉",
  "常见的低效率之源",
  "常见操作的相对效率",
  "25.4 性能测量",
  "性能测量应当精确",
  "25.5 反复调整",
  "25.6 代码调整方法总结",
  "推荐读物",
  "算法和数据类型",
  "关键点",
] as const;

const NODES = [
  { id: "goal", label: "性能目标", detail: "阈值与负载", x: 100 },
  { id: "baseline", label: "基线测量", detail: "版本与窗口", x: 280 },
  { id: "hotspot", label: "热点定位", detail: "找到瓶颈", x: 460 },
  { id: "candidate", label: "候选调整", detail: "只改一件事", x: 640 },
  { id: "retest", label: "统计复测", detail: "接受或拒绝", x: 820 },
] as const;

type NodeId = (typeof NODES)[number]["id"];
type Scenario = "baseline" | "boundary" | "noise" | "fault";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "固定基线" },
  { id: "boundary", label: "边界负载" },
  { id: "noise", label: "噪声干扰" },
  { id: "fault", label: "故障注入" },
];

type ScenarioState = {
  active: NodeId;
  color: string;
  status: string;
  detail: string;
  decision: string;
};

function getScenarioState(scenario: Scenario): ScenarioState {
  if (scenario === "boundary") {
    return {
      active: "retest",
      color: WARNING,
      status: "边界：平均值变好，但尾部延迟越过阈值。",
      detail: "保留正常值、恰好边界和越界一步的分布；不要用一个最好值掩盖回归。",
      decision: "拒绝候选，扩大负载覆盖后再测",
    };
  }
  if (scenario === "noise") {
    return {
      active: "baseline",
      color: WARNING,
      status: "噪声：样本间波动大，基线本身还没有稳定。",
      detail: "交替运行基线与候选，固定环境与观察窗口，先估计噪声再谈收益。",
      decision: "暂不调整，先修复测量条件",
    };
  }
  if (scenario === "fault") {
    return {
      active: "candidate",
      color: DANGER,
      status: "拒绝：候选改变了正确性或一次叠加多个变量。",
      detail: "回到基线，只保留一个候选机制，再重放正常、边界和故障输入。",
      decision: "回退改动，保留首个偏离证据",
    };
  }
  return {
    active: "goal",
    color: ACCENT,
    status: "基线：先定义可接受的收益、成本和输入范围。",
    detail: "性能调整不是追逐最快一次，而是在同一合同下比较可重复的分布。",
    decision: "可以进入测量与热点定位",
  };
}

/** 第25章专属实验：从目标到热点，再用分布和复位证据裁决调整。 */
export function Cc2e25CodeTuningStrategiesLab() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = getScenarioState(scenario);
  const reset = () => setScenario("baseline");

  return (
    <section
      aria-label={`第25章代码调优策略专属实验，覆盖${OFFICIAL_NODES.length}个目录节点。${state.status}支持场景切换和重置。`}
      data-visual-kind="cc2e-25-code-tuning-strategies"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第25章 · 证据链实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            性能目标 → 基线测量 → 热点定位 → 候选调整 → 统计复测
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜哪一个节点会先偏离，再切换负载或注入故障；最后重置并用同一输入确认轨迹。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第25章代码调优策略实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-4" aria-label="选择调优实验场景">
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scenario === item.id}
              onClick={() => setScenario(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-sm transition-colors ${
                scenario === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`第25章代码调优策略五节点机制图。${state.status}${state.detail}当前决策：${state.decision}`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[920px]"
          >
            <text x="32" y="34" fontSize="18" fontWeight="700" fill={PRIMARY}>
              先证明热点，再讨论速度
            </text>
            <text x="32" y="60" fontSize="12" fill={MUTED}>
              同一输入 · 同一版本 · 同一窗口 · 报告分布而不是最好一次
            </text>

            <path
              d="M100 183H820"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node) => (
              <path
                key={`link-${node.id}`}
                d={`M${node.x + 58} 183H${node.x + 122}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const isActive = state.active === node.id;
              const nodeColor = isActive ? state.color : BORDER;
              return (
                <g key={`${node.id}-${index}`}>
                  <rect
                    x={node.x - 58}
                    y="110"
                    width="116"
                    height="146"
                    rx="14"
                    fill={SURFACE}
                    stroke={nodeColor}
                    strokeWidth={isActive ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="139" r="17" fill={nodeColor} />
                  <text
                    x={node.x}
                    y="144"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="185"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="216"
                    textAnchor="middle"
                    fontSize="11"
                    fill={MUTED}
                  >
                    {node.detail}
                  </text>
                </g>
              );
            })}

            <rect
              x="32"
              y="302"
              width="856"
              height="78"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="1.8"
            />
            <text x="52" y="333" fontSize="13" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="52" y="360" fontSize="11" fill={MUTED}>
              记录：输入 · 环境 · 首个偏离 · p50/p95 · 重置重放
            </text>

            <text x="32" y="426" fontSize="12" fontWeight="700" fill={PRIMARY}>
              当前裁决：{state.decision}
            </text>
            <text x="32" y="453" fontSize="12" fill={MUTED}>
              质量变好但性能变差时，不能用平均分抵消尾部回归。
            </text>
          </svg>
        </div>

        <div
          role="status"
          className="mt-3 rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary"
        >
          {state.detail}
        </div>
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        选择场景观察首个偏离；点击“重置实验”后，必须回到固定基线，才算完成一次可复核调整。
      </p>
    </section>
  );
}
