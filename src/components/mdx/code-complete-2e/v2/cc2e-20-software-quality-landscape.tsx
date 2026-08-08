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

const VIEW_W = 900;
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

const OFFICIAL_NODES = [
  "第20章 软件质量概述",
  "20.1 软件质量的特性",
  "20.2 改善软件质量的技术",
  "开发过程",
  "设置目标",
  "20.3 不同质量保障技术的相对效能",
  "缺陷检测率",
  "找出缺陷的成本",
  "修正缺陷的成本",
  "20.4 什么时候进行质量保证工作",
  "20.5 软件质量的普遍原理",
  "推荐读物",
  "相关标准",
  "关键点",
] as const;

const NODES = [
  { id: "goal", label: "质量目标", detail: "先声明要保护什么", x: 90 },
  { id: "attribute", label: "质量属性", detail: "正确性 / 可靠性", x: 270 },
  { id: "technique", label: "技术组合", detail: "预防 / 检测 / 修复", x: 450 },
  { id: "evidence", label: "证据窗口", detail: "检测率 / 成本", x: 630 },
  { id: "decision", label: "质量决策", detail: "接受 / 拒绝 / 重放", x: 810 },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "goal",
    caption: "先固定质量目标与观察窗口，避免用一个总分掩盖属性之间的交换。",
  },
  {
    label: "attribute",
    caption: "把目标拆成可观察的质量属性，并为每个属性写出边界。",
  },
  {
    label: "technique",
    caption: "为属性配预防、检测和修复技术；技术不是属性本身。",
  },
  {
    label: "evidence",
    caption: "用缺陷检测率和发现、修正成本记录证据，而不是凭感觉报喜。",
  },
  {
    label: "decision",
    caption: "若首个偏离不可解释就拒绝，修复后用同一输入重放验收。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Stage = (typeof STEPS)[number]["label"];
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常组合" },
  { id: "boundary", label: "属性冲突" },
  { id: "fault", label: "证据缺口" },
  { id: "repair", label: "修复重放" },
];

type ScenarioState = {
  active: Stage;
  color: string;
  status: string;
  detail: string;
  metrics: readonly number[];
};

function scenarioState(scenario: Scenario): ScenarioState {
  if (scenario === "boundary") {
    return {
      active: "attribute",
      color: WARNING,
      status: "边界：可靠性上升但可维护性下降，不能用平均分掩盖交换。",
      detail: "把属性拆开记录，先声明每个属性的最低接受线。",
      metrics: [82, 91, 54],
    };
  }
  if (scenario === "fault") {
    return {
      active: "evidence",
      color: DANGER,
      status: "拒绝：只有覆盖率数字，没有缺陷窗口与成本证据。",
      detail: "首个偏离在证据窗口；缺少可复核输入就不能宣称质量改善。",
      metrics: [88, 86, 78],
    };
  }
  if (scenario === "repair") {
    return {
      active: "decision",
      color: SUCCESS,
      status: "通过：每个属性都有对应技术、证据和可重放的接受条件。",
      detail: "修复只改变预期节点，同一输入重放后其余轨迹保持一致。",
      metrics: [88, 84, 80],
    };
  }
  return {
    active: "goal",
    color: ACCENT,
    status: "基线：先固定目标、属性、技术和观察窗口，再谈质量结果。",
    detail: "质量不是单一总分，而是一组带边界的可审查承诺。",
    metrics: [88, 84, 80],
  };
}

function metricLabel(index: number) {
  return ["正确性", "可靠性", "可维护性"][index] ?? "属性";
}

/** 第20章专属实验：把质量属性、技术和证据串成可拒绝、可重放的决策链。 */
export function Cc2e20SoftwareQualityLandscapeLab({
  focus = "goal",
}: {
  focus?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const focusedIndex = STEPS.findIndex((step) => step.label === focus);
  const state = scenarioState(scenario);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          nodeRefs.current[step.label]!,
          {
            opacity: [0.35, 1],
            scale: [0.9, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  const activeTimelineIndex = timeline.currentStep;

  const reset = () => {
    setScenario("baseline");
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="第20章软件质量全景专属实验"
      data-visual-kind="cc2e-20-software-quality-landscape"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第20章 · 质量决策实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            质量目标 → 属性 → 技术 → 证据 → 决策
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测首个偏离会落在哪个节点，再切换属性冲突或证据缺口；最后用同一输入重放。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第20章软件质量实验"
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择质量实验场景"
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
            aria-label={`软件质量五节点图：质量目标、质量属性、技术组合、证据窗口和质量决策。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${state.status}。支持场景切换、分步、播放、暂停、拖动进度和重置。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[900px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              软件质量不是一个总分
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              每个属性都要有技术、证据和适用边界，才能支持可复核决策
            </text>

            <path
              d="M90 178H810"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node) => (
              <path
                key={`link-${node.id}`}
                d={`M${node.x + 62} 178H${node.x + 118}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const isFocused = focus === node.id;
              const isTimelineNode = activeTimelineIndex === index;
              const isScenarioNode = state.active === node.id;
              const nodeColor = isScenarioNode
                ? state.color
                : isFocused || isTimelineNode
                  ? ACCENT
                  : BORDER;
              return (
                <g key={node.id}>
                  <rect
                    x={node.x - 62}
                    y="108"
                    width="124"
                    height="142"
                    rx="14"
                    fill={SURFACE}
                    stroke={nodeColor}
                    strokeWidth={isFocused || isTimelineNode || isScenarioNode ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="137" r="17" fill={nodeColor} />
                  <text
                    x={node.x}
                    y="142"
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
                    y="209"
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
                style={{ opacity: index <= activeTimelineIndex ? 1 : 0.35 }}
              >
                <circle
                  cx={NODES[index].x}
                  cy="274"
                  r="10"
                  fill={state.active === step.label ? state.color : ACCENT}
                />
                <text
                  x={NODES[index].x}
                  y="278"
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
              y="314"
              width="840"
              height="72"
              rx="12"
              fill={SURFACE}
              stroke={state.color}
              strokeWidth="1.8"
            />
            <text x="50" y="342" fontSize="13" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="50" y="367" fontSize="11" fill={MUTED}>
              当前证据：正确性 {state.metrics[0]} · 可靠性 {state.metrics[1]} · 可维护性 {state.metrics[2]}
            </text>

            <text x="30" y="430" fontSize="12" fontWeight="700" fill={PRIMARY}>
              审查记录
            </text>
            <text x="30" y="455" fontSize="12" fill={MUTED}>
              保存：目标 · 属性边界 · 技术选择 · 检测率 / 成本 · 首个偏离 · 重置重放
            </text>
          </svg>
        </div>

        <div
          role="status"
          className="mt-3 rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary"
        >
          <span className="font-semibold" style={{ color: state.color }}>
            {state.status}
          </span>{" "}
          {state.detail} 当前焦点：{NODES[focusedIndex < 0 ? 0 : focusedIndex]?.label ?? "质量目标"}。
          {NODES.map((node, index) => (
            <span key={node.id} className="ml-2 whitespace-nowrap">
              {metricLabel(index % 3)} {state.metrics[index % 3]}%
            </span>
          ))}
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测，再用单步或播放核对每个节点；最后重置并用同一输入重放。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置第20章质量决策时间线",
            onClick: reset,
          }}
        />
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        红色只表示证据合同被破坏；修复的标准是属性、技术、观察窗口和复位后的轨迹都能被另一位读者复算。
      </p>
    </section>
  );
}

void OFFICIAL_NODES;
