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
  { label: "稳定", detail: "核心边界" },
  { label: "目标", detail: "共同结果" },
  { label: "能力", detail: "全功能" },
  { label: "日程", detail: "安排改进" },
  { label: "接管", detail: "端到端恢复" },
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

export function Tpp20Topic49PragmaticTeamsLoopDiagram() {
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="pragmatic-teams-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="从团队稳定性、共同目标、全功能、工作节奏到端到端接管的团队回路"
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
          务实团队回路：稳定边界承载交付、学习与接管
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          小团队减少等待，全功能减少移交，日程让改进成为真实工作
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
                {active ? "当前能力点" : index < 3 ? "已建立" : "待演练"}
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
          稳定不是不变，而是目标、能力、信任和恢复能被多人持续重建
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：务实团队用稳定边界和全功能能力支撑交付与接管。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "边界",
    normal: "核心清楚",
    boundary: "范围缩小",
    fault: "成员缺席",
  },
  { label: "能力", normal: "可闭合", boundary: "补足路径", fault: "专家孤岛" },
  {
    label: "改进",
    normal: "已排日程",
    boundary: "时间保护",
    fault: "永不发生",
  },
  {
    label: "接管",
    normal: "多人重放",
    boundary: "明确暂停",
    fault: "回退失联",
  },
] as const;

export function Tpp20Topic49PragmaticTeamsEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="pragmatic-teams-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="务实团队正常、边界和单一故障样本的证据矩阵"
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
          证据矩阵：全功能要在边界和缺席时仍可接管
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          看谁能解释目标、运行验证、处理故障，以及改进是否真的占有时间
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
          保存能力地图、日程、信任事件和接管结果，团队边界才可复核
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：团队证据覆盖能力、时间、信任和缺席时的恢复路径。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "稳定全功能",
    tone: COLORS.success,
    evidence:
      "核心成员共享用户切片，设计、实现、验证和恢复责任都有人接住，改进已有固定时间。",
    firstChange:
      "能力节点：团队能从输入重放到用户结果，另一成员可以接管失败处理。",
    recovery: "保留能力地图和轮换演练，定期用成员缺席样本检查端到端能力。",
  },
  {
    label: "能力缺口",
    tone: COLORS.warning,
    evidence: "团队可以开发功能，却依赖外部队列测试和发布，用户反馈长期延迟。",
    firstChange: "边界节点：全功能不成立，范围需要缩小或补足明确能力。",
    recovery: "为移交写契约和期限，安排结对学习；在缺口关闭前拒绝扩大切片。",
  },
  {
    label: "专家孤岛",
    tone: COLORS.danger,
    evidence:
      "核心成员离开后，其他人不能解释报警、回退或用户影响，发布责任无人接手。",
    firstChange: "接管节点：知识和信任集中，故障恢复不能由团队完成。",
    recovery: "降低范围，轮换演练并重放失败输入，补足运行记录和第二责任人。",
  },
] as const;

export function Tpp20Topic49PragmaticTeamsLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="pragmatic-teams-lab"
      aria-label="务实团队实验"
      aria-labelledby="pragmatic-teams-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="pragmatic-teams-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择团队样本，定位端到端能力的首个变化
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
        aria-label="选择团队样本"
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
        先画能力和责任，再选择团队样本；稳定边界的价值在于多人都能接住用户结果。
      </p>
    </section>
  );
}
