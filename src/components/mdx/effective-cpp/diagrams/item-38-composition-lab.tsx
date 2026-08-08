"use client";

import { useState } from "react";

type CompositionScenario = {
  label: string;
  relation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly CompositionScenario[] = [
  {
    label: "has-a / application domain",
    relation: "Person has an Address，Car has an Engine；整体对象协调成员，但不把成员的全部 public API 提升为自己的承诺。",
    decision: "在 application domain 先写真实关系，再以 value member 或 owning member 表达 ownership boundary 和 aggregate invariant。",
    evidence: "尝试把 owner 传给只懂 component contract 的客户；客户不能绕过 owner 的 start/insert/health policy，也能验证构造异常自动清理。",
  },
  {
    label: "is-implemented-in-terms-of / implementation domain",
    relation: "Set 可以根据 List 实现，但 Set 不是 List；List 的重复、iterator mutation 和排序接口不应泄漏给 Set 客户。",
    decision: "在 implementation domain 用 private composition/delegation 隐藏 mechanism，只暴露上层抽象的 Set contract。",
    evidence: "重复 insert 必须保持唯一性，缺失 erase 返回稳定结果；把 list 换成 unordered storage 时 client source 与 contract tests 仍通过。",
  },
  {
    label: "composition / lifetime boundary",
    relation: "composition 只说明成员关系，不自动决定按值、unique ownership 还是 borrowed dependency；每种选择都有不同 lifetime contract。",
    decision: "必需具体成员用 value，optional/polymorphic 成员用 owning indirection，外部共享对象用非拥有引用并声明寿命前置条件。",
    evidence: "覆盖构造失败、析构顺序、空状态、owner replacement 和 borrowed object 提前销毁；禁止 mutable component escape 破坏 invariant。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "has-a",
  "is-implemented-in-terms-of",
  "composition",
  "application domain",
  "implementation domain",
] as const;

export function EcppCompositionRelationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="composition relation map：application domain 使用 has-a，implementation domain 使用 is-implemented-in-terms-of；composition 负责隐藏机制、协调生命周期和维护整体契约。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Composition relation map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            relationship first → ownership / contract boundary → replaceable mechanism
          </text>
          <g>
            <rect x="48" y="96" width="250" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="173" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">application domain</text>
            <text x="173" y="158" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">has-a</text>
            <text x="173" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Car → Engine / Person → Address</text>
          </g>
          <path d="M298 152 H334" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M326 145 L338 152 L326 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="346" y="96" width="248" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="470" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">composition</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">owner / narrow API</text>
            <text x="470" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">lifetime + aggregate invariant</text>
          </g>
          <path d="M594 152 H630" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M622 145 L634 152 L622 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="642" y="96" width="250" height="112" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="767" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">implementation domain</text>
            <text x="767" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">is-implemented-in-terms-of</text>
            <text x="767" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Set → private List mechanism</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">composition must still answer</text>
          <text x="170" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">谁拥有</text>
          <text x="360" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">谁销毁</text>
          <text x="550" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">谁维护 invariant</text>
          <text x="770" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">机制能否替换</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">拥有成员不等于暴露成员；关系语义决定 public inheritance 是否成立</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        composition 既能表达应用域的 has-a，也能表达实现域的 is-implemented-in-terms-of；关键是 owner 保持窄接口与生命周期边界。
      </figcaption>
    </figure>
  );
}

export function EcppItem38CompositionLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 38 composition 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">组合边界实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个 member 的关系是什么？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测 owner、机制和寿命边界，再切换应用域/实现域场景查看验证证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 38 composition 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 38 composition 场景" className="grid gap-2 md:grid-cols-3">
          {SCENARIOS.map((scenario, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={scenario.label}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => {
                  setActiveIndex(index);
                  setShowEvidence(false);
                }}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-accent">关系</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.relation}</p>
          <p className="mt-4 text-xs font-medium text-warning">设计决策</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前关系 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
          </div>
          <button
            type="button"
            aria-pressed={showEvidence}
            onClick={() => setShowEvidence((value) => !value)}
            className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
              showEvidence
                ? "border-success bg-success/10 text-success"
                : "border-border text-secondary hover:border-success hover:text-primary"
            }`}
          >
            {showEvidence ? "收起组合证据" : "查看组合证据"}
          </button>
          {showEvidence && (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">应观察到</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
