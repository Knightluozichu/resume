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

const OFFICIAL_CONCEPT_LABELS = [
  "3.4 机房夜话",
  "第一夜",
  "第二夜",
  "第三夜",
] as const;

const RELIABILITY_STAGES = [
  { label: "识别负载", detail: "请求 + 依赖" },
  { label: "划分故障域", detail: "电源 + 网络" },
  { label: "布置副本", detail: "位置 + 位点" },
  { label: "检测失效", detail: "探活 + 偏离" },
  { label: "切换恢复", detail: "角色 + 重放" },
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

export function Crv18Section0304DatacenterDiagram() {
  const cardWidth = 166;
  const gap = 20;
  const startX = 22;
  const cardY = 120;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-03-04-datacenter"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label={`3.4 机房夜话、第一夜、第二夜、第三夜的可靠性证据链：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
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
          机房可靠性链：先识别边界，再验证切换
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          副本数量只有在共同故障不会同时击中它们时才产生独立性证据
        </text>
        {RELIABILITY_STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return <Arrow key={`${stage.label}-arrow`} x1={x1} x2={x2} y={190} />;
        })}
        {RELIABILITY_STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const active = index === 1;
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
                    : index < 1
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
                {active ? "共同依赖闸门" : index < 2 ? "设计证据" : "运行证据"}
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
          共享电源、交换机或机架时，先标记共同故障，再判断副本是否独立
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把 3.4 机房夜话 的四个目录坐标映射到可观察的可靠性步骤。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "负载",
    normal: "基线固定",
    boundary: "依赖变化",
    fault: "请求失败",
  },
  {
    label: "故障域",
    normal: "分散",
    boundary: "共享交换机",
    fault: "共同掉线",
  },
  {
    label: "副本",
    normal: "位点一致",
    boundary: "角色待定",
    fault: "旧路径写入",
  },
  { label: "切换", normal: "可重放", boundary: "策略待审", fault: "恢复失败" },
] as const;

export function Crv18Section0304EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-03-04-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="3.4 机房夜话的负载、故障域、副本和切换在正常边界故障场景下的证据矩阵"
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
          可靠性证据矩阵：共同故障不能被副本数量遮住
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常样本看闭环，边界样本看独立性，故障样本看首个偏离
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
          先记录故障域与首个偏离，再判断是否切换成功
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：让共同依赖、角色和恢复轨迹成为可审计证据。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "正常基线",
    tone: COLORS.success,
    title: "副本分处不同故障域，路由与数据位点一致",
    evidence:
      "load=fixed → domains=power-a/power-b → replicas=ready → replay=match",
    decision: "accept：独立性与恢复合同均有证据",
  },
  {
    id: 2,
    label: "共同依赖",
    tone: COLORS.warning,
    title: "两副本共享交换机，数量增加但故障域没有分开",
    evidence:
      "replicas=2 + shared-switch → common-fault-risk → do-not-multiply",
    decision: "review：先修正故障域标签与放置策略",
  },
  {
    id: 3,
    label: "注入故障",
    tone: COLORS.danger,
    title: "共享交换机失效，探活与请求同时偏离",
    evidence:
      "inject=shared-switch → detect → route=standby → old-write=blocked",
    decision: "recover：记录首个偏离并验证复位重放",
  },
] as const;

export function Crv18Section0304DatacenterLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-03-04-datacenter-lab"
      aria-label="机房故障域与切换恢复实验"
      aria-labelledby="crv18-section-03-04-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-03-04-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            机房故障域与切换恢复实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            先预测一个共同故障会击中哪些副本，再切换正常、边界与故障样本并保存轨迹。
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
        aria-label="机房实验场景选择"
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
        当前样本：{scenario.label}；保存请求
        ID、故障域、角色、复制位点、首个偏离和复位轨迹。
      </p>
    </section>
  );
}
