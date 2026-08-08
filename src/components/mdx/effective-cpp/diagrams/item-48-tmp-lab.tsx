"use client";

import { useState } from "react";

type TmpScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly TmpScenario[] = [
  {
    label: "template metaprogramming / compile-time computation",
    observation: "输入是类型和常量，Factorial 的递归实例化会在 compiler 运行前构造结果；先预测运行期是否还需要 loop。",
    decision: "把递归步骤与 terminal specialization 分开，确认 value 能折叠为常量，同时记录 build time 和诊断成本。",
    evidence: "检查 static_assert(Factorial<5>::value == 120) 与生成的 runtime symbols；结果只留下常量，不留下递归调用。",
  },
  {
    label: "factorial / type selection",
    observation: "factorial 不只能产出 value，也可作为选择模型的测试样例；type selection 应由 compile-time boolean 决定，而不是运行期 if。",
    decision: "用 primary template 和 false specialization 表示两条类型路径，给每条路径命名 alias，并在入口处约束非法组合。",
    evidence: "分别验证 true/false 的 selected type，覆盖 Factorial 的 base case，并用 static_assert 证明选择发生在编译期。",
  },
  {
    label: "policy choices / custom code generation",
    observation: "多个 policy arguments 会形成多个具体类型；compiler 可内联选择后的行为，但每个组合都可能增加 instantiation 和 binary code。",
    decision: "只把稳定、可测的正交行为交给 policy choices；对纯整数循环先比较 constexpr 与 TMP 的构建和运行数据。",
    evidence: "记录组合数量、clean/incremental build、compiler memory、binary size 和热路径 profile，再决定是否保留生成路径。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "template metaprogramming",
  "compile-time computation",
  "factorial",
  "type selection",
  "policy choices",
  "custom code generation",
] as const;

export function EcppTmpMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="template metaprogramming 把 compile-time computation 前移；factorial 展示递归结果，type selection 与 policy choices 选择具体结构，custom code generation 形成专用实现。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Template metaprogramming decision map</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">静态输入 → 编译期选择 → 可测的具体实现</text>
          <g>
            <rect x="36" y="88" width="196" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="134" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">template metaprogramming</text>
            <text x="134" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">types + constants</text>
            <text x="134" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">递归 / specialization</text>
          </g>
          <path d="M232 147 H258" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M250 140 L262 147 L250 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="270" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="368" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">compile-time computation</text>
            <text x="368" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Factorial → 120</text>
            <text x="368" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">结果折叠为常量</text>
          </g>
          <path d="M466 147 H492" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M484 140 L496 147 L484 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="504" y="88" width="196" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="602" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">type selection</text>
            <text x="602" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">true / false path</text>
            <text x="602" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">选择结果 type</text>
          </g>
          <path d="M700 147 H726" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M718 140 L730 147 L718 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="738" y="88" width="166" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="821" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">policy choices</text>
            <text x="821" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">组合具体行为</text>
            <text x="821" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">可生成专用路径</text>
          </g>
          <line x1="36" y1="250" x2="904" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="160" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">factorial</text>
          <text x="160" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">base case + value</text>
          <text x="420" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">type selection</text>
          <text x="420" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">静态条件选择 type</text>
          <text x="680" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">custom code generation</text>
          <text x="680" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">每种组合都要计入构建预算</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">把 runtime decision 前移，不等于成本消失：同时测 build、binary、diagnostics 与 runtime</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">TMP 将静态事实变成 value、type 或具体代码；图中的箭头是决策顺序，不是“编译期免费”的承诺。</figcaption>
    </figure>
  );
}

export function EcppItem48TmpLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 48 TMP 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">编译期决策实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这段工作该放在哪里？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先预测 value、type 和 concrete code 的产物，再切换场景查看构建与运行证据。</p></div>
        <button type="button" aria-label="重置 Item 48 TMP 实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 48 TMP 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 TMP 证据" : "查看 TMP 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
