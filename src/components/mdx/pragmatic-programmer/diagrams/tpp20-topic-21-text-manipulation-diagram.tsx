"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import {
  DiagramCaption,
  DiagramTitle,
} from "../../poeaa-enterprise-patterns/poeaa-svg-primitives";

const BEAT = TEACHING_BEAT_MS;
const VIEW_W = 980;
const VIEW_H = 430;
const CARD_W = 162;
const CARD_H = 158;
const START_X = 24;
const START_Y = 98;
const GAP = 25;

const COLOR = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const STAGES = [
  {
    key: "source",
    title: "文本源",
    detail: "log / CSV / code",
    handoff: "保留原始行",
  },
  {
    key: "parse",
    title: "解析",
    detail: "字段与记录",
    handoff: "结构化对象",
  },
  {
    key: "filter",
    title: "筛选",
    detail: "边界与匹配",
    handoff: "接受或拒绝",
  },
  {
    key: "transform",
    title: "变换",
    detail: "map / replace",
    handoff: "批量结果",
  },
  {
    key: "verify",
    title: "校验",
    detail: "抽样与总量",
    handoff: "可交付报告",
  },
] as const;

const STEPS: readonly TeachingStep[] = STAGES.map((stage, index) => ({
  label: stage.key,
  caption: `${index + 1}. ${stage.title}：${stage.handoff}`,
}));

const LABELS: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const TOPIC_PROMPT = "提示35：学习一门文本处理语言";

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function lessonFocus(step?: 1 | 2 | 3) {
  return step ? [0, 2, 4][step - 1] : 0;
}

function arrowPath(index: number) {
  const y = START_Y + CARD_H / 2;
  return `M ${stageX(index) + CARD_W + 4} ${y} H ${stageX(index + 1) - 8}`;
}

function StageCard({
  index,
  active,
  reached,
  faulty = false,
}: {
  index: number;
  active: boolean;
  reached: boolean;
  faulty?: boolean;
}) {
  const stage = STAGES[index];
  const x = stageX(index);
  const tone = faulty ? COLOR.danger : active ? COLOR.accent : COLOR.primary;

  return (
    <g
      aria-label={`${stage.title}：${stage.detail}`}
      opacity={reached ? 1 : 0.34}
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
      <circle
        cx={x + 24}
        cy={START_Y + 24}
        r="12"
        fill={tone}
        fillOpacity="0.18"
        stroke={tone}
      />
      <text
        x={x + 24}
        y={START_Y + 28}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={tone}
      >
        {index + 1}
      </text>
      <text
        x={x + CARD_W / 2 + 8}
        y={START_Y + 30}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={tone}
      >
        {stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 80}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={faulty ? COLOR.danger : COLOR.secondary}
      >
        {faulty ? "规则缺失" : stage.detail}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 112}
        textAnchor="middle"
        fontSize="12"
        fill={faulty ? COLOR.danger : COLOR.secondary}
      >
        {faulty ? "首差：筛选" : `交付：${stage.handoff}`}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 140}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? COLOR.danger : COLOR.primary}
      >
        {faulty ? "拒绝继续变换" : "输入与输出可记录"}
      </text>
    </g>
  );
}

function PipelineArrows({ markerId }: { markerId: string }) {
  return (
    <g fill="none" stroke={COLOR.border} strokeWidth="1.5">
      {STAGES.slice(0, -1).map((stage, index) => (
        <path
          key={`${stage.key}-to-${STAGES[index + 1].key}`}
          d={arrowPath(index)}
          markerEnd={`url(#${markerId})`}
        />
      ))}
    </g>
  );
}

function ContractBand({ failed }: { failed: boolean }) {
  return (
    <g>
      <rect
        x="68"
        y="326"
        width="844"
        height="62"
        rx="12"
        fill={failed ? COLOR.danger : COLOR.accent}
        fillOpacity="0.08"
        stroke={failed ? COLOR.danger : COLOR.border}
      />
      <text
        x={VIEW_W / 2}
        y="351"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={failed ? COLOR.danger : COLOR.primary}
      >
        {failed
          ? "拒绝：正则边界缺失，不能把未筛选文本交给变换步骤"
          : "验收合同：每次交接都留下原文、结构、决定、结果与校验"}
      </text>
      <text
        x={VIEW_W / 2}
        y="373"
        textAnchor="middle"
        fontSize="11"
        fill={failed ? COLOR.danger : COLOR.secondary}
      >
        {failed
          ? "修法：恢复边界规则，重放整批输入，并比较拒绝数与输出总量"
          : "批量不等于盲目循环：无法解析的输入必须单独报告，不能静默丢弃"}
      </text>
    </g>
  );
}

