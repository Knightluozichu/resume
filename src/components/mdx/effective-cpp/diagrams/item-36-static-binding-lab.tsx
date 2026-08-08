"use client";

import { useState } from "react";

type DispatchScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly DispatchScenario[] = [
  {
    label: "base pointer / derived object",
    observation: "同一个 Derived object 同时被 Base* 与 Derived* 观察；两个表达式看似调用同一个 mf，实际可能选不同 body。",
    decision: "Base* 视图必须继续满足 Base contract；不能要求所有调用者“记得”使用 Derived* 才得到业务语义。",
    evidence: "对同一地址分别调用 Base*、Base&、Derived*、Derived&，记录 selected body，并把差异作为 gate failure。",
  },
  {
    label: "static binding",
    observation: "non-virtual call 在编译期依据 expression static type 选 body；dynamic type 不会替它改 dispatch。",
    decision: "先写出每个 call expression 的 static type，再判断 Base::mf 或 Derived::mf；不要把同名函数称作 override。",
    evidence: "让 `override` 标注在 non-virtual 上触发 compile error，并用 dispatch matrix 覆盖 const、reference 与 pointer views。",
  },
  {
    label: "redefine an inherited non-virtual function",
    observation: "Derived 同名同签名声明形成第二个静态入口，破坏 public is-a 的单一行为契约。",
    decision: "行为不变就删除 Derived declaration；行为需要变化就改 base virtual/NVI，legacy base 则用 composition 或改名。",
    evidence: "lint 搜索同签名 non-virtual redefinition；virtual repair 要求所有 views 命中 override，adapter 要求不能隐式转 Base。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "redefine an inherited non-virtual function",
  "static binding",
  "base pointer",
  "derived object",
] as const;

export function EcppStaticBindingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="static binding map：同一个 derived object 被 base pointer 与 derived view 观察时，redefine an inherited non-virtual function 会因 static binding 选出不同 body；修复是删除重定义、改 virtual/NVI 或使用 composition。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Static binding / view split map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            one derived object → two static views → two selected bodies
          </text>
          <g>
            <rect x="48" y="96" width="228" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="162" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">derived object</text>
            <text x="162" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">dynamic type = Derived</text>
            <text x="162" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">同一地址 / 同一状态</text>
          </g>
          <path d="M276 128 C320 98 350 98 382 126" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M276 176 C320 206 350 206 382 178" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="392" y="82" width="220" height="84" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="502" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">base pointer</text>
            <text x="502" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">static type Base* → Base::mf</text>
          </g>
          <g>
            <rect x="392" y="184" width="220" height="84" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="502" y="216" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">derived view</text>
            <text x="502" y="244" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">static type Derived* → Derived::mf</text>
          </g>
          <path d="M612 124 H650" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M642 117 L654 124 L642 131" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M612 226 H650" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M642 219 L654 226 L642 233" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="662" y="96" width="230" height="172" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="777" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">redefine an inherited non-virtual function</text>
            <text x="777" y="166" textAnchor="middle" fontSize="12" fill="var(--text-primary)">static binding ≠ override</text>
            <text x="777" y="192" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">public is-a split</text>
            <text x="777" y="232" textAnchor="middle" fontSize="12" fill="var(--success)">delete / virtual-NVI</text>
            <text x="777" y="252" textAnchor="middle" fontSize="12" fill="var(--success)">composition / rename</text>
          </g>
          <line x1="48" y1="304" x2="892" y2="304" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="336" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">先写 static type，再承诺 selected body</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">dynamic type 只有在 virtual dispatch 中才决定最终实现</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一对象的两个静态视图不应产生两个 public 语义；需要变化时把 variation 写进 virtual/NVI 或改用组合。
      </figcaption>
    </figure>
  );
}

export function EcppItem36StaticBindingLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 36 static binding 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">dispatch 诊断实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：这次调用会落到哪个 body？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先写出表达式的 static type 和对象的 dynamic type，再切换视图查看 dispatch 证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 36 static binding 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 36 dispatch 场景" className="grid gap-2 md:grid-cols-3">
          {SCENARIOS.map((scenario, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={scenario.label}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => {
                  setActiveIndex(index);
                  setShowEvidence(false);
                }}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-accent">观察</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p>
          <p className="mt-4 text-xs font-medium text-warning">决策</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前诊断 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
          </div>
          <button
            type="button"
            aria-pressed={showEvidence}
            onClick={() => setShowEvidence((value) => !value)}
            className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${
              showEvidence
                ? "border-success bg-success/10 text-success"
                : "border-border text-secondary hover:border-success hover:text-primary"
            }`}
          >
            {showEvidence ? "收起 dispatch 证据" : "查看 dispatch 证据"}
          </button>
          {showEvidence && (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">应观察到</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
