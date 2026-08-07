"use client";

import { useState } from "react";

const VIEW_W = 960;
const VIEW_H = 460;
const CARD_W = 156;
const CARD_H = 174;
const START_X = 24;
const START_Y = 112;
const GAP = 28;

const COLORS = {
  accent: "var(--accent)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  success: "var(--success)",
  danger: "var(--danger)",
} as const;

const CHAPTER_PROMPT = "提示36：你无法写出完美的软件";

const STAGES = [
  {
    key: "contract",
    title: "契约",
    evidence: "前置 / 后置",
    handoff: "明确责任",
    question: "谁承诺什么？",
  },
  {
    key: "validation",
    title: "校验",
    evidence: "边界输入",
    handoff: "拒绝非法",
    question: "错误能否早见？",
  },
  {
    key: "isolation",
    title: "失败隔离",
    evidence: "断言首差",
    handoff: "停止传播",
    question: "哪个状态不可信？",
  },
  {
    key: "ownership",
    title: "资源平衡",
    evidence: "取得 / 释放",
    handoff: "责任闭合",
    question: "谁负责归还？",
  },
  {
    key: "feedback",
    title: "前灯范围",
    evidence: "小步重放",
    handoff: "可观测回退",
    question: "下一步多大？",
  },
] as const;

function stageX(index: number) {
  return START_X + index * (CARD_W + GAP);
}

function focusForLesson(step?: 1 | 2 | 3) {
  return step === undefined ? STAGES.length - 1 : [1, 2, 4][step - 1];
}

function Arrow({ index }: { index: number }) {
  const x1 = stageX(index) + CARD_W + 4;
  const x2 = stageX(index + 1) - 8;
  const y = START_Y + CARD_H / 2;
  return (
    <g fill="none" stroke={COLORS.border} strokeWidth="1.5">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <polygon
        points={`${x2},${y} ${x2 - 8},${y - 5} ${x2 - 8},${y + 5}`}
        fill={COLORS.secondary}
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
  const tone = fault ? COLORS.danger : active ? COLORS.accent : COLORS.primary;

  return (
    <g aria-label={`${stage.title}：${stage.evidence}`} opacity={reached ? 1 : 0.34}>
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height={CARD_H}
        rx="12"
        fill={COLORS.elevated}
        stroke={fault || active ? tone : COLORS.border}
        strokeWidth={fault || active ? "2" : "1.2"}
      />
      <rect
        x={x}
        y={START_Y}
        width={CARD_W}
        height="46"
        rx="12"
        fill={tone}
        fillOpacity={fault || active ? "0.18" : "0.08"}
      />
      <rect
        x={x}
        y={START_Y + 34}
        width={CARD_W}
        height="12"
        fill={tone}
        fillOpacity={fault || active ? "0.18" : "0.08"}
      />
      <circle
        cx={x + 24}
        cy={START_Y + 23}
        r="12"
        fill={tone}
        fillOpacity="0.16"
        stroke={tone}
      />
      <text
        x={x + 24}
        y={START_Y + 27}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={tone}
      >
        {index + 1}
      </text>
      <text
        x={x + CARD_W / 2 + 8}
        y={START_Y + 29}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={tone}
      >
        {stage.title}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 78}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault ? COLORS.danger : COLORS.primary}
      >
        {fault ? "不变量被破坏" : stage.evidence}
      </text>
      <text
        x={x + CARD_W / 2}
        y={START_Y + 111}
        textAnchor="middle"
        fontSize="12"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault ? "此处停止传播" : `交接：${stage.handoff}`}
      </text>
      <line
        x1={x + 16}
        y1={START_Y + 130}
        x2={x + CARD_W - 16}
        y2={START_Y + 130}
        stroke={fault ? COLORS.danger : COLORS.border}
        strokeOpacity="0.8"
      />
      <text
        x={x + CARD_W / 2}
        y={START_Y + 153}
        textAnchor="middle"
        fontSize="11"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault ? "首差：失败隔离" : stage.question}
      </text>
    </g>
  );
}

