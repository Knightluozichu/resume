"use client";

import { useState } from "react";

type PrivateInheritanceScenario = {
  label: string;
  relation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly PrivateInheritanceScenario[] = [
  {
    label: "private inheritance judiciously / Timer",
    relation: "Widget 私有继承 Timer 后，外部不能隐式转 Timer*；Widget 自身仍能访问 protected 并参与 Timer 的 virtual protocol。",
    decision: "只有需要 protected access 或直接 override virtual 且 nested adapter 不合适时才保留 private inheritance；否则不要承受继承耦合。",
    evidence: "对外部 `inspect(Timer&)` 做 compile-negative，对 Widget member 做 compile-positive，并覆盖 callback stop/join 与析构顺序。",
  },
  {
    label: "implemented-in-terms-of / composition",
    relation: "private inheritance 与 composition 都可表达 implemented-in-terms-of，但 member composition 更清晰地隔离角色、布局和生命周期。",
    decision: "只调用 base public operations 时优先 composition；必须 override 时把继承角色收进 nested adapter，避免主类型承担 base 身份。",
    evidence: "比较 Timer member 与 WidgetTimer adapter 的 public API、多个实例、owner back-reference 和替换成本，验证客户不能把 Widget 当 Timer。",
  },
  {
    label: "empty base optimization / measured layout",
    relation: "empty policy 作为 private base 可能利用 empty base optimization；普通成员或 `[[no_unique_address]]` 也可能达到类似布局。",
    decision: "先在目标 compiler/ABI 测量 sizeof 与 alignof，再用维护成本、相同类型子对象和 portability 约束决定是否优化。",
    evidence: "记录 MemberStorage、BaseStorage 和 no_unique_address 的布局；静态断言只保护已验证的假设，不把 EBO 当语言普遍保证。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "private inheritance judiciously",
  "implemented-in-terms-of",
  "empty base optimization",
  "composition",
] as const;

export function EcppPrivateInheritanceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="private inheritance decision map：private inheritance judiciously 只在需要 protected/virtual 协议或 measured empty base optimization 时考虑；一般 implemented-in-terms-of 优先 composition。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Private inheritance decision map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            implemented-in-terms-of → capability need → measured cost
          </text>
          <g>
            <rect x="48" y="96" width="254" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="175" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">implemented-in-terms-of</text>
            <text x="175" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Timer protocol / protected</text>
            <text x="175" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">客户不可向上转换</text>
          </g>
          <path d="M302 152 H334" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M326 145 L338 152 L326 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="346" y="96" width="248" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="470" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">composition</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">member / nested adapter</text>
            <text x="470" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先隔离继承角色</text>
          </g>
          <path d="M594 152 H626" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M618 145 L630 152 L618 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="638" y="96" width="254" height="112" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="765" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">private inheritance judiciously</text>
            <text x="765" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">protected / virtual / EBO</text>
            <text x="765" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先测量再承担耦合</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">empty base optimization is evidence, not a reflex</text>
          <text x="170" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">member sizeof</text>
          <text x="390" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">empty base optimization</text>
          <text x="610" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">no_unique_address</text>
          <text x="800" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">ABI / alignment</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">空间收益必须超过 protected、virtual、callback 和 layout coupling 的维护成本</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        private inheritance 是实现工具，不是默认关系；先看 composition 与 nested adapter，再用真实布局测量证明 EBO 值得采用。
      </figcaption>
    </figure>
  );
}

export function EcppItem39PrivateInheritanceLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 39 private inheritance 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">实现继承决策实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：这份继承耦合值得吗？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测客户可见性、virtual/protected 需求和布局收益，再切换方案查看证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 39 private inheritance 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 39 private inheritance 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="mt-4 text-xs font-medium text-warning">决策</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前方案 · {active.label}</p>
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
            {showEvidence ? "收起继承证据" : "查看继承证据"}
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
