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

const LOOP = [
  { label: "感知", detail: "记下具体阻力" },
  { label: "暂停", detail: "保存当前状态" },
  { label: "假设", detail: "列出两个解释" },
  { label: "实验", detail: "只改变一项" },
  { label: "解释", detail: "修复、调查或休息" },
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

export function Tpp20Topic37LizardBrainLoopDiagram() {
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="lizard-brain-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="听从蜥蜴脑的反馈回路：感知阻力、暂停、提出假设、做最小实验并解释结果"
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
          听从蜥蜴脑：把感觉变成可反驳的实验
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          直觉选择调查入口，证据决定是否修复、继续调查或休息
        </text>
        {LOOP.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return (
            <Arrow
              key={`${stage.label}-arrow`}
              x1={x1}
              x2={x2}
              y={cardY + 64}
            />
          );
        })}
        {LOOP.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          return (
            <g key={stage.label}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="150"
                rx="14"
                fill={index === 3 ? COLORS.accent : COLORS.elevated}
                fillOpacity={index === 3 ? "0.12" : "1"}
                stroke={index === 3 ? COLORS.accent : COLORS.border}
                strokeWidth={index === 3 ? "2" : "1"}
              />
              <circle
                cx={x + 25}
                cy={cardY + 29}
                r="12"
                fill={
                  index === 3
                    ? COLORS.accent
                    : index < 3
                      ? COLORS.success
                      : COLORS.border
                }
                fillOpacity={index <= 3 ? "1" : "0.4"}
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
                fill={index === 3 ? COLORS.accent : COLORS.primary}
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
                fill={index === 3 ? COLORS.accent : COLORS.secondary}
              >
                {index === 3
                  ? "当前实验入口"
                  : index < 3
                    ? "已留证据"
                    : "等待结果"}
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
          假设没有反例就不能升级为结论；实验失败时保留输入、首个差异和恢复动作
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：蜥蜴脑提供调查入口，最小实验和可复核记录决定下一步。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "预测",
    normal: "回路闭合",
    boundary: "明确拒绝",
    fault: "会出现首差",
  },
  {
    label: "输入",
    normal: "已知调用",
    boundary: "空值或超时",
    fault: "缺少环境条件",
  },
  { label: "首差", normal: "无", boundary: "边界节点", fault: "假设节点" },
  {
    label: "恢复",
    normal: "保存哈希",
    boundary: "补边界测试",
    fault: "重放并回退",
  },
] as const;

export function Tpp20Topic37LizardBrainEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="lizard-brain-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="听从蜥蜴脑的正常、边界和故障证据矩阵"
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
          证据矩阵：先记录阻力，再允许解释
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          三类样本共享其余条件，差异才能归因于唯一变化
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
          字段
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
          休息不是删除失败：保存记录，回来后用同一输入确认结果是否可重现
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：边界和故障样本让直觉接受反驳，正常样本则留下可复核的成功证据。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "正常路径",
    tone: COLORS.success,
    evidence: "直接调用得到预期输出，依赖和输入均已记录。",
    firstChange: "无首个差异：预测与实际一致。",
    recovery: "保存提交哈希、输出摘要和下一次复核入口。",
  },
  {
    label: "边界路径",
    tone: COLORS.warning,
    evidence: "空输入触发超时阈值，错误信息可被调用者理解。",
    firstChange: "边界节点：结果应明确拒绝，而不是继续传播空状态。",
    recovery: "把阈值写成测试，补一个能重现边界的输入。",
  },
  {
    label: "疲劳干扰",
    tone: COLORS.danger,
    evidence: "连续修改后同一测试偶发失败，工作区状态没有被保存。",
    firstChange: "假设节点：无法区分代码缺陷和注意力噪声。",
    recovery: "保存失败记录，结束休息窗口，再用原输入重放。",
  },
] as const;

export function Tpp20Topic37LizardBrainLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="lizard-brain-lab"
      aria-label="听从蜥蜴脑实验"
      aria-labelledby="lizard-brain-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="lizard-brain-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择样本，决定下一步
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
        aria-label="选择阻力样本"
      >
        {LAB_SCENARIOS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`min-h-11 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary transition hover:border-accent ${
              scenario === index ? "border-accent bg-accent/10 text-accent" : ""
            }`}
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
        先写预测再点击样本。如果结果与感觉不一致，保留差异并缩小假设，不要让最终结果替你解释过程。
      </p>
    </section>
  );
}