function ParanoiaSvg({
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
        fill={COLORS.primary}
      >
        第4章：把不完美限制在可观察的边界内
      </text>
      <text
        x={VIEW_W / 2}
        y="56"
        textAnchor="middle"
        fontSize="12"
        fill={COLORS.secondary}
      >
        {CHAPTER_PROMPT} · 契约 → 校验 → 失败隔离 → 资源平衡 → 前灯范围
      </text>
      <text
        x={START_X + CARD_W / 2}
        y="86"
        textAnchor="middle"
        fontSize="11"
        fill={COLORS.secondary}
      >
        进入：invoice-42
      </text>
      {STAGES.slice(0, -1).map((stage, index) => (
        <Arrow key={`${stage.key}-to-${STAGES[index + 1].key}`} index={index} />
      ))}
      {STAGES.map((stage, index) => (
        <StageCard
          key={`${stage.key}-${index}`}
          index={index}
          active={index === focus}
          reached={index <= focus}
          fault={fault && index === 2}
        />
      ))}
      <rect
        x="46"
        y="330"
        width="868"
        height="76"
        rx="12"
        fill={fault ? COLORS.danger : COLORS.accent}
        fillOpacity="0.08"
        stroke={fault ? COLORS.danger : COLORS.border}
      />
      <text
        x={VIEW_W / 2}
        y="357"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={fault ? COLORS.danger : COLORS.primary}
      >
        {fault
          ? "拒绝：断言缺失，内部状态不再可信；不要继续结算"
          : "验收合同：每个节点交出责任、状态变化和下一步拒绝条件"}
      </text>
      <text
        x={VIEW_W / 2}
        y="382"
        textAnchor="middle"
        fontSize="11"
        fill={fault ? COLORS.danger : COLORS.secondary}
      >
        {fault
          ? "修法：补回断言，从同一输入重放，并核对资源释放结果"
          : "只改变一个条件；保留首差、未知项和可回退入口"}
      </text>
      <text
        x={VIEW_W / 2}
        y="440"
        textAnchor="middle"
        fontSize="11"
        fill={COLORS.secondary}
      >
        图示展示因果边界，不代表真实生产指标
      </text>
    </svg>
  );
}

export function Tpp20Chapter04PragmaticParanoiaDiagram({
  step,
}: {
  step?: 1 | 2 | 3;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-chapter-04-pragmatic-paranoia-diagram"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <ParanoiaSvg
          focus={focusForLesson(step)}
          fault={false}
          ariaLabel="第4章务实的偏执专属五节点因果图，展示契约、校验、失败隔离、资源平衡和前灯范围如何限制损害。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一次只改变一个条件，才能把不完美限制在第一处可解释的边界。
      </figcaption>
    </figure>
  );
}

export function Tpp20Chapter04PragmaticParanoiaLab() {
  const [step, setStep] = useState(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const fault = faultInjected && step >= 2;

  const reset = () => {
    setStep(0);
    setFaultInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="tpp20-chapter-04-pragmatic-paranoia-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            第4章 · 单故障实验台
          </span>
          <button
            type="button"
            aria-pressed={faultInjected}
            aria-label="注入单故障：移除断言"
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              faultInjected
                ? "border-danger text-danger"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {faultInjected ? "已注入：断言缺失" : "注入单故障"}
          </button>
        </div>
        <ParanoiaSvg
          focus={step}
          fault={fault}
          ariaLabel="第4章务实的偏执故障实验台，可逐步观察移除断言后失败隔离节点如何阻止错误继续传播。"
        />
        <p
          className="mt-3 text-center text-xs text-secondary"
          role="status"
          aria-live="polite"
        >
          {fault
            ? "首差：失败隔离。内部状态不可信，后续节点拒绝接收。"
            : `第 ${step + 1} / ${STAGES.length} 步：${STAGES[step].title} 已留下交接证据。`}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            上一步
          </button>
          <button
            type="button"
            className="min-h-11 rounded-control border border-accent px-3 py-2 text-xs text-accent hover:text-primary"
            onClick={() => setStep((value) => Math.min(STAGES.length - 1, value + 1))}
          >
            下一步
          </button>
          <button
            type="button"
            aria-label="重置实验台"
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验台
          </button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        断言缺失不应被“继续运行”掩盖；恢复后必须用同一输入验证释放与回退。
      </figcaption>
    </figure>
  );
}
