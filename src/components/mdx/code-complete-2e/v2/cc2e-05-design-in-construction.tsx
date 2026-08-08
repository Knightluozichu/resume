"use client";

import { useMemo, useState } from "react";

const COLORS = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const OFFICIAL_NODES = [
  "需求场景",
  "抽象边界",
  "信息隐藏",
  "松散耦合",
  "试验性原型",
  "记录设计成果",
] as const;

type DesignMode = "shared" | "owned";

const MODE_COPY: Record<
  DesignMode,
  { label: string; hint: string; owner: string; result: string }
> = {
  shared: {
    label: "共享状态",
    hint: "多个职责直接读写同一份订单状态",
    owner: "没有清晰的状态所有者",
    result: "一个需求变化会穿透多个模块，先出现耦合扩散。",
  },
  owned: {
    label: "封装状态",
    hint: "订单对象拥有状态，其他模块通过接口协作",
    owner: "Order 负责不变量与状态迁移",
    result: "变化先停在一个边界，再由接口决定是否传播。",
  },
};

type NodeStatus = "stable" | "affected" | "blocked";

function nodeColor(status: NodeStatus) {
  if (status === "blocked") return COLORS.danger;
  if (status === "affected") return COLORS.warning;
  return COLORS.success;
}

/**
 * 第 5 章专属机制实验：把“设计选择”与可观察的耦合扩散连接起来。
 *
 * 读者可以在共享状态与封装状态之间切换，再注入一次需求变化/边界故障。
 * SVG 展示同一输入如何沿职责边界传播，下面的状态文字则给出首个偏离与
 * 下一步动作。它不是合成评分器：每个状态都由当前设计模式和故障开关直接决定。
 */
