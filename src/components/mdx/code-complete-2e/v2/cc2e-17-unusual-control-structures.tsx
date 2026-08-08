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

// 与 manifest 的第17章目录保持同名；正文解释这些节点，实验把它们压缩成一条审查链。
const OFFICIAL_NODES = [
  "第17章 不常见的控制结构",
  "17.1 子程序中的多个返回",
  "17.2 递归",
  "递归的例子",
  "使用递归的技巧",
  "17.3 goto",
  "反对goto的论点",
  "支持goto的观点",
  "关于goto的虚假辩论",
  "错误处理和goto",
  "goto和在else子句中的共享代码",
  "goto使用原则总结",
  "17.4 对不常见控制结构的看法",
  "其他资源",
  "关键点",
] as const;

const NODES = [
  { id: "goal", label: "控制目标", detail: "正常 / 故障出口", x: 90 },
  { id: "candidate", label: "候选结构", detail: "返回 / 递归 / 跳转", x: 260 },
  { id: "path", label: "路径展开", detail: "每条边可追踪", x: 430 },
  { id: "cleanup", label: "退出清理", detail: "资源与不变量", x: 600 },
  { id: "complexity", label: "复杂度复核", detail: "终止与可读性", x: 770 },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "goal", caption: "先说清控制目标、输入、状态和输出。" },
  { label: "candidate", caption: "只在结构直接表达问题时选多返回、递归或跳转。" },
  { label: "path", caption: "展开正常、边界和故障出口，寻找首个偏离。" },
  { label: "cleanup", caption: "检查每个出口都恢复资源和后置条件。" },
  { label: "complexity", caption: "用严格缩小、路径数量和重放结果收尾。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Stage = (typeof STEPS)[number]["label"];
type Scenario = "baseline" | "boundary" | "fault" | "repair";

const SCENARIOS: readonly { id: Scenario; label: string }[] = [
  { id: "baseline", label: "正常路径" },
  { id: "boundary", label: "边界出口" },
  { id: "fault", label: "故障注入" },
  { id: "repair", label: "修复重放" },
];

const FOCUS_INDEX: Record<Stage, number> = {
  goal: 0,
  candidate: 1,
  path: 2,
  cleanup: 3,
  complexity: 4,
};

function scenarioCopy(scenario: Scenario) {
  if (scenario === "boundary") {
    return {
      status: "边界：提前返回必须先交给统一清理出口",
      color: WARNING,
      code: "if (!item) return; // 先确认 resource 已释放",
      active: "cleanup",
      detail: "边界不是例外通行证；它要和正常路径拥有同一后置条件。",
    };
  }
  if (scenario === "fault") {
    return {
      status: "拒绝：递归没有严格缩小，可能绕过终止保护",
      color: DANGER,
      code: "visit(node) { return visit(node); }",
      active: "path",
      detail: "首个偏离在路径展开：没有进展量就不能把栈深度当作终止证明。",
    };
  }
  if (scenario === "repair") {
    return {
      status: "通过：出口汇合，清理、终止和复核均可重放",
      color: SUCCESS,
      code: "if (bad) goto cleanup; return result; cleanup: release();",
      active: "complexity",
      detail: "受限跳转只服务于共享清理；调用者仍能看见结果和错误语义。",
    };
  }
  return {
    status: "基线：控制目标先于结构选择，所有出口都有责任人",
    color: ACCENT,
    code: "prepare() → choose() → act() → cleanup()",
    active: "goal",
    detail: "先建立可读基线，再比较多个返回、递归和 goto 的真实收益。",
  };
}

/**
 * 第17章专属因果实验：把特殊控制结构的争论变成可展开、可复位的路径证据。
 * 交互只切换场景与教学时刻，不计算伪分数；结论来自出口、清理和终止合同。
 */
export function Cc2e17UnusualControlStructuresMechanismLab({
  stage = "goal",
}: {
  stage?: Stage;
}) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const copy = scenarioCopy(scenario);
  const focusedIndex = FOCUS_INDEX[stage] ?? FOCUS_INDEX.goal;

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
      aria-label="第17章：不常见的控制结构专属因果实验"
      data-visual-kind="cc2e-17-unusual-control-structures-path-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第17章 · 特殊控制结构的路径证据
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            控制目标 → 出口清理 → 终止复核
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜首个偏离，再切换边界或故障；最后用同一输入重放，判断结构是否真的减少了理解成本。
          </p>
        </div>
        <span className="rounded-control border border-border px-3 py-2 text-xs text-secondary">
          当前焦点：{NODES[focusedIndex]?.label ?? "控制目标"}
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div
          className="grid min-w-0 gap-3 sm:grid-cols-4"
          aria-label="选择不常见控制结构场景"
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
            aria-label={`第17章五节点机制图：控制目标、候选结构、路径展开、退出清理和复杂度复核。当前场景为${SCENARIOS.find((item) => item.id === scenario)?.label}。${copy.status}。支持场景切换、分步、播放、暂停、拖动进度和重置实验。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[860px]"
          >
            <text x="30" y="32" fontSize="18" fontWeight="700" fill={PRIMARY}>
              不常见控制结构的路径合同
            </text>
            <text x="30" y="56" fontSize="12" fill={MUTED}>
              结构选择要缩短错误路径，同时保留资源清理和终止证据
            </text>

            <path
              d="M90 178H770"
              fill="none"
              stroke={BORDER}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {NODES.slice(0, -1).map((node, index) => (
              <path
                key={`link-${node.id}`}
                d={`M${node.x + 62} 178H${NODES[index + 1].x - 62}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
              />
            ))}

            {NODES.map((node, index) => {
              const isFocused = focusedIndex === index;
              const isScenarioNode = copy.active === node.id;
              const nodeColor = isScenarioNode
                ? copy.color
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
                  fill={copy.active === step.label ? copy.color : ACCENT}
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
              height="82"
              rx="12"
              fill={SURFACE}
              stroke={copy.color}
              strokeWidth="1.8"
            />
            <text x="50" y="337" fontSize="13" fontWeight="700" fill={copy.color}>
              {copy.status}
            </text>
            <text x="50" y="363" fontSize="11" fill={MUTED}>
              当前代码草图：{copy.code}
            </text>
            <text x="50" y="383" fontSize="11" fill={MUTED}>
              {copy.detail}
            </text>

            <text x="30" y="430" fontSize="12" fontWeight="700" fill={PRIMARY}>
              复核记录
            </text>
            <text x="30" y="454" fontSize="12" fill={MUTED}>
              保存：输入与状态 · 首个偏离 · 资源清理 · 终止理由 · 重置后的重放
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测首个偏离，再逐步检查每条出口是否保留清理和终止合同。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置第17章不常见控制结构实验",
            onClick: reset,
          }}
        />
      </div>

      <p className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        红色表示故障已定位，不表示“禁止所有特殊结构”；修复标准是边界、故障与正常输入都能回到同一套出口合同。
      </p>
    </section>
  );
}
