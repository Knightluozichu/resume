"use client";

import { useState } from "react";

type CleanupScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly CleanupScenario[] = [
  {
    label: "prevent exceptions from leaving destructors / stack unwinding",
    observation: "stack unwinding 已在传播 primary exception；destructor 再抛 secondary exception 会让运行时无法选择，通常直接 terminate。",
    decision: "在 destructor 建立 no-throw boundary，catch all 并执行不会再抛的记录、回滚或终止策略；可恢复失败交给显式 close。",
    evidence: "子进程先抛 primary exception，再注入 cleanup failure；旧实现观察 terminate，修复后 primary exception 能到达外层 catch。",
  },
  {
    label: "close function / swallow exception",
    observation: "close function 在正常控制流中运行，调用方能 catch、retry 或报告；destructor 只负责忘记 close 时的最后 fallback。",
    decision: "close 成功后提交 Closed 状态且幂等；destructor fallback swallow exception 并记录，但记录通道自身必须 no-throw。",
    evidence: "测试显式 close 失败可观察、成功后 destructor 不重复关闭、忘记 close 时只执行一次 fallback，并检查状态仍可析构。",
  },
  {
    label: "终止程序 / process-critical invariant",
    observation: "若 rollback 或清理失败会破坏 process-critical invariant，静默吞掉异常会让程序带着错误状态继续运行。",
    decision: "正常调用方先获得显式处理机会；在 destructor 的不可恢复 fallback 中记录最少信息并明确终止程序。",
    evidence: "独立进程安装 terminate handler，验证退出码、日志和资源计数；将 best-effort cleanup 与 critical cleanup 分开测试。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "prevent exceptions from leaving destructors",
  "stack unwinding",
  "close function",
  "swallow exception",
  "终止程序",
] as const;

export function EcppDestructorExceptionsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="prevent exceptions from leaving destructors：stack unwinding 期间不要让 secondary exception 逃出；close function 在正常控制流报告失败，destructor 可 swallow exception 或在核心不变量破坏时终止程序。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Destructor failure / no-throw strategy</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">正常控制流报告失败，析构边界只做最终策略</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="134" y="119" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">prevent exceptions from</text>
            <text x="134" y="139" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">leaving destructors</text>
            <text x="134" y="169" textAnchor="middle" fontSize="12" fill="var(--text-primary)">no-throw boundary</text>
            <text x="134" y="190" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">catch all / strategy</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">stack unwinding</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">primary + secondary</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">terminate risk</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">close function</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">observable failure</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">retry / commit state</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">swallow exception</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">record / rollback</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">或终止程序</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">idempotent close</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">成功才 Closed</text>
          <text x="390" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">destructor fallback</text>
          <text x="390" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">不得再抛</text>
          <text x="630" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">process-critical invariant</text>
          <text x="630" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">决定是否终止</text>
          <text x="820" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">test process</text>
          <text x="820" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">独立进程退出码</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">析构不负责报告业务失败；它只负责在生命周期边界维持 no-throw 和不变量</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">把可观察错误移到 close/commit，把析构保留为不抛的最后防线，并用独立进程验证 terminate 策略。</figcaption>
    </figure>
  );
}

export function EcppItem08DestructorExceptionsLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 08 destructor exceptions 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">析构异常策略实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：清理失败该报告、吞掉还是终止？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测异常传播路径和状态提交，再切换场景查看 no-throw 证据。</p></div>
        <button type="button" aria-label="重置 Item 08 destructor exceptions 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 08 destructor exceptions 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 cleanup 证据" : "查看 cleanup 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
