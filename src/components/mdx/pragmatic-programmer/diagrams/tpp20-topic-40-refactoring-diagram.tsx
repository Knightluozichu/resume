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
  { label: "坏味道", detail: "指出结构信号" },
  { label: "保护测试", detail: "锁定外部合同" },
  { label: "小变换", detail: "只改一种因素" },
  { label: "验证", detail: "比较行为与副作用" },
  { label: "提交", detail: "可独立回退" },
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

export function Tpp20Topic40RefactoringLoopDiagram() {
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="refactoring-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="重构从坏味道、保护测试、小变换、验证到可回退提交的工作回路"
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
          重构：用小步保持行为，再改善结构
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每次只改变一种结构因素，失败时回到最近一次已验证状态
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
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
                    : index < 2
                      ? COLORS.success
                      : COLORS.border
                }
                fillOpacity={index <= 2 ? "1" : "0.4"}
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
                {active ? "当前变换入口" : index < 2 ? "已留证据" : "等待证据"}
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
          绿色验证不是终点：提交边界和回退路径也必须可复核
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：重构把结构变化切成可验证、可提交、可回退的小实验。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "合同",
    normal: "输出保持",
    boundary: "错误保持",
    fault: "副作用重复",
  },
  {
    label: "变换",
    normal: "单一因素",
    boundary: "拒绝可见",
    fault: "测试失败",
  },
  { label: "首差", normal: "无", boundary: "边界节点", fault: "验证节点" },
  { label: "恢复", normal: "提交哈希", boundary: "补测试", fault: "回退重放" },
] as const;

export function Tpp20Topic40RefactoringEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="refactoring-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="重构正常、边界和故障样本的合同与回退证据矩阵"
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
          证据矩阵：行为合同比最终绿色更重要
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常、边界和故障样本共同证明重构没有夹带功能变化
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
          失败时保留最小输入、首个差异、回退提交和未覆盖行为
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：重构的质量由行为等价、失败可见和回退可执行共同定义。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "行为保持",
    tone: COLORS.success,
    evidence: "端到端合同、错误边界和副作用次数均已记录。",
    firstChange: "无首个差异：纯提取后结果保持。",
    recovery: "创建单一原因提交并保存哈希。",
  },
  {
    label: "边界合同",
    tone: COLORS.warning,
    evidence: "空值、超时和拒绝路径需要在重构前先固定。",
    firstChange: "边界节点：测试暴露了原本未声明的行为。",
    recovery: "先补合同测试，再重新选择小变换。",
  },
  {
    label: "副作用故障",
    tone: COLORS.danger,
    evidence: "通知事件出现两次，结构变换触碰了副作用边界。",
    firstChange: "验证节点：事件次数与合同不同。",
    recovery: "回到最近绿色提交，重放订单并补幂等测试。",
  },
] as const;

export function Tpp20Topic40RefactoringLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];
  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="refactoring-lab"
      aria-label="重构实验"
      aria-labelledby="refactoring-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="refactoring-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择证据样本，决定提交还是回退
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
        aria-label="选择重构样本"
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
        先写保持的行为，再选择样本；失败时回退到已验证状态，不要在混合工作区继续猜测。
      </p>
    </section>
  );
}
