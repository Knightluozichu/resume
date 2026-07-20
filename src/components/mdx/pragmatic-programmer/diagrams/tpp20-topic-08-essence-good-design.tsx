"use client";

import { useState, type ReactNode } from "react";

const p = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  bg: "var(--bg)",
  border: "var(--border)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function DesignFrame({
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
      data-tpp20-unit="tpp20-topic-08-essence-good-design"
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

const designs = {
  duplicated: {
    label: "设计 A：两个入口各自判断税率",
    nodes: ["结算服务", "退款服务", "客服轨迹"],
    impact: [true, true, true],
    change: "欧洲例外要改两段条件和一段解释文案",
    firstRisk: "两个入口可能只改一处，金额与解释分叉",
    recovery: "逐个恢复旧条件，难以确认遗漏",
    color: p.danger,
  },
  bounded: {
    label: "设计 B：唯一 TaxPolicy 边界",
    nodes: ["TaxPolicy", "结算服务", "退款服务", "客服轨迹"],
    impact: [true, false, false, true],
    change: "在 TaxPolicy 加欧洲规则；轨迹读取同一规则名",
    firstRisk: "规则边界和依赖显式，改动不扩散到流程",
    recovery: "切回规则版本 v41，所有入口同步恢复",
    color: p.success,
  },
} as const;
type DesignId = keyof typeof designs;

