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

// 与 fidelity manifest 的 16 个正式目录节点同名，保证专属图能回指完整目录覆盖。
const OFFICIAL_NODES = [
  "第16章 控制循环",
  "16.1 选择循环的种类",
  "什么时候使用while循环",
  "什么时候用带退出的循环",
  "何时使用for循环",
  "何时使用foreach循环",
  "16.2 循环控制",
  "进入循环",
  "处理好循环体",
  "退出循环",
  "检查端点",
  "使用循环变量",
  "循环应该有多长",
  "16.3 轻松创建循环——由内而外",
  "16.4 循环和数组的关系",
  "关键点",
] as const;

const NODES = [
  { id: "setup", label: "初始化", detail: "循环前状态", x: 90 },
  { id: "guard", label: "继续条件", detail: "进入 / 停止", x: 260 },
  { id: "body", label: "循环体", detail: "保持不变量", x: 430 },
  { id: "progress", label: "进展量", detail: "靠近退出", x: 600 },
  { id: "post", label: "退出后状态", detail: "可复核结果", x: 770 },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "setup",
    caption: "先写循环前状态：输入集合、索引起点和必须保持的不变量。",
  },
  {
    label: "guard",
    caption: "把继续条件写成可检查的边界；零次迭代也必须有定义。",
  },
  {
    label: "body",
    caption: "循环体只做一件清楚的事，并在每次迭代后仍保持不变量。",
  },
  {
    label: "progress",
    caption: "显式检查进展量；它必须向退出条件移动，不能原地踏步。",
  },
  {
    label: "post",
    caption: "退出后核对后置条件，再用同一输入重放并确认复位一致。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Stage = (typeof STEPS)[number]["label"];
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常循环" },
  { id: "boundary", label: "恰好边界" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复后" },
];

const FOCUS_NODE: Record<Stage, string> = {
  setup: "setup",
  guard: "guard",
  body: "body",
  progress: "progress",
  post: "post",
};

type ScenarioState = {
  code: string;
  status: string;
  color: string;
  active: Stage;
};

function scenarioState(scenario: Scenario): ScenarioState {
  if (scenario === "boundary") {
    return {
      code: "for (i = 0; i < items.length; i += 1)",
      status: "边界通过：i 等于 length 时停止，最后一次访问仍在有效索引内",
      color: WARNING,
      active: "guard",
    };
  }
  if (scenario === "fault") {
    return {
      code: "while (i < items.length) { use(items[i]); /* i 不变 */ }",
      status: "拒绝：进展量不变，继续条件无法失效，循环可能永不终止",
      color: DANGER,
      active: "progress",
    };
  }
  if (scenario === "repair") {
    return {
      code: "while (i < items.length) { use(items[i]); i += 1; }",
      status: "通过：不变量、边界、进展量和退出后状态都能由同一输入复核",
      color: SUCCESS,
      active: "post",
    };
  }
  return {
    code: "for (const item of items) { use(item); }",
    status: "基线：每个元素恰好处理一次，空集合自然得到零次迭代",
    color: ACCENT,
    active: "body",
  };
}

/** 第16章专属实验：把循环合同画成可暂停、可单步、可重置的机制链。 */
export function Cc2e16LoopsMechanismLab({
  focus = "setup",
}: {
  focus?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const focusedNode = FOCUS_NODE[focus];
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
      aria-label="第16章循环合同实验"
      data-visual-kind="cc2e-16-loops-loop-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第16章 · 循环合同实验
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            初始化 → 继续条件 → 循环体 → 进展量 → 退出后状态
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜首个偏离会发生在哪里，再切换边界或故障，观察循环为何继续、停止或被拒绝。
          </p>
        </div>
        <span className="rounded-control border border-border px-3 py-2 text-xs text-secondary">
          当前焦点：
          {NODES.find((node) => node.id === focusedNode)?.label ?? "初始化"}
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-4" aria-label="选择循环场景">
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
          aria-label={`第16章循环合同五节点图，覆盖 ${OFFICIAL_NODES.length} 个官方目录节点`}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`循环合同五节点机制图：初始化、继续条件、循环体、进展量和退出后状态。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${state.status}。支持场景切换、分步、播放、暂停、拖动进度和重置实验。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[860px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              循环控制的可证明合同
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              初始化守住起点；继续条件、循环体和进展量共同决定终止
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
            <text x="50" y="336" fontSize="13" fontWeight="700" fill={state.color}>
              {state.status}
            </text>
            <text x="50" y="361" fontSize="11" fill={MUTED}>
              当前代码草图：{state.code}
            </text>

            <text x="30" y="426" fontSize="12" fontWeight="700" fill={PRIMARY}>
              审查记录
            </text>
            <text x="30" y="451" fontSize="12" fill={MUTED}>
              保存：输入 · 零次/一次/末端 · 首个偏离 · 退出后状态 · 重置重放
            </text>
          </svg>
        </div>

        <div
          role="status"
          className="mt-3 rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary"
        >
          {state.status}
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测，再用单步或播放核对每个节点；最后重置并用同一输入重放。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置第16章循环合同实验",
            onClick: reset,
          }}
        />
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        红色只表示进展合同被破坏；修复的标准是边界、终止和复位后的轨迹都能被另一位读者复算。
      </p>
    </section>
  );
}
