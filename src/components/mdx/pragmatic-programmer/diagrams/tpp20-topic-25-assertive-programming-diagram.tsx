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

const VIEW_W = 960;
const VIEW_H = 476;
const CARD_W = 164;
const CARD_H = 172;
const START_X = 20;
const START_Y = 116;
const GAP = 16;

const STAGES = [
  {
    id: "input",
    title: "外部输入",
    evidence: "amount = -2",
    owner: "用户可修正",
    question: "能说明原因吗？",
  },
  {
    id: "validate",
    title: "输入校验",
    evidence: "返回业务错误",
    owner: "边界拒绝",
    question: "不要伪装成功",
  },
  {
    id: "assert",
    title: "内部断言",
    evidence: "stock >= 0",
    owner: "检查不变量",
    question: "不可能就停",
  },
  {
    id: "production",
    title: "生产行为",
    evidence: "不写入、不通知",
    owner: "切断副作用",
    question: "谁不能接收？",
  },
  {
    id: "diagnosis",
    title: "诊断上下文",
    evidence: "ID + 版本 + 首差",
    owner: "交给恢复者",
    question: "怎样重放？",
  },
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForStep(step?: 1 | 2 | 3) {
  return step === undefined
    ? STAGES.length - 1
    : step === 1
      ? 1
      : step === 2
        ? 2
        : 4;
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
  const broken = fault && index >= 2;
  const color = broken ? C.danger : active ? C.accent : C.border;

  return (
    <g fill="none" stroke={color} strokeWidth={broken || active ? "2" : "1.2"}>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        strokeDasharray={broken ? "7 4" : undefined}
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
  const failed = fault && index === 2;
  const blocked = fault && index > 2;
  const tone = failed || blocked ? C.danger : active ? C.accent : C.primary;
  const evidence = failed
    ? "stock = -1"
    : blocked
      ? "路径已阻断"
      : stage.evidence;
  const owner = failed
    ? "不变量被破坏"
    : blocked
      ? "禁止继续副作用"
      : stage.owner;

  return (
    <g aria-label={`${stage.title}：${evidence}`} opacity={reached ? 1 : 0.34}>
      <rect
        x={stageX(index)}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={C.elevated}
        stroke={failed || blocked || active ? tone : C.border}
        strokeWidth={failed || blocked || active ? "2" : "1.2"}
      />
      <rect
        x={stageX(index)}
        y={START_Y}
        width={CARD_W}
        height="48"
        rx="12"
        fill={tone}
        fillOpacity={failed || blocked || active ? "0.18" : "0.08"}
      />
      <rect
        x={stageX(index)}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={failed || blocked || active ? "0.18" : "0.08"}
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
        y={START_Y + 84}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={failed || blocked ? C.danger : C.primary}
      >
        {evidence}
      </text>
      <text
        x={stageX(index) + CARD_W / 2}
        y={START_Y + 116}
        textAnchor="middle"
        fontSize="11"
        fill={failed || blocked ? C.danger : C.secondary}
      >
        {owner}
      </text>
      <line
        x1={stageX(index) + 16}
        y1={START_Y + 138}
        x2={stageX(index) + CARD_W - 16}
        y2={START_Y + 138}
        stroke={failed || blocked ? C.danger : C.border}
        strokeOpacity="0.8"
      />
      <text
        x={stageX(index) + CARD_W / 2}
        y={START_Y + 161}
        textAnchor="middle"
        fontSize="11"
        fill={failed || blocked ? C.danger : C.secondary}
      >
        {failed ? "首差：不变量" : blocked ? "生产路径停止" : stage.question}
      </text>
    </g>
  );
}

function AssertiveFlowSvg({
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
      className="mx-auto block h-auto w-full max-w-[960px]"
    >
      <text
        x={VIEW_W / 2}
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={C.primary}
      >
        断言式编程：把外部拒绝和内部警报分开
      </text>
      <text
        x={VIEW_W / 2}
        y="56"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        可修正输入 → 输入校验；不可能状态 → 断言停止；现场 → 诊断上下文
      </text>
      <text
        x={START_X + CARD_W / 2}
        y="88"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        同一请求：order-42
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
        width="868"
        height="78"
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
          ? "故障注入：stock = -1，断言在生产副作用前截停"
          : "验收：外部错误可修正；内部不可能状态必须显眼并停止"}
      </text>
      <text
        x={VIEW_W / 2}
        y="384"
        textAnchor="middle"
        fontSize="11"
        fill={fault ? C.danger : C.secondary}
      >
        {fault
          ? "记录期望、实际、请求身份和版本；恢复者再决定回退或重放"
          : "断言保护不变量，不替代输入校验，也不承诺自动恢复"}
      </text>
      <text
        x={VIEW_W / 2}
        y="440"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        图示中的“停止”只切断当前不安全路径，不把失败伪装成成功
      </text>
    </svg>
  );
}

export function Tpp20Topic25AssertiveProgrammingDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-25-assertive-programming-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <AssertiveFlowSvg
          focus={focusForStep(step)}
          fault={false}
          ariaLabel="断言式编程专属五节点图，展示外部输入、输入校验、内部断言、生产行为和诊断上下文之间的责任分流。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        外部输入先得到可修正的拒绝；内部不可能状态则在生产副作用前触发断言并留下现场。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic25AssertiveProgrammingLab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [impossibleState, setImpossibleState] = useState(false);
  const fault = impossibleState && currentStep >= 2;

  const reset = () => {
    setCurrentStep(0);
    setImpossibleState(false);
  };

  const status = fault
    ? "首差：内部不变量。断言已停止写入和成功通知，诊断上下文交给恢复者。"
    : `第 ${currentStep + 1} / ${STAGES.length} 步：${STAGES[currentStep].title} 已留下可检查证据。`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-25-assertive-programming-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 25 · 两道门实验台
          </span>
          <button
            type="button"
            aria-pressed={impossibleState}
            aria-label="注入不可能状态并触发内部断言"
            onClick={() => setImpossibleState((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              impossibleState
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {impossibleState ? "已注入：stock = -1" : "注入不可能状态"}
          </button>
        </div>
        <AssertiveFlowSvg
          focus={currentStep}
          fault={fault}
          ariaLabel="断言式编程实验台，可逐步观察输入校验与内部断言的区别，并注入负库存状态。"
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
            aria-label="重置断言式编程实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        关闭故障注入并重置后，重新走同一请求；断言的职责是暴露不可能状态，不是掩盖它。
      </figcaption>
    </figure>
  );
}
