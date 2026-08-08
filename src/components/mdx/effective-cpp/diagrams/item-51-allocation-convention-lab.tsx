"use client";

import { useState } from "react";

type AllocationScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly AllocationScenario[] = [
  {
    label: "convention when writing new and delete / zero byte request",
    observation: "先预测 operator new(0) 的成功契约：throwing form 仍需返回可释放的 non-null storage，而不是把零请求变成静默失败。",
    decision: "先做 zero byte request normalization，再走与普通请求相同的对齐、失败和 matching delete 路径。",
    evidence: "failure injection 覆盖 size 0、首次成功和释放；检查返回地址非空、满足 alignment，并由同一 allocation family 释放。",
  },
  {
    label: "new-handler / infinite loop",
    observation: "allocation 失败后 new-handler 可以释放 reserve 并返回，也可能什么都不改变；后者若无界重试就是 infinite loop。",
    decision: "handler 返回代表它承诺条件已改变，allocation function 必须重试；测试要限制尝试次数并单独验证 bad_alloc 边界。",
    evidence: "记录 handler 调用次数、资源释放和最终结果；把无改变 handler 放入受控 harness，不能让 CI 真正挂死。",
  },
  {
    label: "base class operator new / size mismatch delegation",
    observation: "Derived 没有自己的 allocator 时可能继承 base class operator new，但传入的是 derived size；固定 Base block 会造成越界。",
    decision: "只有 size 精确匹配 Base 才走 pool，其他请求 delegate 到 global allocator；sized delete 必须镜像来源。",
    evidence: "分别构造 Base、Derived、array 和 over-aligned object，记录 pool/global domain、size、alignment 与 constructor-failure cleanup。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "convention when writing new and delete",
  "zero byte request",
  "new-handler",
  "infinite loop",
  "base class operator new",
] as const;

export function EcppAllocationConventionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="convention when writing new and delete 的契约流程：zero byte request 先正规化，失败进入 new-handler 重试；避免 infinite loop，并让 base class operator new 对 size mismatch 转交通用 allocator。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Allocation convention / source mirror</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">请求边界 → 失败策略 → 尺寸路由 → matching delete</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="134" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">zero byte request</text>
            <text x="134" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">normalize to one byte</text>
            <text x="134" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">non-null + aligned</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">new-handler</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">retry or throw</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">handler must change state</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">infinite loop</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">no-progress guard</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">bounded failure test</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">base class operator new</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">exact size → pool</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">other size → global</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">new expression</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">allocate before construct</text>
          <text x="390" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">allocator identity</text>
          <text x="390" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">pool / global / aligned</text>
          <text x="630" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">matching delete</text>
          <text x="630" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">null no-op + noexcept</text>
          <text x="820" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">test matrix</text>
          <text x="820" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">size / array / failure</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每个 allocation form 都要有可匹配的释放路径；尺寸信息不是 allocator 来源的唯一证据</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">图把 Item 51 的核心契约压成一条可检查路径：边界输入、失败处理、继承尺寸和释放来源必须同时成立。</figcaption>
    </figure>
  );
}

export function EcppItem51AllocationLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 51 allocation 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">new/delete 契约实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：失败或派生尺寸会走哪条路径？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 allocator domain、重试边界和 matching delete，再切换场景查看证据。</p></div>
        <button type="button" aria-label="重置 Item 51 allocation 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 51 allocation 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 allocation 证据" : "查看 allocation 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
