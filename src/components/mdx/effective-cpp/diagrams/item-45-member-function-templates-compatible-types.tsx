"use client";

import { useState } from "react";

type CompatibilityScenario = {
  label: string;
  source: string;
  target: string;
  result: "允许" | "拒绝";
  reason: string;
  evidence: string;
};

const SCENARIOS: readonly CompatibilityScenario[] = [
  {
    label: "安全 upcast",
    source: "SmartPtr<Bottom>",
    target: "SmartPtr<Top>",
    result: "允许",
    reason:
      "Bottom* 可以隐式转换为 Top*；wrapper 只复制同一 control block 的 ownership。",
    evidence:
      "underlying pointer gate 通过；generalized copy constructor retain 同一 control block。",
  },
  {
    label: "增加 const",
    source: "SmartPtr<Bottom>",
    target: "SmartPtr<const Top>",
    result: "允许",
    reason: "先完成 derived-to-base，再增加 const；原始 pointer 语义仍然成立。",
    evidence:
      "pointer-convertibility constraint 满足 U* → T*，conversion constructibility test 应通过。",
  },
  {
    label: "危险反向转换",
    source: "SmartPtr<Top>",
    target: "SmartPtr<Bottom>",
    result: "拒绝",
    reason:
      "Top* 不能隐式变成 Bottom*；member function template 不能凭空制造 downcast 权限。",
    evidence:
      "candidate 在 constraint/held pointer 初始化处失败，conversion matrix 应保留这个负例。",
  },
] as const;

export const OFFICIAL_CONCEPT_LABELS = [
  "member function templates",
  "all compatible types",
  "generalized copy constructor",
  "smart pointer conversion",
] as const;

export function EcppItem45CompatibilityMap() {
  return (
    <figure
      className="mdx-figure not-prose mx-auto my-6"
      data-visual-kind="ecpp-item-45-compatibility-map"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="Item 45 compatibility map：member function templates 接受 all compatible types；generalized copy constructor 用 underlying pointer gate 验证 smart pointer conversion，并保留安全 upcast 与增加 const。"
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
            SmartPtr&lt;U&gt; → SmartPtr&lt;T&gt; compatibility map
          </text>
          <text
            x="470"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            candidate → pointer gate → ownership identity
          </text>

          <g>
            <rect
              x="48"
              y="96"
              width="252"
              height="112"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="174"
              y="128"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              member function templates
            </text>
            <text
              x="174"
              y="158"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              template&lt;class U&gt;
            </text>
            <text
              x="174"
              y="184"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              all compatible types
            </text>
          </g>

          <path
            d="M300 152 H332"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M324 145 L336 152 L324 159"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="344"
              y="96"
              width="252"
              height="112"
              rx="12"
              fill="var(--warning)"
              fillOpacity="0.08"
              stroke="var(--warning)"
              strokeWidth="1.6"
            />
            <text
              x="470"
              y="128"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--warning)"
            >
              generalized copy constructor
            </text>
            <text
              x="470"
              y="158"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              derive U from source
            </text>
            <text
              x="470"
              y="184"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              candidate ≠ permission
            </text>
          </g>

          <path
            d="M596 152 H628"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M620 145 L632 152 L620 159"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="640"
              y="96"
              width="252"
              height="112"
              rx="12"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x="766"
              y="128"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--success)"
            >
              smart pointer conversion
            </text>
            <text
              x="766"
              y="158"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              U* → T* gate
            </text>
            <text
              x="766"
              y="184"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              retain same control block
            </text>
          </g>

          <line
            x1="48"
            y1="258"
            x2="892"
            y2="258"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="470"
            y="288"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            compatible type conversion is directional
          </text>
          <text
            x="170"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill="var(--success)"
          >
            Bottom → Top
          </text>
          <text
            x="390"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill="var(--success)"
          >
            add const
          </text>
          <text
            x="610"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill="var(--danger)"
          >
            Top ↛ Bottom
          </text>
          <text
            x="800"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            const T ↛ T
          </text>
          <text
            x="470"
            y="366"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            wrapper 复用原始 pointer 的安全边界，不扩张隐式权限
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先形成 member template candidate，再让底层 pointer conversion 决定哪一条
        SmartPtr 边可用；ownership identity 必须和 pointer 一起传递。
      </figcaption>
    </figure>
  );
}

export function EcppItem45CompatibilityLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 45 smart pointer conversion 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      data-visual-kind="ecpp-item-45-compatibility-lab"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">兼容类型实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：哪一条 SmartPtr conversion 应该通过？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换 source/target specialization，观察 underlying pointer gate
            如何保留 safe upcast、增加 const，并挡住 downcast 与 const
            stripping。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 45 smart pointer conversion 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 45 compatible type 场景"
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
                <span className="block font-semibold">{scenario.label}</span>
                <span className="mt-1 block text-xs opacity-80">
                  {scenario.source} → {scenario.target}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-accent">当前路径</p>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center text-sm">
            <span className="rounded-control border border-border bg-bg px-2 py-3 text-primary">
              {scenarioLabel(active.source)}
            </span>
            <span className="text-secondary">→</span>
            <span className="rounded-control border border-border bg-bg px-2 py-3 text-primary">
              {scenarioLabel(active.target)}
            </span>
          </div>
          <p
            className={`mt-4 rounded-control border p-3 text-sm leading-relaxed ${
              active.result === "允许"
                ? "border-success bg-success/10 text-success"
                : "border-danger bg-danger/10 text-danger"
            }`}
          >
            {active.result}：{active.reason}
          </p>
        </div>

        <div className="p-4">
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">
              {active.label} · conversion matrix
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {active.evidence}
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
            {showEvidence ? "收起 ownership 证据" : "查看 ownership 证据"}
          </button>
          {showEvidence ? (
            <div className="mt-3 rounded-control border border-success bg-bg p-4">
              <p className="text-xs font-medium text-success">检查不变量</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">
                允许的跨类型复制要共享同一 control block；拒绝的路径不能靠
                `const_cast` 或 downcast 绕过 constraint。
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function scenarioLabel(value: string) {
  return value.replace(/^SmartPtr</, "SmartPtr‹").replace(/>$/, "›");
}
