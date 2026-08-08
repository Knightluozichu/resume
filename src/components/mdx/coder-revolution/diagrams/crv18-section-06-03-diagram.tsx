"use client";

import { useState } from "react";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
};

const STAGES = [
  { label: "澄清约束", detail: "目标 + 预算", tone: COLORS.success },
  { label: "建立模型", detail: "状态 + 边界", tone: COLORS.accent },
  { label: "比较方案", detail: "取舍 + 证据", tone: COLORS.warning },
  { label: "推动实施", detail: "责任 + 阶段", tone: COLORS.accent },
  { label: "验证结果", detail: "反馈 + 修正", tone: COLORS.success },
] as const;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line
        x1={x1}
        y1={y}
        x2={x2 - 13}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 22} ${y - 7} L${x2} ${y} L${x2 - 22} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Crv18Section0603ArchitectureDiagram() {
  const cardWidth = 164;
  const gap = 20;
  const startX = 22;
  const cardY = 119;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-06-03-architecture"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="架构决策从澄清约束到验证结果的五个节点"
        className="mx-auto block h-auto w-full max-w-[940px]"
      >
        <text
          x="470"
          y="34"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill={COLORS.primary}
        >
          架构成长：把经验变成可复核的决策闭环
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          模型、取舍、实施、反馈共同承担技术领导力
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={188} />;
        })}
        {STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const highlight = index === 2;
          return (
            <g key={stage.label}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="150"
                rx="14"
                fill={highlight ? COLORS.accent : COLORS.elevated}
                fillOpacity={highlight ? "0.12" : "1"}
                stroke={highlight ? COLORS.accent : COLORS.border}
                strokeWidth={highlight ? "2" : "1"}
              />
              <circle cx={x + 24} cy={cardY + 29} r="12" fill={stage.tone} />
              <text
                x={x + 24}
                y={cardY + 34}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={COLORS.elevated}
              >
                {index + 1}
              </text>
              <text
                x={x + 46}
                y={cardY + 34}
                fontSize="14"
                fontWeight="700"
                fill={highlight ? COLORS.accent : COLORS.primary}
              >
                {stage.label}
              </text>
              <line
                x1={x + 18}
                y1={cardY + 58}
                x2={x + cardWidth - 18}
                y2={cardY + 58}
                stroke={COLORS.border}
              />
              <text
                x={x + cardWidth / 2}
                y={cardY + 91}
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.primary}
              >
                {stage.detail}
              </text>
              <text
                x={x + cardWidth / 2}
                y={cardY + 123}
                textAnchor="middle"
                fontSize="12"
                fill={highlight ? COLORS.accent : COLORS.secondary}
              >
                {highlight ? "共同判断" : index === 4 ? "闭环证据" : "行动证据"}
              </text>
            </g>
          );
        })}
        <rect
          x="22"
          y="326"
          width="896"
          height="42"
          rx="12"
          fill={COLORS.warning}
          fillOpacity="0.1"
          stroke={COLORS.warning}
        />
        <text
          x="470"
          y="352"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={COLORS.primary}
        >
          没有反馈和回退的架构图，只是一份未验证的假设
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把架构师成长落到约束、取舍和反馈可重放的链路。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "问题",
    normal: "目标清楚",
    boundary: "预算收紧",
    fault: "隐含约束",
  },
  {
    label: "方案",
    normal: "两项取舍",
    boundary: "回退保留",
    fault: "单一偏好",
  },
  {
    label: "实施",
    normal: "责任明确",
    boundary: "阶段停止",
    fault: "无人负责",
  },
  {
    label: "反馈",
    normal: "指标闭环",
    boundary: "模型修正",
    fault: "只复盘人",
  },
] as const;

