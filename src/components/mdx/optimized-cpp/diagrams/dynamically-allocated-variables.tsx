const lifetimeChoices = [
  {
    model: "Value object",
    identity: "state is the value; copies are independent",
    storage: "automatic/member/contiguous container by default",
    owner: "scope or containing value",
  },
  {
    model: "Unique entity",
    identity: "stable identity; exactly one lifetime controller",
    storage: "value where stable, otherwise unique_ptr/arena handle",
    owner: "one master pointer; observers borrow",
  },
  {
    model: "Shared entity",
    identity: "several independent owners extend lifetime",
    storage: "shared_ptr only when shared ownership is real",
    owner: "control block + explicit weak observers for cycles",
  },
  {
    model: "Bounded pool",
    identity: "handle/index remains stable by policy",
    storage: "static/preallocated slots with free list",
    owner: "pool generation and handle validation",
  },
] as const;

export function OpcStorageOwnershipDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="值对象唯一实体共享实体和有界池四种存储身份与所有权决策图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {lifetimeChoices.map((row, index) => (
            <section
              key={row.model}
              className="min-h-72 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">model 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.model}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.identity}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.storage}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.owner}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        storage duration 是机制，ownership 是销毁责任，value/entity
        是语义；先分开回答三者， 才能判断是否需要 dynamic allocation 与 shared
        ownership。
      </figcaption>
    </figure>
  );
}

const costReductionStages = [
  {
    stage: "Eliminate",
    action: "create by value/static storage; remove unused copies",
    proof: "identity and lifetime remain correct",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    stage: "Amortize",
    action: "reserve/preallocate/reuse outside loops",
    proof: "peak memory and reset policy are bounded",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  {
    stage: "Transfer / borrow",
    action: "move, swap, span/view and const reference",
    proof: "source state and borrower lifetime are explicit",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    stage: "Share / customize",
    action: "make_shared, COW, arena or allocator when measured",
    proof: "contention, invalidation and ownership justify complexity",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function OpcAllocationCopyReductionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="消除分配摊还预分配转移借用和共享定制四阶段动态变量成本优化图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {costReductionStages.map((row, index) => (
            <section
              key={row.stage}
              className={`relative min-h-72 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.action}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.proof}</p>
              {index < costReductionStages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block"
                >
                  →
                </span>
              ) : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先删除 allocation/copy，再摊还、借用或转移；shared_ptr、COW 与 custom
        resource 只在基础工作无法删除且 profile 仍命中时进入候选。
      </figcaption>
    </figure>
  );
}

const layoutRows = [
  {
    layout: "Pointer graph",
    storage: "one allocation per node + links",
    traversal: "pointer chasing, fragmented lines",
    mutation: "easy local insert; complex lifetime",
  },
  {
    layout: "Flat records",
    storage: "contiguous vector of compact values",
    traversal: "prefetch/vectorization-friendly scan",
    mutation: "reallocation/moves; indexes may need repair",
  },
  {
    layout: "Structure of arrays",
    storage: "one dense array per hot field",
    traversal: "high line utilization for field-wise loops",
    mutation: "parallel arrays must preserve row identity",
  },
  {
    layout: "Pool + handles",
    storage: "preallocated slots and index/generation handles",
    traversal: "dense active set if compacted/partitioned",
    mutation: "handle validation and free-list policy",
  },
] as const;

export function OpcFlattenDataStructureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="指针图扁平记录字段数组和对象池句柄四种数据布局的存储遍历与修改比较图"
          className="space-y-3"
        >
          {layoutRows.map((row, index) => (
            <section
              key={row.layout}
              className="grid min-h-40 gap-3 border border-fuchsia-500/30 bg-fuchsia-500/10 p-4 lg:grid-cols-[0.7fr_1.2fr_1.2fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  layout 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.layout}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.storage}
              </code>
              <span className="text-xs text-primary">{row.traversal}</span>
              <span className="text-xs text-secondary">{row.mutation}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        flatten data structures 用连续 storage 和 index/handle 减少 node
        allocation 与 pointer chasing，但必须重新证明 identity、reference
        stability 与 mutation contract。
      </figcaption>
    </figure>
  );
}
