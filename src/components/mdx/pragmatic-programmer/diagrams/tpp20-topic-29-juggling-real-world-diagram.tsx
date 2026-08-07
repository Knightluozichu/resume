"use client";

import { useId, useState } from "react";

const VIEW_W = 980;
const VIEW_H = 540;
const CARD_W = 170;
const CARD_H = 178;
const CARD_Y = 132;
const CARD_GAP = 18;
const CARD_X = 24;

const COLORS = {
  accent: "var(--accent)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  danger: "var(--danger)",
  success: "var(--success)",
} as const;

const STAGES = [
  {
    key: "receive",
    title: "接收",
    evidence: "保存原始输入",
    detail: "eventId + seq",
    note: "先留证，不急着改变状态",
  },
  {
    key: "classify",
    title: "分类",
    evidence: "判断事件类型",
    detail: "允许 / 延迟 / 拒绝",
    note: "把未知输入停在边界",
  },
  {
    key: "order",
    title: "排序",
    evidence: "按序列号重排",
    detail: "seq 先于副作用",
    note: "迟到事件不能倒退状态",
  },
  {
    key: "dedupe",
    title: "去重",
    evidence: "幂等地应用一次",
    detail: "seen[eventId]",
    note: "重复输入不重复扣款",
  },
  {
    key: "recover",
    title: "恢复",
    evidence: "重放与背压",
    detail: "记录首差再重试",
    note: "慢下游不能吞掉输入",
  },
] as const;

type StageIndex = 0 | 1 | 2 | 3 | 4;

function stageX(index: number) {
  return CARD_X + index * (CARD_W + CARD_GAP);
}

function lessonFocus(step?: 1 | 2 | 3): StageIndex {
  if (step === 1) return 0;
  if (step === 2) return 2;
  if (step === 3) return 4;
  return 0;
}

function StageCard({
  stage,
  index,
  active,
  reached,
  fault,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  active: boolean;
  reached: boolean;
  fault: boolean;
}) {
  const tone = fault ? COLORS.danger : active ? COLORS.accent : COLORS.primary;
  const x = stageX(index);

  return (
    <g
      aria-label={`${stage.title}：${stage.evidence}`}
      opacity={reached ? 1 : 0.42}
    >
      <rect
        x={x}
        y={CARD_Y}
        width={CARD_W}
        height={CARD_H}
        rx="14"
        fill={COLORS.elevated}
        stroke={fault ? COLORS.danger : active ? COLORS.accent : COLORS.border}
        strokeWidth={fault || active ? "2" : "1.2"}
      />
      <rect
        x={x}
        y={CARD_Y}
        width={CARD_W}
        height="50"
        rx="14"
        fill={tone}
        fillOpacity={fault || active ? "0.16" : "0.07"}
      />
      <rect
        x={x}
        y={CARD_Y + 38}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={fault || active ? "0.16" : "0.07"}
      />
      <circle
        cx={x + 24}
        cy={CARD_Y + 25}
        r="11"
        fill={tone}
        fillOpacity="0.18"
        stroke={tone}
      />
      <text
        x={x + 24}
        y={CARD_Y + 29}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={tone}
      >
        {index + 1}
      </text>
      <text
        x={x + 104}
        y={CARD_Y + 31}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={tone}
      >
        {fault ? "首差" : stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={CARD_Y + 83}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault ? COLORS.danger : COLORS.primary}
      >
        {fault ? "迟到事件越过边界" : stage.evidence}
      </text>
      <text
        x={x + CARD_W / 2}
        y={CARD_Y + 116}
        textAnchor="middle"
        fontSize="12"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault ? "停止副作用" : stage.detail}
      </text>
      <line
        x1={x + 18}
        y1={CARD_Y + 138}
        x2={x + CARD_W - 18}
        y2={CARD_Y + 138}
        stroke={fault ? COLORS.danger : COLORS.border}
        strokeOpacity="0.8"
      />
      <text
        x={x + CARD_W / 2}
        y={CARD_Y + 161}
        textAnchor="middle"
        fontSize="11"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault ? "记录首差并回退" : stage.note}
      </text>
    </g>
  );
}

