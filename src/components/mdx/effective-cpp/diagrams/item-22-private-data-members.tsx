type AccessCell = readonly [
  boundary: string,
  interfaceForm: string,
  effect: string,
];

function AccessGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly AccessCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([boundary, interfaceForm, effect], index) => (
            <section
              key={boundary}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {boundary}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {interfaceForm}
              </code>
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

const permissionCells = [
  ["No access", "private only", "内部 bookkeeping 不向任何 client 暴露。"],
  ["Read only", "T value() const", "调用者可观察，不能绕过规则写入。"],
  ["Validated write", "Result setValue(T)", "修改经过范围与状态检查。"],
  ["Read and write", "get + command", "读写仍保持函数语法和不变量。"],
  ["Derived hook", "protected function", "派生类调用受控操作，不接触表示。"],
  ["Internal mutation", "private helper", "缓存、同步与批量更新留在类内部。"],
] as const;

const migrationCells = [
  ["Public field", "stock.quantity", "所有调用点依赖字段名、类型和即时存储。"],
  [
    "Invariant arrives",
    "quantity >= reserved",
    "直接赋值无法集中拒绝非法状态。",
  ],
  ["Private storage", "quantity_", "表示成为实现细节，client 只依赖语义。"],
  ["Query", "available()", "可以计算、缓存、加锁或读取远端数据。"],
  ["Command", "reserve(n)", "状态变化集中验证并保持原子更新。"],
  [
    "Replace rep",
    "atomic / packed / remote",
    "public contract 不变，修改局限在实现。",
  ],
] as const;

const protectedCells = [
  ["Base storage", "protected items_", "每个 derived 都知道字段名和容器类型。"],
  ["Direct mutation", "items_.push_back", "派生类可跳过 base invariant 与锁。"],
  [
    "Representation change",
    "vector -> tree",
    "所有派生实现一起编译失败或语义变化。",
  ],
  [
    "Unknown clients",
    "third-party derived",
    "base 无法枚举外部依赖，演进风险扩大。",
  ],
  [
    "Protected operation",
    "appendValidated",
    "派生类依赖稳定语义，不依赖存储。",
  ],
  ["Private data", "items_ private", "base 独占表示并能持续维护 invariant。"],
] as const;

export function EcppAccessControlMatrixMap() {
  return (
    <AccessGrid
      ariaLabel="无访问只读验证写读写派生钩子内部修改六级成员访问控制矩阵图"
      caption="private data 配合不同 public/protected 函数，可以逐项授予权限，而不是只有全开或全关。"
      cells={permissionCells}
    />
  );
}

export function EcppEncapsulationMigrationMap() {
  return (
    <AccessGrid
      ariaLabel="公开字段不变量私有存储查询命令替换表示六阶段封装迁移图"
      caption="封装隔离的是表示变化：调用者依赖语义操作后，缓存、同步和存储都能局部演进。"
      cells={migrationCells}
    />
  );
}

export function EcppProtectedDependencyMap() {
  return (
    <AccessGrid
      ariaLabel="基类受保护存储直接修改表示变化未知客户受控操作私有数据六阶段依赖图"
      caption="protected data 只是把 public 客户换成 derived 客户；依赖表示的耦合与失控修改仍然存在。"
      cells={protectedCells}
    />
  );
}
