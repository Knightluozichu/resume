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
  { label: "指令", detail: "程序输入", tone: COLORS.success },
  { label: "CPU", detail: "取指执行", tone: COLORS.accent },
  { label: "地址空间", detail: "映射 + 权限", tone: COLORS.warning },
  { label: "进程/线程", detail: "归属 + 调度", tone: COLORS.accent },
  { label: "设备 I/O", detail: "内核 + 缓冲", tone: COLORS.success },
] as const;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line
        x1={x1}
        y1={y}
        x2={x2 - 13}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 22} ${y - 7} L${x2} ${y} L${x2 - 22} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Crv18Chapter01ComputerDiagram() {
  const cardWidth = 164;
  const gap = 20;
  const startX = 22;
  const cardY = 119;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-chapter-01-computer"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="程序从指令经过 CPU、地址空间、进程线程和设备 I/O 的执行链"
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
          计算机执行链：每一层只承诺自己的资源边界
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          最终结果要经过设备、文件或网络的外部确认
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={188} />;
        })}
        {STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const highlight = index === 2;
          return (
            <g key={stage.label}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="150"
                rx="14"
                fill={highlight ? COLORS.accent : COLORS.elevated}
                fillOpacity={highlight ? "0.12" : "1"}
                stroke={highlight ? COLORS.accent : COLORS.border}
                strokeWidth={highlight ? "2" : "1"}
              />
              <circle cx={x + 24} cy={cardY + 29} r="12" fill={stage.tone} />
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
                fontSize="14"
                fontWeight="700"
                fill={highlight ? COLORS.accent : COLORS.primary}
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
                fill={highlight ? COLORS.accent : COLORS.secondary}
              >
                {highlight ? "权限边界" : index === 4 ? "外部结果" : "执行证据"}
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
          本地调用完成、设备处理完成和外部确认完成不是同一个状态
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把计算机黑盒拆成可观察的指令、资源和 I/O 边界。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "执行", normal: "指令完成", boundary: "被调度", fault: "异常" },
  { label: "地址", normal: "可访问", boundary: "权限边界", fault: "越界" },
  { label: "I/O", normal: "接口返回", boundary: "缓冲/背压", fault: "设备错" },
  { label: "结果", normal: "已确认", boundary: "待确认", fault: "未到达" },
] as const;

export function Crv18Chapter01EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-chapter-01-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="程序执行、地址、I/O 和外部结果在正常边界故障场景下的证据矩阵"
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
          计算机证据矩阵：接口返回与最终结果分开验收
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常看推进，边界看资源预算，故障看首个合同违约
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
          先保存所有权、状态和错误，再解释最终输出
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把执行、地址、I/O 和外部确认的边界并列复核。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "内存计算",
    tone: COLORS.success,
    title: "合法地址内完成计算，线程退出值符合预期",
    evidence: "instruction → cpu → mapped address → process state → exit=ok",
    decision: "accept：执行和资源边界都可解释",
  },
  {
    id: 2,
    label: "I/O 背压",
    tone: COLORS.warning,
    title: "写接口暂时不可继续，调用者保存剩余数据并等待",
    evidence: "syscall → buffer full → wait/retry → device confirm",
    decision: "hold：接口返回不是外部结果，保留状态",
  },
  {
    id: 3,
    label: "地址故障",
    tone: COLORS.danger,
    title: "线程访问无权限地址，系统拒绝并阻止伪造输出",
    evidence: "thread → invalid mapping → fault → no external result",
    decision: "repair：回到地址所有权和生命周期检查",
  },
] as const;

export function Crv18Chapter01ComputerLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];
  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-chapter-01-computer-lab"
      aria-label="计算机资源边界诊断实验"
      aria-labelledby="crv18-chapter-01-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-chapter-01-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            计算机资源边界诊断实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            只改变地址、调度或 I/O 状态，观察程序执行链怎样停下或继续。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={() => setScenarioId(1)}
          aria-label="重置实验"
        >
          重置实验
        </button>
      </div>
      <div
        className="mt-5 grid gap-3 sm:grid-cols-3"
        role="tablist"
        aria-label="计算机资源实验场景选择"
      >
        {LAB_SCENARIOS.map((item) => {
          const selected = item.id === scenarioId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-accent"}`}
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
      <p
        className="mt-4 text-xs text-secondary"
        role="status"
        aria-live="polite"
      >
        当前样本：{scenario.label}
        ；保存线程、进程、地址、I/O、设备状态和复位结果。
      </p>
    </section>
  );
}
