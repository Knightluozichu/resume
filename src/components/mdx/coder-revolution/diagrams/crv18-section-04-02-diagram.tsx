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
  { label: "项目模型", detail: "坐标 + 输入", tone: COLORS.success },
  { label: "解析依赖", detail: "闭合依赖图", tone: COLORS.accent },
  { label: "执行阶段", detail: "compile → package", tone: COLORS.warning },
  { label: "运行验证", detail: "test + checks", tone: COLORS.accent },
  { label: "生成产物", detail: "摘要 + 清单", tone: COLORS.success },
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

export function Crv18Section0402BuildDiagram() {
  const cardWidth = 164;
  const gap = 20;
  const startX = 22;
  const cardY = 119;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-04-02-build"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="Build 从项目模型到生成产物的五个节点"
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
          Build 演进：从记忆命令到声明式可重放流水线
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          输入、依赖、阶段、验证和产物必须形成同一份证据链
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
                {highlight ? "输入闭合" : index === 4 ? "可发布" : "阶段证据"}
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
          构建成功不等于可发布：还要有依赖、验证和产物摘要证据
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：把 Build 的输入闭合、阶段执行和发布门禁放到一条链。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "输入",
    normal: "清单闭合",
    boundary: "配置变更",
    fault: "隐含文件",
  },
  { label: "依赖", normal: "版本锁定", boundary: "传递变化", fault: "漂移" },
  {
    label: "阶段",
    normal: "顺序稳定",
    boundary: "插件变更",
    fault: "跳过验证",
  },
  { label: "产物", normal: "摘要一致", boundary: "摘要变化", fault: "仍发布" },
] as const;

export function Crv18Section0402EvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="crv18-section-04-02-evidence"
    >
      <svg
        viewBox="0 0 940 390"
        role="img"
        aria-label="Build 输入、依赖、阶段和产物在正常边界故障场景下的证据矩阵"
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
          Build 证据矩阵：过程日志与产物摘要分开验收
        </text>
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          正常看可重放，边界看局部变化，故障看拒绝门禁
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
          先保存首个失败阶段，再决定是否允许产物进入发布队列
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：同一份矩阵覆盖输入、依赖、执行和发布边界。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "干净构建",
    tone: COLORS.success,
    title: "模型、依赖、阶段和验证闭合，产物摘要稳定",
    evidence: "model → lock graph → lifecycle → tests → artifact sha",
    decision: "accept：输入与过程证据足够重放",
  },
  {
    id: 2,
    label: "依赖变化",
    tone: COLORS.warning,
    title: "传递依赖版本变化，阶段仍完成但摘要发生变化",
    evidence: "same source → changed tree → different tests/artifact → compare",
    decision: "hold：锁定依赖并说明摘要差异",
  },
  {
    id: 3,
    label: "隐含输入",
    tone: COLORS.danger,
    title: "本地文件缺失后 CI 失败，原脚本没有记录输入边界",
    evidence: "local file → hidden input → clean build fails → reset",
    decision: "repair：声明输入并让失败阻止发布",
  },
] as const;

export function Crv18Section0402BuildLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="crv18-section-04-02-build-lab"
      aria-label="Build 可重放与发布门禁实验"
      aria-labelledby="crv18-section-04-02-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="crv18-section-04-02-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            Build 可重放与发布门禁实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            只改变一个输入或依赖，观察阶段日志、验证结果和产物摘要怎样变化。
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
        aria-label="Build 实验场景选择"
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
        ；保存模型、依赖树、阶段日志、验证结果、产物摘要和复位轨迹。
      </p>
    </section>
  );
}