export function Cc2e05DesignInConstructionMechanismLab() {
  const [mode, setMode] = useState<DesignMode>("owned");
  const [faultInjected, setFaultInjected] = useState(false);

  const copy = MODE_COPY[mode];
  const nodes = useMemo(() => {
    const base: Array<{
      id: string;
      label: string;
      detail: string;
      status: NodeStatus;
    }> = [
      {
        id: "order",
        label: "Order",
        detail: "状态与不变量",
        status: mode === "owned" && !faultInjected ? "stable" : "affected",
      },
      {
        id: "pricing",
        label: "Pricing",
        detail: "价格规则",
        status: mode === "shared" || faultInjected ? "affected" : "stable",
      },
      {
        id: "payment",
        label: "Payment",
        detail: "支付边界",
        status: mode === "shared" || faultInjected ? "affected" : "stable",
      },
    ];
    if (faultInjected) base[0].status = "blocked";
    return base;
  }, [faultInjected, mode]);

  const affectedCount = nodes.filter((node) => node.status !== "stable").length;
  const summary = faultInjected
    ? "边界故障已注入：先停止扩大实现，记录哪个不变量失效，再决定修合同还是改结构。"
    : mode === "shared"
      ? "共享状态让变化穿透三个职责；先画出所有读写者，再选择一个真正的所有者。"
      : "封装状态把变化收敛到 Order；只有接口合同变化时，其他边界才需要重新评估。";

  const reset = () => {
    setMode("owned");
    setFaultInjected(false);
  };

  return (
    <section
      aria-label="设计边界与耦合扩散实验"
      data-visual-kind="cc2e-05-design-in-construction-mechanism"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第 5 章 · 设计启发式的可观察后果
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            改变一个设计前提，观察耦合怎样传播
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：当订单状态由多个模块共享时，一次状态变化会影响几个边界？再注入一个不变量故障。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置设计边界实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="grid min-w-0 gap-0 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-border p-4 lg:border-r lg:border-b-0 sm:p-6">
          <p className="text-xs font-medium text-secondary">状态所有权</p>
          <div
            className="mt-3 grid gap-2"
            role="group"
            aria-label="选择状态所有权"
          >
            {(Object.keys(MODE_COPY) as DesignMode[]).map((value) => {
              const selected = mode === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setMode(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                    selected
                      ? "border-accent bg-bg font-semibold text-primary"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  <span className="block">{MODE_COPY[value].label}</span>
                  <span className="mt-1 block text-xs font-normal text-secondary">
                    {MODE_COPY[value].hint}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className={`mt-5 min-h-11 w-full rounded-control border px-3 py-2 text-left text-sm transition-colors ${
              faultInjected
                ? "border-danger bg-bg font-semibold text-primary"
                : "border-border text-secondary hover:border-danger hover:text-primary"
            }`}
          >
            {faultInjected ? "移除不变量故障" : "注入不变量故障"}
          </button>

          <div className="mt-5 rounded-control border border-border bg-bg p-3">
            <p className="text-xs font-semibold text-accent">当前所有者</p>
            <p className="mt-1 text-sm leading-relaxed text-primary">
              {copy.owner}
            </p>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-6">
          <div
            className="rounded-control border border-border bg-bg p-4"
            role="status"
          >
            <p className="text-xs font-medium text-accent">
              受影响边界：{affectedCount} / 3 · {copy.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {summary}
            </p>
          </div>

          <svg
            viewBox="0 0 760 330"
            role="img"
            aria-label={`设计边界实验：${copy.label}，${faultInjected ? "已注入不变量故障" : "未注入故障"}，受影响边界${affectedCount}个。`}
            className="mt-5 block h-auto w-full"
          >
            <text
              x="34"
              y="30"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              输入：需求变化
            </text>
            <text
              x="726"
              y="30"
              textAnchor="end"
              fontSize="13"
              fill={COLORS.secondary}
            >
              输出：可隔离的修改范围
            </text>

            <rect
              x="34"
              y="112"
              width="132"
              height="72"
              rx="10"
              fill={COLORS.bg}
              stroke={COLORS.accent}
              strokeWidth="2"
            />
            <text
              x="100"
              y="142"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              变更请求
            </text>
            <text
              x="100"
              y="166"
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.secondary}
            >
              “订单状态新增待审核”
            </text>

            <path
              d="M166 148H238"
              fill="none"
              stroke={COLORS.accent}
              strokeWidth="3"
              markerEnd="url(#cc2e05-arrow)"
            />
            <text
              x="202"
              y="132"
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.secondary}
            >
              接口合同
            </text>

            <rect
              x="238"
              y="80"
              width="170"
              height="136"
              rx="12"
              fill={COLORS.elevated}
              stroke={faultInjected ? COLORS.danger : COLORS.accent}
              strokeWidth="3"
            />
            <text
              x="323"
              y="112"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {mode === "owned" ? "Order 边界" : "共享记录"}
            </text>
            <text
              x="323"
              y="140"
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.secondary}
            >
              {mode === "owned"
                ? "状态所有权 + 不变量"
                : "Order / Pricing / Payment 共读写"}
            </text>
            <text
              x="323"
              y="170"
              textAnchor="middle"
              fontSize="12"
              fill={faultInjected ? COLORS.danger : COLORS.success}
            >
              {faultInjected
                ? "× 不变量失效"
                : mode === "owned"
                  ? "✓ 可由接口复核"
                  : "! 传播路径不清"}
            </text>
            {faultInjected ? (
              <text
                x="323"
                y="196"
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.danger}
              >
                先记录首个偏离
              </text>
            ) : null}

            {nodes.map((node, index) => {
              const x = 480;
              const y = 52 + index * 86;
              const color = nodeColor(node.status);
              return (
                <g key={node.id}>
                  <path
                    d={`M408 ${148}H${x}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={node.status === "stable" ? 2 : 3}
                    strokeDasharray={
                      mode === "shared" && node.status !== "stable"
                        ? "6 5"
                        : undefined
                    }
                    markerEnd="url(#cc2e05-arrow)"
                  />
                  <rect
                    x={x}
                    y={y}
                    width="220"
                    height="62"
                    rx="10"
                    fill={COLORS.bg}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <text
                    x={x + 16}
                    y={y + 25}
                    fontSize="14"
                    fontWeight="700"
                    fill={COLORS.primary}
                  >
                    {node.label}
                  </text>
                  <text
                    x={x + 16}
                    y={y + 46}
                    fontSize="12"
                    fill={COLORS.secondary}
                  >
                    {node.detail} ·{" "}
                    {node.status === "stable"
                      ? "稳定"
                      : node.status === "blocked"
                        ? "阻断"
                        : "需复核"}
                  </text>
                </g>
              );
            })}

            <defs>
              <marker
                id="cc2e05-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
              >
                <path d="M0 0L8 4L0 8Z" fill={COLORS.accent} />
              </marker>
            </defs>
            <text x="34" y="286" fontSize="12" fill={COLORS.secondary}>
              {mode === "shared"
                ? "共享状态：修改沿读写关系扩散"
                : "封装状态：修改在所有权边界前收敛"}
            </text>
            <text
              x="726"
              y="286"
              textAnchor="end"
              fontSize="12"
              fill={faultInjected ? COLORS.danger : COLORS.success}
            >
              {faultInjected
                ? "停止：修复合同或回退结构"
                : "继续：用测试和接口验收"}
            </text>
          </svg>

          <div
            className="mt-4 grid gap-3 sm:grid-cols-3"
            aria-label="实验观察点"
          >
            {OFFICIAL_NODES.map((node, index) => (
              <div
                key={node}
                className="rounded-control border border-border bg-bg p-3"
              >
                <p className="text-xs font-semibold text-accent">
                  {index + 1}. {node}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-secondary">
                  {index === 0
                    ? "写清楚输入与验收例"
                    : index === 1
                      ? "声明谁拥有状态"
                      : index === 2
                        ? "把实现细节留在边界内"
                        : index === 3
                          ? "减少不必要的传播"
                          : index === 4
                            ? "先做小实验验证高风险决定"
                            : "记录决定、证据与重审条件"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 目录节点证据图：把本章的 41 个目录节点压缩成六个可复核产物。 */
export function Cc2e05DesignInConstructionEvidenceMap() {
  const artifacts = [
    { label: "需求场景", detail: "输入、输出、边界", color: COLORS.accent },
    { label: "抽象边界", detail: "职责与所有权", color: COLORS.accent },
    { label: "启发式", detail: "候选结构与反例", color: COLORS.warning },
    { label: "小型原型", detail: "最小可运行反馈", color: COLORS.warning },
    { label: "合作设计", detail: "第二位读者复核", color: COLORS.success },
    { label: "设计记录", detail: "决定与重审条件", color: COLORS.success },
  ];

  return (
    <figure
      data-visual-kind="cc2e-05-design-in-construction-evidence-map"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6"
    >
      <div className="mb-4">
        <p className="text-xs font-medium text-accent">章节专属证据图</p>
        <h3 className="mt-1 text-lg font-semibold text-primary">
          从设计启发到可复核产物
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          目录节点不是背诵清单；每个节点都要落在一个能被实现、测试或同伴复核的产物上。
        </p>
      </div>
      <svg
        viewBox="0 0 760 250"
        role="img"
        aria-label="六个设计证据产物从需求场景经过抽象边界、启发式和小型原型，最终形成合作复核与设计记录。"
        className="block h-auto w-full"
      >
        <path
          d="M70 120H690"
          stroke={COLORS.border}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {artifacts.map((artifact, index) => {
          const x = 70 + index * 124;
          return (
            <g key={artifact.label}>
              <circle
                cx={x}
                cy="120"
                r="29"
                fill={COLORS.bg}
                stroke={artifact.color}
                strokeWidth="3"
              />
              <text
                x={x}
                y="116"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={artifact.color}
              >
                {index + 1}
              </text>
              <text
                x={x}
                y="162"
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.primary}
              >
                {artifact.label}
              </text>
              {index < artifacts.length - 1 ? (
                <path
                  d={`M${x + 34} 120h70`}
                  stroke={COLORS.accent}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              ) : null}
            </g>
          );
        })}
        <text
          x="70"
          y="48"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.primary}
        >
          先提出可检验问题
        </text>
        <text
          x="690"
          y="214"
          textAnchor="end"
          fontSize="13"
          fill={COLORS.success}
        >
          再保留可重放的决定
        </text>
        <path d="M70 62v28M690 180v28" stroke={COLORS.border} strokeWidth="2" />
      </svg>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {artifacts.map((artifact, index) => (
          <div
            key={artifact.label}
            className="rounded-control border border-border bg-bg p-3"
          >
            <p className="text-xs font-semibold text-primary">
              {index + 1}. {artifact.label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-secondary">
              {artifact.detail}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-secondary">
        设计的完成标准不是“看起来整齐”，而是下一位读者能根据记录重放选择、边界与失败处理。
      </figcaption>
    </figure>
  );
}
