"use client";

import { useId, useState } from "react";

const VIEW_W = 1000;
const VIEW_H = 560;
const CARD_W = 170;
const CARD_H = 190;
const CARD_Y = 168;
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
  warning: "var(--warning)",
} as const;

const STAGES = [
  {
    key: "input",
    title: "输入",
    evidence: "保留原始数据",
    detail: "订单行 + 版本",
    note: "只读入，不急着改状态",
  },
  {
    key: "transform",
    title: "变换",
    evidence: "逐段清洗与计算",
    detail: "normalize → price",
    note: "一个函数只做一件事",
  },
  {
    key: "compose",
    title: "组合",
    evidence: "串起纯函数",
    detail: "输入 → 输出",
    note: "组合不藏副作用",
  },
  {
    key: "value",
    title: "中间值",
    evidence: "保存每段结果",
    detail: "Result / next input",
    note: "失败也有可读形状",
  },
  {
    key: "error",
    title: "错误",
    evidence: "显式错误通道",
    detail: "reject + reason",
    note: "拒绝不能静默丢失",
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
        height="52"
        rx="14"
        fill={tone}
        fillOpacity={fault || active ? "0.16" : "0.07"}
      />
      <rect
        x={x}
        y={CARD_Y + 40}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={fault || active ? "0.16" : "0.07"}
      />
      <circle
        cx={x + 25}
        cy={CARD_Y + 26}
        r="11"
        fill={tone}
        fillOpacity="0.18"
        stroke={tone}
      />
      <text
        x={x + 25}
        y={CARD_Y + 30}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={tone}
      >
        {index + 1}
      </text>
      <text
        x={x + 105}
        y={CARD_Y + 32}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={tone}
      >
        {fault ? "首差" : stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={CARD_Y + 86}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault ? COLORS.danger : COLORS.primary}
      >
        {fault ? "副作用越过组合" : stage.evidence}
      </text>
      <text
        x={x + CARD_W / 2}
        y={CARD_Y + 119}
        textAnchor="middle"
        fontSize="12"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault ? "停止并保留首差" : stage.detail}
      </text>
      <line
        x1={x + 18}
        y1={CARD_Y + 141}
        x2={x + CARD_W - 18}
        y2={CARD_Y + 141}
        stroke={fault ? COLORS.danger : COLORS.border}
        strokeOpacity="0.8"
      />
      <text
        x={x + CARD_W / 2}
        y={CARD_Y + 166}
        textAnchor="middle"
        fontSize="11"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault ? "不要吞掉错误" : stage.note}
      </text>
    </g>
  );
}

