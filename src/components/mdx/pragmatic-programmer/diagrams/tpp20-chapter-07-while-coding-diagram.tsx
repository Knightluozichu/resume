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
  { label: "听见阻力", detail: "记录迟疑与重复" },
  { label: "显化假设", detail: "写出输入与拒绝" },
  { label: "测量复杂度", detail: "估算后验证增长" },
  { label: "测试重构", detail: "保护行为再改结构" },
  { label: "安全表达", detail: "边界、权限与名称" },
] as const;

type LoopStep = 0 | 1 | 2 | 3 | 4;

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

export function Tpp20Chapter07WhileCodingLoopDiagram({
  step = 0,
}: {
  step?: LoopStep;
}) {
  const focus = Math.max(0, Math.min(step, LOOP.length - 1));
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="while-coding-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="当你编码时从听见阻力、显化假设、测量复杂度、测试重构到安全表达的反馈回路"
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
          当你编码时：把阻力变成可重放证据
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          没有输入、首差或回退动作，就不能跳到“完成”
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
          const reached = index <= focus;
          const active = index === focus;
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
                    : reached
                      ? COLORS.success
                      : COLORS.border
                }
                fillOpacity={active || reached ? "1" : "0.35"}
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
                {active ? "当前观察点" : reached ? "已留证据" : "等待证据"}
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
          fill={focus === 2 ? COLORS.warning : COLORS.success}
          fillOpacity="0.1"
          stroke={focus === 2 ? COLORS.warning : COLORS.success}
        />
        <text
          x="480"
          y="352"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={focus === 2 ? COLORS.warning : COLORS.primary}
        >
          {focus === 2
            ? "估算只给方向；固定数据与环境后再测量真实增长和资源峰值"
            : "每次只改变一个条件，在首个偏差处停止并选择可回退动作"}
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：编码反馈回路从直觉开始，但必须以测试、安全边界和可回退记录结束。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "输入", normal: "固定订单", boundary: "零数量", fault: "错时区" },
  {
    label: "假设",
    normal: "格式明确",
    boundary: "拒绝边界",
    fault: "隐藏默认",
  },
  { label: "首差", normal: "无", boundary: "明确拒绝", fault: "解析分叉" },
  { label: "恢复", normal: "保存哈希", boundary: "补性质", fault: "重放样本" },
] as const;

export function Tpp20Chapter07WhileCodingEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="while-coding-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="当你编码时正常、边界和故障样本的证据矩阵"
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
          证据矩阵：结果之外还要保存首差
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          同一组输入只改变一个条件，复核者才能判断因果
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
                const value = row[column.key];
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
                      {value}
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
          首差决定下一步：边界补规则，故障重放并回退，正常样本保存版本与输出摘要
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：正常、边界和故障样本共享证据字段，不能只展示成功截图。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "正常输入",
    tone: COLORS.success,
    evidence: "三项商品，数量非负，格式与权限均明确。",
    firstChange: "无首差：性质与端到端结果一致。",
    recovery: "保存输入摘要、版本与输出哈希。",
  },
  {
    label: "边界输入",
    tone: COLORS.warning,
    evidence: "数量为零且请求恰好达到额度阈值。",
    firstChange: "边界节点：必须明确接受或拒绝。",
    recovery: "把阈值来源写入测试，并补一条性质。",
  },
  {
    label: "故障输入",
    tone: COLORS.danger,
    evidence: "时区假设被移除，日期解析返回不同结果。",
    firstChange: "假设节点：默认格式不再成立。",
    recovery: "保存最小反例，显式指定格式后重放。",
  },
] as const;

export function Tpp20Chapter07WhileCodingLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="while-coding-lab"
      aria-label="当你编码时实验"
      aria-labelledby="while-coding-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="while-coding-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择样本，定位首个偏差
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
        aria-label="选择实验样本"
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
        操作提示：先预测首差，再点击样本；若预测与结果不同，保留差异，不要修改结果来迎合预测。
      </p>
    </section>
  );
}
