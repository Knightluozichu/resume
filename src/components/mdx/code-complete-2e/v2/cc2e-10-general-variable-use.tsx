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
  { id: "definition", label: "定义", detail: "含义 / 类型 / 单位", x: 78 },
  { id: "initialization", label: "初始化", detail: "每条路径有合法值", x: 248 },
  { id: "local-use", label: "局部使用", detail: "只在职责内可见", x: 418 },
  { id: "last-use", label: "最后一次读取", detail: "记录真实终点", x: 588 },
  { id: "end", label: "生命周期结束", detail: "不再继续携带状态", x: 758 },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "definition",
    caption: "先写出变量表示的对象、类型、单位和允许范围。",
  },
  {
    label: "initialization",
    caption: "沿每条可达路径检查：第一次读取前是否已有合法值。",
  },
  {
    label: "local-use",
    caption: "把定义、写入和读取收束到同一个职责的局部范围。",
  },
  {
    label: "last-use",
    caption: "找到最后一次读取，不为未来猜测保留临时状态。",
  },
  { label: "end", caption: "让变量在职责结束处离开，并记录故障与复位证据。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Scenario = "baseline" | "fault" | "repair";
type Stage = "definition" | "initialization" | "scope";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复后" },
];

const FOCUS_NODE: Record<Stage, string> = {
  definition: "definition",
  initialization: "initialization",
  scope: "local-use",
};

function scenarioCopy(scenario: Scenario) {
  if (scenario === "fault") {
    return {
      code: "let total;  if (hasDiscount) total = amount - discount;  return total;",
      status: "拒绝：某条路径在初始化前读取 total",
      statusColor: DANGER,
    };
  }
  if (scenario === "repair") {
    return {
      code: "const total = hasDiscount ? amount - discount : amount;  return total;",
      status: "通过：含义、初始化与结束点都能被局部重建",
      statusColor: SUCCESS,
    };
  }
  return {
    code: "const total = calculateTotal(input);  return total;",
    status: "基线：变量只服务一次计算，并在返回前完成读取",
    statusColor: ACCENT,
  };
}

export function Cc2e10GeneralVariableUseMechanismLab({
  stage = "definition",
}: {
  stage?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const focusedNode = FOCUS_NODE[stage];
  const copy = scenarioCopy(scenario);

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
      aria-label="变量生命周期实验"
      data-visual-kind="cc2e-10-variable-lifecycle"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第10章 · 数据流审查实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            定义 → 初始化 → 局部使用 → 结束
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜故障会在哪个节点出现，再切换场景和分步轨迹，观察变量怎样从“可疑状态”回到可复核状态。
          </p>
        </div>
        <span className="rounded-control border border-border px-3 py-2 text-xs text-secondary">
          当前焦点：
          {NODES.find((node) => node.id === focusedNode)?.label ?? "数据流"}
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-3"
          aria-label="选择变量场景"
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
            aria-label={`变量生命周期五节点机制图：定义、初始化、局部使用、最后一次读取和生命周期结束。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${copy.status}。支持分步、播放、暂停、拖动进度、场景切换和重置实验。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[860px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              变量的可审查生命周期
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              变量越少跨越无关职责，读者越容易定位首个数据流偏离
            </text>

            <path
              d="M105 178H745"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node, index) => (
              <path
                key={`link-${node.id}`}
                d={`M${node.x + 68} 178H${node.x + 102}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const isFocused = focusedNode === node.id;
              const scenarioStroke =
                scenario === "fault" && node.id === "initialization"
                  ? DANGER
                  : scenario === "repair" && node.id === "end"
                    ? SUCCESS
                    : isFocused
                      ? ACCENT
                      : BORDER;
              return (
                <g key={node.id}>
                  <rect
                    x={node.x - 58}
                    y="110"
                    width="136"
                    height="136"
                    rx="14"
                    fill={SURFACE}
                    stroke={scenarioStroke}
                    strokeWidth={isFocused ? 3 : 1.5}
                  />
                  <circle cx={node.x} cy="138" r="17" fill={scenarioStroke} />
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
                  fill={scenario === "fault" && index === 1 ? DANGER : ACCENT}
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
              height="66"
              rx="12"
              fill={SURFACE}
              stroke={copy.statusColor}
              strokeWidth="1.8"
            />
            <text
              x="50"
              y="334"
              fontSize="13"
              fontWeight="700"
              fill={copy.statusColor}
            >
              {copy.status}
            </text>
            <text x="50" y="357" fontSize="11" fill={MUTED}>
              当前代码草图：{copy.code}
            </text>

            <text x="30" y="420" fontSize="12" fontWeight="700" fill={PRIMARY}>
              审查记录
            </text>
            <text x="30" y="445" fontSize="12" fill={MUTED}>
              保存：输入场景 · 首个偏离 · 拒绝理由 · 重置后的同一路径
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测首个偏离，再用单步或播放检查变量怎样跨过每个生命周期节点。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置变量生命周期实验",
            onClick: reset,
          }}
        />
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        这张图把“变量是否可读”转成可观察证据：故障场景不是为了制造红色，而是为了定位第一次读取未获得合法值的节点。
      </p>
    </section>
  );
}
