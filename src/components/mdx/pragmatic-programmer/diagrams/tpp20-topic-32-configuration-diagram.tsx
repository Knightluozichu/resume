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

const PIPELINE = [
  { key: "read", label: "读取", detail: "保留原始输入" },
  { key: "parse", label: "解析模式", detail: "检查形状与类型" },
  { key: "default", label: "补默认值", detail: "集中决定缺失字段" },
  { key: "version", label: "校验版本", detail: "确认合同可理解" },
  { key: "activate", label: "激活策略", detail: "一次性切换快照" },
] as const;

type PipelineStep = 0 | 1 | 2 | 3;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line
        x1={x1}
        y1={y}
        x2={x2 - 10}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 18} ${y - 7} L${x2} ${y} L${x2 - 18} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Tpp20Topic32ConfigurationPipelineDiagram({
  step = 0,
}: {
  step?: PipelineStep;
}) {
  const focus = Math.min(step + 1, PIPELINE.length - 1);
  const cardWidth = 170;
  const gap = 25;
  const startX = 24;
  const cardY = 142;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="configuration-pipeline"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="配置从原始输入经过模式、默认值和版本检查，最后原子激活为策略快照的流程图"
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
          配置管线：先形成候选，再改变策略
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每个节点都留下输入、状态变化和拒绝理由
        </text>
        {PIPELINE.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return (
            <Arrow key={`${stage.key}-arrow`} x1={x1} x2={x2} y={cardY + 67} />
          );
        })}
        {PIPELINE.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const reached = index <= focus;
          const active = index === focus;
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="142"
                rx="14"
                fill={active ? COLORS.accent : COLORS.elevated}
                fillOpacity={active ? "0.12" : "1"}
                stroke={
                  active
                    ? COLORS.accent
                    : reached
                      ? COLORS.border
                      : COLORS.border
                }
                strokeWidth={active ? "2" : "1"}
              />
              <circle
                cx={x + 24}
                cy={cardY + 28}
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
                x={x + 48}
                y={cardY + 33}
                fontSize="15"
                fontWeight="700"
                fill={active ? COLORS.accent : COLORS.primary}
              >
                {stage.label}
              </text>
              <line
                x1={x + 18}
                y1={cardY + 57}
                x2={x + cardWidth - 18}
                y2={cardY + 57}
                stroke={COLORS.border}
              />
              <text
                x={x + cardWidth / 2}
                y={cardY + 88}
                textAnchor="middle"
                fontSize="13"
                fill={COLORS.primary}
              >
                {stage.detail}
              </text>
              <text
                x={x + cardWidth / 2}
                y={cardY + 116}
                textAnchor="middle"
                fontSize="12"
                fill={active ? COLORS.accent : COLORS.secondary}
              >
                {active ? "当前观察点" : reached ? "已通过" : "等待输入"}
              </text>
            </g>
          );
        })}
        <rect
          x="24"
          y="322"
          width="912"
          height="44"
          rx="12"
          fill={focus === 2 ? COLORS.warning : COLORS.success}
          fillOpacity="0.1"
          stroke={focus === 2 ? COLORS.warning : COLORS.success}
        />
        <text
          x="480"
          y="350"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={focus === 2 ? COLORS.warning : COLORS.primary}
        >
          {focus === 2
            ? "缺失字段在候选阶段处理；不要让调用者各自猜默认值"
            : "只有完整候选通过检查，当前策略才会改变"}
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：观察点向右推进，激活永远位于所有检查之后。
      </figcaption>
    </figure>
  );
}

const AUDIT_ROWS = [
  {
    label: "输入摘要",
    normal: "policy-7",
    boundary: "policy-7",
    fault: "policy-7",
  },
  {
    label: "候选状态",
    normal: "完整",
    boundary: "边界值",
    fault: "缺少默认值",
  },
  { label: "决定", normal: "接受", boundary: "接受", fault: "拒绝" },
  { label: "当前策略", normal: "替换", boundary: "替换", fault: "保持旧值" },
  {
    label: "审计理由",
    normal: "accepted",
    boundary: "range-accepted",
    fault: "default-missing",
  },
] as const;

