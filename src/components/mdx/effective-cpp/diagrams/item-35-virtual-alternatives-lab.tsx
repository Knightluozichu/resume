"use client";

import { useState } from "react";

type AlternativeScenario = {
  label: string;
  timing: string;
  contract: string;
  decision: string;
  evidence: string;
  risk: string;
};

const SCENARIOS: readonly AlternativeScenario[] = [
  {
    label: "NVI idiom",
    timing: "subtype variation",
    contract:
      "所有角色都必须经过同一个 public envelope；只有 health calculation 这一步随 subtype 变化。",
    decision:
      "用 non-virtual wrapper 固定 validate、lock、clamp 和 audit，把 virtual implementation hook 收到 private/protected。",
    evidence:
      "用 Base reference 和 Derived object 调同一个 public entry，逐项记录 wrapper 前后条件；任何 override 都不能绕过 envelope。",
    risk: "derived 直接公开 virtual，导致每个实现重复同步、范围检查和审计。",
  },
  {
    label: "function pointer",
    timing: "object construction",
    contract:
      "算法只是固定 signature 的无状态函数，两个同类对象也可以在构造时选择不同 calculator。",
    decision:
      "注入 `int (*)(const GameCharacter&)`；不创建无业务意义的 derived type，也不转移函数指针的 ownership。",
    evidence:
      "构造两个对象并注入两个 calculator，分别记录调用次数、返回值和 null rejection；确认差异来自 object 配置。",
    risk: "把需要捕获状态的 lambda 硬塞进 function pointer，或让 raw context 越过生命周期边界。",
  },
  {
    label: "std::function",
    timing: "object construction / runtime",
    contract:
      "算法需要 lambda、functor 或 captured state，并且 callable signature 可以稳定表达输入。",
    decision:
      "使用 `std::function<int(const HealthContext&)>` 做 type erasure；按值拥有捕获并拒绝 empty callable。",
    evidence:
      "分别运行 free function、capturing lambda 和 functor，测试 capture lifetime、bad_function_call 与 allocation profile。",
    risk: "setter 允许空 callable、悬空引用捕获或持锁回调重入 character。",
  },
  {
    label: "Strategy pattern",
    timing: "runtime replacement",
    contract:
      "算法拥有参数、cache 或资源，需要独立 lifecycle、共享 policy 或运行期切换。",
    decision:
      "把 Strategy object 与 GameCharacter 组合；mutable state 用 unique ownership，immutable policy 才考虑 shared const。",
    evidence:
      "构造 candidate 后验证，再按同步协议 no-throw swap；contract suite 覆盖隔离、失败保留旧策略和并发读取。",
    risk: "多个角色共享带 mutable cache 的策略，状态串扰且没有同步契约。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "alternatives to virtual functions",
  "nvi idiom",
  "function pointer",
  "std::function",
  "strategy pattern",
] as const;

export function EcppVirtualAlternativesMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 980 430"
          role="img"
          aria-label="alternatives to virtual functions decision map：NVI idiom 把 subtype variation 留在 hook，function pointer 按 object construction 选择无状态算法，std::function 携带 callable state，strategy pattern 在 runtime replacement 中管理独立算法对象。"
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <text x="490" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Alternatives to virtual functions
          </text>
          <text x="490" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            先定位 variation timing，再决定 dispatch、state 与 ownership
          </text>

          <rect x="360" y="78" width="260" height="62" rx="12" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.8" />
          <text x="490" y="105" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">
            GameCharacter
          </text>
          <text x="490" y="126" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            health calculation 的 contract
          </text>

          <path d="M490 140 V162 M135 162 H845" stroke="var(--border)" strokeWidth="1.5" />
          <path d="M135 162 V176 M365 162 V176 M615 162 V176 M845 162 V176" stroke="var(--border)" strokeWidth="1.5" />

          <g>
            <rect x="28" y="176" width="214" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="135" y="204" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">NVI idiom</text>
            <text x="135" y="230" textAnchor="middle" fontSize="12" fill="var(--text-primary)">subtype variation</text>
            <text x="135" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">public wrapper → hook</text>
            <text x="135" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定 invariant envelope</text>
          </g>
          <g>
            <rect x="258" y="176" width="214" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="365" y="204" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">function pointer</text>
            <text x="365" y="230" textAnchor="middle" fontSize="12" fill="var(--text-primary)">object construction</text>
            <text x="365" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">fixed signature</text>
            <text x="365" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无状态 · 无 ownership</text>
          </g>
          <g>
            <rect x="488" y="176" width="214" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="595" y="204" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">std::function</text>
            <text x="595" y="230" textAnchor="middle" fontSize="12" fill="var(--text-primary)">callable type erasure</text>
            <text x="595" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">lambda / functor / capture</text>
            <text x="595" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">验证空值与 lifetime</text>
          </g>
          <g>
            <rect x="718" y="176" width="214" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="825" y="204" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">Strategy pattern</text>
            <text x="825" y="230" textAnchor="middle" fontSize="12" fill="var(--text-primary)">runtime replacement</text>
            <text x="825" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">state / resource / cache</text>
            <text x="825" y="276" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">独立 ownership policy</text>
          </g>

          <line x1="28" y1="330" x2="932" y2="330" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="490" y="356" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            选择检查：变化属于 subtype、object、callable，还是独立算法对象？
          </text>
          <text x="490" y="382" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            不要把“可替换”自动等同于“必须 public virtual”
          </text>
          <text x="490" y="406" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每条路径都要同时说明 contract、dispatch、state、ownership 与测试边界
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一项算法变化可以落在 subtype、object、callable 或独立 Strategy object；决策关键是变化时机与生命周期，而不是 virtual 关键字本身。
      </figcaption>
    </figure>
  );
}

export function EcppItem35VirtualAlternativesLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
    setShowRisk(false);
  };

  return (
    <section
      data-visual-kind="ecpp-item-35-virtual-alternatives-lab"
      aria-label={`Item 35 alternatives to virtual functions 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">variation decision lab</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：这项变化应该放在哪里？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先判断变化时机、状态和 owner，再查看每种 alternatives to virtual functions 的验证证据；最后注入一个边界风险。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 35 virtual alternatives 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 35 alternatives 场景" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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
                  setShowRisk(false);
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
          <p className="text-xs font-medium text-accent">变化时机 · {active.timing}</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.contract}</p>
          <p className="mt-4 text-xs font-medium text-warning">设计判断</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前机制 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              aria-pressed={showEvidence}
              onClick={() => setShowEvidence((value) => !value)}
              className={`min-h-11 rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
                showEvidence
                  ? "border-success bg-success/10 text-success"
                  : "border-border text-secondary hover:border-success hover:text-primary"
              }`}
            >
              {showEvidence ? "收起验收清单" : "查看验收清单"}
            </button>
            <button
              type="button"
              aria-pressed={showRisk}
              onClick={() => setShowRisk((value) => !value)}
              className={`min-h-11 rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
                showRisk
                  ? "border-danger bg-danger/10 text-danger"
                  : "border-border text-secondary hover:border-danger hover:text-primary"
              }`}
            >
              {showRisk ? "收起边界风险" : "注入边界风险"}
            </button>
          </div>
          {showEvidence && (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">应验证</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
            </div>
          )}
          {showRisk && (
            <div className="mt-3 rounded-control border border-danger bg-bg p-4">
              <p className="text-xs font-medium text-danger">故障注入</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.risk}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
