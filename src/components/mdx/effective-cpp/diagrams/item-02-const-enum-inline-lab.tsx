"use client";

import { useState } from "react";

type MacroScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly MacroScenario[] = [
  {
    label: "#define / const constant",
    observation: "#define 只替换 token，没有 type、scope 或 symbol；const constant 把值带回 compiler 能检查的语言世界。",
    decision: "数字和字符串常量优先用 const、constexpr 或 string_view；需要程序级身份时选择 inline variable，并明确 linkage。",
    evidence: "编译两个 translation units，分别检查类型、值、地址身份和 ODR-use；确认头文件不会产生 multiple definition。",
  },
  {
    label: "enum hack / prefer consts enums and inlines",
    observation: "enum hack 能提供类作用域整数且不能取地址，适合解释旧代码；现代代码应根据 storage、类型和身份需求选择实体。",
    decision: "数组界限等旧式常量可读 enum hack，但新代码优先 static constexpr；跨文件共享定义优先 inline constexpr。",
    evidence: "同时测试数组 bound、取地址和模板参数：enum hack 应拒绝地址需求，inline constexpr 应保持统一实体身份。",
  },
  {
    label: "#define / inline function template",
    observation: "函数式宏可能重复求值并污染 token；inline function template 保留参数类型、作用域、诊断和单次求值语义。",
    decision: "用带副作用实参的测试驱动迁移，按值/引用重新设计返回生命周期，不要只给宏参数加括号。",
    evidence: "以 ++x、混合类型和临时值覆盖宏与模板，记录求值次数、比较次数、诊断位置和返回对象生命周期。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "prefer consts enums and inlines",
  "#define",
  "const constant",
  "enum hack",
] as const;

export function EcppConstEnumInlineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="prefer consts enums and inlines：把 #define token 替换为 const constant、constexpr、enum hack 或 inline 实体，并用类型、作用域、ODR 和副作用证据验收。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Macro migration / language entity map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">token 替换 → 类型实体 → 作用域、身份与求值证据</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="134" y="121" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--danger)">#define</text>
            <text x="134" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">token substitution</text>
            <text x="134" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">no type / scope</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">const constant</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">type + namespace</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">value / address</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">enum hack</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">legacy integral bound</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">no address identity</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">prefer consts enums and inlines</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">choose by contract</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">not by token count</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="150" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">type</text>
          <text x="150" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">compiler checks</text>
          <text x="370" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">scope</text>
          <text x="370" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">namespace / class</text>
          <text x="590" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">identity</text>
          <text x="590" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">linkage / ODR-use</text>
          <text x="810" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">evaluation</text>
          <text x="810" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">once / side effect</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">替换成功的证据不是宏数量减少，而是类型、身份、求值次数和诊断都可验证</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">把宏迁移成语言实体时，分别检查类型、作用域、链接身份和副作用；不同需求对应不同替代物。</figcaption>
    </figure>
  );
}

export function EcppItem02ConstEnumInlineLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 02 macro 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">宏迁移诊断实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：替代后改变了哪条语义？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测类型、地址身份和实参求值次数，再切换场景查看迁移证据。</p></div>
        <button type="button" aria-label="重置 Item 02 macro 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 02 macro 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 macro 证据" : "查看 macro 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
