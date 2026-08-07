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
  { label: "分析依赖", detail: "找出必须先完成的边" },
  { label: "并行切分", detail: "只并行独立工作" },
  { label: "隔离状态", detail: "每份状态有所有者" },
  { label: "消息协作", detail: "用消息传递决定" },
  { label: "事实协调", detail: "黑板保存可复查事实" },
] as const;

type FlowStep = 0 | 1 | 2 | 3 | 4;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line
        x1={x1}
        y1={y}
        x2={x2 - 11}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 19} ${y - 7} L${x2} ${y} L${x2 - 19} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Tpp20Chapter06ConcurrencyFlowDiagram({
  step = 0,
}: {
  step?: FlowStep;
}) {
  const focus = Math.max(0, Math.min(step, FLOW.length - 1));
  const cardWidth = 168;
  const gap = 24;
  const startX = 24;
  const cardY = 132;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="concurrency-flow"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="并发设计从依赖分析、并行切分、状态隔离、消息协作到事实协调的因果流程图"
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
          并发设计：先证明独立，再安排协作
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          速度不是验收标准；每一步都要留下状态所有者与失败边界
        </text>
        {FLOW.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return (
            <Arrow
              key={`${stage.label}-arrow`}
              x1={x1}
              x2={x2}
              y={cardY + 65}
            />
          );
        })}
        {FLOW.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const reached = index <= focus;
          const active = index === focus;
          return (
            <g key={stage.label}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="148"
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
                y1={cardY + 56}
                x2={x + cardWidth - 18}
                y2={cardY + 56}
                stroke={COLORS.border}
              />
              <text
                x={x + cardWidth / 2}
                y={cardY + 88}
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.primary}
              >
                {stage.detail}
              </text>
              <text
                x={x + cardWidth / 2}
                y={cardY + 119}
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
          x="24"
          y="322"
          width="912"
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
            ? "只把没有先后依赖的工作放到同一批；共享可变状态会让并行假装成功"
            : "完成协作前，先能指出谁拥有状态、消息何时过期以及事实如何重放"}
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：并发证据沿着依赖边推进，不能用最终速度替代因果记录。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "输入批次",
    normal: "job-A / job-B",
    boundary: "同一资源",
    fault: "重复写入",
  },
  {
    label: "所有者",
    normal: "各自角色",
    boundary: "明确仲裁者",
    fault: "无人负责",
  },
  { label: "首差", normal: "无", boundary: "依赖等待", fault: "状态冲突" },
  {
    label: "恢复",
    normal: "提交结果",
    boundary: "串行回退",
    fault: "重放消息",
  },
] as const;

export function Tpp20Chapter06ConcurrencyEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="concurrency-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="并发实验的正常、边界和故障证据矩阵"
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
          证据矩阵：先找首差，再选择恢复
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          三种样本共享输入，唯一变化必须能被复核者重放
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
                    {row[column.key]}
                  </text>
                );
              })}
            </g>
          );
        })}
        <rect x="24" y="346" width="912" height="1" fill={COLORS.border} />
        <text
          x="480"
          y="372"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          并发完成不等于结果正确；所有权、边界与回退也要成为记录的一部分。
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：故障列保留首差，不把竞态结果改写成“偶尔通过”。
      </figcaption>
    </figure>
  );
}

type Scenario = "parallel" | "shared" | "message";

const SCENARIOS: ReadonlyArray<{ key: Scenario; label: string }> = [
  { key: "parallel", label: "独立工作" },
  { key: "shared", label: "共享状态" },
  { key: "message", label: "消息协作" },
];

export function Tpp20Chapter06ConcurrencyLab() {
  const [scenario, setScenario] = useState<Scenario>("parallel");
  const shared = scenario === "shared";
  const message = scenario === "message";
  const status = shared
    ? "状态冲突：两个角色写入同一份可变数据"
    : message
      ? "消息已排队：所有者在边界内处理决定"
      : "可并行：两个角色拥有互不重叠的输入";
  const firstDifference = shared
    ? "状态隔离：写入顺序无法由输入重建"
    : message
      ? "消息协作：决定带有所有者和版本"
      : "并行切分：没有先后依赖的工作同时运行";

  return (
    <section
      aria-label="并发状态实验台"
      data-visual-kind="concurrency-lab"
      className="not-prose my-8 rounded-card border border-border bg-elevated p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            并发所有权实验台
          </h3>
          <p className="mt-1 text-sm text-secondary">
            只改变协作方式，观察状态所有者与首差。
          </p>
        </div>
        <span
          role="status"
          className={`rounded-control border px-3 py-2 text-xs ${shared ? "border-danger text-danger" : "border-success text-success"}`}
        >
          {shared ? "需要回退" : "可复核"}
        </span>
      </div>
      <div className="mb-5 flex flex-wrap gap-2" aria-label="并发样本选择">
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
        viewBox="0 0 900 238"
        role="img"
        aria-label={`并发实验当前状态：${status}`}
        className="mx-auto block h-auto w-full max-w-[900px]"
      >
        <rect
          x="18"
          y="18"
          width="864"
          height="164"
          rx="16"
          fill={shared ? COLORS.danger : COLORS.success}
          fillOpacity="0.07"
          stroke={shared ? COLORS.danger : COLORS.border}
        />
        <text
          x="450"
          y="50"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill={shared ? COLORS.danger : COLORS.primary}
        >
          {status}
        </text>
        <line
          x1="90"
          y1="105"
          x2="810"
          y2="105"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        {["输入所有者", "并行工作", "状态边界", "结果证据"].map(
          (label, index) => {
            const x = 110 + index * 228;
            const blocked = shared && index >= 2;
            return (
              <g key={label}>
                <circle
                  cx={x}
                  cy="105"
                  r="18"
                  fill={blocked ? COLORS.danger : COLORS.accent}
                  fillOpacity="0.15"
                  stroke={blocked ? COLORS.danger : COLORS.accent}
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y="111"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={blocked ? COLORS.danger : COLORS.accent}
                >
                  {blocked ? "×" : "✓"}
                </text>
                <text
                  x={x}
                  y="155"
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
          y="214"
          textAnchor="middle"
          fontSize="13"
          fill={shared ? COLORS.danger : COLORS.secondary}
        >
          首个偏差：{firstDifference}
        </text>
      </svg>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <p className="text-xs text-secondary">
          恢复动作：回到同一输入，按所有者边界重放消息并比较首差。
        </p>
        <button
          type="button"
          onClick={() => setScenario("parallel")}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          aria-label="重置并发实验"
        >
          重置
        </button>
      </div>
    </section>
  );
}
