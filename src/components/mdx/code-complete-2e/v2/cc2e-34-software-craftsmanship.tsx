"use client";

import { useState } from "react";

const VIEW_W = 900;
const VIEW_H = 470;
const ACCENT = "var(--accent)";
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

type Focus = "complexity" | "language" | "experiment" | "judgment";
type Scenario = "baseline" | "context" | "fault" | "repair";

const STAGES = [
  { id: "principle", label: "原则", detail: "可复用的方向" },
  { id: "context", label: "情境", detail: "约束与人" },
  { id: "experiment", label: "试验", detail: "最小可证据" },
  { id: "judgment", label: "判断", detail: "接受或重审" },
] as const;

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "稳定基线" },
  { id: "context", label: "换一个情境" },
  { id: "fault", label: "注入误区" },
  { id: "repair", label: "重审后通过" },
];

const FOCUS_LABEL: Record<Focus, string> = {
  complexity: "克服复杂性",
  language: "问题域语言",
  experiment: "反复试验",
  judgment: "折中判断",
};

type ScenarioState = {
  active: (typeof STAGES)[number]["id"];
  color: string;
  code: string;
  status: string;
};

function scenarioState(scenario: Scenario): ScenarioState {
  if (scenario === "context") {
    return {
      active: "context",
      color: WARNING,
      code: "规则 + 新约束 + 可观察结果",
      status: "情境改变：原则仍提供方向，但约束决定是否需要调整实现。",
    };
  }
  if (scenario === "fault") {
    return {
      active: "judgment",
      color: DANGER,
      code: "固定规则 → 忽略反例 → 增加例外",
      status: "拒绝：只堆例外而不重审模型，决策已失去可解释性。",
    };
  }
  if (scenario === "repair") {
    return {
      active: "experiment",
      color: SUCCESS,
      code: "原则 + 情境 + 小实验 → 可交接证据",
      status: "通过：保留约束、记录反例，并用同一输入重放修复结果。",
    };
  }
  return {
    active: "principle",
    color: ACCENT,
    code: "原则 + 情境 + 试验 + 折中",
    status: "基线：先用原则缩小搜索空间，再让情境与证据约束决定。",
  };
}

/** 第34章专属实验：把软件工艺从口号变成可重放的决策证据链。 */
export function Cc2e34SoftwareCraftsmanshipLab({
  focus = "complexity",
}: {
  focus?: Focus;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);
  const focusLabel = FOCUS_LABEL[focus];

  const reset = () => setScenario("baseline");

  return (
    <section
      aria-label="第34章软件工艺决策实验"
      data-visual-kind="cc2e-34-software-craftsmanship-decision-chain"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第34章 · 软件工艺决策实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            原则 → 情境 → 试验 → 判断
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜改变情境后哪一段会先变化，再切换样本；这里的状态是教学模型，不是生产性能评分。
          </p>
        </div>
        <span className="rounded-control border border-border px-3 py-2 text-xs text-secondary">
          当前焦点：{focusLabel}
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-4" aria-label="选择实验情境">
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

        <div
          className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3"
          aria-label="软件工艺四阶段因果图"
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`软件工艺决策链：原则、情境、试验、判断。当前为${SCENARIOS.find((item) => item.id === scenario)?.label}。${state.status}`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[900px]"
          >
            <text x="32" y="34" fontSize="18" fontWeight="700" fill={PRIMARY}>
              让规则接受情境和证据的检验
            </text>
            <text x="32" y="60" fontSize="13" fill={MUTED}>
              任何原则都只是起点；反例出现时，重审模型而不是盲目增加例外
            </text>

            <path
              d="M118 194H782"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {STAGES.slice(0, -1).map((stage, index) => {
              const x = 118 + index * 221;
              return (
                <path
                  key={`link-${stage.id}`}
                  d={`M${x + 62} 194H${x + 159}`}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="2"
                />
              );
            })}

            {STAGES.map((stage, index) => {
              const x = 118 + index * 221;
              const selected = stage.id === state.active;
              const focused =
                (focus === "complexity" && stage.id === "principle") ||
                (focus === "language" && stage.id === "context") ||
                (focus === "experiment" && stage.id === "experiment") ||
                (focus === "judgment" && stage.id === "judgment");
              const color = selected ? state.color : focused ? ACCENT : BORDER;
              return (
                <g key={stage.id}>
                  <rect
                    x={x - 62}
                    y="112"
                    width="124"
                    height="164"
                    rx="14"
                    fill={SURFACE}
                    stroke={color}
                    strokeWidth={selected || focused ? 3 : 1.5}
                  />
                  <circle cx={x} cy="144" r="18" fill={color} />
                  <text
                    x={x}
                    y="150"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={SURFACE}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y="205"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {stage.label}
                  </text>
                  <text
                    x={x}
                    y="229"
                    textAnchor="middle"
                    fontSize="12"
                    fill={MUTED}
                  >
                    {stage.detail}
                  </text>
                  <text
                    x={x}
                    y="253"
                    textAnchor="middle"
                    fontSize="12"
                    fill={focused ? ACCENT : MUTED}
                  >
                    {focused ? "当前焦点" : "可复核"}
                  </text>
                </g>
              );
            })}

            <rect
              x="32"
              y="318"
              width="836"
              height="96"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="2"
            />
            <text x="54" y="348" fontSize="13" fontWeight="700" fill={state.color}>
              当前证据轨迹
            </text>
            <text x="54" y="375" fontSize="14" fill={PRIMARY}>
              {state.code}
            </text>
            <text x="54" y="399" fontSize="12" fill={MUTED}>
              {state.status}
            </text>
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs leading-5 text-secondary">
            观察合同：同一输入、同一约束、只改变一个决定；故障后必须能说明首个偏离。
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
        </div>
      </div>
    </section>
  );
}
