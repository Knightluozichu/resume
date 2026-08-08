"use client";

import { useState } from "react";

type GuaranteeScenario = {
  label: string;
  promise: string;
  design: string;
  evidence: string;
};

const SCENARIOS: readonly GuaranteeScenario[] = [
  {
    label: "no-leak / basic guarantee",
    promise: "异常后资源全部释放，对象仍满足 invariant，可析构、赋值和恢复；值可以部分改变。",
    design: "用 RAII cleanup boundary 管理 lock、memory 和 file，明确 partial progress contract。",
    evidence: "逐个 throw point 做 deterministic failure injection，检查 resource ledger、锁和 recovery API。",
  },
  {
    label: "strong guarantee / copy-and-swap",
    promise: "失败时所有可观察对象状态保持调用前值，成功时一次提交完整 candidate。",
    design: "先 prepare candidate，再以 noexcept commit 或 copy-and-swap 替换目标状态。",
    evidence: "在 decoder、allocation、copy constructor 注入异常，断言 old state、counter 和 version 不变。",
  },
  {
    label: "nothrow / external side effect",
    promise: "swap、rollback、destructor 等基础操作不让异常逃出；stream/database/network 另有边界。",
    design: "用 nothrow trait assertion 审核基础设施，外部副作用使用 transaction、outbox 或 compensation。",
    evidence: "分别记录 stream position、database row、outbox event 和 retry/cancellation，不能把内存 strong 冒充全局 strong。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "exception-safe code",
  "no-leak guarantee",
  "basic guarantee",
  "strong guarantee",
  "nothrow guarantee",
  "copy and swap",
] as const;

export function EcppExceptionGuaranteeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 940 390" role="img" aria-label="exception guarantee map：exception-safe code 先满足 no-leak guarantee，再根据契约选择 basic guarantee、strong guarantee 或 nothrow guarantee；copy and swap 通过 candidate 和 noexcept commit 构建强保证。" className="mx-auto block h-auto w-full max-w-[940px]">
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Exception guarantee ladder</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">no leak → valid state → commit or rollback → no throw</text>
          <g>
            <rect x="48" y="96" width="190" height="104" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="143" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">no-leak guarantee</text>
            <text x="143" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">RAII cleanup</text>
            <text x="143" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">资源 owner 闭合</text>
          </g>
          <path d="M238 148 H280" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M272 141 L284 148 L272 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="290" y="96" width="180" height="104" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="380" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">basic guarantee</text>
            <text x="380" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">valid state</text>
            <text x="380" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">值可部分改变</text>
          </g>
          <path d="M470 148 H512" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M504 141 L516 148 L504 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="522" y="96" width="180" height="104" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="612" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">strong guarantee</text>
            <text x="612" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">copy and swap</text>
            <text x="612" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">commit or rollback</text>
          </g>
          <path d="M702 148 H744" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M736 141 L748 148 L736 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="754" y="96" width="138" height="104" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="823" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">nothrow</text>
            <text x="823" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">swap / release</text>
            <text x="823" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">不让异常逃出</text>
          </g>
          <line x1="48" y1="252" x2="892" y2="252" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">外部副作用另立边界</text>
          <text x="190" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">stream position</text><text x="390" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">database transaction</text><text x="590" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">transactional outbox</text><text x="790" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">compensation</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">内存对象 strong 不等于跨系统操作 strong；逐个 throw point 记录状态轨迹</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">RAII 先建立 no-leak floor，再按契约选择 basic、strong 或 nothrow；跨系统副作用需事务、outbox 或补偿。</figcaption>
    </figure>
  );
}

export function EcppItem29ExceptionSafeLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 29 exception guarantee 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">失败状态实验</p><h2 className="mt-1 text-lg font-semibold text-primary">异常后究竟保证什么</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测第 N 个 throw point 后的资源、对象值和外部状态，再切换保证等级查看验证产物。</p></div>
        <button type="button" aria-label="重置 Item 29 exception guarantee 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 29 guarantee 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">保证承诺</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.promise}</p><p className="mt-4 text-xs font-medium text-warning">设计</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.design}</p></div>
        <div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.promise}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起异常证据" : "查看异常证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div>
      </div>
    </section>
  );
}
