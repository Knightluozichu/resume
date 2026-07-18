const activityStages = [
  {
    stage: "Baseline",
    observe: "lookup/insert/erase/iterate/build separately",
    evidence: "operation counts, key lengths, hit ratio, latency, memory",
    reject: "one synthetic lookup number",
  },
  {
    stage: "Identify activity",
    observe: "which user operation and phase consumes time?",
    evidence: "profile call path and representative request mix",
    reject: "container type blamed without attribution",
  },
  {
    stage: "Decompose activity",
    observe: "hash/compare/allocation/traversal/rebalance/move",
    evidence: "counters and instrumented key/container work",
    reject: "complexity label used as a causal explanation",
  },
  {
    stage: "Replace + remeasure",
    observe: "algorithm, structure or key representation one at a time",
    evidence: "same semantics + end-to-end A/B + rollback",
    reject: "several variables changed together",
  },
] as const;

export function OpcSearchActivityDecompositionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="键值表基线识别活动分解活动替换重测四阶段搜索优化流程图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {activityStages.map((row, index) => (
            <section
              key={row.stage}
              className="relative min-h-80 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.observe}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.evidence}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                reject: {row.reject}
              </p>
              {index < activityStages.length - 1 ? (
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
        key/value optimization 从完整生命周期 baseline 开始；identify/decompose
        先解释成本来源， replace 才有单变量因果链。
      </figcaption>
    </figure>
  );
}

const searchOptions = [
  {
    option: "std::find on sequence",
    contract: "unsorted, tiny/single-pass lookup",
    costShape: "linear compares, contiguous locality if vector",
    hidden: "full key compare and repeated queries",
  },
  {
    option: "lower_bound / binary_search",
    contract: "sorted random-access range",
    costShape: "log comparisons after sort/build",
    hidden: "nonlocal probes, update/move and ordering contract",
  },
  {
    option: "equal_range",
    contract: "sorted range with duplicate-key interval",
    costShape: "find both bounds then contiguous consume",
    hidden: "sort stability and duplicate semantics",
  },
  {
    option: "std::set / std::map",
    contract: "ordered keys, incremental updates, stable nodes",
    costShape: "log tree traversal and comparison",
    hidden: "node allocations, pointer chasing and key copies",
  },
  {
    option: "std::unordered_map",
    contract: "exact lookup, no ordered iteration requirement",
    costShape: "average hash + bucket/probe + equality",
    hidden: "rehash, memory, collision and adversarial keys",
  },
  {
    option: "Custom structure",
    contract: "measured fixed domain not served by standard choices",
    costShape: "specialized layout/probing/key representation",
    hidden: "correctness, worst case, allocator and maintenance",
  },
] as const;

export function OpcSearchAlgorithmContainerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="顺序查找二分范围查找有序树哈希表和自定义结构六类查找契约与隐藏成本图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {searchOptions.map((row, index) => (
            <section
              key={row.option}
              className="min-h-72 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                option 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.option}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.contract}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.costShape}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                audit: {row.hidden}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        search algorithm 与 container 是 lifecycle
        contract：build/update/lookup/iterate、ordering、 duplicates、reference
        stability 和 memory 必须一起计价。
      </figcaption>
    </figure>
  );
}

const representationLayers = [
  {
    layer: "Owning std::string key",
    gain: "safe value ownership and variable length",
    cost: "allocation/copy + byte comparison/hash",
    guard: "consider transparent borrowed lookup before replacement",
  },
  {
    layer: "Null-terminated C key",
    gain: "interop with C APIs",
    cost: "strlen/strcmp scans and termination dependency",
    guard: "carry validated length; never read beyond buffer",
  },
  {
    layer: "Fixed character array key",
    gain: "inline bounded storage and predictable copy",
    cost: "padding/full-width hash or truncation policy",
    guard: "store logical length and define encoding",
  },
  {
    layer: "Prehashed/interned ID",
    gain: "compact compare and repeated lookup",
    cost: "build table, collision/equality, lifetime",
    guard: "exact fallback and generation/ownership contract",
  },
] as const;

export function OpcKeyRepresentationPenaltyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="拥有字符串空终止字符固定字符数组和预哈希标识四种键表示成本与安全门图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {representationLayers.map((row, index) => (
            <section
              key={row.layer}
              className="min-h-80 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">key 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.layer}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.gain}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.cost}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.guard}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        abstraction penalty 不是抽象本身有罪，而是 abstraction
        的通用工作超出当前 contract； 先用 transparent lookup、range
        和标准算法，再证明 specialized key/layout 值得维护。
      </figcaption>
    </figure>
  );
}
