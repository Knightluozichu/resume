"use client";

import { useState } from "react";

type DeletionScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly DeletionScenario[] = [
  {
    label: "disallow compiler-generated functions / uncopyable",
    observation: "身份对象和独占资源不应被默认 memberwise copy；uncopyable 是旧式组合手段，但它只通过能力传播间接禁止复制。",
    decision: "先按 value、unique owner、shared owner、view、identity 建立 capability matrix，再决定 copy/move 是 default 还是 delete。",
    evidence: "traits 验证 copy/move 能力，compile-fail fixture 覆盖普通调用、member、friend 和模板实例，资源测试验证没有重复释放。",
  },
  {
    label: "private copy constructor / deleted function",
    observation: "private copy constructor 让普通调用在访问检查阶段失败，但 member/friend 可能走到 link-time failure；deleted function 则统一在调用点诊断。",
    decision: "迁移旧代码时搜索所有 friend/member 复制路径；现代接口把 deleted function 放在 public，明确表达不存在合法调用者。",
    evidence: "分别编译 public、friend、member 和派生复制尝试，比较错误阶段与消息位置，并记录 ABI 变化风险。",
  },
  {
    label: "= delete / forbidden conversion",
    observation: "= delete 不只禁 copy/move，也能删除 char、bool、double 等危险隐式转换，让重载解析在调用点选择明确失败。",
    decision: "保留正向 overload，再为不允许的类型写 deleted overload 或 constrained deleted template。",
    evidence: "compile-fail 测试覆盖每种被拒绝类型，正向 int 调用仍通过；traits/concepts 检查能力矩阵没有被容器便利反向改变。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "disallow compiler-generated functions",
  "private copy constructor",
  "deleted function",
  "= delete",
  "uncopyable",
] as const;

export function EcppDisallowGeneratedMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="disallow compiler-generated functions 的迁移路径：private copy constructor 和 uncopyable 可能把错误延迟到链接，deleted function 与 = delete 在调用点形成禁止契约。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Deletion contract / diagnostic phase map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">语义决策 → 访问/链接差异 → 调用点禁止 → 负向证据</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="134" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">disallow compiler-generated functions</text>
            <text x="134" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">capability matrix</text>
            <text x="134" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">value / owner / identity</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">private copy constructor</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">access failure</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">friend may link-fail</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">deleted function</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">call-site diagnostic</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">member + friend blocked</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--danger)">= delete</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">copy / convert</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">explicit contract</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">uncopyable</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">旧式能力传播</text>
          <text x="370" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">compile-fail</text>
          <text x="370" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">负向测试为真</text>
          <text x="590" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">forbidden conversion</text>
          <text x="590" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">精确 overload 被拒绝</text>
          <text x="810" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">container fit</text>
          <text x="810" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">语义优先于便利</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">禁止契约要同时证明能力矩阵、诊断阶段和资源不变量</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从 private/Uncopyable 迁移到 deleted 时，真正升级的是诊断位置与契约可见性。</figcaption>
    </figure>
  );
}

export function EcppItem06DisallowGeneratedLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 06 deletion 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">禁止契约实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：错误会在哪个阶段被挡住？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 copy/move 能力和诊断阶段，再切换场景查看负向测试证据。</p></div>
        <button type="button" aria-label="重置 Item 06 deletion 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 06 deletion 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 deletion 证据" : "查看 deletion 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
