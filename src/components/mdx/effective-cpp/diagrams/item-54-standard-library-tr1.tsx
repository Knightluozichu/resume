"use client";

import { useState } from "react";

type LibraryScenario = {
  label: string;
  question: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly LibraryScenario[] = [
  {
    label: "ownership + callback",
    question:
      "边界需要保存可复制 callback，同时明确一份 shared ownership 和观察者。",
    decision:
      "用 shared_ptr/weak_ptr 表达生命周期；只在需要类型擦除的边界保存 std::function，热点内部保留 template callable。",
    evidence:
      "验证 control block、weak observer、空 callable、异常路径与分配次数；确认 TR1 namespace 只留在兼容层。",
  },
  {
    label: "lookup + locality",
    question: "只读表约 100 个 key，查询很多但构建后不更新。",
    decision:
      "把 unordered_map 与 sorted vector 都作为候选，用 key/value 大小、cache locality、p99 查询和构建成本做选择。",
    evidence:
      "记录 hash/equality、bucket/rehash 边界、排序查询、RSS 与 cache misses；不要把平均常量当成所有输入都更快。",
  },
  {
    label: "parsing + portability",
    question: "需要校验外部文本，并在多套 compiler/library 上稳定发布。",
    decision:
      "先确认 regular expressions 的 grammar、locale 与复杂度边界，再在目标实现上 benchmark；缺口用窄 adapter 隔离。",
    evidence:
      "覆盖 malformed input、最坏长度、locale、标准模式和实现矩阵；把 TR1/Technical Report 1 的历史映射记录在迁移说明中。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "standard library including TR1",
  "smart pointers",
  "function objects",
  "hash tables",
  "regular expressions",
  "TR1",
  "Technical Report 1",
] as const;

export function EcppStandardLibraryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-8">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 960 420"
          role="img"
          aria-label="standard library including TR1 的概念地图：Boost 与 Technical Report 1 进入标准库，smart pointers、function objects、hash tables 和 regular expressions 在现代 std 中形成可组合设施。"
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <defs>
            <marker
              id="ecpp-item-54-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path
                d="M0 0 L8 4 L0 8"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
              />
            </marker>
          </defs>
          <text
            x="480"
            y="30"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            standard library including TR1
          </text>
          <text
            x="480"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            历史来源、标准化路径与今天的 contract 选择
          </text>

          <rect
            x="38"
            y="92"
            width="190"
            height="112"
            rx="14"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x="133"
            y="126"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--accent)"
          >
            Boost library lineage
          </text>
          <text
            x="133"
            y="155"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            实验与社区实践
          </text>
          <text
            x="133"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            先验证组件边界
          </text>

          <line
            x1="228"
            y1="148"
            x2="292"
            y2="148"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            markerEnd="url(#ecpp-item-54-arrow)"
          />
          <text
            x="260"
            y="134"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            proposal
          </text>

          <rect
            x="300"
            y="92"
            width="190"
            height="112"
            rx="14"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="395"
            y="126"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--warning)"
          >
            TR1
          </text>
          <text
            x="395"
            y="155"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            Technical Report 1
          </text>
          <text
            x="395"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            历史 namespace / 可用性差异
          </text>

          <line
            x1="490"
            y1="148"
            x2="554"
            y2="148"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            markerEnd="url(#ecpp-item-54-arrow)"
          />
          <text
            x="522"
            y="134"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            standardized
          </text>

          <rect
            x="562"
            y="92"
            width="190"
            height="112"
            rx="14"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x="657"
            y="126"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--success)"
          >
            modern std
          </text>
          <text
            x="657"
            y="155"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            smart pointers / function objects
          </text>
          <text
            x="657"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            先读语义，再迁移 namespace
          </text>

          <line
            x1="752"
            y1="148"
            x2="816"
            y2="148"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            markerEnd="url(#ecpp-item-54-arrow)"
          />
          <text
            x="784"
            y="134"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            measure
          </text>

          <rect
            x="824"
            y="92"
            width="98"
            height="112"
            rx="14"
            fill="var(--danger)"
            fillOpacity="0.1"
            stroke="var(--danger)"
            strokeWidth="1.6"
          />
          <text
            x="873"
            y="126"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--danger)"
          >
            proof
          </text>
          <text
            x="873"
            y="155"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            contract
          </text>
          <text
            x="873"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            benchmark
          </text>

          <text
            x="480"
            y="247"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            可组合设施
          </text>
          <line
            x1="120"
            y1="270"
            x2="840"
            y2="270"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="6 5"
          />

          <rect
            x="74"
            y="294"
            width="180"
            height="76"
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="164"
            y="322"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            smart pointers
          </text>
          <text
            x="164"
            y="347"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            ownership / lifetime
          </text>

          <rect
            x="274"
            y="294"
            width="180"
            height="76"
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="364"
            y="322"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            function objects
          </text>
          <text
            x="364"
            y="347"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            callable / type erasure
          </text>

          <rect
            x="474"
            y="294"
            width="180"
            height="76"
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="564"
            y="322"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            hash tables
          </text>
          <text
            x="564"
            y="347"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            buckets / rehash
          </text>

          <rect
            x="674"
            y="294"
            width="212"
            height="76"
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="780"
            y="322"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            regular expressions
          </text>
          <text
            x="780"
            y="347"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            grammar / cost boundary
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TR1 是历史桥梁；现代代码的落点是 std
        设施加上可验证的语义、失效、复杂度和性能 contract。
      </figcaption>
    </figure>
  );
}

export function EcppItem54LibraryLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="ecpp-item-54-library-selection-lab"
      aria-label="Effective C++ Item 54 standard library including TR1 选型实验"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
            Library selection lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            先预测：哪一个标准设施真正符合 contract？
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换 ownership、lookup 和 parsing
            场景，再展开证据；每次选择都要留下迁移、失效和 benchmark 记录。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 54 标准库选型实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 54 标准库选型场景"
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
          <p className="text-xs font-medium text-accent">问题</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.question}
          </p>
          <p className="mt-4 text-xs font-medium text-warning">选型判断</p>
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
              当前场景 · {active.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              先看 contract，再谈 API 便利性。
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
            {showEvidence ? "收起验证证据" : "查看验证证据"}
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
