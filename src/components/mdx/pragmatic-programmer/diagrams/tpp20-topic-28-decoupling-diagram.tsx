"use client";

import { useId, useRef, useState, type MutableRefObject } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const BEAT = TEACHING_BEAT_MS;
const VIEW_W = 1020;
const VIEW_H = 520;
const CARD_W = 178;
const CARD_H = 188;
const START_X = 22;
const START_Y = 124;
const GAP = 18;

const COLOR = {
  accent: "var(--accent)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  danger: "var(--danger)",
} as const;

const STAGES = [
  {
    key: "coupling",
    title: "耦合",
    evidence: "数据 / 控制 / 时间",
    detail: "先画出依赖边",
    note: "变化从哪里进入？",
  },
  {
    key: "call-chain",
    title: "调用链",
    evidence: "谁调用谁？",
    detail: "停止跨对象索取",
    note: "责任在哪一层？",
  },
  {
    key: "global-state",
    title: "全局数据",
    evidence: "谁拥有状态？",
    detail: "首差：全局旁路",
    note: "能否移除共享写入？",
  },
  {
    key: "command-query",
    title: "命令查询",
    evidence: "意图与结果分开",
    detail: "命令只改自己的状态",
    note: "调用者需要知道什么？",
  },
  {
    key: "api-boundary",
    title: "API 边界",
    evidence: "变化停在契约",
    detail: "重放并验证首差",
    note: "下游收到什么？",
  },
] as const;

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.title}：${stage.detail}`,
}));

const LABELS: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

// Keep the five official prompt coordinates in the visual corpus so every
// manifest concept has a visible home in this chapter-specific diagram.
const TOPIC_PROMPTS = [
  "提示44：解耦代码让改变更容易",
  "提示45：只管命令不要询问",
  "提示46：不要链式调用方法",
  "提示47：避免全局数据",
  "提示48：如果全局唯一非常重要，那么将它包装到API 中",
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForLesson(step?: 1 | 2 | 3) {
  if (step === 1) return 0;
  if (step === 2) return 2;
  if (step === 3) return 4;
  return 0;
}

function StageCard({
  index,
  active,
  reached,
  faulty,
}: {
  index: number;
  active: boolean;
  reached: boolean;
  faulty: boolean;
}) {
  const stage = STAGES[index];
  const tone = faulty ? COLOR.danger : active ? COLOR.accent : COLOR.primary;
  const x = stageX(index);

  return (
    <g
      aria-label={`${stage.title}：${stage.evidence}`}
      opacity={reached ? 1 : 0.38}
    >
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={COLOR.elevated}
        stroke={faulty ? COLOR.danger : active ? COLOR.accent : COLOR.border}
        strokeWidth={faulty || active ? "2" : "1.2"}
      />
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height="48"
        rx="12"
        fill={tone}
        fillOpacity={faulty || active ? "0.16" : "0.07"}
      />
      <rect
        x={x}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={faulty || active ? "0.16" : "0.07"}
      />
      <text
        x={x + CARD_W / 2}
        y={START_Y + 30}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={tone}
      >
        {faulty ? "首差：全局数据" : stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 82}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={faulty ? COLOR.danger : COLOR.primary}
      >
        {stage.evidence}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 116}
        textAnchor="middle"
        fontSize="12"
        fill={faulty ? COLOR.danger : COLOR.secondary}
      >
        {faulty ? "变化绕过 API 边界" : stage.detail}
      </text>
      <line
        x1={x + 18}
        y1={START_Y + 138}
        x2={x + CARD_W - 18}
        y2={START_Y + 138}
        stroke={faulty ? COLOR.danger : COLOR.border}
        strokeOpacity="0.8"
      />
      <text
        x={x + CARD_W / 2}
        y={START_Y + 166}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? COLOR.danger : COLOR.secondary}
      >
        {faulty ? "停止并记录首差" : stage.note}
      </text>
    </g>
  );
}

function DecouplingSvg({
  refs,
  markerId,
  focus,
  fault,
  ariaLabel,
}: {
  refs: readonly MutableRefObject<SVGGElement | null>[];
  markerId: string;
  focus: number;
  fault: boolean;
  ariaLabel: string;
}) {
  const firstChanged = fault && focus >= 2;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="mx-auto block h-auto w-full max-w-[1020px]"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
        >
          <path d="M0 0 L9 4.5 L0 9 z" fill={COLOR.accent} />
        </marker>
      </defs>

      <text
        x={VIEW_W / 2}
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLOR.primary}
      >
        解耦路径：让变化停在拥有数据的 API 边界
      </text>
      <text
        x={VIEW_W / 2}
        y="60"
        textAnchor="middle"
        fontSize="12"
        fill={COLOR.secondary}
      >
        画出依赖 → 找到责任 → 只发命令 → 封装状态 → 重放验证
      </text>

      {STAGES.slice(0, -1).map((stage, index) => {
        const x1 = stageX(index) + CARD_W + 4;
        const x2 = stageX(index + 1) - 8;
        const y = START_Y + CARD_H / 2;
        const active = index < focus;
        const broken = firstChanged && index >= 2;
        return (
          <line
            key={`${stage.key}-to-${STAGES[index + 1].key}`}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke={
              broken ? COLOR.danger : active ? COLOR.accent : COLOR.border
            }
            strokeWidth={broken || active ? "2" : "1.2"}
            strokeDasharray={broken ? "7 4" : undefined}
            markerEnd={`url(#${markerId})`}
          />
        );
      })}

      {STAGES.map((stage, index) => (
        <g key={stage.key}>
          <StageCard
            index={index}
            active={index === focus}
            reached={index <= focus}
            faulty={firstChanged && index === 2}
          />
          <g
            ref={refs[index]}
            style={{ opacity: index <= focus ? 1 : 0.18 }}
            aria-hidden="true"
          >
            <circle
              cx={stageX(index) + 22}
              cy={START_Y + 24}
              r="11"
              fill={firstChanged && index === 2 ? COLOR.danger : COLOR.accent}
              fillOpacity="0.18"
              stroke={firstChanged && index === 2 ? COLOR.danger : COLOR.accent}
            />
            <text
              x={stageX(index) + 22}
              y={START_Y + 28}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={firstChanged && index === 2 ? COLOR.danger : COLOR.accent}
            >
              {index + 1}
            </text>
          </g>
        </g>
      ))}

      <rect
        x="42"
        y="350"
        width="936"
        height="96"
        rx="12"
        fill={firstChanged ? COLOR.danger : COLOR.elevated}
        fillOpacity={firstChanged ? "0.08" : "1"}
        stroke={firstChanged ? COLOR.danger : COLOR.border}
        strokeWidth="1.2"
      />
      <text
        x={VIEW_W / 2}
        y="381"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={firstChanged ? COLOR.danger : COLOR.accent}
      >
        {firstChanged
          ? "首差：全局数据绕过所有者，后续节点没有可信输入"
          : "验收合同：只改一个实现，只有声明的 API 结果穿过边界"}
      </text>
      <text
        x={VIEW_W / 2}
        y="407"
        textAnchor="middle"
        fontSize="12"
        fill={COLOR.secondary}
      >
        {firstChanged
          ? "修法：停止旁路写入，恢复原始输入，从边界重放并检查拒绝条件"
          : "必要依赖留下 owner、输入、输出与失败动作；不相关变化在边界停止"}
      </text>
      <text
        x={VIEW_W / 2}
        y="432"
        textAnchor="middle"
        fontSize="11"
        fill={COLOR.secondary}
      >
        {TOPIC_PROMPTS[focus === 4 ? 4 : focus >= 2 ? 2 : focus]}
      </text>
      <text
        x={VIEW_W / 2}
        y="492"
        textAnchor="middle"
        fontSize="12"
        fill={COLOR.secondary}
      >
        先预测首差，再推进一个节点；重置后应能用同一输入重建结论。
      </text>
    </svg>
  );
}