function usePipelineTimeline(
  refs: readonly React.MutableRefObject<SVGGElement | null>[],
) {
  return useTeachingTimeline({
    steps: STEPS,
    build: (timeline) => {
      refs.forEach((ref, index) => {
        timeline.add(
          ref.current!,
          {
            opacity: index === 0 ? [1, 1] : [0, 1],
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

function PipelineSvg({
  refs,
  markerId,
  focus,
  faultyStage,
  failed,
  ariaLabel,
}: {
  refs: readonly React.MutableRefObject<SVGGElement | null>[];
  markerId: string;
  focus: number;
  faultyStage?: number;
  failed: boolean;
  ariaLabel: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="mx-auto block h-auto w-full max-w-[980px]"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 z" fill={COLOR.secondary} />
        </marker>
      </defs>
      <DiagramTitle
        x={VIEW_W / 2}
        y={32}
        text="21 文本处理：先交接结构，再批量变换"
      />
      <text
        x={VIEW_W / 2}
        y="59"
        textAnchor="middle"
        fontSize="12"
        fill={COLOR.secondary}
      >
        文本源 → 解析 → 筛选 → 变换 → 校验：每个节点都能拒绝不合格输入
      </text>
      <PipelineArrows markerId={markerId} />
      {STAGES.map((stage, index) => (
        <g
          key={stage.key}
          ref={refs[index]}
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          <StageCard
            index={index}
            active={index === focus}
            reached={index <= focus}
            faulty={faultyStage === index}
          />
        </g>
      ))}
      <ContractBand failed={failed} />
      <DiagramCaption
        x={VIEW_W / 2}
        y={412}
        text="先保存无法解析的输入，再谈速度；结果校验必须能重放"
      />
    </svg>
  );
}

export function Tpp20Topic21TextManipulationDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  const refs = [
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
  ] as const;
  const timeline = usePipelineTimeline(refs);
  const focus = step === undefined ? timeline.currentStep : lessonFocus(step);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-21-text-manipulation-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <PipelineSvg
          refs={refs}
          markerId="tpp20-topic21-pipeline-arrow"
          focus={focus}
          failed={false}
          ariaLabel="21 文本处理专属流程图。可播放、暂停、单步和拖动进度，依次展示文本源、结构解析、正则边界、批处理和结果校验。"
        />
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption="沿着五个交接点观察：原始文本何时变成结构，规则何时决定接受或拒绝。"
          reset={{
            label: "重置图示",
            ariaLabel: "重置文本处理流程图",
            onClick: () => timeline.goToStep(0),
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文本处理的速度来自清晰的交接合同，而不是把解析、筛选和变换揉成一行脚本。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic21TextManipulationLab() {
  const refs = [
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
  ] as const;
  const [faultInjected, setFaultInjected] = useState(false);
  const timeline = usePipelineTimeline(refs);
  const failed = faultInjected && timeline.currentStep >= 2;

  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-21-text-manipulation-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            {TOPIC_PROMPT} · 单故障实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：删除正则边界"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：正则边界缺失" : "注入单故障"}
          </button>
        </div>
        <PipelineSvg
          refs={refs}
          markerId="tpp20-topic21-lab-arrow"
          focus={timeline.currentStep}
          faultyStage={failed ? 2 : undefined}
          failed={failed}
          ariaLabel="21 文本处理故障实验台。可注入删除正则边界的故障，再逐步经过文本源、解析、筛选、变换和校验；故障会在筛选处停下。"
        />
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {failed
            ? "首差：筛选。没有正则边界，系统不能证明哪些行应该进入变换。"
            : `第 ${timeline.currentStep + 1} / ${STAGES.length} 步：${STAGES[timeline.currentStep].title} 已交付 ${STAGES[timeline.currentStep].handoff}。`}
        </p>
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption="先预测首差，再注入故障；重置后应回到完整输入、第一节点和未注入状态。"
          reset={{
            label: "重置实验台",
            ariaLabel: "重置文本处理实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除边界规则不会让批处理更快，只会把无法解释的行偷偷推向下游。
      </figcaption>
    </figure>
  );
}