export function Crv18Section0603EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-06-03-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="架构决策在正常边界故障场景下的证据矩阵"
        className="mx-auto block h-auto w-full max-w-[940px]"
      >
        <text
          x="470"
          y="34"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill={COLORS.primary}
        >
          架构证据矩阵：决策记录与运行反馈分开验收
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常看闭环，边界看停止与回退，故障看首个模型偏差
        </text>
        <rect
          x="24"
          y="84"
          width="892"
          height="44"
          rx="10"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text
          x="48"
          y="112"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.primary}
        >
          观察项
        </text>
        {columns.map((column, index) => {
          const x = 244 + index * 224;
          return (
            <g key={column.key}>
              <circle cx={x + 18} cy="106" r="6" fill={column.tone} />
              <text
                x={x + 34}
                y="112"
                fontSize="14"
                fontWeight="700"
                fill={column.tone}
              >
                {column.title}
              </text>
            </g>
          );
        })}
        {EVIDENCE_ROWS.map((row, rowIndex) => {
          const y = 136 + rowIndex * 54;
          return (
            <g key={row.label}>
              <rect
                x="24"
                y={y}
                width="892"
                height="44"
                rx="10"
                fill={rowIndex % 2 === 0 ? COLORS.elevated : "transparent"}
                stroke={COLORS.border}
              />
              <text
                x="48"
                y={y + 28}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                {row.label}
              </text>
              <text x="278" y={y + 28} fontSize="13" fill={COLORS.primary}>
                {row.normal}
              </text>
              <text x="502" y={y + 28} fontSize="13" fill={COLORS.primary}>
                {row.boundary}
              </text>
              <text x="726" y={y + 28} fontSize="13" fill={COLORS.primary}>
                {row.fault}
              </text>
            </g>
          );
        })}
        <rect
          x="24"
          y="356"
          width="892"
          height="26"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.1"
        />
        <text
          x="470"
          y="374"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.primary}
        >
          先保存约束、选项、责任、指标和回退，再评价领导力
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：同一份矩阵覆盖架构讨论、实施和复盘。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "闭环决策",
    tone: COLORS.success,
    title: "约束清楚，两个方案可比较，实施阶段有指标和回退",
    evidence: "constraints → model → options → rollout → metrics/rollback",
    decision: "accept：团队能重放为何这样选以及怎样修正",
  },
  {
    id: 2,
    label: "预算收紧",
    tone: COLORS.warning,
    title: "容量预算变小，原方案需要分阶段或替换边界",
    evidence: "same goal → tighter budget → tradeoff → staged rollout",
    decision: "adapt：保留目标，显式改变取舍和停止条件",
  },
  {
    id: 3,
    label: "反馈故障",
    tone: COLORS.danger,
    title: "线上指标恶化但决策没有责任与回退路径",
    evidence: "model assumption → metric drift → no owner/rollback → reset",
    decision: "repair：补责任、指标、复盘和回退权限",
  },
] as const;

export function Crv18Section0603ArchitectureLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];
  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-06-03-architecture-lab"
      aria-label="架构决策反馈闭环实验"
      aria-labelledby="crv18-section-06-03-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-06-03-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            架构决策反馈闭环实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            只改变约束或反馈状态，观察取舍、责任和回退怎样变化。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={() => setScenarioId(1)}
          aria-label="重置实验"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-5 grid gap-3 sm:grid-cols-3"
        role="tablist"
        aria-label="架构决策实验场景选择"
      >
        {LAB_SCENARIOS.map((item) => {
          const selected = item.id === scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-accent"}`}
              onClick={() => setScenarioId(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                样本 {item.id}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: scenario.tone }}
            />
            <p className="font-semibold text-primary">{scenario.title}</p>
          </div>
          <p className="mt-3 break-words font-mono text-xs text-secondary">
            {scenario.evidence}
          </p>
        </div>
        <div className="rounded-card border border-border p-4 md:min-w-64">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            判定
          </p>
          <p
            className="mt-2 text-sm font-semibold"
            style={{ color: scenario.tone }}
          >
            {scenario.decision}
          </p>
        </div>
      </div>
      <p
        className="mt-4 text-xs text-secondary"
        role="status"
        aria-live="polite"
      >
        当前样本：{scenario.label}；保存约束、方案、责任、指标、回退和复位结果。
      </p>
    </section>
  );
}
