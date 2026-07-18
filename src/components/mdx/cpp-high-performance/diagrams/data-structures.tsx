const memoryPaths = [
  {
    layout: "Contiguous values",
    address: "base + index × sizeof(T)",
    hardware: "cache lines + prefetch",
    risk: "growth moves values",
  },
  {
    layout: "Segmented sequence",
    address: "map -> block -> offset",
    hardware: "local runs inside each block",
    risk: "not one contiguous span",
  },
  {
    layout: "Node chain / tree",
    address: "load pointer -> next address",
    hardware: "dependent loads",
    risk: "metadata + allocation + misses",
  },
] as const;

export function ChpMemoryAccessLayoutMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="连续值分段序列和节点结构从地址生成到硬件访问及风险的内存布局图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {memoryPaths.map((path, index) => (
            <section
              key={path.layout}
              className="min-h-64 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                layout 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {path.layout}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {path.address}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{path.hardware}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                risk: {path.risk}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        complexity相同不代表地址序列相同；先画出下一地址如何产生，才能判断prefetch、cache
        line利用率与依赖链。
      </figcaption>
    </figure>
  );
}

const sequenceChoices = [
  {
    container: "array",
    contract: "fixed extent + contiguous",
    wins: "embedded value and stack/member storage",
    invalidates: "no structural growth",
  },
  {
    container: "vector",
    contract: "dynamic extent + contiguous",
    wins: "scan, random access, bulk algorithms",
    invalidates: "reallocation; suffix after insert/erase",
  },
  {
    container: "deque",
    contract: "dynamic segmented blocks",
    wins: "push/pop at both ends",
    invalidates: "operation-specific; verify contract",
  },
  {
    container: "list",
    contract: "stable node identity",
    wins: "known-position splice/erase",
    invalidates: "erased element only",
  },
] as const;

export function ChpSequenceContainerDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="array vector deque list按布局契约优势操作和失效风险比较的容器决策图"
          className="space-y-3"
        >
          {sequenceChoices.map((item, index) => (
            <section
              key={item.container}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.5fr_1fr_1.3fr_1.3fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.container}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.contract}
              </code>
              <span className="text-xs text-primary">{item.wins}</span>
              <span className="text-xs text-secondary">
                invalidation: {item.invalidates}
              </span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从必须满足的布局与稳定性contract筛选，再用完整操作mix测量；“中间插入”本身不足以直接选择list。
      </figcaption>
    </figure>
  );
}

const representationTrades = [
  {
    model: "Ordered tree",
    arrangement: "key order + nodes",
    query: "logarithmic lookup and range",
    tune: "comparator + allocation",
  },
  {
    model: "Hash table",
    arrangement: "hash -> bucket -> equality",
    query: "average constant lookup",
    tune: "hash + load factor + reserve",
  },
  {
    model: "AoS",
    arrangement: "record0 fields, record1 fields",
    query: "one complete entity at a time",
    tune: "padding + field order",
  },
  {
    model: "Parallel arrays / SoA",
    arrangement: "all x, all y, all velocity",
    query: "one field across many entities",
    tune: "index identity + block width",
  },
] as const;

export function ChpAssociativeParallelArrayMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="有序树哈希表AoS和parallel arrays从排列查询到调优杠杆的表示取舍图"
          className="grid gap-4 md:grid-cols-2"
        >
          {representationTrades.map((item, index) => (
            <section
              key={item.model}
              className="min-h-52 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">model 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.model}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.arrangement}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{item.query}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                tune: {item.tune}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据结构的核心是排列：按key
        order、bucket或字段批次排列，分别服务range、lookup与批处理访问。
      </figcaption>
    </figure>
  );
}
