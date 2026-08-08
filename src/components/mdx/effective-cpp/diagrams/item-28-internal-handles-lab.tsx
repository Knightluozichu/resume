"use client";

import { useState } from "react";

type HandleScenario = {
  label: string;
  exposure: string;
  replacement: string;
  evidence: string;
};

const SCENARIOS: readonly HandleScenario[] = [
  {
    label: "reference / pointer / iterator",
    exposure: "public API 把 reference pointer iterator 交给调用者，内部容器、地址和写权限变成外部依赖。",
    replacement: "只读查询返回 value snapshot；修改走 owner-mediated command；短借用使用 scoped callback。",
    evidence: "搜索所有 handle 出口，做 compile-negative、representation swap 和 owner mutation 测试。",
  },
  {
    label: "dangling handle",
    exposure: "临时 owner 销毁、vector reallocation、erase 或并发 mutation 让旧 handle 不再有效。",
    replacement: "rvalue accessor 返回 detached value 或删除；长期 identity 改用 stable logical handle + generation。",
    evidence: "ASan/UBSan 和 invalidation matrix 覆盖 temporary、reallocation、erase、sort 与 stale ID。",
  },
  {
    label: "encapsulation / synchronization",
    exposure: "const accessor 内部加锁后返回 reference，锁已释放，调用者仍能绕过 invariant 和同步边界。",
    replacement: "value snapshot、持锁 callback 或版本验证把实际读取放回 owner 控制的 scope。",
    evidence: "ThreadSanitizer 覆盖 snapshot/callback 与并发更新，并证明 storage 替换不改 client。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "handles to object internals",
  "reference pointer iterator",
  "encapsulation",
  "dangling handle",
] as const;

export function EcppInternalHandlesMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="internal handles map：handles to object internals 包括 reference pointer iterator；它们可能造成 dangling handle 并破坏 encapsulation；替代方案是 value snapshot、owner command、scoped callback 和 stable ID。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">
            Internal handle boundary map
          </text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            reference · pointer · iterator → lifetime / representation / sync
          </text>
          <g>
            <rect x="48" y="96" width="244" height="104" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="170" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">handles to object internals</text>
            <text x="170" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">reference pointer iterator</text>
            <text x="170" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">地址 / layout 泄漏</text>
          </g>
          <path d="M292 148 H346" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M338 141 L350 148 L338 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="356" y="96" width="228" height="104" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="470" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">dangling handle</text>
            <text x="470" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">owner / storage changed</text>
            <text x="470" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">reallocation / erase / destroy</text>
          </g>
          <path d="M584 148 H638" stroke="var(--text-secondary)" strokeWidth="2" />
          <path d="M630 141 L642 148 L630 155" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="648" y="96" width="244" height="104" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="770" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">encapsulation</text>
            <text x="770" y="158" textAnchor="middle" fontSize="12" fill="var(--text-primary)">snapshot / command</text>
            <text x="770" y="180" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">callback / stable ID</text>
          </g>
          <line x1="48" y1="252" x2="892" y2="252" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="470" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">每个出口都要回答</text>
          <text x="155" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">owner 谁持有</text>
          <text x="360" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">何时失效</text>
          <text x="580" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">谁能写</text>
          <text x="790" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">锁是否覆盖读取</text>
          <text x="470" y="360" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">安全性优先于省下一次复制；长期 identity 使用稳定逻辑句柄</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内部句柄把地址、表示、生命周期和同步泄漏给调用者；快照、命令、作用域借用和稳定 ID 提供不同边界。
      </figcaption>
    </figure>
  );
}

export function EcppItem28InternalHandlesLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];

  const reset = () => {
    setActiveIndex(0);
    setShowEvidence(false);
  };

  return (
    <section
      aria-label={`Item 28 internal handles 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`}
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">句柄边界实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">谁拥有这段地址</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            先预测 owner mutation 后 handle 是否仍有效，再切换场景查看替代契约和验证证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Item 28 internal handles 实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Item 28 句柄场景" className="grid gap-2 md:grid-cols-3">
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
          <p className="text-xs font-medium text-warning">暴露风险</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.exposure}</p>
          <p className="mt-4 text-xs font-medium text-accent">替代契约</p>
          <p className="mt-2 text-sm leading-relaxed text-primary">{active.replacement}</p>
        </div>
        <div className="p-4">
          <div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4">
            <p className="text-xs font-medium text-accent">当前场景 · {active.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">{active.replacement}</p>
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
            {showEvidence ? "收起句柄证据" : "查看句柄证据"}
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
