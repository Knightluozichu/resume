"use client";

import { useMemo, useState } from "react";

const strategies = [
  {
    name: "手动释放",
    decision: "程序员在正确时刻调用 free/delete",
    strength: "释放时刻明确，运行时机制较少",
    failure: "悬空引用、重复释放、遗漏释放",
    evidence: "所有权与释放路径审查",
    className: "border-rose-500/35 bg-rose-500/10",
  },
  {
    name: "引用计数",
    decision: "引用数量降到 0 时立即回收",
    strength: "多数对象的回收时刻可预测",
    failure: "强引用环使计数永远不为 0",
    evidence: "引用增减与环检测",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    name: "追踪式 GC",
    decision: "从 GC 根遍历，回收不可达对象",
    strength: "能处理环，程序员不直接释放对象",
    failure: "仍可被无意的可达引用长期保留",
    evidence: "根路径、分配率、存活量与暂停",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function DnmMemoryStrategyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="手动释放、引用计数和追踪式垃圾回收三种内存管理策略的决策、优势、失败模式与证据对比"
          className="grid gap-3 lg:grid-cols-3"
        >
          {strategies.map((strategy, index) => (
            <section key={strategy.name} className={`min-h-72 border p-4 ${strategy.className}`}>
              <span className="text-xs text-secondary">strategy 0{index + 1}</span>
              <strong className="mt-2 block text-base text-primary">{strategy.name}</strong>
              <dl className="mt-5 space-y-4 text-xs">
                <div>
                  <dt className="text-secondary">回收判据</dt>
                  <dd className="mt-1 text-primary">{strategy.decision}</dd>
                </div>
                <div>
                  <dt className="text-secondary">主要收益</dt>
                  <dd className="mt-1 text-primary">{strategy.strength}</dd>
                </div>
                <div>
                  <dt className="text-secondary">典型失败</dt>
                  <dd className="mt-1 text-primary">{strategy.failure}</dd>
                </div>
                <div className="border-t border-border pt-3">
                  <dt className="text-secondary">需要观察</dt>
                  <dd className="mt-1 text-primary">{strategy.evidence}</dd>
                </div>
              </dl>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        自动内存管理改变的是“谁决定对象何时可回收”，并没有消除所有权、资源释放与性能判断。
      </figcaption>
    </figure>
  );
}

const graphNodes = [
  { id: "request", label: "Request", kind: "root" },
  { id: "service", label: "Service", kind: "root" },
  { id: "cache", label: "Cache", kind: "root" },
  { id: "order", label: "Order", kind: "object" },
  { id: "line", label: "Line[]", kind: "object" },
  { id: "customer", label: "Customer", kind: "object" },
  { id: "cycle-a", label: "Cycle A", kind: "object" },
  { id: "cycle-b", label: "Cycle B", kind: "object" },
] as const;

type RootId = "request" | "service" | "cache";

const outgoing: Record<string, string[]> = {
  request: ["order"],
  service: ["customer"],
  cache: ["order", "cycle-a"],
  order: ["line", "customer"],
  line: [],
  customer: [],
  "cycle-a": ["cycle-b"],
  "cycle-b": ["cycle-a"],
};

function reachableFrom(roots: RootId[]) {
  const reachable = new Set<string>();
  const pending: string[] = [...roots];

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || reachable.has(current)) continue;
    reachable.add(current);
    for (const next of outgoing[current] ?? []) pending.push(next);
  }

  return reachable;
}

export function DnmReachabilityLab() {
  const [activeRoots, setActiveRoots] = useState<RootId[]>(["request", "service", "cache"]);
  const reachable = useMemo(() => reachableFrom(activeRoots), [activeRoots]);

  function toggleRoot(root: RootId) {
    setActiveRoots((current) =>
      current.includes(root) ? current.filter((item) => item !== root) : [...current, root],
    );
  }

  const collectible = graphNodes.filter(
    (node) => node.kind === "object" && !reachable.has(node.id),
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="group" aria-label="切换对象图中的 GC 根" className="grid grid-cols-3 gap-2">
          {(["request", "service", "cache"] as RootId[]).map((root) => {
            const enabled = activeRoots.includes(root);
            return (
              <button
                key={root}
                type="button"
                aria-pressed={enabled}
                onClick={() => toggleRoot(root)}
                className={`min-h-11 border px-3 py-2 text-sm transition-colors ${
                  enabled
                    ? "border-cyan-500 bg-cyan-500/15 text-primary"
                    : "border-border bg-background text-secondary hover:text-primary"
                }`}
              >
                {root}
              </button>
            );
          })}
        </div>

        <div role="img" aria-label="根据当前 GC 根高亮可达和可回收对象" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {graphNodes.map((node) => {
            const isReachable = reachable.has(node.id);
            return (
              <section
                key={node.id}
                className={`min-h-28 border p-3 ${
                  node.kind === "root"
                    ? isReachable
                      ? "border-cyan-500/40 bg-cyan-500/10"
                      : "border-border bg-background/60 opacity-55"
                    : isReachable
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-rose-500/40 bg-rose-500/10"
                }`}
              >
                <span className="text-xs text-secondary">{node.kind === "root" ? "GC root" : "managed object"}</span>
                <strong className="mt-2 block text-sm text-primary">{node.label}</strong>
                <span className="mt-3 block text-xs text-secondary">
                  {isReachable ? "reachable" : node.kind === "root" ? "root disabled" : "collectible"}
                </span>
              </section>
            );
          })}
        </div>

        <section aria-live="polite" className="mt-4 min-h-24 border border-border bg-background/60 p-4">
          <strong className="text-sm text-primary">当前结论</strong>
          <p className="mb-0 mt-2 text-xs text-secondary">
            {collectible.length === 0
              ? "所有对象都能从至少一个启用的根到达；即使业务不再需要，它们也不会被 GC 回收。"
              : `可回收：${collectible.map((node) => node.label).join("、")}。Cycle A 与 Cycle B 互相引用并不重要；只要没有根路径，追踪式 GC 仍能回收这个环。`}
          </p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测关闭某个根后哪些对象会变成不可达，再点击验证；追踪式 GC 判断的是根路径，不是引用数量。
      </figcaption>
    </figure>
  );
}

function rangeLabel(value: number, low: number, high: number) {
  if (value <= low) return "低";
  if (value >= high) return "高";
  return "中";
}

export function DnmCostModelLab() {
  const [allocationRate, setAllocationRate] = useState(120);
  const [survivalRate, setSurvivalRate] = useState(8);
  const [retainedMegabytes, setRetainedMegabytes] = useState(320);

  const allocatedPerMinute = allocationRate * 60;
  const promotedPerMinute = Math.round((allocatedPerMinute * survivalRate) / 100);
  const pressure =
    allocationRate >= 300 && survivalRate >= 25
      ? "高分配 + 高存活：回收频率、晋升和完整回收都会上升"
      : allocationRate >= 300
        ? "高分配 + 低存活：重点观察 Gen 0 频率与瞬时吞吐"
        : survivalRate >= 25 || retainedMegabytes >= 900
          ? "低/中分配 + 高保留：重点寻找根路径和缓存边界"
          : "当前压力温和，但仍需用真实轨迹确认峰值和暂停预算";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">
              分配速率：{allocationRate} MB/s
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={allocationRate}
                onChange={(event) => setAllocationRate(Number(event.target.value))}
                className="mt-2 w-full accent-cyan-500"
              />
            </label>
            <label className="block text-sm text-primary">
              跨回收存活：{survivalRate}%
              <input
                type="range"
                min="1"
                max="60"
                value={survivalRate}
                onChange={(event) => setSurvivalRate(Number(event.target.value))}
                className="mt-2 w-full accent-emerald-500"
              />
            </label>
            <label className="block text-sm text-primary">
              长期保留：{retainedMegabytes} MB
              <input
                type="range"
                min="20"
                max="1600"
                step="20"
                value={retainedMegabytes}
                onChange={(event) => setRetainedMegabytes(Number(event.target.value))}
                className="mt-2 w-full accent-amber-500"
              />
            </label>
          </div>

          <section aria-live="polite" className="min-h-72 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">一分钟工作集估算</span>
            <strong className="mt-2 block text-lg text-primary">{allocatedPerMinute.toLocaleString()} MB allocated</strong>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3">
                <span className="text-secondary">分配</span>
                <strong className="mt-2 block text-primary">{rangeLabel(allocationRate, 100, 300)}</strong>
              </div>
              <div className="border border-emerald-500/35 bg-emerald-500/10 p-3">
                <span className="text-secondary">晋升</span>
                <strong className="mt-2 block text-primary">{promotedPerMinute} MB</strong>
              </div>
              <div className="border border-amber-500/35 bg-amber-500/10 p-3">
                <span className="text-secondary">保留</span>
                <strong className="mt-2 block text-primary">{rangeLabel(retainedMegabytes, 300, 900)}</strong>
              </div>
            </div>
            <p className="mb-0 mt-5 border-t border-border pt-4 text-xs text-secondary">{pressure}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调整分配、存活和保留三个独立变量；自动回收的性能问题必须先区分“分得快”“活得久”和“根保留得多”。
      </figcaption>
    </figure>
  );
}
