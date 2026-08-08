"use client";

import { useState } from "react";

const VIEW_W = 900;
const VIEW_H = 470;
const ACCENT = "var(--accent)";
const MUTED = "var(--text-secondary)";
const PRIMARY = "var(--text-primary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

const OFFICIAL_NODES = [
  "第26章 代码调整方法",
  "26.1 逻辑",
  "在知道答案后停止判断",
  "按照出现频率来调整判断顺序",
  "相似逻辑结构之间的性能比较",
  "用查找表替代复杂表达式",
  "使用惰性求值",
  "26.2 循环",
  "将判断外提（Unswitching）",
  "合并循环",
  "展开",
  "尽可能减少再循环内部做的工作",
  "哨兵值",
  "把最忙的循环放在最内层",
  "削减强度",
  "26.3 数据变换",
  "使用整型数而不是浮点数",
  "数组维度尽可能少",
  "尽可能减少数组引用",
  "使用辅助索引",
  "使用缓存机制",
  "26.4 表达式",
  "利用代数恒等式",
  "削弱运算强度",
  "编译时初始化",
  "小心系统函数",
  "使用正确的常量类型",
  "预先算出结果",
  "删除公共子表达式",
  "26.5 子程序",
  "将函数重写为内联",
  "26.6 用低级语言重写代码",
  "26.7 变得越多，事情反而更没变",
  "推荐读物",
  "关键点",
] as const;

const NODES = [
  { id: "hotspot", label: "已证热点", detail: "先定位，再动手", x: 100 },
  { id: "choice", label: "技术选择", detail: "只改一个机制", x: 275 },
  { id: "change", label: "单点改写", detail: "保留正确性", x: 450 },
  { id: "benchmark", label: "基准复测", detail: "比较分布", x: 625 },
  { id: "portability", label: "可移植性审查", detail: "决定接受或拒绝", x: 800 },
] as const;

type Focus = (typeof NODES)[number]["id"];
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "固定基线" },
  { id: "boundary", label: "边界输入" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复重放" },
];

type ScenarioState = {
  active: Focus;
  color: string;
  status: string;
  detail: string;
};

function scenarioState(scenario: Scenario): ScenarioState {
  if (scenario === "boundary") {
    return {
      active: "benchmark",
      color: WARNING,
      status: "边界：候选更快，但尾部延迟上升；先保留分布，不接受单次最好值。",
      detail: "把正常值、恰好边界和越界一步放进同一观察窗口。",
    };
  }
  if (scenario === "fault") {
    return {
      active: "change",
      color: DANGER,
      status: "拒绝：改动叠加或破坏别名/边界，首个偏离无法归因。",
      detail: "恢复到基线，只保留一个变量，再重新执行正确性检查。",
    };
  }
  if (scenario === "repair") {
    return {
      active: "portability",
      color: SUCCESS,
      status: "通过：候选在固定输入上满足合同，分布改善，复位后轨迹一致。",
      detail: "接受条件同时包含正确性、可读性、可移植性和重放证据。",
    };
  }
  return {
    active: "hotspot",
    color: ACCENT,
    status: "基线：先固定输入、版本、环境和测量窗口，再选择一个热点。",
    detail: "没有基线，就无法区分优化收益、噪声和回归。",
  };
}

/** 第26章专属实验：把代码调优收束为单点改写、分布复测与复位重放。 */
export function Cc2e26CodeTuningTechniquesLab({
  focus = "hotspot",
}: {
  focus?: Focus;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);
  const focusedIndex = Math.max(
    0,
    NODES.findIndex((node) => node.id === focus),
  );

  const reset = () => setScenario("baseline");

  return (
    <section
      aria-label="第26章代码调优技术专属实验"
      data-visual-kind="cc2e-26-code-tuning-techniques"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第26章 · 单点调优实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            已证热点 → 技术选择 → 单点改写 → 基准复测 → 可移植性审查
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测哪一个节点会先偏离，再切换边界或故障；最后用同一输入重放并决定接受或拒绝。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第26章代码调优实验"
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
            aria-label={`代码调优五节点机制图，覆盖${OFFICIAL_NODES.length}个目录节点。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${state.status}支持场景切换和重置。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[900px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              调优不是“改得越多越快”
            </text>
            <text x="30" y="57" fontSize="12" fill={MUTED}>
              先锁定基线，再用单点证据判断收益、回归和可移植性风险
            </text>

            <path
              d="M100 177H800"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node) => (
              <path
                key={`link-${node.id}`}
                d={`M${node.x + 58} 177H${node.x + 117}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const isFocused = focusedIndex === index;
              const isActive = state.active === node.id;
              const nodeColor = isActive ? state.color : isFocused ? ACCENT : BORDER;
              return (
                <g key={`${node.id}-${index}`}>
                  <rect
                    x={node.x - 58}
                    y="106"
                    width="116"
                    height="142"
                    rx="14"
                    fill={SURFACE}
                    stroke={nodeColor}
                    strokeWidth={isFocused || isActive ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="135" r="17" fill={nodeColor} />
                  <text
                    x={node.x}
                    y="140"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="182"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="211"
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
              x="30"
              y="292"
              width="840"
              height="76"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="1.8"
            />
            <text x="50" y="322" fontSize="13" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="50" y="349" fontSize="11" fill={MUTED}>
              记录：输入 · 环境 · 首个偏离 · 分布 · 复位后的同一轨迹
            </text>

            <text x="30" y="417" fontSize="12" fontWeight="700" fill={PRIMARY}>
              审查问题
            </text>
            <text x="30" y="442" fontSize="12" fill={MUTED}>
              候选真的更快吗？正确性是否保持？换编译器或数据布局后还成立吗？
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
        红色表示证据链被拒绝；修复的标准是正确性、测量分布、可移植性和复位后的重放都能被复算。
      </p>
    </section>
  );
}
