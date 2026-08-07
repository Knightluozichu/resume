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

const FLOW = [
  { key: "activities", label: "活动", detail: "写清输入与输出" },
  { key: "dependencies", label: "依赖图", detail: "只保留真实先后" },
  { key: "candidates", label: "并行候选", detail: "挑出互不阻塞的工作" },
  { key: "barrier", label: "同步点", detail: "合并前检查条件" },
  { key: "critical", label: "关键路径", detail: "测量最长依赖链" },
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
        d={`M${x2 - 20} ${y - 7} L${x2 - 2} ${y} L${x2 - 20} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Tpp20Topic33TemporalCouplingFlowDiagram({
  step = 0,
}: {
  step?: number;
}) {
  const focus = Math.max(0, Math.min(Math.round(step), FLOW.length - 1));
  const cardWidth = 166;
  const gap = 24;
  const startX = 16;
  const cardY = 134;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="temporal-coupling-flow"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="从活动、依赖图、并行候选、同步点到关键路径的时域耦合分析流程图"
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
          依赖图先行：并行不是把顺序删掉
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每个节点都要说明传递的事实和可以停下来的条件
        </text>
        {FLOW.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return (
            <Arrow key={`${stage.key}-arrow`} x1={x1} x2={x2} y={cardY + 66} />
          );
        })}
        {FLOW.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const reached = index <= focus;
          const active = index === focus;
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="146"
                rx="14"
                fill={active ? COLORS.accent : COLORS.elevated}
                fillOpacity={active ? "0.12" : "1"}
                stroke={active ? COLORS.accent : COLORS.border}
                strokeWidth={active ? "2" : "1"}
              />
              <circle
                cx={x + 24}
                cy={cardY + 28}
                r="12"
                fill={active ? COLORS.accent : reached ? COLORS.success : COLORS.border}
                fillOpacity={active || reached ? "1" : "0.35"}
              />
              <text
                x={x + 24}
                y={cardY + 33}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={COLORS.elevated}
              >
                {index + 1}
              </text>
              <text
                x={x + 47}
                y={cardY + 33}
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
                y={cardY + 121}
                textAnchor="middle"
                fontSize="12"
                fill={active ? COLORS.accent : COLORS.secondary}
              >
                {active ? "当前观察点" : reached ? "已核对" : "等待证据"}
              </text>
            </g>
          );
        })}
        <rect
          x="16"
          y="322"
          width="928"
          height="44"
          rx="12"
          fill={focus === 1 ? COLORS.warning : COLORS.success}
          fillOpacity="0.1"
          stroke={focus === 1 ? COLORS.warning : COLORS.success}
        />
        <text
          x="480"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={focus === 1 ? COLORS.warning : COLORS.primary}
        >
          {focus === 1
            ? "依赖图还没有证明独立性；先检查读写集合，再谈并行"
            : "同步点只合并已满足前置条件的结果，关键路径仍需实测"}
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：从活动清单推进到关键路径，每一步都能指出首个不满足条件的节点。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "活动", serial: "A → B → C", parallel: "A 与 B 同批", fault: "B 偷读 A 的半成品" },
  { label: "依赖", serial: "2 条强边", parallel: "1 条合并边", fault: "缺少输入声明" },
  { label: "首差", serial: "无", parallel: "等待同步点", fault: "并行候选被拒绝" },
  { label: "关键路径", serial: "12 分钟", parallel: "8 分钟", fault: "不能测量" },
] as const;

export function Tpp20Topic33CriticalPathEvidenceDiagram() {
  const columns = [
    { key: "serial", title: "串行基线", tone: COLORS.secondary },
    { key: "parallel", title: "合法并行", tone: COLORS.success },
    { key: "fault", title: "错误并行", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="temporal-coupling-evidence"
    >
      <svg
        viewBox="0 0 960 432"
        role="img"
        aria-label="串行基线、合法并行和错误并行的关键路径证据矩阵"
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
          证据矩阵：速度下降也可能是语义保护
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          只改变调度方式；输入、业务规则和观察点保持不变
        </text>
        <rect
          x="18"
          y="86"
          width="924"
          height="50"
          rx="12"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text x="44" y="117" fontSize="14" fontWeight="700" fill={COLORS.primary}>
          证据字段
        </text>
        {columns.map((column, index) => {
          const x = 226 + index * 238;
          return (
            <g key={column.key}>
              <rect
                x={x}
                y="96"
                width="202"
                height="30"
                rx="15"
                fill={column.tone}
                fillOpacity="0.13"
                stroke={column.tone}
              />
              <text
                x={x + 101}
                y="117"
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
          const y = 153 + rowIndex * 52;
          return (
            <g key={row.label}>
              <rect
                x="18"
                y={y}
                width="924"
                height="43"
                fill={rowIndex % 2 === 0 ? COLORS.elevated : COLORS.accent}
                fillOpacity={rowIndex % 2 === 0 ? "1" : "0.035"}
                stroke={COLORS.border}
              />
              <text x="44" y={y + 27} fontSize="13" fontWeight="600" fill={COLORS.primary}>
                {row.label}
              </text>
              {columns.map((column, index) => {
                const x = 226 + index * 238;
                return (
                  <text
                    key={`${row.label}-${column.key}`}
                    x={x + 101}
                    y={y + 27}
                    textAnchor="middle"
                    fontSize="13"
                    fill={column.key === "fault" ? COLORS.danger : COLORS.secondary}
                  >
                    {row[column.key]}
                  </text>
                );
              })}
            </g>
          );
        })}
        <rect
          x="18"
          y="382"
          width="924"
          height="30"
          rx="10"
          fill={COLORS.warning}
          fillOpacity="0.1"
          stroke={COLORS.warning}
        />
        <text x="480" y="403" textAnchor="middle" fontSize="12" fontWeight="600" fill={COLORS.primary}>
          只有“合法并行”同时满足顺序无关、结果可重放、关键路径可测量
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：关键路径数字必须和依赖证据一起出现，不能只报一个更快的总时长。
      </figcaption>
    </figure>
  );
}

type Scenario = "serial" | "parallel" | "unsafe";

const SCENARIOS: ReadonlyArray<{ key: Scenario; label: string }> = [
  { key: "serial", label: "串行基线" },
  { key: "parallel", label: "合法并行" },
  { key: "unsafe", label: "错误并行" },
];

export function Tpp20Topic33TemporalCouplingLab() {
  const [scenario, setScenario] = useState<Scenario>("serial");
  const parallel = scenario === "parallel";
  const unsafe = scenario === "unsafe";
  const status = unsafe
    ? "被拒绝：并行任务偷读了未提交结果"
    : parallel
      ? "已通过：A 与 B 独立，C 在同步点接收完整输入"
      : "基线：所有活动按声明顺序完成";
  const firstDifference = unsafe
    ? "依赖图：B 的输入不完整，不能进入并行候选"
    : parallel
      ? "关键路径：12 分钟缩短为 8 分钟"
      : "无：基线顺序完整且可重放";

  return (
    <section
      aria-label="打破时域耦合实验台"
      data-visual-kind="temporal-coupling-lab"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">时域耦合实验台</h3>
          <p className="mt-1 text-sm text-secondary">先选一个调度样本，再观察首差和关键路径。</p>
        </div>
        <span
          role="status"
          className={`rounded-control border px-3 py-2 text-xs ${unsafe ? "border-danger text-danger" : "border-success text-success"}`}
        >
          {unsafe ? "需要回退" : "可复核"}
        </span>
      </div>
      <div className="mb-5 flex flex-wrap gap-2" aria-label="调度样本选择">
        {SCENARIOS.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={scenario === item.key}
            onClick={() => setScenario(item.key)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${scenario === item.key ? "border-accent text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 900 252"
        role="img"
        aria-label={`时域耦合实验当前状态：${status}`}
        className="mx-auto block h-auto w-full max-w-[900px]"
      >
        <rect
          x="18"
          y="18"
          width="864"
          height="178"
          rx="16"
          fill={unsafe ? COLORS.danger : parallel ? COLORS.success : COLORS.accent}
          fillOpacity="0.07"
          stroke={unsafe ? COLORS.danger : COLORS.border}
        />
        <text
          x="450"
          y="51"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={unsafe ? COLORS.danger : COLORS.primary}
        >
          {status}
        </text>
        <line x1="84" y1="106" x2="816" y2="106" stroke={COLORS.border} strokeWidth="2" />
        {["活动 A", "活动 B", "同步点", "活动 C"].map((label, index) => {
          const x = 108 + index * 228;
          const blocked = unsafe && index >= 2;
          return (
            <g key={label}>
              <circle
                cx={x}
                cy="106"
                r="18"
                fill={blocked ? COLORS.danger : COLORS.accent}
                fillOpacity="0.15"
                stroke={blocked ? COLORS.danger : COLORS.accent}
                strokeWidth="2"
              />
              <text
                x={x}
                y="112"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={blocked ? COLORS.danger : COLORS.accent}
              >
                {blocked ? "×" : "✓"}
              </text>
              <text x={x} y="158" textAnchor="middle" fontSize="13" fill={COLORS.primary}>
                {label}
              </text>
            </g>
          );
        })}
        <text
          x="450"
          y="226"
          textAnchor="middle"
          fontSize="13"
          fill={unsafe ? COLORS.danger : COLORS.secondary}
        >
          首个偏差：{firstDifference}
        </text>
      </svg>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <p className="text-xs text-secondary">恢复动作：回到原始输入，重建依赖图并重放。</p>
        <button
          type="button"
          onClick={() => setScenario("serial")}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          aria-label="重置时域耦合实验"
        >
          重置
        </button>
      </div>
    </section>
  );
}
