"use client";

import { useState } from "react";

type TraitsScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly TraitsScenario[] = [
  {
    label: "traits classes / information about types",
    observation: "泛型算法需要 category、value_type、difference_type 等 information about types，但 raw pointer 没有 nested members。",
    decision: "用 traits classes 作为统一查询 facade；让 class iterator 由 primary template 提供信息，非侵入目标由 specialization 适配。",
    evidence: "分别编译 ListIterator、const iterator 和 raw pointer，检查没有 runtime state，trait names 与 cv normalization 都一致。",
  },
  {
    label: "iterator_traits / partial specialization",
    observation: "iterator_traits<Iter> 把普通 iterator 的 nested category 转发出来，而 iterator_traits<T*> 直接声明 random-access capability。",
    decision: "为一族参数形状使用 partial specialization，明确 primary template 缺信息时的错误边界与 traits ownership。",
    evidence: "static_assert category/value/difference types，覆盖 pointer、class、const pointer 和不支持类型的 compile-fail。",
  },
  {
    label: "tag dispatch / complexity contract",
    observation: "tag dispatch 把 category 作为空类型传给 overload set，在编译期选择 `+=` 或逐步移动，而不是运行期 if。",
    decision: "tag 必须真实表达 capability 与复杂度；高报 random-access 会让算法选择错误的实现，即使结果值看似正确。",
    evidence: "用 operation counter 验证 random-access 一次跳转、bidirectional 可反向、input 拒绝负距离，并跑复杂度回归。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "traits classes",
  "information about types",
  "iterator_traits",
  "tag dispatch",
] as const;

export function EcppTraitsInformationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="traits map：traits classes 统一提供 information about types；iterator_traits 通过主模板和 pointer partial specialization 适配类型，再用 tag dispatch 在编译期选择算法。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Traits information / dispatch map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">type facts → non-intrusive facade → capability overload</text>
          <g>
            <rect x="48" y="96" width="200" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="148" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">information about types</text>
            <text x="148" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">category / value</text>
            <text x="148" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">无 runtime state</text>
          </g>
          <path d="M248 152 H272" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M264 145 L276 152 L264 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="284" y="96" width="200" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="384" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">traits classes</text>
            <text x="384" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">primary + specializations</text>
            <text x="384" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">统一查询入口</text>
          </g>
          <path d="M484 152 H508" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M500 145 L512 152 L500 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="520" y="96" width="170" height="112" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="605" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">iterator_traits</text>
            <text x="605" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Iter / T*</text>
            <text x="605" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">pointer adaptation</text>
          </g>
          <path d="M690 152 H714" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M706 145 L718 152 L706 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="726" y="96" width="166" height="112" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="809" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">tag dispatch</text>
            <text x="809" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">overload set</text>
            <text x="809" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">complexity path</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">capability fact must be true, not merely compilable</text>
          <text x="180" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">input: ++</text>
          <text x="390" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">bidirectional: --</text>
          <text x="610" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">random: +=</text>
          <text x="800" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">measure operations</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">traits classes 描述能力，tag dispatch 消费能力；复杂度承诺也属于类型契约</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">traits 把类型事实集中到统一 facade，tag dispatch 再把事实转成编译期 overload 选择；错误 category 会造成复杂度契约破坏。</figcaption>
    </figure>
  );
}

export function EcppItem47TraitsLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 47 traits 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">类型事实实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个 iterator 能保证什么？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 traits 来源、category 和复杂度，再切换场景查看静态分派证据。</p></div>
        <button type="button" aria-label="重置 Item 47 traits 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 47 traits 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 traits 证据" : "查看 traits 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
