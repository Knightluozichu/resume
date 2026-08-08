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
  { label: "监听连接", detail: "accept → fd", tone: COLORS.success },
  { label: "注册兴趣", detail: "read / write", tone: COLORS.accent },
  { label: "等待就绪", detail: "select / epoll", tone: COLORS.warning },
  { label: "非阻塞读写", detail: "buffer + state", tone: COLORS.accent },
  { label: "更新兴趣", detail: "continue / close", tone: COLORS.success },
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

export function Crv18Section0310HttpServerDiagram() {
  const cardWidth = 164;
  const gap = 20;
  const startX = 22;
  const cardY = 119;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-03-10-http-server"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="HTTP Server 从监听连接到更新兴趣的五个事件循环节点"
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
          HTTP Server 演进：从占住连接到只处理就绪事件
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          事件通知缩短等待范围，但连接状态和协议边界仍由应用推进
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
                {highlight ? "本轮返回" : index === 3 ? "状态推进" : "边界证据"}
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
          就绪只表示现在可以尝试 I/O；完整请求、缓冲和回收仍要由应用确认
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把四代服务器的调度演进落到同一条可重放的事件链。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "连接", normal: "两个 fd", boundary: "半包", fault: "慢客户端" },
  { label: "等待", normal: "事件返回", boundary: "低活跃", fault: "旧集合" },
  { label: "读写", normal: "缓冲推进", boundary: "暂时无数据", fault: "阻塞" },
  { label: "兴趣", normal: "读 → 写", boundary: "保留读", fault: "未移除" },
] as const;

export function Crv18Section0310EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-03-10-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="事件服务器在正常、边界和故障场景下的证据矩阵"
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
          事件证据矩阵：把就绪、缓冲与兴趣更新分开记录
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常看推进，边界看保存，故障看首个阻塞与复位
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
          先保存返回事件与连接状态，再判断是半包、阻塞还是兴趣泄漏
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：同一份事件证据同时覆盖正常、边界和故障样本。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "完整请求",
    tone: COLORS.success,
    title: "两个连接都能在一次或多次非阻塞读后完成",
    evidence:
      "listen → ready(fd2, fd3) → read buffers → write → remove interest",
    decision: "accept：每个连接都推进，响应完成后兴趣被清理",
  },
  {
    id: 2,
    label: "半包到达",
    tone: COLORS.warning,
    title: "fd2 只收到请求前半段，fd3 仍可独立推进",
    evidence: "ready(fd2) → buffer=part → return loop → ready(fd3) → keep read",
    decision: "hold：保存 fd2 状态，不把可读事件当成完整消息",
  },
  {
    id: 3,
    label: "阻塞故障",
    tone: COLORS.danger,
    title: "fd2 的处理器等待完整请求，fd3 的延迟一起上升",
    evidence: "ready(fd2) → blocking read → fd3 starved → timeout → reset",
    decision: "repair：改为非阻塞推进并设置超时，回收旧兴趣",
  },
] as const;

export function Crv18Section0310HttpServerLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-03-10-http-server-lab"
      aria-label="HTTP Server 事件循环诊断实验"
      aria-labelledby="crv18-section-03-10-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-03-10-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            HTTP Server 事件循环诊断实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            只改变请求到达或处理边界，观察就绪事件、连接缓冲和兴趣集合怎样变化。
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
        aria-label="事件服务器实验场景选择"
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
        当前样本：{scenario.label}；保存连接
        ID、返回事件、缓冲长度、兴趣集合和复位结果。
      </p>
    </section>
  );
}
