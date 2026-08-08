"use client";

import { useState } from "react";

type ResourceScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly ResourceScenario[] = [
  {
    label: "objects to manage resources",
    observation: "raw acquire 后若先执行可能 return/throw 的业务语句，释放责任就藏在控制流里；early return、exception 和新增分支都可能制造 resource leak。",
    decision: "资源成功后立即构造 owner，把 release 绑定到对象生命周期；业务函数只接收借用引用，不把所有权留在注释里。",
    evidence: "在 audit、提前返回和异常注入三条路径运行 resource ledger；每个成功 acquire 都应有且只有一次 matching release。",
  },
  {
    label: "raii",
    observation: "raii 把 acquisition-is-initialization 与 destructor cleanup 绑定：局部 owner、lock_guard 和 scope guard 在作用域结束或 stack unwinding 时自动执行。",
    decision: "按声明顺序取得资源、按逆序释放；构造中途失败依靠已完成成员的析构回滚，不用手写 catch 清理列表。",
    evidence: "分别让 Session 的 socket、buffer、registration 第一步到第三步抛异常，观察此前 owner 逆序清理且未构造完整对象的 destructor 不被调用。",
  },
  {
    label: "smart pointer / resource leak",
    observation: "smart pointer 只有在 ownership 语义匹配时才是解法：unique_ptr 表示唯一 owner，shared_ptr 表示共同 owner，weak_ptr 只观察；错误选择仍会造成 resource leak 或环。",
    decision: "默认 value 或 unique ownership；共享生命周期才使用 shared_ptr，循环边改为 weak_ptr 或 aggregate owner，并为非 new 句柄配 custom deleter。",
    evidence: "比较独占 socket、共享纹理、父子图和只读参数；检查 move 后唯一释放、shared cycle 归零、borrow 不延长生命周期以及 paired release protocol。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "objects to manage resources",
  "raii",
  "smart pointer",
  "resource leak",
] as const;

export function EcppItem13ResourceManagingObjectsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="objects to manage resources 的 RAII 路径：获取后立即交给 raii 对象，由 smart pointer 或其他 owner 确定性清理，避免 resource leak。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Acquire / own / release</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">所有权在资源成功后立即进入对象生命周期</text>
          <g>
            <rect x="24" y="88" width="204" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="126" y="121" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">acquire</text>
            <text x="126" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">raw handle / lock</text>
            <text x="126" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">失败前不可泄漏</text>
          </g>
          <path d="M228 147 H250" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M242 140 L254 147 L242 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="256" y="88" width="204" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="358" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">objects to manage</text>
            <text x="358" y="141" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">resources</text>
            <text x="358" y="177" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">immediate owner</text>
          </g>
          <path d="M460 147 H482" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M474 140 L486 147 L474 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="488" y="88" width="204" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="590" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">raii</text>
            <text x="590" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">destructor cleanup</text>
            <text x="590" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">normal / exception</text>
          </g>
          <path d="M692 147 H714" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M706 140 L718 147 L706 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="720" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="818" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">smart pointer</text>
            <text x="818" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">unique / shared / weak</text>
            <text x="818" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">resource leak avoided</text>
          </g>
          <line x1="24" y1="250" x2="916" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="140" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">unique ownership</text>
          <text x="140" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">默认 owner</text>
          <text x="365" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">shared ownership</text>
          <text x="365" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">确有共同生命周期</text>
          <text x="595" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">custom deleter</text>
          <text x="595" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">匹配 release API</text>
          <text x="815" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">resource ledger</text>
          <text x="815" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">一次取得一次释放</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">RAII 不只是智能指针：它把资源、锁、注册状态与失败回滚都绑定到对象生命周期</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">资源获取成功后立即交给 owner，之后由对象析构统一覆盖 return、exception、cancel 与构造失败路径。</figcaption>
    </figure>
  );
}

export function EcppItem13ResourceManagingObjectsLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 13 resource 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">资源所有权实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：哪个退出路径会泄漏？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先判断 acquire 后是否立即进入 owner，再切换 RAII 与 smart pointer 策略查看证据。</p></div>
        <button type="button" aria-label="重置实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 13 resource 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 resource 证据" : "查看 resource 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
