"use client";

import { useState } from "react";

type CopyPolicyScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly CopyPolicyScenario[] = [
  {
    label: "copying behavior in resource-managing classes",
    observation: "resource-managing class 的复制不是默认语法问题，而是资源身份、可变性和释放责任的业务策略；错误复制 Lock 可能让两个 destructor 操作同一责任。",
    decision: "先为资源写复制策略，再决定特殊成员：prohibit copying、reference counting、deep copy 或 transfer ownership；copy 与 move 分开审查。",
    evidence: "用资源地址、内容、owner count 和 release 次数建立 resource-copy ledger，逐项预测复制、移动和最后销毁的结果。",
  },
  {
    label: "prohibit copying / reference counting",
    observation: "身份绑定的锁、事务和唯一 token 没有独立副本，应 prohibit copying；不可变纹理等确有共同生命周期时，reference counting 才表达正确语义。",
    decision: "删除 copy constructor/assignment 或封装 shared owner；共享图的反向边使用 weak observation，不能把 shared_ptr 当成通用防漏工具。",
    evidence: "检查禁止复制的 compile-fail、共享副本地址与 strong count、最后 owner 的单次 release，以及 Parent/Child 环在 weak 改造后归零。",
  },
  {
    label: "deep copy / transfer ownership",
    observation: "editable image 需要 deep copy，使源和目标内容等价但资源身份独立；file handle 等唯一资源则应 transfer ownership，源进入有效空状态。",
    decision: "clone 先建立 owned candidate，再 swap 提交以保持异常安全；独占 owner 删除 copy、显式支持 noexcept move，不能让 copy-as-transfer 偷换语义。",
    evidence: "注入 clone 失败时目标保持原资源；成功 deep copy 后修改目标不影响源；move 后目标取得原地址且源可析构、可重新赋值。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "copying behavior in resource-managing classes",
  "prohibit copying",
  "reference counting",
  "deep copy",
  "transfer ownership",
] as const;

export function EcppItem14ResourceCopyingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="copying behavior in resource-managing classes 的策略图：先在 prohibit copying、reference counting、deep copy 与 transfer ownership 之间选择，再验证资源身份。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Resource copy policy</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">复制语法必须服从所有权、可变性与释放责任</text>
          <g>
            <rect x="24" y="88" width="204" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="126" y="119" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">copying behavior in</text>
            <text x="126" y="139" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">resource-managing classes</text>
            <text x="126" y="177" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">policy first</text>
          </g>
          <path d="M228 147 H250" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M242 140 L254 147 L242 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="256" y="88" width="204" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="358" y="121" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">prohibit copying</text>
            <text x="358" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">identity-bound</text>
            <text x="358" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">delete copy</text>
          </g>
          <path d="M460 147 H482" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M474 140 L486 147 L474 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="488" y="88" width="204" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="590" y="121" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">reference counting</text>
            <text x="590" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">shared identity</text>
            <text x="590" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">weak breaks cycles</text>
          </g>
          <path d="M692 147 H714" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M706 140 L718 147 L706 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="720" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="818" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">deep copy</text>
            <text x="818" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">independent identity</text>
            <text x="818" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">or transfer ownership</text>
          </g>
          <line x1="24" y1="250" x2="916" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="140" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">copy</text>
          <text x="140" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">source remains owner</text>
          <text x="365" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">move</text>
          <text x="365" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">source valid empty</text>
          <text x="595" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">owned candidate</text>
          <text x="595" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">失败时目标不变</text>
          <text x="815" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">resource ledger</text>
          <text x="815" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">身份 / 计数 / release</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">同一资源共享、独立克隆或转移责任，必须在接口和测试中显式表达</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先确定资源复制策略，再实现特殊成员；copy、move、计数、克隆和释放次数都要有可观察证据。</figcaption>
    </figure>
  );
}

export function EcppItem14ResourceCopyingLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 14 copy policy 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">资源复制策略实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：复制后谁还负责释放？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先判断资源身份与所有权方向，再切换策略查看 copy、move 和异常路径证据。</p></div>
        <button type="button" aria-label="重置实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 14 copy policy 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 copy policy 证据" : "查看 copy policy 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
