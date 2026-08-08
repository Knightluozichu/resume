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
  { label: "概念", detail: "要传什么" },
  { label: "译名", detail: "怎么表达" },
  { label: "语境", detail: "哪里适用" },
  { label: "误读", detail: "哪里失真" },
  { label: "复核", detail: "谁来重述" },
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

export function Tpp20TranslatorPostfaceLoopDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="translator-postface-loop"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="从原文概念、译名选择、中文语境、可能误读到读者复核的术语诊断链"
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
          术语诊断链：让选择、边界和误读可见
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          读者复核不是投票，而是重述、举例和指出反例
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const active = index === 3;
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
                {active ? "当前诊断点" : index < 3 ? "已记录" : "待复核"}
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
          发现误读时修订解释，不删除读者的失败样本
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：从概念选择到读者复核，首个误读是诊断入口。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "概念", normal: "边界清楚", boundary: "语境变化", fault: "未定义" },
  { label: "译名", normal: "取舍可见", boundary: "需注释", fault: "字面误导" },
  { label: "误读", normal: "可解释", boundary: "动作改变", fault: "未记录" },
  { label: "复核", normal: "可重述", boundary: "补例句", fault: "无法复核" },
] as const;

export function Tpp20TranslatorPostfaceEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="translator-postface-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="术语正常、边界和单一故障样本的证据矩阵"
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
          术语证据矩阵：看误读的第一处变化
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看语义闭合，边界样本看注释，故障样本看回退
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
          读者无法复述时降低承诺，补充定义或例句
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：同一个术语在三类样本中的首个语义变化。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "概念闭合",
    tone: COLORS.success,
    input: "读者能用译名复述动作、边界，并给出适用和不适用例子。",
    firstChange: "没有异常首差，译名和概念可以对应。",
    action: "保留译名，记录版本和读者复核。",
  },
  {
    label: "需要注释",
    tone: COLORS.warning,
    input: "译名易读，但在另一个行业语境中触发了更宽的行动。",
    firstChange: "语境先发生变化，读者把边界理解成默认规则。",
    action: "增加原词、例句和停止条件，再复核。",
  },
  {
    label: "必须修订",
    tone: COLORS.danger,
    input: "多个独立读者按字面采取相反动作，且无法指出原概念边界。",
    firstChange: "概念与译名的映射先失真，流畅度不能补救。",
    action: "修订或并列术语，保存误读样本并重新验证。",
  },
] as const;

export function Tpp20TranslatorPostfaceLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="translator-postface-lab"
      aria-label="译者术语复核实验"
      aria-labelledby="translator-postface-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="translator-postface-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择术语样本，定位首个歧义
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
        aria-label="选择术语样本"
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
        先让读者说出行动，再决定保留、注释或修订；流畅不等于语义闭合。
      </p>
    </section>
  );
}
