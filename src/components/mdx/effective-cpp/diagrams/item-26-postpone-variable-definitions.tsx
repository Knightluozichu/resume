type LifetimeCell = readonly [stage: string, code: string, cost: string];

function LifetimeGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly LifetimeCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, code, cost], index) => (
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
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {cost}
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

const wastedCells = [
  [
    "Enter",
    "std::string encrypted",
    "default constructor 建立尚无业务值的对象。",
  ],
  ["Validate", "if invalid throw", "失败路径从未使用 encrypted。"],
  ["Unwind", "~encrypted", "仍要析构无用对象，构造析构成本被浪费。"],
  [
    "Assign",
    "encrypted = password",
    "成功路径再执行 assignment，替换默认状态。",
  ],
  ["Use", "encrypt(encrypted)", "变量直到此处附近才真正需要。"],
  ["Return", "return encrypted", "生命周期覆盖了不必要的前置区间。"],
] as const;

const directCells = [
  ["Validate input", "check(password)", "对象尚未定义，失败路径没有对象成本。"],
  ["Need begins", "after checks", "所有构造参数已齐备，进入最小必要 scope。"],
  [
    "Direct init",
    "string encrypted(password)",
    "一次 copy construction 建立最终初值。",
  ],
  ["Transform", "encrypt(encrypted)", "对象从定义起立即具有业务含义。"],
  ["Return", "return encrypted", "copy elision/move 处理返回传递。"],
  ["Destroy", "caller lifetime", "局部无额外 default state 与 assignment。"],
] as const;

const loopCells = [
  ["Outside ctor", "1 constructor", "循环开始前创建一个 reusable object。"],
  ["Outside body", "n assignments", "每轮替换旧值，可能复用 capacity。"],
  [
    "Outside scope",
    "wider lifetime",
    "对象在迭代间保持状态，增加误用和别名风险。",
  ],
  ["Inside ctor", "n constructors", "每轮直接用当次参数建立对象。"],
  ["Inside dtor", "n destructors", "每轮结束立即释放，scope 与迭代一致。"],
  [
    "Decision",
    "measure semantics",
    "比较 ctor+dtor 与 assignment，并优先正确最小 scope。",
  ],
] as const;

export function EcppWastedLifetimeCostMap() {
  return (
    <LifetimeGrid
      ariaLabel="进入默认构造验证异常析构赋值使用返回六阶段无效生命周期成本图"
      caption="验证前定义变量让失败路径承担无用构造析构，成功路径还多一次 default-then-assign。"
      cells={wastedCells}
    />
  );
}

export function EcppDirectInitializationFlowMap() {
  return (
    <LifetimeGrid
      ariaLabel="验证输入需求开始直接初始化变换返回析构六阶段延后定义图"
      caption="延后到参数齐备的位置直接初始化，使对象从诞生起就有业务值，并缩短 lifetime。"
      cells={directCells}
    />
  );
}

export function EcppLoopVariableTradeoffMap() {
  return (
    <LifetimeGrid
      ariaLabel="循环外构造赋值宽作用域循环内构造析构测量六项变量策略图"
      caption="循环外复用是一次构造加 n 次赋值；循环内定义是 n 次构造析构，选择取决于语义与实测成本。"
      cells={loopCells}
    />
  );
}
