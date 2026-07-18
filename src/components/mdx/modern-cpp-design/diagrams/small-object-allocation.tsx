const costRows = [
  { request: "16-byte node", allocator: "general free store", work: "size class + metadata + synchronization + search", risk: "fixed overhead dominates payload" },
  { request: "16-byte node", allocator: "fixed-size pool", work: "pop one free block", risk: "pool retains chunks / exact-size contract" },
  { request: "4 KiB buffer", allocator: "general free store", work: "large allocation path", risk: "pooling offers little relative gain" },
] as const;

export function McdAllocatorCostMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="小对象经通用分配器或固定大小池与大对象经通用分配器的成本比较" className="grid gap-3 lg:grid-cols-3">
          {costRows.map((row, index) => (
            <section key={`${row.request}-${row.allocator}`} className="min-h-64 border border-amber-500/35 bg-amber-500/10 p-4">
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.request}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.allocator}</code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.work}</p>
              <span className="mt-4 block border-t border-border pt-3 text-xs text-secondary">{row.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        池化收益来自把通用决策与系统申请摊到一整个 Chunk，而不是让单次 malloc 神秘地变快。
      </figcaption>
    </figure>
  );
}

const blocks = ["free → 3", "used", "free → 5", "free → end", "used", "free → 2"] as const;

export function McdChunkFreelistMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="一个 Chunk 被切成等大块并用块内索引串成空闲链表的结构图" className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {blocks.map((block, index) => (
              <section key={`${block}-${index}`} className={`min-h-32 border p-3 ${block === "used" ? "border-rose-500/35 bg-rose-500/10" : "border-emerald-500/35 bg-emerald-500/10"}`}>
                <span className="text-xs text-secondary">block {index}</span>
                <code className="mt-3 block break-words text-xs text-accent">{block}</code>
              </section>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-3 text-xs">
            <span className="border border-border p-3 text-primary">firstAvailableBlock = 0</span>
            <span className="border border-border p-3 text-primary">blocksAvailable = 4</span>
            <span className="border border-border p-3 text-primary">allocate: head pop · free: head push</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        空闲 block 自身的首字节保存下一个索引；无需额外节点，allocate/deallocate 都只改链头。
      </figcaption>
    </figure>
  );
}

const routingRows = [
  { gate: "size > maxSmallObjectSize", route: "::operator new", invariant: "大对象不进入 buckets" },
  { gate: "bucket exists and has free block", route: "FixedAllocator → Chunk pop", invariant: "size/alignment exact match" },
  { gate: "bucket full", route: "create Chunk then pop", invariant: "one system allocation serves many objects" },
  { gate: "deallocate pointer", route: "owner Chunk → push", invariant: "same allocator, size and thread domain" },
] as const;

export function McdSmallObjectRoutingMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="SmallObjAllocator 按大小路由至系统分配、固定桶、创建 Chunk 或归还所属 Chunk 的流程" className="space-y-3">
          {routingRows.map((row, index) => (
            <section key={row.gate} className="grid min-h-36 gap-3 border border-sky-500/35 bg-sky-500/10 p-4 md:grid-cols-[1.25fr_1fr_1.4fr] md:items-center">
              <strong className="text-xs text-primary">0{index + 1} · {row.gate}</strong>
              <code className="break-words text-xs text-accent">{row.route}</code>
              <span className="text-xs text-secondary">{row.invariant}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SmallObjAllocator 是 router，FixedAllocator 管一个 block size，Chunk 才拥有连续内存与 free list。
      </figcaption>
    </figure>
  );
}
