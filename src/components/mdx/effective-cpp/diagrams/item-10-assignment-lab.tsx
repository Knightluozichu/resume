"use client";

import { useState } from "react";

type AssignmentScenario = {
  label: string;
  expression: string;
  contract: string;
  evidence: string;
};

const SCENARIOS: readonly AssignmentScenario[] = [
  {
    label: "assignment chaining",
    expression: "x = y = z",
    contract: "right associativity 先执行 y = z；每个 assignment operator 都返回目标对象的非 const 左值引用。",
    evidence: "检查 x、y 最终值与 z 相同，并用 decltype 验证中间结果是 T&。",
  },
  {
    label: "operator= / result identity",
    expression: "&(a = b) == &a",
    contract: "operator= 返回 reference to *this，结果身份就是左操作数，而不是临时副本或状态码。",
    evidence: "用 addressof、连续成员调用和 `(a = b) = c` 验证地址、可写性与最终值。",
  },
  {
    label: "move / compound assignment",
    expression: "(x += y) += z",
    contract: "move assignment 与 compound assignment 仍返回目标 T&；异常安全和 self-assignment 另行负责。",
    evidence: "覆盖移动后源可析构/可赋值、copy-and-swap 异常不改目标，以及两次复合赋值都落在 x。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "assignment operators return a reference to this",
  "assignment chaining",
  "operator=",
  "reference to *this",
] as const;

export function EcppAssignmentFlowMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="assignment flow map：assignment operators return a reference to this，assignment chaining 从右向左，operator= 结果身份回到左操作数，并分别验证值、地址和异常状态。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Assignment result contract
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            assignment chaining · operator= · reference to *this
          </text>
          <g>
            <rect x="56" y="104" width="220" height="92" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="166" y="136" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">assignment chaining</text>
            <text x="166" y="164" textAnchor="middle" fontSize="13" fill="var(--text-primary)" fontFamily="monospace">x = (y = z)</text>
          </g>
          <path d="M276 150 H334" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M326 143 L338 150 L326 157" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="350" y="104" width="240" height="92" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="470" y="136" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">operator=</text>
            <text x="470" y="164" textAnchor="middle" fontSize="13" fill="var(--text-primary)" fontFamily="monospace">return *this</text>
          </g>
          <path d="M590 150 H648" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M640 143 L652 150 L640 157" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="664" y="104" width="220" height="92" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="774" y="136" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">result identity</text>
            <text x="774" y="164" textAnchor="middle" fontSize="13" fill="var(--text-primary)" fontFamily="monospace">&amp;(a = b) == &amp;a</text>
          </g>
          <line x1="56" y1="250" x2="884" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">三条验收证据</text>
          <text x="190" y="322" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">decltype → T&amp;</text>
          <text x="470" y="322" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">addressof → 左操作数</text>
          <text x="750" y="322" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">exception → 目标不变</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">返回契约保证身份；状态提交与异常安全仍需独立验证</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        赋值操作先按右结合完成源值传播，再由 operator= 返回左操作数自身；类型、地址和异常状态分别验收。
      </figcaption>
    </figure>
  );
}

export function EcppItem10AssignmentLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 10 assignment 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">赋值结果实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">结果值、结果身份与状态</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测赋值表达式会返回谁，再切换场景检查引用类型、地址和异常证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 10 assignment 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 10 assignment 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-accent">表达式</p>
          <p className="mt-2 font-mono text-sm text-primary">{active.expression}</p>
          <p className="mt-4 text-xs font-medium text-warning">返回契约</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.contract}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.contract}</p>
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
            {showEvidence ? "收起赋值证据" : "查看赋值证据"}
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
