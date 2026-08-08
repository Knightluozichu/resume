"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 860;
const VIEW_H = 520;
const T = TEACHING_BEAT_MS;

const ACCENT = "var(--accent)";
const MUTED = "var(--text-secondary)";
const PRIMARY = "var(--text-primary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

// 这些节点与 manifest 的第15章目录一一对应；图中用同一条机制链解释它们。
const OFFICIAL_NODES = [
  "第15章 使用条件语句",
  "15.1 if语句",
  "简单if-then语句",
  "if-then-else语句串",
  "15.2 case语句",
  "为case选择最有效的排序",
  "使用case语句的提示",
  "关键点",
] as const;

const NODES = [
  { id: "input", label: "条件输入", detail: "正常 / 边界 / 故障", x: 90 },
  { id: "normal", label: "正常分支", detail: "先展示主路径", x: 260 },
  { id: "alternative", label: "替代分支", detail: "互斥且有名字", x: 430 },
  { id: "default", label: "默认拒绝", detail: "未知值不静默通过", x: 600 },
  { id: "coverage", label: "分支覆盖", detail: "每个输入有归属", x: 770 },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "先列出正常值、恰好边界和一个故障输入。" },
  { label: "normal", caption: "把最常见、最容易读懂的正常路径放在前面。" },
  { label: "alternative", caption: "为替代条件命名，并证明它与前一分支互斥。" },
  { label: "default", caption: "为未覆盖值定义拒绝、接受或不可达的明确结论。" },
  { label: "coverage", caption: "逐项检查输入域既没有重叠，也没有遗漏。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Stage = (typeof STEPS)[number]["label"];
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常输入" },
  { id: "boundary", label: "恰好边界" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复后" },
];

const FOCUS_NODE: Record<Stage, string> = {
  input: "input",
  normal: "normal",
  alternative: "alternative",
  default: "default",
  coverage: "coverage",
};

function scenarioState(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      code: "if (score >= 60) pass(); else review();",
      status: "边界：60 只能进入一个分支，不能同时 pass 与 review",
      color: WARNING,
      active: "alternative",
    };
  }
  if (scenario === "fault") {
    return {
      code: "if (score > 60) pass(); // score = 60 无归属",
      status: "拒绝：边界遗漏，默认路径没有说明输入应如何处理",
      color: DANGER,
      active: "default",
    };
  }
  if (scenario === "repair") {
    return {
      code: "if (score >= 60) pass(); else review();",
      status: "通过：边界已归属，正常路径、替代路径和默认拒绝都可复核",
      color: SUCCESS,
      active: "coverage",
    };
  }
  return {
    code: "if (score >= 60) pass(); else review();",
    status: "基线：输入先进入正常路径，其他已知输入进入替代路径",
    color: ACCENT,
    active: "normal",
  };
}

/**
 * 第15章专属实验：把 if/case 的选择从代码文本变成一条可观察的分支合同。
 * 场景按钮只改变输入与错误状态，时间线则逐步揭示互斥、默认和覆盖证据。
 */
export function Cc2e15ConditionalsMechanismLab({
  stage = "input",
}: {
  stage?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const focusedNode = FOCUS_NODE[stage];
  const state = scenarioState(scenario);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          nodeRefs.current[step.label]!,
          {
            opacity: [0, 1],
            scale: [0.86, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  const reset = () => {
    setScenario("baseline");
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="条件语句分支覆盖实验"
      data-visual-kind="cc2e-15-conditionals-branch-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第15章 · 分支合同实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            条件输入 → 正常分支 → 默认拒绝 → 分支覆盖
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜输入会在哪个节点被接受，再切换边界或故障，观察一条分支链怎样暴露遗漏。
          </p>
        </div>
        <span className="rounded-control border border-border px-3 py-2 text-xs text-secondary">
          当前焦点：
          {NODES.find((node) => node.id === focusedNode)?.label ?? "条件输入"}
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择输入场景"
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
            aria-label={`条件语句五节点机制图：条件输入、正常分支、替代分支、默认拒绝和分支覆盖。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${state.status}。支持场景切换、分步、播放、暂停、拖动进度和重置实验。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[860px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              条件语句的分支合同
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              domain 被完整覆盖；任意输入只能落入一个可解释路径
            </text>

            <path
              d="M90 178H770"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node) => (
              <path
                key={`link-${node.id}`}
                d={`M${node.x + 62} 178H${node.x + 108}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const isFocused = focusedNode === node.id;
              const isScenarioNode = state.active === node.id;
              const nodeColor = isScenarioNode
                ? state.color
                : isFocused
                  ? ACCENT
                  : BORDER;
              return (
                <g key={node.id}>
                  <rect
                    x={node.x - 62}
                    y="110"
                    width="124"
                    height="136"
                    rx="14"
                    fill={SURFACE}
                    stroke={nodeColor}
                    strokeWidth={isFocused || isScenarioNode ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="138" r="17" fill={nodeColor} />
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
                    y="181"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={PRIMARY}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y="208"
                    textAnchor="middle"
                    fontSize="11"
                    fill={MUTED}
                  >
                    {node.detail}
                  </text>
                </g>
              );
            })}

            {STEPS.map((step, index) => (
              <g
                key={`highlight-${step.label}`}
                ref={(element) => {
                  nodeRefs.current[step.label] = element;
                }}
                style={{ opacity: 0 }}
              >
                <circle
                  cx={NODES[index].x}
                  cy="268"
                  r="10"
                  fill={state.active === step.label ? state.color : ACCENT}
                />
                <text
                  x={NODES[index].x}
                  y="272"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={SURFACE}
                >
                  {index + 1}
                </text>
              </g>
            ))}

            <rect
              x="30"
              y="308"
              width="800"
              height="72"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="1.8"
            />
            <text
              x="50"
              y="336"
              fontSize="13"
              fontWeight="700"
              fill={state.color}
            >
              {state.status}
            </text>
            <text x="50" y="361" fontSize="11" fill={MUTED}>
              当前代码草图：{state.code}
            </text>

            <text x="30" y="426" fontSize="12" fontWeight="700" fill={PRIMARY}>
              审查记录
            </text>
            <text x="30" y="451" fontSize="12" fill={MUTED}>
              保存：输入值 · 命中分支 · 首个偏离 · 默认结论 · 重置后的重放
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测首个偏离，再用单步或播放检查互斥与完备性。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置条件语句分支覆盖实验",
            onClick: reset,
          }}
        />
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        红色只表示故障被定位到某个节点；修复的标准是重新运行同一个输入，得到同一条可解释路径。
      </p>
    </section>
  );
}
