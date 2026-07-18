type StrategyCell = readonly [
  stage: string,
  mechanism: string,
  tradeoff: string,
];

function StrategyGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly StrategyCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, mechanism, tradeoff], index) => (
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
                {mechanism}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {tradeoff}
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

const nviCells = [
  [
    "Public entry",
    "healthValue()",
    "稳定 non-virtual API，客户不能绕过统一流程。",
  ],
  ["Precondition", "lock / validate", "base 集中检查状态并建立同步边界。"],
  [
    "Virtual hook",
    "doHealthValue()",
    "derived 只定制核心计算，不重写外围契约。",
  ],
  ["Normalize", "clamp result", "base 统一范围、错误和单位。"],
  ["Observe", "audit / metrics", "所有 implementations 都经过相同观测。"],
  [
    "Return",
    "stable contract",
    "客户获得一致结果，hook 细节保持 private/protected。",
  ],
] as const;

const callableCells = [
  [
    "Function pointer",
    "int (*)(character)",
    "零/低封装开销，只接受普通函数或无捕获 callable。",
  ],
  [
    "std::function",
    "callable erasure",
    "接受 lambda、functor、bind，可能分配并有间接调用成本。",
  ],
  [
    "Per-object choice",
    "constructor injection",
    "同一 concrete class 的不同对象可使用不同算法。",
  ],
  [
    "Runtime replace",
    "set calculator",
    "状态允许时可切换行为，不需改变 dynamic type。",
  ],
  [
    "Test double",
    "lambda/fake",
    "测试直接注入边界结果和失败，无需建 derived class。",
  ],
  [
    "Access boundary",
    "public snapshot/context",
    "外部 callable 不应依赖 GameCharacter private representation。",
  ],
] as const;

const objectCells = [
  [
    "Strategy interface",
    "HealthCalc",
    "算法拥有独立 contract 与 virtual dispatch。",
  ],
  [
    "Concrete policy",
    "Normal / Poisoned",
    "每种策略可持有参数、cache 与资源。",
  ],
  ["Character owns", "unique_ptr", "每个角色独占策略，lifetime 清楚。"],
  [
    "Character shares",
    "shared_ptr<const>",
    "不可变策略可共享，但 reference count/identity 增加。",
  ],
  [
    "Swap policy",
    "setStrategy",
    "运行期切换需同步、validation 与 failure guarantee。",
  ],
  [
    "Independent tests",
    "contract suite",
    "策略本身和 Character 委托分别测试。",
  ],
] as const;

export function EcppNviControlFlowMap() {
  return (
    <StrategyGrid
      ariaLabel="公开入口前置虚钩子归一化观测返回六阶段 NVI 控制流程图"
      caption="NVI 把 public contract 固定在 non-virtual wrapper，virtual hook 只负责可替换算法步骤。"
      cells={nviCells}
    />
  );
}

export function EcppCallableInjectionMap() {
  return (
    <StrategyGrid
      ariaLabel="函数指针 std function 每对象选择运行切换测试替身访问边界六项 callable 注入图"
      caption="function pointer/std::function 让行为按对象注入而非按 class override，代价是 callable lifetime、间接调用和访问边界。"
      cells={callableCells}
    />
  );
}

export function EcppStrategyObjectOwnershipMap() {
  return (
    <StrategyGrid
      ariaLabel="策略接口具体策略独占共享切换独立测试六项 Strategy 所有权图"
      caption="Strategy object 将算法契约、状态和生命周期独立建模，GameCharacter 只组合并委托。"
      cells={objectCells}
    />
  );
}
