"use client";

import { useState } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
} as const;

const VIEW_W = 900;
const VIEW_H = 438;
const CARD_W = 150;
const CARD_H = 184;
const START_X = 24;
const START_Y = 108;
const GAP = 22;

const CHAPTER_PROMPT = "提示37：通过契约进行设计";

const STAGES = [
  {
    id: "contract",
    title: "契约",
    evidence: "输入、输出、边界",
    owner: "双方先说清责任",
    question: "承诺是什么？",
  },
  {
    id: "precondition",
    title: "前置条件",
    evidence: "调用者满足",
    owner: "调用者负责入口",
    question: "能否开始？",
  },
  {
    id: "implementation",
    title: "实现",
    evidence: "执行承诺",
    owner: "实现者保持边界",
    question: "做了什么？",
  },
  {
    id: "postcondition",
    title: "后置条件",
    evidence: "结果可验证",
    owner: "实现者负责出口",
    question: "交付了吗？",
  },
  {
    id: "invariant",
    title: "不变量",
    evidence: "状态始终合法",
    owner: "双方共同守住",
    question: "还能信吗？",
  },
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForStep(step?: 1 | 2 | 3) {
  return step === undefined ? STAGES.length - 1 : [1, 2, 4][step - 1];
}

function Arrow({ index, active }: { index: number; active: boolean }) {
  const x1 = stageX(index) + CARD_W + 3;
  const x2 = stageX(index + 1) - 8;
  const y = START_Y + CARD_H / 2;
  const color = active ? C.accent : C.border;

  return (
    <g fill="none" stroke={color} strokeWidth={active ? "2" : "1.2"}>
      <line x1={x1} y1={y} x2={x2} y2={y} />
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
  const x = stageX(index);
  const tone = fault ? C.danger : active ? C.accent : C.primary;

  return (
    <g aria-label={`${stage.title}：${stage.evidence}`} opacity={reached ? 1 : 0.36}>
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={C.elevated}
        stroke={fault || active ? tone : C.border}
        strokeWidth={fault || active ? "2" : "1.2"}
      />
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height="48"
        rx="12"
        fill={tone}
        fillOpacity={fault || active ? "0.18" : "0.08"}
      />
      <rect
        x={x}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={fault || active ? "0.18" : "0.08"}
      />
      <circle
        cx={x + 24}
        cy={START_Y + 24}
        r="12"
        fill={tone}
        fillOpacity="0.14"
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
        fontSize="14"
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
        fill={fault ? C.danger : C.primary}
      >
        {fault ? "契约被拒绝" : stage.evidence}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 116}
        textAnchor="middle"
        fontSize="11"
        fill={fault ? C.danger : C.secondary}
      >
        {fault ? "停止接收结果" : stage.owner}
      </text>
      <line
        x1={x + 16}
        y1={START_Y + 137}
        x2={x + CARD_W - 16}
        y2={START_Y + 137}
        stroke={fault ? C.danger : C.border}
        strokeOpacity="0.8"
      />
      <text
        x={x + CARD_W / 2}
        y={START_Y + 161}
        textAnchor="middle"
        fontSize="11"
        fill={fault ? C.danger : C.secondary}
      >
        {fault ? "首差：后置条件" : stage.question}
      </text>
    </g>
  );
}

function ContractSvg({
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
      className="mx-auto block h-auto w-full max-w-[900px]"
    >
      <text
        x={VIEW_W / 2}
        y="30"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={C.primary}
      >
        契约式设计：把责任放在边界上
      </text>
      <text
        x={VIEW_W / 2}
        y="56"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {CHAPTER_PROMPT} · 调用者承诺进入，实现者承诺退出
      </text>
      <text
        x={START_X + CARD_W / 2}
        y="86"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        输入：reserveSeat(2)
      </text>
      {STAGES.slice(0, -1).map((stage, index) => (
        <Arrow
          key={`${stage.id}-to-${STAGES[index + 1].id}`}
          index={index}
          active={index < focus}
        />
      ))}
      {STAGES.map((stage, index) => (
        <StageCard
          key={stage.id}
          index={index}
          active={index === focus}
          reached={index <= focus}
          fault={fault && index === 3}
        />
      ))}
      <rect
        x="46"
        y="330"
        width="808"
        height="72"
        rx="12"
        fill={fault ? C.danger : C.accent}
        fillOpacity="0.08"
        stroke={fault ? C.danger : C.border}
      />
      <text
        x={VIEW_W / 2}
        y="357"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault ? C.danger : C.primary}
      >
        {fault
          ? "拒绝：实现没有交付后置条件，调用者不得把结果当成功"
          : "验收合同：每一段都交出责任、证据和下一段的进入条件"}
      </text>
      <text
        x={VIEW_W / 2}
        y="382"
        textAnchor="middle"
        fontSize="11"
        fill={fault ? C.danger : C.secondary}
      >
        {fault
          ? "修法：补回结果检查，再用同一输入重放正常、边界和失败样本"
          : "只改变一个条件；记录首个拒绝点，不用最终状态倒推原因"}
      </text>
      <text
        x={VIEW_W / 2}
        y="426"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        图示是契约的可观察模型，不是业务成功率统计
      </text>
    </svg>
  );
}

export function Tpp20Topic23DesignByContractDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-23-design-by-contract-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <ContractSvg
          focus={focusForStep(step)}
          fault={false}
          ariaLabel="契约式设计专属五节点图，展示契约、前置条件、实现、后置条件和不变量之间的责任交接。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        好的契约让调用者知道何时可以进入，也让实现者知道何时必须拒绝交付。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic23DesignByContractLab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const fault = faultInjected && currentStep >= 3;

  const reset = () => {
    setCurrentStep(0);
    setFaultInjected(false);
  };

  const status = fault
    ? "首差：后置条件。实现未交付可验证结果，调用者应拒绝接收。"
    : `第 ${currentStep + 1} / ${STAGES.length} 步：${STAGES[currentStep].title} 已留下责任证据。`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-23-design-by-contract-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 23 · 契约边界实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入后置条件缺失故障"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：后置条件缺失" : "注入后置条件缺失"}
          </button>
        </div>
        <ContractSvg
          focus={currentStep}
          fault={fault}
          ariaLabel="契约边界实验台，可逐步观察后置条件缺失后调用者拒绝接收结果。"
        />
        <p className="mt-3 text-center text-xs text-secondary" role="status" aria-live="polite">
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
            onClick={() => setCurrentStep((value) => Math.min(STAGES.length - 1, value + 1))}
          >
            下一步
          </button>
          <button
            type="button"
            aria-label="重置契约边界实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故障注入只移除一项承诺；恢复后必须从同一输入重放，而不是修改最终答案。
      </figcaption>
    </figure>
  );
}