export function Tpp20Topic08EssenceGoodDesignSystemLab() {
  const [designId, setDesignId] = useState<DesignId>("duplicated");
  const design = designs[designId];
  return (
    <DesignFrame
      eyebrow="第 8 章专属解剖图 · 变更触达范围"
      title="同一个欧洲税率需求，比较它实际会碰到哪些运行对象"
      description="选择两种真实结构。这里不把“好设计”压成分数；它展示同一变化如何在服务、规则边界和客服解释之间传播，及第一处可观察风险。"
      kind="design-change-surface"
      reset={() => setDesignId("duplicated")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(designs) as DesignId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setDesignId(id)}
              aria-pressed={designId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${designId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {designs[id].label}
              </span>
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 940 330"
          role="img"
          aria-label={`${design.label}面对欧洲税率例外时的影响图`}
          className="mt-4 hidden h-auto w-full md:block"
        >
          <defs>
            <marker
              id="design-surface-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={design.color} />
            </marker>
          </defs>
          <text x="30" y="31" fontSize="13" fontWeight="700" fill={p.text}>
            变更假设：欧洲退款需使用例外税率。高亮的是必须被修改或重新验证的真实对象。
          </text>
          {design.nodes.map((node, index) => {
            const x = 44 + index * 215;
            const impacted = design.impact[index];
            return (
              <g key={node}>
                <rect
                  x={x}
                  y="92"
                  width="170"
                  height="96"
                  rx="14"
                  fill={impacted ? design.color : p.bg}
                  fillOpacity={impacted ? 0.12 : 1}
                  stroke={impacted ? design.color : p.border}
                  strokeWidth={impacted ? 2.5 : 1.5}
                />
                <text
                  x={x + 85}
                  y="132"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={p.text}
                >
                  {node}
                </text>
                <text
                  x={x + 85}
                  y="160"
                  textAnchor="middle"
                  fontSize="11.5"
                  fill={impacted ? design.color : p.muted}
                >
                  {impacted ? "必须改动 / 重验" : "只接收同一规则输出"}
                </text>
                {index < design.nodes.length - 1 && (
                  <path
                    d={`M${x + 170} 140 H${x + 202}`}
                    stroke={design.color}
                    strokeWidth="3"
                    markerEnd="url(#design-surface-arrow)"
                  />
                )}
              </g>
            );
          })}
          <rect
            x="44"
            y="237"
            width="850"
            height="55"
            rx="12"
            fill={p.bg}
            stroke={p.border}
          />
          <text x="66" y="260" fontSize="12" fontWeight="700" fill={p.text}>
            最小修改
          </text>
          <text x="66" y="281" fontSize="12" fill={design.color}>
            {design.change}
          </text>
          <text x="517" y="260" fontSize="12" fontWeight="700" fill={p.text}>
            第一处风险
          </text>
          <text x="517" y="281" fontSize="12" fill={p.muted}>
            {design.firstRisk}
          </text>
        </svg>
        <div className="mt-4 grid gap-2 md:hidden">
          {design.nodes.map((node, index) => (
            <div
              key={node}
              className={`rounded-control border p-3 text-sm ${design.impact[index] ? "border-accent bg-accent/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {node}：
              {design.impact[index] ? "必须改动 / 重验" : "只接收同一规则输出"}
            </div>
          ))}
          <p
            className="rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
            style={{ borderColor: design.color }}
          >
            <strong>最小修改：</strong>
            {design.change}
            <br />
            <strong>第一处风险：</strong>
            {design.firstRisk}
          </p>
        </div>
      </div>
    </DesignFrame>
  );
}

const feedbackPaths = {
  slow: {
    label: "反馈慢：先合并、再等生产投诉",
    stages: [
      "改退款条件",
      "合并并部署",
      "客服发现两个金额",
      "追查是哪一处漏改",
    ],
    detail: "问题出现时，原始改动已和其他发布混在一起。",
    color: p.danger,
  },
  fast: {
    label: "反馈快：一笔沙盒订单先走全链",
    stages: [
      "改 TaxPolicy",
      "重放欧洲沙盒订单",
      "比较金额与规则名",
      "确认后再小范围发布",
    ],
    detail: "规则输出和客服解释在同一笔输入上立即对齐。",
    color: p.success,
  },
  partial: {
    label: "反馈残缺：只做单元测试",
    stages: [
      "改 TaxPolicy",
      "规则单测通过",
      "客服轨迹没有更新",
      "集成时才发现缺口",
    ],
    detail: "局部验证通过并不证明下游能解释该规则。",
    color: p.warning,
  },
} as const;
type FeedbackId = keyof typeof feedbackPaths;

export function Tpp20Topic08EssenceGoodDesignFeedbackLab() {
  const [pathId, setPathId] = useState<FeedbackId>("fast");
  const path = feedbackPaths[pathId];
  return (
    <DesignFrame
      eyebrow="第 8 章专属实验 · 反馈延迟"
      title="固定同一项规则变化，只改变第一条可获得的反馈路径"
      description="选择反馈路径。设计的优劣体现在错误距改动有多远、能否用同一输入定位，以及回退前是否已经混入其他变化。"
      kind="design-feedback-timeline"
      reset={() => setPathId("fast")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(feedbackPaths) as FeedbackId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPathId(id)}
              aria-pressed={pathId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${pathId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {feedbackPaths[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {path.stages.map((stage, index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3 text-sm text-primary"
              style={{ borderColor: path.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: path.color }}
              >
                {index + 1}
              </span>
              <span className="mt-1 block font-semibold">{stage}</span>
              {index < path.stages.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-xl md:block"
                  style={{ color: path.color }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm text-primary"
          style={{ borderColor: path.color }}
        >
          {path.detail}
        </p>
      </div>
    </DesignFrame>
  );
}

const recoveries = {
  clean: {
    label: "基线：规则版本可切换",
    rows: [
      ["改动", "TaxPolicy v42", true],
      ["验证", "欧洲沙盒订单", true],
      ["恢复", "切回 v41", true],
      ["复核", "结算 / 退款 / 轨迹同值", true],
    ],
    result: "恢复成本有界，且恢复后能证明三个入口一致",
    color: p.success,
  },
  tangled: {
    label: "故障：散落条件已合并",
    rows: [
      ["改动", "两处条件 + 话术", false],
      ["验证", "只看了退款单测", false],
      ["恢复", "手动找回每一处", false],
      ["复核", "无法知道结算是否仍正确", false],
    ],
    result: "停止发布：先重建影响图，不能用补丁掩盖耦合",
    color: p.danger,
  },
  repaired: {
    label: "恢复：收回唯一规则边界",
    rows: [
      ["改动", "TaxPolicy v42", true],
      ["验证", "同一笔欧洲订单", true],
      ["恢复", "切回 v41", true],
      ["复核", "三个入口读取同一规则名", true],
    ],
    result: "用原始输入重放，记录实际回退步骤和耗时",
    color: p.accent,
  },
} as const;
type RecoveryId = keyof typeof recoveries;

export function Tpp20Topic08EssenceGoodDesignEvidenceLab() {
  const [recoveryId, setRecoveryId] = useState<RecoveryId>("clean");
  const model = recoveries[recoveryId];
  return (
    <DesignFrame
      eyebrow="第 8 章专属验收 · 恢复难度"
      title="不要预估一个抽象“可维护性”：保存这次变化真正需要怎样回退"
      description="切换三份变更记录。恢复不是最后的装饰动作；它反过来检验影响图是否完整、验证是否覆盖真实入口。"
      kind="design-recovery-ledger"
      reset={() => setRecoveryId("clean")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(recoveries) as RecoveryId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setRecoveryId(id)}
              aria-pressed={recoveryId === id}
              className={`min-h-11 rounded-control border p-3 text-left ${recoveryId === id ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="text-sm font-semibold text-primary">
                {recoveries[id].label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_310px]">
          <div className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-semibold text-accent">
              欧洲税率例外 · 可恢复变更记录
            </p>
            <div className="mt-3 grid gap-2">
              {model.rows.map(([label, value, ok]) => (
                <div
                  key={label}
                  className={`rounded-control border p-3 text-sm ${ok ? "border-success bg-success/10 text-primary" : "border-danger bg-danger/10 text-primary"}`}
                >
                  <strong>{label}</strong>
                  <span
                    className="mt-1 block"
                    style={{ color: ok ? p.success : p.danger }}
                  >
                    {ok ? "✓ " : "× "}
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <aside
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: model.color }}
          >
            <p className="text-xs font-semibold" style={{ color: model.color }}>
              验收结论
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {model.result}
            </p>
            <p className="mt-3 text-xs leading-5 text-secondary">
              保存版本、输入、实际回退步骤和复核输出；没有这些，所谓“容易改变”不能被独立验证。
            </p>
          </aside>
        </div>
      </div>
    </DesignFrame>
  );
}
