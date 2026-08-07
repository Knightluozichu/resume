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
const VIEW_H = 470;
const CARD_W = 168;
const CARD_H = 192;
const START_X = 30;
const START_Y = 104;
const GAP = 20;

const COLOR = {
  accent: "var(--accent)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  success: "var(--success)",
  danger: "var(--danger)",
} as const;

const STAGES = [
  {
    key: "question",
    title: "问题",
    evidence: "09:10 · incident-42",
    handoff: "可追问的对象",
    note: "用户看到什么？",
  },
  {
    key: "hypothesis",
    title: "假设",
    evidence: "重试放大延迟",
    handoff: "待验证的解释",
    note: "现在还不知道什么？",
  },
  {
    key: "decision",
    title: "决定",
    evidence: "只改超时边界",
    handoff: "一变量干预",
    note: "为什么选这一步？",
  },
  {
    key: "operation",
    title: "操作",
    evidence: "replay --case 42",
    handoff: "可观察实验",
    note: "命令与版本是什么？",
  },
  {
    key: "outcome",
    title: "结果",
    evidence: "18s → 2s",
    handoff: "结果与后续",
    note: "谁来复核、何时重看？",
  },
] as const;

const STEPS: readonly TeachingStep[] = STAGES.map((stage, index) => ({
  label: stage.key,
  caption: `${index + 1}. ${stage.title}：${stage.handoff}`,
}));

const LABELS: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForLesson(step?: 1 | 2 | 3) {
  return step ? [0, 2, 4][step - 1] : 0;
}

function RecordCard({
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
  const x = stageX(index);
  const tone = faulty ? COLOR.danger : active ? COLOR.accent : COLOR.primary;

  return (
    <g
      aria-label={`${stage.title}记录：${stage.evidence}`}
      opacity={reached ? 1 : 0.32}
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
        fillOpacity={faulty || active ? "0.17" : "0.07"}
      />
      <rect
        x={x}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={faulty || active ? "0.17" : "0.07"}
      />
      <circle
        cx={x + 25}
        cy={START_Y + 24}
        r="12"
        fill={tone}
        fillOpacity="0.16"
        stroke={tone}
      />
      <text
        x={x + 25}
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
        y={START_Y + 82}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={faulty ? COLOR.danger : COLOR.primary}
      >
        {faulty ? "缺少决策理由" : stage.evidence}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 116}
        textAnchor="middle"
        fontSize="12"
        fill={faulty ? COLOR.danger : COLOR.secondary}
      >
        {faulty ? "不能解释为何执行" : `交接：${stage.handoff}`}
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
        y={START_Y + 164}
        textAnchor="middle"
        fontSize="11"
        fill={faulty ? COLOR.danger : COLOR.secondary}
      >
        {faulty ? "首差：操作" : stage.note}
      </text>
    </g>
  );
}

function TimelineSpine({ markerId }: { markerId: string }) {
  const y = START_Y + CARD_H / 2;
  return (
    <g fill="none" stroke={COLOR.border} strokeWidth="1.5">
      {STAGES.slice(0, -1).map((stage, index) => (
        <path
          key={`${stage.key}-to-${STAGES[index + 1].key}`}
          d={`M ${stageX(index) + CARD_W + 4} ${y} H ${stageX(index + 1) - 8}`}
          markerEnd={`url(#${markerId})`}
        />
      ))}
      <path
        d={`M ${START_X + CARD_W / 2} ${START_Y - 24} V ${START_Y - 8}`}
        markerEnd={`url(#${markerId})`}
      />
    </g>
  );
}

function EvidenceBand({ failed }: { failed: boolean }) {
  return (
    <g>
      <rect
        x="54"
        y="332"
        width="872"
        height="74"
        rx="12"
        fill={failed ? COLOR.danger : COLOR.accent}
        fillOpacity="0.08"
        stroke={failed ? COLOR.danger : COLOR.border}
      />
      <text
        x={VIEW_W / 2}
        y="358"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={failed ? COLOR.danger : COLOR.primary}
      >
        {failed
          ? "拒绝：没有决策理由，操作记录无法证明它回应了哪个假设"
          : "日记合同：日期、问题、决定、命令、结果与后续必须能互相指向"}
      </text>
      <text
        x={VIEW_W / 2}
        y="382"
        textAnchor="middle"
        fontSize="11"
        fill={failed ? COLOR.danger : COLOR.secondary}
      >
        {failed
          ? "修法：补回理由后从原始输入重放，不要手工改写最后一个结果"
          : "保存当时未知的假设；未来复核者先看输入与证据，再看作者的解释"}
      </text>
    </g>
  );
}

