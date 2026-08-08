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

const NETWORK_STAGES = [
  { label: "构造请求", detail: "身份 + 帧", tone: COLORS.accent },
  { label: "连接服务", detail: "握手 + 超时", tone: COLORS.success },
  { label: "传输消息", detail: "字节 + 顺序", tone: COLORS.warning },
  { label: "处理状态", detail: "提交 + 去重", tone: COLORS.accent },
  { label: "接收响应", detail: "结果 + 恢复", tone: COLORS.success },
] as const;

const OFFICIAL_CONCEPT_LABELS = [
  "3.2 两个程序的爱情故事",
  "好感",
  "分离",
  "网络",
  "Web",
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

export function Crv18Section0302NetworkDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 122;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-03-02-network-chain"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label={`两个程序从构造请求、连接服务、传输消息、处理状态到接收响应；概念：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
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
          两个程序的交互链：消息穿过不可靠边界
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          连接成功、消息到达、状态提交和响应收到是四种不同证据
        </text>
        {NETWORK_STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {NETWORK_STAGES.map((stage, index) => {
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
                cx={x + 24}
                cy={cardY + 29}
                r="12"
                fill={active ? COLORS.accent : stage.tone}
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
                fontSize="14"
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
                {active ? "网络边界" : index === 3 ? "副作用" : "进程证据"}
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
          客户端没收到响应，不等于服务器没处理请求
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把连接、消息 framing、服务状态与响应恢复放进一条轨迹。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "连接", normal: "已建立", boundary: "超时", fault: "中断" },
  { label: "消息", normal: "完整", boundary: "部分", fault: "重复" },
  { label: "状态", normal: "提交", boundary: "未知", fault: "双写" },
  { label: "响应", normal: "收到", boundary: "丢失", fault: "错帧" },
] as const;

export function Crv18Section0302EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-03-02-network-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="两个程序连接、消息、状态和响应在正常边界故障场景下的证据矩阵"
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
          分布式交互证据矩阵
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          连接、消息、状态和响应必须用同一身份对齐
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
          request ID、消息帧和服务提交把两个进程的证据串在一起
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：分别验收连接生命周期、消息完整性、服务状态和响应收取。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "稳定交互",
    tone: COLORS.success,
    title: "消息完整到达，服务提交一次并返回响应",
    evidence: "R1 → connect → framed request → commit=1 → framed response",
    decision: "通过：两端事件按 request ID 对齐，副作用计数为一次",
  },
  {
    id: 2,
    label: "网络丢失",
    tone: COLORS.warning,
    title: "响应丢失，客户端进入未知状态并查询服务端",
    evidence: "R1 → commit=1 → response lost → query(R1) → committed",
    decision: "边界：查询收敛状态，不把空响应当未执行",
  },
  {
    id: 3,
    label: "重复副作用",
    tone: COLORS.danger,
    title: "无 framing/幂等控制，超时重试导致服务端双写",
    evidence: "R1 timeout → R2 retry → commit count=2 → duplicate",
    decision: "拒绝：补消息身份、去重和清空双端状态后重放",
  },
] as const;

export function Crv18Section0302Lab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-03-02-network-lab"
      aria-label="两个程序的消息交互实验"
      aria-labelledby="crv18-section-03-02-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-03-02-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            消息 framing 与重复副作用实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            一次只改变网络时序、消息完整性或幂等策略，观察两端状态如何收敛。
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
        aria-label="进程交互场景选择"
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
              className={`min-h-11 rounded-button border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-accent"
              }`}
              onClick={() => setScenarioId(item.id)}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                场景 {item.id}
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
        当前场景：{scenario.label}；记录 request
        ID、连接、消息帧、服务提交、响应、重试和副作用计数。
      </p>
    </section>
  );
}
