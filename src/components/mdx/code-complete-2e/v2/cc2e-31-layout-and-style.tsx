"use client";

import { useState } from "react";

const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

const VIEW_W = 920;
const VIEW_H = 430;

// 这些节点与 quality/fidelity-manifests.json 的第31章目录一一对应；
// 它们让视觉实验能覆盖“出现—解释—观察”的完整目录范围，而不是只画一个装饰箭头。
const OFFICIAL_NODES = [
  "第31章 布局与风格",
  "31.1 基本原则",
  "布局的极端情况",
  "格式化的基本原理",
  "人和计算机对程序的解读",
  "好布局有什么用？",
  "把布局作为一种信仰",
  "良好布局的目标",
  "31.2 布局技术",
  "空白区",
  "括号",
  "31.3 布局风格",
  "纯块结构",
  "模仿纯块结构",
  "使用begin - end对（大括号）指定块边界",
  "行尾布局",
  "哪种风格最优？",
  "31.4 控制结构的布局",
  "格式化控制结构块的要点",
  "其他考虑",
  "31.5 单条语句的布局",
  "语句长度",
  "用空格使语句显得清楚",
  "格式化后续行",
  "每行仅写一条语句",
  "数据声明的布局",
  "31.6 注释的布局",
  "31.7 子程序的布局",
  "31.8 类的布局",
  "类接口的布局",
  "类实现的布局",
  "文件和程序布局",
  "更多资源",
  "关键点",
] as const;

const NODES = [
  { label: "阅读任务", detail: "先明确读者要找什么", x: 92 },
  { label: "结构信号", detail: "空白与括号表达层级", x: 276 },
  { label: "自动格式化", detail: "机械选择固定化", x: 460 },
  { label: "差异审查", detail: "变化可定位、可解释", x: 644 },
  { label: "风格维护", detail: "例外服务真实阅读", x: 828 },
] as const;

type Stage = "task" | "structure" | "format" | "review" | "maintain";
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const STAGES: readonly { id: Stage; label: string }[] = [
  { id: "task", label: "阅读任务" },
  { id: "structure", label: "结构信号" },
  { id: "format", label: "自动格式化" },
  { id: "review", label: "差异审查" },
  { id: "maintain", label: "风格维护" },
];

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界布局" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复重放" },
];

function scenarioState(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      active: "structure" as Stage,
      color: WARNING,
      status: "边界：长表达式与嵌套控制结构同时出现，空白不能掩盖真实层级。",
      evidence: "保持语义不变，只让缩进、括号和换行表达同一结构；必要时拆出有名字的中间步骤。",
      decision: "保留：例外减少读者定位成本，并且格式化前后行为轨迹一致。",
    };
  }
  if (scenario === "fault") {
    return {
      active: "review" as Stage,
      color: DANGER,
      status: "拒绝：手工对齐制造巨大 diff，或用格式隐藏复杂表达式。",
      evidence: "首个偏离在差异审查：变化无法归因到一个语义决定，读者也不能从版面恢复控制流。",
      decision: "回退：先恢复基线，再只改一个布局决定并重新生成差异。",
    };
  }
  if (scenario === "repair") {
    return {
      active: "maintain" as Stage,
      color: SUCCESS,
      status: "通过：同一输入重放后，语义轨迹不变，差异可解释，例外有阅读收益。",
      evidence: "记录格式化工具版本、输入、故障点和复位结果；第二位读者可以从干净状态重建证据。",
      decision: "接受：格式服务结构阅读，而不是把个人偏好伪装成工程规则。",
    };
  }
  return {
    active: "task" as Stage,
    color: ACCENT,
    status: "基线：先固定读者任务、输入和观察窗口，再讨论哪种风格更清楚。",
    evidence: "版面是结构信号；格式化负责重复性选择，审查负责判断例外是否改善阅读。",
    decision: "待判断：先预测首个变化节点，再切换一个场景。",
  };
}

/** 第31章专属实验：把布局选择与结构、差异和维护决策连成可重放证据链。 */
export function Cc2e31LayoutAndStyleLab({
  focus = "task",
}: {
  focus?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const state = scenarioState(scenario);
  const focusedIndex = STAGES.findIndex((stage) => stage.id === focus);
  const activeIndex = STAGES.findIndex((stage) => stage.id === state.active);
  const conceptCount = OFFICIAL_NODES.length;

  const reset = () => setScenario("baseline");

  return (
    <section
      aria-label="第31章布局与风格专属因果实验"
      data-visual-kind="cc2e-31-layout-and-style-causal-trace"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第31章 · 专属布局实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让格式暴露结构，而不是制造噪声
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测首个偏离，再切换一个场景；实验覆盖 {conceptCount} 个目录节点，最后用同一输入重放。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第31章布局与风格实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择布局实验场景"
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
            aria-label={`布局因果链：阅读任务、结构信号、自动格式化、差异审查、风格维护。当前状态：${state.status}`}
            className="mx-auto block h-auto min-w-[720px] w-full max-w-[920px]"
          >
            <text x="34" y="34" fontSize="20" fontWeight="700" fill={PRIMARY}>
              一个布局决定，五个可审查节点
            </text>
            <text x="34" y="62" fontSize="14" fill={MUTED}>
              版面变化只能改善结构阅读，不能改变程序语义
            </text>

            <path
              d="M92 176H828"
              fill="none"
              stroke={BORDER}
              strokeWidth="10"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node) => (
              <path
                key={`link-${node.label}`}
                d={`M${node.x + 50} 176H${node.x + 134}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="3"
              />
            ))}

            {NODES.map((node, index) => {
              const scenarioActive = index === activeIndex;
              const focusActive = index === focusedIndex;
              const color = scenarioActive
                ? state.color
                : focusActive
                  ? ACCENT
                  : BORDER;
              return (
                <g key={node.label}>
                  <circle
                    cx={node.x}
                    cy="176"
                    r={scenarioActive || focusActive ? 35 : 28}
                    fill={scenarioActive ? state.color : SURFACE}
                    fillOpacity={scenarioActive ? 0.16 : 1}
                    stroke={color}
                    strokeWidth={scenarioActive || focusActive ? 4 : 2}
                  />
                  <text
                    x={node.x}
                    y="170"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill={scenarioActive ? state.color : PRIMARY}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={node.x}
                    y="238"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="264"
                    textAnchor="middle"
                    fontSize="13"
                    fill={MUTED}
                  >
                    {node.detail}
                  </text>
                </g>
              );
            })}

            <rect
              x="34"
              y="308"
              width="852"
              height="78"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="2"
            />
            <text x="52" y="338" fontSize="15" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="52" y="365" fontSize="14" fill={MUTED}>
              当前证据：{state.evidence}
            </text>
          </svg>
        </div>

        <p
          role="status"
          className="mt-4 rounded-control border border-border bg-surface px-3 py-3 text-sm leading-6 text-primary"
        >
          <strong style={{ color: state.color }}>决策：</strong> {state.decision}
        </p>
      </div>
    </section>
  );
}
