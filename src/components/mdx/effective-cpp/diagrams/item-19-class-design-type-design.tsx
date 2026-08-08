"use client";

import { useState } from "react";

const OFFICIAL_CONCEPT_LABELS = [
  "class design as type design",
  "object creation and destruction",
  "initialization and assignment",
  "inheritance",
  "type conversions",
] as const;

type DesignScenario = {
  label: string;
  question: string;
  decision: string;
  risk: string;
  evidence: string;
};

const SCENARIOS: readonly DesignScenario[] = [
  {
    label: "Money · value type",
    question: "复制后的对象是否应独立、相等且可安全按值传递？",
    decision:
      "private representation + validating factory；同币种运算保持 operation closure，复制不共享可变资源。",
    risk: "public amount/currency 让非法值和跨币种运算绕过 invariant。",
    evidence:
      "构造负例拒绝未知 currency；copy、assignment 与 equality 测试验证 value semantics。",
  },
  {
    label: "Connection · identity type",
    question: "对象是否代表唯一外部资源，复制会不会重复责任？",
    decision:
      "factory 负责失败报告；删除 copy，提供 noexcept move，析构负责一次关闭；借用与转移分开命名。",
    risk: "只看字段可复制就开放 copy，会让两个对象争抢同一个 socket。",
    evidence:
      "失败注入验证 open 不发布半对象；资源计数断言每次成功 open 只 close 一次。",
  },
  {
    label: "FixedRateMoney · composition",
    question: "派生类型能否满足 base 的全部可观察契约？",
    decision:
      "若 FixedRateMoney 禁止改变 currency，就用 composition 持有 Money；只有满足 substitutability 才考虑 public inheritance。",
    risk: "base assignment 允许的操作被 derived 禁止，public inheritance 形成契约矛盾。",
    evidence:
      "base contract tests 对 derived 重跑；转换测试确认整数不会隐式进入带 currency 的类型。",
  },
];

export function EcppItem19TypeDesignMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 920 430"
          role="img"
          aria-label={`Item 19 type contract map：${OFFICIAL_CONCEPT_LABELS.join("、")}。先写 observable contract，再决定合法值、生命周期、状态转换、操作集合和继承关系，最后用测试与性能证据验收。`}
          className="mx-auto block h-auto w-full max-w-[920px]"
        >
          <text
            x="460"
            y="30"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Class design as type design
          </text>
          <text
            x="460"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            把每个 public member 视为对调用者新增的一条类型承诺
          </text>

          <rect
            x="280"
            y="76"
            width="360"
            height="76"
            rx="14"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x="460"
            y="106"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--accent)"
          >
            observable type contract
          </text>
          <text
            x="460"
            y="130"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            合法值 · 生命周期 · 操作 · 转换 · 失败 · 成本
          </text>

          <path
            d="M460 152 V184"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M452 176 L460 188 L468 176"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="32"
              y="198"
              width="196"
              height="112"
              rx="12"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.5"
            />
            <text
              x="130"
              y="226"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--success)"
            >
              值域与不变量
            </text>
            <text
              x="130"
              y="252"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              value domain
            </text>
            <text
              x="130"
              y="274"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              private + validating factory
            </text>
            <text
              x="130"
              y="296"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              invariant preservation
            </text>
          </g>
          <g>
            <rect
              x="244"
              y="198"
              width="196"
              height="112"
              rx="12"
              fill="var(--warning)"
              fillOpacity="0.1"
              stroke="var(--warning)"
              strokeWidth="1.5"
            />
            <text
              x="342"
              y="226"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--warning)"
            >
              生命周期
            </text>
            <text
              x="342"
              y="252"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              object creation and destruction
            </text>
            <text
              x="342"
              y="274"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              value / identity semantics
            </text>
            <text
              x="342"
              y="296"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              copy · move · destructor
            </text>
          </g>
          <g>
            <rect
              x="456"
              y="198"
              width="196"
              height="112"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="554"
              y="226"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--accent)"
            >
              状态与操作
            </text>
            <text
              x="554"
              y="252"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              initialization and assignment
            </text>
            <text
              x="554"
              y="274"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              domain algebra · closure
            </text>
            <text
              x="554"
              y="296"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              failure guarantee
            </text>
          </g>
          <g>
            <rect
              x="668"
              y="198"
              width="220"
              height="112"
              rx="12"
              fill="var(--text-secondary)"
              fillOpacity="0.08"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <text
              x="778"
              y="226"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              边界与替换
            </text>
            <text
              x="778"
              y="252"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              inheritance / substitutability
            </text>
            <text
              x="778"
              y="274"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              type conversions
            </text>
            <text
              x="778"
              y="296"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              composition for reuse
            </text>
          </g>

          <path
            d="M460 188 H130 V198"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M460 188 H342 V198"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M460 188 H554 V198"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M460 188 H778 V198"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          <line
            x1="32"
            y1="342"
            x2="888"
            y2="342"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="460"
            y="370"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            契约验收证据
          </text>
          <text
            x="160"
            y="398"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            compile-negative tests
          </text>
          <text
            x="360"
            y="398"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            copy / move / lifetime tests
          </text>
          <text
            x="585"
            y="398"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            base contract tests
          </text>
          <text
            x="790"
            y="398"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            benchmark / allocation evidence
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型设计的验收顺序：先定义可观察契约，再把值域、生命周期、操作与替换关系落成可测试的边界。
      </figcaption>
    </figure>
  );
}

export function EcppItem19TypeDesignLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 19 type design 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">类型契约实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            从领域对象选择类型语义
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测对象代表独立的值、唯一资源还是可替换的抽象，再切换场景查看
            copy、转换和继承证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 19 type design 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 19 类型设计场景"
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
          <p className="text-xs font-medium text-warning">先回答一个问题</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.question}
          </p>
          <p className="mt-4 text-xs font-medium text-accent">推荐契约</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.decision}
          </p>
          <p className="mt-4 text-xs font-medium text-secondary">若忽略它</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.risk}
          </p>
        </div>
        <div className="p-4">
          <div
            role="status"
            aria-live="polite"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">
              当前场景 · {active.label}
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
            {showEvidence ? "收起契约证据" : "查看契约证据"}
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
