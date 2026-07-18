const categoryRows = [
  {
    category: "Input",
    operations: "read + increment",
    guarantee: "single pass may be enough",
    algorithm: "find, accumulate",
  },
  {
    category: "Forward",
    operations: "input + multi-pass",
    guarantee: "copied positions remain reusable",
    algorithm: "multi-pass partitioning",
  },
  {
    category: "Bidirectional",
    operations: "forward + decrement",
    guarantee: "walk in both directions",
    algorithm: "reverse traversal",
  },
  {
    category: "Random access",
    operations: "jump + difference + index",
    guarantee: "constant-time position arithmetic",
    algorithm: "sort, binary search",
  },
] as const;

export function ChpIteratorContractCategoryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="input forward bidirectional和random access迭代器从操作到语义保证及算法用途的类别契约图"
          className="space-y-3"
        >
          {categoryRows.map((row, index) => (
            <section
              key={row.category}
              className="grid min-h-36 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.7fr_1fr_1.3fr_1fr] md:items-center"
            >
              <strong className="text-sm text-primary">
                <span className="mr-2 text-xs text-secondary">
                  0{index + 1}
                </span>
                {row.category}
              </strong>
              <code className="break-words text-xs text-accent">
                {row.operations}
              </code>
              <span className="text-xs text-secondary">{row.guarantee}</span>
              <span className="text-xs text-primary">{row.algorithm}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        category把可写出的表达式与复杂度保证绑定；algorithm只应要求解决问题所需的最弱真实能力。
      </figcaption>
    </figure>
  );
}

const dispatchFlow = [
  {
    stage: "Extract",
    expression: "iterator_traits<It>::iterator_category",
    result: "capability tag",
  },
  {
    stage: "Dispatch",
    expression: "impl(first, last, category{})",
    result: "compile-time overload",
  },
  {
    stage: "Generic path",
    expression: "while (first != last) ++first",
    result: "linear increments",
  },
  {
    stage: "Random path",
    expression: "last - first",
    result: "constant-time difference",
  },
] as const;

export function ChpIteratorTraitsDispatchMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="iterator traits提取类别并通过tag dispatch选择线性或常数时间算法路径的流程图"
          className="grid gap-4 lg:grid-cols-4"
        >
          {dispatchFlow.map((item, index) => (
            <section
              key={item.stage}
              className="min-h-56 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.expression}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">{item.result}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        dispatch依据能力而非container名称：raw pointer与任意真实random-access
        iterator都可共享常数时间路径。
      </figcaption>
    </figure>
  );
}

const linearStates = [
  {
    state: "Construct",
    invariant: "step != 0 and direction reaches bound",
    transition: "current = first",
  },
  {
    state: "Readable",
    invariant: "current remains inside half-open bound",
    transition: "dereference returns current",
  },
  {
    state: "Advance",
    invariant: "checked current + step",
    transition: "next value or completed state",
  },
  {
    state: "End",
    invariant: "not dereferenceable",
    transition: "bidirectional design preserves last",
  },
] as const;

export function ChpLinearRangeStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="linear range iterator从构造可读推进到结束状态的边界不变量图"
          className="grid gap-4 md:grid-cols-2"
        >
          {linearStates.map((item, index) => (
            <section
              key={item.state}
              className="min-h-52 border border-amber-500/35 bg-amber-500/10 p-4"
            >
              <span className="text-xs text-secondary">state 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {item.state}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {item.invariant}
              </code>
              <p className="mb-0 mt-5 text-xs text-primary">
                {item.transition}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        end是状态契约，不应依赖step恰好命中bound；更强的bidirectional承诺还要求从end恢复last位置。
      </figcaption>
    </figure>
  );
}
