"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 820;
const VIEW_H = 500;
const T = TEACHING_BEAT_MS;

const ACCENT = "var(--accent)";
const BORDER = "var(--border)";
const MUTED = "var(--text-secondary)";
const PRIMARY = "var(--text-primary)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

const OFFICIAL_NODES = [
  "第4章 关键的“构建”决策",
  "4.1 选择编程语言",
  "语言描述",
  "4.2 编程约定",
  "4.3 你在技术浪潮中的位置",
  "“深入一种语言去编程”的例子",
  "4.4 选择主要的构建实践方法",
  "关键点",
] as const;

const STAGES = [
  {
    id: "constraints",
    label: "产品约束",
    detail: "先写交付边界、运行环境、风险和不能牺牲的质量属性。",
    evidence: "约束清单 + 验收窗口",
  },
  {
    id: "language",
    label: "语言选择",
    detail: "用任务和约束比较语言的表达力、工具链、运行时与团队熟悉度。",
    evidence: "候选对照 + 小型试验",
  },
  {
    id: "conventions",
    label: "约定基线",
    detail: "把命名、格式、错误处理和接口习惯写成可执行的共同默认值。",
    evidence: "约定样例 + lint / review",
  },
  {
    id: "practices",
    label: "实践组合",
    detail: "按风险选择测试、重构、集成和调试方式，不把潮流当作整包答案。",
    evidence: "实践清单 + 反馈节奏",
  },
  {
    id: "review",
    label: "决策复核",
    detail: "记录为何采用、何时重审和什么证据会让团队退出当前选择。",
    evidence: "决策记录 + 退出条件",
  },
] as const;

const SCENARIOS = [
  {
    id: "service",
    label: "跨平台服务",
    constraint: "端到端延迟、可观测性和部署环境比语法偏好更先决定候选集。",
    signal: "先测运行时与依赖，再讨论团队最熟悉的语言。",
  },
  {
    id: "embedded",
    label: "嵌入式控制",
    constraint: "内存、实时性、硬件工具链和故障安全边界是硬约束。",
    signal: "先用目标硬件或等价环境验证资源与时序，再扩大实现。",
  },
  {
    id: "data",
    label: "数据处理",
    constraint: "输入规模、失败可恢复性、批处理吞吐和结果可追踪性需要同看。",
    signal: "先用代表性数据验证库、性能和重跑策略，而不是只看示例代码。",
  },
] as const;

const CONVENTIONS = [
  {
    id: "explicit",
    label: "显式约定",
    detail: "边界、错误和命名都写清楚，适合多人协作和长期维护。",
  },
  {
    id: "lightweight",
    label: "轻量约定",
    detail: "只固定会影响接口、诊断和合并的部分，探索期保留局部弹性。",
  },
] as const;

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.id,
  caption: `${stage.label}：${stage.evidence}`,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type ScenarioId = (typeof SCENARIOS)[number]["id"];
type ConventionId = (typeof CONVENTIONS)[number]["id"];

function decisionStatus(
  faultInjected: boolean,
  scenario: ScenarioId,
  convention: ConventionId,
): { label: string; detail: string; color: string } {
  if (faultInjected) {
    return {
      label: "拒绝扩大实现",
      detail: "缺少约束或验证证据，先回到语言试验并补齐退出条件。",
      color: DANGER,
    };
  }
  if (scenario === "embedded" && convention === "lightweight") {
    return {
      label: "需要复核",
      detail: "资源与故障安全边界要求更明确的约定，再决定实践组合。",
      color: WARNING,
    };
  }
  return {
    label: "可以继续",
    detail: "选择仍受产品约束、可观察证据和明确的重审条件约束。",
    color: SUCCESS,
  };
}

export function Cc2e04ConstructionDecisionsMechanismLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("service");
  const [conventionId, setConventionId] = useState<ConventionId>("explicit");
  const [faultInjected, setFaultInjected] = useState(false);
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const linkRefs = useRef<Record<string, SVGLineElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((stage, index) => {
        const node = stageRefs.current[stage.id];
        if (node) {
          tl.add(
            node,
            { opacity: [0.38, 1], duration: T * 0.65 },
            T * index,
          );
        }
        tl.label(stage.id, T * index);
        if (index < STAGES.length - 1) {
          const link = linkRefs.current[STAGES[index + 1].id];
          if (link) {
            tl.add(
              link,
              { strokeWidth: [1.5, 4], duration: T * 0.45 },
              T * index,
            );
          }
        }
      });
    },
  });

  const scenario =
    SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0];
  const convention =
    CONVENTIONS.find((item) => item.id === conventionId) ?? CONVENTIONS[0];
  const status = decisionStatus(faultInjected, scenarioId, conventionId);
  const currentStage = STAGES[timeline.currentStep] ?? STAGES[0];

  const reset = () => {
    setScenarioId("service");
    setConventionId("explicit");
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="第4章构建决策因果实验"
      data-visual-kind="cc2e-04-construction-decisions-mechanism"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第4章 · 约束证据决策链
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            不从偏好出发：把构建选择变成可复核记录
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            选择项目情境、约定基线和故障注入，再沿五个节点观察决定应继续、复核还是拒绝。
          </p>
        </div>
        <span className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary">
          目录节点 {OFFICIAL_NODES.length}/8
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-3" aria-label="选择产品情境">
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scenarioId === item.id}
              onClick={() => setScenarioId(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                scenarioId === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs">{item.signal}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-medium text-secondary">约定基线</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {CONVENTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={conventionId === item.id}
                  onClick={() => setConventionId(item.id)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                    conventionId === item.id
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  <span className="block font-semibold">{item.label}</span>
                  <span className="mt-1 block text-xs">{item.detail}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 self-end rounded-control border border-border bg-surface px-3 py-2 text-sm text-primary">
            <input
              type="checkbox"
              checked={faultInjected}
              onChange={(event) => setFaultInjected(event.target.checked)}
              className="h-5 w-5 accent-accent"
            />
            <span>注入误区：先选熟悉语言，跳过约束与小型验证</span>
          </label>
        </div>

        <div className="mt-5 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`构建决策五节点因果图：${OFFICIAL_NODES.join("、")}。当前情境为${scenario.label}，约定为${convention.label}，当前阶段为${currentStage.label}，决策状态为${status.label}。图支持选择情境、切换约定、故障注入、播放、暂停、单步、拖动进度和重置。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[820px]"
          >
            <defs>
              <marker
                id="cc2e-construction-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill={ACCENT} />
              </marker>
            </defs>

            <text x="24" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
              五节点机制链：约束 → 选择 → 约定 → 实践 → 复核
            </text>
            <text x="24" y="54" fontSize="12" fill={MUTED}>
              {scenario.label} · {scenario.constraint}
            </text>

            <line x1="88" y1="190" x2="732" y2="190" stroke={BORDER} strokeWidth="8" strokeLinecap="round" />
            {STAGES.map((stage, index) => {
              const x = 88 + index * 161;
              const isCurrent = index === timeline.currentStep;
              return (
                <g
                  key={stage.id}
                  ref={(node) => {
                    stageRefs.current[stage.id] = node;
                  }}
                  style={{ opacity: index === 0 ? 1 : 0.38 }}
                >
                  <circle
                    cx={x}
                    cy="190"
                    r={isCurrent ? 27 : 23}
                    fill={isCurrent ? ACCENT : "var(--bg)"}
                    stroke={isCurrent ? ACCENT : BORDER}
                    strokeWidth="3"
                  />
                  <text x={x} y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill={isCurrent ? "var(--bg)" : PRIMARY}>
                    {index + 1}
                  </text>
                  <text x={x} y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill={PRIMARY}>
                    {stage.label}
                  </text>
                  <text x={x} y="267" textAnchor="middle" fontSize="12" fill={MUTED}>
                    {stage.evidence}
                  </text>
                  {index < STAGES.length - 1 ? (
                    <line
                      ref={(node) => {
                        linkRefs.current[STAGES[index + 1].id] = node;
                      }}
                      x1={x + 31}
                      y1="190"
                      x2={x + 130}
                      y2="190"
                      stroke={ACCENT}
                      strokeWidth="1.5"
                      markerEnd="url(#cc2e-construction-arrow)"
                    />
                  ) : null}
                </g>
              );
            })}

            <rect x="24" y="302" width="772" height="68" rx="12" fill="var(--bg)" stroke={BORDER} strokeWidth="1.5" />
            <text x="44" y="330" fontSize="13" fontWeight="700" fill={PRIMARY}>
              当前阶段：{currentStage.label} · {currentStage.detail}
            </text>
            <text x="44" y="353" fontSize="12" fill={MUTED}>
              产物：{currentStage.evidence} · 先预测，再用证据改变下一步
            </text>

            <rect x="24" y="390" width="772" height="72" rx="12" fill="var(--bg)" stroke={status.color} strokeWidth="2" strokeDasharray={faultInjected ? "7 5" : undefined} />
            <text x="44" y="420" fontSize="14" fontWeight="700" fill={status.color}>
              {status.label}
            </text>
            <text x="44" y="444" fontSize="12" fill={PRIMARY}>
              {status.detail}
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪一个约束会淘汰候选方案，再用步进检查你的判断。"
          reset={{ label: "重置实验", ariaLabel: "重置第4章构建决策实验", onClick: reset }}
        />

        <div className="mt-4 grid gap-3 rounded-card border border-border bg-surface p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-accent">当前选择</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {scenario.label} / {convention.label}
            </p>
            <p className="mt-1 text-xs leading-5 text-secondary">{scenario.constraint}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-warning">故障检查</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {faultInjected ? "已经跳过约束验证：记录应退回语言选择。" : "没有跳过验证：仍需保存复核条件。"}
            </p>
            <p className="mt-1 text-xs leading-5 text-secondary">结果不是分数，而是继续、复核或拒绝的下一步。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
