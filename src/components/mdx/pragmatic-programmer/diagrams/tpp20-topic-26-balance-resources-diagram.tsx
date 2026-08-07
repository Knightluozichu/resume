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
const VIEW_H = 472;
const CARD_W = 164;
const CARD_H = 156;
const START_X = 20;
const START_Y = 112;
const GAP = 24;

const STAGES = [
  {
    title: "获取",
    evidence: "记录所有者",
    concept: "资源所有权",
  },
  {
    title: "使用",
    evidence: "限制作用域",
    concept: "作用域",
  },
  {
    title: "移交",
    evidence: "交接清晰",
    concept: "异常安全",
  },
  {
    title: "异常",
    evidence: "沿反向路径",
    concept: "泄漏",
  },
  {
    title: "释放",
    evidence: "恰好一次",
    concept: "局部性",
  },
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
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
  const x1 = stageX(index) + CARD_W + 4;
  const x2 = stageX(index + 1) - 8;
  const y = START_Y + CARD_H / 2;
  const broken = fault && index >= 3;
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
  current,
  reached,
  fault,
}: {
  index: number;
  current: number;
  reached: boolean;
  fault: boolean;
}) {
  const stage = STAGES[index];
  const failed = fault && index === 4 && current >= 3;
  const blocked = fault && index > 4;
  const tone = failed ? C.danger : index === current ? C.accent : C.primary;
  const evidence = failed ? "未释放 · 泄漏" : stage.evidence;
  const concept = failed ? "异常路径未闭合" : stage.concept;

  return (
    <g
      aria-label={`${stage.title}：${evidence}，${concept}`}
      opacity={reached || failed || blocked ? 1 : 0.34}
    >
      <rect
        x={stageX(index)}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={C.elevated}
        stroke={failed || index === current ? tone : C.border}
        strokeWidth={failed || index === current ? "2" : "1.2"}
      />
      <rect
        x={stageX(index)}
        y={START_Y}
        width={CARD_W}
        height="48"
        rx="12"
        fill={tone}
        fillOpacity={failed || index === current ? "0.18" : "0.08"}
      />
      <rect
        x={stageX(index)}
        y={START_Y + 36}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={failed || index === current ? "0.18" : "0.08"}
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
        x={stageX(index) + 48}
        y={START_Y + 29}
        fontSize="13"
        fontWeight="700"
        fill={tone}
      >
        {stage.title}
      </text>
      <text
        x={stageX(index) + 16}
        y={START_Y + 78}
        fontSize="11"
        fill={C.secondary}
      >
        证据：{evidence}
      </text>
      <text
        x={stageX(index) + 16}
        y={START_Y + 101}
        fontSize="11"
        fill={failed ? C.danger : C.primary}
      >
        复核：{concept}
      </text>
      <text
        x={stageX(index) + 16}
        y={START_Y + 132}
        fontSize="11"
        fill={C.secondary}
      >
        {failed ? "停止并回退" : reached ? "责任仍在手上" : "等待前置证据"}
      </text>
    </g>
  );
}

function BalanceFlowSvg({
  current,
  fault,
  ariaLabel,
}: {
  current: number;
  fault: boolean;
  ariaLabel: string;
}) {
  const reached = (index: number) => index <= current;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={ariaLabel}
      className="block h-auto w-full"
    >
      <title>资源平衡的获取到释放链</title>
      <text
        x={VIEW_W / 2}
        y="34"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.primary}
      >
        26 如何保持资源的平衡：责任随资源一起移动
      </text>
      <text
        x={VIEW_W / 2}
        y="60"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        获取一次，就必须在正常、提前返回和异常路径中释放一次
      </text>

      {STAGES.slice(0, -1).map((_, index) => (
        <Arrow
          key={`balance-arrow-${index}`}
          index={index}
          active={index < current}
          fault={fault}
        />
      ))}
      {STAGES.map((_, index) => (
        <StageCard
          key={`balance-stage-${index}`}
          index={index}
          current={current}
          reached={reached(index)}
          fault={fault}
        />
      ))}

      <rect
        x="104"
        y="314"
        width="752"
        height="92"
        rx="12"
        fill={C.elevated}
        stroke={fault && current >= 3 ? C.danger : C.border}
        strokeWidth="1.2"
      />
      <text
        x={VIEW_W / 2}
        y="342"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault && current >= 3 ? C.danger : C.accent}
      >
        {fault && current >= 3
          ? "首差：异常路径没有回到释放"
          : "验收不变量：获取次数 = 释放次数"}
      </text>
      <text
        x={VIEW_W / 2}
        y="366"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        {fault && current >= 3
          ? "修法：把清理动作放进拥有资源的最小作用域，并从原始输入重放"
          : "把所有权、作用域、异常安全和回退动作写在同一段代码附近"}
      </text>
      <text
        x={VIEW_W / 2}
        y="390"
        textAnchor="middle"
        fontSize="11"
        fill={C.secondary}
      >
        提示40：有始有终 · 提示41：在局部行动
      </text>
    </svg>
  );
}

export function Tpp20Topic26BalanceResourcesDiagram({
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
        data-visual-kind="tpp20-topic-26-balance-resources-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <BalanceFlowSvg
          current={current}
          fault={fault}
          ariaLabel="资源平衡专属五节点图，展示获取、使用、移交、异常和释放之间的责任交接，以及异常路径未释放时的泄漏首差。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个节点都留下责任证据；异常只改变释放路径，其他条件保持不变。
      </figcaption>
    </figure>
  );
}

export function Tpp20Topic26BalanceResourcesLab() {
  const [current, setCurrent] = useState(0);
  const [fault, setFault] = useState(false);

  const reset = () => {
    setCurrent(0);
    setFault(false);
  };

  const status =
    fault && current >= 3
      ? "首差：释放。异常路径没有清理资源，结果是泄漏；应停止、记录并回退。"
      : `第 ${current + 1} / ${STAGES.length} 步：${STAGES[current].title} 已留下可复核证据。`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-topic-26-balance-resources-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            Topic 26 · 资源平衡实验台
          </span>
          <button
            type="button"
            aria-pressed={fault}
            aria-label="注入异常路径未释放故障"
            onClick={() => setFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {fault ? "已注入：异常路径未释放" : "注入异常路径故障"}
          </button>
        </div>
        <BalanceFlowSvg
          current={current}
          fault={fault}
          ariaLabel="资源平衡交互实验台，可逐步推进获取到释放链并注入异常路径未释放故障。"
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
            onClick={() => setCurrent((value) => Math.max(0, value - 1))}
          >
            上一步
          </button>
          <button
            type="button"
            className="min-h-11 rounded-control border border-accent px-3 py-2 text-xs text-accent hover:text-primary"
            onClick={() =>
              setCurrent((value) => Math.min(STAGES.length - 1, value + 1))
            }
          >
            下一步
          </button>
          <button
            type="button"
            aria-label="重置资源平衡实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测首差，再推进链路；重置后应回到获取节点和未注入状态。
      </figcaption>
    </figure>
  );
}
