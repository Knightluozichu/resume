type LibraryCell = readonly [area: string, facility: string, contract: string];

function LibraryGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly LibraryCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([area, facility, contract], index) => (
            <section
              key={area}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {area}
              </strong>
              <code className="mt-3 block text-xs text-accent">{facility}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {contract}
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

const coreCells = [
  [
    "Containers",
    "vector / map / unordered_map",
    "选择 sequence、ordering、lookup 与 invalidation。",
  ],
  [
    "Algorithms",
    "sort / find / transform",
    "通过 iterator/range 组合，不重复手写循环协议。",
  ],
  ["Ownership", "unique_ptr / shared_ptr", "用类型表达独占或共享生命周期。"],
  ["Callables", "function / bind / lambdas", "统一保存和组合可调用对象。"],
  [
    "Vocabulary",
    "optional / variant / tuple",
    "用标准类型表达缺失、选择和异构记录。",
  ],
  [
    "Infrastructure",
    "thread / chrono / filesystem",
    "复用跨平台时间、并发与路径契约。",
  ],
] as const;

const migrationCells = [
  [
    "TR1 smart pointers",
    "std::tr1::shared_ptr",
    "现代对应 std::shared_ptr；unique ownership 选 unique_ptr。",
  ],
  [
    "TR1 callables",
    "function / bind",
    "进入 std；新代码常优先 lambda 与 invoke。",
  ],
  [
    "TR1 hash tables",
    "unordered_map/set",
    "进入 std，仍需理解 hash/equality/rehash。",
  ],
  ["TR1 regex", "basic_regex", "进入 std，部署前测实现性能与语法需求。"],
  [
    "TR1 tuples/traits",
    "tuple / type_traits",
    "成为现代 generic programming 基础。",
  ],
  [
    "Boost lineage",
    "experimentation",
    "很多提案先在 Boost 实践，再经标准化演进。",
  ],
] as const;

const selectionCells = [
  ["State need", "ownership / lookup / parsing", "先写语义和复杂度需求。"],
  ["Search std", "standard facility", "检查当前 language/library version。"],
  ["Read contract", "invalidation / exceptions", "不能只凭类型名字选择。"],
  ["Measure", "hot path / allocation", "性能敏感场景使用目标平台基准。"],
  ["Wrap boundary", "domain adapter", "隔离供应商差异而非重写核心算法。"],
  [
    "Test portability",
    "multiple libraries",
    "验证支持工具链、ABI 和边界行为。",
  ],
] as const;

export function EcppStandardLibraryCapabilityMap() {
  return (
    <LibraryGrid
      ariaLabel="容器算法所有权可调用对象词汇类型基础设施六域标准库能力图"
      caption="标准库不仅是 containers：它提供可组合算法、所有权、词汇类型和跨平台基础设施，减少重复发明协议。"
      cells={coreCells}
    />
  );
}

export function EcppTr1ModernMigrationMap() {
  return (
    <LibraryGrid
      ariaLabel="TR1 智能指针可调用对象哈希表正则元组 traits Boost 来源六类现代迁移图"
      caption="TR1 是历史标准化桥梁；其核心设施后来进入 std，新代码应使用目标标准对应接口并理解演进差异。"
      cells={migrationCells}
    />
  );
}

export function EcppLibrarySelectionWorkflowMap() {
  return (
    <LibraryGrid
      ariaLabel="陈述需求搜索标准设施阅读契约性能测量边界包装可移植测试六阶段库选择流程图"
      caption="熟悉 library 不等于盲用：从语义需求查找标准设施，阅读完整 contract，测量热点并验证多实现。"
      cells={selectionCells}
    />
  );
}
