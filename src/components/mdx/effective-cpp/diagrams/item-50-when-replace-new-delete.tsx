type ReplacementCell = readonly [
  stage: string,
  evidence: string,
  decision: string,
];

function ReplacementGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly ReplacementCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, evidence, decision], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{evidence}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {decision}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const decisionCells = [
  [
    "State problem",
    "error / speed / stats",
    "先写出默认 allocator 的具体缺口。",
  ],
  ["Baseline", "latency + bytes + traces", "记录当前行为和 workload 分布。"],
  [
    "Try existing",
    "sanitizer / pmr / pool",
    "优先采用已验证工具或局部 resource。",
  ],
  ["Prototype", "scoped replacement", "缩小到 class、arena 或 subsystem。"],
  [
    "Contract gate",
    "alignment / OOM / threads",
    "保持 new/delete 全部语言契约。",
  ],
  ["Ship evidence", "A/B regression budget", "收益必须覆盖复杂度和维护成本。"],
] as const;

const guardCells = [
  ["Header", "size + state + callsite", "记录分配元数据和生命周期。"],
  ["Front guard", "0xA5 pattern", "检测写入 payload 之前的 underrun。"],
  ["Payload", "requested bytes", "返回给客户且满足目标 alignment。"],
  ["Rear guard", "0x5A pattern", "检测写过 payload 尾部的 overrun。"],
  ["Delete check", "allocated -> freed", "识别 double delete 与陌生 pointer。"],
  ["Quarantine", "delay reuse", "延迟重用提高 use-after-free 可见性。"],
] as const;

const localityCells = [
  ["Trace", "size / lifetime / thread", "采集真实分配形状而非平均值。"],
  [
    "Separate classes",
    "small / large / transient",
    "按尺寸和寿命选择不同策略。",
  ],
  ["Cluster", "same traversal page", "相关对象靠近以减少 cache/TLB misses。"],
  ["Pool", "fixed-size free list", "降低热点固定尺寸 metadata 和锁成本。"],
  ["Align", "hardware requirement", "只为 SIMD、DMA 等明确需求提高对齐。"],
  ["Measure", "p50/p99 + RSS + cache", "同时验证延迟、内存、碎片和局部性。"],
] as const;

export function EcppAllocationReplacementDecisionMap() {
  return (
    <ReplacementGrid
      ariaLabel="陈述问题基线测量现成工具局部原型契约门禁证据发布六阶段 new delete 替换决策图"
      caption="替换 new/delete 必须从可测缺口开始，先尝试成熟工具和局部 resource，再以完整契约与回归预算决定发布。"
      cells={decisionCells}
    />
  );
}

export function EcppDebugAllocationGuardMap() {
  return (
    <ReplacementGrid
      ariaLabel="分配头前护栏客户载荷后护栏释放检查隔离区六段调试分配布局图"
      caption="debug allocator 用元数据、前后 guards 和 quarantine 暴露 underrun、overrun、double delete 与 use-after-free。"
      cells={guardCells}
    />
  );
}

export function EcppAllocationLocalityMap() {
  return (
    <ReplacementGrid
      ariaLabel="采集轨迹尺寸分类对象聚簇固定池特殊对齐综合测量六阶段分配性能局部性图"
      caption="性能替换应按尺寸、寿命和线程分层，clustering/pool/alignment 的收益用尾延迟、RSS 与 cache 证据共同验证。"
      cells={localityCells}
    />
  );
}
