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
  { label: "目标", detail: "共享结果" },
  { label: "同步", detail: "共同观察" },
  { label: "反馈", detail: "尽早验证" },
  { label: "轮换", detail: "扩大知识流" },
  { label: "复盘", detail: "更新所有权" },
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

export function Tpp20Topic47WorkingTogetherLoopDiagram() {
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="working-together-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="从共同目标、同步工作、即时反馈、角色轮换到复盘的协作回路"
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
          协作回路：共同构建让知识随着代码流动
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          目标给方向，反馈给证据，轮换把理解扩散到更多参与者
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
                {active ? "当前反馈点" : index < 3 ? "已协同" : "待复盘"}
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
          共同所有权要能被多人解释、修改、验证和恢复
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：协作从共同目标出发，经反馈和角色轮换扩散知识，再回到复盘。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "目标",
    normal: "结果共享",
    boundary: "范围清楚",
    fault: "有人代答",
  },
  {
    label: "角色",
    normal: "可以轮换",
    boundary: "责任明确",
    fault: "知识孤岛",
  },
  {
    label: "反馈",
    normal: "及时到达",
    boundary: "风险暂停",
    fault: "测试失联",
  },
  {
    label: "恢复",
    normal: "多人重放",
    boundary: "拒绝交付",
    fault: "回退行动",
  },
] as const;

export function Tpp20Topic47WorkingTogetherEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="working-together-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="协作质量正常、边界和单一故障样本的证据矩阵"
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
          证据矩阵：共享目标不等于共享责任
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          观察谁能解释、验证和恢复，才能发现知识是否真的流动
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
          保存角色、反馈、分歧、测试和回退记录，复核者才能重建协作过程
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：用正常、边界和故障样本验证共同所有权是否可被多人承担。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "结对切片",
    tone: COLORS.success,
    evidence:
      "两人共享目标，一人操作者、一人导航者，测试和分歧记录在工作现场产生。",
    firstChange: "反馈节点：输入边界被及时发现，角色轮换后两人都能解释决定。",
    recovery: "保留切片、测试、分歧和角色记录，让另一人独立重放结果。",
  },
  {
    label: "多人协作",
    tone: COLORS.warning,
    evidence:
      "五人共同讨论一条跨服务切片，但责任、暂停条件和验证人没有先约定。",
    firstChange: "目标节点：范围或验收信号不清，讨论开始替代可观察交付。",
    recovery: "缩小切片，指定反馈负责人和反例验证人，再用小样本重启协作。",
  },
  {
    label: "角色失衡",
    tone: COLORS.danger,
    evidence:
      "操作者离开后，其他人无法解释拒绝条件，也不知道如何回退最近一次改动。",
    firstChange: "所有权节点：知识集中在一个人，失败恢复无法由团队完成。",
    recovery: "暂停发布，轮换角色重放失败输入，补足契约、测试和回退说明。",
  },
] as const;

export function Tpp20Topic47WorkingTogetherLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];

  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="working-together-lab"
      aria-label="携手共建实验"
      aria-labelledby="working-together-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="working-together-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择协作样本，定位知识流的首个变化
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
        aria-label="选择协作样本"
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
        先确认共同目标，再选择协作样本；人数增加不等于反馈更快，证据必须随工作一起产生。
      </p>
    </section>
  );
}
