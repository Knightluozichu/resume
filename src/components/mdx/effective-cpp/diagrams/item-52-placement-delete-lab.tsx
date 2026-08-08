"use client";

import { useState } from "react";

type PlacementScenario = {
  label: string;
  allocation: string;
  cleanup: string;
  evidence: string;
};

const SCENARIOS: readonly PlacementScenario[] = [
  {
    label: "constructor exception",
    allocation: "placement new(size, log) 已取得 raw storage，constructor 尚未完成。",
    cleanup: "按额外参数匹配 placement delete(void*, log)，记录失败并归还 storage。",
    evidence: "让 constructor 在每个阶段抛出，统计 placement delete 调用次数与 live bytes。",
  },
  {
    label: "name hiding / normal forms",
    allocation: "class 增加 logging placement new 后，normal forms 可能被名称遮掩。",
    cleanup: "显式转发或 using 引回 normal、void-pointer、nothrow 与 aligned overload family。",
    evidence: "为每种 new expression 建 compile test，再覆盖成功和 constructor failure。",
  },
  {
    label: "caller-owned placement storage",
    allocation: "standard placement new 在调用者 buffer 上构造，不取得 buffer ownership。",
    cleanup: "constructor failure 的 matching placement delete 不得 global free；成功后显式析构。",
    evidence: "用 guard bytes 与 storage owner 计数确认 buffer 未被错误释放。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "placement delete",
  "placement new",
  "constructor exception",
  "memory leak",
  "name hiding",
  "normal forms",
] as const;

export function EcppItem52PlacementDeleteLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 52 placement new / placement delete 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">构造失败配对实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">placement new 的 cleanup 选择</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测 new expression 的 allocation、construction 和 cleanup，再切换场景查看证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 52 placement delete 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 52 placement 场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-secondary">allocation / construction</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.allocation}</p>
          <p className="mt-4 text-xs font-medium text-warning">cleanup 规则</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.cleanup}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.cleanup}</p>
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
              <p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
