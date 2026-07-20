"use client";

import { useState, type ReactNode } from "react";

const c = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function DryFrame({
  eyebrow,
  title,
  description,
  kind,
  reset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-09-dry-duplication"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold hover:border-accent"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

const structures = {
  scattered: {
    label: "散落副本：三个地方各写一个阈值",
    nodes: [
      ["结算代码", "满 ¥99 免运费", c.danger],
      ["运营配置", "满 ¥88 免运费", c.warning],
      ["帮助中心", "满 ¥99 免运费", c.danger],
    ],
    verdict:
      "同一业务知识有三个作者；用户在 ¥90 下单时，结算与运营规则已经互相矛盾。",
    color: c.danger,
  },
  authority: {
    label: "唯一权威源：ShippingPolicy v17",
    nodes: [
      ["ShippingPolicy v17", "freeShippingThreshold = ¥88", c.success],
      ["结算代码", "读取 v17", c.accent],
      ["帮助中心", "由 v17 生成", c.accent],
    ],
    verdict:
      "阈值只在 ShippingPolicy 中被决定；代码与文档是可追溯投影，不再各自发明规则。",
    color: c.success,
  },
} as const;
type StructureId = keyof typeof structures;

export function Tpp20Topic09DryDuplicationSystemLab() {
  const [id, setId] = useState<StructureId>("scattered");
  const structure = structures[id];
  return (
    <DryFrame
      eyebrow="Topic 9 专属解剖图 · 一条运费知识的所有者"
      title="“满额免运费”究竟由谁决定？"
      description="切换两种真实结构。图中不是相似度分数：每个方块都是会在结算、运营或用户解释中实际读取到的规则副本或投影。"
      kind="dry-knowledge-authority"
      reset={() => setId("scattered")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(structures) as StructureId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {structures[key].label}
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 940 290"
          role="img"
          aria-label={structure.label}
          className="mt-4 hidden h-auto w-full md:block"
        >
          <defs>
            <marker
              id="dry-authority-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={structure.color} />
            </marker>
          </defs>
          <text x="34" y="31" fontSize="13" fontWeight="700" fill={c.text}>
            业务事实：购物车金额 ¥90；本次阈值由高亮的权威位置决定。
          </text>
          {structure.nodes.map(([title, value, color], index) => {
            const x = 48 + index * 292;
            const authority = id === "authority" ? index === 0 : true;
            return (
              <g key={title}>
                <rect
                  x={x}
                  y="88"
                  width="222"
                  height="106"
                  rx="14"
                  fill={color}
                  fillOpacity="0.1"
                  stroke={color}
                  strokeWidth={authority ? 2.5 : 1.5}
                />
                <text
                  x={x + 111}
                  y="126"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={c.text}
                >
                  {title}
                </text>
                <text
                  x={x + 111}
                  y="155"
                  textAnchor="middle"
                  fontSize="12"
                  fill={color}
                >
                  {value}
                </text>
                <text
                  x={x + 111}
                  y="178"
                  textAnchor="middle"
                  fontSize="11.5"
                  fill={c.muted}
                >
                  {authority ? "能改变业务事实" : "只消费 / 展示该事实"}
                </text>
                {index < 2 && (
                  <path
                    d={`M${x + 222} 141 H${x + 270}`}
                    stroke={structure.color}
                    strokeWidth="3"
                    markerEnd="url(#dry-authority-arrow)"
                  />
                )}
              </g>
            );
          })}
          <rect
            x="48"
            y="226"
            width="806"
            height="38"
            rx="10"
            fill={c.bg}
            stroke={structure.color}
          />
          <text x="68" y="250" fontSize="12" fill={structure.color}>
            {structure.verdict}
          </text>
        </svg>
        <div className="mt-4 grid gap-2 md:hidden">
          {structure.nodes.map(([title, value, color], index) => (
            <div
              key={title}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <strong className="text-sm">{title}</strong>
              <span className="mt-1 block text-sm" style={{ color }}>
                {value}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                {id === "authority" && index > 0
                  ? "只消费 / 展示该事实"
                  : "能改变业务事实"}
              </span>
            </div>
          ))}
          <p
            className="rounded-control border-l-4 bg-bg p-3 text-sm"
            style={{ borderColor: structure.color }}
          >
            {structure.verdict}
          </p>
        </div>
      </div>
    </DryFrame>
  );
}

const updates = {
  manual: {
    label: "人工分别改三个副本",
    rows: [
      ["结算代码", "¥88", true],
      ["运营配置", "¥88", true],
      ["帮助中心", "¥99", false],
    ],
    verdict: "首差在帮助中心：用户看到 ¥99，却在 ¥90 结算时免运费。",
    color: c.danger,
  },
  generated: {
    label: "改 ShippingPolicy 后重新生成",
    rows: [
      ["ShippingPolicy v18", "¥88", true],
      ["结算代码", "读取 v18", true],
      ["帮助中心", "由 v18 生成", true],
    ],
    verdict:
      "同一个变更被投影到所有消费者；比较的是版本号和输出，不是主观“看起来一致”。",
    color: c.success,
  },
  blocked: {
    label: "文档生成失败，停止发布",
    rows: [
      ["ShippingPolicy v18", "¥88", true],
      ["结算代码", "读取 v18", true],
      ["帮助中心", "生成任务失败", false],
    ],
    verdict: "首差被明确暴露在生成任务；不能带着旧帮助中心发布。",
    color: c.warning,
  },
} as const;
type UpdateId = keyof typeof updates;

export function Tpp20Topic09DryDuplicationFeedbackLab() {
  const [id, setId] = useState<UpdateId>("generated");
  const update = updates[id];
  return (
    <DryFrame
      eyebrow="Topic 9 专属实验 · 投影与漂移检测"
      title="把阈值从 ¥99 改为 ¥88，只观察第一处不一致"
      description="固定业务变化，选择更新路径。每一行是同一条运费知识在具体消费者中的可核查输出；红色不是风险评分，而是已经可观察到的陈旧副本。"
      kind="dry-projection-drift"
      reset={() => setId("generated")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(updates) as UpdateId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {updates[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.1fr_1.3fr_0.7fr] bg-bg px-3 py-2 text-xs font-semibold text-secondary">
            <span>真实对象</span>
            <span>本次读到的值</span>
            <span>与权威源</span>
          </div>
          {update.rows.map(([name, value, matches]) => (
            <div
              key={name}
              className="grid grid-cols-[1.1fr_1.3fr_0.7fr] items-center border-t border-border px-3 py-3 text-sm"
            >
              <strong>{name}</strong>
              <code
                className="text-xs"
                style={{ color: matches ? c.success : c.danger }}
              >
                {value}
              </code>
              <span
                className="font-semibold"
                style={{ color: matches ? c.success : c.danger }}
              >
                {matches ? "一致" : "首差"}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
          style={{ borderColor: update.color }}
        >
          {update.verdict}
        </p>
      </div>
    </DryFrame>
  );
}

const recovery = {
  drift: {
    label: "故障快照：帮助中心仍是 v17",
    policy: "v18 / ¥88",
    checkout: "v18 / ¥88",
    help: "v17 / ¥99",
    result: "拒绝发布：这不是“文案小误差”，而是同一业务知识有两个答案。",
    color: c.danger,
  },
  repaired: {
    label: "修复：从 v18 重新投影",
    policy: "v18 / ¥88",
    checkout: "v18 / ¥88",
    help: "v18 / ¥88",
    result:
      "恢复完成：保存 v18、生成日志和 ¥90 样例输出，下一次可从同一基线重放。",
    color: c.success,
  },
} as const;
type RecoveryId = keyof typeof recovery;

export function Tpp20Topic09DryDuplicationEvidenceLab() {
  const [id, setId] = useState<RecoveryId>("drift");
  const item = recovery[id];
  const rows = [
    ["权威规则", item.policy],
    ["结算输出", item.checkout],
    ["帮助中心", item.help],
  ];
  return (
    <DryFrame
      eyebrow="Topic 9 专属复核 · 从原始规则重放"
      title="不要手改最后一处：用规则版本重建全部证据"
      description="在故障快照与重放后的状态间切换。验收证据是同一版本、同一 ¥90 样例在规则、结算和用户说明中的输出；重置会回到失败快照。"
      kind="dry-replay-evidence"
      reset={() => setId("drift")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(recovery) as RecoveryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {recovery[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {rows.map(([label, value], index) => {
            const matches = index === 0 || value === item.policy;
            return (
              <div
                key={label}
                className="rounded-control border bg-bg p-4"
                style={{ borderColor: matches ? c.success : c.danger }}
              >
                <span className="text-xs font-semibold text-secondary">
                  {label}
                </span>
                <strong
                  className="mt-2 block font-mono text-sm"
                  style={{ color: matches ? c.success : c.danger }}
                >
                  {value}
                </strong>
                <span
                  className="mt-2 block text-xs"
                  style={{ color: matches ? c.success : c.danger }}
                >
                  {matches ? "可由同一输入重建" : "版本漂移，不能当作证据"}
                </span>
              </div>
            );
          })}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
          style={{ borderColor: item.color }}
        >
          {item.result}
        </p>
      </div>
    </DryFrame>
  );
}
