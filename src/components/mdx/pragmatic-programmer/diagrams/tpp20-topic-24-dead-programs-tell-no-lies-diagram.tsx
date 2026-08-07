"use client";

import { useState } from "react";

const C = {
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
} as const;

const VIEW_W = 920;
const VIEW_H = 456;
const CARD_W = 150;
const CARD_H = 170;
const START_X = 24;
const START_Y = 112;
const GAP = 18;

const CHAPTER_PROMPT = "提示38：尽早崩溃";

const STAGES = [
  {
    id: "exception",
    title: "异常",
    evidence: "amount = NaN",
    owner: "解析边界暴露问题",
    question: "哪里不对？",
  },
  {
    id: "context",
    title: "上下文",
    evidence: "请求 ID + 当前状态",
    owner: "记录对象与状态",
    question: "还能信吗？",
  },
  {
    id: "stop",
    title: "停止",
    evidence: "拒绝写入",
    owner: "不再继续执行",
    question: "先停在哪？",
  },
  {
    id: "isolate",
    title: "隔离",
    evidence: "不发成功事件",
    owner: "坏结果不达下游",
    question: "谁不应收到？",
  },
  {
    id: "recover",
    title: "恢复",
    evidence: "原始输入重放",
    owner: "保留首差与回退",
    question: "怎样修复？",
  },
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForStep(step?: 1 | 2 | 3) {
  return step === undefined ? STAGES.length - 1 : step - 1;
}

function Arrow({
  index,
  active,
  fault,
}: {
  index: number;
  active: boolean;
  fault: boolean;
}) {
  const x1 = stageX(index) + CARD_W + 3;
  const x2 = stageX(index + 1) - 8;
  const y = START_Y + CARD_H / 2;
  const color = fault && index >= 2 ? C.danger : active ? C.accent : C.border;

  return (
    <g
      fill="none"
      stroke={color}
      strokeWidth={active || (fault && index >= 2) ? "2" : "1.2"}
    >
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        strokeDasharray={fault && index >= 2 ? "6 4" : undefined}
      />
      <polygon
        points={`${x2},${y} ${x2 - 8},${y - 5} ${x2 - 8},${y + 5}`}
        fill={color}
        stroke="none"
      />
    </g>
  );
}

function StageCard({
  index,
  active,
  reached,
  fault,
}: {
  index: number;
  active: boolean;
  reached: boolean;
  fault: boolean;
}) {
  const stage = STAGES[index];
  const failedStage = fault && index === 2;
  const propagated = fault && index > 2;
  const tone =
    failedStage || propagated ? C.danger : active ? C.accent : C.primary;
  const evidence = failedStage
    ? "快速失败已关闭"
    : propagated
      ? index === 3
        ? "错误继续传播"
        : "等待人工补偿"
      : stage.evidence;
  const owner = failedStage
    ? "不可信状态仍向前流动"
    : propagated
      ? "下游无法判断真假"
      : stage.owner;

  return (
    <g aria-label={`${stage.title}：${evidence}`} opacity={reached ? 1 : 0.36}>
      <rect
        x={stageX(index)}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={C.elevated}
        stroke={failedStage || propagated || active ? tone : C.border}
        strokeWidth={failedStage || propagated || active ? "2" : "1.2"}
      />
      <rect
        x={stageX(index)}
        y={START_Y}
        width={CARD_W}
        height="48"
        rx="12"
        fill={tone}
        fillOpacity={failedStage || propagated || active ? "0.18" : "0.08"}
      />
      <rect
        x={stageX(index)}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={failedStage || propagated || active ? "0.18" : "0.08"}
      />
      <circle
        cx={stageX(index) + 24}
        cy={START_Y + 24}
        r="12"
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
      />
      <text
        x={stageX(index) + 24}
        y={START_Y + 28}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={tone}
      >
        {index + 1}
      </text>
      <text
        x={stageX(index) + CARD_W / 2 + 8}
        y={START_Y + 30}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={tone}
      >
        {stage.title}
      </text>
      <text
        x={stageX(index) + CARD_W / 2}
        y={START_Y + 82}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={failedStage || propagated ? C.danger : C.primary}
      >
        {evidence}
      </text>
      <text
        x={stageX(index) + CARD_W / 2}
        y={START_Y + 116}
        textAnchor="middle"
        fontSize="11"
        fill={failedStage || propagated ? C.danger : C.secondary}
      >
        {owner}
      </text>
      <line
        x1={stageX(index) + 16}
        y1={START_Y + 137}
        x2={stageX(index) + CARD_W - 16}
        y2={START_Y + 137}
        stroke={failedStage || propagated ? C.danger : C.border}
        strokeOpacity="0.8"
      />
      <text
        x={stageX(index) + CARD_W / 2}
        y={START_Y + 161}
        textAnchor="middle"
        fontSize="11"
        fill={failedStage || propagated ? C.danger : C.secondary}
      >
        {failedStage || propagated ? "首差：停止边界" : stage.question}
      </text>
    </g>
  );
}

function FailureChainSvg({
  focus,
  fault,
  ariaLabel,
}: {
  focus: number;
  fault: boolean;
  ariaLabel: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="mx-auto block h-auto w-full max-w-[920px]"
    >
      <text
        x={VIEW_W / 2}
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={C.primary}
      >
        死掉的程序不会说谎：让错误停在第一处边界
      </text>
      <text
        x={VIEW_W / 2}
        y="56"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {CHAPTER_PROMPT} · 异常 → 上下文 → 停止 → 隔离 → 恢复
      </text>
      <text
        x={START_X + CARD_W / 2}
        y="86"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        输入：订单 #42 / amount = NaN
      </text>
      {STAGES.slice(0, -1).map((stage, index) => (
        <Arrow
          key={`${stage.id}-to-${STAGES[index + 1].id}`}
          index={index}
          active={index < focus}
          fault={fault}
        />
      ))}
      {STAGES.map((stage, index) => (
        <StageCard
          key={stage.id}
          index={index}
          active={index === focus}
          reached={index <= focus}
          fault={fault}
        />
      ))}
      <rect
        x="46"
        y="330"
        width="828"
        height="76"
        rx="12"
        fill={fault ? C.danger : C.accent}
        fillOpacity="0.08"
        stroke={fault ? C.danger : C.border}
      />
      <text
        x={VIEW_W / 2}
        y="358"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault ? C.danger : C.primary}
      >
        {fault
          ? "拒绝：坏状态越过停止边界，后续只能看到不可信的结果"
          : "验收：先暴露异常与上下文，再停止写入并隔离下游"}
      </text>
      <text
        x={VIEW_W / 2}
        y="384"
        textAnchor="middle"
        fontSize="11"
        fill={fault ? C.danger : C.secondary}
      >
        {fault
          ? "修法：恢复快速失败，从原始输入重放；不要手工修改最后一条记录"
          : "只改变一个条件；保存首差、拒绝原因、回退动作与未覆盖输入"}
      </text>
      <text
        x={VIEW_W / 2}
        y="432"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        图示展示故障边界与证据交接，不把“程序停止”冒充成系统已恢复
      </text>
    </svg>
  );
}