function EventChip({
  x,
  y,
  label,
  tone,
  opacity = 1,
}: {
  x: number;
  y: number;
  label: string;
  tone: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y={y}
        width="132"
        height="34"
        rx="17"
        fill={tone}
        fillOpacity="0.12"
        stroke={tone}
        strokeWidth="1.2"
      />
      <text
        x={x + 66}
        y={y + 22}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={tone}
      >
        {label}
      </text>
    </g>
  );
}

function JugglingSvg({
  focus,
  fault,
  markerId,
  ariaLabel,
}: {
  focus: StageIndex;
  fault: boolean;
  markerId: string;
  ariaLabel: string;
}) {
  const faultActive = fault && focus >= 2;
  const eventOpacity = focus >= 1 ? 1 : 0.7;

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
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
        >
          <path d="M0 0 L9 4.5 L0 9 z" fill={COLORS.accent} />
        </marker>
      </defs>

      <text
        x={VIEW_W / 2}
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.primary}
      >
        现实输入的抛球路径：先排好球，再允许副作用
      </text>
      <text
        x={VIEW_W / 2}
        y="57"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        输入身份 → 事件分类 → 时序判断 → 一次应用 → 可重放恢复
      </text>

      <rect
        x="30"
        y="76"
        width="920"
        height="42"
        rx="12"
        fill={faultActive ? COLORS.danger : COLORS.accent}
        fillOpacity="0.07"
        stroke={faultActive ? COLORS.danger : COLORS.border}
      />
      <text x="48" y="101" fontSize="12" fontWeight="700" fill={COLORS.primary}>
        输入队列
      </text>
      <EventChip
        x={142}
        y={80}
        label="e-101 · seq 1"
        tone={COLORS.accent}
        opacity={eventOpacity}
      />
      <EventChip
        x={288}
        y={80}
        label="e-103 · seq 3"
        tone={fault ? COLORS.danger : COLORS.accent}
        opacity={eventOpacity}
      />
      <EventChip
        x={434}
        y={80}
        label="e-102 · seq 2"
        tone={fault ? COLORS.danger : COLORS.accent}
        opacity={eventOpacity}
      />
      <EventChip
        x={580}
        y={80}
        label="e-101 · 重复"
        tone={COLORS.secondary}
        opacity={focus >= 3 ? 1 : 0.55}
      />
      <text
        x="730"
        y="101"
        fontSize="12"
        fill={faultActive ? COLORS.danger : COLORS.secondary}
      >
        {faultActive ? "故障：seq 3 直达副作用" : "同一批输入保持不变"}
      </text>

      {STAGES.slice(0, -1).map((stage, index) => {
        const x1 = stageX(index) + CARD_W + 4;
        const x2 = stageX(index + 1) - 8;
        const y = CARD_Y + CARD_H / 2;
        const passed = index < focus;
        const broken = faultActive && index >= 2;
        return (
          <line
            key={`${stage.key}-${STAGES[index + 1].key}`}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke={
              broken ? COLORS.danger : passed ? COLORS.accent : COLORS.border
            }
            strokeWidth={broken || passed ? "2" : "1.2"}
            strokeDasharray={broken ? "7 4" : undefined}
            markerEnd={`url(#${markerId})`}
          />
        );
      })}

      {STAGES.map((stage, index) => (
        <StageCard
          key={stage.key}
          stage={stage}
          index={index}
          active={index === focus}
          reached={index <= focus}
          fault={faultActive && index === 2}
        />
      ))}

      <rect
        x="40"
        y="346"
        width="900"
        height="108"
        rx="14"
        fill={faultActive ? COLORS.danger : COLORS.elevated}
        fillOpacity={faultActive ? "0.08" : "1"}
        stroke={faultActive ? COLORS.danger : COLORS.border}
      />
      <text
        x={VIEW_W / 2}
        y="378"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={faultActive ? COLORS.danger : COLORS.success}
      >
        {faultActive
          ? "首差：迟到的 seq 3 越过排序，副作用没有可信顺序"
          : "验收合同：重复与乱序只能改变证据，不得重复改变外部世界"}
      </text>
      <text
        x={VIEW_W / 2}
        y="406"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        {faultActive
          ? "修法：拒绝这次副作用，恢复输入队列，从排序节点重放"
          : "每个输入都有身份、顺序、接受/拒绝理由与恢复动作"}
      </text>
      <text
        x={VIEW_W / 2}
        y="432"
        textAnchor="middle"
        fontSize="11"
        fill={COLORS.secondary}
      >
        {faultActive
          ? "不要手工补写最后一个状态；保留首差才可复核"
          : "先预测首个变化节点，再逐步推进并保存记录"}
      </text>
      <text
        x={VIEW_W / 2}
        y="502"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        {`当前观察点：${STAGES[focus].title} · ${STAGES[focus].evidence}`}
      </text>
    </svg>
  );
}

