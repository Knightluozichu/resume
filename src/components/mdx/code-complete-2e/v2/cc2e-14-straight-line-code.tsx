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
const VIEW_H = 500;
const T = TEACHING_BEAT_MS;

const ACCENT = "var(--accent)";
const MUTED = "var(--text-secondary)";
const PRIMARY = "var(--text-primary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

const NODES = [
  { id: "input", label: "输入准备", detail: "读取 / 校验", x: 92 },
  { id: "dependency", label: "依赖计算", detail: "按箭头执行", x: 263 },
  { id: "related", label: "相关语句", detail: "概念聚类", x: 434 },
  { id: "result", label: "结果组装", detail: "交付输出", x: 605 },
  { id: "review", label: "顺序复核", detail: "正常 / 故障 / 复位", x: 776 },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "先让输入和资源达到可用状态。" },
  { label: "dependency", caption: "只保留由输入与输出决定的强制箭头。" },
  { label: "related", caption: "在安全区间把同一概念的语句放在一起。" },
  { label: "result", caption: "让结果组装依赖的状态在视线内可见。" },
  { label: "review", caption: "用故障和复位确认移动没有静默改写行为。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Focus = "dependency" | "independent" | "review";
type Scenario = "baseline" | "independent" | "fault";

const FOCUS_INDEX: Record<Focus, number> = {
  dependency: 1,
  independent: 2,
  review: 4,
};

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "依赖成立" },
  { id: "independent", label: "顺序无关" },
  { id: "fault", label: "计算提前" },
];

function scenarioCopy(scenario: Scenario) {
  if (scenario === "fault") {
    return {
      status: "拒绝：依赖计算先于输入准备",
      statusColor: DANGER,
      code: "calculate(raw)  →  validate(raw)  →  build(response)",
      explanation: "首个偏离在依赖计算；后续结果不能被当作有效交付。",
    };
  }
  if (scenario === "independent") {
    return {
      status: "可交换：无共享输入、状态或副作用",
      statusColor: SUCCESS,
      code: "prepareLabel()  ↔  configureView()  →  build(response)",
      explanation: "可交换不等于随意；选择更早暴露错误、更易读的排列。",
    };
  }
  return {
    status: "基线：输入、依赖和结果按合同连接",
    statusColor: ACCENT,
    code: "read(input)  →  validate(raw)  →  calculate(total)  →  build()",
    explanation: "每个节点都能说明输入、状态、输出和失败出口。",
  };
}

/**
 * 第 14 章专属因果实验：把直线代码的先后关系拆成五个可观察节点。
 * 交互只改变场景与教学时刻；图中没有合成评分，结果来自显式的依赖合同。
 */
export function Cc2e14StraightLineCodeMechanismLab({
  focus = "dependency",
}: {
  focus?: Focus;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const copy = scenarioCopy(scenario);
  const focusedIndex = FOCUS_INDEX[focus] ?? FOCUS_INDEX.dependency;

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

  const isFault = scenario === "fault";
  const isIndependent = scenario === "independent";

  return (
    <section
      aria-label="第14章组织直线型代码专属因果实验"
      data-visual-kind="cc2e-14-straight-line-code-mechanism"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第14章 · 直线代码的排列证据
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            依赖决定箭头，聚类改善阅读
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测首个偏离，再切换场景和时间线；最后用重置确认同一输入能重建基线。
          </p>
        </div>
        <span className="rounded-control border border-border px-3 py-2 text-xs text-secondary">
          当前焦点：{NODES[focusedIndex]?.label ?? "依赖计算"}
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-2 sm:grid-cols-3"
          aria-label="选择直线代码场景"
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
            aria-label={`直线型代码五节点机制图：输入准备、依赖计算、相关语句、结果组装和顺序复核。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${copy.status}。支持分步、播放、暂停、拖动进度、场景切换和重置实验。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[860px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              直线代码的五个检查点
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              先保留真实依赖，再在安全区间组织阅读顺序
            </text>

            <path
              d="M92 178H776"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />

            {NODES.slice(0, -1).map((node, index) => {
              const next = NODES[index + 1];
              const edgeIsOptional = index === 1 && isIndependent;
              const edgeIsBroken = isFault && index === 0;
              return (
                <g key={`edge-${node.id}-${next.id}`}>
                  <path
                    d={`M${node.x + 52} 178H${next.x - 52}`}
                    fill="none"
                    stroke={
                      edgeIsBroken
                        ? DANGER
                        : edgeIsOptional
                          ? WARNING
                          : ACCENT
                    }
                    strokeWidth="2"
                    strokeDasharray={edgeIsOptional ? "7 6" : undefined}
                  />
                  <path
                    d={`M${next.x - 64} 170L${next.x - 52} 178L${next.x - 64} 186`}
                    fill="none"
                    stroke={
                      edgeIsBroken
                        ? DANGER
                        : edgeIsOptional
                          ? WARNING
                          : ACCENT
                    }
                    strokeWidth="2"
                  />
                </g>
              );
            })}

            {NODES.map((node, index) => {
              const isFocused = focusedIndex === index;
              const nodeStroke =
                isFault && index === 1
                  ? DANGER
                  : isIndependent && index === 2
                    ? WARNING
                    : isFocused
                      ? ACCENT
                      : BORDER;
              return (
                <g key={node.id}>
                  <rect
                    x={node.x - 58}
                    y="110"
                    width="116"
                    height="136"
                    rx="14"
                    fill={SURFACE}
                    stroke={nodeStroke}
                    strokeWidth={isFocused ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="138" r="17" fill={nodeStroke} />
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
                key={`timeline-${step.label}`}
                ref={(element) => {
                  nodeRefs.current[step.label] = element;
                }}
                style={{ opacity: 0 }}
              >
                <circle
                  cx={NODES[index].x}
                  cy="268"
                  r="10"
                  fill={isFault && index === 1 ? DANGER : ACCENT}
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
              height="68"
              rx="12"
              fill={SURFACE}
              stroke={copy.statusColor}
              strokeWidth="1.8"
            />
            <text x="50" y="335" fontSize="13" fontWeight="700" fill={copy.statusColor}>
              {copy.status}
            </text>
            <text x="50" y="358" fontSize="11" fill={MUTED}>
              代码草图：{copy.code}
            </text>

            <text x="30" y="420" fontSize="12" fontWeight="700" fill={PRIMARY}>
              观察记录
            </text>
            <text x="30" y="445" fontSize="12" fill={MUTED}>
              {copy.explanation} 保存：输入 · 首个偏离 · 拒绝理由 · 复位轨迹
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪条箭头会改变，再用单步或播放检查每个节点。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置直线型代码实验",
            onClick: reset,
          }}
        />
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        图中的箭头是依赖证据，虚线表示可重新安排的区间，红色只表示故障注入后的首个偏离。
      </p>
    </section>
  );
}
