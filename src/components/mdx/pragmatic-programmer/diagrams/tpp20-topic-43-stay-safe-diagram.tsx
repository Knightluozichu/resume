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
  { label: "资产", detail: "标出需要保护" },
  { label: "威胁", detail: "写入口与影响" },
  { label: "攻击面", detail: "删除不必要能力" },
  { label: "防护", detail: "权限与输入边界" },
  { label: "监测", detail: "回归与恢复证据" },
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

export function Tpp20Topic43StaySafeLoopDiagram() {
  const cardWidth = 172;
  const gap = 22;
  const startX = 22;
  const cardY = 126;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="stay-safe-loop"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="安全工程从资产、威胁、攻击面、防护到监测的持续回路"
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
          安全工程：从资产边界走到可恢复监测
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          简洁减少入口，权限和验证减少伤害，回归证明修复仍然有效
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return (
            <Arrow
              key={`${stage.label}-arrow`}
              x1={x1}
              x2={x2}
              y={cardY + 64}
            />
          );
        })}
        {STAGES.map((stage, index) => {
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
                fillOpacity={index <= 3 ? "1" : "0.4"}
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
                {active ? "当前边界入口" : index < 3 ? "已留证据" : "等待证据"}
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
          拒绝要发生在敏感副作用之前，修复还要能被安全回归重放
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：安全决定连接资产、权限、输入、补丁和恢复，而不是一次扫描。
      </figcaption>
    </figure>
  );
}

const EVIDENCE_ROWS = [
  {
    label: "入口",
    normal: "合法主体",
    boundary: "越权输入",
    fault: "补丁缺失",
  },
  {
    label: "决定",
    normal: "允许并审计",
    boundary: "拒绝无副作用",
    fault: "暴露首差",
  },
  {
    label: "记录",
    normal: "摘要事件",
    boundary: "不泄露秘密",
    fault: "修复版本",
  },
  { label: "恢复", normal: "持续监测", boundary: "补回归", fault: "回退重放" },
] as const;

export function Tpp20Topic43StaySafeEvidenceDiagram() {
  const columns = [
    { key: "normal", title: "正常", tone: COLORS.success },
    { key: "boundary", title: "边界", tone: COLORS.warning },
    { key: "fault", title: "故障", tone: COLORS.danger },
  ] as const;
  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="stay-safe-evidence"
    >
      <svg
        viewBox="0 0 960 390"
        role="img"
        aria-label="安全工程正常、边界和单一故障样本的证据矩阵"
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
          证据矩阵：安全拒绝、监测与恢复要一起验证
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          扫描结果只是一个观察点，不能代替入口与副作用边界
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
          保存脱敏输入、决定、修复版本、监测字段和回退结果，复核者才能重放
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：安全证据同时覆盖合法路径、拒绝路径和补丁失效路径。
      </figcaption>
    </figure>
  );
}

const LAB_SCENARIOS = [
  {
    label: "合法动作",
    tone: COLORS.success,
    evidence: "主体、资源和输入均满足边界，动作被允许并写入脱敏事件。",
    firstChange: "无首个差异：授权、验证和监测一致。",
    recovery: "保存决定摘要、版本和审计关联 ID。",
  },
  {
    label: "越权边界",
    tone: COLORS.warning,
    evidence: "普通用户请求他人资源，入口收到过期或越权凭据。",
    firstChange: "权限节点：在敏感副作用前明确拒绝。",
    recovery: "加入安全回归，确认日志没有秘密。",
  },
  {
    label: "补丁故障",
    tone: COLORS.danger,
    evidence: "依赖补丁未进入目标环境，已知输入再次到达敏感路径。",
    firstChange: "防护节点：版本或配置不满足安全合同。",
    recovery: "隔离入口，补丁验证后重放并保留回退。",
  },
] as const;

export function Tpp20Topic43StaySafeLab() {
  const [scenario, setScenario] = useState(1);
  const current = LAB_SCENARIOS[scenario];
  return (
    <section
      className="my-6 rounded-card border border-border bg-elevated p-4"
      data-visual-kind="stay-safe-lab"
      aria-label="出门在外注意安全实验"
      aria-labelledby="stay-safe-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Interactive lab
          </p>
          <h3
            id="stay-safe-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            选择安全样本，检查拒绝与恢复
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
        aria-label="选择安全样本"
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
        先写资产与拒绝条件，再选择样本；安全通过不等于所有风险消失，仍要验证监测与回退。
      </p>
    </section>
  );
}
