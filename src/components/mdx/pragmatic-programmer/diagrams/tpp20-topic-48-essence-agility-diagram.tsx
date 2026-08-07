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
  { label: "目标", detail: "定义结果" },
  { label: "交付", detail: "切出薄片" },
  { label: "观察", detail: "获得反馈" },
  { label: "学习", detail: "修正假设" },
  { label: "调整", detail: "改变下一步" },
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

export function Tpp20Topic48EssenceAgilityLoopDiagram() {
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="essence-agility-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="从目标、小步交付、观察、学习到调整的敏捷反馈回路"
        className="mx-auto block h-auto w-full max-w-[960px]"
      >
        <text
          x="480"
          y="34"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill={COLORS.primary}
        >
          敏捷回路：让反馈改变下一步，而不是只完成仪式
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          小步交付缩短实验周期，观察和学习让调整有证据
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
                cx={x + 25}
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
                x={x + 25}
                y={cardY + 34}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={COLORS.elevated}
              >
                {index + 1}
              </text>
              <text
                x={x + 48}
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
                {active ? "当前反馈点" : index < 3 ? "已观察" : "待行动"}
              </text>
            </g>
          );
        })}
        <rect
          x="22"
          y="326"
          width="916"
          height="42"
          rx="12"
          fill={COLORS.warning}
          fillOpacity="0.1"
          stroke={COLORS.warning}
        />
        <text
          x="480"
          y="352"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={COLORS.primary}
        >
          仪式的价值来自它产生的反馈和决定，不来自它被按时执行
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：敏捷把目标、交付、观察、学习和调整连接成一轮可验证实验。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "假设",
    normal: "目标可观察",
    boundary: "约束保留",
    fault: "范围漂移",
  },
  {
    label: "反馈",
    normal: "用户可见",
    boundary: "延迟可判",
    fault: "信号失联",
  },
  {
    label: "决定",
    normal: "下一步改变",
    boundary: "明确暂停",
    fault: "仪式照旧",
  },
  {
    label: "恢复",
    normal: "重放结果",
    boundary: "保留安全",
    fault: "回到基线",
  },
] as const;

export function Tpp20Topic48EssenceAgilityEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="essence-agility-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="敏捷实践正常、边界和单一故障样本的证据矩阵"
        className="mx-auto block h-auto w-full max-w-[960px]"
      >
        <text
          x="480"
          y="34"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill={COLORS.primary}
        >
          证据矩阵：调整必须能被反馈和结果解释
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看交付，边界样本看约束，故障样本看恢复
        </text>
        <rect
          x="24"
          y="86"
          width="912"
          height="46"
          rx="12"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text
          x="48"
          y="115"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.primary}
        >
          观察项
        </text>
        {columns.map((column, index) => {
          const x = 228 + index * 236;
          return (
            <g key={column.key}>
              <rect
                x={x}
                y="95"
                width="196"
                height="28"
                rx="14"
                fill={column.tone}
                fillOpacity="0.13"
                stroke={column.tone}
              />
              <text
                x={x + 98}
                y="115"
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
          const y = 149 + rowIndex * 48;
          return (
            <g key={row.label}>
              <rect
                x="24"
                y={y}
                width="180"
                height="38"
                rx="9"
                fill={COLORS.elevated}
                stroke={COLORS.border}
              />
              <text
                x="48"
                y={y + 24}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                {row.label}
              </text>
              {columns.map((column, columnIndex) => {
                const x = 228 + columnIndex * 236;
                return (
                  <g key={`${row.label}-${column.key}`}>
                    <rect
                      x={x}
                      y={y}
                      width="196"
                      height="38"
                      rx="9"
                      fill={column.tone}
                      fillOpacity="0.07"
                      stroke={COLORS.border}
                    />
                    <text
                      x={x + 98}
                      y={y + 24}
                      textAnchor="middle"
                      fontSize="13"
                      fill={COLORS.primary}
                    >
                      {row[column.key]}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <rect
          x="24"
          y="354"
          width="912"
          height="24"
          rx="8"
          fill={COLORS.accent}
          fillOpacity="0.1"
        />
        <text
          x="480"
          y="371"
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill={COLORS.primary}
        >
          保存假设、反馈、决定、必要约束和回退记录，才能区分学习与表演
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：敏捷证据同时覆盖学习结果、边界约束和失败后的恢复。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "仪式有价值",
    tone: COLORS.success,
    evidence:
      "短回顾暴露了用户流失假设，团队改变了下一片的入口并得到新的完成率反馈。",
    firstChange:
      "学习节点：反馈改变了优先级和设计，仪式输出可以被用户结果验证。",
    recovery: "保留短回顾，记录假设、决定和结果；下一轮继续检查输出是否有效。",
  },
  {
    label: "形式表演",
    tone: COLORS.warning,
    evidence:
      "站会按时举行，成员轮流报告进度，但阻塞和用户风险仍在发布前才被发现。",
    firstChange: "反馈节点：活动没有产生可行动信息，目标与会议输出没有连接。",
    recovery: "改用风险清单或缩短会议，下一周期比较风险发现时间与用户反馈。",
  },
  {
    label: "反馈丢失",
    tone: COLORS.danger,
    evidence:
      "切片已经交付，但真实用户样本没有进入循环，团队只能依据内部通过率调整。",
    firstChange: "观察节点：信号只来自工具，用户结果和必要约束没有被观察。",
    recovery: "暂停扩大范围，补上代表性用户样本和回退，再重放同一切片。",
  },
] as const;

export function Tpp20Topic48EssenceAgilityLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="essence-agility-lab"
      aria-label="敏捷本质实验"
      aria-labelledby="essence-agility-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="essence-agility-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择实践样本，定位反馈回路的首个变化
          </h3>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ color: current.tone, backgroundColor: `${current.tone}1a` }}
        >
          {current.label}
        </span>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="选择敏捷实践样本"
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
          <p className="text-xs font-semibold text-secondary">输入证据</p>
          <p className="mt-1 text-sm text-primary">{current.evidence}</p>
        </div>
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">实际首差</p>
          <p className="mt-1 text-sm text-primary">{current.firstChange}</p>
        </div>
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">恢复动作</p>
          <p className="mt-1 text-sm text-primary">{current.recovery}</p>
        </div>
      </div>
      <p className="mt-4 rounded-lg border border-border bg-background p-3 text-sm text-secondary">
        先写预期的学习结果，再选择实践样本；没有反馈的速度提升不能单独证明敏捷。
      </p>
    </section>
  );
}
