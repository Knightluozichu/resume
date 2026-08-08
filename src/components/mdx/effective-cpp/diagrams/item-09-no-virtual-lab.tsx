"use client";

import { useState } from "react";

type LifecycleScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly LifecycleScenario[] = [
  {
    label: "virtual functions during construction or destruction / base constructor",
    observation: "base constructor 调 virtual 时，派生成员尚未构造；析构退回基类时，派生成员已经销毁。两侧都不是完整对象状态。",
    decision: "移除构造/析构期间的 virtual 依赖；把必要数据作为普通参数传入 Base，或将行为推迟到完整构造之后。",
    evidence: "在 Base、Derived、helper 和 NVI 中放置 ready probe，断言构造/析构阶段不会进入派生 override 或读取未准备成员。",
  },
  {
    label: "dynamic type / phase-limited dispatch",
    observation: "dynamic type 在构造时逐层扩展、析构时逐层收缩；helper、lambda、callback 和 NVI 不会绕过 phase-limited dispatch。",
    decision: "审计从 constructor/destructor 出发的完整调用图，尤其检查 this escape、注册 observer 与线程立即回调。",
    evidence: "覆盖 direct、helper、callback 和 pure virtual call 路径，记录当前层级、成员 ready 状态和线程可见性。",
  },
  {
    label: "base constructor / post-construction start",
    observation: "需要最派生行为时，base constructor 不是合适时机；post-construction start 应在完整构造后执行并且失败不发布。",
    decision: "factory 创建 candidate、调用 start、成功后才交给外部 owner；状态机限制重复 start、失败回滚和 stop 顺序。",
    evidence: "注入 start 失败与 callback race，检查 candidate RAII 销毁、外部不可见、订阅先于成员销毁注销。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "virtual functions during construction or destruction",
  "dynamic type",
  "base constructor",
] as const;

export function EcppNoVirtualLifecycleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="virtual functions during construction or destruction 的生命周期图：base constructor 期间 dynamic type 仍在扩展，析构期间逐层收缩；完整对象后才可由 factory 执行 post-construction start。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Lifecycle dispatch / safe start</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">未构造与已销毁的层级不能承载最派生行为</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="134" y="119" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">virtual functions during</text>
            <text x="134" y="139" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">construction or destruction</text>
            <text x="134" y="169" textAnchor="middle" fontSize="12" fill="var(--text-primary)">phase-limited</text>
            <text x="134" y="190" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">no derived state</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">base constructor</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Base dispatch only</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">members not ready</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">dynamic type</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">expands / contracts</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">construct / destroy</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">post-construction start</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">factory owns candidate</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">publish after success</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">indirect virtual call</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">helper / NVI / callback</text>
          <text x="390" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">this escape</text>
          <text x="390" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">提前发布风险</text>
          <text x="630" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">fully constructed</text>
          <text x="630" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">virtual safe window</text>
          <text x="820" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">rollback</text>
          <text x="820" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">failure not published</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">移除危险调用只是第一步；factory 还必须保证状态、回滚和 callback publication 顺序</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">生命周期阶段决定可见的动态类型；需要最派生行为时，把调用推迟到完整构造并由 factory 原子发布。</figcaption>
    </figure>
  );
}

export function EcppItem09NoVirtualLifecycleLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 09 lifecycle 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">生命周期 dispatch 实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个 virtual call 现在安全吗？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测当前层级、成员 ready 状态和发布时机，再切换场景查看证据。</p></div>
        <button type="button" aria-label="重置 Item 09 lifecycle 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 09 lifecycle 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 lifecycle 证据" : "查看 lifecycle 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