const STEP_LABELS = {
  1: "接收：先留住原始事件",
  2: "排序：让迟到事件等待",
  3: "恢复：从首差处重放",
} as const;

export function Tpp20Topic29JugglingRealWorldDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  const markerId = `tpp20-topic29-arrow-${useId().replace(/:/g, "")}`;
  const focus = lessonFocus(step);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-29-juggling-real-world-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <JugglingSvg
          focus={focus}
          fault={false}
          markerId={markerId}
          ariaLabel="29 在现实世界中抛球杂耍专属事件路径图，展示接收、分类、排序、去重和恢复五个节点。"
        />
        <p className="mt-2 text-center text-xs text-secondary">
          {step
            ? STEP_LABELS[step]
            : "逐步观察：把一次输入变成可重放的状态变化。"}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        现实世界的输入不会整齐到达；可靠性来自保存顺序与恢复证据，而不是假设它们会整齐到达。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic29JugglingRealWorldLab() {
  const [focus, setFocus] = useState<StageIndex>(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const markerId = `tpp20-topic29-lab-${useId().replace(/:/g, "")}`;
  const faultActive = faultInjected && focus >= 2;

  const reset = () => {
    setFocus(0);
    setFaultInjected(false);
  };

  const status = faultActive
    ? "首差在排序之后出现：停止副作用，记录 seq 3，再从原始队列重放。"
    : faultInjected
      ? "故障已注入；推进到排序节点，观察迟到事件何时越界。"
      : `第 ${focus + 1} / ${STAGES.length} 步：${STAGES[focus].title} 已留下证据。`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-29-juggling-real-world-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 29 · 事件时序实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入乱序故障"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：seq 3 先到" : "注入乱序故障"}
          </button>
        </div>

        <JugglingSvg
          focus={focus}
          fault={faultInjected}
          markerId={markerId}
          ariaLabel="29 在现实世界中抛球杂耍事件时序实验台，可推进五个节点并注入乱序故障；故障在排序后暴露。"
        />

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {STAGES.map((stage, index) => (
            <button
              key={stage.key}
              type="button"
              aria-label={`观察${stage.title}节点`}
              aria-pressed={focus === index}
              onClick={() => setFocus(index as StageIndex)}
              className={`min-h-11 rounded-control border px-2 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                focus === index
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {stage.title}
            </button>
          ))}
        </div>

        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <button
          type="button"
          onClick={reset}
          aria-label="重置事件时序实验台"
          className="mx-auto mt-3 block min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置实验台
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故障开关只改变一个条件；重置后必须能用同一批事件重新得到相同的首差。
      </figcaption>
    </figure>
  );
}
