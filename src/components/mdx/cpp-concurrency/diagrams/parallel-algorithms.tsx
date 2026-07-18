const contracts = [
  [
    "Policy",
    "permission, not promise",
    "seq 禁止并行；par 与 par_unseq 只允许实现并行，资源不足时仍可退回顺序执行。",
  ],
  [
    "Algebra",
    "grouping may change",
    "reduce 与 scan 会改变分组；先证明运算满足所需代数性质，再接受浮点末位差异。",
  ],
  [
    "Isolation",
    "no races or order coupling",
    "元素访问不得依赖调用顺序；共享写必须消除、分区，或交给归约算法合并。",
  ],
  [
    "Callable",
    "concurrent + strict contract",
    "sort 比较器既要满足严格弱序，也要能被并发调用；不要捕获可变共享状态。",
  ],
  [
    "Failure",
    "standard policy => terminate",
    "标准执行策略下，元素访问函数的异常越过算法边界会 terminate；副作用可能已经发生。",
  ],
  [
    "Measure",
    "backend + grain + workload",
    "标准策略不暴露线程池或粒度控制；确认实现后端，并用顺序基线和规模曲线实测。",
  ],
] as const;

export function ParallelAlgorithmContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C++并发编程实战第十章并行算法的策略代数隔离可调用对象失败和测量六项契约图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {contracts.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 10
        的并行算法审查顺序：先确认策略只授予执行许可，再检查代数、隔离、可调用对象、失败语义与实际收益。
      </figcaption>
    </figure>
  );
}
