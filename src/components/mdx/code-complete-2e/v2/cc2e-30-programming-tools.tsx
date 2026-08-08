"use client";

import { useState } from "react";

type Scenario = "baseline" | "boundary" | "fault" | "repair";
type ToolChoice = "editor" | "analyzer" | "builder";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const STAGES = [
  { label: "设计产物", detail: "需求与决策", x: 96 },
  { label: "源代码工具", detail: "编辑与检查", x: 286 },
  { label: "构建执行", detail: "版本与配置", x: 476 },
  { label: "测试分析", detail: "边界与故障", x: 666 },
  { label: "工具链证据", detail: "判断与回放", x: 856 },
] as const;

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界检查" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复重放" },
];

const TOOLS: readonly { id: ToolChoice; label: string; note: string }[] = [
  { id: "editor", label: "编辑器", note: "输入与局部规则可见" },
  { id: "analyzer", label: "静态分析器", note: "覆盖范围与告警可见" },
  { id: "builder", label: "构建器", note: "版本、配置与产物可见" },
];

function scenarioState(scenario: Scenario, tool: ToolChoice) {
  const toolLabel = TOOLS.find((item) => item.id === tool)?.label ?? "工具";
  if (scenario === "boundary") {
    return {
      active: 3,
      color: COLORS.warning,
      firstDifference: "测试分析",
      status: `${toolLabel} 已到达边界检查，覆盖之外的路径不能被默认为安全。`,
      detail: "恰好边界样本应留下拒绝理由，而不是只显示空白结果。",
    };
  }
  if (scenario === "fault") {
    return {
      active: 1,
      color: COLORS.danger,
      firstDifference: "源代码工具",
      status: "故障注入：关闭一条规则后，工具链在源代码工具处首次分叉。",
      detail: "先保存首差和配置快照，再决定修复哪一层。",
    };
  }
  if (scenario === "repair") {
    return {
      active: 4,
      color: COLORS.success,
      firstDifference: "无（回到基线）",
      status: "修复重放通过：同一输入重新经过五个节点，基线轨迹一致。",
      detail: "工具的判断与人工复核边界都被写进了可回放证据。",
    };
  }
  return {
    active: 4,
    color: COLORS.accent,
    firstDifference: "无（基线）",
    status: "基线已固定：输入、版本、配置和观察窗口一致。",
    detail: "先有可重放基线，后面的边界或故障才有比较意义。",
  };
}

function ScenarioButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active
          ? "border-accent bg-accent/10 text-primary"
          : "border-border bg-background text-secondary hover:border-accent hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export function Cc2e30ProgrammingToolsMechanismLab() {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [tool, setTool] = useState<ToolChoice>("editor");
  const state = scenarioState(scenario, tool);

  function reset() {
    setScenario("baseline");
    setTool("editor");
  }

  return (
    <section
      aria-label="第30章编程工具专属因果实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cc2e-30-programming-tools-chain"
      data-unit-id="cc2e-30-programming-tools"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 工具链证据
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            从设计决定走到可审查的工具判断
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先冻结输入与版本，再只改变一个条件；观察首个分叉在哪里出现，最后用同一输入重放。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.6fr)]">
          <div
            className="grid min-w-0 gap-2 sm:grid-cols-4"
            aria-label="选择实验场景"
          >
            {SCENARIOS.map((item) => (
              <ScenarioButton
                key={item.id}
                active={scenario === item.id}
                onClick={() => setScenario(item.id)}
              >
                {item.label}
              </ScenarioButton>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            观察主工具
            <select
              aria-label="观察主工具"
              value={tool}
              onChange={(event) => setTool(event.target.value as ToolChoice)}
              className="mt-2 min-h-11 w-full rounded-control border border-border bg-background px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {TOOLS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="min-w-0 overflow-x-auto rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 960 340"
            role="img"
            aria-label={`工具链五节点：${STAGES.map((stage) => stage.label).join("、")}。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}，首个差异为${state.firstDifference}。`}
            className="mx-auto block h-auto w-full min-w-[330px] max-w-[960px]"
          >
            <rect
              x="1"
              y="1"
              width="958"
              height="338"
              rx="18"
              fill={COLORS.elevated}
              stroke={COLORS.border}
            />
            <text
              x="32"
              y="34"
              fontSize="18"
              fontWeight="700"
              fill={COLORS.primary}
            >
              工具链：输入 → 版本 → 观察 → 判断 → 回放
            </text>
            <text x="32" y="60" fontSize="13" fill={COLORS.secondary}>
              当前主工具：{TOOLS.find((item) => item.id === tool)?.label}
            </text>
            {STAGES.slice(0, -1).map((stage, index) => (
              <path
                key={`link-${stage.label}`}
                d={`M ${stage.x + 76} 177 H ${STAGES[index + 1].x - 76}`}
                fill="none"
                stroke={state.active > index ? state.color : COLORS.border}
                strokeWidth="3"
                strokeDasharray={state.active > index ? undefined : "6 8"}
              />
            ))}
            {STAGES.map((stage, index) => {
              const active = index <= state.active;
              const isFirstDifference = state.firstDifference === stage.label;
              const fill = isFirstDifference
                ? COLORS.danger
                : active
                  ? state.color
                  : COLORS.border;
              return (
                <g key={stage.label}>
                  <rect
                    x={stage.x - 76}
                    y="126"
                    width="152"
                    height="102"
                    rx="14"
                    fill={active ? "var(--bg)" : COLORS.elevated}
                    stroke={fill}
                    strokeWidth={isFirstDifference ? "4" : "2"}
                  />
                  <circle cx={stage.x} cy="157" r="12" fill={fill} />
                  <text
                    x={stage.x}
                    y="186"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={COLORS.primary}
                  >
                    {stage.label}
                  </text>
                  <text
                    x={stage.x}
                    y="209"
                    textAnchor="middle"
                    fontSize="12"
                    fill={COLORS.secondary}
                  >
                    {stage.detail}
                  </text>
                </g>
              );
            })}
            <text x="32" y="286" fontSize="13" fill={state.color}>
              {state.firstDifference === "无（基线）" ? "基线：" : "首个差异："}
              {state.firstDifference}
            </text>
            <text x="32" y="311" fontSize="12" fill={COLORS.secondary}>
              虚线表示尚未获得证据；红色边框表示应停下并保存配置快照。
            </text>
          </svg>
        </div>

        <div
          className="grid gap-3 rounded-card border border-border bg-background p-4 sm:grid-cols-3"
          role="status"
          aria-live="polite"
        >
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold text-primary">{state.status}</p>
            <p className="mt-1 text-sm leading-6 text-secondary">
              {state.detail}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-1">
            <div>
              <dt className="text-xs text-secondary">场景</dt>
              <dd className="mt-1 font-semibold text-primary">
                {SCENARIOS.find((item) => item.id === scenario)?.label}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-secondary">工具记录</dt>
              <dd className="mt-1 font-semibold text-primary">
                {TOOLS.find((item) => item.id === tool)?.note}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
