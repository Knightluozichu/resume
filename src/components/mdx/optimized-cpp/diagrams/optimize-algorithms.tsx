const costCases = [
  {
    caseName: "Best case",
    question: "what favorable input/state makes work smallest?",
    example: "first element matches in a linear scan",
    misuse: "reporting it as the normal user experience",
  },
  {
    caseName: "Average / expected",
    question: "what probability distribution is being averaged?",
    example: "hash lookup under measured key/load distribution",
    misuse: "assuming uniform inputs without evidence",
  },
  {
    caseName: "Worst case",
    question: "what legal input maximizes work or latency?",
    example: "collision/adversarial pattern or bad pivot sequence",
    misuse: "ignoring tail/SLO or attacker-controlled input",
  },
  {
    caseName: "Amortized",
    question: "what operation sequence shares occasional growth cost?",
    example: "many vector pushes across geometric reallocations",
    misuse: "using an average to hide one forbidden latency spike",
  },
] as const;

export function OpcAlgorithmCostCaseMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="算法最好平均最坏和摊还四类时间成本的问题示例与误用比较图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {costCases.map((row, index) => (
            <section
              key={row.caseName}
              className="min-h-64 border border-violet-500/35 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">case 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.caseName}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.question}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.example}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                reject: {row.misuse}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Big-O 只描述增长上界的一部分；每个性能结论还必须声明 input
        distribution、 常数、memory traffic，以及单次 tail 是否允许被 amortize。
      </figcaption>
    </figure>
  );
}

const searchSortChoices = [
  {
    need: "One/few queries, small n",
    choice: "linear scan or tiny insertion-style work",
    prerequisite: "contiguous data and low setup cost",
    verify: "constants, branch/locality and actual n range",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    need: "Many queries, ordered static data",
    choice: "sort once + binary/equal-range search",
    prerequisite: "ordering cost can be amortized",
    verify: "updates, duplicates and comparator semantics",
    tone: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    need: "Exact lookup, mutable set",
    choice: "hashing with controlled load/collision policy",
    prerequisite: "stable hash/equality and memory budget",
    verify: "worst/adversarial keys and iteration needs",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
  {
    need: "General sorting contract",
    choice: "mature sort/stable_sort/partial selection",
    prerequisite: "required stability and output scope known",
    verify: "input order, comparator, worst case and moves",
    tone: "border-rose-500/35 bg-rose-500/10",
  },
] as const;

export function OpcSearchSortDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="小规模扫描有序数据二分哈希查找和通用排序的输入契约决策图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {searchSortChoices.map((row, index) => (
            <section
              key={row.need}
              className={`min-h-80 border p-4 ${row.tone}`}
            >
              <span className="text-xs text-secondary">
                option 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.need}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.choice}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">
                requires: {row.prerequisite}
              </p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                measure: {row.verify}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        efficient search/sort 不是固定容器答案；query count、small
        n、mutation、stability、 input order 与 adversarial risk 共同决定
        end-to-end 成本。
      </figcaption>
    </figure>
  );
}

const workTransformations = [
  {
    lever: "Precomputation",
    exchange: "build earlier → cheap repeated query",
    proof: "build + storage amortizes across query count",
  },
  {
    lever: "Lazy computation",
    exchange: "compute only demanded values",
    proof: "unused fraction exceeds checks/state overhead",
  },
  {
    lever: "Batching / bigger bites",
    exchange: "one boundary/loop handles many items",
    proof: "amortized setup beats added queue latency",
  },
  {
    lever: "Caching",
    exchange: "memory + invalidation for reuse",
    proof: "hit rate and saved work exceed lookup/eviction cost",
  },
  {
    lever: "Specialization / expected path",
    exchange: "common case bypasses general machinery",
    proof: "distribution is stable and fallback stays correct",
  },
  {
    lever: "Hinting / hashing / double-checking",
    exchange: "cheap predictor narrows expensive verification",
    proof: "false positives/negatives and fallback are bounded",
  },
] as const;

export function OpcAlgorithmWorkTransformationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="预计算惰性计算批处理缓存专门化提示哈希复查六类移除工作的交换与验证图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {workTransformations.map((row, index) => (
            <section
              key={row.lever}
              className="min-h-60 border border-fuchsia-500/30 bg-fuchsia-500/10 p-4"
            >
              <span className="text-xs text-secondary">
                transform 0{index + 1}
              </span>
              <strong className="mt-2 block text-sm text-primary">
                {row.lever}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.exchange}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.proof}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每种“更快”都在交换时间、memory、latency 或 correctness complexity；用
        break-even、 hit rate、fallback 和 invalidation
        证据判断工作是否真的减少。
      </figcaption>
    </figure>
  );
}