function DaybookSvg({
  refs,
  markerId,
  focus,
  failed,
  ariaLabel,
}: {
  refs: readonly React.MutableRefObject<SVGGElement | null>[];
  markerId: string;
  focus: number;
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
        text="22 工程日记：把一次决定固定在时间线上"
      />
      <text
        x={VIEW_W / 2}
        y="59"
        textAnchor="middle"
        fontSize="12"
        fill={COLOR.secondary}
      >
        问题 → 假设 → 决定 → 操作 → 结果：每个交接都留下可追问的证据
      </text>
      <text
        x={START_X + CARD_W / 2}
        y="84"
        textAnchor="middle"
        fontSize="11"
        fill={COLOR.secondary}
      >
        时间坐标
      </text>
      <TimelineSpine markerId={markerId} />
      {STAGES.map((stage, index) => (
        <g
          key={stage.key}
          ref={refs[index]}
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          <RecordCard
            index={index}
            active={index === focus}
            reached={index <= focus}
            faulty={failed && index === 2}
          />
        </g>
      ))}
      <EvidenceBand failed={failed} />
      <DiagramCaption
        x={VIEW_W / 2}
        y={440}
        text="好的日记不是流水账：它让未来的复核者重建当时的选择与未知"
      />
    </svg>
  );
}

function useDaybookTimeline(
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

export function Tpp20Topic22EngineeringDaybooksDiagram({
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
  const timeline = useDaybookTimeline(refs);
  const focus = step === undefined ? timeline.currentStep : focusForLesson(step);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-22-engineering-daybooks-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <DaybookSvg
          refs={refs}
          markerId="tpp20-topic22-daybook-arrow"
          focus={focus}
          failed={false}
          ariaLabel="22 工程日记专属时间轴。可播放、暂停、单步和拖动进度，依次展示问题、假设、决定、操作和结果如何在日期坐标上交接。"
        />
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption="沿时间轴观察：哪一条记录让未来的复核者知道当时为何采取这一步。"
          reset={{
            label: "重置图示",
            ariaLabel: "重置工程日记时间轴",
            onClick: () => timeline.goToStep(0),
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工程日记把短暂的决定变成可重放的交接，而不是事后凭记忆补写故事。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic22EngineeringDaybooksLab() {
  const refs = [
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
  ] as const;
  const [faultInjected, setFaultInjected] = useState(false);
  const timeline = useDaybookTimeline(refs);
  const failed = faultInjected && timeline.currentStep >= 2;

  const reset = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-22-engineering-daybooks-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 22 · 单故障实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：删除决策理由"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：决策理由缺失" : "注入单故障"}
          </button>
        </div>
        <DaybookSvg
          refs={refs}
          markerId="tpp20-topic22-lab-arrow"
          focus={timeline.currentStep}
          failed={failed}
          ariaLabel="22 工程日记故障实验台。可注入删除决策理由的故障，再逐步经过问题、假设、决定、操作和结果；故障在操作处暴露。"
        />
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {failed
            ? "首差：操作。缺少决策理由，命令无法证明它回应了哪个假设。"
            : `第 ${timeline.currentStep + 1} / ${STAGES.length} 步：${STAGES[timeline.currentStep].title} 已写入日记。`}
        </p>
        <TimelineControls
          timeline={timeline}
          labelText={LABELS}
          caption="先预测首差，再注入故障；重置后应回到第一条记录与未注入状态。"
          reset={{
            label: "重置实验台",
            ariaLabel: "重置工程日记故障实验台",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除一行理由不会让记录更简洁，只会让下一位工程师无法判断这次操作为何合理。
      </figcaption>
    </figure>
  );
}
