const algorithmStages = [
  {
    stage: "Range",
    contract: "[first, one-past last)",
    evidence: "valid iterators + lifetime",
  },
  {
    stage: "Capability",
    contract: "minimum iterator category",
    evidence: "operations and complexity",
  },
  {
    stage: "Callable",
    contract: "predicate / strict ordering",
    evidence: "pure semantics + properties",
  },
  {
    stage: "Result",
    contract: "iterator, count, partition or output end",
    evidence: "caller consumes exact meaning",
  },
] as const;

export function ChpAlgorithmContractPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="标准算法从半开区间迭代器能力可调用对象到返回值语义的契约管线图"
          className="grid gap-4 lg:grid-cols-4"
        >
          {algorithmStages.map((item, index) => (
            <section
              key={item.stage}
              className="min-h-56 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.contract}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{item.evidence}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        algorithm call的正确性来自整条契约：区间、能力、callable与return
        meaning缺一不可。
      </figcaption>
    </figure>
  );
}

const orderingNeeds = [
  {
    need: "One extreme",
    tool: "min/max_element",
    ordering: "no ordering among others",
    growth: "linear scan",
  },
  {
    need: "k-th boundary",
    tool: "nth_element",
    ordering: "partition around nth",
    growth: "average linear work",
  },
  {
    need: "Sorted top-k",
    tool: "partial_sort",
    ordering: "first k fully ordered",
    growth: "about n log k",
  },
  {
    need: "All ordered",
    tool: "sort / stable_sort",
    ordering: "total range order",
    growth: "n log n comparisons",
  },
] as const;

export function ChpPartialOrderingDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="从单个极值第k分界有序top-k到全量排序的需求与算法决策图"
          className="space-y-3"
        >
          {orderingNeeds.map((item, index) => (
            <section
              key={item.need}
              className="grid min-h-36 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_0.9fr_1.2fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {item.need}
              </strong>
              <code className="break-words text-xs text-accent">
                {item.tool}
              </code>
              <span className="text-xs text-primary">{item.ordering}</span>
              <span className="text-xs text-secondary">{item.growth}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先写出真正需要的order，再选择最少建立该order的algorithm；n、k、payload和streaming共同决定交叉点。
      </figcaption>
    </figure>
  );
}

const rangeLayers = [
  {
    layer: "Source range",
    behavior: "owns or borrows elements",
    cost: "lifetime + iterator category",
  },
  {
    layer: "View pipeline",
    behavior: "lazy filter / transform / take",
    cost: "per-demand branch and recomputation",
  },
  {
    layer: "Terminal algorithm",
    behavior: "find / copy / reduce / materialize",
    cost: "drives iteration",
  },
  {
    layer: "Action",
    behavior: "eager mutation such as sort",
    cost: "changes underlying range now",
  },
] as const;

export function ChpRangesCompositionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="ranges从数据源经惰性views到终端algorithm或立即action的组合模型图"
          className="grid gap-4 md:grid-cols-2"
        >
          {rangeLayers.map((item, index) => (
            <section
              key={item.layer}
              className="min-h-52 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.layer}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.behavior}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{item.cost}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        view只描述按需适配，terminal
        consumption才驱动工作；action则立即执行，三者lifetime和side-effect语义不同。
      </figcaption>
    </figure>
  );
}
