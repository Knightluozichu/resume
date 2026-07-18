type TraitsCell = readonly [stage: string, syntax: string, effect: string];

function TraitsGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly TraitsCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, syntax, effect], index) => (
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
              <code className="mt-3 block text-xs text-accent">{syntax}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {effect}
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

const lookupCells = [
  ["Algorithm asks", "iterator_traits<I>", "客户只依赖统一 traits 入口。"],
  ["Class iterator", "I::iterator_category", "主模板转发 class nested type。"],
  ["Raw pointer", "T*", "pointer 无法声明 nested members。"],
  [
    "Partial specialization",
    "iterator_traits<T*>",
    "traits 为 pointer 注入 random-access tag。",
  ],
  ["Uniform result", "category type", "两类输入都产出同名 type information。"],
  [
    "No runtime object",
    "compile-time only",
    "类型选择不需要实例状态或 virtual call。",
  ],
] as const;

const dispatchCells = [
  ["Input tag", "++iter", "单向逐步移动，负距离无定义或拒绝。"],
  ["Forward tag", "input derived", "可多次遍历，沿用单向实现。"],
  ["Bidirectional tag", "++ / --", "正负距离分别循环。"],
  ["Random-access tag", "iter += distance", "常量时间跳转。"],
  ["Pass tag", "Category{}", "public wrapper 把类型信息变成 overload 参数。"],
  ["Best overload", "compile-time", "tag hierarchy 让最具体实现胜出。"],
] as const;

const workflowCells = [
  [
    "Identify fact",
    "iterator capability",
    "找出 generic algorithm 需要的类型信息。",
  ],
  ["Name trait", "iterator_category", "建立稳定、语义明确的查询名。"],
  ["Primary template", "Traits<I>", "定义常规用户类型获取路径。"],
  ["Specialize", "Traits<T*>", "为不能自行提供成员的类型适配。"],
  [
    "Dispatch",
    "doAdvance(tag)",
    "用 overloads 编码 capability-specific algorithms。",
  ],
  ["Test", "custom + pointer", "覆盖每类 tag、复杂度和非法距离。"],
] as const;

export function EcppIteratorTraitsLookupMap() {
  return (
    <TraitsGrid
      ariaLabel="算法查询类迭代器原始指针偏特化统一结果无运行对象六阶段迭代器 traits 查询图"
      caption="traits class 把 class nested type 和 raw pointer specialization 统一成一个编译期信息接口。"
      cells={lookupCells}
    />
  );
}

export function EcppIteratorTagDispatchMap() {
  return (
    <TraitsGrid
      ariaLabel="输入标签前向标签双向标签随机访问标签传递标签最佳重载六阶段迭代器标签分派图"
      caption="category tags 形成能力层级，public algorithm 把 trait 结果传给 overload set，在编译期选择最佳实现。"
      cells={dispatchCells}
    />
  );
}

export function EcppTraitsDesignWorkflowMap() {
  return (
    <TraitsGrid
      ariaLabel="识别信息命名 trait 主模板特化分派测试六阶段 traits 类设计流程图"
      caption="先定义要查询的事实，再提供主模板和必要 specializations，最后以分派和复杂度测试验证。"
      cells={workflowCells}
    />
  );
}
