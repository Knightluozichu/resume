"use client";

import { useState } from "react";

type TemplateFactoringScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly TemplateFactoringScenario[] = [
  {
    label: "non-type template parameter / code bloat",
    observation: "SquareMatrix<T, N> 让每个 N 生成 wrapper 和可能重复的 heavy invert；N 是值边界，不一定改变算法结构。",
    decision: "先区分 data-like template dimension 与 behavior-shaping dimension，再决定哪些参数可变成 runtime argument。",
    evidence: "比较 nm/map 的 instantiation symbols、text bytes、ICache 与不同 N 的 throughput；不能只看源码或总 executable size。",
  },
  {
    label: "parameter-independent code out of templates",
    observation: "抽离的目标是与模板参数无关的控制和重算法，不是把所有 generic policy 都抹掉；T 的算术语义通常仍应模板化。",
    decision: "把 heavy core 放到少参数的 implementation，保留 thin typed wrapper 负责 N、bounds、casts 和 invariant。",
    evidence: "验证 wrapper 仍保留固定 storage/compile-time checks，shared core 只出现一份；运行异常、精度和语义 contract tests。",
  },
  {
    label: "common base class / layout tradeoff",
    observation: "stateless common base 通过 n/data 参数共享代码；stateful common base 可简化调用，却为每个对象增加 pointer/size 和 self-pointer 风险。",
    decision: "以对象数量、sizeof、copy/move、编译链接时间和热点 benchmark 决定；必要时只给已 profile 的尺寸保留 specialization。",
    evidence: "记录 stateless/stateful layout、移动后的 data pointer、binary text 和 4x4 fast path，形成 code-size/performance budget。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "parameter-independent code out of templates",
  "code bloat",
  "non-type template parameter",
  "common base class",
] as const;

export function EcppTemplateFactoringMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="template factoring map：non-type template parameter 可能造成 code bloat；把 parameter-independent code out of templates 放入 common base class，保留 typed thin wrapper，并用 binary 与 benchmark 证据验证。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Template factoring evidence map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">instantiation dimension → binary evidence → shared core + typed wrapper</text>
          <g>
            <rect x="48" y="96" width="252" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="174" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">non-type template parameter</text>
            <text x="174" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">N = 5 / 10 / 20</text>
            <text x="174" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">data-like dimension</text>
          </g>
          <path d="M300 152 H332" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M324 145 L336 152 L324 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="344" y="96" width="252" height="112" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="470" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">code bloat</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">duplicate symbols / text</text>
            <text x="470" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">ICache / deploy cost</text>
          </g>
          <path d="M596 152 H628" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M620 145 L632 152 L620 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="640" y="96" width="252" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="766" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">common base class</text>
            <text x="766" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">runtime n + data</text>
            <text x="766" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">thin wrapper keeps type safety</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">parameter-independent code out of templates</text>
          <text x="170" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">stateless core</text>
          <text x="390" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">stateful base</text>
          <text x="610" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">specialized fast path</text>
          <text x="800" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">measure text + hot path</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">抽离重复控制流，不抽掉行为语义、固定尺寸类型安全或已证明的常量优化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">模板抽离的目标是让无关维度共享 heavy core，同时保留 typed wrapper；binary、layout 和 benchmark 共同决定是否值得。</figcaption>
    </figure>
  );
}

export function EcppItem44TemplateFactoringLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 44 template factoring 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">模板体积实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个参数真的改变算法吗？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测实例化、对象布局和热点优化的影响，再切换抽离策略查看证据。</p></div>
        <button type="button" aria-label="重置 Item 44 template factoring 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 44 template factoring 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起模板证据" : "查看模板证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
