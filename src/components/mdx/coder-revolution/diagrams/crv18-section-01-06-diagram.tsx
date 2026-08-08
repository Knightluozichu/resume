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
  { label: "解析", detail: "名称与目录" },
  { label: "元数据", detail: "大小与权限" },
  { label: "数据块", detail: "逻辑与物理" },
  { label: "空闲", detail: "分配与释放" },
  { label: "持久", detail: "顺序与恢复" },
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

export function Crv18Section0106LoopDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-01-06-loop"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="从名称解析、元数据、数据块、空闲块到持久化恢复的文件系统读写链"
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
          文件读写链：名称不是位置，保存不止一次写入
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          文件系统负责对象和一致性，块设备负责稳定保存块
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const active = index === 4;
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
                    : index < 4
                      ? COLORS.success
                      : COLORS.border
                }
                fillOpacity={index <= 4 ? "1" : "0.45"}
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
                {active ? "当前恢复点" : index < 4 ? "已定位" : "待复核"}
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
          目录项存在不能单独证明数据和空闲账本已经稳定
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：文件系统把名称、块所有权和断电恢复连接成一条证据链。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  { label: "路径", normal: "可解析", boundary: "权限拒绝", fault: "悬空项" },
  { label: "数据", normal: "块完整", boundary: "碎片扩大", fault: "旧内容" },
  {
    label: "空间",
    normal: "账本一致",
    boundary: "恰好耗尽",
    fault: "重复归属",
  },
  { label: "恢复", normal: "版本稳定", boundary: "先回放", fault: "顺序缺失" },
] as const;

export function Crv18Section0106EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-01-06-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="文件系统路径、数据、空间和恢复的正常、边界与单一故障证据矩阵"
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
          持久化证据矩阵：看第一处不一致
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看映射，边界样本看停止，故障样本看恢复
        </text>
        <rect
          x="24"
          y="86"
          width="892"
          height="46"
          rx="12"
          fill={COLORS.accent}
          fillOpacity="0.08"
          stroke={COLORS.border}
        />
        <text
          x="50"
          y="115"
          fontSize="14"
          fontWeight="700"
          fill={COLORS.primary}
        >
          观察项
        </text>
        {columns.map((column, index) => {
          const x = 230 + index * 228;
          return (
            <g key={column.key}>
              <rect
                x={x}
                y="92"
                width="202"
                height="34"
                rx="9"
                fill={column.tone}
                fillOpacity="0.12"
                stroke={column.tone}
              />
              <text
                x={x + 101}
                y="114"
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
          const y = 144 + rowIndex * 48;
          return (
            <g key={row.label}>
              <rect
                x="24"
                y={y}
                width="892"
                height="40"
                rx="9"
                fill={rowIndex % 2 === 0 ? COLORS.elevated : "transparent"}
                stroke={COLORS.border}
              />
              <text
                x="50"
                y={y + 25}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                {row.label}
              </text>
              {columns.map((column, index) => {
                const x = 230 + index * 228;
                return (
                  <text
                    key={`${row.label}-${column.key}`}
                    x={x + 101}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="13"
                    fill={column.tone}
                  >
                    {row[column.key]}
                  </text>
                );
              })}
            </g>
          );
        })}
        <rect
          x="24"
          y="348"
          width="892"
          height="28"
          rx="9"
          fill={COLORS.warning}
          fillOpacity="0.1"
          stroke={COLORS.warning}
        />
        <text
          x="470"
          y="367"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.primary}
        >
          恢复必须同时检查内容、元数据和空闲块所有权
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：三类样本共同检查名称、数据、空间与恢复证据。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "保存闭合",
    tone: COLORS.success,
    input: "路径、元数据、数据块、空闲账本和同步顺序都已记录。",
    firstChange: "没有异常首差，恢复后内容和所有权一致。",
    action: "接受写入并保留恢复样本。",
  },
  {
    label: "先回放",
    tone: COLORS.warning,
    input: "断电发生在数据块与目录项更新之间，恢复状态依赖日志。",
    firstChange: "持久化顺序先变得不确定，不能只看目录项。",
    action: "冻结写入，按日志回放并验证旧版本。",
  },
  {
    label: "必须拒绝",
    tone: COLORS.danger,
    input: "两个文件指向同一块，且空闲账本没有明确所有者。",
    firstChange: "块所有权先失效，继续写入会扩大污染。",
    action: "拒绝新写入，隔离块并重建账本。",
  },
] as const;

export function Crv18Section0106Lab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];
  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-01-06-lab"
      aria-label="文件系统持久化实验"
      aria-labelledby="crv18-section-01-06-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="crv18-section-01-06-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择持久化样本，定位首个不一致
          </h3>
        </div>
        <span
          className="rounded-full border border-border px-3 py-1 text-xs font-semibold"
          style={{ color: current.tone }}
        >
          {current.label}
        </span>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="选择持久化样本"
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
          <p className="text-xs font-semibold text-secondary">输入</p>
          <p className="mt-1 text-sm text-primary">{current.input}</p>
        </div>
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">首个变化</p>
          <p className="mt-1 text-sm text-primary">{current.firstChange}</p>
        </div>
        <div className="rounded-card border border-border p-3">
          <p className="text-xs font-semibold text-secondary">裁决动作</p>
          <p className="mt-1 text-sm text-primary">{current.action}</p>
        </div>
      </div>
      <p className="mt-4 rounded-lg border border-border bg-background p-3 text-sm text-secondary">
        先保存结构和顺序，再决定提交、回放或拒绝；目录和容量数字都不是完整证据。
      </p>
    </section>
  );
}
