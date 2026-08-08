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
  { label: "请求", detail: "输入与验收" },
  { label: "运行时", detail: "线程与协议" },
  { label: "状态", detail: "数据与一致性" },
  { label: "发布", detail: "构建与回退" },
  { label: "反馈", detail: "复盘与更新" },
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

export function Crv18OfficialFinalReviewLoopDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-final-review-loop"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="从用户请求、运行时处理、状态持久化、变更发布到反馈复盘的全书复核链"
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
          全书复核链：一次请求贯穿机制与反馈
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每一层交接状态、证据、责任和回退，而不是只交接故事
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {STAGES.map((stage, index) => {
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
                    : index < 3
                      ? COLORS.success
                      : COLORS.border
                }
                fillOpacity={index <= 3 ? "1" : "0.45"}
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
                {active ? "当前交接点" : index < 3 ? "已观察" : "待复核"}
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
          最终成功不能覆盖中途越界，首个偏离才是诊断入口
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：全书知识沿一次请求和一次变更形成可复核闭环。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "请求", normal: "可追踪", boundary: "超时", fault: "无标识" },
  { label: "状态", normal: "一致", boundary: "重复写", fault: "未观测" },
  { label: "发布", normal: "可回退", boundary: "旧版本", fault: "无基线" },
  { label: "反馈", normal: "可更新", boundary: "影响扩大", fault: "只归责" },
] as const;

export function Crv18OfficialFinalReviewEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-final-review-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="全书复核正常、边界和单一故障样本的证据矩阵"
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
          跨层证据矩阵：定位第一处偏离
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看闭环，边界样本看停止，故障样本看回退
        </text>
        <rect
          x="24"
          y="86"
          width="892"
          height="46"
          rx="12"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text
          x="50"
          y="115"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.primary}
        >
          观察项
        </text>
        {columns.map((column, index) => {
          const x = 230 + index * 228;
          return (
            <g key={column.key}>
              <rect
                x={x}
                y="92"
                width="202"
                height="34"
                rx="9"
                fill={column.tone}
                fillOpacity="0.12"
                stroke={column.tone}
              />
              <text
                x={x + 101}
                y="114"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={column.tone}
              >
                {column.title}
              </text>
            </g>
          );
        })}
        {EVIDENCE_ROWS.map((row, rowIndex) => {
          const y = 144 + rowIndex * 48;
          return (
            <g key={row.label}>
              <rect
                x="24"
                y={y}
                width="892"
                height="40"
                rx="9"
                fill={rowIndex % 2 === 0 ? COLORS.elevated : "transparent"}
                stroke={COLORS.border}
              />
              <text
                x="50"
                y={y + 25}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                {row.label}
              </text>
              {columns.map((column, index) => {
                const x = 230 + index * 228;
                return (
                  <text
                    key={`${row.label}-${column.key}`}
                    x={x + 101}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="13"
                    fill={column.tone}
                  >
                    {row[column.key]}
                  </text>
                );
              })}
            </g>
          );
        })}
        <rect
          x="24"
          y="348"
          width="892"
          height="28"
          rx="9"
          fill={COLORS.warning}
          fillOpacity="0.1"
          stroke={COLORS.warning}
        />
        <text
          x="470"
          y="367"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.primary}
        >
          跨层没有可追踪标识，就不能把反馈归因给正确的机制
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：请求、状态、发布和反馈在三类样本下的证据变化。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "闭环",
    tone: COLORS.success,
    input: "请求标识、版本、运行时轨迹、持久化状态、发布记录和反馈齐全。",
    firstChange: "没有异常首差，另一名复核者可以重放整条链。",
    action: "接受结论，登记覆盖范围和下次复核。",
  },
  {
    label: "先隔离",
    tone: COLORS.warning,
    input: "请求重试成功，但新旧版本造成重复写入，缓存与数据库短暂不一致。",
    firstChange: "持久化状态先偏离，最终响应不能抹平中间风险。",
    action: "隔离流量、检查幂等与回退，再决定发布。",
  },
  {
    label: "必须回退",
    tone: COLORS.danger,
    input: "只有用户截图，没有请求标识、版本基线和运行时观测。",
    firstChange: "跨层证据先缺失，无法判断哪一层改变了状态。",
    action: "恢复可观测基线并重放，不用截图关闭复核。",
  },
] as const;

export function Crv18OfficialFinalReviewLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-final-review-lab"
      aria-label="全书跨层复核实验"
      aria-labelledby="crv18-final-review-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="crv18-final-review-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择跨层样本，决定接受、隔离或回退
          </h3>
        </div>
        <span
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold"
          style={{ color: current.tone }}
        >
          {current.label}
        </span>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="选择跨层样本"
      >
        {LAB_SCENARIOS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`min-h-11 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary transition hover:border-accent ${scenario === index ? "border-accent bg-accent/10 text-accent" : ""}`}
            aria-pressed={scenario === index}
            onClick={() => setScenario(index)}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className="min-h-11 rounded-full border border-border px-4 py-2 text-sm font-medium text-secondary transition hover:border-accent hover:text-primary"
          aria-label="重置样本"
          onClick={() => setScenario(1)}
        >
          重置样本
        </button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">输入</p>
          <p className="mt-1 text-sm text-primary">{current.input}</p>
        </div>
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">首个变化</p>
          <p className="mt-1 text-sm text-primary">{current.firstChange}</p>
        </div>
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">裁决动作</p>
          <p className="mt-1 text-sm text-primary">{current.action}</p>
        </div>
      </div>
      <p className="mt-4 rounded-lg border border-border bg-background p-3 text-sm text-secondary">
        先固定请求和版本，再沿状态、发布与反馈查首差；最终成功不是唯一证据。
      </p>
    </section>
  );
}