function useDecouplingTimeline(
  refs: readonly MutableRefObject<SVGGElement | null>[],
) {
  return useTeachingTimeline({
    steps: STEPS,
    build: (timeline) => {
      refs.forEach((ref, index) => {
        if (!ref.current) return;
        timeline.add(
          ref.current,
          {
            opacity: index === 0 ? [1, 1] : [0.18, 1],
            duration: BEAT * 0.55,
            ease: "out(3)",
          },
          BEAT * index,
        );
        timeline.label(STEPS[index].label, BEAT * index);
      });
    },
  });
}

function useDiagramRefs() {
  return [
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
  ] as const;
}

export function Tpp20Topic28DecouplingDiagram({ step }: { step?: 1 | 2 | 3 }) {
  const refs = useDiagramRefs();
  const timeline = useDecouplingTimeline(refs);
  const focus =
    step === undefined ? timeline.currentStep : focusForLesson(step);
  const markerId = `tpp20-topic28-arrow-${useId().replace(/:/g, "")}`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-28-decoupling-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <DecouplingSvg
          refs={refs}
          markerId={markerId}
          focus={focus}
          fault={false}
          ariaLabel="28 解耦专属五节点图，展示耦合、调用链、全局数据、命令查询和 API 边界；动画可播放、暂停、单步和拖动。"
        />
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption="每一步只把一个依赖变成可观察的边界合同。"
          reset={{
            label: "重置图示",
            ariaLabel: "重置解耦教学图",
            onClick: () => timeline.goToStep(0),
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        解耦的目标不是删除所有协作，而是让必要协作可见、可拒绝、可重放。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic28DecouplingLab() {
  const refs = useDiagramRefs();
  const timeline = useDecouplingTimeline(refs);
  const [faultInjected, setFaultInjected] = useState(false);
  const markerId = `tpp20-topic28-lab-arrow-${useId().replace(/:/g, "")}`;
  const failed = faultInjected && timeline.currentStep >= 2;
  const status = failed
    ? "首差：全局数据。停止旁路写入，记录 owner 与状态，再从原始输入重放。"
    : faultInjected
      ? "故障已注入；推进到第 3 步，观察共享状态如何成为首差。"
      : `第 ${timeline.currentStep + 1} / ${STAGES.length} 步：${STAGES[timeline.currentStep].title} 已留下边界证据。`;

  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-28-decoupling-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 28 · 解耦边界实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入全局数据旁路故障"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：全局数据旁路" : "注入全局数据故障"}
          </button>
        </div>
        <DecouplingSvg
          refs={refs}
          markerId={markerId}
          focus={timeline.currentStep}
          fault={faultInjected}
          ariaLabel="解耦边界交互实验台，可逐步观察五个节点，并注入全局数据旁路故障；故障在全局数据节点暴露。"
        />
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption="先预测全局旁路会在哪里变成首差，再重置并比较修复后的边界。"
          reset={{
            label: "重置实验台",
            ariaLabel: "重置解耦边界实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故障开关只移除状态所有权这一项条件；其余输入保持不变，差异才有意义。
      </figcaption>
    </figure>
  );
}
