"use client";

import { useId, useState } from "react";

const C = {
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

const VIEW_W = 960;
const VIEW_H = 488;
const CARD_W = 160;
const CARD_H = 156;
const START_X = 20;
const START_Y = 116;
const GAP = 25;

const STAGES = [
  {
    key: "scope",
    title: "前灯范围",
    evidence: "冻结当前证据",
    detail: "现在看得见什么？",
  },
  {
    key: "small-step",
    title: "小步",
    evidence: "承诺可逆变化",
    detail: "一次只动一件事",
  },
  {
    key: "feedback",
    title: "反馈",
    evidence: "观察首个变化",
    detail: "结果回到现场",
  },
  {
    key: "replan",
    title: "再规划",
    evidence: "更新下一步",
    detail: "按新证据调整",
  },
  {
    key: "stop-line",
    title: "停止线",
    evidence: "拒绝远期占卜",
    detail: "看不见就先停",
  },
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function HeadlightsFlowSvg({
  current,
  fault,
  ariaLabel,
}: {
  current: number;
  fault: boolean;
  ariaLabel: string;
}) {
  const markerId = useId().replace(/:/g, "");
  const firstChanged = fault && current >= 2;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="mx-auto block h-auto w-full max-w-[960px]"
    >
      <defs>
        <marker
          id={`tpp20-topic27-arrow-${markerId}`}
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
        >
          <path d="M0 0 L9 4.5 L0 9 z" fill={C.accent} />
        </marker>
      </defs>

      <text
        x={VIEW_W / 2}
        y="30"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.primary}
      >
        前灯范围：只承诺看得见的下一步
      </text>
      <text
        x={VIEW_W / 2}
        y="58"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        当前：第 {current + 1} 步 · {STAGES[current].title} ·{" "}
        {STAGES[current].evidence}
      </text>

      {STAGES.slice(0, -1).map((stage, index) => {
        const x1 = stageX(index) + CARD_W + 4;
        const x2 = stageX(index + 1) - 8;
        const y = START_Y + CARD_H / 2;
        const active = index < current;
        const broken = firstChanged && index >= 2;
        return (
          <g key={`arrow-${stage.key}`}>
            <line
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke={broken ? C.danger : active ? C.accent : C.border}
              strokeWidth={broken || active ? "2" : "1.2"}
              strokeDasharray={broken ? "7 4" : undefined}
              markerEnd={`url(#tpp20-topic27-arrow-${markerId})`}
            />
          </g>
        );
      })}

      {STAGES.map((stage, index) => {
        const x = stageX(index);
        const reached = index <= current;
        const failed = firstChanged && index >= 2;
        return (
          <g key={stage.key}>
            <rect
              x={x}
              y={START_Y}
              width={CARD_W}
              height={CARD_H}
              rx="12"
              fill={failed ? C.danger : reached ? C.accent : C.elevated}
              fillOpacity={failed ? "0.09" : reached ? "0.08" : "1"}
              stroke={failed ? C.danger : reached ? C.accent : C.border}
              strokeWidth={failed || reached ? "2" : "1.2"}
            />
            <circle
              cx={x + 22}
              cy={START_Y + 25}
              r="10"
              fill={failed ? C.danger : reached ? C.accent : C.border}
            />
            <text
              x={x + 22}
              y={START_Y + 29}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={C.elevated}
            >
              {index + 1}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 29}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={failed ? C.danger : reached ? C.accent : C.primary}
            >
              {failed && index === 2 ? "首差：反馈" : stage.title}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 72}
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              {stage.evidence}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 101}
              textAnchor="middle"
              fontSize="11"
              fill={failed ? C.danger : C.secondary}
            >
              {failed && index === 2 ? "结果不可见" : stage.detail}
            </text>
            <text
              x={x + CARD_W / 2}
              y={START_Y + 133}
              textAnchor="middle"
              fontSize="11"
              fill={reached ? C.primary : C.secondary}
            >
              {reached ? "证据已写入" : "等待观察"}
            </text>
          </g>
        );
      })}

      <rect
        x="92"
        y="330"
        width="776"
        height="90"
        rx="12"
        fill={firstChanged ? C.danger : C.elevated}
        fillOpacity={firstChanged ? "0.08" : "1"}
        stroke={firstChanged ? C.danger : C.border}
        strokeWidth="1.2"
      />
      <text
        x={VIEW_W / 2}
        y="358"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={firstChanged ? C.danger : C.accent}
      >
        {firstChanged
          ? "首差：反馈没有回到现场，不能继续承诺更远的结果"
          : "验收合同：每一步只基于已经看见的证据更新下一步"}
      </text>
      <text
        x={VIEW_W / 2}
        y="384"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        {firstChanged
          ? "修法：停止副作用，记录缺失的反馈，回到最后一个可复核节点"
          : "前灯范围 → 小步 → 反馈 → 再规划 → 停止线"}
      </text>
      <text
        x={VIEW_W / 2}
        y="407"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        提示42：小步前进——由始至终 · 提示43：避免占卜
      </text>
    </svg>
  );
}

export function Tpp20Topic27HeadlightsDiagram({
  stage = 4,
  fault = false,
}: {
  stage?: number;
  fault?: boolean;
}) {
  const current = Math.min(STAGES.length - 1, Math.max(0, stage));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-27-headlights-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <HeadlightsFlowSvg
          current={current}
          fault={fault}
          ariaLabel="不要冲出前灯范围的专属五节点图，展示前灯范围、小步、反馈、再规划和停止线；故障状态在反馈节点暴露首差。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        只把下一步建立在可见反馈上；看不见的远期结果应成为停止线，而不是承诺。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic27HeadlightsLab() {
  const [current, setCurrent] = useState(0);
  const [fault, setFault] = useState(false);

  const reset = () => {
    setCurrent(0);
    setFault(false);
  };

  const firstChanged = fault && current >= 2;
  const status = firstChanged
    ? "首差：反馈不可见。停止继续规划，记录缺口并回到最后一个可复核节点。"
    : fault
      ? "故障已注入；推进到第 3 步，观察反馈如何成为首差。"
      : `第 ${current + 1} / ${STAGES.length} 步：${STAGES[current].title} 已留下可复核证据。`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-27-headlights-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 27 · 前灯范围实验台
          </span>
          <button
            type="button"
            aria-pressed={fault}
            aria-label="注入反馈不可见故障"
            onClick={() => setFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {fault ? "已注入：反馈不可见" : "注入反馈故障"}
          </button>
        </div>
        <HeadlightsFlowSvg
          current={current}
          fault={fault}
          ariaLabel="前灯范围交互实验台，可逐步推进五个节点并注入反馈不可见故障。"
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
            disabled={current === 0}
            aria-label="回到上一个前灯节点"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setCurrent((value) => Math.max(0, value - 1))}
          >
            上一步
          </button>
          <button
            type="button"
            disabled={current === STAGES.length - 1}
            aria-label="推进到下一个前灯节点"
            className="min-h-11 rounded-control border border-accent px-3 py-2 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() =>
              setCurrent((value) => Math.min(STAGES.length - 1, value + 1))
            }
          >
            下一步
          </button>
          <button
            type="button"
            aria-label="重置前灯范围实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测反馈在哪一步出现，再注入单故障；重置后应回到第 1 步和完整证据。
      </figcaption>
    </figure>
  );
}
