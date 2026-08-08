"use client";

import { useState } from "react";

type FederationScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly FederationScenario[] = [
  {
    label: "c / object-oriented c++",
    observation: "C API 只给 handle、长度和 destroy 函数；object-oriented c++ 需要把不变量和所有权放入一个可移动 owner。",
    decision: "在边界立刻绑定 deleter，公开借用的 span，不把 C handle 的释放权泄漏给容器或算法。",
    evidence: "注入 create 失败、构造异常、owner 移动和 vector 重分配，断言每个 handle 恰好 destroy 一次。",
  },
  {
    label: "template c++ / stl",
    observation: "template c++ 通过使用表达式形成隐式接口，stl 则以 range、iterator、algorithm 和 value semantics 组织数据处理。",
    decision: "让模板策略只依赖公开 value 接口，让 stl algorithm 消费 range；不要让算法触碰 C 表示或保存失效 iterator。",
    evidence: "用可移动 owner、不同 deleter 和排序/过滤算法编译同一测试；检查重分配后 owner 有效、算法不取得释放权。",
  },
  {
    label: "federation of languages / boundary adapter",
    observation: "同一函数可以跨多个次语言，但每次跨界都要翻译 ownership、error、range 和 invalidation 语义，而不是只换语法。",
    decision: "先标出主导次语言，再为每个边界写 owner、borrow、range、failure 和成本证据；性能假设必须用 profile 验证。",
    evidence: "用四列审查表记录代码区域、主导次语言、契约和证据，覆盖成功、失败、移动、重分配与销毁路径。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "federation of languages",
  "c",
  "object-oriented c++",
  "template c++",
  "stl",
] as const;

export function EcppLanguageFederationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="federation of languages 由 c、object-oriented c++、template c++ 和 stl 组成；边界适配器翻译 ownership、range、error 和成本契约。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">C++ federation / boundary translation</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">四套规则共享语法，但不共享默认契约</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="134" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">c</text>
            <text x="134" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">layout / handle</text>
            <text x="134" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">explicit protocol</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">object-oriented c++</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">invariant / ownership</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">runtime substitution</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">template c++</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">expression interface</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">compile-time family</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">stl</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">range / algorithm</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">value semantics</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="160" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">federation of languages</text>
          <text x="160" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">不是统一规则</text>
          <text x="420" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">boundary adapter</text>
          <text x="420" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">owner / borrow / range</text>
          <text x="680" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">evidence</text>
          <text x="680" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">failure / invalidation / cost</text>
          <text x="820" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">choose first</text>
          <text x="820" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">抽象随问题切换</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">跨边界先翻译契约，再讨论语法风格与性能；每个 owner 都只能释放一次</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">“语言联邦”是工程检查模型：先识别规则，再在边界翻译责任，最后用失败和性能证据验收。</figcaption>
    </figure>
  );
}

export function EcppItem01FederationLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 01 federation 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">跨次语言边界实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这条责任属于哪套规则？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 ownership、错误时机和成本模型，再切换场景查看边界证据。</p></div>
        <button type="button" aria-label="重置 Item 01 federation 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 01 federation 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 federation 证据" : "查看 federation 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
