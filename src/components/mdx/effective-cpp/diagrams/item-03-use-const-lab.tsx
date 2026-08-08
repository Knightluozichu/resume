"use client";

import { useState } from "react";

type ConstScenario = {
  label: string;
  rule: string;
  risk: string;
  evidence: string;
};

const SCENARIOS: readonly ConstScenario[] = [
  {
    label: "use const whenever possible",
    rule: "先把只读能力写进 pointer、pointee、iterator、parameter 和 return type。",
    risk: "把 pointer const 与 pointee const 混为一谈，会让重指向和写入权限错位。",
    evidence: "为每种组合写 compile-positive / compile-negative tests，并检查结果别名的生命周期。",
  },
  {
    label: "const member function",
    rule: "const object 只能调用承诺不改变抽象值的 const member function。",
    risk: "const overload 返回可写引用，或把 mutable cache 当业务状态修改，会泄漏写权限。",
    evidence: "检查 const / non-const overload 的返回类型，修改源数据后验证 cache invalidation。",
  },
  {
    label: "bitwise → logical constness",
    rule: "bitwise constness 是编译器位级规则，logical constness 才是调用者可观察的抽象值。",
    risk: "mutable cache 的首次并发写入若无同步，会在满足 logical constness 时仍触发 data race。",
    evidence: "用 ThreadSanitizer 覆盖并发首次查询，用修改后重算测试覆盖失效协议。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "use const whenever possible",
  "const member function",
  "bitwise constness",
  "logical constness",
] as const;

export function EcppItem03UseConstLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 3 const 契约实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">const 权限实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">从类型权限到抽象值</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测每个 const 层级允许的操作，再切换场景查看编译和运行时证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 3 const 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 3 const 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">const 规则</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.rule}</p>
          <p className="mt-4 text-xs font-medium text-warning">潜在失效</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.risk}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.rule}</p>
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
            {showEvidence ? "收起 const 证据" : "查看 const 证据"}
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
