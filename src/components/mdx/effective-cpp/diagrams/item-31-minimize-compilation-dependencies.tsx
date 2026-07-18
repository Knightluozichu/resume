type DependencyCell = readonly [
  boundary: string,
  dependency: string,
  effect: string,
];

function DependencyGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly DependencyCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([boundary, dependency, effect], index) => (
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
                {dependency}
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

const blastCells = [
  [
    "Address detail",
    "address.hpp changes",
    "private field、helper include 或 layout 被修改。",
  ],
  [
    "Person header",
    "includes address.hpp",
    "textual include 把变化传播到 Person interface。",
  ],
  [
    "Direct clients",
    "include person.hpp",
    "每个客户 translation unit 都重新解析。",
  ],
  [
    "Transitive clients",
    "include client headers",
    "依赖继续沿 include graph 扩散。",
  ],
  ["Build result", "many recompiles", "实现小改动造成大范围增量构建。"],
  [
    "Boundary fix",
    "forward + pimpl",
    "Address definition 只留在 person.cpp/impl.cpp。",
  ],
] as const;

const pimplCells = [
  [
    "Public header",
    "class PersonImpl;",
    "只暴露 incomplete type 名称和稳定 Person API。",
  ],
  [
    "Handle storage",
    "unique_ptr<Impl>",
    "Person layout 只依赖固定大小 owner。",
  ],
  [
    "Out-of-line dtor",
    "~Person in .cpp",
    "在 Impl 完整定义可见处实例化删除逻辑。",
  ],
  [
    "Implementation TU",
    "include impl headers",
    "Address、Date、containers 只影响实现编译单元。",
  ],
  [
    "Forward calls",
    "pImpl_->operation",
    "handle class 将 public operation 转交实现。",
  ],
  ["Change impl", "clients untouched", "实现字段/算法变化不要求客户重新编译。"],
] as const;

const modelCells = [
  [
    "By-value member",
    "complete type",
    "对象 layout 需要 sizeof/alignment，必须 include definition。",
  ],
  [
    "Pointer/reference API",
    "forward declaration",
    "声明阶段可依赖 incomplete type，减少 include。",
  ],
  [
    "Handle class",
    "pimpl + forwarding",
    "保留 value-like public type，增加 indirection/allocation。",
  ],
  [
    "Interface class",
    "pure virtual API",
    "实现完全隐藏，经 factory 返回 polymorphic owner。",
  ],
  [
    "Header-only/template",
    "definition visible",
    "实例化需要 body，接受更强编译依赖换取 generic code。",
  ],
  [
    "Module boundary",
    "export interface",
    "减少文本重复解析，但 semantic/ABI 依赖仍需管理。",
  ],
] as const;

export function EcppIncludeBlastRadiusMap() {
  return (
    <DependencyGrid
      ariaLabel="地址细节人员头直接客户传递客户构建结果边界修复六阶段包含传播图"
      caption="实现 header 被 public header 包含后，微小变化会沿 include graph 扩散为大范围重编译。"
      cells={blastCells}
    />
  );
}

export function EcppPimplTranslationBoundaryMap() {
  return (
    <DependencyGrid
      ariaLabel="公开头句柄存储行外析构实现编译单元转交调用实现变化六层 pimpl 边界图"
      caption="pimpl 让完整实现只在 source translation unit 可见，public header 依赖固定大小 handle 和前置声明。"
      cells={pimplCells}
    />
  );
}

export function EcppDependencyModelDecisionMap() {
  return (
    <DependencyGrid
      ariaLabel="值成员指针引用句柄类接口类头文件模板模块六种编译依赖模型图"
      caption="选择完整类型、forward declaration、handle 或 interface 要同时权衡 layout、泛型、运行成本与发布边界。"
      cells={modelCells}
    />
  );
}
