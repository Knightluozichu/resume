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
  { label: "表示", detail: "纯文本" },
  { label: "组合", detail: "Shell" },
  { label: "变换", detail: "编辑器" },
  { label: "历史", detail: "版本控制" },
  { label: "记录", detail: "工程日记" },
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

export function Tpp20Chapter03BasicToolsLoopDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="chapter-03-basic-tools-loop"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="从可读表示、组合工具、自动变换、历史追踪到工程日记的可复现工具链"
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
          可复现工具链：每次变换都留下下一次重放的入口
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          可读、可组合、可撤销、可定位、可复盘
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
                {active ? "当前放大点" : index < 3 ? "已留证据" : "待记录"}
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
          工具越强，越要保留输入、版本、差异和回退
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：基础工具沿着证据链协作，而不是依赖个人记忆。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "输入", normal: "可读", boundary: "编码变了", fault: "未冻结" },
  { label: "命令", normal: "可重放", boundary: "权限不足", fault: "无中间点" },
  { label: "差异", normal: "可定位", boundary: "范围扩大", fault: "首差丢失" },
  { label: "恢复", normal: "可回退", boundary: "先缩小", fault: "无历史" },
] as const;

export function Tpp20Chapter03BasicToolsEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="chapter-03-basic-tools-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="基础工具链正常、边界和单一故障样本的证据矩阵"
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
          工具证据矩阵：看首个异常，而不是最后的破坏
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看重放，边界样本看停止，故障样本看回退
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
          没有输入、版本和差异，就没有可复现的工具结果
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：三类样本共同检查工具链的证据与恢复能力。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "可重放",
    tone: COLORS.success,
    input: "纯文本输入、命令、工具版本和提交基线都已冻结。",
    firstChange: "没有异常首差，输出与历史差异都可定位。",
    action: "保留结果，让第二名成员重放并记录日记。",
  },
  {
    label: "先缩小",
    tone: COLORS.warning,
    input: "批量脚本遇到较大数据量，输出仍成功但运行时间和范围改变。",
    firstChange: "边界先发生变化，不能把小样本结论推广到全量。",
    action: "缩小输入、加中间观测并设定容量门槛。",
  },
  {
    label: "必须回退",
    tone: COLORS.danger,
    input: "宏改坏多个文件，且没有基线提交、预览或工程日记。",
    firstChange: "历史证据先缺失，无法安全判断或继续扩大。",
    action: "停止操作，恢复可知状态并重建最小样本。",
  },
] as const;

export function Tpp20Chapter03BasicToolsLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="chapter-03-basic-tools-lab"
      aria-label="基础工具链实验"
      aria-labelledby="chapter-03-basic-tools-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="chapter-03-basic-tools-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择工具链样本，定位首个变化
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
        aria-label="选择工具链样本"
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
        先固定输入和基线，再运行命令；工具的速度不能替代差异、日志和回退。
      </p>
    </section>
  );
}