function DataChip({
  x,
  label,
  tone,
  opacity = 1,
}: {
  x: number;
  label: string;
  tone: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y="96"
        width="150"
        height="36"
        rx="18"
        fill={tone}
        fillOpacity="0.12"
        stroke={tone}
        strokeWidth="1.2"
      />
      <text
        x={x + 75}
        y="119"
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

function TransformingSvg({
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

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="mx-auto block h-auto w-full max-w-[1000px]"
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
        y="31"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill={COLORS.primary}
      >
        变换式编程：让数据经过一条可复查的路径
      </text>
      <text
        x={VIEW_W / 2}
        y="59"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        每个节点接收一个值，产出下一个值；失败沿显式通道离开主链
      </text>

      <rect
        x="30"
        y="76"
        width="940"
        height="72"
        rx="14"
        fill={faultActive ? COLORS.danger : COLORS.accent}
        fillOpacity="0.07"
        stroke={faultActive ? COLORS.danger : COLORS.border}
      />
      <text x="48" y="119" fontSize="12" fontWeight="700" fill={COLORS.primary}>
        数据流
      </text>
      <DataChip x={132} label="raw: 订单行" tone={COLORS.accent} />
      <DataChip
        x={294}
        label="normalized"
        tone={COLORS.accent}
        opacity={focus >= 1 ? 1 : 0.48}
      />
      <DataChip
        x={456}
        label="subtotal"
        tone={COLORS.accent}
        opacity={focus >= 2 ? 1 : 0.48}
      />
      <DataChip
        x={618}
        label="Result"
        tone={COLORS.success}
        opacity={focus >= 3 ? 1 : 0.48}
      />
      <DataChip
        x={780}
        label="Error(reason)"
        tone={faultActive ? COLORS.danger : COLORS.warning}
        opacity={focus >= 4 ? 1 : 0.48}
      />

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
        y="394"
        width="920"
        height="100"
        rx="14"
        fill={faultActive ? COLORS.danger : COLORS.elevated}
        fillOpacity={faultActive ? "0.08" : "1"}
        stroke={faultActive ? COLORS.danger : COLORS.border}
      />
      <text
        x={VIEW_W / 2}
        y="427"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={faultActive ? COLORS.danger : COLORS.success}
      >
        {faultActive
          ? "首差：组合阶段偷偷修改共享状态，纯函数合同被绕过"
          : "验收合同：同一输入得到同一结果，错误也必须可被接收者看见"}
      </text>
      <text
        x={VIEW_W / 2}
        y="455"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        {faultActive
          ? "修法：停止副作用，恢复原始输入，逐段重放并比较中间值"
          : "记录每段输入、输出、拒绝理由和下游接收者，才能定位第一处变化"}
      </text>
      <text
        x={VIEW_W / 2}
        y="480"
        textAnchor="middle"
        fontSize="11"
        fill={COLORS.secondary}
      >
        {faultActive
          ? "最终结果看似正确，也不能抵消已经丢失的错误证据"
          : "先预测首差，再推进节点；不要把全部状态堆进最后一个变量"}
      </text>
      <text
        x={VIEW_W / 2}
        y="535"
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
  1: "输入：先保留原始值",
  2: "组合：把纯函数串起来",
  3: "错误：从显式通道离开",
} as const;

export function Tpp20Topic30TransformingProgrammingDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  const markerId = `tpp20-topic30-arrow-${useId().replace(/:/g, "")}`;
  const focus = lessonFocus(step);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-30-transforming-programming-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <TransformingSvg
          focus={focus}
          fault={false}
          markerId={markerId}
          ariaLabel="30 变换式编程专属数据流图，展示输入、变换、组合、中间值和错误五个节点。"
        />
        <p className="mt-2 text-center text-xs text-secondary">
          {step
            ? STEP_LABELS[step]
            : "逐步观察：每段变换都留下可复查的中间结果。"}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把程序拆成值到值的变换，状态负担就能落在具体节点，而不是藏在一条长流程里。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic30TransformingProgrammingLab() {
  const [focus, setFocus] = useState<StageIndex>(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const markerId = `tpp20-topic30-lab-${useId().replace(/:/g, "")}`;
  const faultActive = faultInjected && focus >= 2;

  const reset = () => {
    setFocus(0);
    setFaultInjected(false);
  };

  const status = faultActive
    ? "首差在组合节点出现：共享状态被偷偷写入；请保留中间值并从原始输入重放。"
    : faultInjected
      ? "故障已注入；推进到组合节点，观察副作用怎样越过纯函数边界。"
      : `第 ${focus + 1} / ${STAGES.length} 步：${STAGES[focus].title} 已留下证据。`;

  return (
    <section
      aria-label="变换式编程实验台"
      className="not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated p-5"
      data-visual-kind="tpp20-topic-30-transforming-programming-lab"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          Topic 30 · 数据变换实验台
        </span>
        <button
          type="button"
          aria-pressed={faultInjected}
          aria-label="注入共享状态故障"
          onClick={() => setFaultInjected((value) => !value)}
          className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
            faultInjected
              ? "border-danger text-danger"
              : "border-border text-secondary hover:border-accent hover:text-primary"
          }`}
        >
          {faultInjected ? "已注入：绕过纯函数" : "注入共享状态故障"}
        </button>
      </div>

      <TransformingSvg
        focus={focus}
        fault={faultInjected}
        markerId={markerId}
        ariaLabel="30 变换式编程实验台，可推进五个数据节点并注入共享状态故障；故障在组合节点暴露。"
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
        aria-label="重置变换式编程实验台"
        className="mx-auto mt-3 block min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
      >
        重置实验台
      </button>
    </section>
  );
}
