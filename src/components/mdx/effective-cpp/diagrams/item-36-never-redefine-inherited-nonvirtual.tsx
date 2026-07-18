type BindingCell = readonly [
  view: string,
  selectedBody: string,
  implication: string,
];

function BindingGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly BindingCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([view, selectedBody, implication], index) => (
            <section
              key={view}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {view}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {selectedBody}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {implication}
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

const splitCells = [
  [
    "Create object",
    "Derived d",
    "一个完整 derived object 同时包含 Base subobject。",
  ],
  ["Base view", "Base* pb = &d", "静态类型是 Base*，动态对象仍是 Derived。"],
  ["Base call", "pb->mf() -> Base::mf", "non-virtual 在编译期按静态类型绑定。"],
  [
    "Derived view",
    "Derived* pd = &d",
    "静态类型改为 Derived*，对象地址可仍相同。",
  ],
  [
    "Derived call",
    "pd->mf() -> Derived::mf",
    "同名 derived declaration 被普通查名选中。",
  ],
  [
    "Split behavior",
    "same object, two bodies",
    "客户只改变静态 view 就得到不同语义，破坏 is-a。",
  ],
] as const;

const contractCells = [
  [
    "Base declares",
    "void normalize()",
    "non-virtual 表示所有 subtypes 共享该 public policy。",
  ],
  ["Base client", "Base& value", "客户可依赖统一前置、后置和 side effects。"],
  [
    "Derived inherits",
    "is-a Base",
    "public inheritance 接受完整 base interface/implementation。",
  ],
  [
    "Derived redefines",
    "same name/signature",
    "不是 polymorphic customization，只创建另一静态入口。",
  ],
  [
    "Substitution fails",
    "view-dependent result",
    "Base client 与 Derived client 对同一对象观察不同。",
  ],
  [
    "Correct policy",
    "one body or virtual",
    "不变行为保持 non-virtual；需要变化则 base 设计 virtual hook。",
  ],
] as const;

const repairCells = [
  [
    "Behavior truly invariant",
    "delete Derived::mf",
    "继承 Base implementation，保持所有 views 一致。",
  ],
  [
    "Subtype variation valid",
    "make base virtual",
    "明确 dynamic dispatch contract，并用 override 验证。",
  ],
  [
    "Different operation",
    "rename method",
    "Derived 新能力使用不同语义名称，不伪装 override。",
  ],
  [
    "Cannot change base",
    "composition/adapter",
    "不建立错误 public is-a，显式委托 legacy implementation。",
  ],
  [
    "Fixed public flow",
    "NVI + hook",
    "non-virtual wrapper 保持 invariant，virtual hook 定制步骤。",
  ],
  [
    "Compile-time variation",
    "policy/CRTP",
    "静态类型差异是显式模型，不承诺 Base* runtime substitutability。",
  ],
] as const;

export function EcppStaticBindingSplitMap() {
  return (
    <BindingGrid
      ariaLabel="创建派生基类视图基类调用派生视图派生调用行为分裂六阶段静态绑定图"
      caption="non-virtual call 只看 expression 静态类型；同一个 Derived 对象可因 Base*/Derived* view 不同调用两个 bodies。"
      cells={splitCells}
    />
  );
}

export function EcppNonvirtualContractMap() {
  return (
    <BindingGrid
      ariaLabel="基类声明基类客户派生继承派生重定义替换失败正确政策六阶段 nonvirtual 契约图"
      caption="base non-virtual 表示接口与强制实现一起继承；derived 同名函数不是 customization point，而是契约分裂。"
      cells={contractCells}
    />
  );
}

export function EcppNonvirtualRepairDecisionMap() {
  return (
    <BindingGrid
      ariaLabel="不变删除变体虚函数不同操作改名不可改组合 NVI 编译期策略六类修复路径图"
      caption="修复取决于真实 variation：保持一个 body、正式引入 virtual、改名、组合或使用显式静态多态。"
      cells={repairCells}
    />
  );
}
