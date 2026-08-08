"use client";

import { useState } from "react";

export const OFFICIAL_CONCEPT_LABELS = [
  "non-member non-friend functions",
  "member functions",
  "encapsulation",
  "convenience functions",
] as const;

type PlacementScenario = {
  label: string;
  candidate: string;
  placement: string;
  evidence: string;
  tone: "var(--success)" | "var(--warning)" | "var(--accent)";
};

const SCENARIOS: readonly PlacementScenario[] = [
  {
    label: "clearEverything",
    candidate: "convenience function",
    placement: "同 namespace 的 non-member non-friend",
    evidence:
      "只调用 clearCache、clearHistory、removeCookies；private representation 替换时无需修改。",
    tone: "var(--success)",
  },
  {
    label: "withdraw",
    candidate: "invariant-critical operation",
    placement: "member function",
    evidence:
      "余额、冻结状态和审计序号必须在一个受权边界内原子提交。",
    tone: "var(--warning)",
  },
  {
    label: "audit",
    candidate: "virtual dispatch",
    placement: "member function",
    evidence: "调用必须经过 dynamic dispatch，让 derived override 参与契约。",
    tone: "var(--accent)",
  },
  {
    label: "Rational operator*",
    candidate: "symmetric operation",
    placement: "non-member non-friend（若 public API 足够）",
    evidence: "lhs 与 rhs 地位相同，参数列表显式展示两个 operands。",
    tone: "var(--success)",
  },
];

export function EcppItem23EncapsulationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label={`Item 23 封装权限图：${OFFICIAL_CONCEPT_LABELS.join("、")}。member functions 和 friend functions 进入 private representation；non-member non-friend functions 只通过 public contract 组合 convenience functions。`}
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text
            x="470"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Encapsulation by access minimization
          </text>
          <text
            x="470"
            y="54"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            先问“需要什么权限”，再决定函数放在哪里
          </text>

          <rect
            x="330"
            y="84"
            width="280"
            height="82"
            rx="14"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x="470"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--accent)"
          >
            WebBrowser private representation
          </text>
          <text
            x="470"
            y="142"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            cache · history · cookies · invariants
          </text>

          <path d="M330 125 H215" stroke="var(--danger)" strokeWidth="2" />
          <path d="M222 118 L210 125 L222 132" fill="none" stroke="var(--danger)" strokeWidth="2" />
          <path d="M610 125 H725" stroke="var(--success)" strokeWidth="2" />
          <path d="M718 118 L730 125 L718 132" fill="none" stroke="var(--success)" strokeWidth="2" />

          <rect
            x="34"
            y="92"
            width="176"
            height="68"
            rx="12"
            fill="var(--danger)"
            fillOpacity="0.1"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text x="122" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">
            member / friend
          </text>
          <text x="122" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            privileged access set
          </text>

          <rect
            x="730"
            y="92"
            width="176"
            height="68"
            rx="12"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text x="818" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">
            public contract
          </text>
          <text x="818" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            convenience functions
          </text>

          <line x1="48" y1="216" x2="892" y2="216" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="246" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">
            representation changes
          </text>
          <text x="180" y="284" textAnchor="middle" fontSize="12" fill="var(--danger)">
            member / friend 需要复查
          </text>
          <text x="470" y="284" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            访问权限越宽，传播面越大
          </text>
          <text x="760" y="284" textAnchor="middle" fontSize="12" fill="var(--success)">
            non-member non-friend 通常不变
          </text>
          <text x="470" y="342" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            封装不是“少写 member”，而是减少依赖 private 表示的代码数量
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        privileged access set 越小，private representation 替换时需要联动检查的函数越少。
      </figcaption>
    </figure>
  );
}

export function EcppItem23PlacementMatrixMap() {
  const rows = [
    ["clearEverything", "否", "否", "同 namespace non-member non-friend"],
    ["withdraw", "是：原子不变量", "否", "member function"],
    ["audit", "可能", "是：virtual", "member function"],
    ["operator*", "public API 足够即可否", "否", "对称 non-member non-friend"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="border-b border-border px-4 py-3 text-left font-semibold text-primary">
            Function placement matrix：先检查 private 权限、virtual dispatch 和参数对称性
          </caption>
          <thead className="bg-bg/60 text-xs text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">候选函数</th>
              <th className="px-4 py-3 font-medium">需要 private？</th>
              <th className="px-4 py-3 font-medium">需要 virtual？</th>
              <th className="px-4 py-3 font-medium">默认放置</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className="border-t border-border align-top">
                {row.map((cell, cellIndex) => (
                  <td key={`${row[0]}-${cellIndex}`} className="px-4 py-3 text-secondary">
                    {cellIndex === 0 ? <strong className="text-primary">{cell}</strong> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点号语法只是调用形式；权限、核心契约和 dispatch 才是 function placement 的证据。
      </figcaption>
    </figure>
  );
}

export function EcppItem23PlacementLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SCENARIOS[activeIndex];

  const reset = () => setActiveIndex(0);

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="ecpp-item-23-placement-lab"
      aria-label={`Item 23 函数放置实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">函数放置实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">从权限证据决定 member 还是 non-member</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先猜一猜：把同一个候选函数放进 class，会不会扩大封装的联动范围？再切换场景验证。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 23 函数放置实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 23 函数放置场景" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((scenario, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={scenario.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIndex(index)}
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
          <p className="text-xs font-medium text-secondary">候选函数 · {active.label}</p>
          <p className="mt-2 text-lg font-semibold" style={{ color: active.tone }}>
            {active.candidate}
          </p>
          <p className="mt-4 text-xs font-medium text-accent">推荐放置</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.placement}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">应观察到</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
          </div>
          <p className="mt-3 text-xs leading-5 text-secondary">
            判断顺序：private invariant → virtual dispatch → symmetric operands → public contract。
          </p>
        </div>
      </div>
    </section>
  );
}
