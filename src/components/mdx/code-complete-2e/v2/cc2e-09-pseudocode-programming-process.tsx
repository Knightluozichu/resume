"use client";

import { useMemo, useState } from "react";

const COLORS = {
  bg: "var(--bg)",
  surface: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const OFFICIAL_NODES = [
  "第9章 伪代码编程过程",
  "9.1 创建类和子程序的步骤概述",
  "创建一个类的步骤",
  "创建子程序的步骤",
  "9.2 伪代码",
  "9.3 通过伪代码编程过程创建子程序",
  "设计子程序",
  "编写子程序",
  "检查代码",
  "收尾工作",
  "根据需要重复上述步骤",
  "9.4 伪代码编程过程之外的其他方案",
  "关键点",
] as const;

const STAGES = [
  {
    id: "responsibility",
    label: "职责声明",
    evidence: "对象、输入、结果",
  },
  {
    id: "pseudocode",
    label: "伪代码设计",
    evidence: "问题域步骤",
  },
  {
    id: "translation",
    label: "实现翻译",
    evidence: "一层一层落地",
  },
  {
    id: "review",
    label: "代码检查",
    evidence: "合同与边界",
  },
  {
    id: "wrapup",
    label: "收尾复核",
    evidence: "命名、测试、重放",
  },
] as const;

type StageId = (typeof STAGES)[number]["id"];
type Mode = "class" | "routine";
type NodeStatus = "idle" | "active" | "complete" | "blocked";

const MODE_COPY: Record<
  Mode,
  { label: string; subject: string; contract: string; example: string }
> = {
  class: {
    label: "创建一个类",
    subject: "对象不变量与公开操作",
    contract: "构造后状态合法，操作只能通过边界改变状态",
    example: "Order：状态、容量和允许的迁移",
  },
  routine: {
    label: "创建子程序",
    subject: "前置条件与后置条件",
    contract: "调用前输入可检查，返回后结果与副作用可复核",
    example: "applyDiscount：输入订单，返回折扣结果",
  },
};

const STAGE_ID_INDEX: Record<StageId, number> = {
  responsibility: 0,
  pseudocode: 1,
  translation: 2,
  review: 3,
  wrapup: 4,
};

function statusColor(status: NodeStatus) {
  if (status === "blocked") return COLORS.danger;
  if (status === "active") return COLORS.accent;
  if (status === "complete") return COLORS.success;
  return COLORS.border;
}

function statusLabel(status: NodeStatus) {
  if (status === "blocked") return "首个偏离";
  if (status === "active") return "当前检查";
  if (status === "complete") return "已通过";
  return "待检查";
}

/**
 * 第 9 章专属机制实验：观察伪代码如何把问题域意图逐层收敛为可检查实现。
 *
 * 模式切换改变被建模的对象，阶段按钮改变观察窗口，故障开关把语法细节提前
 * 混入伪代码。每个状态都由这些受控输入直接推导，重置后回到确定的 routine 基线。
 */
export function Cc2e09PseudocodeProgrammingProcessMechanismLab({
  focus = "responsibility",
}: {
  focus?: StageId;
}) {
  const initialIndex = STAGE_ID_INDEX[focus] ?? 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [mode, setMode] = useState<Mode>("routine");
  const [faultInjected, setFaultInjected] = useState(false);
  const active = STAGES[activeIndex] ?? STAGES[0];
  const copy = MODE_COPY[mode];

  const statuses = useMemo<NodeStatus[]>(() => {
    return STAGES.map((_, index) => {
      if (faultInjected && index >= 2) return "blocked";
      if (index < activeIndex) return "complete";
      if (index === activeIndex) return "active";
      return "idle";
    });
  }, [activeIndex, faultInjected]);

  const layers = [
    copy.example,
    mode === "class"
      ? "若订单允许折扣，就记录折扣并保持总额不为负"
      : "若订单满足条件，就计算折扣并返回新的金额",
    faultInjected
      ? "if (x) { ... }：语法先行，问题域条件被藏起来"
      : mode === "class"
        ? "if eligible then apply discount and preserve invariant"
        : "if eligible then calculate discount and return result",
  ];

  const reset = () => {
    setActiveIndex(initialIndex);
    setMode("routine");
    setFaultInjected(false);
  };

  const markerId = `cc2e09-arrow-${focus}`;

  return (
    <section
      aria-label="第9章伪代码编程过程专属因果实验"
      data-visual-kind="cc2e-09-pseudocode-programming-process"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent">
            第 9 章 · 从意图收敛到实现
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary">
            伪代码编程过程：先守住职责，再翻译语法
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            先预测故障会在哪个节点出现，再切换模式或注入故障；图中每个节点都显示它应留下的证据。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置第9章伪代码编程过程实验"
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="grid min-w-0 gap-0 lg:grid-cols-[230px_1fr]">
        <aside className="border-b border-border p-4 lg:border-r lg:border-b-0 sm:p-5">
          <p className="text-xs font-medium text-secondary">先决定建模对象</p>
          <div
            className="mt-3 grid gap-2"
            role="group"
            aria-label="选择建模对象"
          >
            {(Object.keys(MODE_COPY) as Mode[]).map((value) => {
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
                  {MODE_COPY[value].label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className={`mt-4 min-h-11 w-full rounded-control border px-3 py-2 text-left text-sm transition-colors ${
              faultInjected
                ? "border-danger bg-bg font-semibold text-primary"
                : "border-border text-secondary hover:border-danger hover:text-primary"
            }`}
          >
            {faultInjected ? "移除语法提前故障" : "注入语法提前故障"}
          </button>

          <div className="mt-4 rounded-control border border-border bg-bg p-3">
            <p className="text-xs font-semibold text-accent">当前合同</p>
            <p className="mt-1 text-sm leading-relaxed text-primary">
              {copy.contract}
            </p>
          </div>
        </aside>

        <div className="min-w-0 p-4 sm:p-5">
          <div
            className="grid min-w-0 gap-2 sm:grid-cols-5"
            role="group"
            aria-label="选择观察阶段"
          >
            {STAGES.map((stage, index) => {
              const selected = activeIndex === index;
              return (
                <button
                  key={stage.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveIndex(index)}
                  className={`min-h-11 min-w-0 rounded-control border px-2 py-2 text-left text-xs transition-colors ${
                    selected
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  <span className="block font-semibold">{stage.label}</span>
                  <span className="mt-1 block truncate">{stage.evidence}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-bg p-3">
            <svg
              viewBox="0 0 860 520"
              role="img"
              aria-label={`伪代码编程过程五节点机制图。当前阶段是${active.label}。${faultInjected ? "已注入语法提前故障，翻译之前的节点被阻断。" : "从职责到收尾的合同闭合。"}`}
              className="mx-auto block h-auto w-full max-w-[860px]"
            >
              <defs>
                <marker
                  id={markerId}
                  markerWidth="9"
                  markerHeight="9"
                  refX="7"
                  refY="3.5"
                  orient="auto"
                >
                  <path d="M0,0 L7,3.5 L0,7 Z" fill={COLORS.accent} />
                </marker>
              </defs>
              <text
                x="30"
                y="34"
                fontSize="19"
                fontWeight="700"
                fill={COLORS.primary}
              >
                {mode === "class" ? "创建类" : "创建子程序"}：问题域 → 伪代码 →
                实现 → 证据
              </text>
              <text x="30" y="59" fontSize="12" fill={COLORS.secondary}>
                每一次细化只引入一层实现细节，故障先在它违反的合同节点停住
              </text>

              <line
                x1="93"
                y1="163"
                x2="767"
                y2="163"
                stroke={COLORS.border}
                strokeWidth="3"
              />
              {STAGES.map((stage, index) => {
                const x = 93 + index * 168;
                const status = statuses[index];
                const color = statusColor(status);
                return (
                  <g key={stage.id}>
                    {index < STAGES.length - 1 ? (
                      <line
                        x1={x + 22}
                        y1="163"
                        x2={x + 143}
                        y2="163"
                        stroke={COLORS.accent}
                        strokeWidth="2"
                        markerEnd={`url(#${markerId})`}
                      />
                    ) : null}
                    <circle
                      cx={x}
                      cy="163"
                      r={status === "active" ? 21 : 16}
                      fill={status === "idle" ? COLORS.bg : color}
                      stroke={color}
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y="168"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill={status === "idle" ? COLORS.primary : COLORS.bg}
                    >
                      {index + 1}
                    </text>
                    <text
                      x={x}
                      y="207"
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="700"
                      fill={COLORS.primary}
                    >
                      {stage.label}
                    </text>
                    <text
                      x={x}
                      y="229"
                      textAnchor="middle"
                      fontSize="11"
                      fill={COLORS.secondary}
                    >
                      {stage.evidence}
                    </text>
                    <text
                      x={x}
                      y="253"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill={color}
                    >
                      {statusLabel(status)}
                    </text>
                  </g>
                );
              })}

              <rect
                x="30"
                y="286"
                width="800"
                height="88"
                rx="12"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="1.5"
              />
              <text
                x="52"
                y="317"
                fontSize="14"
                fontWeight="700"
                fill={COLORS.primary}
              >
                当前观察：{active.label}
              </text>
              <text x="52" y="342" fontSize="12" fill={COLORS.secondary}>
                应留下：{active.evidence}；建模对象：{copy.subject}
              </text>
              <text
                x="52"
                y="363"
                fontSize="11"
                fill={faultInjected ? COLORS.danger : COLORS.success}
              >
                {faultInjected
                  ? "首个偏离：伪代码已经被语言语法绑架，无法先检查问题域条件"
                  : "证据闭合：实现细节仍能回指到可读的职责和合同"}
              </text>

              {layers.map((layer, index) => {
                const y = 400 + index * 31;
                const layerColor =
                  index === 2 && faultInjected
                    ? COLORS.danger
                    : index === 2
                      ? COLORS.accent
                      : COLORS.secondary;
                return (
                  <g key={`layer-${index}`}>
                    <rect
                      x="30"
                      y={y}
                      width="800"
                      height="23"
                      rx="6"
                      fill={COLORS.bg}
                      stroke={index === 2 ? layerColor : COLORS.border}
                      strokeWidth="1"
                    />
                    <text
                      x="43"
                      y={y + 16}
                      fontSize="11"
                      fontFamily="monospace"
                      fill={layerColor}
                    >
                      {index + 1}. {layer}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
            <div
              role="status"
              className={`rounded-control border px-3 py-3 text-sm ${faultInjected ? "border-danger/50 text-danger" : "border-success/50 text-success"}`}
            >
              {faultInjected
                ? "拒绝继续：把实现语法退回下一层，先补齐职责和问题域步骤。"
                : `可以交接：${active.label}的输入、产物与检查动作已经说清。`}
            </div>
            <span className="rounded-control border border-border bg-surface px-3 py-3 text-xs text-secondary">
              目录节点 {OFFICIAL_NODES.length}/13
            </span>
          </div>

          <details className="mt-4 rounded-control border border-border bg-surface p-3 text-sm text-secondary">
            <summary className="cursor-pointer font-semibold text-primary">
              展开本章 13 个目录核对点
            </summary>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {OFFICIAL_NODES.map((node) => (
                <li key={node}>{node}</li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
