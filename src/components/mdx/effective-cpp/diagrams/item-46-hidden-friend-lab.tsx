"use client";

import { useState } from "react";

type HiddenFriendScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly HiddenFriendScenario[] = [
  {
    label: "template argument deduction / type conversions are desired",
    observation: "Rational<int> * 2 先要形成 operator<T> specialization；第二参数 int 不能在 deduction 阶段靠用户定义转换匹配 Rational<T>。",
    decision: "把 deduction failure 与 ordinary overload conversion 分成两个阶段；不要要求客户显式写 operator*<int>。",
    evidence: "compile-fail 测试标出 deduction 阶段，随后用已经确定的 Rational<int> 参数验证 constructor conversion 何时发生。",
  },
  {
    label: "non-member functions inside templates / friend function",
    observation: "class template 内定义的 non-template friend 随 Rational<T> specialization 生成 concrete ordinary operator，两个 operand 都能参与转换。",
    decision: "让 friend function 作为 ADL/conversion boundary，保留 `Rational * scalar` 与 `scalar * Rational` 的对称接口。",
    evidence: "分别编译运行左右 operand orders，检查 `friend Rational operator*` 的 concrete symbol、ODR 和不可转换 scalar 的拒绝。",
  },
  {
    label: "friend function / helper boundary",
    observation: "friend 不必承载重算法；可以校验 private invariant 后调用 observer-based helper，减少 class body 与 private coupling。",
    decision: "把 helper 的访问边界写清楚：public observer、受限 friend 或 value snapshot，不能为了方便放宽所有隐式转换。",
    evidence: "多 TU 链接、normalized invariant、异常和 heterogeneous type policy 一起测试，确保 ADL 入口与算法实现分层。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "non-member functions inside templates",
  "type conversions are desired",
  "friend function",
  "template argument deduction",
] as const;

export function EcppHiddenFriendConversionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="hidden friend conversion map：template argument deduction 先于 ordinary conversion；当 type conversions are desired 时，在 non-member functions inside templates 中定义具体 friend function，让 ADL 找到并完成对称转换。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Hidden friend conversion map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">candidate formation → ADL lookup → ordinary conversion</text>
          <g>
            <rect x="48" y="96" width="252" height="112" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="174" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">template argument deduction</text>
            <text x="174" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Rational&lt;T&gt; + int</text>
            <text x="174" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">conversion not yet</text>
          </g>
          <path d="M300 152 H332" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M324 145 L336 152 L324 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="344" y="96" width="252" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="470" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">type conversions are desired</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">candidate is concrete</text>
            <text x="470" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">overload resolution</text>
          </g>
          <path d="M596 152 H628" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M620 145 L632 152 L620 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="640" y="96" width="252" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="766" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">friend function</text>
            <text x="766" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">ADL finds hidden friend</text>
            <text x="766" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">左右 operand 对称</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">non-member functions inside templates</text>
          <text x="170" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Rational * scalar</text>
          <text x="390" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">scalar * Rational</text>
          <text x="610" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">inline concrete body</text>
          <text x="800" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">ODR / link test</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先形成具体候选，再允许用户定义转换；不要把 deduction 与 conversion 混成一步</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">hidden friend 让 class specialization 生成具体 non-template operator，ADL 找到它后才进入普通转换序列。</figcaption>
    </figure>
  );
}

export function EcppItem46HiddenFriendLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 46 hidden friend 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">转换阶段实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：转换在哪一步才会发生？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 deduction、ADL 和 overload conversion 的顺序，再切换场景查看证据。</p></div>
        <button type="button" aria-label="重置 Item 46 hidden friend 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 46 hidden friend 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 friend 证据" : "查看 friend 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
