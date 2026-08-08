"use client";

import { useState } from "react";

type LookupScenario = {
  label: string;
  expression: string;
  candidates: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly LookupScenario[] = [
  {
    label: "hiding inherited names / 未恢复",
    expression: "derived.mf3(3.2)",
    candidates: "Derived::mf3()",
    decision:
      "Derived scope 先找到 mf3；Base::mf3(double) 没有进入候选集合，因此调用失败。",
    evidence:
      "编译器报 no matching function；参数是否不同并不能阻止跨 scope 的 name hiding。",
  },
  {
    label: "using declaration / 完整族",
    expression: "derived.mf3(3.2)",
    candidates: "Derived::mf3() + Base::mf3(double)",
    decision:
      "using Base::mf3 把可访问的 base overload family 引入 derived scope，再交给 overload resolution。",
    evidence:
      "int、double 和无参调用都能分别命中预期签名；using 不复制实现，只恢复可见性。",
  },
  {
    label: "forwarding function / 窄接口",
    expression: "adapter.process(42)",
    candidates: "Adapter::process(int)",
    decision:
      "只公开一个 signature 时，用 forwarding function 做 qualified Base::process(value) 调用。",
    evidence:
      "int 调用通过，string/double 版本保持 compile-negative；wrapper 还能添加校验或转换。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "hiding inherited names",
  "name lookup",
  "using declaration",
  "forwarding function",
] as const;

export function EcppNameLookupMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 430"
          role="img"
          aria-label="Item 33 name lookup map：hiding inherited names 先发生在 name lookup，找到 Derived 同名声明后停止；using declaration 恢复完整 overload family，forwarding function 则只公开一个窄签名。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text
            x="470"
            y="32"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Inherited name lookup：先查名，再选 overload
          </text>
          <text
            x="470"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            hiding inherited names is a visibility decision, not an overload decision
          </text>

          <rect
            x="30"
            y="82"
            width="264"
            height="216"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x="162"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--accent)"
          >
            Derived scope
          </text>
          <text x="52" y="145" fontSize="12" fill="var(--text-primary)">
            mf3()
          </text>
          <text x="52" y="167" fontSize="11" fill="var(--text-secondary)">
            同名声明在内层出现
          </text>
          <line
            x1="52"
            y1="185"
            x2="272"
            y2="185"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="5 4"
          />
          <text x="52" y="211" fontSize="12" fill="var(--text-primary)">
            Base scope
          </text>
          <text x="52" y="236" fontSize="11" fill="var(--text-secondary)">
            mf3()
          </text>
          <text x="52" y="258" fontSize="11" fill="var(--warning)">
            mf3(double) ← 被遮掩
          </text>
          <text x="52" y="282" fontSize="11" fill="var(--text-secondary)">
            Base 候选尚未进入集合
          </text>

          <path
            d="M304 190 H330"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M322 183 L334 190 L322 197"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <rect
            x="338"
            y="82"
            width="264"
            height="216"
            rx="12"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="470"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--warning)"
          >
            name lookup
          </text>
          <text x="360" y="145" fontSize="12" fill="var(--text-primary)">
            1. 找到 Derived::mf3
          </text>
          <text x="360" y="170" fontSize="12" fill="var(--danger)">
            2. stop rule：停止向 Base 查找
          </text>
          <text x="360" y="205" fontSize="11" fill="var(--text-secondary)">
            先建立可见名称集合
          </text>
          <text x="360" y="229" fontSize="11" fill="var(--text-secondary)">
            不比较参数列表
          </text>
          <text x="360" y="253" fontSize="11" fill="var(--text-secondary)">
            不比较 return type
          </text>
          <text x="360" y="277" fontSize="11" fill="var(--text-secondary)">
            也不因 virtual 自动合并
          </text>

          <path
            d="M612 190 H638"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M630 183 L642 190 L630 197"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <rect
            x="646"
            y="82"
            width="264"
            height="216"
            rx="12"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x="778"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--success)"
          >
            overload resolution
          </text>
          <text x="668" y="145" fontSize="12" fill="var(--text-primary)">
            mf3(3.2)
          </text>
          <text x="668" y="171" fontSize="11" fill="var(--danger)">
            candidate: Derived::mf3()
          </text>
          <text x="668" y="197" fontSize="12" fill="var(--danger)">
            no matching function
          </text>
          <text x="668" y="232" fontSize="11" fill="var(--text-secondary)">
            Base::mf3(double)
          </text>
          <text x="668" y="255" fontSize="11" fill="var(--text-secondary)">
            未进入候选集合
          </text>
          <text x="668" y="280" fontSize="11" fill="var(--text-secondary)">
            overload 解析来得太晚
          </text>

          <rect
            x="30"
            y="326"
            width="880"
            height="72"
            rx="12"
            fill="var(--text-primary)"
            fillOpacity="0.035"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="470"
            y="350"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            修复策略：明确要恢复多少接口
          </text>
          <text x="58" y="378" fontSize="11" fill="var(--accent)">
            using declaration → 完整 overload family
          </text>
          <text x="536" y="378" fontSize="11" fill="var(--success)">
            forwarding function → 一个窄 signature
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        查名先于重载解析：要么用 using declaration 恢复整个可访问名称族，要么用 forwarding function 有意只暴露一个签名。
      </figcaption>
    </figure>
  );
}

export function EcppItem33NameLookupLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 33 name lookup 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">查名与重载实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：{`derived.mf3(3.2)`} 会找到谁？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先写下候选集合，再切换修法；观察 using declaration 恢复完整接口，或 forwarding function 收窄公开契约。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 33 name lookup 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 33 name lookup 场景"
          className="grid gap-2 md:grid-cols-3"
        >
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
          <p className="text-xs font-medium text-accent">当前表达式</p>
          <p className="mt-2 rounded-control border border-border bg-bg p-3 font-mono text-sm text-primary">
            {active.expression}
          </p>
          <p className="mt-4 text-xs font-medium text-warning">可见候选</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.candidates}
          </p>
          <p className="mt-4 text-xs font-medium text-success">设计判断</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.decision}
          </p>
        </div>
        <div className="p-4">
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">
              当前修法 · {active.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {active.decision}
            </p>
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
            {showEvidence ? "收起编译证据" : "查看编译证据"}
          </button>
          {showEvidence && (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">应观察到</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">
                {active.evidence}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
