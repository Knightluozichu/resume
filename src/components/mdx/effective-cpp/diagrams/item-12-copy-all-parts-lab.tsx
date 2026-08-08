"use client";

import { useState } from "react";

type CopyScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly CopyScenario[] = [
  {
    label: "copy all parts of an object",
    observation: "完整对象不只有当前类字段，还包括 base class components、资源所有权与 derived cache state；遗漏一项也可能保留默认值或旧状态。",
    decision: "先画 copy coverage matrix，再为每个 base/member/resource 选择复制、失效、共享或禁止复制的语义；不要让 operator== 成为唯一 oracle。",
    evidence: "用不同 sentinel 初始化 Base、Derived、资源和缓存，逐项复制并修改目标；遗漏任何一项都应在独立检查器中显现。",
  },
  {
    label: "copy constructor / copy assignment",
    observation: "copy constructor 建立新对象，copy assignment 修改已有目标；前者不拥有 pre-existing target state，后者必须处理旧资源和异常保证。",
    decision: "Derived copy constructor 显式调用 Base copy，assignment 调用 Base::operator= 后再提交派生成员；不要让两个操作互相冒充。",
    evidence: "让源和目标从不同 sentinel 开始，并在第 N 个成员注入异常；构造失败自动清理已完成子对象，赋值则维持声明的目标保证。",
  },
  {
    label: "new data member",
    observation: "新增可默认构造的成员不会让编译器提醒手写 copy 漏字段，旧测试还可能因为默认值而误判通过。",
    decision: "优先 rule of zero 或 defaulted copy operation；若必须手写，就把新增字段加入矩阵、sentinel test、序列化 oracle 和 mutation test。",
    evidence: "先故意删除 new data member 的复制，再运行覆盖测试；独立 oracle 必须失败，恢复复制后 Base、Derived 与资源全部通过。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "copy all parts of an object",
  "copy constructor",
  "copy assignment",
  "base class components",
  "new data member",
] as const;

export function EcppItem12CopyAllPartsMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="copy all parts of an object 的覆盖路径：copy constructor 和 copy assignment 都要处理 base class components 与 new data member。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Complete copy coverage</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先覆盖对象模型，再选择每一项的独立、共享或失效语义</text>
          <g>
            <rect x="24" y="88" width="204" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="126" y="121" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">copy all parts of</text>
            <text x="126" y="141" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">an object</text>
            <text x="126" y="176" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">coverage matrix</text>
          </g>
          <path d="M228 147 H250" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M242 140 L254 147 L242 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="256" y="88" width="204" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="358" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">copy constructor</text>
            <text x="358" y="157" textAnchor="middle" fontSize="12" fill="var(--text-primary)">build new lifetime</text>
            <text x="358" y="182" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base&#123;rhs&#125; + members</text>
          </g>
          <path d="M460 147 H482" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M474 140 L486 147 L474 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="488" y="88" width="204" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="590" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">copy assignment</text>
            <text x="590" y="157" textAnchor="middle" fontSize="12" fill="var(--text-primary)">replace old state</text>
            <text x="590" y="182" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base::operator=</text>
          </g>
          <path d="M692 147 H714" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M706 140 L718 147 L706 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="720" y="88" width="196" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="818" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">base class components</text>
            <text x="818" y="157" textAnchor="middle" fontSize="12" fill="var(--text-primary)">resource / cache</text>
            <text x="818" y="182" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">new data member</text>
          </g>
          <line x1="24" y1="250" x2="916" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="140" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">deep copy</text>
          <text x="140" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">独立资源表示</text>
          <text x="365" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">shared copy</text>
          <text x="365" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">明确共享协议</text>
          <text x="595" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">sentinel state test</text>
          <text x="595" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">拒绝默认值假通过</text>
          <text x="815" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">rule of zero</text>
          <text x="815" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">结构演进自动覆盖</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">构造负责建立完整生命周期，赋值负责替换已有状态；两条路径都不能遗漏 base/member</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">复制覆盖矩阵把 base、member、资源与缓存显式列出，避免新增字段或继承层悄悄掉出 copying functions。</figcaption>
    </figure>
  );
}

export function EcppItem12CopyAllPartsLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 12 copy 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">完整复制覆盖实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：哪一项 copy 会被遗漏？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先区分构造与赋值的生命周期，再切换覆盖矩阵查看 sentinel 证据。</p></div>
        <button type="button" aria-label="重置实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 12 copy 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 copy 证据" : "查看 copy 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
