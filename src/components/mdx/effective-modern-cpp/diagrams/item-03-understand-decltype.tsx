type DecltypeCell = readonly [
  stage: string,
  expression: string,
  result: string,
];

function DecltypeGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly DecltypeCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, expression, result], index) => (
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
                {expression}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {result}
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

const rules = [
  [
    "Unparenthesized name",
    "decltype(x)",
    "返回 x 的 declared type，含 cv/reference。",
  ],
  [
    "Member access",
    "decltype(obj.member)",
    "无括号成员访问也取 member declared type。",
  ],
  ["Lvalue expression", "decltype((x))", "表达式是 lvalue，结果为 T&。"],
  [
    "Xvalue expression",
    "decltype(std::move(x))",
    "表达式是 xvalue，结果为 T&&。",
  ],
  [
    "Prvalue expression",
    "decltype(make())",
    "表达式是 prvalue，结果为非引用 T。",
  ],
  [
    "No evaluation",
    "decltype(sideEffect())",
    "只分析类型，不执行 expression。",
  ],
] as const;

const returnCells = [
  [
    "Container access",
    "container[index]",
    "operator[] 可能返回 element reference/proxy。",
  ],
  [
    "Plain auto return",
    "auto access(...)",
    "template deduction 丢弃 reference。",
  ],
  ["Copy result", "value = element", "caller 修改返回值不会改 container。"],
  [
    "decltype(auto)",
    "return container[index]",
    "按 decltype 保留 T& 或 proxy type。",
  ],
  ["Assignment", "access(c,i)=value", "返回 lvalue reference 时可更新元素。"],
  ["Contract test", "is_same + mutation", "同时验证静态类型和可观察行为。"],
] as const;

const forwardCells = [
  [
    "Receive",
    "Container&&",
    "forwarding reference 记录 caller value category。",
  ],
  ["Forward", "forward<Container>(c)", "恢复 lvalue/rvalue category 后索引。"],
  ["Deduce return", "decltype(auto)", "保留 indexing expression 精确类型。"],
  [
    "Lvalue owner",
    "access(vector, i)",
    "reference 指向仍存活 container element。",
  ],
  [
    "Rvalue owner",
    "access(tempVector, i)",
    "返回 reference 可能随 full expression 悬空。",
  ],
  [
    "Constrain",
    "lvalue only / value result",
    "按 lifetime contract 限制 rvalue 或返回副本。",
  ],
] as const;

export function EmcppDecltypeRuleMap() {
  return (
    <DecltypeGrid
      ariaLabel="无括号名称成员访问左值表达式将亡值表达式纯右值表达式不求值六种 decltype 规则图"
      caption="decltype 对无括号 name/member access 返回 declared type；对其他 expressions 按 lvalue/xvalue/prvalue 分别产生 T reference、T double ampersand 或 T。"
      cells={rules}
    />
  );
}

export function EmcppDecltypeAutoReturnMap() {
  return (
    <DecltypeGrid
      ariaLabel="容器访问普通 auto 返回值复制 decltype auto 保留赋值行为契约测试六阶段返回类型图"
      caption="plain auto return 使用模板推导并擦除 reference；decltype(auto) 对 return expression 应用 decltype，保留 element reference/proxy。"
      cells={returnCells}
    />
  );
}

export function EmcppForwardingAccessLifetimeMap() {
  return (
    <DecltypeGrid
      ariaLabel="接收容器转发容器推导返回左值 owner 右值 owner 约束生命周期六阶段转发访问图"
      caption="完美转发与精确返回类型能保持语义，也可能从临时 container 返回悬空 reference；类型正确不等于 lifetime 安全。"
      cells={forwardCells}
    />
  );
}
