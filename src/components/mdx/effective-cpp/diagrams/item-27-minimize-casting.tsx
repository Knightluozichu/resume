"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "minimize casting",
  "const_cast",
  "dynamic_cast",
  "reinterpret_cast",
  "static_cast",
  "object layout",
  "virtual function",
] as const;

type CastCell = readonly [kind: string, intent: string, risk: string];

function CastGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly CastCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={`${ariaLabel}：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([kind, intent, risk], index) => (
            <section
              key={kind}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {kind}
              </strong>
              <code className="mt-3 block text-xs text-accent">{intent}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {risk}
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

const taxonomyCells = [
  [
    "static_cast",
    "defined conversion",
    "可能 narrowing，向下转型不做运行期类型检查。",
  ],
  [
    "dynamic_cast",
    "checked polymorphic cast",
    "失败可检测，但有 RTTI/分支成本并暴露设计气味。",
  ],
  [
    "const_cast",
    "change cv qualification",
    "原对象真实 const 时写入会产生未定义行为。",
  ],
  [
    "reinterpret_cast",
    "representation reinterpretation",
    "结果低层、平台相关，不能建立普通对象语义。",
  ],
  [
    "C-style cast",
    "multiple cast families",
    "意图不明确，可组合去 const 与重解释且难搜索。",
  ],
  [
    "No cast",
    "typed API / virtual / variant",
    "让 compiler 和抽象边界保留正确性信息。",
  ],
] as const;

const layoutCells = [
  ["Derived start", "Derived* d", "指针指向完整对象起始或 ABI 定义位置。"],
  [
    "Base A subobject",
    "static_cast<BaseA*>(d)",
    "可能保持地址，也可能按布局偏移。",
  ],
  [
    "Base B subobject",
    "static_cast<BaseB*>(d)",
    "multiple inheritance 下通常需要 pointer adjustment。",
  ],
  ["Round trip", "cast back", "只有动态类型与路径正确时才能恢复原对象地址。"],
  [
    "Reinterpret",
    "raw same bits",
    "不执行合法 subobject adjustment，可能指向错误成员。",
  ],
  [
    "ABI boundary",
    "layout may vary",
    "编译器、继承和 virtual base 决定实际 offset。",
  ],
] as const;

const dispatchCells = [
  [
    "Type switch",
    "dynamic_cast chain",
    "每新增 derived 都修改集中分支，重复 RTTI 与 downcast。",
  ],
  [
    "Virtual operation",
    "base.draw()",
    "把变化交给 override，调用者不认识 concrete type。",
  ],
  [
    "Visitor",
    "accept(visitor)",
    "固定类型集合、扩展操作时集中 double dispatch。",
  ],
  [
    "Variant",
    "visit(sum type)",
    "封闭类型集合由 compiler 检查 exhaustive handling。",
  ],
  [
    "Typed container",
    "vector<Special*>",
    "若业务只处理一种 concrete type，直接保存其正确类型。",
  ],
  [
    "Boundary adapter",
    "one checked cast",
    "无法改外部 API 时在窄边界检查并返回 typed result。",
  ],
] as const;

export function EcppCastTaxonomyRiskMap() {
  return (
    <CastGrid
      ariaLabel="静态动态常量重解释旧式无转型六类类型转换意图风险图"
      caption="四种命名 cast 把危险类别显式化；真正目标仍是缩小 cast 数量和作用域，而非只换语法。"
      cells={taxonomyCells}
    />
  );
}

export function EcppBaseSubobjectAdjustmentMap() {
  return (
    <CastGrid
      ariaLabel="派生起点两个基类子对象回转重解释 ABI 六阶段对象布局指针调整图"
      caption="base/derived 转换可能调整地址；reinterpret 相同位模式不会替你定位正确 base subobject。"
      cells={layoutCells}
    />
  );
}

export function EcppCastFreeDispatchDecisionMap() {
  return (
    <CastGrid
      ariaLabel="类型判断虚函数访问者变体类型容器边界适配六种无转型分派方案图"
      caption="反复 dynamic_cast 往往说明抽象缺少 operation 或容器类型错误，应先修正 dispatch 设计。"
      cells={dispatchCells}
    />
  );
}

const LAB_SCENARIOS = [
  {
    id: 1,
    label: "命名 cast",
    tone: "var(--success)",
    title: "static_cast 处理已定义转换，dynamic_cast 明确运行期检查",
    evidence:
      "intent=explicit → cast=named → precondition=recorded → test=boundary-covered",
    decision: "accept：转换意图与前提可审查",
  },
  {
    id: 2,
    label: "对象布局",
    tone: "var(--warning)",
    title: "multiple inheritance 中合法 base cast 需要 pointer adjustment",
    evidence:
      "Derived*=d → BaseB*=adjusted → object-layout=ABI → reinterpret=unsafe",
    decision: "review：记录 subobject 地址与 ABI 边界",
  },
  {
    id: 3,
    label: "删除 cast",
    tone: "var(--danger)",
    title: "重复 downcast 链可由 virtual function、variant 或 typed container 替代",
    evidence:
      "dynamic-cast-chain → concrete-knowledge → redesign=capability → cast=removed",
    decision: "fail：重构接口而不是扩散 RTTI",
  },
] as const;

export function EcppItem27CastLab() {
  const [scenarioId, setScenarioId] = useState(1);
  const scenario =
    LAB_SCENARIOS.find((item) => item.id === scenarioId) ?? LAB_SCENARIOS[0];

  return (
    <section
      className="my-8 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="ecpp-item-27-cast-lab"
      aria-label="Effective C++ Item 27 cast 实验"
      aria-labelledby="ecpp-item-27-lab-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Lab
          </p>
          <h3
            id="ecpp-item-27-lab-title"
            className="mt-1 text-lg font-semibold text-primary"
          >
            Item 27 cast 边界实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-secondary">
            先预测 cast 是否改值、地址、cv 或动态类型，再切换命名转换、对象布局与无 cast 重构样本。
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
        aria-label="Item 27 cast 实验场景选择"
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
        当前样本：{scenario.label}；保存 cast 家族、对象布局、dynamic type、地址调整、前提和复位轨迹。
      </p>
    </section>
  );
}
