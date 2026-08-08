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
  { label: "主张", detail: "我要说什么" },
  { label: "定位", detail: "来源在哪里" },
  { label: "证据", detail: "观察到什么" },
  { label: "边界", detail: "何时不适用" },
  { label: "复核", detail: "谁能重建" },
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

export function Tpp20BibliographyLoopDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="bibliography-loop"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="从主张、引用定位、原始证据、适用边界到独立复核的证据链"
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
          证据链：链接只有接上边界才支持结论
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每一站都记录输入、首差、责任人和下一步复核
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
                {active ? "当前边界点" : index < 3 ? "已留证据" : "待复核"}
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
          证据缺口出现时暂停，不把来源数量当成结论强度
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：主张只有经过定位、证据和边界，才交给独立复核。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "版本", normal: "已冻结", boundary: "发生漂移", fault: "未记录" },
  { label: "坐标", normal: "可定位", boundary: "仅有摘要", fault: "链接失效" },
  { label: "边界", normal: "已声明", boundary: "接近阈值", fault: "被省略" },
  { label: "复核", normal: "可重建", boundary: "需缩小", fault: "无法重放" },
] as const;

export function Tpp20BibliographyEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="bibliography-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="参考文献正常、边界和单一故障样本的证据矩阵"
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
          证据矩阵：看首个缺口，而不是看最后一张截图
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看闭合，边界样本看缩小，故障样本看暂停与恢复
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
                const value = row[column.key];
                return (
                  <text
                    key={`${row.label}-${column.key}`}
                    x={x + 101}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="13"
                    fill={column.tone}
                  >
                    {value}
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
          任何一列不能重建，就把结论降级为线索或暂停
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：同一条证据链在正常、边界和单一故障下的第一处差异。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "可接受",
    tone: COLORS.success,
    claim: "主张、版本和坐标一致，独立复核者能重放样本。",
    firstChange: "没有异常首差，证据链闭合。",
    action: "接受有限结论，并记录不支持的范围。",
  },
  {
    label: "需缩小",
    tone: COLORS.warning,
    claim: "第二来源使用不同版本，结果只在原环境成立。",
    firstChange: "适用边界先发生变化，不能推广到当前环境。",
    action: "缩小主张，补当前实验后再决定。",
  },
  {
    label: "必须暂停",
    tone: COLORS.danger,
    claim: "链接失效且没有坐标，只有一张无法重建的结果截图。",
    firstChange: "原始证据缺口先暴露，结论不可发布。",
    action: "补齐证据包或撤回主张，不用截图代替复核。",
  },
] as const;

export function Tpp20BibliographyLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="bibliography-lab"
      aria-label="参考文献证据实验"
      aria-labelledby="bibliography-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="bibliography-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择证据样本，定位首个变化
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
        aria-label="选择证据样本"
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
          <p className="mt-1 text-sm text-primary">{current.claim}</p>
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
        先定位证据缺口，再选择接受、缩小或暂停；不要用来源数量掩盖无法重建的过程。
      </p>
    </section>
  );
}
