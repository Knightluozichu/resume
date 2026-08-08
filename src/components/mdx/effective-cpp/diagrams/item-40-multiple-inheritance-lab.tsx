"use client";

import { useState } from "react";

type MultipleInheritanceScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly MultipleInheritanceScenario[] = [
  {
    label: "ambiguity / qualified wrapper",
    observation: "两个 base scope 都有 checkOut 时，名字查找先收集两个候选，再检查 access；private 候选也不会自动消失。",
    decision: "在 derived wrapper 中写限定调用或 selective using；对客户暴露 borrow 这类意图 API，而不是让每个客户了解继承图。",
    evidence: "测试未限定调用保持 compile-negative，wrapper 固定 BorrowableItem::checkOut；base 新增 overload 后继续跑 lookup audit。",
  },
  {
    label: "diamond / virtual inheritance",
    observation: "普通 diamond 产生两份共同 base subobject；若需求只有一个 root identity，File/path 可能因两份 state 分裂。",
    decision: "仅在共享 identity 是真实需求时采用 virtual inheritance，并让 most-derived constructor 初始化 virtual base；否则改用 composition。",
    evidence: "测量 subobject 数量、path 一致性、sizeof/alignof、构造异常与 ABI；记录 virtual-base offset metadata 的成本。",
  },
  {
    label: "interface class / public private inheritance",
    observation: "一个 public interface class 可以表达客户 is-a，另一个 private implementation base 可提供算法与 virtual hooks；两条 edge 语义不同。",
    decision: "分别验证 public substitutability 和 private implementation protocol；若只是调用 public API，优先 composition/nested adapter。",
    evidence: "经 interface base 做 contract suite，检查 private base 不可向客户转换，并比较 adapter 的 back-reference、生命周期和替换成本。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "multiple inheritance judiciously",
  "ambiguity",
  "virtual inheritance",
  "diamond",
  "interface class",
  "public private inheritance",
] as const;

export function EcppMultipleInheritanceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="multiple inheritance judiciously map：先处理 ambiguity，再判断 diamond 是否需要 virtual inheritance；正交 interface class 可 public 继承，implementation base 可 private 继承。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Multiple inheritance decision map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">lookup → identity → contract edges → measured layout</text>
          <g>
            <rect x="48" y="96" width="196" height="112" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="146" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">ambiguity</text>
            <text x="146" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">two base scopes</text>
            <text x="146" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">qualify / wrapper</text>
          </g>
          <path d="M244 152 H270" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M262 145 L274 152 L262 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="282" y="96" width="196" height="112" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="380" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">diamond</text>
            <text x="380" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">duplicated root</text>
            <text x="380" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">one identity?</text>
          </g>
          <path d="M478 152 H504" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M496 145 L508 152 L496 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="516" y="96" width="196" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="614" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">virtual inheritance</text>
            <text x="614" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">shared virtual base</text>
            <text x="614" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">most-derived init</text>
          </g>
          <path d="M712 152 H738" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M730 145 L742 152 L730 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="750" y="96" width="142" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="821" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">interface class</text>
            <text x="821" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">public</text>
            <text x="821" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">private impl</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">public private inheritance edges need separate contracts</text>
          <text x="180" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">public is-a</text>
          <text x="380" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">private implementation</text>
          <text x="610" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">composition alternative</text>
          <text x="800" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">ABI / layout test</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">multiple inheritance judiciously = every edge, state identity and construction cost is explicit</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">多继承不是一个整体开关：先消歧，再判断共同身份，最后分别证明 public interface 与 private implementation 的契约。</figcaption>
    </figure>
  );
}

export function EcppItem40MultipleInheritanceLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 40 multiple inheritance 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">多继承审查实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这条继承边增加了什么？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测名字解析、root identity 和 public/private contract，再切换场景查看审查证据。</p></div>
        <button type="button" aria-label="重置 Item 40 multiple inheritance 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 40 multiple inheritance 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起多继承证据" : "查看多继承证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
