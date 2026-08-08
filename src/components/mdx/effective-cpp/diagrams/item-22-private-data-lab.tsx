"use client";

import { useState } from "react";

type BoundaryScenario = {
  label: string;
  exposure: string;
  boundary: string;
  evidence: string;
};

const SCENARIOS: readonly BoundaryScenario[] = [
  {
    label: "public field → private data member",
    exposure: "调用者能直接写 quantity 与 reserved，无法集中维护不变量。",
    boundary: "private data member 只允许 class 与明确 friend 访问，外部改走 semantic query / command。",
    evidence: "compile-negative test 拒绝直接写字段；reserve/release 失败后 available 保持不变。",
  },
  {
    label: "syntactic consistency / access control",
    exposure: "字段、计算值和受控写入使用不同形态，调用者依赖当前表示。",
    boundary: "用函数统一观察语法，并按 read、validated write、command 分配 access control。",
    evidence: "把 int 换成 cache/atomic 后 public behavior tests 无需改调用点。",
  },
  {
    label: "protected → semantic hook",
    exposure: "derived 直接依赖 vector、layout 和无锁写入，protected 仍泄漏表示。",
    boundary: "storage 保持 private，只暴露 protected operation hook 与明确的 extension contract。",
    evidence: "替换 vector 为 tree 并重跑 derived contract tests，production client 不改字段访问。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "data members private",
  "syntactic consistency",
  "access control",
  "encapsulation",
  "protected",
] as const;

export function EcppItem22PrivateDataLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 22 private data member 封装实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">表示边界实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">从字段暴露回到语义接口</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测哪一种表示泄漏会扩大变更范围，再切换边界并查看验证证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 22 private data 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 22 封装边界场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-warning">表示暴露</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.exposure}</p>
          <p className="mt-4 text-xs font-medium text-accent">受控边界</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.boundary}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.boundary}</p>
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
            {showEvidence ? "收起封装证据" : "查看封装证据"}
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
