"use client";

import { useState } from "react";

type InitializationScenario = {
  label: string;
  phase: string;
  rule: string;
  evidence: string;
};

const SCENARIOS: readonly InitializationScenario[] = [
  {
    label: "member initialization list",
    phase: "成员在 constructor body 之前就必须成为有效对象。",
    rule: "用 member initialization list 直接构造；不要 default-then-assign，尤其是 const / reference member。",
    evidence: "用计数类型确认只发生一次构造，并打开 reorder warning 检查列表与声明顺序。",
  },
  {
    label: "initialization order",
    phase: "虚基类、直接基类和成员有语言规定的真实顺序。",
    rule: "先 virtual bases，再 direct bases，再按 member declaration order 初始化成员，最后执行 body。",
    evidence: "故意打乱 initializer list，记录构造日志并验证结果不随列表书写顺序改变。",
  },
  {
    label: "non-local static objects",
    phase: "跨 translation unit 的动态初始化和退出析构没有可依赖的固定次序。",
    rule: "用 function-local static accessor 或显式 Application lifetime 建立依赖与退出顺序。",
    evidence: "反转链接顺序、并发首次调用 accessor，并测试退出日志是否访问已销毁服务。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "objects are initialized before they are used",
  "member initialization list",
  "initialization order",
  "non-local static objects",
] as const;

export function EcppItem04InitializeObjectsLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 4 initialization 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">生命周期起点实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">对象何时真正有效</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测初始化阶段和真实顺序，再切换场景查看构造、链接与退出证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 4 initialization 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 4 initialization 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">当前阶段</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.phase}</p>
          <p className="mt-4 text-xs font-medium text-warning">规则</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.rule}</p>
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
            {showEvidence ? "收起初始化证据" : "查看初始化证据"}
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
