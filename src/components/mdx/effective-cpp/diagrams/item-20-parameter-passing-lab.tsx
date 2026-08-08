"use client";

import { useState } from "react";

type ParameterScenario = {
  label: string;
  choice: string;
  risk: string;
  evidence: string;
};

const SCENARIOS: readonly ParameterScenario[] = [
  {
    label: "pass-by-reference-to-const",
    choice: "大型、非平凡、只读对象默认使用 const T&，表达 read-only borrow。",
    risk: "const 不延长 lifetime，也不消除 aliasing；异步保存引用会形成悬空。",
    evidence: "instrumented type 对比 copy/move 次数，并用 compile test 阻止调用 non-const operation。",
  },
  {
    label: "pass-by-value / slicing problem",
    choice: "按值接收 base 会复制参数并丢失 derived 部分；多态只读接口应保留引用。",
    risk: "参数动态类型变成 base，virtual dispatch 可能落到 base implementation。",
    evidence: "copy trace 与 override counter 同时验证成本和分派；断言 by-value 发生 slicing。",
  },
  {
    label: "built-in types / view / sink",
    choice: "内置标量、小 iterator、view 常按值；保存 ownership 的 sink 可按值再 move。",
    risk: "机械使用 const T& 会引入间接访问和 lifetime 边界，view 按值也不拥有底层数据。",
    evidence: "按调用分布测量 ABI、lvalue/rvalue copy，并用 sanitizer 覆盖 view 与异步任务。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "pass-by-reference-to-const",
  "pass-by-value",
  "slicing problem",
  "built-in types",
] as const;

export function EcppParameterPassingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="parameter passing map：pass-by-value 产生 parameter copy chain 并可能造成 slicing problem；pass-by-reference-to-const 保留身份和 dynamic dispatch；built-in types、view 与 sink 是需要按语义判断的例外。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Parameter passing decision map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            observe · mutate · consume · scalar
          </text>
          <g>
            <rect x="48" y="96" width="244" height="104" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="170" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">pass-by-value</text>
            <text x="170" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">copy / move parameter</text>
            <text x="170" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">base value → slicing problem</text>
          </g>
          <path d="M292 148 H346" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M338 141 L350 148 L338 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="356" y="96" width="228" height="104" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="470" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">pass-by-reference-to-const</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">borrow + read only</text>
            <text x="470" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">identity / dispatch preserved</text>
          </g>
          <path d="M584 148 H638" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M630 141 L642 148 L630 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="648" y="96" width="244" height="104" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="770" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">semantic exceptions</text>
            <text x="770" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">built-in types / views</text>
            <text x="770" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">sink → value then move</text>
          </g>
          <line x1="48" y1="252" x2="892" y2="252" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">验证四件事</text>
          <text x="150" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">copy / move count</text>
          <text x="365" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">dynamic dispatch</text>
          <text x="585" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">lifetime / ownership</text>
          <text x="790" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">aliasing contract</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">参数形式先表达语义，再用成本、ABI 和 sanitizer 证据校正</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        参数选择从 observe、mutate、consume、scalar 出发；const 引用不是无条件的性能规则，也不拥有被借用数据。
      </figcaption>
    </figure>
  );
}

export function EcppItem20ParameterLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 20 parameter passing 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">参数契约实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">从参数意图选择传递形式</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测参数是 observe、mutate、consume 还是 scalar，再切换场景检查成本和生命周期证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 20 parameter passing 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 20 参数场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">参数选择</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.choice}</p>
          <p className="mt-4 text-xs font-medium text-warning">潜在风险</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.risk}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.choice}</p>
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
            {showEvidence ? "收起传参证据" : "查看传参证据"}
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
