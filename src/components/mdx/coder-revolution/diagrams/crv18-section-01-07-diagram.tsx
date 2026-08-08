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

const INPUT_STAGES = [
  { label: "设备事件", detail: "按键与时间" },
  { label: "控制器", detail: "状态与缓冲" },
  { label: "总线/端口", detail: "路径与权限" },
  { label: "驱动", detail: "确认与入队" },
  { label: "进程", detail: "消费与回报" },
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

export function Crv18Section0107LoopDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 122;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-01-07-input-loop"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="从设备事件、控制器缓冲、总线和端口、驱动到进程消费的输入链"
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
          输入事件链：每次交接都要留下证据
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          通知不等于消费，搬运不等于解释，所有权必须在边界处交接
        </text>
        {INPUT_STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {INPUT_STAGES.map((stage, index) => {
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
                {active ? "当前交接点" : index < 3 ? "生产证据" : "消费证据"}
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
          轮询主动检查；中断负责通知；DMA 负责批量搬运——三者都不能越过驱动边界
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把设备、内核和进程放回同一条输入传递合同。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "事件",
    normal: "序列连续",
    boundary: "突发增加",
    fault: "重复或丢失",
  },
  {
    label: "通知",
    normal: "及时到达",
    boundary: "合并延迟",
    fault: "通知缺失",
  },
  {
    label: "缓冲",
    normal: "容量足够",
    boundary: "接近上限",
    fault: "越界或旧读",
  },
  {
    label: "所有权",
    normal: "驱动→进程",
    boundary: "回压等待",
    fault: "提前交接",
  },
] as const;

export function Crv18Section0107EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-01-07-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="设备输入事件、通知、缓冲和所有权的正常、边界与单一故障证据矩阵"
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
          证据矩阵：从第一处偏差判断处理方式
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看顺序，边界样本看停止，故障样本看恢复
        </text>
        <rect
          x="24"
          y="84"
          width="892"
          height="44"
          rx="10"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text
          x="48"
          y="112"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.primary}
        >
          观察项
        </text>
        {columns.map((column, index) => {
          const x = 244 + index * 224;
          return (
            <g key={column.key}>
              <circle cx={x + 18} cy="106" r="6" fill={column.tone} />
              <text
                x={x + 34}
                y="112"
                fontSize="14"
                fontWeight="700"
                fill={column.tone}
              >
                {column.title}
              </text>
            </g>
          );
        })}
        {EVIDENCE_ROWS.map((row, rowIndex) => {
          const y = 136 + rowIndex * 54;
          return (
            <g key={row.label}>
              <rect
                x="24"
                y={y}
                width="892"
                height="44"
                rx="10"
                fill={rowIndex % 2 === 0 ? COLORS.elevated : "transparent"}
                stroke={COLORS.border}
              />
              <text
                x="48"
                y={y + 28}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                {row.label}
              </text>
              <text x="278" y={y + 28} fontSize="13" fill={COLORS.primary}>
                {row.normal}
              </text>
              <text x="502" y={y + 28} fontSize="13" fill={COLORS.primary}>
                {row.boundary}
              </text>
              <text x="726" y={y + 28} fontSize="13" fill={COLORS.primary}>
                {row.fault}
              </text>
            </g>
          );
        })}
        <rect
          x="24"
          y="356"
          width="892"
          height="26"
          rx="8"
          fill={COLORS.warning}
          fillOpacity="0.1"
        />
        <text
          x="470"
          y="374"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.primary}
        >
          先固定首个异常，再决定消费、回压、丢弃或恢复
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：同一条输入链，要分别在正常、边界和故障样本中验证。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "正常输入",
    tone: COLORS.success,
    title: "三次按键，三次有序消费",
    evidence: "event-17 → buffer-17 → driver-17 → process-17",
    decision: "consume：保留顺序和完成记录",
  },
  {
    id: 2,
    label: "缓冲边界",
    tone: COLORS.warning,
    title: "突发输入撞上控制器容量",
    evidence: "buffer-31 达到上限；event-32 进入回压分支",
    decision: "backpressure：等待消费，不承诺无损",
  },
  {
    id: 3,
    label: "通知故障",
    tone: COLORS.danger,
    title: "DMA 完成但通知没有到达",
    evidence: "batch-9 已搬运；driver ack 缺失；process 未消费",
    decision: "drop/recover：保留批次并重新同步所有权",
  },
] as const;

export function Crv18Section0107Lab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-01-07-lab"
      aria-label="设备输入传递样本实验"
      aria-labelledby="crv18-section-01-07-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-01-07-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            输入事件样本台
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            只改变一个条件，观察事件身份、缓冲状态、通知和所有权如何改变判定。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={() => setScenarioId(1)}
          aria-label="重置样本"
        >
          重置样本
        </button>
      </div>
      <div
        className="mt-5 grid gap-3 sm:grid-cols-3"
        role="tablist"
        aria-label="输入样本选择"
      >
        {LAB_SCENARIOS.map((item) => {
          const selected = item.id === scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
              onClick={() => setScenarioId(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                样本 {item.id}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-card border border-border p-4">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: scenario.tone }}
            />
            <p className="font-semibold text-primary">{scenario.title}</p>
          </div>
          <p className="mt-3 break-words font-mono text-xs text-secondary">
            {scenario.evidence}
          </p>
        </div>
        <div className="rounded-card border border-border p-4 md:min-w-64">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            判定
          </p>
          <p
            className="mt-2 text-sm font-semibold"
            style={{ color: scenario.tone }}
          >
            {scenario.decision}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-secondary" aria-live="polite">
        当前样本：{scenario.label}
        ；复核时只改变一个条件，并保存首个异常前后的队列记录。
      </p>
    </section>
  );
}
