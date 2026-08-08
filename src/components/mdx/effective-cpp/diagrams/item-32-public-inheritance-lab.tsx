"use client";

import { useState } from "react";

type SubstitutionScenario = {
  label: string;
  contract: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly SubstitutionScenario[] = [
  {
    label: "square rectangle / invariant",
    contract: "Rectangle::setWidth 只改变 width，height 保持原值；这是合法 base client 可以依赖的后置条件。",
    decision: "Square 为维持 width == height 必须同时改变 height，因此不是可替换的 Rectangle。",
    evidence: "运行 makeWider 这类 base contract suite，记录 oldHeight、newHeight 和 invariant，拒绝“删掉 assertion”的修法。",
  },
  {
    label: "liskov substitution / client",
    contract: "derived 至少接受 base 的全部合法输入，成功时不少于 base 的结果保证，并保持错误、生命周期和非功能契约。",
    decision: "逐个列出 precondition、postcondition、invariant 与 failure model；任何 derived 例外都使 public inheritance 进入复审。",
    evidence: "对每个 concrete derived 重跑同一组 base contract suite，并补 property、ownership、concurrency 与 complexity 证据。",
  },
  {
    label: "is-a / capability interface",
    contract: "public inheritance models is-a 只在客户能把 derived 当作 base 使用时成立，不由字段相同或现实分类决定。",
    decision: "把可选能力拆成 capability interface；不满足完整契约的类型改用 composition 或独立 value type。",
    evidence: "让 fly 客户只接收 Flyable，或让 Square/Rectangle 共享只读 Bounds；编译期阻止不合法替换。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "public inheritance models is-a",
  "is-a",
  "liskov substitution",
  "square rectangle",
] as const;

export function EcppPublicInheritanceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="public inheritance models is-a 关系图：is-a 必须通过 liskov substitution；square rectangle 的 invariant 与 Rectangle 后置条件冲突时，应改用 capability interface 或 composition。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Public inheritance contract map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            public inheritance models is-a → client substitutability → evidence
          </text>
          <g>
            <rect x="48" y="96" width="220" height="104" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="158" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">public inheritance models is-a</text>
            <text x="158" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">derived → base</text>
            <text x="158" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">公开契约成为承诺</text>
          </g>
          <path d="M268 148 H310" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M302 141 L314 148 L302 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="320" y="96" width="210" height="104" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="425" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">is-a</text>
            <text x="425" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">valid base client</text>
            <text x="425" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">前置 / 后置 / invariant</text>
          </g>
          <path d="M530 148 H572" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M564 141 L576 148 L564 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="582" y="96" width="310" height="104" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="737" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">liskov substitution</text>
            <text x="737" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">contract suite + matrix</text>
            <text x="737" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">输入、结果、失败、生命周期</text>
          </g>
          <line x1="48" y1="252" x2="892" y2="252" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">square rectangle failure → reshape the abstraction</text>
          <text x="170" y="324" textAnchor="middle" fontSize="12" fill="var(--danger)">square rectangle</text>
          <text x="390" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">height unchanged ↔ width == height</text>
          <text x="620" y="324" textAnchor="middle" fontSize="12" fill="var(--success)">capability interface</text>
          <text x="800" y="324" textAnchor="middle" fontSize="12" fill="var(--success)">composition</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">分类相似不是行为替换证据；每个 base operation 都要有 derived 的可观察契约证据</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        public inheritance 的箭头终点不是“字段一样”，而是所有合法 base client 都能安全替换；失败时应缩小接口或改用组合。
      </figcaption>
    </figure>
  );
}

export function EcppItem32PublicInheritanceLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 32 public inheritance 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">替换契约实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个 derived 能替换 base 吗？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测每个场景的合法客户、状态不变量和失败语义，再切换场景查看测试证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 32 public inheritance 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 32 substitution 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">base contract</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.contract}</p>
          <p className="mt-4 text-xs font-medium text-warning">判断</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
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
            {showEvidence ? "收起替换证据" : "查看替换证据"}
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
