"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "postpone variable definitions",
  "constructor destructor cost",
  "loop variable",
  "assignment cost",
  "direct initialization",
  "minimal scope",
] as const;

type VisualCell = readonly [label: string, operation: string, explanation: string];

function VisualGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly VisualCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`${ariaLabel}：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([label, operation, explanation], index) => (
            <section
              key={label}
              className="min-h-36 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {label}
              </strong>
              <code className="mt-3 block break-words text-xs text-accent">
                {operation}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {explanation}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const definitionCells: readonly VisualCell[] = [
  [
    "失败路径",
    "guard → return",
    "尚未需要结果对象时，不支付 constructor/destructor cost。",
  ],
  [
    "提前定义",
    "default ctor → assign",
    "default-then-assign 让对象先处于 placeholder state，再替换它。",
  ],
  [
    "直接初始化",
    "guard → direct init",
    "参数齐备后一次建立 meaningful initial state，减少无效生命周期。",
  ],
  [
    "首次使用",
    "define at first use",
    "postpone variable definitions 仍受正确性和资源保护边界约束。",
  ],
  [
    "析构边界",
    "scope end → dtor",
    "只要对象成功构造，所有 return、throw 路径都要负责清理。",
  ],
  [
    "验收轨迹",
    "ctor / assign / dtor",
    "用 instrumented type 对照控制流，而不是凭直觉猜成本。",
  ],
];

const scopeCells: readonly VisualCell[] = [
  [
    "preconstruction guard",
    "validate → construct",
    "把不依赖对象的失败检查放在昂贵构造之前。",
  ],
  [
    "branch-local state",
    "if { value; use; }",
    "只让真正执行的分支拥有局部状态，缩小 accidental reuse 窗口。",
  ],
  [
    "protective RAII guard",
    "guard → first shared access",
    "延后 guard 不能越过它必须保护的首个读取或写入。",
  ],
  [
    "meaningful initial state",
    "Config{source}",
    "禁止用空对象掩盖“尚未有值”与“值为空”的领域区别。",
  ],
  [
    "branch-produced value",
    "if → return complete value",
    "每个分支提供完整结果，最终对象只定义和初始化一次。",
  ],
  [
    "minimal scope",
    "last use → scope end",
    "作用域越短，读者需要追踪的可变状态越少。",
  ],
];

const loopCells: readonly VisualCell[] = [
  [
    "cross-iteration reuse",
    "1 ctor + n assign + 1 dtor",
    "可能复用 capacity，但 identity 与未清理成员跨迭代存活。",
  ],
  [
    "per-iteration construction",
    "n ctor + n dtor",
    "每轮独立对象，天然提供 iteration isolation 和最小 scope。",
  ],
  [
    "assignment cost",
    "release old → replace",
    "assignment 可能清理旧资源、维护 identity，并不必然便宜。",
  ],
  [
    "loop variable",
    "Widget widget = make(i)",
    "默认先选语义清晰的循环内定义，再用 benchmark 证明复用收益。",
  ],
  [
    "state leakage",
    "reset? → next iteration",
    "failure、diagnostics 或 cache 残留会让结果依赖输入顺序。",
  ],
  [
    "evidence",
    "time + alloc + sequence",
    "同时记录耗时、分配和失败后下一轮，才足以支持选型。",
  ],
];

export function EcppVariableDefinitionCostMap() {
  return (
    <VisualGrid
      ariaLabel="变量定义与对象生命周期成本图"
      caption="延后定义先消除失败路径上的无用生命周期，再用 direct initialization 消除 default-then-assign。"
      cells={definitionCells}
    />
  );
}

export function EcppVariableScopeDecisionMap() {
  return (
    <VisualGrid
      ariaLabel="变量作用域、分支结果与 RAII 保护边界决策图"
      caption="最晚定义点不是越晚越好：它必须同时满足初值、首次使用和资源/并发保护的不变量。"
      cells={scopeCells}
    />
  );
}

export function EcppLoopLifecycleMap() {
  return (
    <VisualGrid
      ariaLabel="循环变量构造、析构、赋值与跨迭代状态成本对照图"
      caption="循环外复用和循环内构造是两种成本模型；assignment cost、reset contract 与状态隔离都要进入实验。"
      cells={loopCells}
    />
  );
}

const SCENARIOS = [
  {
    label: "失败输入",
    title: "先 guard，再创建 encrypted",
    trace: "invalid → throw → ctor=0 → dtor=0",
    decision: "延后定义消除了 unused lifetime path。",
  },
  {
    label: "成功输入",
    title: "验证后 direct initialization",
    trace: "valid → copy ctor=1 → encrypt → dtor=1",
    decision: "meaningful initial state 从生命周期第一刻成立。",
  },
  {
    label: "循环热点",
    title: "先测 assignment cost，再决定复用",
    trace: "n iterations → ctor/dtor 或 assign → sequence check",
    decision: "性能收益必须与 iteration isolation 的风险一起审查。",
  },
] as const;

export function EcppItem26LifetimeLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SCENARIOS[activeIndex];
  const reset = () => setActiveIndex(0);

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="ecpp-item-26-lifetime-lab"
      aria-label={`Effective C++ Item 26 variable lifetime 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            Item 26 生命周期证据实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-secondary">
            先预测每条路径的 constructor、assignment 和 destructor，再切换失败、成功与循环样本。
          </p>
        </div>
        <button
          type="button"
          className="min-h-11 rounded-button border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-accent"
          onClick={reset}
          aria-label="重置 Item 26 生命周期实验"
        >
          重置实验
        </button>
      </header>
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="Item 26 生命周期场景选择"
      >
        {SCENARIOS.map((scenario, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={scenario.label}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              className={`min-h-11 rounded-button border px-3 py-3 text-left text-sm transition ${
                selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {scenario.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto]">
        <div className="rounded-card border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            当前路径
          </p>
          <p className="mt-2 font-semibold text-primary">{active.title}</p>
          <p className="mt-3 break-words font-mono text-xs text-accent">
            {active.trace}
          </p>
        </div>
        <div className="rounded-card border border-border p-4 md:max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            判定
          </p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.decision}
          </p>
        </div>
      </div>
      <p className="border-t border-border p-4 text-xs leading-5 text-secondary" role="status" aria-live="polite">
        当前样本：{active.label}；保存控制流、生命周期事件、成本模型和复位后的状态证据。
      </p>
    </section>
  );
}
