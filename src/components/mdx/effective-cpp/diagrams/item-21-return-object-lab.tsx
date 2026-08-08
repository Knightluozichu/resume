"use client";

import { useState } from "react";

type ReturnScenario = {
  label: string;
  storage: string;
  failure: string;
  evidence: string;
};

const SCENARIOS: readonly ReturnScenario[] = [
  {
    label: "local object → dangling reference",
    storage: "operator* 在函数体创建 local object，离开 block 时 destructor 结束其 lifetime。",
    failure: "返回引用指向已结束的 storage，后续读取是 dangling reference / undefined behavior。",
    evidence: "开启 return-local-addr warning、ASan 和 UBSan；不要以 debug 下暂时读到旧字节为证据。",
  },
  {
    label: "heap object → hidden ownership",
    storage: "new 创建 heap object 后以 reference 返回，调用语法没有携带释放责任。",
    failure: "operator* 链式中间结果无人 delete，形成 hidden ownership obligation 和泄漏。",
    evidence: "用 allocation ledger 对比 value return 与 owner return，验证每次分配都有明确 deleter。",
  },
  {
    label: "operator* → fresh result value",
    storage: "数学运算产生独立对象，不属于 lhs 或 rhs，应按值返回。",
    failure: "value semantics 不能被 static slot 或 reference storage trick 替代。",
    evidence: "检查连续、嵌套、递归和并发结果地址不共享，并用 copy elision / NRVO 报告验证成本。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "return a reference when you must return an object",
  "local object",
  "heap object",
  "dangling reference",
  "operator*",
] as const;

export function EcppReturnObjectMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="return object map：local object reference becomes dangling reference；heap object reference hides ownership；operator* should return fresh result value by value, allowing copy elision and NRVO。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Return contract decision map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            local object · heap object · operator* · fresh result value
          </text>
          <g>
            <rect x="48" y="96" width="244" height="104" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="170" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">local object</text>
            <text x="170" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">return reference</text>
            <text x="170" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">→ dangling reference</text>
          </g>
          <path d="M292 148 H346" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M338 141 L350 148 L338 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="356" y="96" width="228" height="104" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="470" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">heap object</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">reference hides owner</text>
            <text x="470" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">→ leak / unknown delete</text>
          </g>
          <path d="M584 148 H638" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M630 141 L642 148 L630 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="648" y="96" width="244" height="104" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="770" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">operator*</text>
            <text x="770" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">return object by value</text>
            <text x="770" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">→ copy elision / NRVO</text>
          </g>
          <line x1="48" y1="252" x2="892" y2="252" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">先验收 ownership，再谈优化</text>
          <text x="155" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">lifetime</text>
          <text x="360" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">owner / deleter</text>
          <text x="580" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">identity / alias</text>
          <text x="790" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">value cost</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">返回类型必须与结果真实的 ownership、identity 和 lifetime 一致</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        局部引用悬空、堆引用隐藏 owner；独立计算结果按值返回，让语言和编译器处理对象传递成本。
      </figcaption>
    </figure>
  );
}

export function EcppItem21ReturnObjectLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 21 return object 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">返回契约实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">结果该由谁拥有</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测返回对象在表达式结束后是否仍有 owner，再切换方案查看生命周期和地址证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 21 return object 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 21 返回场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">storage / ownership</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.storage}</p>
          <p className="mt-4 text-xs font-medium text-warning">失败模式</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.failure}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.failure}</p>
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
            {showEvidence ? "收起返回证据" : "查看返回证据"}
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
