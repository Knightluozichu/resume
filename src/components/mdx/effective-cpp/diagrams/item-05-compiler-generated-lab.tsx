"use client";

import { useState } from "react";

type GeneratedScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly GeneratedScenario[] = [
  {
    label: "functions c++ silently writes / compiler-generated functions",
    observation: "空 class 可能获得默认构造、析构、复制构造和复制赋值；现代 C++ 还要审查 move。隐式声明不等于可调用。",
    decision: "先列出六个特殊成员，再逐项追踪 base 与 member 的对应操作，最后决定 default、delete 或自定义。",
    evidence: "用 type traits 记录可构造/可复制/可移动能力，再用 InstrumentedMember 统计真实 ctor、copy、move、assign、dtor 调用。",
  },
  {
    label: "default constructor / destructor",
    observation: "user-declared constructor 会抑制 implicit default constructor；destructor 会清理成员，却不会因为存在 virtual function 自动 virtual。",
    decision: "把构造不变量、析构所有权和多态删除需求分开设计，不把“编译器能生成”当作语义证明。",
    evidence: "覆盖无参构造、不可默认构造成员、基类析构、构造异常和 polymorphic delete，检查对象始终可析构且资源释放一次。",
  },
  {
    label: "copy constructor / copy assignment",
    observation: "copy constructor 可以初始化 const 和 reference member；copy assignment 不能重新绑定 reference，也不能改写 const member。",
    decision: "把 memberwise copy 当作类型契约：raw pointer 只复制地址，NonCopyable 子对象会传播 deleted 能力。",
    evidence: "分别编译 copy construction、copy assignment、self-assignment 和 owning resource test，断言源目标关系与释放次数符合语义。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "functions c++ silently writes",
  "default constructor",
  "copy constructor",
  "copy assignment",
  "destructor",
  "compiler-generated functions",
] as const;

export function EcppCompilerGeneratedMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="functions c++ silently writes 形成 compiler-generated functions；default constructor、destructor、copy constructor 和 copy assignment 都由 base/member 能力约束，最终需要 traits 与运行时证据。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Special member generation map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">隐式声明 → 子对象传播 → 可调用性与真实行为</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="134" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">functions c++ silently writes</text>
            <text x="134" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">implicit declaration</text>
            <text x="134" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">six member decisions</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">default constructor</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">base + members</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">invariant at birth</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">copy constructor</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">initialize members</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">const / reference okay</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">compiler-generated functions</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">memberwise contract</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">default / deleted / custom</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">copy assignment</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">const / reference may delete</text>
          <text x="370" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">destructor</text>
          <text x="370" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">reverse cleanup</text>
          <text x="590" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">subobject ability</text>
          <text x="590" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">deleted propagates outward</text>
          <text x="810" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">evidence</text>
          <text x="810" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">traits + resource count</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">traits 证明“能否调用”，计数与失败注入证明“实际怎么做”</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">特殊成员不是隐藏魔法，而是由每个 base/member 的操作能力组合出来的接口契约。</figcaption>
    </figure>
  );
}

export function EcppItem05CompilerGeneratedLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 05 generated functions 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">特殊成员推导实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个操作会生成、删除还是调用复制？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 subobject 传播结果，再切换场景查看 traits 与运行时证据。</p></div>
        <button type="button" aria-label="重置 Item 05 generated functions 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 05 generated functions 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 generated functions 证据" : "查看 generated functions 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
