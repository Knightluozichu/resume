"use client";

import { useState } from "react";

type RouteStage = {
  label: string;
  boundary: string;
  question: string;
  evidence: string;
};

const ROUTE_STAGES: readonly RouteStage[] = [
  {
    label: "Items 1-17 · 对象与资源",
    boundary: "对象语义、初始化、特殊成员与 RAII",
    question: "先判断对象是否有稳定的不变量，再判断谁拥有资源。",
    evidence: "用构造/析构计数、异常路径和 ownership inventory 验证生命周期。",
  },
  {
    label: "Items 18-40 · 接口与多态",
    boundary: "封装、转换、异常安全、继承与组合",
    question: "先问调用者能依赖什么，再决定成员、非成员、virtual 或 composition。",
    evidence: "用最小接口、base-view dispatch、正反例和迁移审查验证 contract。",
  },
  {
    label: "Items 41-55 · 泛型与工程",
    boundary: "隐式接口、模板、new/delete、warnings 与库",
    question: "先预测 deduction、分配或编译器诊断的边界，再选择工具。",
    evidence: "保留编译诊断、工具链矩阵、allocation failure 和真实代码迁移证据。",
  },
];

export const OFFICIAL_ROUTE_LABELS = [
  "Items 1-4",
  "Items 5-12",
  "Items 13-17",
  "Items 18-25",
  "Items 26-31",
  "Items 32-40",
  "Items 41-48",
  "Items 49-52",
  "Items 53-55",
] as const;

export function EfcLearningMapLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = ROUTE_STAGES[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label="Effective C++ 九章学习路线实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">路线验收实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">从 55 Items 选择下一步</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测问题属于对象、接口还是泛型边界，再切换阶段并查看应留下的证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置学习路线实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Effective C++ 学习阶段" className="grid gap-2 md:grid-cols-3">
          {ROUTE_STAGES.map((stage, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={stage.label}
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
                <span className="mr-2 text-xs">{index + 1}</span>
                {stage.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-secondary">当前路线边界</p>
          <p className="mt-2 text-base font-semibold text-primary">{active.boundary}</p>
          <p className="mt-4 text-sm leading-relaxed text-secondary">{active.question}</p>
        </div>

        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前阶段 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.question}</p>
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
            {showEvidence ? "收起验收证据" : "查看这一阶段的验收证据"}
          </button>
          {showEvidence && (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">应留下的证据</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
