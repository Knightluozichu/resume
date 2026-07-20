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

function OrthogonalFrame({
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
      data-tpp20-unit="tpp20-topic-10-orthogonality"
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

const boundaries = {
  coupled: {
    label: "耦合：结算规则直接改共享订单对象",
    nodes: [
      ["结算规则", "写 order.total", true],
      ["发票渲染", "读取 order.total", true],
      ["邮件通知", "读取 order.total", true],
    ],
    result: "调整折扣展示会同时改变发票和邮件的金额来源；局部变化没有边界。",
    color: c.danger,
  },
  isolated: {
    label: "隔离：结算只发布明确的 InvoiceAmount",
    nodes: [
      ["结算规则", "输出 InvoiceAmount", true],
      ["发票渲染", "读取 InvoiceAmount", true],
      ["邮件通知", "读取 OrderSummary", false],
    ],
    result: "发票金额变化只经声明接口传播；邮件继续消费自己的订单摘要。",
    color: c.success,
  },
} as const;
type BoundaryId = keyof typeof boundaries;

export function Tpp20Topic10OrthogonalitySystemLab() {
  const [id, setId] = useState<BoundaryId>("coupled");
  const state = boundaries[id];
  return (
    <OrthogonalFrame
      eyebrow="Topic 10 专属解剖图 · 变化能否越界"
      title="改“发票金额展示”，哪些对象被迫跟着变？"
      description="选择依赖结构。高亮节点是同一次变化真正要改动或重验的对象；正交不是抽象分数，而是能否把不相关消费者留在变更面之外。"
      kind="orthogonality-change-boundary"
      reset={() => setId("coupled")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(boundaries) as BoundaryId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {boundaries[key].label}
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 930 270"
          role="img"
          aria-label={state.label}
          className="mt-4 hidden h-auto w-full md:block"
        >
          <defs>
            <marker
              id="orthogonal-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={state.color} />
            </marker>
          </defs>
          <text x="34" y="31" fontSize="13" fontWeight="700" fill={c.text}>
            唯一变化：结算页把“已省金额”拆出显示；每个方框都是实际依赖该数据的运行对象。
          </text>
          {state.nodes.map(([name, relation, impacted], index) => {
            const x = 50 + index * 286;
            return (
              <g key={name}>
                <rect
                  x={x}
                  y="84"
                  width="210"
                  height="100"
                  rx="14"
                  fill={impacted ? state.color : c.bg}
                  fillOpacity={impacted ? "0.1" : "1"}
                  stroke={impacted ? state.color : c.border}
                  strokeWidth={impacted ? "2.5" : "1.5"}
                />
                <text
                  x={x + 105}
                  y="124"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={c.text}
                >
                  {name}
                </text>
                <text
                  x={x + 105}
                  y="151"
                  textAnchor="middle"
                  fontSize="12"
                  fill={impacted ? state.color : c.muted}
                >
                  {relation}
                </text>
                <text
                  x={x + 105}
                  y="173"
                  textAnchor="middle"
                  fontSize="11.5"
                  fill={impacted ? state.color : c.muted}
                >
                  {impacted ? "必须改动 / 重验" : "不在变化边界内"}
                </text>
                {index < 2 && (
                  <path
                    d={`M${x + 210} 134 H${x + 258}`}
                    stroke={state.color}
                    strokeWidth="3"
                    markerEnd="url(#orthogonal-arrow)"
                  />
                )}
              </g>
            );
          })}
          <rect
            x="50"
            y="218"
            width="782"
            height="30"
            rx="9"
            fill={c.bg}
            stroke={state.color}
          />
          <text x="67" y="238" fontSize="12" fill={state.color}>
            {state.result}
          </text>
        </svg>
        <div className="mt-4 grid gap-2 md:hidden">
          {state.nodes.map(([name, relation, impacted]) => (
            <div
              key={name}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: impacted ? state.color : c.border }}
            >
              <strong className="text-sm">{name}</strong>
              <span
                className="mt-1 block text-sm"
                style={{ color: impacted ? state.color : c.muted }}
              >
                {relation}
              </span>
              <span className="mt-1 block text-xs text-secondary">
                {impacted ? "必须改动 / 重验" : "不在变化边界内"}
              </span>
            </div>
          ))}
          <p
            className="rounded-control border-l-4 bg-bg p-3 text-sm"
            style={{ borderColor: state.color }}
          >
            {state.result}
          </p>
        </div>
      </div>
    </OrthogonalFrame>
  );
}

const probes = {
  shared: {
    label: "共享可变订单对象",
    checks: [
      ["结算单测", "通过：已省金额显示", c.success],
      ["发票快照", "金额格式变化", c.danger],
      ["邮件回归", "金额字段意外变化", c.danger],
    ],
    conclusion: "单元测试只看见结算；共享状态把副作用推给了两个未声明消费者。",
    color: c.danger,
  },
  contract: {
    label: "显式 InvoiceAmount 契约",
    checks: [
      ["结算单测", "通过：输出新字段", c.success],
      ["发票契约", "明确接受新字段", c.success],
      ["邮件回归", "未读取该字段，保持不变", c.success],
    ],
    conclusion:
      "影响验证沿着明确契约展开；未订阅的消费者可不改也不重验业务语义。",
    color: c.success,
  },
  leak: {
    label: "通知服务偷读结算对象",
    checks: [
      ["结算单测", "通过：输出新字段", c.success],
      ["发票契约", "通过", c.success],
      ["邮件回归", "发现隐藏读取", c.warning],
    ],
    conclusion:
      "发现隐藏依赖时应先切断偷读，而不是把邮件纳入每次结算修改的默认回归。",
    color: c.warning,
  },
} as const;
type ProbeId = keyof typeof probes;

export function Tpp20Topic10OrthogonalityFeedbackLab() {
  const [id, setId] = useState<ProbeId>("contract");
  const probe = probes[id];
  return (
    <OrthogonalFrame
      eyebrow="Topic 10 专属实验 · 影响验证"
      title="同一改动下，用哪组检查暴露隐藏依赖？"
      description="保持“新增已省金额”这一变化不变，只改变依赖结构。每一行是可以实际运行的验证点，结果指出第一处越过边界的副作用。"
      kind="orthogonality-impact-probe"
      reset={() => setId("contract")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(probes) as ProbeId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {probes[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {probe.checks.map(([name, result, color]) => (
            <div
              key={name}
              className="rounded-control border bg-bg p-4"
              style={{ borderColor: color }}
            >
              <strong className="text-sm">{name}</strong>
              <span className="mt-2 block text-sm" style={{ color }}>
                {result}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: probe.color }}
        >
          {probe.conclusion}
        </p>
      </div>
    </OrthogonalFrame>
  );
}

const evidence = {
  before: {
    label: "故障：通知越过接口读取 order.total",
    rows: [
      ["结算规则", "InvoiceAmount", true],
      ["发票", "InvoiceAmount", true],
      ["通知", "order.total", false],
    ],
    result: "停止：通知有未声明的数据通道，局部修改仍可能改变用户邮件。",
    color: c.danger,
  },
  after: {
    label: "修复：通知只读 OrderSummary",
    rows: [
      ["结算规则", "InvoiceAmount", true],
      ["发票", "InvoiceAmount", true],
      ["通知", "OrderSummary", true],
    ],
    result:
      "保存接口图、回归输入与三条输出；下一次结算变化只需验证声明消费者。",
    color: c.success,
  },
} as const;
type EvidenceId = keyof typeof evidence;

export function Tpp20Topic10OrthogonalityEvidenceLab() {
  const [id, setId] = useState<EvidenceId>("before");
  const item = evidence[id];
  return (
    <OrthogonalFrame
      eyebrow="Topic 10 专属复核 · 移除隐藏通道"
      title="把隐藏读取切回声明接口，再重放同一订单"
      description="故障与修复都固定同一笔订单和结算变化。重置回到故障状态，要求先能观察到越界，再用显式契约证明变化已被隔离。"
      kind="orthogonality-replay-evidence"
      reset={() => setId("before")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(evidence) as EvidenceId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {evidence[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {item.rows.map(([consumer, source, valid]) => (
            <div
              key={consumer}
              className="rounded-control border bg-bg p-4"
              style={{ borderColor: valid ? c.success : c.danger }}
            >
              <span className="text-xs font-semibold text-secondary">
                {consumer} 读取
              </span>
              <strong
                className="mt-2 block font-mono text-sm"
                style={{ color: valid ? c.success : c.danger }}
              >
                {source}
              </strong>
              <span
                className="mt-2 block text-xs"
                style={{ color: valid ? c.success : c.danger }}
              >
                {valid ? "声明依赖，可独立验证" : "隐藏依赖，越过变化边界"}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: item.color }}
        >
          {item.result}
        </p>
      </div>
    </OrthogonalFrame>
  );
}
