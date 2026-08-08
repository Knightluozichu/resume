"use client";

import { useState } from "react";

type DefaultScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly DefaultScenario[] = [
  {
    label: "default parameter value / virtual function",
    observation: "Shape* 调用先从 Shape declaration 补入 Red，再把完整参数交给 virtual function；Rectangle* 则可能先补入 Green。",
    decision: "把“参数默认值”和“body 动态分派”拆成两个阶段解释，不能因为 body 相同就认为参数政策相同。",
    evidence: "对同一个 Rectangle object 记录 Shape*/Shape&/Rectangle*/Rectangle& 的 inserted value 与最终 body，形成 default-binding matrix。",
  },
  {
    label: "redefine inherited default parameter",
    observation: "Derived override 重声明不同 default 不会触发 override error，因为 default expression 不属于 function signature。",
    decision: "override 不写 default；行为需要 subtype-specific default 时改为 virtual default operation 或显式参数 overload。",
    evidence: "lint 检查所有 virtual overrides 的参数声明，禁止第二个 default；同时跑旧/new header 与 client 版本矩阵。",
  },
  {
    label: "statically bound / NVI",
    observation: "default parameter value 在 call site 被静态补入，可能编进旧 caller；NVI wrapper 可以把来源集中到一个稳定入口。",
    decision: "public non-virtual wrapper 持有 default 和 validation，virtual hook 只接收显式参数；关键政策改动要版本化或 runtime 计算。",
    evidence: "用 Shape view 与 concrete view 调无参入口，确认只插入一次；用 old/new client + library 组合验证 caller-baked default。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "redefine inherited default parameter",
  "default parameter value",
  "statically bound",
  "virtual function",
] as const;

export function EcppDefaultParameterMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="default binding map：default parameter value 在 call site statically bound，之后才进入 virtual function 动态分派；redefine inherited default parameter 会让 base 与 derived views 插入不同值。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Default value / virtual dispatch map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            call site first → virtual function body later
          </text>
          <g>
            <rect x="48" y="96" width="214" height="112" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="155" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">static view</text>
            <text x="155" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Shape* / Rectangle*</text>
            <text x="155" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">可见 declaration</text>
          </g>
          <path d="M262 152 H300" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M292 145 L304 152 L292 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="310" y="96" width="250" height="112" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="435" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">default parameter value</text>
            <text x="435" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">statically bound</text>
            <text x="435" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Red ≠ Green</text>
          </g>
          <path d="M560 152 H598" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M590 145 L602 152 L590 159" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="608" y="96" width="284" height="112" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="750" y="128" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">virtual function</text>
            <text x="750" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">dynamic body dispatch</text>
            <text x="750" y="184" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Rectangle::draw</text>
          </g>
          <line x1="48" y1="258" x2="892" y2="258" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">redefine inherited default parameter → view-dependent input</text>
          <text x="180" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base client: Red</text>
          <text x="390" y="326" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Concrete client: Green</text>
          <text x="610" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">NVI: one default</text>
          <text x="800" y="326" textAnchor="middle" fontSize="12" fill="var(--success)">hook: explicit value</text>
          <text x="470" y="366" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">default 改动属于 caller/version 变更；不要把 header 替换误当 runtime policy 更新</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        默认值在调用点静态补入，virtual body 才动态分派；NVI 用唯一 public 入口消除默认政策分裂。
      </figcaption>
    </figure>
  );
}

export function EcppItem37DefaultParameterLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 37 default parameter 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">默认绑定实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">先预测：默认值在哪里决定？</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测 call site 插入的值和最终 virtual body，再切换视图查看版本与 NVI 证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 37 default parameter 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 37 default policy 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="mt-4 text-xs font-medium text-warning">政策</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前政策 · {active.label}</p>
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
            {showEvidence ? "收起默认证据" : "查看默认证据"}
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
