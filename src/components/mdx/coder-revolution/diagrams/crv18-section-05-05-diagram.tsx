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

const OFFICIAL_CONCEPT_LABELS = [
  "5.5 命令式编程 VS 声明式编程",
  "一则小故事",
  "命令式编程",
  "声明式编程",
] as const;

const PLAN_STAGES = [
  { label: "描述目标", detail: "结果 + 边界" },
  { label: "解析约束", detail: "数据 + 权限" },
  { label: "生成计划", detail: "路径 + 成本" },
  { label: "执行计划", detail: "算子 + 状态" },
  { label: "核对结果", detail: "输出 + 证据" },
] as const;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line
        x1={x1}
        y1={y}
        x2={x2 - 12}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 21} ${y - 7} L${x2} ${y} L${x2 - 21} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Crv18Section0505PlanDiagram() {
  const cardWidth = 164;
  const gap = 18;
  const startX = 24;
  const cardY = 120;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-05-05-plan"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label={`5.5 命令式编程 VS 声明式编程计划证据链：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
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
          从目标到结果：声明式描述与命令式步骤的交界
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          描述式输入允许执行器用全局信息选计划，步骤式输入由程序员直接控制状态变化
        </text>
        {PLAN_STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {PLAN_STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const active = index === 2;
          return (
            <g key={stage.label}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="150"
                rx="14"
                fill={active ? COLORS.accent : COLORS.elevated}
                fillOpacity={active ? "0.12" : "1"}
                stroke={active ? COLORS.accent : COLORS.border}
                strokeWidth={active ? "2" : "1"}
              />
              <circle
                cx={x + 24}
                cy={cardY + 29}
                r="12"
                fill={
                  active
                    ? COLORS.accent
                    : index < 2
                      ? COLORS.success
                      : COLORS.border
                }
              />
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
                fontSize="15"
                fontWeight="700"
                fill={active ? COLORS.accent : COLORS.primary}
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
                fill={active ? COLORS.accent : COLORS.secondary}
              >
                {active ? "优化边界" : index < 2 ? "输入证据" : "输出证据"}
              </text>
            </g>
          );
        })}
        <rect
          x="24"
          y="326"
          width="892"
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
          声明式描述隐藏步骤，不隐藏执行计划、资源成本和结果验证
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把目标、约束、计划、执行和结果放在同一条可审计链上。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "目标", normal: "结果明确", boundary: "约束变化", fault: "目标含糊" },
  { label: "计划", normal: "路径可解释", boundary: "成本上升", fault: "误选路径" },
  { label: "执行", normal: "状态稳定", boundary: "资源紧张", fault: "中途失败" },
  { label: "结果", normal: "可复核", boundary: "尾延迟上升", fault: "错误输出" },
] as const;

export function Crv18Section0505EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-05-05-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="5.5 命令式编程 VS 声明式编程在正常边界故障场景下的目标计划执行结果证据矩阵"
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
          计划证据矩阵：最终结果遮不住中间成本
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看结果，边界样本看计划变化，故障样本看最早偏离
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
          先保存计划、资源、执行时序和输出，再判断两种写法是否等价
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：让命令式步骤和声明式计划的差异成为可诊断证据。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "命令式步骤",
    tone: COLORS.success,
    title: "程序明确指定遍历、过滤和写入的顺序",
    evidence:
      "imperative=steps → state=explicit → order=fixed → output=observed",
    decision: "accept：状态变化与控制流可追踪",
  },
  {
    id: 2,
    label: "声明式计划",
    tone: COLORS.warning,
    title: "程序描述结果和约束，执行器根据数据选择路径",
    evidence:
      "declarative=goal → constraints=parsed → plan=chosen → result=checked",
    decision: "review：检查计划与资源成本",
  },
  {
    id: 3,
    label: "隐藏计划成本",
    tone: COLORS.danger,
    title: "结果相同但计划扫描全表，尾延迟和资源消耗超出合同",
    evidence:
      "goal=same → plan=full-scan → cost=high → tail-latency=up",
    decision: "fail：补充索引、约束或计划证据",
  },
] as const;

export function Crv18Section0505PlanLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-05-05-plan-lab"
      aria-label="命令式与声明式计划实验"
      aria-labelledby="crv18-section-05-05-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-05-05-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            命令式与声明式计划实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            先预测偏差会落在步骤、计划还是资源成本，再切换显式控制、执行器选计划与隐藏成本样本。
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
        aria-label="命令式与声明式实验场景选择"
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
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
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
        当前样本：{scenario.label}；保存目标、约束、计划、资源、执行时序、输出和复位轨迹。
      </p>
    </section>
  );
}
