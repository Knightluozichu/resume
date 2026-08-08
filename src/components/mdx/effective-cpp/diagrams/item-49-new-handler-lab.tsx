"use client";

import { useState } from "react";

type HandlerScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly HandlerScenario[] = [
  {
    label: "set_new_handler / release reserve",
    observation:
      "请求第一次失败；handler 释放预留 storage，再返回给 throwing allocation function。",
    decision:
      "返回前必须让下一次尝试看到不同条件；若 reserve 仍不足，就把后继策略设为抛出。",
    evidence:
      "failure injection 应记录 handler=1、reserve=0、retry=1；成功或 bad_alloc 都必须离开受控循环。",
  },
  {
    label: "out of memory / std::bad_alloc",
    observation:
      "资源没有可回收余量时，继续返回只会重复同一失败；最终边界应是 std::bad_alloc。",
    decision:
      "handler 可以直接抛出 bad_alloc，或先卸载自己再让下一次 allocation failure 抛出。",
    evidence:
      "测试应断言有限的调用次数、异常类型和 no-progress handler 不会让测试进程真正挂死。",
  },
  {
    label: "class-specific new-handler / global state",
    observation:
      "Widget 的 class-specific new-handler 通过 global set_new_handler 临时生效，但其他线程也能观察到这段状态。",
    decision:
      "RAII guard 负责异常安全恢复；并发隔离则需要同步或 allocator-scoped failure policy。",
    evidence:
      "并发测试分别记录 Widget/Image 的 policy，检查没有交叉观察；更推荐不修改 process-global hook。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "behavior of the new-handler",
  "set_new_handler",
  "out of memory",
  "bad_alloc",
  "class-specific new-handler",
] as const;

export function EcppNewHandlerFlowMap() {
  return (
    <figure
      data-visual-kind="new-handler-control-flow"
      className="mdx-figure not-prose mx-auto my-6"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 980 430"
          role="img"
          aria-label="behavior of the new-handler 控制流：allocation 失败后调用 set_new_handler；handler 必须释放资源、切换策略或抛出，返回后才允许重试，最终到达成功或 bad_alloc。"
          className="mx-auto block h-auto w-full max-w-[980px]"
        >
          <text
            x="490"
            y="32"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            behavior of the new-handler
          </text>
          <text
            x="490"
            y="57"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            失败不是终点：handler 的返回值决定是否进入下一轮
          </text>

          <g>
            <rect
              x="32"
              y="92"
              width="168"
              height="112"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="116"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              allocation
            </text>
            <text
              x="116"
              y="155"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              request storage
            </text>
            <text
              x="116"
              y="180"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              first attempt fails
            </text>
          </g>

          <path
            d="M200 148 H224"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M216 141 L228 148 L216 155"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="232"
              y="92"
              width="196"
              height="112"
              rx="12"
              fill="var(--warning)"
              fillOpacity="0.08"
              stroke="var(--warning)"
              strokeWidth="1.6"
            />
            <text
              x="330"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--warning)"
            >
              set_new_handler
            </text>
            <text
              x="330"
              y="155"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              read current hook
            </text>
            <text
              x="330"
              y="180"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              call if present
            </text>
          </g>

          <path
            d="M428 148 H452"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M444 141 L456 148 L444 155"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="460"
              y="92"
              width="208"
              height="112"
              rx="12"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x="564"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--success)"
            >
              handler action
            </text>
            <text
              x="564"
              y="155"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              release / switch
            </text>
            <text
              x="564"
              y="180"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              throw / terminate
            </text>
          </g>

          <path
            d="M668 148 H692"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <path
            d="M684 141 L696 148 L684 155"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          <g>
            <rect
              x="700"
              y="92"
              width="248"
              height="112"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="824"
              y="126"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--accent)"
            >
              retry or bad_alloc
            </text>
            <text
              x="824"
              y="155"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              changed condition → retry
            </text>
            <text
              x="824"
              y="180"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              no progress → bounded exit
            </text>
          </g>

          <path
            d="M808 204 V244 H516 V274"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <path
            d="M808 244 H824 V274"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          <g>
            <rect
              x="328"
              y="274"
              width="376"
              height="92"
              rx="12"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.4"
            />
            <text
              x="516"
              y="307"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              class-specific new-handler
            </text>
            <text
              x="516"
              y="334"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              RAII 安装 / 恢复；并发时仍要警惕 global state
            </text>
          </g>

          <text
            x="490"
            y="402"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            handler 返回意味着“我改变了下一次尝试的条件”，而不是“继续无条件重试”
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        把 new-handler
        当作一个有限状态转换：每次返回都必须能解释下一轮为何更有机会成功，或为何会到达明确失败边界。
      </figcaption>
    </figure>
  );
}

export function EcppItem49NewHandlerLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 49 new-handler 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">失败路径实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            先预测：handler 返回后会发生什么？
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            切换三种故障场景，观察 handler 如何改变下一次 allocation，以及 RAII
            为什么只能解决恢复而不能自动解决并发隔离。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 49 new-handler 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div
          role="tablist"
          aria-label="Item 49 new-handler 场景"
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
          <p className="text-xs font-medium text-accent">观察</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">
            {active.observation}
          </p>
          <p className="mt-4 text-xs font-medium text-warning">决策</p>
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