export function Tpp20Topic24DeadProgramsTellNoLiesDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-24-dead-programs-tell-no-lies-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <FailureChainSvg
          focus={focusForStep(step)}
          fault={false}
          ariaLabel="死掉的程序不会说谎专属五节点图，展示异常、上下文、停止、隔离和恢复之间的证据交接。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        失败不是静默返回默认值；它要在第一处不可信边界停下，并留下能重放的上下文。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic24DeadProgramsTellNoLiesLab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [fastFailDisabled, setFastFailDisabled] = useState(false);
  const fault = fastFailDisabled && currentStep >= 2;

  const reset = () => {
    setCurrentStep(0);
    setFastFailDisabled(false);
  };

  const status = fault
    ? "首差：停止边界。关闭快速失败后，不可信状态继续向写入和下游通知传播。"
    : `第 ${currentStep + 1} / ${STAGES.length} 步：${STAGES[currentStep].title} 已留下可复核证据。`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-24-dead-programs-tell-no-lies-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 24 · 快速失败实验台
          </span>
          <button
            type="button"
            aria-pressed={fastFailDisabled}
            aria-label="关闭快速失败并注入错误传播"
            onClick={() => setFastFailDisabled((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fastFailDisabled
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {fastFailDisabled ? "已关闭：允许错误传播" : "关闭快速失败"}
          </button>
        </div>
        <FailureChainSvg
          focus={currentStep}
          fault={fault}
          ariaLabel="快速失败实验台，可逐步观察关闭快速失败后不可信状态越过停止边界并继续传播。"
        />
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
          >
            上一步
          </button>
          <button
            type="button"
            className="min-h-11 rounded-control border border-accent px-3 py-2 text-xs text-accent hover:text-primary"
            onClick={() =>
              setCurrentStep((value) => Math.min(STAGES.length - 1, value + 1))
            }
          >
            下一步
          </button>
          <button
            type="button"
            aria-label="重置快速失败实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故障注入只关闭快速失败；恢复后必须从同一原始输入重放，不能把坏结果涂成成功。
      </figcaption>
    </figure>
  );
}
