"use client";

import { useState } from "react";

const VIEW_W = 920;
const VIEW_H = 450;
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

// 与 fidelity-manifests.json 的 cc2e-24-refactoring 单元保持一一对应。
// 机制图把 18 个目录节点压缩到一条可操作的五步证据链中。
const OFFICIAL_NODES = [
  "第24章 重构",
  "24.1 软件进化的类型",
  "软件进化的哲学",
  "24.2 重构简介",
  "重构的理由",
  "拒绝重构的理由",
  "24.3 特定的重构",
  "数据级的重构",
  "语句级的重构",
  "子程序级重构",
  "类实现的重构",
  "类接口的重构",
  "系统级重构",
  "24.4 安全的重构",
  "不宜重构的情况",
  "24.5 重构策略",
  "推荐读物",
  "关键点",
] as const;

const NODES = [
  { label: "坏味道", detail: "可观察的改进理由", x: 92 },
  { label: "行为基线", detail: "冻结外部合同", x: 276 },
  { label: "小步变换", detail: "一次只动一个结构", x: 460 },
  { label: "测试确认", detail: "正常 / 边界 / 故障", x: 644 },
  { label: "结构复盘", detail: "接受或回退", x: 828 },
] as const;

type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "固定基线" },
  { id: "boundary", label: "恰好边界" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复重放" },
];

function scenarioState(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: 2,
      color: WARNING,
      status: "边界：只改变一个结构决定，先保留行为差异，再决定是否接受。",
      detail:
        "恰好边界必须和正常值、越界值一起重放；更短的代码不是自动的改进。",
    };
  }
  if (scenario === "fault") {
    return {
      active: 3,
      color: DANGER,
      status: "拒绝：故障在测试确认处暴露，不能把功能变化混入结构变化。",
      detail: "恢复输入、版本和环境，只保留一个变换，再定位首个偏离。",
    };
  }
  if (scenario === "repair") {
    return {
      active: 4,
      color: SUCCESS,
      status: "通过：重构后的外部行为与基线一致，复位后轨迹仍可重放。",
      detail:
        "只有行为合同、边界证据、故障拒绝和结构收益同时成立，才接受这一步。",
    };
  }
  return {
    active: 1,
    color: ACCENT,
    status: "基线：先记录输入、版本、环境和可观察输出，再开始重构。",
    detail: "没有行为基线，就无法证明结构变好而功能没有悄悄改变。",
  };
}

export function Cc2e24RefactoringMechanismLab() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);
  const selectedLabel =
    SCENARIOS.find((item) => item.id === scenario)?.label ?? "固定基线";

  function reset() {
    setScenario("baseline");
  }

  return (
    <section
      aria-label="第24章：重构专属因果实验"
      data-visual-kind="cc2e-24-refactoring-mechanism"
      data-unit-id="cc2e-24-refactoring"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第24章 · 五步重构证据链
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            结构改善必须和行为不变同时成立
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            切换一个场景，观察首个偏离落在哪个节点；最后用同一输入重放并决定接受或回退。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第24章重构实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择重构实验场景"
        >
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
            aria-label={`第24章重构五步机制图，覆盖${OFFICIAL_NODES.length}个目录节点。当前场景为${selectedLabel}。${state.status}`}
            className="mx-auto block h-auto w-full min-w-[330px] max-w-[920px]"
          >
            <text x="30" y="31" fontSize="18" fontWeight="700" fill={PRIMARY}>
              坏味道 → 行为基线 → 小步变换 → 测试确认 → 结构复盘
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              重构改变结构，不改变同一输入下的外部可观察行为
            </text>

            <path
              d="M92 188H828"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node, index) => (
              <path
                key={`link-${node.label}`}
                d={`M${node.x + 58} 188H${NODES[index + 1].x - 58}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const active = index === state.active;
              const color = active ? state.color : BORDER;
              return (
                <g key={node.label}>
                  <rect
                    x={node.x - 62}
                    y="108"
                    width="124"
                    height="160"
                    rx="14"
                    fill={SURFACE}
                    stroke={color}
                    strokeWidth={active ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="138" r="18" fill={color} />
                  <text
                    x={node.x}
                    y="143"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="190"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="220"
                    textAnchor="middle"
                    fontSize="11"
                    fill={MUTED}
                  >
                    {node.detail}
                  </text>
                  <text
                    x={node.x}
                    y="246"
                    textAnchor="middle"
                    fontSize="11"
                    fill={active ? state.color : MUTED}
                  >
                    {active ? "当前观察点" : `第 ${index + 1} 步`}
                  </text>
                </g>
              );
            })}

            <rect
              x="30"
              y="310"
              width="860"
              height="78"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="1.8"
            />
            <text
              x="50"
              y="341"
              fontSize="13"
              fontWeight="700"
              fill={state.color}
            >
              {state.status}
            </text>
            <text x="50" y="369" fontSize="11" fill={MUTED}>
              记录：输入 · 版本 · 首个偏离 · 行为输出 · 复位后的同一轨迹
            </text>

            <text x="30" y="424" fontSize="12" fontWeight="700" fill={PRIMARY}>
              接受条件
            </text>
            <text x="112" y="424" fontSize="12" fill={MUTED}>
              行为合同不变，结构更清晰，正常 / 边界 / 故障证据都可重放
            </text>
          </svg>
        </div>

        <p
          role="status"
          className="mt-4 rounded-control border border-border bg-surface px-3 py-3 text-sm leading-6 text-primary"
        >
          <span className="font-semibold" style={{ color: state.color }}>
            {state.status}
          </span>{" "}
          {state.detail}
        </p>
      </div>
    </section>
  );
}
