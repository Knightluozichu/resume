"use client";

import { useState } from "react";

type PolicyScenario = {
  label: string;
  contract: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly PolicyScenario[] = [
  {
    label: "pure virtual / interface",
    contract: "每个 concrete derived 都必须提供 fly 或 draw 的实现；遗漏 override 应在编译期让类型保持 abstract。",
    decision: "把必须由 subtype 确认的行为声明为 pure virtual；共享算法放 protected helper，derived 仍显式选择。",
    evidence: "删除 ModelC 的 override，确认 factory/实例化 compile fail；ModelA/B 显式转调 helper 后再跑 contract suite。",
  },
  {
    label: "impure virtual / default",
    contract: "base 同时交付接口与可继承 body；只有对所有当前和可预见 subtype 都安全的 default 才能静默采用。",
    decision: "若 no-op 或 default 对任一 subtype 不合法，就不能只因多数实现相同而使用 impure virtual。",
    evidence: "将每个 subtype 放进 base contract suite，并测试遗漏 override 是否会静默改变协议；不安全时改 pure virtual。",
  },
  {
    label: "non-virtual / fixed flow",
    contract: "所有客户看到同一 public algorithm；校验、锁、统计和错误转换不能被 derived 绕过。",
    decision: "用 non-virtual public API 固定流程，再用 private/protected virtual hook 定制步骤（NVI）。",
    evidence: "经 Base 与 Derived static type 调用并比较前后检查、异常路径与 invariant；用 override/final 验证边界。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "inheritance of interface",
  "inheritance of implementation",
  "pure virtual",
  "impure virtual",
  "non-virtual",
] as const;

export function EcppInterfaceImplementationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="inheritance policy map：inheritance of interface 与 inheritance of implementation 是两个维度；pure virtual 强制 override，impure virtual 继承安全 default，non-virtual 固定统一 implementation。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Interface / implementation inheritance map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            declaration syntax is a policy decision, not a convenience default
          </text>
          <g>
            <rect x="48" y="96" width="256" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="176" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">inheritance of interface</text>
            <text x="176" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">pure virtual</text>
            <text x="176" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">concrete derived 必须 override</text>
          </g>
          <path d="M304 152 H334" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M326 145 L338 152 L326 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="342" y="96" width="256" height="112" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="470" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">inheritance of implementation</text>
            <text x="470" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">impure virtual</text>
            <text x="470" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">只继承 universally safe default</text>
          </g>
          <path d="M598 152 H628" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M620 145 L632 152 L620 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="636" y="96" width="256" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="764" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">non-virtual</text>
            <text x="764" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">fixed public algorithm</text>
            <text x="764" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">NVI hook 只定制步骤</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">先问：遗漏 override 应该怎样失败？</text>
          <text x="182" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">pure → compile fail</text>
          <text x="470" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">impure → default contract</text>
          <text x="758" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">non-virtual → no customization</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">共享 body 也要显式复用；默认不安全时，选择必须在 subtype author 处可见</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        pure virtual 让选择变成编译期责任，impure virtual 只承诺安全默认，non-virtual 则锁定公共流程并把变化收进 hook。
      </figcaption>
    </figure>
  );
}

export function EcppItem34InterfaceImplementationLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 34 inheritance policy 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">继承政策实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：遗漏 override 会怎样？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测接口责任、默认实现和固定流程的失败方式，再切换政策查看验证证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 34 inheritance policy 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 34 inheritance policy 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">契约</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.contract}</p>
          <p className="mt-4 text-xs font-medium text-warning">政策判断</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前政策 · {active.label}</p>
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
            {showEvidence ? "收起政策证据" : "查看政策证据"}
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
