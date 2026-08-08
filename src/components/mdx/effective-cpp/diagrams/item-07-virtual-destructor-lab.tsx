"use client";

import { useState } from "react";

type DestructorScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly DestructorScenario[] = [
  {
    label: "destructors virtual in polymorphic base classes / virtual destructor",
    observation: "只要对象可能经 base pointer 删除，destructors virtual in polymorphic base classes 就是所有权契约，而不是日志风格。",
    decision: "public virtual destructor 让 delete Base* 按动态类型进入最派生析构，再逆序清理成员和基类。",
    evidence: "factory 返回 unique_ptr<Base>，用 has_virtual_destructor、派生资源计数和 sanitizer 验证完整链路。",
  },
  {
    label: "delete through base pointer / dynamic destruction chain",
    observation: "delete through base pointer 同时受 static type 与 dynamic type 影响；非 virtual destructor 的测试可能暂时不崩，但行为已未定义。",
    decision: "把派生 body、成员 probe、基类 body 的顺序写进测试，不能以 allocator 恰好容忍替代契约。",
    evidence: "记录 Derived member、Derived body、Base member、Base body 的顺序，断言每个资源恰好释放一次。",
  },
  {
    label: "virtual destructor / destroy function",
    observation: "跨 DLL/共享库时，virtual destructor 解决层次销毁，destroy function 解决 allocator/CRT 与 ABI 边界；两者不能混为一谈。",
    decision: "由创建模块提供 noexcept destroy，并用 custom deleter 回到同一模块；模块内部仍保持正确 virtual chain。",
    evidence: "覆盖 create 失败、插件卸载前销毁、allocator identity 和异常路径，验证没有跨模块 delete。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "destructors virtual in polymorphic base classes",
  "virtual destructor",
  "delete through base pointer",
] as const;

export function EcppVirtualDestructorMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="destructors virtual in polymorphic base classes 通过 virtual destructor 支持 delete through base pointer；动态类型进入 dynamic destruction chain，跨模块可用 destroy function 配对 allocator。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Polymorphic deletion / destruction chain</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">静态接口 → 动态析构 → allocator 与 ABI 归属</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="134" y="119" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">destructors virtual in</text>
            <text x="134" y="139" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">polymorphic base classes</text>
            <text x="134" y="169" textAnchor="middle" fontSize="12" fill="var(--text-primary)">ownership contract</text>
            <text x="134" y="190" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base* can own</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">virtual destructor</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">dynamic dispatch</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">complete cleanup</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">delete through base pointer</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">static + dynamic type</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Derived → Base</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">destroy function</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">module-owned free</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">custom deleter</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">dynamic destruction chain</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Derived → members → Base</text>
          <text x="400" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">public virtual</text>
          <text x="400" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base owner allowed</text>
          <text x="650" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">protected non-virtual</text>
          <text x="650" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base delete blocked</text>
          <text x="820" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">ABI evidence</text>
          <text x="820" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">allocator identity</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">virtual destructor 解决层次，destroy function 解决模块；两条 ownership 契约都必须可测试</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">virtual destructor 与 destroy function 关注不同边界：前者保证析构链，后者保证创建模块与释放模块配对。</figcaption>
    </figure>
  );
}

export function EcppItem07VirtualDestructorLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 07 virtual destructor 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">多态销毁实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：delete Base* 会走到哪里？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测静态/动态类型和 allocator 归属，再切换场景查看析构链证据。</p></div>
        <button type="button" aria-label="重置 Item 07 virtual destructor 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 07 virtual destructor 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 destructor 证据" : "查看 destructor 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
