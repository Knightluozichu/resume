const contractQuestions = [
  {
    axis: "Access",
    questions: "scan, random index, exact/range lookup, front/back?",
    metric: "operations and distribution per scenario",
  },
  {
    axis: "Mutation",
    questions: "append, middle insert/erase, duplicates, splice?",
    metric: "moves, allocations, rehash/rebalance and bursts",
  },
  {
    axis: "Stability",
    questions: "must pointers/iterators/order survive mutation?",
    metric: "explicit invalidation and ordering tests",
  },
  {
    axis: "Representation",
    questions: "contiguous, segmented, node, buckets, overhead?",
    metric: "RSS/bytes per item, cache misses and traversal",
  },
] as const;

export function OpcContainerExperimentContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="访问修改稳定性和表示四个容器实验契约维度图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contractQuestions.map((row, index) => (
            <section
              key={row.axis}
              className="min-h-72 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">axis 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.axis}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.questions}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                measure: {row.metric}
              </code>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        container 名称不是答案；先冻结 access/mutation/stability/representation
        contract，再对同一 workload
        experimenting，才能把语义差异与性能差异分开。
      </figcaption>
    </figure>
  );
}

const sequenceRows = [
  {
    container: "std::vector / std::string",
    insertion: "fast append with capacity; middle shifts suffix",
    iterationSort: "contiguous scan and random-access sort",
    mainRisk: "reallocation/move and reference invalidation",
  },
  {
    container: "std::deque",
    insertion: "fast ends; segmented middle operations still move",
    iterationSort: "random access, segmented traversal and sortable",
    mainRisk: "larger constants and noncontiguous storage",
  },
  {
    container: "std::list",
    insertion: "constant relink only with known position",
    iterationSort: "pointer traversal; member sort relinks nodes",
    mainRisk: "one allocation/node and poor locality",
  },
  {
    container: "std::forward_list",
    insertion: "cheap after known predecessor",
    iterationSort: "forward-only traversal; member sort",
    mainRisk: "no size/random/backward access; predecessor search",
  },
] as const;

export function OpcSequenceContainerOperationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="vector string deque list forward_list插入迭代排序和主要风险比较图"
          className="space-y-3"
        >
          {sequenceRows.map((row, index) => (
            <section
              key={row.container}
              className="grid min-h-40 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 lg:grid-cols-[0.8fr_1.3fr_1.3fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  sequence 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.container}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.insertion}
              </code>
              <span className="text-xs text-primary">{row.iterationSort}</span>
              <span className="text-xs text-secondary">{row.mainRisk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        list 的 O(1) insertion 需要已知位置，定位位置仍可能 O(n)；vector
        的移动成本则常由连续 iteration/sort locality 抵消。完整 operation mix
        才能选 sequence。
      </figcaption>
    </figure>
  );
}

const associativeRows = [
  {
    family: "map / set",
    semantics: "ordered unique key/value or key",
    lookup: "log tree compare + node traversal",
    use: "range/order, incremental updates, stable nodes",
  },
  {
    family: "multimap / multiset",
    semantics: "ordered duplicate-equivalent keys",
    lookup: "equal_range over ordered interval",
    use: "duplicate grouping and ordered traversal",
  },
  {
    family: "unordered_map",
    semantics: "unique exact key, unspecified iteration order",
    lookup: "average hash/bucket/equality",
    use: "lookup-heavy, no order/range requirement",
  },
  {
    family: "unordered_multimap",
    semantics: "duplicate exact keys, unspecified order",
    lookup: "hash then equivalent bucket/range",
    use: "duplicate lookup without ordered semantics",
  },
  {
    family: "Flat/sorted structures",
    semantics: "application-built contiguous order",
    lookup: "binary/range search",
    use: "read-mostly or batched rebuild workloads",
  },
  {
    family: "Domain structures",
    semantics: "heap, bitset, trie, ring, pool, spatial index",
    lookup: "task-specific operation",
    use: "contract not expressed by standard containers",
  },
] as const;

export function OpcAssociativeStructureDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="有序唯一有序重复无序唯一无序重复扁平结构和领域结构六类关联数据结构决策图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {associativeRows.map((row, index) => (
            <section
              key={row.family}
              className="min-h-72 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                family 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.family}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.semantics}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.lookup}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.use}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ordered/duplicate/range/iteration 与 update model 先决定 associative
        family；other data structures 只在标准 contract 无法表达 measured
        workload 时进入候选。
      </figcaption>
    </figure>
  );
}
