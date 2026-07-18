type SwapCell = readonly [stage: string, operation: string, guarantee: string];

function SwapGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly SwapCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, operation, guarantee], index) => (
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
              <code className="mt-3 block text-xs text-accent">
                {operation}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {guarantee}
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

const pimplCells = [
  [
    "Widget A",
    "pImpl -> A data",
    "public object 只持有 implementation owner。",
  ],
  ["Widget B", "pImpl -> B data", "大对象状态位于独立 implementation。"],
  [
    "Generic fallback",
    "move + assign",
    "可能触发多次对象级移动和额外 invariant 工作。",
  ],
  [
    "Member swap",
    "pImpl.swap",
    "只交换两个 owner/pointer，不复制 implementation。",
  ],
  ["Complexity", "O(1)", "成本与 implementation 大小无关。"],
  ["Guarantee", "noexcept", "unique owner swap 不分配、不构造业务对象。"],
] as const;

const lookupCells = [
  ["Generic call site", "using std::swap", "先让标准 fallback 进入候选集合。"],
  ["Unqualified call", "swap(a,b)", "保留 ADL 搜索类型 namespace 的能力。"],
  ["ADL candidate", "widget::swap", "同 namespace non-member 被优先匹配。"],
  ["Delegate", "lhs.swap(rhs)", "non-member 转调 private-aware member swap。"],
  ["Fallback", "std::swap", "没有定制时使用标准 move/copy 实现。"],
  ["Special case", "std full specialization", "非模板用户类型可选显式全特化。"],
] as const;

const commitCells = [
  ["Prepare", "T candidate(rhs)", "所有可能失败的复制/分配先在临时对象完成。"],
  ["Failure", "constructor throws", "目标对象尚未修改，异常直接传播。"],
  ["Ready", "candidate valid", "临时对象已满足完整 invariant。"],
  ["Commit", "swap(candidate)", "以 non-throwing swap 一次替换表示。"],
  ["Retire", "candidate destructor", "临时对象持有旧状态并在作用域结束释放。"],
  ["Result", "strong guarantee", "失败保持原值，成功发布完整新值。"],
] as const;

export function EcppPimplSwapCostMap() {
  return (
    <SwapGrid
      ariaLabel="两个控件实现标准后备成员交换常数复杂度不抛保证六项 pimpl swap 图"
      caption="pimpl 类型的语义状态可能很大，但 member swap 只交换 implementation owner，获得 O(1) 且通常不抛。"
      cells={pimplCells}
    />
  );
}

export function EcppSwapLookupProtocolMap() {
  return (
    <SwapGrid
      ariaLabel="引入标准交换非限定调用参数查找转调成员后备特化六阶段 swap 查找图"
      caption="泛型代码使用 using std::swap 后非限定调用，使 ADL 定制与标准 fallback 同时可用。"
      cells={lookupCells}
    />
  );
}

export function EcppSwapCommitGuaranteeMap() {
  return (
    <SwapGrid
      ariaLabel="准备失败候选就绪提交退役强保证六阶段 copy swap 事务图"
      caption="可能抛异常的工作全部在 prepare 阶段；只有 swap 不抛，才能成为可靠 commit point。"
      cells={commitCells}
    />
  );
}