export function Tpp20Topic32ConfigurationAuditDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "单故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="configuration-audit"
    >
      <svg
        viewBox="0 0 960 430"
        role="img"
        aria-label="配置实验的正常、边界和单故障样本审计矩阵"
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
          审计矩阵：结果相同不代表证据相同
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每个样本只改变一个条件，首差决定停点与回退动作
        </text>
        <rect
          x="24"
          y="86"
          width="912"
          height="48"
          rx="12"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text
          x="48"
          y="116"
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
                y="96"
                width="196"
                height="28"
                rx="14"
                fill={column.tone}
                fillOpacity="0.13"
                stroke={column.tone}
              />
              <text
                x={x + 98}
                y="116"
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
        {AUDIT_ROWS.map((row, rowIndex) => {
          const y = 151 + rowIndex * 48;
          return (
            <g key={row.label}>
              <rect
                x="24"
                y={y}
                width="912"
                height="40"
                fill={rowIndex % 2 === 0 ? COLORS.elevated : COLORS.accent}
                fillOpacity={rowIndex % 2 === 0 ? "1" : "0.035"}
                stroke={COLORS.border}
              />
              <text
                x="48"
                y={y + 25}
                fontSize="13"
                fontWeight="600"
                fill={COLORS.primary}
              >
                {row.label}
              </text>
              {columns.map((column, index) => {
                const x = 228 + index * 236;
                const value = row[column.key];
                return (
                  <text
                    key={`${row.label}-${column.key}`}
                    x={x + 98}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="13"
                    fill={
                      column.key === "fault" ? COLORS.danger : COLORS.secondary
                    }
                  >
                    {value}
                  </text>
                );
              })}
            </g>
          );
        })}
        <rect x="24" y="405" width="912" height="1" fill={COLORS.border} />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：失败样本不伪造新策略，而是保留旧快照并保留拒绝理由。
      </figcaption>
    </figure>
  );
}

type Scenario = "complete" | "missing-default" | "stale-version";

const SCENARIOS: ReadonlyArray<{ key: Scenario; label: string }> = [
  { key: "complete", label: "完整配置" },
  { key: "missing-default", label: "撤掉默认值" },
  { key: "stale-version", label: "过期版本" },
];

export function Tpp20Topic32ConfigurationLab() {
  const [scenario, setScenario] = useState<Scenario>("complete");
  const isFault = scenario !== "complete";
  const status =
    scenario === "complete"
      ? "候选通过，策略版本 7 已激活"
      : scenario === "missing-default"
        ? "候选拒绝：缺少默认值，当前策略保持不变"
        : "候选拒绝：版本 6 不在当前代码的支持范围";
  const firstDifference =
    scenario === "complete"
      ? "无：所有检查均通过"
      : scenario === "missing-default"
        ? "补默认值：缺失字段没有可追溯的决定"
        : "校验版本：代码不能解释旧合同";

  return (
    <section
      aria-label="配置策略实验台"
      data-visual-kind="configuration-lab"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            配置策略实验台
          </h3>
          <p className="mt-1 text-sm text-secondary">
            先改变一个样本，再检查首差与当前快照。
          </p>
        </div>
        <span
          role="status"
          className={`rounded-control border px-3 py-2 text-xs ${isFault ? "border-danger text-danger" : "border-success text-success"}`}
        >
          {isFault ? "候选被拒绝" : "候选已激活"}
        </span>
      </div>
      <div className="mb-5 flex flex-wrap gap-2" aria-label="配置样本选择">
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
        viewBox="0 0 900 250"
        role="img"
        aria-label={`配置实验当前状态：${status}`}
        className="mx-auto block h-auto w-full max-w-[900px]"
      >
        <rect
          x="18"
          y="18"
          width="864"
          height="174"
          rx="16"
          fill={isFault ? COLORS.danger : COLORS.success}
          fillOpacity="0.07"
          stroke={isFault ? COLORS.danger : COLORS.border}
        />
        <text
          x="450"
          y="50"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={isFault ? COLORS.danger : COLORS.primary}
        >
          {status}
        </text>
        <line
          x1="80"
          y1="108"
          x2="820"
          y2="108"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        {["原始输入", "模式检查", "版本检查", "当前快照"].map(
          (label, index) => {
            const x = 100 + index * 235;
            const blocked =
              isFault &&
              ((scenario === "missing-default" && index >= 2) ||
                (scenario === "stale-version" && index >= 3));
            return (
              <g key={label}>
                <circle
                  cx={x}
                  cy="108"
                  r="18"
                  fill={blocked ? COLORS.danger : COLORS.accent}
                  fillOpacity={blocked ? "0.18" : "0.14"}
                  stroke={blocked ? COLORS.danger : COLORS.accent}
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y="114"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={blocked ? COLORS.danger : COLORS.accent}
                >
                  {blocked ? "×" : "✓"}
                </text>
                <text
                  x={x}
                  y="158"
                  textAnchor="middle"
                  fontSize="13"
                  fill={COLORS.primary}
                >
                  {label}
                </text>
              </g>
            );
          },
        )}
        <text
          x="450"
          y="218"
          textAnchor="middle"
          fontSize="13"
          fill={isFault ? COLORS.danger : COLORS.secondary}
        >
          首个偏差：{firstDifference}
        </text>
      </svg>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <p className="text-xs text-secondary">
          恢复动作：回到原始输入，重新构造候选并重放检查。
        </p>
        <button
          type="button"
          onClick={() => setScenario("complete")}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          aria-label="重置配置实验"
        >
          重置
        </button>
      </div>
    </section>
  );
}
